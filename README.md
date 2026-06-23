# GL App Native — Design Repository

A **web-only design & prototyping environment** that replicates the
`gl-app-native` (`@gl/elements`) Tamagui design system. It is two things at once:

- A browsable **component catalog** (the GL equivalent of an `/elements` page).
- A **screen-prototyping playground** for designers, developers, and AI-assisted UI work.

> ⚠️ **Not for production.** Nothing here ships. There is no Redux, RTK Query,
> React Navigation, analytics, i18n infrastructure, env config, or native code —
> deliberately. The priorities are fast HMR, visual parity with `gl-app-native`,
> and an easy surface for prompt-driven UI.

The full design and rationale live in the spec:
[`docs/superpowers/specs/2026-06-22-design-repository-design.md`](docs/superpowers/specs/2026-06-22-design-repository-design.md).

> 🎨 **Designing or styling UI here?** Use the **`magna-design-system`** skill
> ([`.claude/skills/magna-design-system/`](.claude/skills/magna-design-system/)) — the
> Material-3 role/typography rules for the learner-facing `@gl/elements` system, with
> verified token names. In Claude Code it's auto-discovered; the rules apply to all UI work.

---

## Quick start

```bash
npm install --legacy-peer-deps   # legacy peer deps are required
npm run dev                      # start Vite, opens the catalog at http://localhost:5173
```

Other scripts:

```bash
npm test          # run the full Vitest suite (the type-safety net — see Conventions)
npm run typecheck # tsc --noEmit
npm run build     # tsc --noEmit && vite build
npm run preview   # serve the production build
```

---

## What's inside

The catalog SPA has a sidebar with three groups plus a top-bar **theme switcher**
(light/dark × the 22 GL color themes):

**Foundations** — Colors, Typography, Spacing, Elevation, Icons.

**Components** (13 pages):

- Buttons
- Inputs
- Select & MultiSelect
- Selection controls
- Chips
- Tabs
- Accordion
- Dialogs
- Sheet & Drawer
- Feedback
- Data display
- Navigation
- Grid

**Prototypes** — Overview, Login screen, Feed screen, Detail screen.

The sidebar and routes are both generated from a single registry
(`src/catalog/registry.tsx`), so adding an entry there wires up both.

---

## Project structure

```
src/
├── main.tsx              # entry: loads vector-icon fonts, mounts <App/>
├── App.tsx               # SafeAreaProvider + @gl/elements Provider + RouterProvider
├── router.tsx            # builds react-router routes from the catalog registry
├── design-system/        # VENDORED copy of @gl/elements/src (alias: @gl/elements)
│   └── components/ theme/ hooks/ icons/ css/ utils/ libs/ types/
├── catalog/              # registry.tsx — single source for sidebar groups + routes
├── shell/                # AppShell layout, Sidebar, TopBar, ThemeSwitcher
├── showcase-kit/         # DemoBlock, VariantCell, Swatch — catalog page primitives
├── pages/
│   ├── foundations/      # Colors, Typography, Spacing, Elevation, Icons pages
│   ├── components/       # one page per component category
│   └── prototypes/       # full-screen mockups built from the design system
├── patterns/             # composed blocks: InfoCard, ListItem, ScreenAppBar, EmptyState
├── mocks/                # i18n stub, useToggle, sample data
├── shims/                # web stubs (react-native-vector-icons, react-native-edge-to-edge)
├── types/                # gl-elements.d.ts (ambient module decl for @gl/elements)
└── test/                 # render.tsx (renderWithProvider helper)
```

Every page has a colocated `*.test.tsx`.

---

## How to add a component page

1. Create `src/pages/components/<name>-page.tsx`. Compose the demo with
   `DemoBlock` / `VariantCell` from `src/showcase-kit` and import the components
   you're showing from `@gl/elements`:

   ```tsx
   import { DemoBlock, VariantCell } from '../../showcase-kit';
   import { Button } from '@gl/elements';

   export function MyThingPage() {
     return (
       <DemoBlock title="My thing" description="What it does">
         <VariantCell label="Default">
           <Button>Press me</Button>
         </VariantCell>
       </DemoBlock>
     );
   }
   ```

