# StreamElements Custom Widgets (Neko Edition) 🐾ฅ^•ﻌ•^ฅ

[![Branch:
main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)\
[![License:
MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

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

## 🐱 Quick Start

1.  **Install dependencies** 🐾

    ``` bash
    pnpm install
    # or: npm i / yarn
    ```

2.  **Run a widget locally** (nya nya\~)

    ``` bash
    pnpm --filter @your-scope/chat-bubbles dev
    ```

3.  **Build ZIP(s) for StreamElements** ✨

    ``` bash
    pnpm build
    ```

4.  **Import into StreamElements** 🐾

    -   Go to StreamElements → **Overlays** → add **Custom Widget**\
    -   Replace the HTML/CSS/JS with your built files (copy-paste like a
        kitty paw boop).

------------------------------------------------------------------------

## ✨ Widget Conventions

-   `src/widget.html`, `src/widget.css`, `src/widget.js` -- core files.\
-   `manifest.json` -- schema for your widget's field options (keeps
    things organized like a tidy cat nest).

Example:

``` json
{
  "name": "Chat Bubbles",
  "id": "chat-bubbles",
  "version": "1.2.0",
  "description": "Animated chat bubbles overlay widget",
  "author": "YourName",
  "fields": [
    { "key": "theme", "type": "select", "options": ["light","dark"], "default": "dark" },
    { "key": "fontSize", "type": "number", "min": 10, "max": 64, "default": 24 },
    { "key": "ignoredUsers", "type": "string", "default": "" }
  ],
  "preview": "demo/index.html"
}
```

**Demo harness (`demo/index.html`)** -- mock StreamElements events so
you can play-test like a curious kitty 🐱:

``` html
<script>
  window.SE_SETTINGS = { theme: "dark", fontSize: 24, ignoredUsers: "" };

  function sendChat(user, text) {
    window.postMessage({
      listener: "message",
      event: { service: "twitch", data: { displayName: user, text } }
    }, "*");
  }

  setInterval(() => sendChat("Viewer" + Math.floor(Math.random()*99), "nya~! ฅ^•ﻌ•^ฅ"), 3000);
</script>
```

------------------------------------------------------------------------

## 🐾 CI / GitHub Actions (auto-magic)

On push to `main`, neko magic builds zips automatically (if CI is set
up). Example workflow:

``` yaml
name: Release Widgets
on:
  push: { branches: [main] }

jobs:
  build-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Collect artifacts
        run: |
          mkdir -p artifacts
          find packages -type f -name "*.zip" -exec cp {} artifacts/ \;
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

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) © Neko Devs (aka nekolessi) — steal responsibly (with credit!), remix with neko energy, just keep it fluffy 🐾
