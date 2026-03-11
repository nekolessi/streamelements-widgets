# Security Policy

Thank you for helping keep this project and its users safe.

## Supported Versions
Security fixes are provided for:
- `main` (latest development)
- The most recent tagged release (`v*`)

## How to Report a Vulnerability
Do not open a public issue for security problems.

Report privately via GitHub Security Advisories:
1. Open the repository Security tab.
2. Go to Advisories.
3. Click Report a vulnerability.

If you cannot use advisories, contact the maintainer privately.

### Include this information
- Affected version(s) or commit SHA
- Component/package or file path
- Impact and severity
- Reproduction steps (minimal PoC)
- Environment details (OS, browser/OBS version)
- Temporary mitigations

## Disclosure Policy and Timelines
- Acknowledgement: within 48 hours
- Initial triage: within 5 business days
- Fix windows:
  - Critical/High: target 7-14 days
  - Medium: target 30 days
  - Low: next scheduled release

## Scope
In scope:
- Widget code in `packages/*`
- Build tooling and workflows in `.github/workflows/*`
- Docs in `docs/`

Out of scope:
- Third-party service vulnerabilities (StreamElements platform, OBS, browsers)
- Issues requiring privileged local access without meaningful impact
- Unrealistic denial-of-service inputs

## Safe Harbor
Good-faith security research is welcome when it:
- avoids privacy violations, service disruption, or data destruction
- targets only your own data/accounts or test/demo pages
- is reported promptly via private channels

## Exposed Secrets
If you discover exposed secrets:
- Do not use them.
- Report immediately via advisory.
- Share file path and commit details.

Thank you for helping keep the project safe.
