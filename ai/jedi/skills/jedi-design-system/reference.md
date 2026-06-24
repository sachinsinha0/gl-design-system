# Jedi Design System — Source of Truth

**Scope:** Color + Typography (optimized layers) + Interaction & Behavioral guidelines + AI Engagement Protocol. Component visuals beyond this inherit MUI v5 defaults.
**Stack:** MUI v5+ · Light & Dark mode · Font: **Inter**
**Token source in code:** `getColors(mode)` (colors module) — also exported as CSS variables (`--primary-main`, `--text-secondary`, …). **Tokens are the interface; hex values in this doc are for verification only.**
**Philosophy:** Form follows function. Task completion beats decoration. Modern execution quality (polish, responsiveness, refined states) is welcome; decorative trends are not.
**Audience:** Internal staff + partners (admin/ops surfaces). For learner-facing surfaces, see the **Magna** design system instead.
**Companion file:** `jedi-design-system.context.md` — the lean version to paste into Claude/Codex/Cursor sessions.

---

## 1. Product postures

**Application posture: Sovereign** (Cooper). One codebase serves all surfaces; users live in it for long stretches and become intermediate users fast. Consequences: optimize for the returning user, density is acceptable, keyboard navigation is expected, minimal onboarding chrome, muted visual temperature (loud color and decoration become fatigue over hours), no tooltips as crutches for unclear labels.

**Audience postures** — the same surface serves two audiences; only density and tone shift, never tokens:

| Posture | Who | Design priority |
|---|---|---|
| **Internal** (staff/admin) | Ops, program managers | Information density allowed (dense table/menu variants), speed over hand-holding |
| **Partner** (semi-external) | Visiting faculty, part-time collaborators | Internal-grade efficiency with extra legibility and self-explanatory flows — they visit less often, so assume less learned context. When in doubt, follow Partner rules |

---

## 2. Color System

Token paths below are the **code's own names** from `getColors(mode)`. Reference them via the theme/CSS vars — never paste a hex into component code.

### 2.1 Text — `text.*`

| Token | Light | Dark |
|---|---|---|
| `text.primary` | `rgba(33,33,33,0.92)` | `#FFF` |
| `text.secondary` | `rgba(33,33,33,0.72)` | `rgba(255,255,255,0.70)` |
| `text.disabled` | `rgba(33,33,33,0.24)` | `rgba(255,255,255,0.50)` |
| `text.primary-shades-4-p / 12-p / 30-p` | ink @ 4 / 12 / 30% | white @ 12 / 30% (4-p: see code) |
| `text.secondary-shades-4-p / 18-p` | ink @ 4 / 18% | white @ 4 / 18% |

> Base ink is `#212121` with alpha — **not** pure black. Never substitute `#000`.

### 2.2 Brand / Semantic palettes

Each palette carries `main / dark / light / contrast` plus interaction shades (`shades-hover`, `shades-select`, `shades-12-p`, `shades-30-p`, `shades-50-p`); the four status palettes also carry `shades-160-p` (text-on-tint) and `shades-190-p` (tint background).

| Palette | Role | Light: main / dark / light | Dark: main / dark / light |
|---|---|---|---|
| `primary` | Brand actions, links, focus | `#196AE5` / `#0F4089` / `#4788EA` | `#66BBFF` / `#3A9AE8` / `#E8F0FC` |
| `secondary` | **Orange support accent** | `#FF9800` / `#EF6C00` / `#FFB74D` | `#FFCC80` / `#CA9B52` / `#FFFFB0` |
| `error` | Destructive, failures | `#FF3333` / `#D10B25` / `#F9494F` | `#F44336` / `#D32F2F` / `#E57373` |
| `warning` | Caution, pending | `#FFBF00` / `#FF6D00` / `#FFD44D` | `#FFA726` / `#F57C00` / `#FFB74D` |
| `info` | Neutral notices | = primary values | `#29B6F6` / `#0288D1` / `#4FC3F7` |
| `success` | Completion, positive | `#22BB34` / `#00880F` / `#74D176` | `#66BB6A` / `#388E3C` / `#81C784` |

Contrast text: `#FFF` on all light-mode palettes; `rgba(0,0,0,0.87)` on dark-mode palettes (except dark `error.contrast` = `#FFF`).

> **`secondary` is orange, not a second blue.** Supporting accents only. It is *not* a status color — caution belongs to `warning`.
> **`info` = `primary` in light mode** (one blue voice). They diverge in dark mode. Don't "fix" this.
> Dark-mode primary interaction shades are computed from `#8CB5F2`, not `main` — a codebase quirk, keep as-is.

### 2.3 Status tint recipe — `shades-160-p` on `shades-190-p`

The standard recipe for `<Alert>`, banners, and soft chips: background `190-p`, text/icon `160-p`. All pairs measured AA+:

| Palette | Light 160p / 190p | Dark 160p / 190p | Measured |
|---|---|---|---|
| `error` | `#7A2828` / `#FFEBEB` | `#FBB4AF` / `#180705` | 8.5:1 / 8.5:1 |
| `warning` | `#7A6014` / `#FFF9E5` | `#FFDCA8` / `#1A1104` | 5.7:1 / 14.3:1 |
| `info` | `#1E3E6F` / `#E8F0FC` | `#9ACFED` / `#000E15` | 9.3:1 / 11.7:1 |
| `success` | `#215F29` / `#E9F8EB` | `#C2E4C3` / `#0A130B` | 7.0:1 / 12+:1 |

(`secondary` has no 160/190 tokens — further evidence it is not a status palette.)

### 2.4 Action states — `action.*`

| Token | Light | Dark |
|---|---|---|
| `action.active` | ink @ 64% | white @ 64% |
| `action.hover` | ink @ 4% | white @ 8% |
| `action.selected` | ink @ 8% | white @ 16% |
| `action.disabled` | ink @ 26% | white @ 30% |
| `action.disabled-background` | ink @ 12% | white @ 12% |
| `action.focus` | ink @ 12% | white @ 12% |

### 2.5 Background & surfaces — `background.*`

| Token | Light | Dark |
|---|---|---|
| `background.default` | `#FAFAFA` | `#121212` |
| `background.paper-elevation-0` | `#FFF` | `#121212` |
| `paper-elevation-2 / 8 / 16 / 24` | `#FFF` (all) | `#1B1B1B` / `#252525` / `#383838` / `#4B4B4B` |

**This system is flat: cards and surfaces are always `variant="outlined"` — no shadows, no raised elevation, in either mode.** The `paper-elevation-*` tokens exist for the rare overlay surfaces that genuinely float (menus, dialogs, popovers) in dark mode; they are not a license to elevate cards.

### 2.6 Other — `other.*`

