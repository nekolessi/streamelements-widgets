# Security Policy

Thank you for helping keep this project and its users safe. This document explains **how to report security issues**, what’s **in scope**, and how we handle disclosures.

---

## Supported Versions

We provide security fixes for the following:
- **`main`** branch (latest development)
- The **most recent tagged release** (e.g., `v*`)

Older releases may receive community fixes but are not actively maintained for security.

---

## How to Report a Vulnerability

**Please DO NOT open a public issue for security problems.**

Report privately via **GitHub Security Advisories**:

1. Go to the repo’s **Security** tab → **Advisories** → **Report a vulnerability**  
   _URL format:_ `https://github.com/<owner>/<repo>/security/advisories/new`
2. Provide as much detail as possible (see checklist below).
3. You can request encrypted communications (we’ll share a GPG key in the advisory thread if needed).

If you cannot use advisories, you may contact the maintainer via a private channel and we will create a draft advisory.

### What to Include (Checklist)
- Affected version(s) / commit SHA
- Component / package (e.g., `@widgets/<name>`), or path(s) in repo
- Impact and severity (what an attacker can do)
- Steps to reproduce (PoC), with minimal configuration
- Environment details (OS, browser/OBS version)
- Any temporary mitigations

---

## Disclosure Policy & Timelines

We follow a **coordinated disclosure** process.

- **Acknowledgement:** within **48 hours**
- **Triage & initial assessment:** within **5 business days**
- **Fix window:** depends on severity
  - **Critical / High:** target **7–14 days**
  - **Medium:** target **30 days**
  - **Low:** next scheduled release

We’ll keep you updated in the private advisory. After a fix is released and users have a reasonable update window, we will publish an advisory with credits (unless you prefer to remain anonymous).

---

## Scope

This repository contains a monorepo of **StreamElements/OBS widgets** and docs. Security reports may include:
- Front‑end code for widgets/components in `packages/*`
- Build tooling / CI workflows under `.github/workflows/*`
- Docs site content in `docs/` (including embedded demos hosted from this repo)

### Out of Scope
- Vulnerabilities in **third‑party services** (e.g., StreamElements platform, OBS itself, browsers)
- Issues requiring privileged local access that do not result in a meaningful security impact
- Denial of service caused by unrealistic inputs (very large payloads, extreme resource constraints)
- Best‑practice requests with no concrete exploit (we still welcome hardening suggestions via regular issues)

---

## Safe Harbor

We will not pursue legal action for **good‑faith** security research that:
- avoids privacy violations, service disruption, or data destruction;
- only targets your own accounts/data or our test/demo pages;
- and **reports** the vulnerability promptly and responsibly via advisories.

Do not attempt to access another user’s data. Do not run automated scans against production endpoints.

---

## Handling of Secrets & Sensitive Data

If you discover exposed secrets (tokens, keys):
- Do **not** use them.
- Report via advisory with the file/line/commit.
- We will rotate the secret and invalidate the leak.
- Please delete any local copies immediately.

We use GitHub’s secret scanning & Dependabot; nevertheless, reports of exposed secrets are appreciated.

---

## Hardening Guidance (FYI)

- Use the **latest release** of the affected widget(s)
- Prefer **secure contexts** (HTTPS) when embedding
- Configure **Content Security Policy** if you self‑host demos
- Keep OBS and your browser **up to date**
- Never commit long‑lived tokens; prefer **OIDC** or short‑lived credentials

---

## Credit

We are happy to credit reporters in the published advisory. If you prefer to remain anonymous, let us know in the advisory thread.

---

Thank you for helping us keep the community safe. ❤️
