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
  console.error('Usage: npm run build-zip <widget-name>');
  process.exit(1);
}

// Paths
const distPath = path.join(repoRoot, 'packages', widgetName, 'dist');
const zipName = `${widgetName}.zip`;
const zipPath = path.join(distPath, zipName);

// Ensure dist exists
if (!fs.existsSync(distPath)) {
  console.error(`Dist folder not found: ${distPath}`);
  process.exit(1);
}

// Remove any old zip
if (fs.existsSync(zipPath)) {
  fs.rmSync(zipPath, { force: true });
}

// Helpers
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
  // Prefer 7-Zip, then zip, then PowerShell Compress-Archive (Windows)
  if (hasTool('7z')) {
    // 7z a -tzip <zipPath> <contents> -mx=9 -r
    execSync(`7z a -tzip "${zipPath}" "*"`,
      { cwd: distPath, stdio: 'inherit' });
  } else if (hasTool('zip')) {
    // zip -r <zipPath> .
    execSync(`zip -r "${zipPath}" .`, { cwd: distPath, stdio: 'inherit' });
  } else if (process.platform === 'win32') {
    // PowerShell Compress-Archive
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
