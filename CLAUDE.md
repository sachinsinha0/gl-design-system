# CLAUDE.md — gl-app-native-design

A **web-only**, standalone design & prototyping catalog for the `@gl/elements` (Tamagui, Material 3) design system. **Not for production** — no Redux/RTK/navigation/backend/native. Mocked data only.

## Designing or styling any UI → use the `magna-design-system` skill

Any task that picks colors, typography, spacing, components, or component states **must** follow the **`magna-design-system`** skill at [`ai/magna/skills/magna-design-system/SKILL.md`](ai/magna/skills/magna-design-system/SKILL.md) (full details in `reference.md` beside it). Core rules: use Tamagui **role tokens, never raw hex**; pair every role with its `on-` role; build from `@gl/elements`, never raw React-Native primitives; **Lucide icons only**; real `Typography` variants are `h1`–`h5` / `subtitle1`/`2` / `body1`/`2` / `caption1`/`2` / `overline` (no `headline*`/`caption`/`buttonMedium`).

Jedi and GLDS-Web have parallel AI packages under [`ai/jedi/`](ai/jedi/) and [`ai/glds-web/`](ai/glds-web/) with their own design-system skills.

## Commands

```bash
npm install --legacy-peer-deps   # required
npm run dev                      # catalog at http://localhost:5173
npm test                         # Vitest suite
npm run typecheck                # tsc --noEmit
npm run build                    # tsc + vite build
```

## Repo-specific guardrails

- **`@gl/elements` is untyped under `tsc`** (body-less ambient module in `src/types/gl-elements.d.ts`) — `tsc` won't catch wrong props on design-system components, so **render tests are the safety net**. Add a `renderWithProvider` test for each new page/component.
- **Material string-name icons render nothing on web** (shimmed). Use Lucide (`@tamagui/lucide-icons`) + `@gl/elements/icons`.
- `index.html` aliases `window.global = window` (RN animations need it in the browser) — keep it.
- The catalog `src/catalog/registry.tsx` drives both the sidebar and routes; add a page = one entry + one file. Demos wrap in `DemoBlock`/`VariantCell` from `src/showcase-kit`.
- The design system is **vendored** under `src/design-system/` (copy of `gl-app-native/packages/elements/src`); re-sync = re-copy, then re-apply the web-compat fixes documented in the spec §6.1.

## Layout

`src/design-system/` (vendored `@gl/elements`) · `src/catalog/` (registry) · `src/shell/` (sidebar, top bar, theme switcher) · `src/showcase-kit/` · `src/pages/{foundations,components,prototypes}` · `src/patterns/` · `src/mocks/`.
