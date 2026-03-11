# Chat Bubbles

Cute chat bubbles widget for StreamElements overlays.

## Quick Start

1. Install dependencies at repository root:
```bash
pnpm install
```

2. Run the widget locally:
```bash
pnpm --filter @nekolessi/chat-bubbles run dev
```

3. Build package output (`dist/`):
```bash
pnpm --filter @nekolessi/chat-bubbles run build
```

4. Build ZIP for StreamElements import:
```bash
pnpm --filter @nekolessi/chat-bubbles run build:zip
```

ZIP output:
- `packages/chat-bubbles/dist/chat-bubbles.zip`

## Import into StreamElements
- Open StreamElements Overlay Editor.
- Add or open a Custom Widget.
- Upload the ZIP, or paste `widget.html`, `widget.css`, `widget.js`, and `manifest.json`.

## Fields
- `theme`: `light` or `dark`
- `fontSize`: text size in pixels
- `ignoredUsers`: comma-separated usernames to hide
