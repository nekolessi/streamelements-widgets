# StreamElements Custom Widgets -- Monorepo

[![Branch:
main](https://img.shields.io/badge/branch-main-blue.svg)](../../tree/main)\
[![License:
MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

> A tidy monorepo for multiple StreamElements custom widgets
> (HTML/CSS/JS), with demos, CI builds, and ready-to-import ZIPs.

------------------------------------------------------------------------

## ⬇️ Download Everything (main)

**One click:**\
**[Download the entire repo @ main
(ZIP)](https://github.com/nekolessi/StreamElements-widget-hub/archive/refs/heads/main.zip)**

Grab all widgets, demos, scripts, and workflows in one ZIP from the
`main` branch.

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

    -   StreamElements → **Overlays** → add **Custom Widget**\
    -   Open the widget editor and replace HTML/CSS/JS with your built
        files (or unzip them and copy over files).

------------------------------------------------------------------------

## Widget Conventions

-   `src/widget.html`, `src/widget.css`, `src/widget.js` -- core files.\

-   `manifest.json` -- local schema for fields & defaults (mirrors the
    SE editor fields).\
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

-   **Demo harness (`demo/index.html`)** -- mocks SE events & supplies
    local settings for development:

    ``` html
    <script>
      window.SE_SETTINGS = { theme: "dark", fontSize: 24, ignoredUsers: "" };

      function sendChat(user, text) {
        window.postMessage({
          listener: "message",
          event: { service: "twitch", data: { displayName: user, text } }
        }, "*");
      }

      setInterval(() => sendChat("Viewer" + Math.floor(Math.random()*99), "hello!"), 3000);
    </script>
    ```

------------------------------------------------------------------------

## Scripts

Root `package.json` (example):

``` json
{
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "turbo run build",
    "lint": "eslint .",
    "release": "changeset version && changeset publish"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "turbo": "^2.0.0",
    "@changesets/cli": "^2.27.0",
    "vite": "^5.0.0",
    "esbuild": "^0.23.0"
  }
}
```

Each widget `package.json` (example):

``` json
{
  "name": "@your-scope/chat-bubbles",
  "version": "1.2.0",
  "scripts": {
    "build": "node ../../scripts/build-zip.mjs",
    "dev": "vite --open demo/index.html"
  }
}
```

`scripts/build-zip.mjs` (outline): - Validate `manifest.json`
(id/name/version).\
- Bundle/minify `src/*` using tools like esbuild or rollup.\
- Rewrite asset paths if needed, and copy files into a temporary
folder.\
- Zip everything to `dist/<id>-v<version>.zip`.

------------------------------------------------------------------------

## CI (GitHub Actions)

On push to `main`, build all widgets and (optionally) publish a release
with ZIPs.

`.github/workflows/release.yml` (minimal example):

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
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v${{ github.run_number }}
          name: Widget Release ${{ github.run_number }}
          files: artifacts/*.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

------------------------------------------------------------------------

## Branching & Versioning

-   `main` → protected, stable.\
-   Use `feat/*`, `fix/*` branches for development and PRs into `main`.\
-   Version widgets with SemVer---use **Changesets** in independent mode
    for automated version and changelog generation.

------------------------------------------------------------------------

## Linting & Hygiene

-   ESLint + Prettier configured at the root.\
-   Include `.editorconfig` and a `.gitignore` to exclude `dist/`,
    `.DS_Store`, `node_modules/`, etc.\
-   Apply an open-source-friendly license like **MIT** (or whichever
    preference you have).

------------------------------------------------------------------------

## FAQ

**Q:** I just want a quick zip with everything.\
**A:** Use **[Download the entire repo @ main
(ZIP)](https://github.com/nekolessi/StreamElements-widget-hub/archive/refs/heads/main.zip)**
for an instant bundle of the whole repo.

**Q:** Where are the import-ready widget zips?\
**A:** Build them locally via `pnpm build`, or grab them from a GitHub
Release if CI is set up.

**Q:** Can I preview widgets without loading StreamElements?\
**A:** Totally! Each widget's `demo/index.html` can be served locally by
running `pnpm --filter <pkg> dev`.

------------------------------------------------------------------------

## License

MIT © You
