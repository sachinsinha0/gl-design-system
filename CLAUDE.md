# CLAUDE.md — GL Design Systems Platform

This is a Yarn 4 monorepo with three first-party Great Learning design systems — **Magna** (`@gl/elements`), **Jedi** (`@gl/jedi`), and **GLDS-Web** (`@gl/glds-web`) — their AI guidance packages under `ai/<ds>/`, and a multi-DS prototyping catalog at [`apps/showcase`](apps/showcase). Every UI task is scoped to one of those design systems; pick the right one first, then follow its skill.

## Active DS detection

Before touching any UI code, identify which design system the work belongs to. The three systems are not interchangeable — they have different runtimes, token vocabularies, and audiences.

| Design system | Audience                                     | Runtime                                | Use it when…                                              |
| ------------- | -------------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| **Magna**     | Learner-facing product UI                    | Tamagui + React-Native-Web · M3 tokens | The screen is part of the learner app experience.         |
| **Jedi**      | Internal tools, partner/admin dashboards     | MUI v6 · `jediTheme` · Inter           | The screen is for staff, B2B partners, or ops tooling.    |
| **GLDS-Web**  | Marketing site, public pages, content        | HTML + CSS recipes · Poppins           | The screen ships on the marketing/website surface.        |

Signals to look at: the catalog folder (`apps/showcase/src/catalogs/<ds>/...`), the importing package (`@gl/elements` vs `@gl/jedi` vs `@gl/glds-web`), the Provider wrapping the route, or the `data-ds="..."` attribute. If still ambiguous, **ask** — do not guess.

## Skills to use

Each DS ships a full Claude skill. Read it before generating UI for that system.

- **Magna UI** → [`ai/magna/skills/magna-design-system/SKILL.md`](ai/magna/skills/magna-design-system/SKILL.md) — Tamagui primitives from `@gl/elements`, M3 role tokens (`$color.primary`, `$color.onSurface`, …), Lucide icons via `@tamagui/lucide-icons`, never raw `react-native` primitives, never hard-coded hex.
- **Jedi UI** → [`ai/jedi/skills/jedi-design-system/SKILL.md`](ai/jedi/skills/jedi-design-system/SKILL.md) — import from `@gl/jedi` (never `@mui/material` directly), wrap regions in `<JediProvider>`, pull colors from `getColors(mode)` and CSS vars, prefer `<ScopedCssBaseline>`.
- **GLDS-Web UI** → [`ai/glds-web/skills/glds-web-design-system/SKILL.md`](ai/glds-web/skills/glds-web-design-system/SKILL.md) — plain HTML + CSS scoped under `[data-ds="glds-web"]`, copy markup from shipped recipes, use CSS custom properties (`var(--glds-color-*)`, `var(--glds-space-*)`), Poppins + Material Icons, never introduce a JS framework dependency.

Each skill folder also has a lean `context.md` suitable for inlining into an AI session and a `reference.md` for deep dives.

## Repo layout

```
apps/
  showcase/             # Vite catalog with per-DS sidebars + routes
packages/
  elements/             # @gl/elements   — Magna (Tamagui, RN-Web, M3)
  jedi/                 # @gl/jedi       — Jedi (MUI v6, jediTheme)
  glds-web/             # @gl/glds-web   — GLDS-Web (HTML + CSS recipes)
ai/
  magna/                # @gl/ai-magna     — Magna AI assets
  jedi/                 # @gl/ai-jedi      — Jedi AI assets
  glds-web/             # @gl/ai-glds-web  — GLDS-Web AI assets
  _schema/              # JSON schema for component definitions
scripts/                # sync-tokens.ts, check-tokens.ts, validate-ai.ts
docs/superpowers/       # design + implementation plans
.changeset/             # pending release notes
.github/workflows/      # ci.yml + release.yml
```

## Commands

```bash
yarn install                              # install everything
yarn workspace @gl/showcase dev           # run the catalog
yarn workspace @gl/showcase test --run    # vitest suite for the catalog
yarn workspace @gl/showcase typecheck     # tsc --noEmit for the catalog
yarn workspace @gl/jedi typecheck         # tsc --noEmit for Jedi
yarn workspace @gl/glds-web typecheck     # tsc --noEmit for GLDS-Web
yarn ai:tokens:sync                       # regenerate AI token snapshots
yarn ai:tokens:check                      # fail if any AI token snapshot is stale
yarn ai:lint                              # validate ai/<ds>/components/*.json
yarn pack:all                             # dry-run tarballs for all publishable @gl/* packages
yarn changeset                            # add a release note
```

## Guardrails

- **`@gl/elements` is untyped under `tsc`.** It's declared as an ambient module via `apps/showcase/src/types/gl-elements.d.ts`, so `tsc` won't catch prop mistakes inside Magna code. **Render tests (`apps/showcase/src/**/*.test.tsx`) are the safety net** — always add or update one when you change a Magna page.
- **Magna icons: Lucide only.** Use `@tamagui/lucide-icons` or the custom SVGs in `@gl/elements/icons`. The legacy `<Icon icon="some-name" />` API (Material font-icon string names) is shimmed and **renders nothing on web** — don't rely on it.
- **Jedi tokens come from `getColors(mode)` and CSS variables.** Pull color values out of the theme (`useTheme()`, `getColors('light' | 'dark')`) or from the CSS custom properties Jedi emits. **Never paste hex literals** into Jedi component code.
- **GLDS-Web is plain HTML + CSS scoped under `[data-ds="glds-web"]`.** All selectors live behind that attribute (set by `<GLDSProvider>`). Recipes are imported as raw text via Vite's `?raw` query and rendered as-is — don't rewrite recipes inline, edit the source recipe under `packages/glds-web/src/recipes/`.
- **Showcase catalogs are registry-driven.** [`apps/showcase/src/catalogs/<ds>/registry.tsx`](apps/showcase/src/catalogs/) generates both the sidebar and the routes for that DS. One entry per page; keep slugs unique.
- **AI tokens are GENERATED — never hand-edit `ai/<ds>/tokens/tokens.json`.** The source of truth is `packages/<ds>/src/theme/...` (Magna, Jedi) or `packages/glds-web/src/tokens/tokens.json` (GLDS-Web). Edit there, then run `yarn ai:tokens:sync`; CI runs `yarn ai:tokens:check` to guarantee they stay in sync.
- **Showcase is private.** `@gl/showcase` is `private: true` and is excluded from changesets and `pack:all`. Don't add it to `dependencies` of any other workspace.
