# StreamElements Custom Widgets (Neko Edition) 🐾

[![Branch:main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)  [![License:MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A cozy neko-approved monorepo for StreamElements custom widgets
> (HTML/CSS/JS).\
> Purrfect for catgirls (and humans!) who wanna build, test, and share
> their stream magic. 🐱✨

------------------------------------------------------------------------

## 🐾 Repo Layout

    streamelements-widgets/'
    ├─ .changeset
    ├─ .github
    ├─ docs/                # optional: GH Pages previews
    ├─ packages/
    │  ├─ chat-bubbles/     # widget.html / widget.css / widget.js / assets
    │  │  ├─ src/           # core widget source
    │  │  ├─ demo/          # local preview pages
    │  │  ├─ manifest.json  # documented fields + defaults
    │  │  ├─ README.md
    │  │  └─ dist/          # build output: <id>-<version>.zip
    │  └─ ...
    ├─ scripts/             # build helpers (e.g., build-zip.mjs)
    ├─ .gitignore
    ├─ LICENSE
    ├─ README.md
    ├─ eslint.config.mjs
    ├─ package.json
    ├─ pnpm-workspace.yaml  # workspaces + root scripts
    └─ turbo.json

------------------------------------------------------------------------

##  Quick Install & Play (nya~)

Requirements:

- Node.js ≥18
- pnpm ≥10 (repository uses pnpm workspace features)

##  Installation

```bash
git clone https://github.com/your-username/streamelements-widgets.git
cd streamelements-widgets
pnpm install
```
##  Run a widget locally (example: chat bubbles):

```bash
pnpm --filter @nekolessi/chat-bubbles dev
```

Build all widgets into `.zip` bundles:

```bash
pnpm build
```
##  Create an uploadable zip bundle for a widget:
```bash
pnpm --filter @nekolessi/chat-bubbles run build:zip
# => packages/chat-bubbles/dist/chat-bubbles.zip
```
Then drop the `.zip` from `packages/<widget>/dist/` into **StreamElements → Overlays → Custom Widget** — paste or import, and ✨stream magic!
------------------------------------------------------------------------

##  Adding a New Widget

1. Create packages/<widget-name> with the structure:
```bash
src/          # widget.html/css/js
manifest.json # widget metadata & fields
demo/         # optional local preview
README.md     # widget-specific docs
```
2. Add build and dev scripts in the widget’s package.json.
3. Update docs/ (and any index pages) with a link to the new widget.
4. Run pnpm build to generate its dist/ output.

------------------------------------------------------------------------

##  Dev Flow & CI Magic

- **GitHub Actions** auto-build & release zips when pushing to `main`.  
- **Pages**: widget demos published from `docs/`.  
- **Changesets**: version bump & changelogs across all widgets.  
- **Publish to npm**: tag `vX.Y.Z` and Actions will run `pnpm changeset publish`.

------------------------------------------------------------------------

##  Widget Conventions (nya~ cuteness inside)

Each widget follows:

- `src/` → HTML, CSS, JS  
- `manifest.json` → id, version, fields, preview  
- `demo/` → standalone local preview  
- `dist/` → output zips  
- `README.md` → widget-specific guide  

------------------------------------------------------------------------

## 😺 FAQ

**Q: Do I need pnpm to use this repo?**  
A: Yes~! This monorepo is set up with pnpm workspaces. Make sure you install [pnpm](https://pnpm.io/) before running commands.

**Q: How do I add a new widget?**  
A: Create a folder under `packages/`, add `src/`, `manifest.json`, and `demo/`. Run `pnpm build` to generate its zip.

**Q: Where do the built zips go?**  
A: Each widget outputs to its own `dist/` folder (e.g. `packages/chat-bubbles/dist/`).

**Q: Can I customize widget fields in StreamElements?**  
A: Yep! Fields are defined in `manifest.json`. They’ll show up in the StreamElements overlay editor.

**Q: How do updates get released?**  
A: Make a changeset with `pnpm changeset`, merge to `main`, and GitHub Actions will handle versioning + releases.

**Q: Can I fork and make my own neko widgets?**  
A: Of course~! It’s MIT licensed. Just keep the neko spirit alive 🐾.

------------------------------------------------------------------------

## 💖 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) © 2025 [nekolessi](https://github.com/nekolessi) — steal responsibly (with credit!), just keep it fluffy 🐾