| Token | Light | Dark |
|---|---|---|
| `other.divider` | ink @ **6%** | white @ 12% |
| `other.outlined-border-23-p` | ink @ 23% | white @ 23% |
| `other.filled-input-background` | ink @ 6% | white @ 9% |
| `other.standard-input-line` | ink @ 42% | white @ 42% |
| `other.backdrop-overlay` | `rgba(33,33,33,0.5)` | same |
| `other.snackbar` | `#212121` | `#323232` |
| `other.rating-active` | `#FFB400` | same |

> Divider is **6% in light mode** by design — lighter than MUI's 12% default. **Use dividers sparingly: only when grouping cannot be achieved by spacing or an outlined surface.** AI-generated layouts tend to sprinkle dividers everywhere — between every list item, under every heading, around every section. Default to whitespace; reach for a divider only when content genuinely needs a hard separation (e.g., dense internal tables, menu groups).

### 2.7 Extended ramps — data-viz escape hatch only

Active in code: `grey`, `grey-a`, `purple`, `purple-a`, `light-blue`, `light-blue-a`, `yellow`, `yellow-a`, `blue`, `blue-a`, `blue-gray`. All other Material hues are commented out — **do not use or re-enable them in feature code.**

The `blue` ramp is customized: extra `blue.70` = `#0041B2`, and `blue.700` = `#0057B2` (not Material's `#1976D2`).

In dark mode the code **reverses each ramp** (50↔900) automatically — `grey.100` in dark resolves to a dark grey. Pick ramp steps by *role* (light step = subtle bg) and the reversal does the right thing.

These ramps are intended for charts, tag categories, and data visualization. For UI chrome (buttons, links, text, borders), prefer the semantic palettes — reaching for `blue.600` on a button usually means you wanted `primary.main`.

### 2.8 Basic — `basic.white` `#FFF`, `basic.black` `#000`. Mode-invariant; use for content that must not flip (e.g., imagery overlays).

---

## 3. Typography System

**Single family: Inter.** Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold). Load these three only.

### 3.1 Core scale — Desktop (≥ md breakpoint)

| MUI variant | Size | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|
| `h1` | 32px | 600 | 36px (1.125) | -0.4px | — |
| `h2` | 28px | 600 | 1.2 | -0.4px | — |
| `h3` | 24px | 600 | 1.167 | -0.4px | — |
| `h4` | 20px | 600 | 1.235 | -0.4px | — |
| `h5` | 18px | 600 | 1.334 | -0.4px | — |
| `subtitle1` | 16px | 500 | 1.75 | -0.4px | — |
| `subtitle2` | 14px | 500 | 1.57 | -0.4px | — |
| `body1` | 16px | 400 | 1.5 | 0 | — |
| `body2` | 14px | 400 | 1.43 | 0 | — |
| `caption` | 12px | 400 | 1.66 | 0.4px | — |
| `overline` | 10px | 600 | 1.66 | 1.25px | UPPERCASE |
| `button` (medium) | 14px | 500 | 24px | 0.4px | UPPERCASE |
| button large | 16px | 500 | 24px | 0.46px | UPPERCASE |
| button small | 12px | 500 | 16px | 0.46px | UPPERCASE |

Emphasis variants: Subtitle 1 Bold = 16/600/1.75/0.35px; Subtitle 2 Bold = 14/600/1.57/0.1px. Use these for emphasized labels instead of wrapping subtitles in `<b>`.

**There is no h6 in this system.** The scale stops at h5. If a sixth heading level seems needed, the page hierarchy is too deep — restructure instead.

### 3.2 Core scale — Mobile (< md breakpoint)

| Variant | Size / Line height | Letter spacing |
|---|---|---|
| h1 | 26px / 32px | -0.4px |
| h2 | 24px / 28px | -0.5px |
| h3 | 22px / 26px | -0.4px |
| h4 | 20px / 24px | -0.4px |
| h5 | 18px / 22px | -0.4px |
| subtitle1 | 16px / 24px | 0 |
| subtitle2 | 14px / 20px | 0 |
| body1 | 14px / 20px | 0 |
| body2 | 12px / 16px | 0 |
| caption | 10px / 16px | 0.4px |
| overline | 10px / 16px | 1.25px |

Note: **letter spacing relaxes to 0 on mobile** for subtitles/body — tight tracking hurts small-screen legibility.

### 3.3 Component type tokens

| Component | Spec |
|---|---|
| Input label | Inter 400, 12/12, 0.15px |
| Input text | Inter 400, 16/24, 0.15px |
| Helper text | Inter 400, 12/16, 0.4px |
| Chip | Inter 500, 12/16, 0.16px |
| Tooltip | Inter 500, 10/16, 0 |
| Alert title | Inter 500, 16/1.5, 0.15px |
| Table header | Inter 500, 14/24, 0.17px |
| Badge label | Inter 500, 12/16, 0.14px |
| Avatar initials | Inter 400, 20/24, 0.14px |
| Menu item | Inter 400, 16/1.5, 0.15px |
| Menu item (dense) | Inter 400, 14/24, 0.17px |
| List subheader | Inter 500, 14/48, 0.1px |
| Bottom nav active label | Inter 400, 14/24, 0.4px |

**Dark mode buttons step up to weight 600** (SemiBold) — light strokes on dark surfaces read thinner. Implement as a conditional in the Button override, not by asking devs to remember it.

### 3.4 Spacing scale

Non-linear, indexed: `[0, 4, 8, 16, 24, 32, 40, 48, 64, 96, 128]`.

**Not** MUI's default `8 × n`: `theme.spacing(3)` must yield **16px**, not 24px. Configure spacing as an array. The non-linear jump (…48 → 64 → 96 → 128) exists so large layout gaps come from a sanctioned set, not arbitrary multiples.

---

## 4. Usability Rules (non-negotiable)

Derived from **measured** WCAG contrast ratios of the shipped code values — facts of this system, not generic advice.

### 4.1 Measured contrast — light mode on white

| Token | Ratio | Verdict |
|---|---|---|
| `primary.main` `#196AE5` | 4.96:1 | ✅ AA text |
| `primary.dark` `#0F4089` | 9.93:1 | ✅ AAA |
| `error.main` `#FF3333` | 3.64:1 | ❌ fails AA text — fills/icons/large text only |
| `error.dark` `#D10B25` | 5.55:1 | ✅ AA text |
| `success.main` `#22BB34` | 2.55:1 | ❌ fills only |
| `success.dark` `#00880F` | 4.64:1 | ✅ AA text |
| `warning.main` `#FFBF00` | **1.65:1** | ❌ never as text or icon-only signal |
| `warning.dark` `#FF6D00` | 2.82:1 | ❌ still fails — fills only |
| `secondary.main` `#FF9800` | 2.16:1 | ❌ fills only |
| `secondary.dark` `#EF6C00` | 3.08:1 | ⚠️ large text / ≥24px icons only |
| All 160p-on-190p pairs | 5.7–14.3:1 | ✅ AA+ |
| Dark mode: `primary.main` on `#121212` | 9.03:1 | ✅ AAA |

