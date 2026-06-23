---
name: magna-design-system
description: Use when building, styling, or reviewing any learner-facing UI in this repo (the @gl/elements / gl-app-native-design catalog) — picking colors, typography, spacing, components, or states; adding or editing a screen/component/page; or any "make it match the design system / M3 / GL look" task. Triggers on choosing a color or text style, using Tamagui tokens, or wiring component states.
---

# Magna Design System (this repo's @gl/elements)

## Overview

**Magna** is the learner-facing Material 3 design language implemented by **`@gl/elements`** in this repo (Tamagui · Inter · blue seed `#0054D6` · light + dark · 22 color themes). It is the consumer counterpart to *Jedi* (internal/admin — not in this repo).

**The interface is Tamagui role tokens, never raw hex.** Pick the *role* for the job and use its paired `on-` role for content on top. `$primary` text on `$surface`; text **on** a `$primary` fill is `$onPrimary`; on `$primaryContainer` it's `$onPrimaryContainer`. The pairs are contrast-engineered (M3), so following them keeps the UI accessible by construction. Roles flip light/dark automatically — reference the token, never a mode-specific value.

Build with `@gl/elements` components (`Button`, `Typography`, `Container`, …), never raw React-Native primitives or hardcoded pixels.

## The one rule that prevents most mistakes

**Never pick a color by hue.** Pick the role, pair it with its `on-` role. (`I need a blue` → `$primary`, not a hex or a palette ramp.) If a role seems missing, ask — don't invent one.

## Verified tokens — use these EXACT names

These are the real `@gl/elements` token/variant names (verified against `src/design-system/`). The standalone Magna spec doc uses some different names — **trust this section over the doc.**

### Color roles (each pairs with its `on-`)
`primary` `onPrimary` `primaryContainer` `onPrimaryContainer` `primaryFixed` `primaryFixedDim` `onPrimaryFixed` `onPrimaryFixedVariant` `inversePrimary` `surfaceTint` · `secondary*` `tertiary*` (same shape) · `error` `onError` `errorContainer` `onErrorContainer` · `background` `onBackground` `surface` `onSurface` `surfaceVariant` `onSurfaceVariant` · `inverseSurface` `inverseOnSurface` · `outline` `outlineVariant` `scrim` `shadow`.

### Surfaces / elevation (M3 tonal model — NOT shadows)
`surfaceContainerLowest` → `Low` → `surfaceContainer` → `High` → `surfaceContainerHighest`, plus `surfaceBright` / `surfaceDim`. In **light** mode `Lowest` is the brightest (≈white) and `Highest` the most tonal/darkest; dark mode inverts. Default card = `$surfaceContainer`; a raised card = `$surfaceContainerHigh`. Use the `Container` component's `container="lowest|low|default|high|highest"` prop. Raise importance with a higher tonal step before reaching for a divider or shadow.

### State layers (hover/press/drag)
Pre-computed tokens exist — don't hand-tune: `$<role>Opacity8P` (hover), `$Opacity12P` (focus/press), `$Opacity16P` (drag), for essentially every role (e.g. `$onPrimaryOpacity8P`, `$primaryFixedOpacity16P`). `Button`/pressables already apply these; reuse them in custom `hoverStyle`/`pressStyle`.

### Typography — `<Typography variant="…">`, 12 variants (breakpoint-aware)
`h1 h2 h3 h4 h5` (600, `$onSurface`) · `subtitle1 subtitle2` (500, `$onSurface`) · `body1 body2` (400, `$onSurfaceVariant`) · `caption1 caption2` (400, `$onSurfaceVariant`) · `overline` (600, UPPERCASE). Sizes auto-switch desktop/mobile (e.g. `h1` 32/desktop, 26/mobile; body stays 16/14 on both — legibility wins). **There is no `headline*`, `caption` (use `caption1`), `buttonLarge`, or `subtitle1Bold` variant** — those names in the spec doc don't exist here. Button labels are typed internally by `<Button>` (Inter 500, capitalize) — don't wrap them in `Typography`.

## Components (from `@gl/elements`)
`Button` (variant `contained|outlined|tonal|text`, size `sm|md|lg|xl`, `startIcon`/`endIcon`), `IconButton`, `TextField`, `TextArea`, `Select`, `MultiSelect`, `Checkbox`, `Radio`/`RadioGroup`, `Switch`, `Chip`, `Tabs`, `Accordion`, `Dialog`/`AlertDialog`/`ConfirmDialog`, `Sheet`/`Drawer`, `Tooltip`, `Badge`, `Avatar`, `Separator`, `Container`/`Surface`, `Grid`, `AppBar`/`BottomNavigation`/`Footer`, `Breadcrumbs`, `RadialProgress`, `Spinner`. **Icons:** Lucide (`@tamagui/lucide-icons`) + custom SVG in `@gl/elements/icons`. (In this web catalog, Material string-name `<Icon icon="home"/>` is a no-op — use Lucide.)

Browse them live: `npm run dev`. Read prop APIs in `src/design-system/components/`.

## Learner-first rules
- Always use a role with its paired `on-` role. Never `onSurface` text on a `primary` fill.
- `$outline` is for borders / large decorative text only (4.3:1). Body text is `$onSurface` / `$onSurfaceVariant`.
- **Never signal state by color alone** — errors get an icon + message, not just `$error`.
- Touch targets ≥ 48×48dp; ≥ 8dp between them. Body text ≥ 14px on learner surfaces.
- **One primary action per view** (one `primary`/`primaryContainer` emphasis); everything else recedes to surface roles.
- Elevation via `surfaceContainer*` tonal steps, not heavy shadows. Group by proximity + tonal surface, not borders/dividers.
- Disabled = 38% opacity / reduced-emphasis `on-` role — never a custom grey.
- Buttons are **Title Case** (capitalize), not UPPERCASE — only `overline` is uppercased.
- **Links navigate, buttons act** — pick by behavior. An action that looks like a link is still a button (`accessibilityRole="button"`). Icon-only buttons need an `accessibilityLabel`; never icon-only for primary/destructive actions.
- Generous spacing; let M3 tonality create depth. Empty states explain what belongs + offer the action.

## When building (AI protocol)
1. **Stateful components: enumerate states first** — identity (anon/learner/enrolled), domain lifecycle (e.g. course: not-enrolled → in-progress → completed → locked), data (loading/empty/error/partial), interaction (M3 state layers), edge (0/1/many, long titles, slow net). Propose the matrix; confirm only the *unknowable* (one batched round). Build the inferable and declare it.
2. **Reuse before create** — extend an existing `@gl/elements` component; don't fork.
3. **Match codebase precedent** for unspecified patterns.
4. **Cover loading/empty/error**, not just the happy path.
5. End with a **≤5-line coverage report**: `Covered / Assumed / Not covered / Test first / Deviations`.

## Anti-patterns (never generate)
Raw hex/rgba in component code · picking color by hue · mismatched role pairs · invented success/warning/info colors (use an extended hue's container + `on-`container pair) · heavy shadows for elevation · UPPERCASE buttons · body < 14px · touch targets < 48dp · two primary actions in one view · happy-path-only (missing loading/empty/error) · confirm dialogs on harmless reversible actions · icon-only primary/destructive actions · icon button with no accessible name · `onPress` wired onto a link (or a link used for an in-place action) · inventing a token that doesn't exist (ask) · borders/dividers where a tonal surface would group.

## Reference
Full source-of-truth (color tables, full type scale, usability + interaction rules, Tamagui wiring) with this repo's corrections: see `reference.md` in this skill folder. Authoritative source of token *values*: `src/design-system/theme/colors/*` and `theme/fonts.ts`.
