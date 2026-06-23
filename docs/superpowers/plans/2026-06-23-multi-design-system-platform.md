# Multi Design System Platform — Plan

> **Status:** Draft — no implementation yet. This plan describes the target topology, migration strategy, and phasing for evolving this repo from a single Magna (Tamagui) showcase into a **Design System Platform** that hosts three independent first-class design systems (Magna, Jedi, GLDS‑Web) plus their AI distribution packages.

---

## 1. Problem statement

Today the repo contains:

- One design system: **Magna** (Tamagui) vendored at `src/design-system/`
- One Vite SPA showcase at `src/` (shell, catalog, pages, patterns, prototypes)
- No separate AI distribution

We need to support **three first-class, independent design systems** in the same repo:

| DS | Tech | Notes |
|---|---|---|
| **Magna** | Tamagui + react-native-web | Already vendored |
| **Jedi** | MUI (Material UI v6) | New |
| **GLDS-Web** | Hand-rolled HTML/CSS (CSS modules / vanilla) | New |

A single showcase app must let the user **switch the active DS** (Magna / Jedi / GLDS‑Web) and see that DS's real implementation rendered for components, foundations, patterns, and prototypes.

Each DS must additionally expose a **publishable AI package** under `ai/<ds>/` that contains:

- Claude skill files (`SKILL.md` + supporting docs)
- Design guidelines
- Component definitions (vocabulary for AI / non‑developers)
- Design token references

These three AI packages are **independent** so a consuming project can install only the one for its chosen DS.

---

## 2. Goals

1. **Equal citizenship.** Magna, Jedi, GLDS‑Web are siblings — none is the "main" DS. New DSes can be added without restructuring.
2. **No technology abstraction layer.** We do **not** wrap Tamagui/MUI/CSS behind a unified component API. Each DS is consumed in its own idiomatic way.
3. **Shared showcase shell.** Sidebar, top bar, theme/DS switcher, routing, search, doc-rendering, and `showcase-kit` are shared across all three DSes.
4. **Per-DS catalogs.** Each DS owns its own foundations / components / patterns / prototypes pages (since components and props differ).
5. **Independent AI distribution.** Each DS publishes its own AI package. No cross-leakage of vocabulary.
6. **Publishability.** DS source packages and AI packages can be published to a registry independently.

## 3. Non‑goals

- Unified component API across DSes (e.g. a single `<Button/>` that picks Tamagui vs MUI vs CSS).
- Shared theme system across DSes.
- Live cross‑DS visual diffing.
- Migrating existing pages to other DSes (we add new per‑DS pages instead of moving).
- Server-side / SSR rendering.
- Native iOS / Android targets (web only, as today).

---

## 4. Target repository topology

We move to an **npm workspaces monorepo** with three published DS packages, three published AI packages, and a single showcase app.

```
gl-design-platform/                       # repo root (renamed conceptually)
├── package.json                          # workspaces: packages/* , ai/*
├── tsconfig.base.json
├── vite.config.ts                        # showcase root (or under apps/showcase)
├── docs/
│   └── superpowers/{plans,specs}/
│
├── packages/                             # DS SOURCE PACKAGES (publishable)
│   ├── magna/                            # @gl/magna   (Tamagui)
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── components/  theme/  hooks/  icons/  css/  utils/  libs/  types/
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   │
│   ├── jedi/                             # @gl/jedi    (MUI)
│   │   ├── package.json                  # peers: react, @mui/material, @emotion/*
│   │   ├── src/
│   │   │   ├── components/               # thin re-exports + branded wrappers
│   │   │   ├── theme/                    # createTheme() with Jedi tokens
│   │   │   ├── tokens/                   # color / type / spacing tokens
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   │
│   └── glds-web/                         # @gl/glds-web (HTML + CSS)
│       ├── package.json                  # peers: none (or react if JSX wrappers)
│       ├── src/
│       │   ├── components/               # .tsx + co-located .module.css OR pure HTML+CSS recipes
│       │   ├── styles/                   # reset.css, tokens.css, utilities.css
│       │   ├── tokens/                   # tokens.json + css-vars generator
│       │   └── index.ts
│       └── tsconfig.json
│
├── apps/
│   └── showcase/                         # the SINGLE Vite SPA
│       ├── index.html
│       ├── vite.config.ts                # workspace-aware aliases
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx                   # <PlatformProviders> + <RouterProvider>
│       │   ├── router.tsx                # builds routes from all DS registries
│       │   ├── platform/                 # DS-PLATFORM CORE (DS-agnostic)
│       │   │   ├── ds-context.tsx        # active DS state + switcher hook
│       │   │   ├── ds-registry.ts        # DesignSystemDescriptor type + register()
│       │   │   ├── providers.tsx         # mounts the active DS's <Provider>
│       │   │   └── lazy-load.ts          # dynamic import per DS
│       │   ├── shell/                    # sidebar, top-bar, ds-switcher, theme-switcher
│       │   ├── showcase-kit/             # DemoBlock, VariantGrid, Swatch (shared)
│       │   ├── docs/                     # shared MDX renderer for guideline pages
│       │   ├── search/                   # cross-catalog search
│       │   └── catalogs/                 # per-DS catalogs (presentation only)
│       │       ├── magna/
│       │       │   ├── registry.tsx
│       │       │   ├── foundations/  components/  patterns/  prototypes/
│       │       └── jedi/
│       │           └── …
│       │       └── glds-web/
│       │           └── …
│       └── tsconfig.json
│
└── ai/                                   # AI DISTRIBUTION PACKAGES (publishable, independent)
    ├── magna/                            # @gl/ai-magna
    │   ├── package.json
    │   ├── skills/                       # Claude SKILL.md(s) + reference.md
    │   ├── guidelines/                   # design / usage / a11y guidance (MD/MDX)
    │   ├── components/                   # component definitions (JSON or MDX)
    │   ├── tokens/                       # token reference (JSON)
    │   └── README.md
    ├── jedi/                             # @gl/ai-jedi
    │   └── (same shape)
    └── glds-web/                         # @gl/ai-glds-web
        └── (same shape)
```

