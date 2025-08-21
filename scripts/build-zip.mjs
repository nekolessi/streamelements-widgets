#!/usr/bin/env node
/**
 * Simple build script:
 * - Reads manifest.json for id/version
 * - Copies src/* to a temp build dir
 * - Optionally minifies (left as-is for simplicity)
 * - Zips to dist/<id>-v<version>.zip
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

(async function main() {
  const pkgDir = process.cwd();
  const manifestPath = path.join(pkgDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('manifest.json not found');
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const id = manifest.id || manifest.name || 'widget';
  const version = manifest.version || '0.0.0';
  const srcDir = path.join(pkgDir, 'src');
  const distDir = path.join(pkgDir, 'dist');

  if (!fs.existsSync(srcDir)) {
    console.error('src/ not found');
    process.exit(1);
  }
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `${id}-build-`));
  copyDir(srcDir, tmpDir);

  // Create zip with system zip if available
  const zipName = `${id}-v${version}.zip`;
  const zipPath = path.join(distDir, zipName);
  const zipCmd = process.platform === 'win32'
    ? `powershell -NoLogo -NoProfile -Command "Compress-Archive -Path \"${tmpDir}/*\" -DestinationPath \"${zipPath}\" -Force"`
    : `cd "${tmpDir}" && zip -qr "${zipPath}" .`;

  try {
    execSync(zipCmd, { stdio: 'inherit' });
    console.log('Built:', zipPath);
  } catch (e) {
    console.error('Zip failed. Ensure zip (or PowerShell) is available.');
    process.exitCode = 1;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
})();
