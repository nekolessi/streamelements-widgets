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

   The ZIP is created in your **system temp folder** (via `os.tmpdir()`), e.g.:
   - Windows: `C:\Users\<You>\AppData\Local\Temp\chat-bubbles.zip`
   - Linux/macOS: `/tmp/chat-bubbles.zip`

   > Want the ZIP inside the repo (e.g. `packages/chat-bubbles/dist/`)?
   > We can change the script to output there instead.

5. **Import into StreamElements**
   - Go to **Overlays → Custom Widget**.
   - Upload the `chat-bubbles.js` (from `dist/`) or use the ZIP export.
   - Paste/attach your CSS/HTML as needed for your overlay.

## Fields

- **theme**: `light` | `dark`
- **fontSize**: px size for text
- **ignoredUsers**: comma-separated names to hide

**Meow-ntenance tip:** bump the version in `manifest.json` when behavior changes.