### Why monorepo + workspaces
- Each DS gets an independent `package.json`, `version`, peer deps, build output — required for independent publishing.
- The showcase consumes DSes through workspace symlinks during development (true HMR across DSes).
- AI packages live next to source so they can be regenerated from a single PR.

### Why per‑DS catalogs (not a unified registry)
- A "Button" page for Magna and a "Button" page for Jedi import different libraries, accept different props, and use different state patterns. Forcing one shared file would either (a) create a normalization layer (rejected by goal #2) or (b) get cluttered with conditionals.
- Per‑DS catalog files **share** showcase-kit (DemoBlock, VariantGrid), shell, and routing — only the rendered demo code is DS-specific.

---

## 5. Showcase architecture

### 5.1 DS-platform core (`apps/showcase/src/platform/`)

```ts
// ds-registry.ts
export type DesignSystemDescriptor = {
  id: 'magna' | 'jedi' | 'glds-web';
  label: string;
  tech: 'tamagui' | 'mui' | 'html-css';
  Provider: React.ComponentType<{ children: React.ReactNode }>;
  registry: CatalogGroup[];   // foundations / components / patterns / prototypes
  themes?: ThemeOption[];     // optional, DS-specific (e.g. Magna's GL color themes)
  loadStyles?: () => Promise<void>;   // for GLDS-Web CSS bundle
};
```

Each DS catalog calls `registerDesignSystem(descriptor)` and the platform aggregates them.

### 5.2 Routing

Routes are namespaced by DS so deep links survive switching:

```
/                              -> redirect to active DS home (last used, persisted in localStorage)
/magna/foundations/colors
/magna/components/button
/jedi/components/button
/glds-web/foundations/typography
```

The router builds nested route trees from each DS registry.

### 5.3 Active DS switcher

- Top‑bar control with three options (Magna / Jedi / GLDS‑Web), persisted to localStorage.
- Switching navigates to the equivalent route in the new DS where one exists, else the new DS's home page.
- Only the active DS's bundle is loaded (dynamic `import()` in `platform/lazy-load.ts`) to keep initial payload reasonable.

### 5.4 Providers

The platform mounts **only the active DS's provider**:
- **Magna** → existing Tamagui `Provider` (with theme/colorScheme)
- **Jedi** → MUI `ThemeProvider` + `CssBaseline`
- **GLDS-Web** → no React provider; a `useEffect` injects the GLDS stylesheet and sets `data-ds="glds-web"` on `<html>` so token CSS variables scope correctly

This keeps stylesheets and runtime weight isolated per DS.

### 5.5 Shared infrastructure

Stays shared across all DSes:
- `shell/` (sidebar from active DS registry, top-bar, switchers)
- `showcase-kit/` (DemoBlock, VariantGrid, Swatch — DS-agnostic layout helpers)
- `docs/` (MDX renderer for guideline pages)
- `search/` (full-text over all DS registries; filtered by active DS by default, with an "All DSes" toggle)
- `mocks/` (test data shared across catalogs)

---

## 6. Per-DS package design

### 6.1 Magna (`packages/magna`)
- Move existing `src/design-system/` here verbatim.
- Keep the `@gl/elements` alias as a **published name change**: package becomes `@gl/magna`, but we expose the same export surface. (Decision below in §10 — keep the old import path or rebrand.)
- All web-compat fixes from the original spec §6.1 stay valid.

### 6.2 Jedi (`packages/jedi`)
- Built on `@mui/material` v6 + `@emotion/react` + `@emotion/styled`.
- `theme/` defines `createTheme()` with Jedi's palette, typography, shape, components overrides.
- `components/` exports **branded wrappers** where Jedi imposes opinionated props/defaults; otherwise re-exports MUI components directly to avoid pointless indirection.
- No react-native-web dependency.

### 6.3 GLDS‑Web (`packages/glds-web`)
- Pure HTML/CSS. Components are:
  - **Recipe form**: documented HTML markup + class names (for copy/paste into any framework).
  - **React wrappers**: thin functional components that emit the same markup + classes (for use inside our React showcase).
- Tokens live in `tokens/tokens.json` and are compiled to `styles/tokens.css` (CSS custom properties on `[data-ds="glds-web"]`).
- No JS runtime beyond the optional React wrappers — components are styleable from any framework.

### 6.4 Versioning & publishing
- Each package has its own SemVer.
- Changesets (or a similar tool) to coordinate releases.
- CI publishes packages whose contents changed on tagged releases.
- Showcase is **not** published — it's the docs site.

---

## 7. AI distribution packages (`ai/<ds>/`)

### 7.1 Shape (consistent across all three)

```
ai/<ds>/
├── package.json                # name: @gl/ai-<ds>, files: skills/ guidelines/ components/ tokens/
├── README.md                   # how to install + load skill
├── skills/
│   └── <ds>-design-system/
│       ├── SKILL.md            # entry point (frontmatter + when-to-use)
│       └── reference.md        # full rules
├── guidelines/
│   ├── color.md
│   ├── typography.md
│   ├── spacing.md
│   ├── accessibility.md
│   └── …
├── components/
│   └── <component>.json        # one file per component: name, slots, props, do/don't, examples
└── tokens/
    └── tokens.json             # role tokens, palette, type scale, spacing scale
```

### 7.2 Why independent packages
- A consumer building a Jedi app only needs `@gl/ai-jedi` — they should not be polluted by Magna's Tamagui-specific tokens or GLDS-Web's class-name vocabulary.
- A vibe-coding workflow installs one AI package and gets correct, scoped guidance.

### 7.3 Generation pipeline (later phase)
- Token JSON is the source of truth, generated from each DS's token files (`packages/<ds>/src/theme/tokens.*`) so AI tokens never drift from code.
- Component JSON is hand-authored at first; a future enhancement can extract prop tables from TypeScript/MUI/JSDoc.
- Skill/guideline MD is authored by humans; the platform provides a lint script that checks links and references.

### 7.4 Consumer flow
- `npm i -D @gl/ai-magna` (or jedi / glds-web)
- Project's `.claude/skills/` or `AGENTS.md` references the installed skill path.
- Or: `npx @gl/ai-<ds> install` copies skills into the project's customization folder (optional convenience CLI).

---

## 8. Migration strategy (current repo → target topology)

We migrate in place, preserving git history. No big-bang rewrite.

1. **Convert root to workspaces.** Add `workspaces: ["packages/*", "ai/*", "apps/*"]`. Keep current code working.
2. **Lift Magna out.** Move `src/design-system/` → `packages/magna/src/`. Update the `@gl/elements` alias to point at the workspace package. Tests stay green.
3. **Lift showcase.** Move `src/{shell,catalog,pages,patterns,showcase-kit,mocks,test,router,App,main,smoke}` → `apps/showcase/src/`. Update `vite.config.ts`/`tsconfig.json` paths.
4. **Introduce platform core.** Create `apps/showcase/src/platform/` with `DesignSystemDescriptor`, registry, providers, DS switcher. Wire existing Magna pages through it (single DS for now).
5. **Add Jedi scaffold.** Create `packages/jedi/` (theme + 1–2 components) and `apps/showcase/src/catalogs/jedi/` with home + colors page. Validate DS switching works.
6. **Add GLDS‑Web scaffold.** Same as Jedi but for plain HTML/CSS. Validate stylesheet isolation (no Magna or Jedi styles bleeding into GLDS pages and vice versa).
7. **AI skeleton.** Create `ai/{magna,jedi,glds-web}/` with empty `package.json`, README, and folder layout. Move/copy the current `magna-design-system` Claude skill into `ai/magna/skills/`.
8. **Backfill Jedi & GLDS-Web** foundations / components / patterns / prototypes page-by-page, mirroring Magna's catalog.
9. **Cross-cutting features.** Cross-DS search, deep-link preservation across DS switch, per-DS theme switchers, docs/MDX guideline pages.
10. **Publishing pipeline.** Changesets, CI release workflow for both `packages/*` and `ai/*`.

Each phase is independently shippable to the showcase — the platform never breaks mid-migration.

---

## 9. Style & code isolation

To prevent CSS cross-contamination between DSes inside the showcase:

- **Magna**: Tamagui injects scoped styles; safe by default.
- **Jedi**: MUI uses Emotion with class-name hashing; safe by default. CssBaseline is scoped to the Jedi route subtree via a wrapper, not applied globally.
- **GLDS‑Web**: all selectors are nested under `[data-ds="glds-web"]`. The attribute is set/unset by `platform/providers.tsx` when GLDS‑Web is the active DS. Stylesheet is lazy‑loaded.
- The showcase shell uses only `showcase-kit` styles (DS-agnostic) so the chrome looks the same regardless of active DS.

---

## 10. Open decisions (defer to spec phase)

1. **Magna package name.** Keep `@gl/elements` as the import name for backward compatibility, or rebrand to `@gl/magna`? (Lean: rebrand; provide a one-line README upgrade note.)
2. **MUI version.** v5 vs v6. (Lean: v6 — latest stable, supports CSS variables theme.)
3. **GLDS‑Web component delivery.** Pure HTML+CSS recipes only, or also ship thin React wrappers? (Lean: both — HTML/CSS is the spec, React wrappers are an opt-in DX layer used by our own showcase.)
4. **AI package format.** JSON-only component defs vs MDX. (Lean: JSON for machine consumption + optional MDX guideline pages for humans.)
5. **Search.** Lunr / FlexSearch / minisearch — index per DS or unified. (Lean: minisearch, per-DS indexes loaded with the DS.)
6. **Single Vite app vs three sub-apps.** A single app simplifies cross-DS navigation but bundles all platform code together. (Lean: single app with dynamic-import DS bundles.)
7. **Publishing host.** Public npm vs private registry. (Out of scope here; pick when publishing pipeline lands.)
8. **Repo rename.** Repo currently called `gl-design-system`; target is a platform. Rename to e.g. `gl-design-platform`? (Lean: yes, after migration phase 4.)

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| Tamagui + MUI + react-native-web coexisting in one bundle | Dynamic-import each DS; verify no global style or polyfill collisions in the first DS-switching demo. |
| Magna's vendored design system has many web‑compat patches | Preserve them in `packages/magna/src/`; the migration is a file move, not a rewrite. |
| Per‑DS catalog duplication grows | Mitigate via shared `showcase-kit` and a strict authoring convention (one demo per file, no shell logic in pages). |
| AI packages drifting from code | Generate `tokens.json` from each DS's token source; CI check that fails if regen produces a diff. |
| GLDS‑Web styles leaking into other DSes | Mandatory `[data-ds="glds-web"]` selector prefix; add a lint rule that fails on unprefixed top-level selectors. |
| Routing + DS switch breaking deep links | DS namespace in URL (`/magna/...`); equivalence map for "same page in different DS" with safe fallback to DS home. |
| Showcase tests rely on Tamagui-specific provider | Refactor `test/render.tsx` into `renderWithDS(ds, ui)` so each DS provides its own render helper. |

---

## 12. Success criteria

- A developer can run `npm run dev` once and switch between Magna, Jedi, and GLDS‑Web in the top bar; each DS renders its **real** implementation.
- Each DS owns at least: home page, foundations (colors/typography/spacing), and 3+ components, with passing render tests.
- `packages/magna`, `packages/jedi`, `packages/glds-web` build and pass `npm publish --dry-run` independently.
- `ai/magna`, `ai/jedi`, `ai/glds-web` build, contain skill + guidelines + components + tokens, and pass `npm publish --dry-run` independently.
- Installing any one `@gl/ai-<ds>` package in an unrelated project exposes the correct Claude skill and is usable in a vibe-coding flow without referencing the other two DSes.
- Adding a fourth DS in the future requires: one new `packages/<ds>/`, one new `apps/showcase/src/catalogs/<ds>/`, one new `ai/<ds>/`, and one new entry in the platform DS registry — **no changes** to shell, routing, search, or other DSes.

---

## 13. Next step

Promote this plan into a **design spec** at `docs/superpowers/specs/2026-06-23-multi-design-system-platform-design.md` resolving the open decisions in §10, then break it into phased implementation tasks (mirroring the existing plan style in `2026-06-22-design-repository.md`).
