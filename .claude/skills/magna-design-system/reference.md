# Magna Design System — Reference (reconciled with `@gl/elements`)

> **Status:** This is the Magna source-of-truth doc, **corrected to match the `@gl/elements` design system actually vendored in this repo.** Where the original standalone spec diverged from the implementation, this file uses the implementation and flags the fix with **[CORRECTED]**. **Token names and values are authoritative in code:** `src/design-system/theme/colors/*` (color) and `src/design-system/theme/fonts.ts` (type). Hexes here are for verification only — use tokens.

**Scope:** Color (Material 3 role system) + Typography. Component visuals beyond this inherit Tamagui/`@gl/elements` defaults.
**Stack:** Tamagui (web + native shared) · Light & Dark · Font **Inter** · Color model **Material 3**, blue seed `#0054D6`.
**Audience:** Learners / end users. Consumer counterpart to **Jedi** (internal/admin — not in this repo).
**Philosophy:** Form follows function, but for learners *clarity, warmth, confidence* outrank density. Use M3 roles, never raw hex.

---

## 0. Implementation mapping (read this first)

How the Magna spec names map to what you actually type in this repo:

| Magna spec says | In this repo (`@gl/elements`) |
|---|---|
| Type token `headline1`…`headline5` | `<Typography variant="h1">`…`"h5"` |
| Type token `caption` | `caption1` (12px). `caption2` = 10px (mobile) / 12px (desktop) |
| Type tokens `buttonLarge/Medium/Small` | **Not Typography variants.** `<Button>` types its own label (Inter 500, capitalize) by `size` (`sm`/`md`/`lg`/`xl`) |
| Emphasis `subtitle1Bold`, `subtitle2Bold`, `subtitle1Medium` | **Do not exist.** Only `subtitle1` / `subtitle2` |
| Desktop vs mobile scale | One `variant`; size auto-switches by breakpoint (`useFontByBreakpoint`) |
| "Apply on- role at 8/12/16%" | Pre-computed tokens exist: `$<role>Opacity8P` / `12P` / `16P` |
| `magnaOrange` alternate theme | One of **22** named themes (`orange-theme.ts`, etc.); switch via the theme provider |
| Color roles (`$primary`, `$onSurface`, …) | **Match exactly** — same names, blue seed `#0054D6` |

---

## 1. How Material 3 color works here

Magna uses the **M3 role system**: every color is a *semantic role*, and roles come in **pairs** — a container/surface role and its matching `on-` role guaranteed to have accessible contrast on top of it.

**The one rule that prevents 90% of mistakes:** never pick a color by hue. Pick the *role* for the job and use its paired `on-` role for content on top. `primary` text goes on `surface`; text **on** a `primary` fill is `onPrimary`; on a `primaryContainer` it's `onPrimaryContainer`. Pairs are contrast-engineered, so following them keeps the product accessible by construction. Roles flip light/dark automatically — reference the token, never a mode-specific hex.

---

## 2. Color System — M3 roles (blue theme, the default)

Token names are the Tamagui token names. Hexes are light / dark, **verified against `blue-theme.ts`**.

### 2.1 Primary
| Token | Light | Dark |
|---|---|---|
| `$primary` / `$onPrimary` | `#0054d6` / `#ffffff` | `#b3c5ff` / `#002b75` |
| `$primaryContainer` / `$onPrimaryContainer` | `#dae1ff` / `#001849` | `#003fa4` / `#dae1ff` |
| `$primaryFixed` / `$primaryFixedDim` | `#dae1ff` / `#b3c5ff` | `#dae1ff` / `#b3c5ff` |
| `$onPrimaryFixed` / `$onPrimaryFixedVariant` | `#001849` / `#003fa4` | same |
| `$inversePrimary` | `#b3c5ff` | `#0054d6` |
| `$surfaceTint` | `#0054d6` | `#b3c5ff` |

Use `primary` for the single main action/emphasis per view; `primaryContainer` for tonal standout (selected chips, hero tints).

### 2.2 Secondary & Tertiary
Full role sets exist with the same shape (`$secondary` / `$onSecondary` / `$secondaryContainer` / `$onSecondaryContainer` + `-fixed` / `-fixedDim`; same for tertiary). Light: `$secondary` `#3a3bff`, `$secondaryContainer` `#e1e0ff`; `$tertiary` `#8b00e8`, `$tertiaryContainer` `#f1dbff`. Secondary = less-prominent components (filter chips, secondary buttons). Tertiary = contrasting accents, used sparingly.

### 2.3 Error (the only "status" role in M3)
| Token | Light | Dark |
|---|---|---|
| `$error` / `$onError` | `#ba1a17` / `#ffffff` | `#ffb4aa` / `#690003` |
| `$errorContainer` / `$onErrorContainer` | `#ffdad5` / `#410001` | `#2d171a` / `#ffdad5` |

