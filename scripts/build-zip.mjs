import { execSync, execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve repo root based on this script's location: <repo>/scripts/build-zip.mjs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..'); // parent of scripts/

// Arg: widget/package name under packages/
const widgetName = process.argv[2];
if (!widgetName) {
  console.error('Usage: pnpm build-zip <widget-name>');
  process.exit(1);
}

const pkgDir = path.join(repoRoot, 'packages', widgetName);
const srcDir = path.join(pkgDir, 'src');
const distPath = path.join(pkgDir, 'dist');
const zipName = `${widgetName}.zip`;
const zipPath = path.join(distPath, zipName);

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function copyIfExists(from, to) {
  if (fs.existsSync(from)) {
    ensureDir(path.dirname(to));
    fs.copyFileSync(from, to);
    console.log(`✔ Copied ${path.relative(repoRoot, from)} -> ${path.relative(repoRoot, to)}`);
    return true;
  } else {
    console.warn(`⚠ Missing ${path.relative(repoRoot, from)} (skipped)`);
    return false;
  }
}

// Copy required widget files into dist prior to zipping
function stageWidgetFiles() {
  ensureDir(distPath);

  // Always try to copy manifest.json from package root
  copyIfExists(path.join(pkgDir, 'manifest.json'), path.join(distPath, 'manifest.json'));

  // Copy core widget files from src/
  const wanted = ['widget.html', 'widget.css', 'widget.js'];
  for (const f of wanted) {
    copyIfExists(path.join(srcDir, f), path.join(distPath, f));
  }
}

function hasTool(cmd) {
  try {
    if (process.platform === 'win32') {
      execSync(`where ${cmd}`, { stdio: 'ignore' });
    } else {
      execSync(`command -v ${cmd}`, { stdio: 'ignore' });
    }
    return true;
  } catch {
    return false;
  }
}

try {
  // 1) Stage files
  stageWidgetFiles();

  // 2) Remove any old zip
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath, { force: true });
  }

  // 3) Zip dist
  if (hasTool('7z')) {
    execSync(`7z a -tzip "${zipPath}" "*"`,
      { cwd: distPath, stdio: 'inherit' });
  } else if (hasTool('zip')) {
    execSync(`zip -r "${zipPath}" .`, { cwd: distPath, stdio: 'inherit' });
  } else if (process.platform === 'win32') {
    const psArgs = [
      '-NoProfile',
      '-Command',
      `Compress-Archive -Path "${distPath}\\*" -DestinationPath "${zipPath}" -Force`
    ];
    execFileSync('powershell.exe', psArgs, { stdio: 'inherit' });
  } else {
    throw new Error('No zip tool found (tried 7z/zip). Install 7-Zip or zip.');
  }

  console.warn(`Zipped ${widgetName} to ${zipPath}`);
} catch (e) {
  console.error('Error while creating zip:', e);
  process.exit(1);
}
