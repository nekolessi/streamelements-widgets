import { cp } from 'node:fs/promises'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const widgetName = process.argv[2]

if (!widgetName) {
  console.error('Usage: pnpm new:widget <widget-name>')
  process.exit(1)
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(widgetName)) {
  console.error('Widget name must be lowercase kebab-case (letters, numbers, hyphens).')
  process.exit(1)
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const packagesDir = path.join(repoRoot, 'packages')
const templateDir = path.join(packagesDir, 'chat-bubbles')
const targetDir = path.join(packagesDir, widgetName)

if (!existsSync(templateDir)) {
  console.error('Template package not found: packages/chat-bubbles')
  process.exit(1)
}

if (existsSync(targetDir)) {
  console.error(`Package already exists: packages/${widgetName}`)
  process.exit(1)
}

await cp(templateDir, targetDir, {
  recursive: true,
  filter(source) {
    const base = path.basename(source)
    return base !== 'dist' && base !== 'node_modules'
  }
})

const titleCase = widgetName
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ')

const packageJsonPath = path.join(targetDir, 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
packageJson.name = `@nekolessi/${widgetName}`
packageJson.version = '0.1.0'
packageJson.description = `StreamElements widget: ${titleCase}`
packageJson.scripts['build:zip'] = `pnpm run build && node ../../scripts/build-zip.mjs ${widgetName}`
packageJson.scripts.zip = `node ../../scripts/build-zip.mjs ${widgetName}`
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8')

const manifestPaths = [
  path.join(targetDir, 'manifest.json'),
  path.join(targetDir, 'src', 'fields.json')
]

for (const manifestPath of manifestPaths) {
  if (!existsSync(manifestPath)) {
    continue
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  manifest.name = titleCase
  manifest.id = widgetName
  manifest.version = '0.1.0'
  manifest.description = manifest.description || `StreamElements widget: ${titleCase}`
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

const readmePath = path.join(targetDir, 'README.md')
const readmeContents = [
  `# ${titleCase}`,
  '',
  'Custom StreamElements widget package.',
  '',
  '## Scripts',
  '',
  '```bash',
  `pnpm --filter @nekolessi/${widgetName} run dev`,
  `pnpm --filter @nekolessi/${widgetName} run build`,
  `pnpm --filter @nekolessi/${widgetName} run build:zip`,
  '```',
  '',
  'ZIP output:',
  `- \`packages/${widgetName}/dist/${widgetName}.zip\``,
  ''
].join('\n')
writeFileSync(readmePath, readmeContents, 'utf8')

const changelogPath = path.join(targetDir, 'CHANGELOG.md')
if (existsSync(changelogPath)) {
  writeFileSync(changelogPath, '# Changelog\n\n## 0.1.0\n- Initial scaffold from chat-bubbles template.\n', 'utf8')
}

console.warn(`Created packages/${widgetName}`)
console.warn(`Next: pnpm --filter @nekolessi/${widgetName} run dev`)