> **M3 has no built-in success/warning/info roles.** For those, use a container + `on-`container pair from an extended hue (see §2.7). Never invent loose green/amber text colors.

### 2.4 Surfaces & containers — M3 tonal elevation **[CORRECTED]**
M3 expresses elevation through **tonal surface roles, not shadows.** In **light** mode the tonal scale runs **`Lowest` = brightest (white) → `Highest` = most tonal (darkest)**; dark mode inverts.

> **[CORRECTED]** The standalone spec listed this scale inverted (Lowest `#E4E2E6` → Highest `#FFFFFF`) and said "higher = lighter." The implementation (and baseline M3) is the opposite, below.

| Token | Light | Dark | Use |
|---|---|---|---|
| `$background` / `$onBackground` | `#fdfbff` / `#1a1b1e` | `#1a1b1e` / `#e3e2e6` | App background |
| `$surface` / `$onSurface` | `#faf9fd` / `#1a1b1e` | `#121316` / `#c7c6ca` | Default surface + text |
| `$surfaceVariant` / `$onSurfaceVariant` | `#e2e2ec` / `#45464f` | `#45464f` / `#c5c6d0` | Lower-emphasis fills, secondary text |
| `$surfaceContainerLowest` | `#ffffff` | `#0d0e11` | Brightest tonal layer (light) |
| `$surfaceContainerLow` | `#f4f3f7` | `#1a1b1e` | |
| `$surfaceContainer` | `#efedf1` | `#1e1f23` | **Default card surface** |
| `$surfaceContainerHigh` | `#e9e7ec` | `#292a2d` | Raised cards, sheets |
| `$surfaceContainerHighest` | `#e3e2e6` | `#343538` | Most tonal layer, menus |
| `$surfaceBright` / `$surfaceDim` | `#faf9fd` / `#dbd9dd` | `#38393c` / `#121316` | Brightest / dimmest |
| `$inverseSurface` / `$inverseOnSurface` | `#2f3033` / `#f1f0f4` | `#e3e2e6` / `#1a1b1e` | Snackbars, tooltips |

Use the `Container` component's `container` prop: `"lowest" | "low" | "default" | "high" | "highest"` → the matching token. A card is `container="default"` (`$surfaceContainer`); a raised card is `container="high"`. Text on any is `$onSurface` (or `$onSurfaceVariant` for secondary). There's also a `$background2` `#f2f4f7` utility surface.

### 2.5 Outline & utility **[CORRECTED hexes]**
| Token | Light | Dark | Use |
|---|---|---|---|
| `$outline` | `#757680` | `#8f909a` | Borders, dividers, field outlines (decorative/AA-large) |
| `$outlineVariant` | `#ebebef` | `#45464f` | Subtle separators, disabled outlines |
| `$scrim` | `#000000` | `#000000` | Modal/scrim base (apply opacity) |
| `$shadow` | `#000000` | `#000000` | Shadow color when shadows are used |

> **[CORRECTED]** spec said light `$outlineVariant` = `#C5C6D0`; implementation is `#ebebef`.

### 2.6 State layers **[CORRECTED — tokens exist]**
M3 communicates hover/focus/press via state-layer overlays: the relevant `on-` role at a fixed opacity. **This repo ships them as named tokens** — use them, don't hand-mix opacity:
- hover **8%** → `$<role>Opacity8P` · focus/press **12%** → `$<role>Opacity12P` · drag **16%** → `$<role>Opacity16P`

Available for essentially every role (`$onPrimaryOpacity8P`, `$primaryOpacity12P`, `$surfaceContainerHighOpacity8P`, `$primaryFixedOpacity16P`, …). `Button` and pressables already apply the correct ones; reference these tokens in custom `hoverStyle`/`pressStyle`.

### 2.7 Extended palette & alternate themes
The repo ships **22 full themes** (blue [default], deeporange, darkteal, gold, eggplant, glapremium, olive, ocean, stormblue, ink, midnight, rust, mint, cyan, deeppurple, green, lightblue, orange, pink, purple, rose, lime) — each a complete M3 role set in light + dark, switchable via the theme provider (`useThemeSetting`). Extended tonal ramps / custom hues live in `theme/colors/custom-colors.ts`, `tones.ts`, `common.ts`. Use extended hues for **data-viz / category coding** and for **success/warning/info** (always a container + `on-`container pair). Core chrome (buttons, links, nav) uses the semantic roles.

### 2.8 Common
`white` `#ffffff`, `black` `#000000` — mode-invariant; only for content that must not flip (image overlays, brand marks).

---

## 3. Typography **[CORRECTED token names]**

**Single family: Inter.** Weights 400 / 500 / 600. Use `<Typography variant="…">`. **12 variants**, each **breakpoint-aware** (desktop and mobile sizes auto-resolve via `useFontByBreakpoint`).

