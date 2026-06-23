# Changesets

This folder holds [changesets](https://github.com/changesets/changesets) — one Markdown file per pending release note. Changesets drive version bumps and changelog entries for every publishable package in this monorepo (`@gl/elements`, `@gl/jedi`, `@gl/glds-web`, `@gl/ai-magna`, `@gl/ai-jedi`, `@gl/ai-glds-web`). The private `@gl/showcase` app is ignored.

## Adding a changeset

Whenever you make a change that should ship to consumers, add a changeset before opening your PR:

```bash
yarn changeset
```

The CLI will ask which packages you touched and what bump each needs (`patch` / `minor` / `major`), then write a file under `.changeset/` describing the change. Commit that file with the rest of your work.

## Versioning & publishing

CI handles this. When changesets land on `main`, the `release.yml` workflow opens (or updates) a “Version Packages” PR. Merging that PR runs `yarn changeset publish`, which bumps versions, writes `CHANGELOG.md` entries, and pushes tarballs to npm.

Manual usage (rarely needed):

```bash
yarn changeset version   # consume pending changesets, bump versions
yarn release             # build + changeset publish
```

## Configuration

See [`config.json`](./config.json). Key choices:

- `access: public` — scoped `@gl/*` packages publish publicly.
- `baseBranch: main`.
- `ignore: ["@gl/showcase"]` — the catalog app is private and never published.
- `changelog: @changesets/changelog-github` — pulls PR + author links into the changelog.
