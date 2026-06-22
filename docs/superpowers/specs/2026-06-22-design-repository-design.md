# GL App Native — Design Repository

**Status:** Approved design (2026-06-22)
**Source of record:** `../gl-app-native` (Yarn monorepo; design system in `packages/elements`, showcase in `packages/app/src/screens/elements-screen/`)

## 1. Purpose

A standalone, **web-only** environment that replicates the `gl-app-native` design system and acts as:

1. A browsable **component catalog** (equivalent to the `/elements` page), and
2. A **screen-prototyping playground** for designers, developers, and AI-assisted UI generation.

It is self-contained and carries **no production baggage** — no Redux, RTK Query, React Navigation, analytics, i18n infrastructure, env config, or native modules. Nothing here ships to production. The priority is fast HMR, visual parity with `gl-app-native`, and an easy surface for prompt-driven UI work.

## 2. Goals & success criteria

A user must be able to:

1. Browse all available design-system components and primitives.
2. Understand the visual language of `gl-app-native` (colors, typography, spacing, icons, elevation, themes).
3. Use prompts to generate and experiment with new UI concepts.
4. Build complete screens from existing reusable components.
5. Prototype experiences without any production infrastructure.

## 3. Foundational decisions (settled)

| Decision | Choice | Rationale |
|---|---|---|
| Platform | **Web only** | Matches the `/elements` reference (a web URL); fast HMR; drops all native build complexity. |
| Design-system source | **Vendor a copy** of `@gl/elements/src` | Self-contained and freely editable; this is a one-time visual-parity replication, not a live sync. |
| Toolchain | **Vite + react-native-web + Tamagui (runtime mode, no optimizing compiler)** | Near-instant HMR, minimal config; no build-time style extraction needed since it never ships. |
| App structure | **Custom SPA with sidebar nav** | Browsable, screen-centric, easy for AI to extend, full control over the GL look. |
| Building blocks | **`@gl/elements` primitives + fresh composed patterns** | Keeps the repo baggage-free; app feature components are deliberately excluded (they drag in Redux/RTK/navigation/i18n/env). |
| Routing | **react-router-dom** | Web-idiomatic; replaces the heavy native-oriented React Navigation setup. |

## 4. Repository structure

```
gl-app-native-design/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
├── docs/superpowers/specs/        # this spec + future specs
└── src/
    ├── main.tsx                    # entry → loads fonts + reset CSS, mounts <App/>
    ├── App.tsx                     # ElementsProvider + Router + AppShell
    ├── design-system/              # VENDORED copy of packages/elements/src
    │   ├── components/ theme/ hooks/ icons/ css/ utils/ libs/ types/
    │   └── index.ts
    ├── shims/                      # web stubs only where required (e.g. burnt toast)
    ├── shell/                      # Sidebar, TopBar, AppShell layout, ThemeSwitcher
    ├── catalog/                    # single registry → drives BOTH sidebar groups and routes
    ├── showcase-kit/               # DemoBlock, VariantGrid, PropRow, Swatch, CodePeek helpers
    ├── pages/
    │   ├── foundations/            # Colors, Typography, Spacing, Elevation, Icons
    │   ├── components/             # one page per component category (see §8)
    │   └── prototypes/             # full-screen mockups built from the design system
    ├── patterns/                   # fresh composed blocks (cards, list items, app bars, empty states)
    └── mocks/                      # mock data + a tiny t() i18n stub
```

The vendored design system is exposed via a path alias **`@gl/elements` → `src/design-system`** (configured in both `vite.config.ts` and `tsconfig.json`). Ported demo code keeps its original `import { Button } from '@gl/elements'` imports, and re-copying from upstream is a clean folder replace.

## 5. Tech stack

| Layer | Choice |
|---|---|
| Bundler / dev server | Vite |
| Framework | React 19 + TypeScript 5.8 |
| Web RN layer | `react-native-web` 0.20 (Vite alias `react-native` → `react-native-web`) |
| UI system | Tamagui 1.126.4 in **runtime mode** — import vendored `tamagui.config.ts`, wrap in `TamaguiProvider` via the vendored `Provider` |
| Routing | `react-router-dom` |
| Icons | `react-native-vector-icons` (Material) via font CSS + `@tamagui/lucide-icons` |
| Fonts | Inter + Material icon fonts loaded via CSS; vendored `reset.css` |

## 6. Design-system vendoring