| `variant` | Desktop size/line | Mobile size/line | Weight | LS | Default color |
|---|---|---|---|---|---|
| `h1` | 32 / 36 | 26 / 32 | 600 | -0.4 | `$onSurface` |
| `h2` | 28 / 32 | 24 / 28 | 600 | -0.4 | `$onSurface` |
| `h3` | 24 / 28 | 22 / 24 | 600 | -0.4 | `$onSurface` |
| `h4` | 20 / 24 | 20 / 24 | 600 | -0.4 | `$onSurface` |
| `h5` | 18 / 24 | 18 / 24 | 600 | -0.4 | `$onSurface` |
| `subtitle1` | 16 / 28 | 16 / 24 | 500 | 0 | `$onSurface` |
| `subtitle2` | 14 / 24 | 14 / 20 | 500 | 0 | `$onSurface` |
| `body1` | 16 / 24 | 16 / 20 | 400 | 0 | `$onSurfaceVariant` |
| `body2` | 14 / 20 | 14 / 20 | 400 | 0 | `$onSurfaceVariant` |
| `caption1` | 12 / 16 | 12 / 16 | 400 | -0.2 | `$onSurfaceVariant` |
| `caption2` | 12 / 16 | 10 / 16 | 400 | -0.2 | `$onSurfaceVariant` |
| `overline` | 10 / 16 (UPPERCASE) | 10 / 16 | 600 | 1.2 | `$onSurface` |

Notes:
- **Body text does not shrink on mobile** (stays 16/14) — legibility over density.
- **Buttons** are typed internally by `<Button>` (Inter 500, sizes `sm` 12 / `md` 14 / `lg` 16 / `xl` 16, **capitalize** = Title-Case-ish). Do **not** use `<Typography variant="buttonMedium">` — that variant doesn't exist.
- There is **no** `headline*`, `caption`, `subtitle1Bold`, `subtitle1Medium`, or `captionMobile` variant. Map per §0.
- Choose by structural level, not size. One top-level heading per screen; levels descend without skipping.

---

## 4. Usability Rules (learner-first)

### 4.1 Contrast — M3 pairs are pre-verified
Following the role pairing *is* the accessibility rule. Measured (blue): `onPrimary`/`primary` 6.48:1 (L) · `onSurface`/`surface` 16.4:1 (L) · `onSurfaceVariant`/`surface` 8.9:1 · `onPrimaryContainer`/`primaryContainer` 13.2:1 · `primary`/`surface` 6.18:1 · `onError`/`error` 6.47:1 · `outline`/`surface` 4.30:1 (large/decorative only).

### 4.2 Rules
1. **Always use a role with its paired `on-` role.** Never `onSurface` text on a `primary` fill.
2. **`$outline` is for borders / large or decorative text only** (4.3:1). Body text = `$onSurface` / `$onSurfaceVariant`.
3. **Never communicate state by color alone** — error states get an icon + message.
4. **Touch targets ≥ 48×48dp**, spacing ≥ 8dp.
5. **Body text ≥ 14px** on learner surfaces; 12px caption for metadata, 10px for incidental labels.
6. **Respect the elevation model** — raise with `surfaceContainer*` steps, not heavy shadows; shadows (if any) subtle, `$shadow`.
7. **Disabled** = content at 38% opacity / reduced-emphasis `on-` role — never a custom grey.
8. **Generous spacing.** Learner surfaces breathe.

### 4.3 Semantic elements & accessible names
9. **Links navigate, buttons act — pick by behavior.** Route change = link; action (enroll, open sheet, toggle, submit) = button. An action that *looks* like a link is a **link-styled button** (`accessibilityRole="button"`), never a navigational link with an `onPress`.
10. **Use a link-styled button for inline text actions** ("Show more", "Resume"). Genuine navigation uses a real link (`accessibilityRole="link"`).
11. **Icon-only buttons only for universal actions** (close, back, search, overflow) and **always** with an `accessibilityLabel`/`aria-label` (+ web tooltip). Primary/destructive actions get a labeled button.
12. **One top-level heading per screen; levels descend.** Inputs have labels; meaningful images have alt / `accessibilityLabel`; decorative ones are hidden.

---

## 5. Aesthetic Intent
- **Warm, clear, confident** — reduce learner anxiety. Roomy spacing, large readable type, obvious next actions.
- **Let M3 tonality do the work** — container/surface steps create depth + grouping without borders/shadows. Reach for a higher `surfaceContainer` before a divider.
- **One primary action, made obvious** — a single `primary`/`primaryContainer` emphasis per view.
- **Color carries meaning, not decoration** — `primary` = "the main thing"; tertiary/extended hues = categories/accents.
- **Title Case, friendly voice.**
- **Trends as execution quality** — smooth M3 motion, state layers, refined empty/skeleton states. No legibility-hurting gradients/glass.

