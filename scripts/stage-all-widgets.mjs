import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const packagesDir = path.join(repoRoot, 'packages');

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.warn(`[ok] ${path.relative(repoRoot, src)} -> ${path.relative(repoRoot, dest)}`);
    return true;
  }
  return false;
}

function stagePackage(pkgPath) {
  const name = path.basename(pkgPath);
  const srcDir = path.join(pkgPath, 'src');
  const distDir = path.join(pkgPath, 'dist');
  ensureDir(distDir);

  const fieldsJson = path.join(srcDir, 'fields.json');
  const pkgManifest = path.join(pkgPath, 'manifest.json');
  const distManifest = path.join(distDir, 'manifest.json');

  let touched = 0;
  if (copyIfExists(fieldsJson, distManifest)) {
    touched += 1;
  } else if (copyIfExists(pkgManifest, distManifest)) {
    touched += 1;
  } else {
    console.warn(`[warn] Missing fields.json or manifest.json for ${name}`);
  }

  const wanted = ['widget.html', 'widget.css', 'widget.js'];
  for (const fileName of wanted) {
    if (copyIfExists(path.join(srcDir, fileName), path.join(distDir, fileName))) {
      touched += 1;
    }
  }

  if (touched > 0) {
    console.warn(`[info] staged ${touched} file(s) for ${name}`);
  }
}

function main() {
  if (!fs.existsSync(packagesDir)) {
    console.error(`No packages/ directory found at ${packagesDir}`);
    process.exit(0);
  }

  const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      stagePackage(path.join(packagesDir, entry.name));
    }
  }
}

main();
