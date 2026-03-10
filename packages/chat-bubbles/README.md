# Chat Bubbles 🐾

Cute neko-styled chat bubbles widget for StreamElements overlays.

## Quick Start (nya~)

1. **Install deps at repo root**
   ```bash
   pnpm install
   ```

2. **Run the package locally (dev)**
   ```bash
   pnpm --filter @nekolessi/chat-bubbles run dev
   ```

3. **Build the widget bundle (outputs to `dist/`)**
   ```bash
   pnpm --filter @nekolessi/chat-bubbles run build
   ```

4. **Build a ZIP for upload (auto-builds if needed)**
   ```bash
   pnpm --filter @nekolessi/chat-bubbles run build:zip
   ```

   The ZIP is created inside the package’s **dist/** folder, e.g.:
   - `packages/chat-bubbles/dist/chat-bubbles.zip`

5. **Import into StreamElements**
   - Go to **Overlays → Custom Widget**.
   - Upload the ZIP export, or paste the four dist files (`widget.html`, `widget.css`, `widget.js`, `manifest.json`) into the StreamElements custom widget editor.

## Fields

- **theme**: `light` | `dark`
- **fontSize**: px size for text
- **ignoredUsers**: comma-separated names to hide

**Meow-ntenance tip:** bump the version in `manifest.json` when behavior changes.

