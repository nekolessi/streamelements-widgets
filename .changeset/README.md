# Changesets

This repo uses Changesets to manage versions and changelogs across the monorepo.

## Common commands
- `pnpm changeset`: create a new changeset interactively.
- `pnpm changeset version`: apply pending changesets, bump versions, update changelogs.
- `pnpm changeset publish`: publish to the registry (optional).

## Flow
1. After making changes, run `pnpm changeset` and choose packages and bump types.
2. Commit the generated file under `.changeset/`.
3. When merging to `main`, run `pnpm changeset version` to bump versions.
4. Tag and release, or let CI create a GitHub Release with built ZIP artifacts.
