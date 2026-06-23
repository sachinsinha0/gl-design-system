# GL Design Systems Platform

A Yarn 4 monorepo that hosts Great Learning's three first-party design systems — **Magna** (learner-facing, Tamagui + Material 3), **Jedi** (internal & partner tools, MUI v6), and **GLDS-Web** (marketing site, vanilla HTML + CSS recipes) — alongside their **AI guidance packages** and a single **prototyping catalog** that renders every system side by side.

## Repo layout

```
apps/
  showcase/             # @gl/showcase — Vite catalog with per-DS sidebars + routes
packages/
  elements/             # @gl/elements   — Magna runtime (Tamagui, RN-Web, M3)
  jedi/                 # @gl/jedi       — Jedi runtime (MUI v6, jediTheme, Inter)
  glds-web/             # @gl/glds-web   — GLDS-Web runtime (HTML + CSS recipes, Poppins)
ai/
  magna/                # @gl/ai-magna     — Magna skill + components + tokens
  jedi/                 # @gl/ai-jedi      — Jedi skill + components + tokens
  glds-web/             # @gl/ai-glds-web  — GLDS-Web skill + components + tokens
  _schema/              # JSON schema for component definitions
scripts/                # ai:tokens:sync, ai:tokens:check, ai:lint
docs/superpowers/       # design + implementation plans + specs
.changeset/             # pending release notes (Changesets)
.github/workflows/      # ci.yml + release.yml
```

## Packages

| Package          | Description                                                              | Stack                                  |
| ---------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `@gl/elements`   | Magna design system                                                      | Tamagui · React-Native-Web · M3        |
| `@gl/jedi`       | Jedi design system                                                       | MUI v6 · Inter                         |
| `@gl/glds-web`   | GLDS-Web recipes                                                         | HTML + CSS · Poppins                   |
| `@gl/ai-magna`   | AI guidance: skill, components, guidelines, tokens for Magna             | docs-only                              |
| `@gl/ai-jedi`    | AI guidance: skill, components, guidelines, tokens for Jedi              | docs-only                              |
| `@gl/ai-glds-web`| AI guidance: skill, components, guidelines, tokens for GLDS-Web          | docs-only                              |
| `@gl/showcase`   | Multi-DS prototyping catalog (private, never published)                  | Vite + React                           |

## Commands

```bash
yarn install                              # install everything (Yarn 4, immutable in CI)
yarn workspace @gl/showcase dev           # run the catalog at http://localhost:5173
yarn workspace @gl/showcase test --run    # vitest suite for the catalog
yarn workspace @gl/showcase typecheck     # tsc --noEmit for the showcase
yarn workspace @gl/jedi typecheck         # tsc --noEmit for Jedi
yarn workspace @gl/glds-web typecheck     # tsc --noEmit for GLDS-Web

yarn ai:tokens:sync                       # regenerate every ai/<ds>/tokens/tokens.json from source
yarn ai:tokens:check                      # fail if any AI token snapshot is stale
yarn ai:lint                              # validate ai/<ds>/components/*.json against the schema

yarn pack:all                             # dry-run tarballs for all publishable @gl/* packages
yarn changeset                            # add a release note
yarn release                              # build + publish (changesets-driven; CI runs this)
```

## Adding a design system

The showcase routes every DS through a small platform layer — adding a fourth DS is a registry update, not a fork.

1. Register the DS in [`apps/showcase/src/platform/ds-registry.ts`](apps/showcase/src/platform/ds-registry.ts) (id, label, Provider, theme switcher hook).
2. Create a catalog folder at `apps/showcase/src/catalogs/<ds>/` with a `registry.tsx` that drives both the sidebar and routes for that system.
3. Add `packages/<ds>/` with the runtime (and `ai/<ds>/` with skill + components if the system needs AI guidance).
4. Add a changeset and open a PR.

Background and full rationale: [`docs/superpowers/plans/2026-06-23-multi-design-system-platform.md`](docs/superpowers/plans/2026-06-23-multi-design-system-platform.md) and the implementation plan at [`docs/superpowers/plans/2026-06-23-multi-design-system-platform-implementation.md`](docs/superpowers/plans/2026-06-23-multi-design-system-platform-implementation.md).

## AI packages

Each `ai/<ds>/` ships a complete bundle that lets Claude, Cursor, or Copilot generate on-brand UI for that design system without re-discovering the rules:

- `skills/<ds>-design-system/SKILL.md` — full skill with YAML frontmatter; the canonical rules (allowed components, token vocabulary, icons, anti-patterns).
- `skills/<ds>-design-system/context.md` — lean, session-loadable summary of the same rules.
- `skills/<ds>-design-system/reference.md` — long-form reference for deep dives.
- `components/<component>.json` — one definition per component (props, variants, examples). Conforms to [`ai/_schema/component.schema.json`](ai/_schema/component.schema.json), enforced by `yarn ai:lint`.
- `guidelines/*.mdx` — MDX docs for color, typography, spacing, accessibility, usage.
- `tokens/tokens.json` — generated snapshot of the runtime tokens; regenerate with `yarn ai:tokens:sync`, verify with `yarn ai:tokens:check`.

## Contributing

1. Branch off `main`.
2. Make your change. If it affects a publishable package, run `yarn changeset` and describe the bump.
3. Make sure `yarn workspace @gl/showcase test --run`, the relevant typechecks, `yarn ai:tokens:check`, `yarn ai:lint`, and `yarn pack:all` all pass — this is what CI gates on (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).
4. Open a PR. Merging changesets to `main` triggers the release workflow at [`.github/workflows/release.yml`](.github/workflows/release.yml), which opens a Version PR and publishes on merge.

See [`.changeset/README.md`](.changeset/README.md) for the changeset flow.
