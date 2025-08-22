[![Branch:main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)  [![License:MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

# 🐾 Neko's Widgets (StreamElements) 🐱✨

> Welcome to my cozy widget den! This repo houses custom **StreamElements** widgets, bundled as a pnpm workspace.

Built with: **pnpm workspaces**, **Turbo** (build orchestration), **ESLint** (no naughty `console.log`, only `warn`/`error`), **Vitest**, and **Changesets** + GitHub Actions for release magic. nya~

---

## 💖 Requirements
- **Node.js 20+**
- **pnpm 10.x** (`"packageManager": "pnpm@10.x"` is set)
- macOS / Linux / Windows all welcome :3

> First time here? install Node 20 + pnpm, then run `pnpm install` in the repo root. easy peasy, kitty squeezy~

---

## 🧶 Project (structure)
```
.
├─ packages/
│  └─ chat-bubbles/
│     ├─ src/
│     │  ├─ widget.html
│     │  ├─ widget.css
│     │  ├─ widget.js
│     │  └─ fields.json   # source of widget fields; becomes dist/manifest.json
│     └─ dist/
│        ├─ widget.html
│        ├─ widget.css
│        ├─ widget.js
│        └─ manifest.json
├─ scripts/
│  ├─ build-zip.mjs         # zips only widget.html|css|js|manifest.json (whitelist)
│  └─ stage-all-widgets.mjs # copies src/* + maps fields.json -> dist/manifest.json
├─ eslint.config.mjs
├─ package.json
└─ turbo.json (if present)
```

---

## 🐾 Install
```bash
pnpm install
```

This is a workspace, so deps get installed once and shared where needed. no hairballs!

---

## 🛠️ Build
### All packages
```bash
pnpm build
```
This runs your workspace build via Turbo. After build, a `postbuild` hook runs:
```bash
node scripts/stage-all-widgets.mjs
```
What it does:
- ensures each `packages/*/dist/` exists
- copies `src/widget.html`, `src/widget.css`, `src/widget.js` → `dist/`
- **maps** `src/fields.json` → `dist/manifest.json` (so StreamElements purrs happily)

### Single package
```bash
pnpm --filter @nekolessi/chat-bubbles build
# or just rerun the staging if you tinkered with src:
node scripts/stage-all-widgets.mjs
```

---

## 📦 Package a widget (ZIP it up, nya)
Create a distributable zip for a package (example: `chat-bubbles`):
```bash
node scripts/build-zip.mjs chat-bubbles
```
The zipper is *strictly* horny for these four files (whitelist only):
- `widget.html`
- `widget.css`
- `widget.js`
- `manifest.json`

Result:
```
packages/chat-bubbles/dist/chat-bubbles.zip
```

> Any other builds (like a library bundle `chat-bubbles.js`) are **intentionally excluded** from the zip. paws off!

---

## 🎛️ Using in StreamElements (two comfy ways)

### A) Copy–paste into a Custom Widget
1. StreamElements → **Overlays** → **Edit** your overlay.
2. Add **Custom Widget** (or open one) → **Open Editor**.
3. Paste `dist/widget.html`, `dist/widget.css`, `dist/widget.js` into their tabs.
4. `dist/manifest.json` (generated from `src/fields.json`) defines your settings UI.

### B) Start from the ZIP
Unzip and paste those four files like option A. meowdelicious~

---

## 🧼 Lint & Test
```bash
pnpm lint          # ESLint
pnpm lint:fix      # Autofix
pnpm test          # Vitest
pnpm test:watch    # Watch mode
pnpm test:cov      # Coverage
```
Lint vibes:
- `console.log` is banned; use `console.warn` or `console.error` (no messy litter).
- `dist/` and `coverage/` are ignored during linting.

---

## 🚀 Releasing (meow-deploys)
- On pushes to `main` with pending **Changesets**, CI opens/updates a **Version PR**.
- Merge the Version PR to land bumps.
- A separate **tag-based release** job can attach your built ZIPs to the GitHub Release.
- NPM publishing is opt-in (set `NPM_TOKEN` and enable in your workflow if you want).

---

## ❓ FAQ

**Why is there another `*.js` in `dist/`?**  
That’s your package’s library bundle (e.g., IIFE/UMD exposing `window.ChatBubbles`). The ZIP **only** includes `widget.html/css/js` and `manifest.json` on purpose.

**Where do I edit the settings UI?**  
Change **`packages/<name>/src/fields.json`**. The build maps it to **`dist/manifest.json`** for StreamElements compatibility.

**Assets (images/fonts)?**  
Put them under `packages/<name>/src/assets/` and reference in your widget. We can extend the zip whitelist to include `assets/` if needed. just say nyah~

---

## 🐱 Contributing (headpats appreciated)
1. Branch from `main`.
2. Edit files in `packages/<widget>/src/`.
3. `pnpm build` (and optionally `node scripts/build-zip.mjs <widget>` to test the zip).
4. `pnpm lint && pnpm test`
5. Open a PR—purrs guaranteed.

---

## ✨ Notes
- **pnpm** workspaces + **Turbo**: use `pnpm` (and `--filter`) for per-package ops.
- Versioning via **Changesets**. Add a changeset locally:
  ```bash
  pnpm dlx @changesets/cli add
  ```

---
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) © 2025 [nekolessi](https://github.com/nekolessi) made with ❤️ and a dangerous amount of caffeine.
