import child_process from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const widgetName = process.argv[2];
if (!widgetName) {
  console.error('Usage: npm run build-zip <widget-name>');
  process.exit(1);
}

const widgetPath = path.join('packages', widgetName);
if (!fs.existsSync(widgetPath)) {
  console.error(`Widget ${widgetName} not found`);
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
    console.error(`Package build failed for ${widgetName}. Ensure packages/${widgetName}/package.json has a "build" script that emits to dist/`, e);
    process.exit(1);
  }
}

// Re-check dist after build
if (!fs.existsSync(distPath) || fs.readdirSync(distPath).length === 0) {
  console.error(`Build output still not found for ${widgetName}. Expected files in ${distPath}`);
  process.exit(1);
}

const zipName = `${widgetName}.zip`;
const zipPath = path.join(os.tmpdir(), zipName);

try {
  // clean old zip if exists
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  // use 7z if available
  const cmd = `7z a -tzip "${zipPath}" "${distPath}/*"`;
  child_process.execSync(cmd, { stdio: 'inherit' });

  console.warn(`Zipped ${widgetName} to ${zipPath}`);
} catch (e) {
  console.error('Error while creating zip:', e);
  process.exit(1);
}
