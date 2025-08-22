# Changesets

This repo uses **Changesets** to manage versions & changelogs across the monorepo.

## Common commands
- `pnpm changeset` — create a new changeset interactively (select packages, bump types).
- `pnpm changeset version` — apply pending changesets, bump package versions, update changelogs.
- `pnpm changeset publish` — publish to the registry (optional) or just keep for internal versioning.

## Flow
1. After making changes, run `pnpm changeset` and choose packages + bump types.
2. Commit the generated file under `.changeset/`.
3. When merging to `main`, run `pnpm changeset version` to bump versions.
4. Tag/release or let CI create a GitHub Release with your built ZIPs.
