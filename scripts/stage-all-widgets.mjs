import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const packagesDir = path.join(repoRoot, 'packages');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.log(`✔ ${path.relative(repoRoot, src)} → ${path.relative(repoRoot, dest)}`);
    return true;
  } else {
    return false;
  }
}

function stagePackage(pkgPath) {
  const name = path.basename(pkgPath);
  const srcDir = path.join(pkgPath, 'src');
  const distDir = path.join(pkgPath, 'dist');
  ensureDir(distDir);

  // Prefer src/fields.json, copy as dist/manifest.json; fallback to package-level manifest.json
  const fieldsJson = path.join(srcDir, 'fields.json');
  const pkgManifest = path.join(pkgPath, 'manifest.json');
  const distManifest = path.join(distDir, 'manifest.json');

  let touched = 0;
  if (copyIfExists(fieldsJson, distManifest)) {
    touched++;
  } else if (copyIfExists(pkgManifest, distManifest)) {
    touched++;
  } else {
    console.warn(`⚠ No fields.json (src) or manifest.json (package root) for ${name}`);
  }

  // Copy core widget files from src/
  const wanted = ['widget.html', 'widget.css', 'widget.js'];
  for (const f of wanted) {
    if (copyIfExists(path.join(srcDir, f), path.join(distDir, f))) {
      touched++;
    }
  }

  if (touched > 0) {
    console.log(`→ staged ${touched} file(s) for ${name}`);
  }
}

function main() {
  if (!fs.existsSync(packagesDir)) {
    console.error(`No packages/ directory found at ${packagesDir}`);
    process.exit(0);
  }

  const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.isDirectory()) {
      stagePackage(path.join(packagesDir, ent.name));
    }
  }
}

main();