### 4.2 The rules that follow

1. **Colored text in light mode uses the `dark` variant** of the palette (`error.dark`, `success.dark`) — never `main`. `main` is for fills, borders, icons ≥ 24px, and large text.
2. **Warning has no text-safe solid in light mode** — both `main` (1.65:1) and `dark` (2.82:1) fail. Warning copy is `text.primary` plus a warning-colored icon, or the 160p/190p tint recipe. Amber text is forbidden, full stop.
3. **Secondary (orange) is decorative, not semantic.** Never use it to mean "caution" — that's `warning`'s job via the tint recipe. Secondary text in light mode: `secondary.dark` at ≥18px only.
4. **Tinted surfaces**: bg `shades-190-p`, text `shades-160-p`. Never `main` text on a `190-p` background.
5. **Never communicate state through color alone.** Every error has icon + message; every success has icon or explicit copy. Strict on all postures — color-blind staff exist too.
6. **Focus must be visible.** Don't suppress MUI's focus ring. Keyboard navigation is first-class on all postures (sovereign requirement).
7. **Touch targets ≥ 44×44px on partner-facing surfaces.** Small buttons (12px label) belong in internal data-dense views only. `[Fitts's law]`
8. **Disabled = `action.disabled` + `action.disabled-background`**, never a manual opacity drop — that breaks contrast of adjacent helper text.
9. **Body text below 12px is forbidden** on partner-facing surfaces. 10px (mobile caption, overline, tooltip) is for non-essential metadata.
10. **Density by posture:** internal tools may use dense menu items and compact tables; partner-facing surfaces use standard density. Never mix densities in one view.

### 4.3 Semantic elements & accessible names

The element decides the behavior screen readers and keyboards expect — looks are styling, semantics are not negotiable.

11. **Links navigate, buttons act — pick by behavior, not appearance.** Anything that changes the URL/route is a link; anything that triggers an action (submit, open dialog, toggle, mutate) is a button. An action that *looks* like a link is still a button: use a **link-styled button**, not an anchor. In MUI that's `<Link component="button" onClick>` or `<Button variant="text">` — never a bare `<a>`/`<Link href>` wired to an `onClick` that doesn't navigate. A real anchor without a valid `href` is unreachable by keyboard and mis-announced by screen readers.
12. **Use the `Link` *button* for inline text actions.** Inline "actions" inside copy (e.g., "Show more", "Edit") render as `<Link component="button">` so they're keyboard-focusable, Enter/Space-activatable, and announced as buttons — while keeping the link look. Reserve `<Link href>` for genuine navigation.
13. **`IconButton` only when an icon genuinely suffices — and never without an accessible name.** Use `IconButton` for compact, universally-understood actions (close, search, back, overflow `⋮`) and dense internal toolbars. Every `IconButton` carries an `aria-label` (and usually a `Tooltip`); an icon button with no accessible name is a hard accessibility failure. For primary or destructive actions, a labeled `Button` beats an `IconButton` (ties to rule 19 / §6.4).
14. **One `<h1>` per page; headings descend without skipping levels.** Don't pick a heading variant for its size — use the right level for structure and restyle via `sx` if needed. Form fields always have associated `<label>`s; meaningful images have `alt`, decorative ones `alt=""`.

---

## 5. Aesthetic Intent (within the constraints)

- **Calm ink, one loud blue.** Near-black `#212121` ink at high alpha, quiet 6% dividers, white paper — Primary blue carries every interactive moment. Secondary orange appears rarely, as warmth, never as a competing voice.
- **SemiBold headlines with negative tracking** (-0.4px): compact, modern, product-y — not editorial. Keep headlines short; tight tracking punishes long ones.
- **Hierarchy through weight and size, not color.** Headings are the same ink as body. No colored or grey headings.
- **Flat, outlined, no elevation.** Cards are always `variant="outlined"` (using `other.outlined-border-23-p`); shadows are reserved for true overlays (menus, dialogs, tooltips). Never raise a card.
- **Dividers are a last resort.** Whitespace and outlined surfaces do the grouping; a divider appears only where a hard separation is genuinely needed.
- **Uppercase is reserved** for buttons and overlines only.
- **When unsure, remove.** Fewer tints, fewer weights, more whitespace is on-system.
- **Trends enter as execution quality, not decoration.** Skeleton loaders, refined empty states, subtle interaction polish — yes. Glassmorphism, gradient meshes, scroll-jacking, decorative animation — no. Modernity should make tasks faster, not prettier-but-slower.
- **Structure density for the eye.** Information-rich is fine; unstructured is not. Alignment, proximity grouping, and a clear entry point keep dense screens scannable (see §6.6).

---

## 6. Interaction & Behavioral Design

Form follows function: every rule below exists to raise task-completion speed and confidence, not visual appeal. Each rule is flagged with the heuristic it operationalizes.

### 6.1 Choices & cognitive load