- Copy `packages/elements/src/**` verbatim into `src/design-system/`.
- Reuse the existing `Provider` component (Tamagui + theme context + portal host).
- Provide **web shims only where needed.** Audited native usage in `elements/src` and its web story:
  - `@react-native-async-storage/async-storage` → works on web (localStorage backend).
  - `react-native-safe-area-context` → works on web (insets resolve to 0).
  - `react-helmet` → web-native.
  - `react-native-vector-icons` (MaterialIcons, MaterialCommunityIcons) → works on web with the icon font CSS loaded.
  - `@tamagui/lucide-icons`, `expo-linear-gradient` → have web support on RNW.
  - `burnt` (toasts) is the one likely native-only peer dep → **stub in `src/shims/`** if any vendored code imports it.

## 7. App shell & navigation

- **Left sidebar** with three groups: **Foundations**, **Components**, **Prototypes**.
- **Top bar** with a **theme switcher**: light/dark color scheme × the ~24 color themes available in `design-system/theme/colors`.
- Both the sidebar and the route table are generated from a single **`catalog` registry**. Adding a page = add one registry entry + one page file. This is the primary extension point for AI/designers.

## 8. Component catalog

One page per category. Seeded by **porting the corresponding demo sections** out of the existing `elements-screen.tsx`, stripped of Redux / i18n / env / external-URL dependencies and switched to local mock data.

Categories (covers the spec's required list):

- Buttons, IconButtons
- Inputs (TextField), TextArea
- Selects, MultiSelect
- Checkbox, Radio / RadioGroup, Switch
- Chips
- Tabs
- Accordion
- Dialogs, AlertDialog, ConfirmDialog
- Sheets (bottom sheets)
- Tooltip
- Badge
- Breadcrumbs
- Avatars
- Progress, Spinners, RadialProgress (loaders/feedback)
- Alerts
- Separator
- Container / Surface (cards)
- Grid
- Bottom Navigation
- App Bar

## 9. Foundations pages

Rendered live from the vendored tokens/theme so they always reflect the real system:

- **Colors** — semantic tokens (surface/onSurface/primary/etc.) + palette swatches.
- **Typography** — the 12 variants (`h1`–`h5`, `subtitle1/2`, `body1/2`, `caption1/2`, `overline`).
- **Spacing** — the token scale (`$0.5`–`$6`+).
- **Elevation** — the shadow styles (xs–3xl).
- **Icons** — the Material + Lucide icon set with names.

## 10. Prototypes & the AI-prototyping workflow

- **Prototypes** group seeds a few full-screen mockups (e.g. a login screen, a list/feed screen, a detail screen) assembled purely from `@gl/elements` + `patterns/`.
- Each prototype is a single self-contained file — the template that AI/designers copy to generate new screens.
- `patterns/` holds fresh, reusable composed blocks (cards, list items, app bars, empty states) built from primitives, so screens can be assembled quickly without re-deriving common layouts.

## 11. Mocking strategy

- All data is local mock data in `src/mocks/`.
- A trivial `t()` i18n stub returns the key/default string, so ported demo code that calls `t()` keeps working without an i18n runtime.
- **Omitted, not ported:** demo sections from the source page that depend on external services (video playback, presigned-URL uploads). They are dropped or replaced with static placeholders.

## 12. Non-goals (explicit)

- Production-ready backend integrations.
- Business logic.
- API integrations (beyond local mocks).
- Deployment to live environments.
- Shipping any code directly to production applications.
- Native (iOS/Android) builds.
- Live upstream sync with `gl-app-native` (re-copy is a manual, deliberate action).

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Tamagui runtime mode + RNW + React 19 Vite wiring (aliasing, `optimizeDeps`, JSX) | Well-trodden path; validate with a minimal "render one Button" smoke test before porting the full catalog. |
| `Provider` renders children only after theme + colorScheme initialize from storage | Ensure sane defaults (light + a default GL theme) so first paint is never blank. |
| Hidden native-only imports surfacing during vendoring | Build incrementally; stub any native-only module (e.g. `burnt`) in `src/shims/` as it appears. |
| Catalog drift from a single 2,600-line source page | Port section-by-section into discrete category pages; do not lift the monolith wholesale. |

## 14. Implementation phasing (high level — full plan to follow)

1. **Scaffold & smoke test** — Vite + RNW + Tamagui runtime; render one vendored `Button` under `Provider`.
2. **Vendor the design system** — copy `elements/src`, wire alias, add shims, load fonts/CSS.
3. **App shell** — sidebar + top bar + theme switcher + catalog registry + router.
4. **Foundations pages** — colors, typography, spacing, elevation, icons.
5. **Component catalog** — port demo sections into category pages with mock data.
6. **Patterns + seed prototypes** — composed blocks and a few full-screen mockups.
7. **README** — how to run, how to add a component page, how to add a prototype (the AI/designer workflow).
