# StreamElements Custom Widgets (Neko Edition) 🐾

[![Branch:main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)  [![License:MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

     ／l、
   （ﾟ､ ｡７
     l、 ~ヽ
     じしf_, )ノ   nya~ welcome to my widgets hub!
     
> A cozy neko-approved monorepo for StreamElements custom widgets
> (HTML/CSS/JS).\
> Purrfect for catgirls (and humans!) who wanna build, test, and share
> their stream magic. 🐱✨

------------------------------------------------------------------------

## 🐾 Repo Layout

    streamelements-widgets/
    ├─ packages/
    │  ├─ chat-bubbles/
    │  │  ├─ src/               # widget.html / widget.css / widget.js / assets
    │  │  ├─ demo/              # local preview pages
    │  │  ├─ manifest.json      # documented fields + defaults
    │  │  ├─ README.md
    │  │  └─ dist/              # build output: <id>-v<version>.zip
    │  └─ ...
    ├─ docs/                    # optional: GH Pages previews
    ├─ scripts/                 # build helpers (e.g., build-zip.mjs)
    ├─ .github/workflows/       # CI for building & releasing zips
    ├─ package.json             # workspaces + root scripts
    ├─ pnpm-workspace.yaml
    ├─ turbo.json
    ├─ .gitignore
    ├─ LICENSE
    └─ README.md

------------------------------------------------------------------------

##  Quick Install & Play (nya~)

```bash
git clone https://github.com/nekolessi/streamelements-widgets.git
cd streamelements-widgets
pnpm install
```

To peek at each widget while you’re tweaking:

```bash
pnpm --filter @nekolessi/chat-bubbles dev
```

Make, build, and import:

```bash
pnpm build
```

Then drop the `.zip` from `packages/<widget>/dist/` into **StreamElements → Overlays → Custom Widget** — paste or import, and ✨stream magic!

------------------------------------------------------------------------

##  Dev Flow & CI Magic

- **Version bump & changelogs** → `pnpm changeset` → `pnpm changeset version`
  - Automatic version branch PR available via workflow  
- **Release zips** on `push main` via CI → GitHub Release with widget packages  
- **GitHub Pages** → widget demos auto-published under `docs/`  
- **Publish to npm** → tag release (`vX.Y.Z`) → CI runs `pnpm changeset publish` using `NPM_TOKEN` secret

------------------------------------------------------------------------

##  Widget Conventions (nya~ cuteness inside)

Each widget includes:

- `src/` → core files (`widget.html`, `widget.css`, `widget.js`)  
- `manifest.json` → defines `id`, `version`, `preview`, and editor `fields`  
- `demo/index.html` → local preview harness with mocked SE events  
- `README.md` → quick start, field summary, and neko notes  

`manifest.json` example for **Chat Bubbles**:

```json
{
  "name": "Chat Bubbles",
  "id": "chat-bubbles",
  "version": "0.1.0",
  "description": "Cute neko-styled chat bubbles widget",
  "author": "nekolessi",
  "fields": [
    { "key": "theme", "type": "select", "options": ["light","dark"], "default": "dark" },
    { "key": "fontSize", "type": "number", "min": 10, "max": 64, "default": 24 },
    { "key": "ignoredUsers", "type": "string", "default": "" }
  ],
  "preview": "demo/index.html"
}
```

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
