# StreamElements Custom Widgets (Neko Edition) 🐾

[![Branch:main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)  [![License:MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A cozy neko-approved monorepo for StreamElements custom widgets
> (HTML/CSS/JS).\
> Purrfect for catgirls (and humans!) who wanna build, test, and share
> their stream magic. 🐱✨

------------------------------------------------------------------------

## 🐾 Repo Layout

    streamelements-widgets/
    ├─ packages/
    │  ├─ chat-bubbles/     # widget.html / widget.css / widget.js / assets
    │  │  ├─ src/           # core widget source
    │  │  ├─ demo/          # local preview pages
    │  │  ├─ manifest.json  # documented fields + defaults
    │  │  ├─ README.md
    │  │  └─ dist/          # build output: <id>-<version>.zip
    │  └─ ...
    ├─ docs/                # optional: GH Pages previews
    ├─ scripts/             # build helpers (e.g., build-zip.mjs)
    ├─ .github/workflows/   # CI for building & releasing zips
    ├─ package.json
    ├─ pnpm-workspace.yaml  # workspaces + root scripts
    ├─ turbo.json
    ├─ .gitignore
    ├─ .changeset
    ├─ LICENSE
    └─ README.md

------------------------------------------------------------------------

##  Quick Install & Play (nya~)

```bash
git clone https://github.com/nekolessi/streamelements-widgets.git
cd streamelements-widgets
pnpm install
```

Run a widget locally (example: chat bubbles):

```bash
pnpm --filter @nekolessi/chat-bubbles dev
```

Build all widgets into `.zip` bundles:

```bash
pnpm build
```

Then drop the `.zip` from `packages/<widget>/dist/` into **StreamElements → Overlays → Custom Widget** — paste or import, and ✨stream magic!

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

**Q:** Can I test widgets without going live?\
**A:** Yes, nya! Just run the demo HTML locally and play with it. 🐾

**Q:** Where do my built widgets go?\
**A:** They curl up into the `dist/` folder, waiting to be imported into
StreamElements. ✨

**Q:** Is this repo neko-approved?\
**A:** Absolutely. ฅ^•ﻌ•^ฅ nya\~

------------------------------------------------------------------------

## 💖 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) © Neko Devs (aka nekolessi) — steal responsibly (with credit!), just keep it fluffy 🐾
