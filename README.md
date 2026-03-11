# Neko's StreamElements Widgets

[![CI](https://github.com/nekolessi/streamelements-widgets/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/nekolessi/streamelements-widgets/actions/workflows/ci.yml)
[![Release](https://github.com/nekolessi/streamelements-widgets/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/nekolessi/streamelements-widgets/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node 20+](https://img.shields.io/badge/node-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm 10](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Turbo](https://img.shields.io/badge/built%20with-turbo-000000?logo=turbo&logoColor=white)](https://turbo.build/)

Monorepo for custom Twitch StreamElements widgets.

## Current Widgets

- `packages/chat-bubbles`

## Monorepo Layout

```text
.
|-- packages/
|   `-- <widget-name>/
|      |-- src/
|      |-- dist/
|      |-- manifest.json
|      `-- package.json
|-- scripts/
|   |-- stage-all-widgets.mjs
|   |-- build-zip.mjs
|   `-- new-widget.mjs
|-- turbo.json
|-- pnpm-workspace.yaml
`-- README.md
```

## Quick Start

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

## Add a New Widget

```bash
pnpm new:widget my-widget
```

This scaffolds `packages/my-widget` from the `chat-bubbles` template and updates package/manifest metadata.

## Build and Package

Build all widgets:

```bash
pnpm build
```

Create a ZIP for one widget:

```bash
pnpm zip:widget chat-bubbles
```

ZIP output:
- `packages/<widget>/dist/<widget>.zip`

## StreamElements Import

Each widget ZIP includes only:
- `widget.html`
- `widget.css`
- `widget.js`
- `manifest.json`

You can import via StreamElements Custom Widget editor by upload or copy/paste.

## Release Flow

- Changesets manages version PRs.
- Tag-based workflow builds release ZIP artifacts.

## License

MIT
