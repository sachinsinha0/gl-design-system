# Multi Design System Platform — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Subagent guidance (per user requirement):** This migration is intended to be executed in **one large migration** delegated across subagents. Each subagent MUST:
> 1. Read this plan plus the design plan ([../plans/2026-06-23-multi-design-system-platform.md](./2026-06-23-multi-design-system-platform.md)) and the original repo conventions in [CLAUDE.md](../../../CLAUDE.md).
> 2. Read the file(s) it will modify **before** making changes.
> 3. Never delete or overwrite a file without verifying its current content matches the expected baseline (the relevant section's "Pre-state" note).
> 4. Validate after each phase by running `yarn typecheck && yarn test && yarn dev` in the workspace root and confirming the showcase still renders.
> 5. If context is unclear or a step diverges from the plan, STOP and surface the question rather than guessing.
>
> **Decisions locked in (from §10 of the design plan):**
> - Package manager: **yarn workspaces**
> - Import name for Magna: **`@gl/elements`** (no rename — package name stays the same)
> - MUI: **v6**
> - NPM scope: **`@gl`** (publishes: `@gl/elements`, `@gl/jedi`, `@gl/glds-web`, `@gl/ai-magna`, `@gl/ai-jedi`, `@gl/ai-glds-web`)
> - GLDS-Web delivery: **HTML + CSS recipes only** — no React wrappers; the showcase renders previews from raw HTML strings (sanitized) plus a code-display
> - AI format: **JSON component definitions + MDX guideline pages**
> - Migration shape: one large coordinated migration

**Goal:** Transform this repo from a single Magna (Tamagui) showcase into a **Design System Platform** hosting three independent first-class design systems (Magna, Jedi, GLDS-Web) and three independent publishable AI packages, with a single shared showcase app.

**Source of record:** [docs/superpowers/plans/2026-06-23-multi-design-system-platform.md](./2026-06-23-multi-design-system-platform.md)

---

## Target file structure (end state)

```
gl-design-system/                         # repo root (no rename in this plan)
├── package.json                          # private root; yarn workspaces
├── yarn.lock
├── tsconfig.base.json
├── .yarnrc.yml                           # if using yarn 4
├── docs/superpowers/{plans,specs}/
│
├── packages/
│   ├── elements/                         # @gl/elements   (Magna, Tamagui) — lifted from src/design-system
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/                          # components/ theme/ hooks/ icons/ css/ utils/ libs/ types/
│   ├── jedi/                             # @gl/jedi       (MUI v6)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/                          # components/ theme/ tokens/
│   └── glds-web/                         # @gl/glds-web   (HTML + CSS recipes only)
│       ├── package.json
│       ├── tsconfig.json
│       └── src/                          # recipes/ (HTML+CSS) styles/ tokens/
│
├── apps/
│   └── showcase/                         # the single Vite SPA (lifted from src/)
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       ├── vitest.setup.ts
│       └── src/
│           ├── main.tsx  App.tsx  router.tsx
│           ├── platform/                 # DS-PLATFORM CORE (DS-agnostic)
│           │   ├── ds-registry.ts
│           │   ├── ds-context.tsx
│           │   ├── providers.tsx
│           │   └── lazy-load.ts
│           ├── shell/  showcase-kit/  search/  docs/  shims/  test/  mocks/
│           └── catalogs/
│               ├── magna/    registry.tsx  foundations/  components/  patterns/  prototypes/
│               ├── jedi/     registry.tsx  foundations/  components/  patterns/  prototypes/
│               └── glds-web/ registry.tsx  foundations/  components/  patterns/  prototypes/  recipe-renderer.tsx
│
└── ai/
    ├── magna/                            # @gl/ai-magna
    │   ├── package.json
    │   ├── README.md
    │   ├── skills/magna-design-system/   # SKILL.md + reference.md (moved from .claude/skills/)
    │   ├── guidelines/                   # *.mdx
    │   ├── components/                   # *.json
    │   └── tokens/tokens.json
    ├── jedi/                             # @gl/ai-jedi (same shape)
    └── glds-web/                         # @gl/ai-glds-web (same shape)
```

---

## Phase 0 — Pre-flight (subagent: SETUP)

### Task 0.1: Capture pre-migration baseline

Files: none (read-only)

- [ ] Run `yarn install --legacy-peer-deps` (or `npm install --legacy-peer-deps`) and confirm `yarn typecheck && yarn test && yarn dev` all succeed.
- [ ] Take a snapshot of `git rev-parse HEAD` and `git status` and record at top of the working branch's PR description.
- [ ] Create the migration branch: `git checkout -b chore/multi-ds-platform-migration`.

**Pre-state:** repo as it exists today — single Magna DS under `src/design-system/`, showcase under `src/`.

---

## Phase 1 — Convert root to yarn workspaces (subagent: WORKSPACE)

### Task 1.1: Initialize yarn

Files: `package.json`, `.yarnrc.yml`, `.gitignore`

- [ ] Verify yarn is installed: `yarn --version`. If yarn 4, run `corepack enable && corepack prepare yarn@stable --activate`.
- [ ] Add to root `package.json`:
  ```json
  {
    "name": "gl-design-system",
    "private": true,
    "packageManager": "yarn@4.x.x",
    "workspaces": ["packages/*", "apps/*", "ai/*"]
  }
  ```
- [ ] Remove `npm`-specific scripts (`npm run *`) — replace with yarn equivalents.
- [ ] Add `.yarn/`, `.pnp.*`, `node_modules`, `.tamagui/`, `dist/`, `coverage/` to `.gitignore` if missing.
- [ ] Decide node-linker. **Recommendation:** add `.yarnrc.yml` with `nodeLinker: node-modules` to keep current behavior and avoid PnP friction with react-native-web/Tamagui patches.

### Task 1.2: Create empty workspace skeletons

Files: `packages/elements/package.json`, `packages/jedi/package.json`, `packages/glds-web/package.json`, `apps/showcase/package.json`, `ai/magna/package.json`, `ai/jedi/package.json`, `ai/glds-web/package.json`

- [ ] Create each `package.json` with just `{ "name": "<scoped-name>", "version": "0.0.0", "private": false }` and no deps. Source folders come in later phases.
- [ ] Run `yarn install` — confirms workspaces resolve. No code yet, so nothing builds.

**Validation:** `yarn workspaces list` shows all 7 workspaces.

---

## Phase 2 — Lift Magna into `packages/elements` (subagent: MAGNA-LIFT)

> Magna's import name **does not change** (`@gl/elements`). This phase is a pure file move plus alias re-target.

### Task 2.1: Move design-system files

Files moved:
- `src/design-system/**` → `packages/elements/src/**`
- `src/types/gl-elements.d.ts` → `packages/elements/src/types/gl-elements.d.ts` (or keep at app level — see Task 4.x)
- `src/shims/react-native-edge-to-edge.ts` → keep at app level (consumed by Vite alias, not by the package itself)
- `src/shims/react-native-vector-icon.tsx` → keep at app level (same reason)

- [ ] `git mv src/design-system packages/elements/src`. Confirm no file content changed.
- [ ] Create `packages/elements/package.json`:
  ```json
  {
    "name": "@gl/elements",
    "version": "0.0.1",
    "private": false,
    "type": "module",
    "main": "src/index.ts",
    "module": "src/index.ts",
    "types": "src/index.ts",
    "exports": {
      ".": "./src/index.ts",
      "./icons": "./src/icons/index.ts",
      "./hooks": "./src/hooks/index.ts",
      "./theme": "./src/theme/index.ts",
      "./css/*": "./src/css/*"
    },
    "peerDependencies": {
      "react": ">=18",
      "react-dom": ">=18",
      "react-native-web": ">=0.20",
      "tamagui": "^1.126.4"
    }
  }
  ```
  (Source-only export; no build step. Vite will consume `.ts`/`.tsx` directly as today.)
- [ ] Create `packages/elements/tsconfig.json` extending `tsconfig.base.json` with `noEmit: true` and `include: ["src/**/*"]`.

### Task 2.2: Re-point the alias

Files: `apps/showcase/vite.config.ts` (created from current `vite.config.ts`), `tsconfig.json` paths

- [ ] In `apps/showcase/vite.config.ts`, change the alias:
  ```ts
  '@gl/elements': path.resolve(__dirname, '../../packages/elements/src')
  ```
- [ ] Update `tsconfig.json` `paths`:
  ```json
  "paths": { "@gl/elements": ["packages/elements/src"], "@gl/elements/*": ["packages/elements/src/*"] }
  ```
- [ ] Keep the ambient module declaration ([src/types/gl-elements.d.ts](src/types/gl-elements.d.ts)) — Magna source remains excluded from strict tsc, so `@gl/elements` continues to resolve to `any` in app code. Move the file to `apps/showcase/src/types/gl-elements.d.ts`.

**Validation:** `yarn workspaces foreach --topological run typecheck`, then start dev server and confirm at least one Magna page renders (e.g. Buttons).

---

## Phase 3 — Lift showcase into `apps/showcase` (subagent: SHOWCASE-LIFT)

### Task 3.1: Move showcase files

Files moved (via `git mv`):
- `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/router.tsx`, `src/smoke.test.tsx` → `apps/showcase/src/`
- `src/shell/`, `src/catalog/`, `src/pages/`, `src/patterns/`, `src/showcase-kit/`, `src/mocks/`, `src/test/`, `src/shims/`, `src/types/` → `apps/showcase/src/`
- `index.html`, `vite.config.ts`, `vitest.config.ts`, `vitest.setup.ts` → `apps/showcase/`

- [ ] Move files. Update `apps/showcase/index.html` to point at `/src/main.tsx` (still works under Vite root = `apps/showcase`).
- [ ] Create `apps/showcase/package.json`:
  ```json
  {
    "name": "@gl/showcase",
    "version": "0.0.0",
    "private": true,
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "test": "vitest run",
      "typecheck": "tsc --noEmit"
    },
    "dependencies": {
      "@gl/elements": "*",
      "@gl/jedi": "*",
      "@gl/glds-web": "*",
      "react": "...",
      "react-dom": "...",
      "react-router-dom": "...",
      "tamagui": "...",
      "@mui/material": "^6.0.0",
      "@emotion/react": "^11",
      "@emotion/styled": "^11",
      "react-native-web": "..."
    }
  }
  ```
  (Versions copied from the current root `package.json`.)
- [ ] Move existing runtime/dev deps from root `package.json` into `apps/showcase/package.json`. Root `package.json` should declare only workspace tooling (e.g. `typescript`, `vitest`).
- [ ] Update `apps/showcase/tsconfig.json` paths and references.

### Task 3.2: Update root scripts

Files: `package.json`

- [ ] Root scripts that forward to the showcase:
  ```json
  "scripts": {
    "dev": "yarn workspace @gl/showcase dev",
    "build": "yarn workspaces foreach --topological --all run build",
    "test": "yarn workspaces foreach --all run test",
    "typecheck": "yarn workspaces foreach --all run typecheck"
  }
  ```

**Validation:** `yarn dev` starts the showcase on port 3000 (or 5173 if reverted); every existing page renders; `yarn test` is green.

---

## Phase 4 — DS-platform core (subagent: PLATFORM-CORE)

### Task 4.1: Define the DesignSystemDescriptor

Files: `apps/showcase/src/platform/ds-registry.ts`, `apps/showcase/src/platform/ds-context.tsx`, `apps/showcase/src/platform/providers.tsx`, `apps/showcase/src/platform/lazy-load.ts`

- [ ] Create `ds-registry.ts`:
  ```ts
  export type DSId = 'magna' | 'jedi' | 'glds-web';
  export type DesignSystemDescriptor = {
    id: DSId;
    label: string;
    tech: 'tamagui' | 'mui' | 'html-css';
    Provider: React.ComponentType<{ children: React.ReactNode }>;
    registry: CatalogGroup[];
    themes?: ThemeOption[];
    loadStyles?: () => Promise<void>;
  };
  const registry = new Map<DSId, DesignSystemDescriptor>();
  export const registerDesignSystem = (d: DesignSystemDescriptor) => registry.set(d.id, d);
  export const getDesignSystem = (id: DSId) => registry.get(id);
  export const listDesignSystems = () => [...registry.values()];
  ```
- [ ] `ds-context.tsx` exposes `useActiveDS()` and `useSetActiveDS()`. Active DS persisted to `localStorage` (`ds.active`), default `magna`.
- [ ] `providers.tsx` mounts the active DS's `Provider` around `<Outlet/>` and (for GLDS-Web) sets `document.documentElement.dataset.ds = id`.
- [ ] `lazy-load.ts`: dynamic `import('../catalogs/<ds>/registry')` per DS so each DS bundle splits.

### Task 4.2: Namespaced routing

Files: `apps/showcase/src/router.tsx`, `apps/showcase/src/shell/sidebar.tsx`, `apps/showcase/src/shell/top-bar.tsx`, new `apps/showcase/src/shell/ds-switcher.tsx`

- [ ] Router builds `/`, `/:dsId/*` routes. `/` redirects to `/${activeDS}`.
- [ ] Sidebar reads from `getDesignSystem(activeDS).registry`.
- [ ] Top-bar adds `<DSSwitcher/>` alongside the existing theme switcher. Switching DS navigates to `/${newDS}` (or to the equivalent path if a same-named entry exists in the new DS — implement a simple name-match in this iteration; sophisticated equivalence map can come later).
- [ ] Theme switcher reads `descriptor.themes` and is hidden when `themes` is `undefined`.

### Task 4.3: Move shared assets to `platform/`

- [ ] `showcase-kit/`, `search/` (new — see Phase 9), `docs/` (new MDX renderer — see Phase 9), `mocks/`, `test/` stay under `apps/showcase/src/` but are imported by all catalogs.

**Validation:** Magna pages still render at `/magna/...`. DS switcher shows only Magna for now (Jedi and GLDS aren't registered yet).

---

## Phase 5 — Wire Magna through the platform (subagent: MAGNA-CATALOG)

### Task 5.1: Build Magna's DesignSystemDescriptor

Files: `apps/showcase/src/catalogs/magna/registry.tsx` (created from current `src/catalog/registry.tsx`), `apps/showcase/src/catalogs/magna/index.ts`

- [ ] Move `apps/showcase/src/catalog/` → `apps/showcase/src/catalogs/magna/`.
- [ ] Move all `apps/showcase/src/pages/{foundations,components,prototypes}/` → `apps/showcase/src/catalogs/magna/{foundations,components,prototypes}/`.
- [ ] Move `apps/showcase/src/patterns/` → `apps/showcase/src/catalogs/magna/patterns/` (Magna-specific patterns; Jedi and GLDS will have their own).
- [ ] In `catalogs/magna/index.ts`:
  ```ts
  registerDesignSystem({
    id: 'magna',
    label: 'Magna',
    tech: 'tamagui',
    Provider: MagnaProvider,           // wraps the vendored Tamagui Provider
    registry: magnaCatalogGroups,
    themes: magnaThemes                // existing GL color themes
  });
  ```
- [ ] Update all moved imports to use the new relative paths.

**Validation:** Every page that worked before still works at `/magna/<route>`. `yarn test` green.

---

## Phase 6 — Scaffold `packages/jedi` (subagent: JEDI-PKG)

### Task 6.1: Initialize Jedi package

Files: `packages/jedi/package.json`, `packages/jedi/src/index.ts`, `packages/jedi/src/theme/index.ts`, `packages/jedi/src/theme/tokens.ts`

- [ ] `package.json`:
  ```json
  {
    "name": "@gl/jedi",
    "version": "0.0.1",
    "private": false,
    "type": "module",
    "main": "src/index.ts",
    "module": "src/index.ts",
    "types": "src/index.ts",
    "peerDependencies": {
      "react": ">=18",
      "react-dom": ">=18",
      "@mui/material": "^6.0.0",
      "@emotion/react": "^11",
      "@emotion/styled": "^11"
    }
  }
  ```
- [ ] `theme/tokens.ts` — Jedi's design tokens (palette, typography scale, spacing, shape, radii). Author from scratch; do NOT copy Magna tokens. (Initial values can be MUI defaults; tokens get refined in spec iterations.)
- [ ] `theme/index.ts` — `createTheme()` with tokens applied. Export `jediTheme`.
- [ ] `src/index.ts` exports `jediTheme` plus `JediProvider` (= `ThemeProvider` + `CssBaseline` scoped under a wrapper div, not global, so Magna pages aren't affected when Jedi is inactive).
- [ ] Two seed components: `components/Button.tsx` (re-export MUI `Button` with Jedi defaults), `components/TextField.tsx`.

### Task 6.2: Showcase plumbing for Jedi

Files: `apps/showcase/src/catalogs/jedi/{registry.tsx,index.ts,foundations/,components/}`

- [ ] Register Jedi descriptor.
- [ ] Seed pages: `foundations/colors-page.tsx`, `foundations/typography-page.tsx`, `components/buttons-page.tsx`. Use `showcase-kit` (`DemoBlock`, `VariantGrid`) for shared chrome.
- [ ] Add a render test per page in `apps/showcase/src/test/render-jedi.tsx` (Jedi-flavored render helper that wraps in `JediProvider`).

**Validation:** Switching to Jedi in the top-bar renders MUI Buttons with Jedi theme. Magna pages still render correctly when switched back.

---

## Phase 7 — Scaffold `packages/glds-web` (subagent: GLDS-PKG)

### Task 7.1: Initialize GLDS-Web package (HTML+CSS only)

Files: `packages/glds-web/package.json`, `packages/glds-web/src/styles/{reset.css,tokens.css,utilities.css}`, `packages/glds-web/src/tokens/tokens.json`, `packages/glds-web/src/recipes/<component>/{markup.html,styles.css,recipe.json}`, `packages/glds-web/src/index.ts`

- [ ] `package.json`:
  ```json
  {
    "name": "@gl/glds-web",
    "version": "0.0.1",
    "private": false,
    "main": "src/index.ts",
    "exports": {
      ".": "./src/index.ts",
      "./styles/*": "./src/styles/*",
      "./recipes/*": "./src/recipes/*",
      "./tokens.json": "./src/tokens/tokens.json"
    },
    "peerDependencies": {}
  }
  ```
- [ ] Tokens authored as JSON (`tokens/tokens.json`) — palette, type scale, spacing, radii, elevation. A small build script generates `styles/tokens.css` as CSS custom properties **scoped under `[data-ds="glds-web"]`** so they cannot leak.
- [ ] `styles/reset.css` — modern CSS reset.
- [ ] `styles/utilities.css` — small utility set (spacing, layout) as the spec evolves.
- [ ] Recipe shape per component (e.g. `recipes/button/`):
  ```
  recipes/button/
  ├── recipe.json         # { name, description, slots, variants, tokens-used, examples }
  ├── markup.html         # canonical HTML, with class names
  └── styles.css          # CSS, all selectors prefixed with [data-ds="glds-web"]
  ```
- [ ] `src/index.ts` exports a manifest:
  ```ts
  export const glds = {
    tokens: () => import('./tokens/tokens.json'),
    recipes: {
      button: () => Promise.all([
        import('./recipes/button/recipe.json'),
        import('./recipes/button/markup.html?raw'),
        import('./recipes/button/styles.css?raw')
      ])
    }
  };
  ```
- [ ] Seed 3 recipes: `button`, `card`, `text-field`.

### Task 7.2: Showcase plumbing for GLDS-Web (HTML preview renderer)

Files: `apps/showcase/src/catalogs/glds-web/{registry.tsx,index.ts,recipe-renderer.tsx,foundations/,components/}`

- [ ] `recipe-renderer.tsx` — a React component that takes a recipe id, loads its `markup.html` + `styles.css` strings, and renders:
  1. A **live preview**: `<style>` tag with the recipe CSS + `<div dangerouslySetInnerHTML={{__html: markup}}/>` inside a wrapper with `data-ds="glds-web"`. Wrap in a Shadow DOM if feasible to fully isolate; otherwise rely on the `data-ds` scope.
  2. A **code panel** with two tabs (HTML / CSS) showing the recipe source.
  3. A **copy** button per panel.
- [ ] Register descriptor. `loadStyles` returns `import('@gl/glds-web/styles/reset.css?inline')` once.
- [ ] Seed pages: `foundations/tokens-page.tsx`, `foundations/typography-page.tsx`, `components/button-page.tsx`, `components/card-page.tsx`.
- [ ] **Sanitization:** the recipe HTML/CSS comes from our own package, but we still pass it through a small allow-list (`DOMPurify`) before injecting, to keep this safe-by-default if a community recipe ever lands.

**Validation:** Switching to GLDS-Web shows the Button recipe with a live preview matching the CSS-only design, plus the copy-able source. Switching back to Magna shows no GLDS styles bleed.

---

## Phase 8 — AI distribution scaffolding (subagent: AI-SCAFFOLD)

### Task 8.1: Create AI package skeletons

Files per AI package:
```
ai/<ds>/
├── package.json
├── README.md
├── skills/<ds>-design-system/{SKILL.md,reference.md}
├── guidelines/{color,typography,spacing,accessibility}.mdx
├── components/                # JSON files added in Phase 9
├── tokens/tokens.json         # generated; see Phase 9
└── .npmignore                 # exclude scripts/tests
```

- [ ] `ai/magna/package.json`:
  ```json
  {
    "name": "@gl/ai-magna",
    "version": "0.0.1",
    "private": false,
    "files": ["skills", "guidelines", "components", "tokens", "README.md"]
  }
  ```
- [ ] Same shape for `ai/jedi`, `ai/glds-web` (names `@gl/ai-jedi`, `@gl/ai-glds-web`).
- [ ] README per package explains: install, where the skill lives, how to load it in Claude/Cursor/VS Code Copilot, what's in `tokens.json` / `components/`.

### Task 8.2: Migrate the existing Magna skill

Files: existing `.claude/skills/magna-design-system/SKILL.md` (referenced from CLAUDE.md) → `ai/magna/skills/magna-design-system/`

- [ ] Move the skill files. Update [CLAUDE.md](../../../CLAUDE.md) reference to the new location.
- [ ] Seed empty `SKILL.md` + `reference.md` for Jedi and GLDS-Web (frontmatter + "TODO: write rules" placeholder). These get filled in Phase 10.

**Validation:** `yarn workspace @gl/ai-magna pack` produces a tarball that contains the skill, README, and folder layout (no JS, no node_modules).

---

## Phase 9 — Token sync + component definitions (subagent: AI-CONTENT)

### Task 9.1: Token generators

Files: `scripts/generate-ai-tokens.ts` (or per-DS scripts under `packages/<ds>/scripts/`)

- [ ] **Magna:** read `packages/elements/src/theme/tokens.ts` + `packages/elements/src/theme/colors/*.ts` and emit `ai/magna/tokens/tokens.json` with: role tokens (semantic), palette per theme, type scale, spacing scale.
- [ ] **Jedi:** read `packages/jedi/src/theme/tokens.ts` and emit `ai/jedi/tokens/tokens.json`.
- [ ] **GLDS-Web:** copy `packages/glds-web/src/tokens/tokens.json` (already JSON) → `ai/glds-web/tokens/tokens.json`.
- [ ] Add CI step: `yarn ai:tokens:check` runs the generators with `--dry-run` and fails if the AI tokens are stale relative to source. (Implement via diff against the committed file.)

### Task 9.2: Component definition JSON

Files: `ai/<ds>/components/<component>.json`

- [ ] Decide schema and document it once in `ai/_schema/component.schema.json`:
  ```jsonc
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "DSComponentDefinition",
    "required": ["name", "ds", "summary", "props", "examples"],
    "properties": {
      "name": { "type": "string" },
      "ds": { "enum": ["magna", "jedi", "glds-web"] },
      "summary": { "type": "string" },
      "slots": { "type": "array" },
      "props": { "type": "array" },
      "do": { "type": "array" },
      "dont": { "type": "array" },
      "tokensUsed": { "type": "array" },
      "examples": { "type": "array" }
    }
  }
  ```
- [ ] Author definitions for the seed components per DS (matches Phase 5–7 seed list).
- [ ] Add `yarn ai:lint` — validates every JSON against the schema and that every referenced token exists in `tokens.json`.

### Task 9.3: Guideline MDX

Files: `ai/<ds>/guidelines/{color,typography,spacing,accessibility,usage}.mdx`

- [ ] Author one MDX guideline per topic per DS. Use the canonical voice of the DS — Magna's guidelines stay Tamagui/Material-3-token-first; Jedi's are MUI-theme-first; GLDS-Web's are CSS-token-first.

**Validation:** `yarn ai:tokens:check && yarn ai:lint` both green. Each `@gl/ai-<ds>` package is independently pack-able.

---

## Phase 10 — Cross-cutting features (subagent: PLATFORM-FEATURES)

### Task 10.1: Cross-catalog search

Files: `apps/showcase/src/search/index.ts`, top-bar integration

- [ ] Use `minisearch`. Build one index per DS at registry registration time (entries = catalog node `id`/`label`/`tags`).
- [ ] Search box in top-bar. Default scope = active DS; toggle "All DSes" shows cross-DS results with a DS badge per hit.

### Task 10.2: MDX guideline rendering inside the showcase

Files: `apps/showcase/src/docs/mdx-page.tsx`

- [ ] `@mdx-js/react` + `vite-plugin-mdx`. Each AI package's `guidelines/*.mdx` can be **rendered inside the showcase** as a "Guidelines" sub-section in the matching DS's sidebar, so the website and the AI package consume the same source.

### Task 10.3: DS-switch deep-link equivalence

- [ ] Implement the path-equivalence helper (e.g. `/magna/components/button` → `/jedi/components/button` if Jedi has a matching entry id; else `/jedi`).

**Validation:** Search returns hits from the active DS; switching DS keeps the user on the equivalent page or lands on the new DS's home.

---

## Phase 11 — Publishing pipeline (subagent: RELEASE)

### Task 11.1: Changesets

- [ ] Install `@changesets/cli` at the workspace root. Run `yarn changeset init`. Configure ignored packages list to exclude `@gl/showcase`.
- [ ] CI: on `main`, run `yarn changeset version` + `yarn changeset publish` when changesets are present.

### Task 11.2: `npm publish --dry-run` per package

- [ ] Add `yarn workspaces foreach --no-private --include '@gl/*' run pack` to CI. Verifies every publishable package produces a clean tarball.

### Task 11.3: README + CLAUDE.md updates

- [ ] Refresh [README.md](../../../README.md) with the new platform overview, repo layout, and how to add a fourth DS (link to this plan).
- [ ] Refresh [CLAUDE.md](../../../CLAUDE.md): the `magna-design-system` skill reference now points to `ai/magna/skills/...`; mention Jedi and GLDS-Web skills exist under their respective AI packages.

**Validation:** Tagged release publishes all changed packages to the configured registry without manual steps.

---

## Phase 12 — Final acceptance (subagent: VERIFY)

- [ ] `yarn install` succeeds with no `--legacy-peer-deps` required (or document why it's still needed).
- [ ] `yarn dev` starts the showcase; user can switch Magna ↔ Jedi ↔ GLDS-Web in the top bar and every DS renders its own implementation.
- [ ] `yarn typecheck` green for all workspaces.
- [ ] `yarn test` green for all workspaces.
- [ ] `yarn workspaces foreach --no-private run pack` produces tarballs for `@gl/elements`, `@gl/jedi`, `@gl/glds-web`, `@gl/ai-magna`, `@gl/ai-jedi`, `@gl/ai-glds-web`.
- [ ] Acceptance test: in a sandbox project, `yarn add @gl/ai-jedi` installs only Jedi assets (no Magna or GLDS files in the tarball).
- [ ] Manual browser smoke test (real browser, not jsdom): theme switching, DS switching, GLDS recipe live preview, MUI Jedi button click — all work.

---

## Subagent assignment summary

| Phase | Subagent | Inputs (must read first) | Outputs |
|---|---|---|---|
| 0 | SETUP | this plan, CLAUDE.md | clean baseline, branch |
| 1 | WORKSPACE | this plan §1 | yarn workspaces enabled |
| 2 | MAGNA-LIFT | §2 + current `src/design-system/` | `packages/elements/` |
| 3 | SHOWCASE-LIFT | §3 + current `src/` | `apps/showcase/` |
| 4 | PLATFORM-CORE | §4 + design plan §5 | DS-platform core under `apps/showcase/src/platform/` |
| 5 | MAGNA-CATALOG | §5 + moved page files | `apps/showcase/src/catalogs/magna/` registered & rendering |
| 6 | JEDI-PKG | §6 | `packages/jedi/` + Jedi catalog seed |
| 7 | GLDS-PKG | §7 | `packages/glds-web/` + GLDS catalog seed + recipe renderer |
| 8 | AI-SCAFFOLD | §8 | `ai/*` skeletons, Magna skill moved |
| 9 | AI-CONTENT | §9 + per-DS source tokens | populated AI packages + token sync scripts |
| 10 | PLATFORM-FEATURES | §10 | search, MDX docs, DS-switch equivalence |
| 11 | RELEASE | §11 | changesets + CI publish |
| 12 | VERIFY | §12 | acceptance report |

Each subagent's first action is to re-read its assigned phase and the design plan, then read every file it intends to modify before changing it.

---

## Open implementation questions (resolve before starting)

1. **Yarn version** — yarn 1 (classic) or yarn 4 (berry)? Yarn 4 with `nodeLinker: node-modules` is recommended for `workspaces foreach` and changesets; yarn 1 still works but has weaker workspace tooling.
2. **`--legacy-peer-deps` equivalent in yarn** — yarn doesn't need it (it resolves peers differently), but Jedi (`@mui/material`) and Magna (`react-native-web`) may both demand React 18 vs 19. Confirm React version pin (`react@19.x` is currently in this repo).
3. **GLDS-Web preview isolation** — Shadow DOM gives true isolation but breaks dev tools inspection. `data-ds="glds-web"` selector scoping is simpler and good enough if every selector is disciplined. Lock in one approach in the spec doc.
4. **AI package distribution** — public npm vs internal registry? Affects `publishConfig.registry` and CI credentials. Out of scope to decide here but must be answered before Phase 11.
5. **Changesets vs manual SemVer** — confirm changesets is acceptable (recommended); otherwise hand-bump.
