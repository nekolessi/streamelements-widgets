import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const widgetName = process.argv[2] || path.basename(process.cwd());

const widgetPath = path.join(repoRoot, 'packages', widgetName);
if (!fs.existsSync(widgetPath)) {
  console.error(`Widget ${widgetName} not found`);
  process.exit(1);
}

const distPath = path.join(widgetPath, 'dist');
if (!fs.existsSync(distPath)) {
  console.error(`Build output not found for ${widgetName}. Run npm run build first.`);
  process.exit(1);
}

const zipName = `${widgetName}.zip`;
const zipPath = path.join(distPath, zipName);

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