1. **~7 options at a *designed* decision point** — nav items, plan pickers, action menus, filter groups. Beyond that: group, search, or progressive-disclose. **Does not apply to data-driven collections** — a dropdown of 200 countries or a 500-row table is fine; those get search/typeahead, filtering, and pagination/virtualization instead of artificial truncation. `[Hick's law — decision time grows with choice count; Miller's law — working memory holds ~7 items]`
2. **Forms: 7±2 visible fields per step (max 9).** Beyond that, split into steps with a visible progress indicator. Group related fields; never one giant scroll-form. `[Chunking; goal-gradient effect — visible progress accelerates completion]`
3. **Defaults do the work — from data the app already has.** Pre-select the most common option; prefill from profile/state/API values that are already trivially available (last-used value if the store already returns it). **Scope limit: this never requires building new tracking or mining interaction history** — if remembering a choice needs new infrastructure, it's out of scope unless the dev asks. `[Tesler's law — irreducible complexity should be absorbed by the system, not the user]`
4. **One primary action per view.** Exactly one `contained` button; everything else `outlined` or `text`. If two actions feel equally primary, the screen is trying to do two jobs. `[Von Restorff effect — distinctiveness requires a single emphasized element; visual hierarchy]`

### 6.2 Feedback & system status

5. **Every action over ~400ms shows its state.** Prefer skeleton loaders over spinners for content areas (perceived speed); spinners only for indeterminate short waits inside controls. `[Nielsen #1 — visibility of system status; Doherty threshold — sub-400ms keeps users in flow]`
6. **Success is explicit, never silent.** A save, submit, or enroll produces visible confirmation (snackbar, state change, check). Silent success reads as failure. `[Nielsen #1; feedback loops]`
7. **Destructive actions confirm; reversible actions don't.** Delete/unenroll/cancel-subscription get a confirm step naming the consequence; everything reversible executes immediately with an undo path where feasible. Don't confirm-dialog harmless actions — it trains users to click through dialogs blindly. `[Nielsen #5 — error prevention; alarm fatigue]`

### 6.3 Errors & recovery

8. **Prevent before you scold.** Inline-validate on blur (not on every keystroke); constrain inputs (date pickers over free-text dates); show requirements before submission, not after. `[Nielsen #5 — error prevention beats good error messages]`
9. **Errors say what happened and what to do next**, in the interface's voice — no apologies, no vagueness, no error codes alone. `[Nielsen #9 — help users recognize, diagnose, recover]`
10. **Never destroy user input.** Failed submissions preserve every field. A form that empties itself on error is a critical bug, not a style issue. `[Error recovery; loss aversion — losing typed work is the most rage-inducing failure mode]`

### 6.4 Recognition & continuity

11. **Recognition over recall: visible labels everywhere.** No icon-only buttons for primary or destructive actions; icon-only `IconButton` is acceptable only for universally-learned icons (close, search, back, overflow) and dense internal toolbars — and always with an `aria-label` + tooltip (see §4.3 rules 11–13). Inline text actions use the link-styled button, not a bare anchor. `[Nielsen #6 — recognition over recall]`
12. **Multi-step anything shows where you are.** Steppers for flows, progress for courses, breadcrumbs for deep hierarchies. Started-but-unfinished states should be visibly resumable. `[Zeigarnik effect — open tasks occupy memory; goal-gradient]`
13. **Empty states are starting points, not dead ends.** Every empty list/dashboard explains what belongs there and offers the action that fills it. Blank panels are forbidden. `[Nielsen #10 — help and documentation, delivered in-context]`

### 6.5 Motion

14. **MUI default transitions on the first pass.** Don't introduce custom animation or scroll effects unprompted. If the dev explicitly requests custom motion, build it (and note it under `Deviations` in the coverage report). Always respect `prefers-reduced-motion`.

### 6.6 Scannability (let eyes move fast)

Density is not the enemy of scanning — *unstructured* density is. These rules keep information-rich screens (internal dashboards, tables) fast to parse rather than asking for less data. The goal is for eyes to jump to the one thing they came for without reading everything.

15. **Tables scan down columns, not across rows.** Right-align numbers, left-align text, use tabular/lining figures so digits line up by place value. A column of right-aligned amounts is comparable at a glance; a column of left-aligned numbers is not. `[numeric alignment — the most common AI table mistake]`
16. **Front-load the distinguishing word.** In lists, menus, table cells, and labels, the word that differentiates an item goes first — "Annual report 2024", not "Report (annual), 2024". Eyes read the first one or two words of each line then jump; bury the distinguishing word and scanning collapses to full reading. `[F-pattern scanning]`
17. **Label and value are visually distinct in key-value displays.** Label in `text.secondary`, value in `text.primary` (or label smaller, value larger). This lets the eye skip the repeating labels and jump value-to-value. Never render label and value at the same weight and color.
18. **One clear entry point per screen.** Exactly one element wins the visual hierarchy — the eye must know where to land first. Establish it with size, weight, and position; don't flatten everything to equal weight. (Pairs with the one-primary-action rule, B4.) `[visual hierarchy]`
19. **Group by proximity, separate by whitespace.** Related items sit close; unrelated groups are pushed apart by space — not boxed in borders or split by dividers. This is the positive form of the divider-restraint rule. `[Gestalt: proximity]`
20. **Left edges stay clean.** Left-align text and align fields/labels to a shared grid so the eye scans down a straight edge. Avoid centered body text and ragged multi-column starts — every misalignment is a re-scan. `[Gestalt: continuity]`
21. **Plain language; expand acronyms on first use.** Jargon and unexplained abbreviations force a memory lookup mid-scan. Chunk long content under scannable subheads rather than presenting walls of text. `[reduces extraneous cognitive load]`

---

## 7. Content Design — Great Learning voice & rules

> Content design ships **with** this system. Every label, button, dialog, error, empty state, notification, heading and body string in jedi follows the Great Learning content rules below. These rules are identical across Magna, Jedi and GLDS-Web — only which sections apply differs.

**Applies to jedi** (internal staff & faculty admin tools): Sections **A–H** apply to all admin copy. Section **I (Olympus)** applies directly — especially student-vs-faculty labels (I.2) and the assignment status table (I.3). Section **J (SEO) does not apply** — Jedi is internal tooling.

If a string can't satisfy both these rules and the design rules above, flag the conflict — don't silently pick one. Default to UK English unless the surface is region-specific. Full reviewer skill: `skills/jedi-design-system/SKILL.md`.

### Platform Priorities

| Platform | Key content expectations |
|---|---|
| **Olympus** | Neutral, functional UI copy. Clarity over personality. No marketing language inside the product. Tone is consistent regardless of emotion — never exclamatory, never robotic. Student-facing and faculty-facing copy must be written separately; never use the same label for both user types where the context or action differs. See **Section I** for full Olympus rules. |
| **Great Learning Academy — Pro+** | Subscription-value framing. Copy must emphasise breadth of access, flexibility, and self-paced learning. Tone is encouraging and practical — learners are here to upskill on their own schedule. CTAs should drive subscription sign-up or free trial activation. Avoid course-specific language; focus on the library and experience. |
| **Great Learning Academy — Certificate course** | Outcome and credibility-focused. Structured information hierarchy: course overview → curriculum → instructor → certificate → CTA. Copy must earn trust quickly — learners are paying for a specific credential. Avoid duplication across sections. Section J (keyword density) applies. |
| **University Degree & Certificate Programs** | Trust and credibility-building. University partner name and reputation must be prominent. Structured information hierarchy: program overview → curriculum → faculty → outcomes → admission. Avoid duplication across sections. Formal but accessible tone — not cold. Section J (keyword density) applies. |
| **Enterprise** | B2B tone — clear, professional, outcome-oriented. Lead with business impact, not individual learning. Copy should address L&D buyers, not learners directly. ROI, scalability, and customisation are key value propositions. Avoid consumer-facing language like "your career" or "get hired". |
| **Marketing & Brand** | Campaign-aware. Must align with active campaign tone (ask if unsure). Lead with emotional hook for awareness; lead with outcome for lead-gen. Brand voice must be consistent with GL's core identity. |

### Audience Messaging Priorities

| Audience | Lead messaging priority | Avoid |
|---|---|---|
| **College students** | Employability, first job, skill-building, certification recognition, peer community | Sounding corporate or inaccessible; assuming prior work experience |
| **Early-career professionals** | Career acceleration, upskilling, job-switching, certification for promotion | Assuming senior decision-making context; overly aspirational without tactical grounding |
| **Mid-career professionals** | Career transition, leadership readiness, specialisation, ROI on time invested | Entry-level framing; oversimplified outcomes; anything that feels "basic" |
| **Senior professionals** | Transformation, executive credibility, peer network, long-term career strategy | Tactical or skill-list-heavy copy; anything that feels like training rather than development |

---

### A. Casing

| Content Type       | Rule                         |
|--------------------|------------------------------|
| Banner headers     | Sentence case (unless full header is a product/program/brand name → Title Case) |
| CTA buttons        | Title Case (e.g. Enrol For Free, Get Started Today) |
| Navigation items   | Title Case                   |
| Form labels        | Title Case                   |
| Tooltips           | Sentence case                |
| Error messages     | Sentence case                |
| Body copy          | Sentence case                |
| Main headings      | Title Case                   |
| Subheadings        | Sentence case                |

**Always capitalise**: course names, university names, product names, proper nouns.

**Special case — subtext/descriptions**: Sentence case throughout. Capitalise course names, universities, product names only.

**Slash rule**: If the word before a slash is capitalised, capitalise the word after it too. E.g. Programs/Courses ✅

---

### B. Grammar

- Subject-verb agreement
- Consistent tense (do not mix past and present)
- Active voice required. Flag passive constructions.
  - ✅ "The course deadline is in 2 weeks"
  - ❌ "In 2 weeks, there will be a course deadline"
- Avoid first and second person in the same sentence. Prefer second person.
  - ❌ "Great Learning benefits that we love"
  - ✅ "Why engineers love our programs?"
- Do not start sentences with the objective in a buried position — lead with it.
  - ✅ "To sign up for our course, click here"

---

### C. Punctuation & Symbols

- **Full stops**: Do not use in solitary sentences, CTAs, labels, or button text.
  - ✅ "Sign up"  ❌ "Sign up:"
- **Oxford comma**: Required.
  - ✅ "students, professionals, and business owners"
- **Colons after labels**: Not used.
- **Ampersand (&)**: Headings only. Do not repeat in subtext.
- **Hyphen (-)**: Use moderately to conjoin words (e.g. decision-making, real-world). Avoid in main headings for SEO.
- **En dash (–)**: Separate number ranges. E.g. "4:00 PM–5:00 PM"
- **Em dash (—)**: In place of parentheses. E.g. "not applicable —unless the student decides to leave—"
- **Ellipses (…)**: Rarely used. Flag if overused.
- **Rupee symbol**: Use ₹ — not INR, Rs, or Rupees.
- **Parentheses ()**: Do not use in main copy.
- **Guiding symbols** (arrows, circles): Not used.
- **Incomplete signifiers**: Flag and remove "etc.", "and more", "among others" — they lose clarity.

---

### D. Voice & Tone

Great Learning's voice is: **confident, cordial, motivational, human, and concise**.

Tone shifts by context — but voice stays consistent.

Check for:
- **Confidence**: Does the copy sound assured and credible?
- **Human warmth**: Does it speak directly to the user as a person? ("Talk to the user as though they are standing right in front of you.")
- **Motivation without patronising**: Urges action but doesn't overwhelm or condescend.
- **Optimism and aspiration**: Highlights positive impact on learner's career.
- **Social proof**: Use numbers and outcomes where possible.
  - ✅ "8,000 graduates completed the data science course in 12 months"
- **No jargon or slang** in main page/app communication (first fold of all pages/apps).
- **No plagiarism** from other edtech sites.
- **No ambiguity in dialog questions**: Be direct about what action is being confirmed.
  - ❌ "Complete payment?"
  - ✅ "Do you wish to proceed?"

---

### E. Content Length & Layout

| Element         | Max Length             |
|-----------------|------------------------|
| Title/Header    | 6 words                |
| Subtext         | 120 characters (1–2 lines max below a heading) |
| Button/CTA      | 3 words                |
| Pop-up title    | 3 words                |
| Testimonials    | 100 words              |
| Body sentences  | 30 words max (app/desktop) |

Flag: unnecessarily long sentences, redundancy, content that does not fit mobile-first layouts.

Goal: Brevity + readability + conversion focus. Reference benchmark: https://www.mygreatlearning.com/pg-program-artificial-intelligence-course

---

### F. Component-Specific Rules

#### CTAs / Buttons
- Short, commanding sentences: "Create Account", "Find Your Course"
- Use "Log In" not "Login", "Sign Up" not "Signup" — separate the words
- No punctuation in CTAs
- All CTAs in Title Case — including main CTAs
  - ✅ "Enrol For Free"  ❌ "ENROL FOR FREE"  ❌ "Enrol for free"

#### Error Messages
- State what happened and why
- Offer a next course of action
- Non-condescending tone
  - ❌ "Looks like you made a mistake. Try again."
  - ✅ "There seems to be an issue. Shall we give it another try?"

#### Empty States
- Never leave blank — explain why the screen is empty
- ✅ "Track progress once learner begins activity"
- Do not prompt user to leave or close the page

#### Pop-up Modals
- Short, crisp, deadline-oriented
- Use Title Case or ALL CAPS + numbers to grab attention
- ✅ "Get 10% off on your first course"

#### Thank You Screens
- Friendly, celebratory tone
- Use "thank you", "please", "we hope"
- Sound formal and assuring, not purely transactional
  - ✅ "We hope our brochure helps. Please check your inbox."

#### Dialogs
- **Date format (International)**: 12 May, 2021 (no superscript)
- **Date format (Domestic)**: 12th May, 2021 (with superscript)
- **Time**: 12-hour clock with AM/PM. Include timezone: CDT, BST, etc.

---

### G. Audience Messaging Alignment

Cross-reference the selected audience from Step 0 against the Audience Messaging Priorities table in Step 1. Flag any copy that:
- Uses the wrong register (e.g. tactical language for a senior audience)
- Buries the primary motivation for that audience
- Uses terminology that would alienate or confuse the target group
- Misses an opportunity to use proof points relevant to that audience (e.g. job placement rates for college students, leadership outcomes for senior professionals)

---

### H. Consistency

- Consistent terminology across the submitted content
- Consistent product and course naming conventions
- Consistent capitalisation of brand/product terms
- No repetition of words across header → subtext → CTA in the same unit

### I. Platform-Specific Rules — Olympus

> **Only apply this section when the platform identified in Step 0 is Olympus.**

Olympus is a blended LMS serving both students and faculty. Copy must be neutral, functional, and unambiguous. It should help users complete tasks — not inspire or sell.

---

#### I.1 — Voice & Tone on Olympus

- **Neutral and functional**: Copy informs and guides. It does not motivate, celebrate, or market.
- **No exclamation marks** anywhere on the platform.
- **No marketing language**: Avoid phrases like "unlock your potential", "transform your career", or "world-class". These belong on landing pages, not inside the product.
- **No filler phrases**: Remove "please note", "kindly", "as you may know", "feel free to".
- **Direct address**: Use "you" and "your" for students. Use "you" for faculty only where the action is unambiguous.
- **Consistent register**: Tone must not vary between screens. A progress dashboard and an error message should feel like they come from the same system.

---

#### I.2 — Student vs Faculty Copy

Olympus serves two distinct user types. **Never reuse the same label or CTA for both when the context or permission level differs.**

| Surface | Student label | Faculty label |
|---|---|---|
| Submission action | "Submit assignment" | "Review submissions" |
| Course access | "Continue learning" | "Manage course" |
| Session action | "Join session" | "Start session" |
| Progress view | "Your progress" | "Learner progress" |
| Notification sender | — | "Your faculty" or faculty name |

**Flag any copy** that uses a generic label (e.g. "View course", "Open session") without confirming whether it is student-facing, faculty-facing, or shared. If shared, the label must work accurately for both contexts.

---

#### I.3 — Surface-Specific Rules

**Course Cards & Catalogues**
- Title: course or program name only — no taglines or descriptors on the card itself
- Metadata order: Duration → Format → Level (if shown)
- CTA: One per card. Student: "Continue" or "Start". Faculty: "Manage" or "View".
- Do not truncate course names mid-word. Use ellipsis (…) only if character limit is enforced by engineering.

**Progress Tracking & Dashboards**
- Use completion language, not percentage jargon: ✅ "3 of 8 modules complete" ❌ "37.5% done"
- Avoid motivational language on progress bars or completion states: ❌ "You're crushing it!" ✅ "Module 3 complete"
- Empty dashboard state: explain what will populate the view. ✅ "Your progress will appear here once you begin a module."
- Faculty dashboard: use learner-count language. ✅ "24 learners enrolled" ❌ "24 students"

**Notifications & Alerts**
- Lead with the action or deadline, not the sender: ✅ "Assignment due 15 June" ❌ "Your faculty has set an assignment due 15 June"
- Include a timestamp or deadline in every notification where one is relevant
- Do not use ALL CAPS for urgency — use deadline proximity instead: ✅ "Due tomorrow, 15 June" ❌ "URGENT: Assignment due"
- Faculty notifications to learners: sender attribution goes at the end, not the start. ✅ "Session starts at 4:00 PM today — Data Science: Module 4 | Prof. Rajan" 

**Assignments & Submissions**
- Status labels must be unambiguous and consistent:

| Status | Student label | Faculty label |
|---|---|---|
| Not yet started | "Not started" | "Awaiting submission" |
| In progress | "In progress" | "In progress" |
| Submitted | "Submitted" | "Pending review" |
| Reviewed | "Reviewed" | "Reviewed" |
| Overdue | "Overdue" | "Overdue" |

- Do not use "pending" for student-facing status — it is ambiguous (pending on whom?).
- Deadline display: always use the date + time + timezone. ✅ "Due 15 June, 11:59 PM IST"

**Error & Empty States**
- Every error must answer three questions: What happened? Why? What should the user do next?
  - ✅ "We couldn't load your assignments. Check your connection and try again."
  - ❌ "Something went wrong."
- Empty states must never be blank. Always explain what will appear and when.
  - ✅ "No assignments yet. Your faculty will add assignments here once the course begins."
  - ❌ "No assignments found."
- Do not use "Oops", "Uh oh", or informal openers on error messages — Olympus tone is neutral, not conversational.

**Navigation & Menus**
- All nav items: Title Case
- Labels must be task-oriented, not section-oriented where possible: ✅ "My Courses" ❌ "Courses Section"
- Faculty nav items must clearly signal scope: ✅ "Manage Learners" ❌ "Learners"
- Avoid abbreviations in nav unless space is critically constrained and the short form is universally understood (e.g. "AI/ML" is acceptable; "Mgmt" is not)

**Live Session / Webinar UI**
- Pre-session: show countdown with timezone. ✅ "Starting in 20 minutes — 4:00 PM IST"
- In-session labels: use present-tense actions. ✅ "Leave session" ❌ "Exit"
- Faculty in-session controls: use faculty-specific language. ✅ "End session for all" ❌ "End session"
- Post-session: confirm recording availability if applicable. ✅ "Recording will be available within 24 hours."

---

#### I.4 — Things to Always Flag on Olympus

- Marketing or aspirational language inside any product screen
- Exclamation marks anywhere
- Generic labels used for both student and faculty without verification
- Error messages that don't explain cause and next step
- Empty states with no explanatory copy
- Percentage-based progress language
- Notification copy that leads with the sender instead of the action/deadline
- Assignment status labels that differ from the standard set in I.3
- Truncated course names without ellipsis enforcement
- Missing timezone on any time-based UI element

---

### J. Keyword Repetition & SEO Density — Program and Course Pages

> **Apply this section to all program pages, course pages, and landing pages. Skip for Olympus, app UI, and offline/print marketing.**

Google's current stance explicitly treats keyword stuffing — the practice of filling a page with repeated keywords to manipulate rankings — as a spam policy violation. Their algorithms actively demote pages where keywords are overused, regardless of intent. At the same time, Google's guidance affirms that mentioning a primary keyword in the right places does help signal relevance. The goal is natural integration, not avoidance.

---

#### J.1 — The Threshold Rule

GL follows Google's recommended keyword density of **1–2% of total page word count** as the upper bound for any single primary keyword or exact-match keyword phrase. This count covers the entire page — headings, body copy, CTAs, FAQ questions and answers, and visible metadata such as the page title and meta description.

To calculate: divide the number of keyword appearances by total word count, then multiply by 100.

- A 600-word course page: primary keyword should appear **no more than 6–12 times**
- A 1,000-word course page: primary keyword should appear **no more than 10–20 times**
- Density **above 2%** must be flagged without exception
- Density **above 5%** is a critical violation — Google identifies this as spam and may demote or exclude the page from results

---

#### J.2 — Required Keyword Placements

The primary keyword must appear exactly once in each of the following high-value positions. These are non-negotiable for SEO and do not count toward the density threshold:

- Page `<title>` tag
- Meta description
- H1 (page or course title)
- First 100 words of body copy
- At least one H2 or H3 subheading

Beyond these placements, all further appearances must arise naturally from the copy — never forced.

Flag pages where the keyword is **absent** from any of the above positions, as this is an under-optimisation issue equally worth correcting.

---

#### J.3 — What to Flag

Flag any of the following during review:

- Primary keyword density **exceeds 2%** of total page word count
- Primary keyword density **exceeds 5%** — critical, mandatory revision before publish
- The exact keyword phrase appears in **consecutive sentences** anywhere on the page
- The keyword appears in **both a heading and its immediately following subtext** without meaningful variation
- The keyword appears **more than twice within a single section** (hero, about, FAQ, curriculum, etc.) — even if total page density is within range
- The keyword is inserted into a CTA where it reads unnaturally: ❌ `Enrol in our Python for Data Science and Machine Learning course today` → ✅ `Start Learning Today`
- A **FAQ question and its answer both open with the exact keyword phrase** — this is a common and penalisable pattern on course pages
- The keyword appears in **image alt text, aria labels, or button labels** purely for SEO with no functional purpose

---

#### J.4 — Semantic Variation (Required Practice)

Google's algorithms understand synonyms and contextually related terms. Repeating the exact keyword phrase beyond the required placements in J.2 is unnecessary and harmful. Writers must use natural semantic variants after the first two or three appearances.

| Primary keyword | Acceptable variants |
|---|---|
| `Python for Data Science` | `this course`, `the program`, `data analysis with Python`, `machine learning in Python` |
| `Data Science and Machine Learning` | `ML fundamentals`, `predictive modeling`, `this curriculum` |
| `Artificial Intelligence course` | `this program`, `the course`, `your AI learning path` |
| `Cybersecurity certification` | `the program`, `this certification`, `IT security training` |
| `Cloud Computing course` | `the course`, `this program`, `cloud training` |

Flag any section where the writer has defaulted to the exact keyword phrase when a natural variant was clearly available.

---

#### J.5 — Exemptions

The following are exempt from the density count and must not be flagged as keyword repetition:

- Course module titles within the curriculum section (these are proper content descriptors, not promotional copy)
- Structured data / schema markup (not visible to users)
- Navigation breadcrumbs
- Instructor names and credentials

---

#### J.6 — Severity Reference

| Scenario | Severity | Action |
|---|---|---|
| Keyword density 2–5% | ⚠️ Medium | Flag, suggest variants |
| Keyword density above 5% | 🔴 Critical | Mandatory revision before publish |
| Keyword in consecutive sentences | ⚠️ Medium | Flag, rewrite affected sentences |
| Keyword in both FAQ question and answer opening | ⚠️ Medium | Flag, rewrite answer opening |
| CTA contains full keyword phrase unnaturally | ⚠️ Medium | Rewrite CTA |
| Keyword missing from H1 or first 100 words | ⚠️ Medium | Flag as under-optimised |
| Keyword missing from meta description or page title | ⚠️ Medium | Flag as under-optimised |

---

## 8. AI Engagement Protocol

Rules for how an AI coding agent works on this codebase — not what it outputs, but how it engages. Aim: help, never block; surface blind spots; keep overhead near zero.

### 7.1 State enumeration before generation

Any component tied to identity or a business lifecycle has states the AI cannot guess. Before generating, walk five dimensions:

1. **Identity** — who's viewing: anonymous / internal / partner (extend with product-specific roles as they exist)
2. **Domain lifecycle** — where the entity is in its journey (e.g., course card: not logged in → logged in not enrolled → enrolled in progress → completed; could also be expired, locked, waitlisted)
3. **Data** — loading, empty, error, partial, populated
4. **Interaction** — hover, focus, active, disabled, selected (token rules already cover these)
5. **Edge** — zero items, one item, hundreds of items, very long titles, slow network, permission denied

For stateful components, propose the state matrix briefly and proceed or ask per 7.2. Static, stateless pieces (a layout shell, a footer) skip this entirely.

### 7.2 When to ask vs. assume vs. build

- **Specified** (in the prompt, the codebase, or surrounding context) → just build.
- **Inferable** (a reasonable answer exists) → build on the inference and **declare it** in the coverage report. Do not ask.
- **Unknowable** (identity/lifecycle states or business behavior nobody specified and nothing implies) → **ask before coding.** One batched round of questions maximum, framed as a proposed state matrix to confirm/correct — never a drip of one-at-a-time questions.

### 7.3 Coverage report — mandatory, ≤ 5 lines

Every component/feature output ends with this block:

```
COVERAGE
Covered:   <states/cases implemented>
Assumed:   <each inference made — "ASSUMED: anonymous users see price">
Not covered: <states/cases out of scope, deliberate or not>
Test first: <2–3 highest-risk paths>
Deviations: <any explicit off-system instruction followed — omit line if none>
```

This is a self-declaration appended after generation (not test execution). Its job is to convert silent assumptions into visible, reviewable ones — output is never presented as implicitly complete.

### 7.4 Reuse before create

Before building any component, check whether one already exists in the codebase; extend it rather than fork it. If forking is genuinely necessary, say why in the coverage report. Two diverging course cards is a design-system failure regardless of how on-token both are.

### 7.5 Pattern precedent

When facing an unspecified pattern question (pagination style, where card actions sit, how filters behave), **match how the existing codebase already does it** — existing convention beats general best practice. Deviating from an established internal pattern requires a stated reason. Sovereign products run on consistency; users' muscle memory is a feature. `[Jakob's law — users spend most of their time in other interfaces (and other screens of this one); Nielsen #4 — consistency and standards]`

### 7.6 Deviation flag, not refusal

If a dev explicitly requests something off-system ("add a shadow to this card"), comply — and record it under `Deviations` in the coverage report. The dev stays in control; the deviation stays visible. Never silently comply, never refuse.

### 7.7 Overhead cap

The protocol must stay cheaper than the problems it prevents: coverage report ≤ 5 lines; state matrix only for genuinely stateful components; questions only in one batched round; no ceremony beyond what's written here.

### 7.8 Tiebreaker

When a decision is unspecified and not covered above: **choose the option with fewer steps to task completion.** Function over form, always.

### 7.9 Dev request template (optional, copy-paste)

Filling this when requesting a component usually makes the question round unnecessary:

```
What: <component/feature>
Who sees it: <anonymous / internal / partner — any per-role differences>
Lifecycle states: <e.g., not enrolled / enrolled / completed — what differs per state>
Data shape: <source + rough fields, or "mock">
Out of scope: <what NOT to build>
```

---

## 9. MUI theme wiring

The palette must be **fed from `getColors(mode)`** — never duplicated:

```ts
import { createTheme } from '@mui/material/styles'
import getColors from './colors'

const spacingScale = [0, 4, 8, 16, 24, 32, 40, 48, 64, 96, 128]

export const buildTheme = (mode: 'light' | 'dark') => {
  const c = getColors(mode)

  const theme = createTheme({
    palette: {
      mode,
      text: { primary: c.text.primary, secondary: c.text.secondary, disabled: c.text.disabled },
      primary:   { main: c.primary.main,   dark: c.primary.dark,   light: c.primary.light,   contrastText: c.primary.contrast },
      secondary: { main: c.secondary.main, dark: c.secondary.dark, light: c.secondary.light, contrastText: c.secondary.contrast },
      error:     { main: c.error.main,     dark: c.error.dark,     light: c.error.light,     contrastText: c.error.contrast },
      warning:   { main: c.warning.main,   dark: c.warning.dark,   light: c.warning.light,   contrastText: c.warning.contrast },
      info:      { main: c.info.main,      dark: c.info.dark,      light: c.info.light,      contrastText: c.info.contrast },
      success:   { main: c.success.main,   dark: c.success.dark,   light: c.success.light,   contrastText: c.success.contrast },
      action: {
        active: c.action.active, hover: c.action.hover, selected: c.action.selected,
        disabled: c.action.disabled, disabledBackground: c.action['disabled-background'], focus: c.action.focus,
        hoverOpacity: mode === 'light' ? 0.04 : 0.08,
        selectedOpacity: mode === 'light' ? 0.08 : 0.16,
      },
      background: { default: c.background.default, paper: c.background['paper-elevation-0'] },
      divider: c.other.divider,
    },
    spacing: (factor: number) => `${spacingScale[factor] ?? factor * 8}px`,
    typography: {
      fontFamily: '"Inter", -apple-system, "Segoe UI", Roboto, sans-serif',
      h1: { fontSize: 32, fontWeight: 600, lineHeight: 1.125, letterSpacing: '-0.4px' },
      h2: { fontSize: 28, fontWeight: 600, lineHeight: 1.2,   letterSpacing: '-0.4px' },
      h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.167, letterSpacing: '-0.4px' },
      h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.235, letterSpacing: '-0.4px' },
      h5: { fontSize: 18, fontWeight: 600, lineHeight: 1.334, letterSpacing: '-0.4px' },
      subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.75, letterSpacing: '-0.4px' },
      subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.57, letterSpacing: '-0.4px' },
      body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
      body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.43 },
      caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.66, letterSpacing: '0.4px' },
      overline: { fontSize: 10, fontWeight: 600, lineHeight: 1.66, letterSpacing: '1.25px', textTransform: 'uppercase' },
      button: { fontSize: 14, fontWeight: 500, lineHeight: '24px', letterSpacing: '0.4px', textTransform: 'uppercase' },
    },
  })

  // Mobile overrides
  const dn = theme.breakpoints.down('md')
  Object.assign(theme.typography.h1, { [dn]: { fontSize: 26, lineHeight: '32px' } })
  Object.assign(theme.typography.h2, { [dn]: { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.5px' } })
  Object.assign(theme.typography.h3, { [dn]: { fontSize: 22, lineHeight: '26px' } })
  Object.assign(theme.typography.h4, { [dn]: { fontSize: 20, lineHeight: '24px' } })
  Object.assign(theme.typography.h5, { [dn]: { fontSize: 18, lineHeight: '22px' } })
  Object.assign(theme.typography.subtitle1, { [dn]: { fontSize: 16, lineHeight: '24px', letterSpacing: 0 } })
  Object.assign(theme.typography.subtitle2, { [dn]: { fontSize: 14, lineHeight: '20px', letterSpacing: 0 } })
  Object.assign(theme.typography.body1, { [dn]: { fontSize: 14, lineHeight: '20px' } })
  Object.assign(theme.typography.body2, { [dn]: { fontSize: 12, lineHeight: '16px' } })

  theme.components = {
    // Flat system: cards are outlined by default, never elevated
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiPaper: { defaultProps: { variant: 'outlined' }, styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: mode === 'dark' ? 600 : 500 },
        sizeLarge: { fontSize: 16, lineHeight: '24px', letterSpacing: '0.46px' },
        sizeSmall: { fontSize: 12, lineHeight: '16px', letterSpacing: '0.46px' },
      },
    },
  }

  return theme
}
```

Tokens not covered by MUI's palette shape (`shades-160-p`, `paper-elevation-*`, `other.*`) are reached via `getColors(mode)` directly or the CSS vars (`--error-shades-190-p`, …).

---

## 10. Anti-patterns (what AI coders must never generate)

1. ❌ Hardcoded hex/rgba in `sx`/styled — only theme tokens / `getColors` / CSS vars.
2. ❌ `#000` or `grey.900` for text — text tokens only.
3. ❌ `error.main` / `success.main` as a *text* color in light mode; `warning.main`/`warning.dark` as text **anywhere in light mode**.
4. ❌ Using `secondary` (orange) to convey caution or any status meaning.
5. ❌ `<Typography variant="h6">` — the variant doesn't exist in this system.
6. ❌ Roboto, Lato, or any non-Inter `fontFamily`.
7. ❌ Magic-number spacing (`mt: '20px'`) — only `theme.spacing(n)` from the indexed scale.
8. ❌ Elevated/shadowed cards in any mode — cards are `variant="outlined"` only. Shadows belong to true overlays (menus, dialogs) exclusively.
9. ❌ Unnecessary `<Divider>`s — between list items, under headings, around sections "for structure". Use spacing; dividers only where a hard separation is genuinely needed.
10. ❌ Uppercasing anything beyond buttons and overlines.
11. ❌ `opacity: 0.5` to fake a disabled state.
12. ❌ Color-only status indication.
13. ❌ Darkening the divider — 6% in light mode is by design.
14. ❌ Inventing intermediate font sizes (13/15/17px) — the scale is closed.
15. ❌ Two `contained` buttons in one view — one primary action per view.
16. ❌ Happy-path-only components — missing loading/empty/error states is incomplete work, not a polish item.
17. ❌ Confirm dialogs on harmless reversible actions — confirmation is for destructive actions only.
18. ❌ Icon-only primary or destructive actions.
19. ❌ `IconButton` without an `aria-label` — every icon button needs an accessible name.
20. ❌ An anchor/`<Link href>` wired to an action `onClick` (use `<Link component="button">` or a text `Button`); or a `Button` used for plain navigation (use a real link).
21. ❌ Blank empty states — every empty view explains itself and offers the filling action.
22. ❌ Unprompted custom animation or scroll effects — MUI defaults on the first pass; custom motion only on explicit request, flagged under Deviations.
23. ❌ Left-aligned or non-tabular numeric table columns — numbers right-align with lining figures.
24. ❌ Label and value at the same weight/color in key-value displays — label muted, value emphasized.
25. ❌ Centered body text / ragged left edges in scannable content.
26. ❌ Presenting output without the coverage report, or as implicitly complete.
