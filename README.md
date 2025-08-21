# Twitch Custom Widgets — Hub

[![CI](https://img.shields.io/github/actions/workflow/status/your-org/widgets-hub/ci.yml?label=CI)](https://github.com/your-org/widgets-hub/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)
[![Docs](https://img.shields.io/badge/Docs-Widget%20Guide-blue)](https://your-org.github.io/widgets-hub)

Sexy overlays, crispy alerts, and slick panels for Twitch. This repo is the **home base**: docs, templates, and links to each widget’s code. Think of it like your control room—minus the sticky keys. 😏

---

## ✨ What is this?

A **hub** repo that:
- Documents how to **install**, **configure**, and **deploy** custom Twitch widgets
- Provides a **starter template** for building new widgets fast
- Links to each **individual widget repository**
- Hosts **live demos** via GitHub Pages

---

## 🗂️ Repo Structure

```txt
.
├── /docs/                     # Hub docs & GitHub Pages site (optional)
├── /templates/
│   └── widget-starter/        # Boilerplate widget
│       ├── public/            # Static assets (demo HTML, images)
│       ├── src/               # JS/TS, CSS, components
│       ├── .env.example
│       ├── package.json
│       └── README.md          # Per-widget instructions
├── /scripts/                  # Helper scripts (build, release, etc.)
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml             # Lint/test build for templates
├── CONTRIBUTING.md
├── LICENSE
└── README.md                  # (you are here)
```

> Prefer **one repo per widget**. Keep this hub clean and horny for links, not code bloat.

---

## 🧩 Widgets (Catalog)

Add yours here as you build them:

- **Follower Alert**  
  Repo: https://github.com/your-org/twitch-widget-follower-alert  
  Demo: https://your-org.github.io/twitch-widget-follower-alert

- **Chat Overlay**  
  Repo: https://github.com/your-org/twitch-widget-chat-overlay  
  Demo: https://your-org.github.io/twitch-widget-chat-overlay

- **Donation Tracker**  
  Repo: https://github.com/your-org/twitch-widget-donation-tracker  
  Demo: https://your-org.github.io/twitch-widget-donation-tracker

> Tip: keep names consistent: `twitch-widget-<thing>`.

---

## 🚀 Quick Start (Widget Template)

Use the built-in starter to spin a new widget:

```bash
# 1) scaffold a new widget from the template
npx degit your-org/widgets-hub/templates/widget-starter my-hot-widget
cd my-hot-widget

# 2) install deps
pnpm i   # or npm i / yarn

# 3) configure env
cp .env.example .env
# fill in TWITCH_CLIENT_ID, TWITCH_SECRET, etc.

# 4) run locally
pnpm dev
# open the local server in OBS as a browser source
```

---

## 🔑 Twitch Auth & API (Basics)

- Create an app at https://dev.twitch.tv/console/apps
- Grab **Client ID** and **Client Secret**
- Use **OAuth** to fetch tokens if your widget calls Helix APIs
- For client-only overlays, prefer **EventSub WebSockets** or a thin proxy server

**Env vars (example):**

```env
TWITCH_CLIENT_ID=xxxx
TWITCH_CLIENT_SECRET=xxxx
TWITCH_EVENTSUB_CALLBACK_URL=https://your-proxy.example.com/eventsub
WIDGET_PUBLIC_URL=https://your-org.github.io/my-hot-widget/
```

> Never commit secrets. `.env` stays local; CI uses encrypted secrets.

---

## 🧪 Local Dev + OBS

1. `pnpm dev` to start the widget (usually on `http://localhost:5173` or `3000`)
2. In **OBS → Sources → + → Browser**, set the URL to your local server
3. Set width/height (1920×1080 or your overlay size), FPS 60, custom CSS if needed
4. Test with fake events or a mock feed (`/public/mock-events.json`)

---

## 🛠️ Creating a New Widget (Checklist)

- [ ] Create repo `twitch-widget-<name>`
- [ ] Copy `templates/widget-starter` into it
- [ ] Update `package.json` (name, description, homepage)
- [ ] Replace logo/screenshot in `public/`
- [ ] Update `/src/config.ts` and readme instructions
- [ ] Add **demo page** under `public/index.html`
- [ ] Enable **GitHub Pages** (build to `/dist` via Actions)
- [ ] Add it to the **Catalog** above

---

## 🤖 CI/CD (Example)

**.github/workflows/ci.yml**

```yaml
name: CI
on:
  push:
    paths:
      - 'templates/**'
      - '.github/workflows/ci.yml'
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm i
      - run: pnpm -C templates/widget-starter lint
      - run: pnpm -C templates/widget-starter build
```

> For each widget’s repo, add a Pages deploy workflow so your demo is always online and looking thicc.

---

## 📦 Tech Stack (Template)

- Vite + TypeScript (fast dev server)
- Vanilla JS or lightweight UI (Preact/Lit optional)
- Tailwind or plain CSS (your kink, your choice)
- Optional: tiny Node/Cloudflare Worker proxy for secrets & EventSub

---

## 🔐 Security Notes

- Keep **secrets server-side**; never ship them to the browser
- Use **scoped tokens** (least privilege)
- Sanitize user content (chat text) to avoid injection
- If you accept webhooks, validate **HMAC signatures**

---

## 🧭 Mono vs Multi-Repo

- **Recommended**: one repo per widget + this hub for docs/demos/links  
- **Monorepo** fans: put widgets under `/widgets/<name>` and use Turborepo/PNPM workspaces

---

## 🤝 Contributing

PRs welcome! See **CONTRIBUTING.md** for style/lint rules, commit format, and release flow.

Quick vibes:
- Small, focused PRs
- Clear screenshots/GIFs
- Explain config changes
- Be nice; we’re building cute, hot stuff for streamers 💦

---

## 🗺️ Roadmap

- [ ] Generator CLI (`create-twitch-widget`)
- [ ] More templates (goal bars, sub trains, channel point popups)
- [ ] EventSub WebSocket helper
- [ ] OBS CSS presets

---

## 📜 License

MIT © your-name

---

## 💌 Credits

Built with love (and a little thirst) by **Neko** and friends. If you use these widgets on stream, tag us so we can come watch you be adorable and chaotic. 💖

---

### TL;DR

This repo is the **landing page + template**. Each widget gets its **own repo** with a **demo**. Ship fast, keep secrets safe, and make your overlays look dangerously good.