---

## 6. Interaction & Behavioral Design (condensed)
1. **~7 options at a designed decision point** (nav/menus/filters) — group/search/progressive-disclose beyond. Data-driven collections instead get search/filter/pagination. `[Hick's/Miller's]`
2. **Forms 7±2 fields/step (max 9)**, chunked with visible progress. `[goal-gradient]`
3. **Defaults do the work** from already-available data. `[Tesler's]`
4. **One primary action per view.** `[Von Restorff]`
5. **Every action >400ms shows state** — skeletons / M3 progress. `[Doherty]`
6. **Success is explicit** — snackbar (`inverseSurface`/`inverseOnSurface`), state change, or check.
7. **Destructive confirms; reversible doesn't** (offer undo). No confirm dialogs on harmless actions.
8. **Prevent before you scold** — inline-validate on blur, constrain inputs.
9. **Errors say what happened + what to do next**, plain language, no codes.
10. **Never destroy user input** on failed submit.
11. **Recognition over recall: visible labels.** No icon-only primary/destructive; icon-only only universal + `accessibilityLabel`.
12. **Multi-step shows where you are**; unfinished work is resumable. `[Zeigarnik]`
13. **Empty states are starting points** — explain + offer the filling action.
14. **Tamagui + M3-standard motion** only; respect reduced-motion; custom animation only on request (flag as deviation).
15. **Tables/lists scan cleanly** — right-align numbers (tabular), left-align text, front-load the distinguishing word.
16. **Label vs value distinct** — label `$onSurfaceVariant`, value `$onSurface`.
17. **One entry point per screen; group by proximity + tonal surface**, not borders.
18. **Plain language; expand acronyms on first use; chunk under subheads.**

---

## 7. AI Engagement Protocol
- **State enumeration before generation** (stateful components): identity (anon / learner / enrolled+roles) · domain lifecycle (e.g. course card: not-logged-in → logged-in-not-enrolled → enrolled-not-started → in-progress → completed → expired/locked) · data (loading/empty/error/partial/populated) · interaction (M3 state layers) · edge (0/1/many, long titles, slow net, no permission). Static pieces skip this.
- **Ask vs assume vs build:** specified → build · inferable → build + declare · unknowable → ask once, batched, as a state matrix. Never drip questions; never ask what you can answer.
- **Coverage report — mandatory, ≤5 lines:** `Covered / Assumed / Not covered / Test first / Deviations`.
- **Reuse before create** — extend an existing `@gl/elements` component; justify any fork.
- **Match codebase precedent** for unspecified patterns.
- **Use M3 role tokens, never raw hex**; pair every surface/container with its `on-` role. Missing role → ask, don't invent.
- **Deviation flag, not refusal** — comply with explicit off-system requests and record under `Deviations`.
- **Tiebreaker** when unspecified+uncovered: fewer steps to task completion, and clearer to a first-time learner.

---

## 8. Tamagui wiring (how it's actually done here)
Each theme is a `{ light, dark }` object of role→hex under `src/design-system/theme/colors/<theme>.ts`; `theme/themes.ts` aggregates the 22 themes; `theme/tamagui.config.ts` builds the Tamagui config; fonts in `theme/fonts.ts` define the 12 variants × {desktop, mobile} keyed by the variant name. Tokens resolve per active theme + mode — reference `$role` and light/dark/theme is handled for free. State-layer tokens (`$<role>OpacityNNP`) are generated per role in each theme file.

---

## 9. Anti-patterns (never generate)
1. Raw hex/rgba in component code — only role tokens.
2. Picking a color by hue instead of role.
3. Mismatched role pairs (`onSurface` on a `primary` fill, etc.).
4. Inventing success/warning/info colors loosely — use an extended hue's container + `on-`container pair.
5. Heavy shadows for elevation — use `surfaceContainer*` steps.
6. UPPERCASE buttons — Magna buttons are Title Case (only `overline` is uppercased).
7. Body text below 14px on learner surfaces.
8. Touch targets under 48dp.
9. Two primary-emphasis actions in one view.
10. Happy-path-only components — missing loading/empty/error is incomplete.
11. Confirm dialogs on harmless reversible actions.
12. Icon-only primary/destructive actions.
13. Icon-only button with no accessible name.
14. `onPress` wired onto something announced as a link (or a link used for an in-place action) — use a link-styled button.
15. Blank empty states.
16. Color-only status indication.
17. Inventing a token/variant that doesn't exist (e.g. `headline1`, `buttonMedium`) — use the real names (§0) or ask.
18. Forking an existing `@gl/elements` component instead of extending it.
19. Unprompted custom animation.
20. Borders/dividers for grouping that tonal surfaces could do.
21. Presenting output without the coverage report, or as implicitly complete.
