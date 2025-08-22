import child_process from 'child_process';
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
  console.error('Usage: npm run build-zip <widget-name>');
  process.exit(1);
}

const widgetPath = path.join(repoRoot, 'packages', widgetName);
if (!fs.existsSync(widgetPath)) {
  console.error(`Widget ${widgetName} not found at ${widgetPath}`);
  process.exit(1);
}

const distPath = path.join(widgetPath, 'dist');

// If dist/ is missing or empty, try building the package first
const needsBuild =
  !fs.existsSync(distPath) ||
  (fs.existsSync(distPath) && fs.readdirSync(distPath).length === 0);

if (needsBuild) {
  console.warn(`No build output found for ${widgetName}. Running package build...`);
  try {
    // Prefer pnpm if available; fall back to npm
    try {
      child_process.execSync(`pnpm -C "${widgetPath}" run build`, { stdio: 'inherit' });
    } catch {
      child_process.execSync(`npm --prefix "${widgetPath}" run build`, { stdio: 'inherit' });
    }
  } catch (e) {
    console.error(
      `Package build failed for ${widgetName}. Ensure packages/${widgetName}/package.json has a "build" script that emits to dist/`,
      e
    );
    process.exit(1);
  }
}

// Re-check dist after build
if (!fs.existsSync(distPath) || fs.readdirSync(distPath).length === 0) {
  console.error(`Build output still not found for ${widgetName}. Expected files in ${distPath}`);
  process.exit(1);
}

const zipName = `${widgetName}.zip`;
const zipPath = path.join(distPath, zipName);

// Helpers
function hasCmd(cmd) {
  try {
    const probe = process.platform === 'win32' ? 'where' : 'which';
    child_process.execSync(`${probe} ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

try {
  // clean old zip if exists
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  // try 7z, fall back to system zip (mac/linux) or powershell Compress-Archive (Windows)
  if (hasCmd('7z')) {
    const cmd = `7z a -tzip "${zipPath}" "${distPath}/*"`;
    child_process.execSync(cmd, { stdio: 'inherit' });
  } else if (process.platform !== 'win32' && hasCmd('zip')) {
    const cmd = `cd "${distPath}" && zip -r "${zipPath}" *`;
    child_process.execSync(cmd, { stdio: 'inherit', shell: '/bin/bash' });
  } else if (process.platform === 'win32') {
    const ps = [
      'powershell',
      '-NoProfile',
      '-Command',
      `Compress-Archive -Path "${distPath}\\*" -DestinationPath "${zipPath}" -Force`
    ];
    child_process.execFileSync(ps[0], ps.slice(1), { stdio: 'inherit' });
  } else {
    throw new Error('No zip tool found (tried 7z/zip). Install 7-Zip or zip.');
  }

  console.warn(`Zipped ${widgetName} to ${zipPath}`);
} catch (e) {
  console.error('Error while creating zip:', e);
  process.exit(1);
}