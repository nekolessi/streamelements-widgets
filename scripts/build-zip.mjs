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

  // Prefer src/fields.json (rename to manifest.json in dist); fallback to package-level manifest.json
  const fieldsJson = path.join(srcDir, 'fields.json');
  const pkgManifest = path.join(pkgDir, 'manifest.json');
  const distManifest = path.join(distPath, 'manifest.json');

  if (!copyIfExists(fieldsJson, distManifest)) {
    copyIfExists(pkgManifest, distManifest);
  }

  // Copy core widget files from src/
  const wanted = ['widget.html', 'widget.css', 'widget.js'];
  for (const f of wanted) {
    copyIfExists(path.join(srcDir, f), path.join(distPath, f));
  }
}

}

function hasTool(cmd) {
  
  // 2) Build whitelist of files to include in the zip (only widget artifacts)
  const candidates = ['widget.html', 'widget.css', 'widget.js', 'manifest.json'];
  const filesToZip = candidates
    .map(f => path.join(distPath, f))
    .filter(f => fs.existsSync(f));

  if (filesToZip.length === 0) {
    throw new Error(`No widget files found in ${distPath}. Expected one of: ${candidates.join(', ')}`);
  }

  // 3) Remove any old zip
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath, { force: true });
  }

  // 4) Zip (whitelist only)
  if (hasTool('7z')) {
    // Run 7z with only the whitelisted files
    const rels = filesToZip.map(f => path.relative(distPath, f)).join('" "');
    execSync(`7z a -tzip "${zipPath}" "${rels}"`, { cwd: distPath, stdio: 'inherit' });
  } else if (hasTool('zip')) {
    // Run zip with only the whitelisted files
    const rels = filesToZip.map(f => path.relative(distPath, f)).join(' ');
    execSync(`zip -r "${zipPath}" ${rels}`, { cwd: distPath, stdio: 'inherit' });
  } else if (process.platform === 'win32') {
    // PowerShell Compress-Archive with explicit file list
    // Build a comma-separated -Path list with quoted absolute paths
    const psList = filesToZip.map(f => `"${f.replace(/\/g, '\\')}"`).join(',');
    const psArgs = [
      '-NoProfile',
      '-Command',
      `Compress-Archive -Path ${psList} -DestinationPath "${zipPath}" -Force`
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