2. Add **one** entry to the `components` group in `src/catalog/registry.tsx`:

   ```tsx
   { slug: 'my-thing', title: 'My thing', Component: MyThingPage }
   ```

   The sidebar item and the `/my-thing` route are generated automatically. Keep
   slugs unique (a test enforces this).

3. Add a render test next to the page (`<name>-page.test.tsx`) using
   `renderWithProvider` from `src/test/render`:

   ```tsx
   import { renderWithProvider } from '../../test/render';
   import { MyThingPage } from './my-thing-page';

   test('My thing page renders', () => {
     renderWithProvider(<MyThingPage />);
   });
   ```

---

## How to add a prototype

1. Copy an existing file in `src/pages/prototypes/` (e.g. `login-prototype.tsx`)
   as a starting point.
2. Compose the screen from `@gl/elements` primitives plus the reusable blocks in
   `src/patterns/` (`InfoCard`, `ListItem`, `ScreenAppBar`, `EmptyState`).
3. Add a registry entry to the **`prototypes`** group in
   `src/catalog/registry.tsx` (e.g.
   `{ slug: 'proto-thing', title: 'Thing screen', Component: ThingPrototype }`).
4. Add a colocated render test.

---

## Conventions & gotchas

- **Icons: Lucide only.** Use `@tamagui/lucide-icons` or the custom SVG icons in
  `@gl/elements/icons`. The legacy Material font-icon API
  (`<Icon icon="some-name" />`, string names) is **a no-op on web** — it's
  shimmed (`src/shims/react-native-vector-icon.tsx`). Don't rely on it.
- **Use `@gl/elements`, not raw `react-native`.** Build UI from the vendored
  design system so it stays on-theme.
- **Token props, not hardcoded pixels.** Use Tamagui tokens (spacing, color,
  size) instead of raw numeric values so themes apply correctly.
- **Named exports only.** No default exports for pages/components.
- **`@gl/elements` is untyped under tsc.** It's declared as an ambient module in
  `src/types/gl-elements.d.ts`, so `tsc` won't catch prop mistakes inside it —
  **render tests are the safety net.** Always add one.
- **`SafeAreaProvider` is required** (sheets, footers, and `useSafeAreaInsets`
  depend on it). It's already wired in `App.tsx` and in `renderWithProvider`, so
  you don't add it per-page.

---

## Re-syncing the design system from gl-app-native

The `src/design-system/` tree is a **one-time vendored copy**, not a live sync.
To pull updates from the source monorepo:

```bash
cp -R ../gl-app-native/packages/elements/src/. src/design-system/
```

Then **re-apply the web-compatibility fixes** (they get overwritten by the copy):

1. **Synchronous Provider first-paint seed** in
   `src/design-system/components/theme-provider.tsx` — initialize
   `theme`/`colorScheme` synchronously in `useState` by reading `localStorage`
   directly (defaults `'blue'` / `'light'`), so the provider mounts on first
   render instead of painting blank until async storage resolves.
2. Confirm the **shims and aliases in `vite.config.ts`** are still in place: the
   `react-native-vector-icons/dist/*` shims, the `react-native-edge-to-edge`
   stub, `react-native → react-native-web`, and the platform-aware
   `resolve.extensions` (prefer `.web.*` / base, never `.native.*` / `.ios.*`).

Both fixes — and the rest of the required web-compat changes — are documented in
the spec **§6.1**. After re-syncing, run `npm test` to confirm everything still
renders.

---

## AI / prompt-driven UI

This repo is designed to be an easy surface for generating new screens by prompt:

- **Browse the catalog** (`npm run dev`) to discover which components and
  variants exist before composing.
- Build new screens from the **reusable blocks in `src/patterns/`**
  (`InfoCard`, `ListItem`, `ScreenAppBar`, `EmptyState`) plus `@gl/elements`
  primitives.
- Use the **prototype templates** in `src/pages/prototypes/`
  (`login-prototype.tsx`, `feed-prototype.tsx`, `detail-prototype.tsx`) as
  starting points — copy one and adapt it, then register it (see
  [How to add a prototype](#how-to-add-a-prototype)).
