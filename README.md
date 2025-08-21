# StreamElements Custom Widgets -- Monorepo

[![Branch:
main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)
[![License:
MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

> A tidy monorepo for multiple StreamElements custom widgets
> (HTML/CSS/JS), with demos, CI builds, and ready-to-import ZIPs.

------------------------------------------------------------------------

## ⬇️ Download Everything (main)

**One click:**\
**[Download the entire repo @ main
(ZIP)](https://github.com/USERNAME/REPO/archive/refs/heads/main.zip)**

This gives you all widgets, demos, scripts, and workflows as a single
ZIP from the `main` branch.

------------------------------------------------------------------------

## Repo Layout

    streamelements-widgets/
    ├─ packages/
    │  ├─ chat-bubbles/
    │  │  ├─ src/               # widget.html / widget.css / widget.js / assets
    │  │  ├─ demo/              # local preview pages
    │  │  ├─ manifest.json      # documented fields + defaults
    │  │  ├─ README.md
    │  │  └─ dist/              # build output: <id>-v<version>.zip
    │  └─ tip-feed/
    │     └─ ...
    ├─ docs/                    # optional: GH Pages previews
    ├─ scripts/                 # build helpers (e.g., build-zip.mjs)
    ├─ .github/workflows/       # CI for building & releasing zips
    ├─ package.json             # workspaces + root scripts
    ├─ pnpm-workspace.yaml
    └─ README.md

------------------------------------------------------------------------

## Quick Start

1.  **Install**

    ``` bash
    pnpm install
    # or: npm i / yarn
    ```

2.  **Run a widget locally**

    ``` bash
    pnpm --filter @your-scope/chat-bubbles dev
    ```

3.  **Build ZIP(s) for StreamElements**

    ``` bash
    pnpm build
    ```

4.  **Import into StreamElements**

    -   StreamElements → Overlays → add Custom Widget
    -   Open the widget editor and replace HTML/CSS/JS with your built
        files
