# Magna Design System — Source of Truth

**Scope:** Color (Material 3 role system) + Typography. Component visuals beyond this inherit Tamagui defaults until extended.
**Stack:** **Tamagui** (monorepo, shared across web + native) · Light & Dark mode · Font: **Inter** · Color model: **Material 3 (M3)**, blue seed `#0066FF`.
**Audience:** **Learners / end users** (students, consumers). This is the consumer-facing counterpart to **Jedi** (internal/partner). When a surface is for learners, use Magna; for staff/admin, use Jedi.
**Token source:** M3 system roles exported as Tamagui tokens (`$primary`, `$onSurface`, `$surfaceContainerHigh`, …). **Tokens are the interface; hex values in this doc are for verification only.**
**Philosophy:** Form follows function, but for learners *clarity, warmth, and confidence* outrank density. M3's role system does the heavy lifting — use roles, never raw hex. Modern execution quality is welcome; decoration that slows comprehension is not.
**Companion file:** `magna-design-system.context.md` — the lean version to paste into Claude/Codex/Cursor sessions.

---

## 1. How Material 3 color works here (read this first)

Magna does **not** use a "primary.main / primary.dark / primary.light" palette like Jedi/MUI. It uses the **M3 role system**: every color is a *semantic role*, and roles come in **pairs** — a container/surface role and its matching `on-` role that is guaranteed to have accessible contrast on top of it.

**The one rule that prevents 90% of mistakes:** never pick a color by hue. Pick the *role* for the job, and use its paired `on-` role for content on top. `primary` text goes on `surface`; text **on** a `primary` fill is `on-primary`; text on a `primary-container` is `on-primary-container`. The pairs are contrast-engineered (all measured AA+ — see §4), so following them is what keeps the product accessible by construction.

M3 roles also flip correctly between light and dark automatically — `surface` is near-white in light, near-black in dark; `on-surface` does the inverse. **Always reference the role token, never a mode-specific hex**, and light/dark is handled for free.

---

## 2. Color System — M3 roles (blue-primary theme)

Token names below are the Tamagui token names (camelCase of the M3 role). Hexes are light / dark for verification.

### 2.1 Primary

| Role / token | Light | Dark | Use |
|---|---|---|---|
| `$primary` | `#0054D6` | `#B3C5FF` | Main actions, FABs, active states, key emphasis |
| `$onPrimary` | `#FFFFFF` | `#002B75` | Content on a `primary` fill |
| `$primaryContainer` | `#DAE1FF` | `#003FA4` | Tonal/standout containers, selected chips, hero tints |
| `$onPrimaryContainer` | `#001849` | `#DAE1FF` | Content on `primaryContainer` |
| `$primaryFixed` / `$primaryFixedDim` | `#DAE1FF` / `#B3C5FF` | `#DAE1FF` / `#B3C5FF` | Cross-mode-stable accents (don't flip with theme) |
| `$onPrimaryFixed` / `$onPrimaryFixedVariant` | `#001849` / `#003FA4` | same | Content on fixed roles |
| `$inversePrimary` | `#B3C5FF` | `#0054D6` | Primary used on an inverse surface (e.g., snackbar action) |
| `$surfaceTint` | `#0054D6` | `#B3C5FF` | The tint elevation overlays apply to surfaces |

### 2.2 Secondary & Tertiary (supporting accents)

| Role | Light | Dark |
|---|---|---|
| `$secondary` / `$onSecondary` | `#3A3BFF` / `#FFFFFF` | `#C0C1FF` / `#0C00AA` |
| `$secondaryContainer` / `$onSecondaryContainer` | `#E1E0FF` / `#05006D` | `#1600EC` / `#E1E0FF` |
| `$tertiary` / `$onTertiary` | `#8B00E8` / `#FFFFFF` | `#DEB7FF` / `#4A007F` |
| `$tertiaryContainer` / `$onTertiaryContainer` | `#F1DBFF` / `#2D0050` | `#6900B2` / `#F1DBFF` |

Secondary = less-prominent components (filter chips, secondary buttons). Tertiary = contrasting accents, used sparingly for highlights/decoration. Both have `-fixed` / `-fixed-dim` variants mirroring primary.

### 2.3 Error (the only "status" role in M3)

| Role | Light | Dark |
|---|---|---|
| `$error` / `$onError` | `#BA1A17` / `#FFFFFF` | `#FFB4AA` / `#690003` |
| `$errorContainer` / `$onErrorContainer` | `#FFDAD5` / `#410001` | `#2D171A` / `#FFDAD5` |

> **M3 has no built-in success/warning/info roles.** For those, use the container/on-container pattern with the appropriate `magnaColors` extended hue (see §2.7) — and always pair container + on-container so contrast holds. Don't invent loose green/amber text colors.

### 2.4 Surfaces & containers (the M3 elevation model)

M3 expresses elevation through **tonal surface roles**, not shadows. Higher containers are subtly lighter (light mode) / lighter (dark mode).

| Role | Light | Dark | Use |
|---|---|---|---|
| `$background` / `$onBackground` | `#FDFBFF` / `#1A1B1E` | `#1A1B1E` / `#E3E2E6` | App background |
| `$surface` / `$onSurface` | `#FAF9FD` / `#1A1B1E` | `#121316` / `#C7C6CA` | Default surface + its text |
| `$surfaceVariant` / `$onSurfaceVariant` | `#E2E2EC` / `#45464F` | `#45464F` / `#C5C6D0` | Lower-emphasis fills, field backgrounds, secondary text |
| `$surfaceContainerLowest` | `#E4E2E6` | `#0D0E11` | Lowest tonal layer |
| `$surfaceContainerLow` | `#E9E7EC` | `#1A1B1E` | |
| `$surfaceContainer` | `#EFEDF1` | `#1E1F23` | **Default card surface** |
| `$surfaceContainerHigh` | `#F4F3F7` | `#292A2D` | Raised cards, sheets |
| `$surfaceContainerHighest` | `#FFFFFF` | `#343538` | Highest tonal layer, menus |
| `$surfaceBright` / `$surfaceDim` | `#FAF9FD` / `#DBD9DD` | `#38393C` / `#121316` | Brightest / dimmest surface |
| `$inverseSurface` / `$inverseOnSurface` | `#2F3033` / `#F1F0F4` | `#E3E2E6` / `#1A1B1E` | Snackbars, tooltips (inverted) |

**Pick the container by elevation role, not by guessing a grey.** A card is `$surfaceContainer`; a card that needs to read as raised is `$surfaceContainerHigh`. Text on any of these is `$onSurface` (or `$onSurfaceVariant` for secondary text).

Magna also ships explicit elevation surfaces (`surface1`–`surface5`): light `#EDF1FB #E6ECFA #DEE7F9 #DCE5F8 #D7E2F8`, dark `#1A1C22 #1F2129 #242730 #252832 #292C37`. Prefer the M3 `surfaceContainer*` roles for new work; the numbered set exists for legacy components.

### 2.5 Outline & utility

| Role | Light | Dark | Use |
|---|---|---|---|
| `$outline` | `#757680` | `#8F909A` | Borders, dividers, text-field outlines (4.3:1 — decorative/AA-large) |
| `$outlineVariant` | `#C5C6D0` | `#45464F` | Subtle separators, disabled outlines |
| `$scrim` | `#000000` | `#000000` | Modal/scrim overlay base (apply opacity) |
| `$shadow` | `#000000` | `#000000` | Shadow color when shadows are used |

### 2.6 State layers

M3 communicates hover/focus/press via **state-layer overlays**: the relevant `on-` role at a fixed opacity over the component. Standard opacities: **hover 8%, focus/press 12%, drag 16%**. Tamagui press/hover states should apply the matching `on-` role at these opacities — e.g., a hovered `primary` button overlays `onPrimary` at 8%. Don't hand-tune one-off hover colors.

### 2.7 Extended palette — `magnaColors` ramps

The full Material tonal palettes (Indigo, Deep Purple, Amber, Orange, Pink, Green, Red, Teal, Blue, etc.) plus a complete second key-color theme `magnaOrange` (full M3 role set in light/dark) exist under `magnaColors/*`. Use these for:
- **Data visualization & category coding** (charts, tags, subject colors)
- **Success/warning/info needs** — pick a hue and use its container + on-container pair so contrast holds
- **`magnaOrange`** is a complete alternate brand theme (orange seed `#8B5000` light / `#FFB870` dark) — available if a surface needs the warm brand expression; same role structure as blue-primary.

Extended ramps are not for core UI chrome — buttons, links, and primary navigation use the semantic roles.

### 2.8 Common

`white` `#FFFFFF`, `black` `#000000` — mode-invariant; use only for content that must not flip (image overlays, brand marks).

---

## 3. Typography System

**Single family: Inter.** Weights: 400 (Regular), 500 (Medium), 600 (SemiBold). The scale matches Jedi's so the two systems feel related — but Magna leans on the larger end for learner legibility.

### 3.1 Core scale — Desktop

| Token | Size | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|
| `headline1` | 32px | 600 | 36px | -0.4px | — |
| `headline2` | 28px | 600 | 32px | -0.4px | — |
| `headline3` | 24px | 600 | 28px | -0.4px | — |
| `headline4` | 20px | 600 | 24px | -0.4px | — |
| `headline5` | 18px | 600 | 24px | -0.4px | — |
| `subtitle1` | 16px | 600 | 24px | -0.4px | — |
| `subtitle2` | 14px | 600 | 20px | -0.4px | — |
| `body1` | 16px | 400 | 24px | -0.1px | — |
| `body2` | 14px | 400 | 20px | -0.1px | — |
| `caption` | 12px | 400 | 16px | 0px | — |
| `overline` | 10px | 600 | 16px | 1.25px | UPPERCASE |
| `buttonLarge` | 16px | 500 | 24px | 0px | Title Case |
| `buttonMedium` | 14px | 500 | 20px | 0px | Title Case |
| `buttonSmall` | 12px | 500 | 16px | 0px | Title Case |

Emphasis: `subtitle1Bold` 16/600/1.75/0.35px · `subtitle2Bold` 14/600/1.57/0.1px · `subtitle1Medium` 16/500/24/-0.4px.

> Buttons are **Title Case**, not UPPERCASE (this differs from Jedi). Learner-facing buttons read as friendlier in Title Case; only `overline` is uppercased.

### 3.2 Core scale — Mobile (native + small web)

| Token | Size / Line height | Letter spacing |
|---|---|---|
| headline1 | 26px / 32px | -0.4px |
| headline2 | 24px / 28px | -0.4px |
| headline3 | 22px / 24px | -0.6px |
| headline4 | 20px / 24px | -0.4px |
| headline5 | 18px / 24px | -0.4px |
| subtitle1 | 16px / 24px | -0.4px |
| subtitle2 | 14px / 20px | -0.4px |
| body1 | 16px / 24px | -0.1px |
| body2 | 14px / 20px | -0.1px |
| caption | 12px / 16px | 0px |
| captionMobile | 10px / 16px | 0.4px |
| overline | 10px / 16px | 1.25px |

> **Body text does not shrink on mobile** (stays 16/14, unlike Jedi which drops to 14/12). Learners read on phones — legibility wins over density.

### 3.3 Component type tokens

| Component | Spec |
|---|---|
| Course title | Inter 600, 16/24, -0.4px |
| Button (medium) | Inter 500, 14/20, 0px, Title Case |
| Avatar initials | Inter 600, 20/24, 0.14px |
| Alert title | Inter 500, 16/1.5, 0.15px |
| Badge label | Inter 600, 12/16, 0.14px |
| Video time | Inter/Lato 500, 8/8 (legacy — migrate to caption) |

---

## 4. Usability Rules (learner-first)

### 4.1 Contrast — M3 pairs are pre-verified

Because M3 pairs roles for contrast, following the role pairing *is* the accessibility rule. Measured (blue-primary):

| Pair | Light | Dark |
|---|---|---|
| `onPrimary` on `primary` | 6.48:1 ✅ | 7.71:1 ✅ |
| `onSurface` on `surface` | 16.4:1 ✅ | 10.9:1 ✅ |
| `onSurfaceVariant` on `surface` | 8.9:1 ✅ | — ✅ |
| `onPrimaryContainer` on `primaryContainer` | 13.2:1 ✅ | ✅ |
| `primary` on `surface` | 6.18:1 ✅ | 10.9:1 ✅ |
| `onError` on `error` | 6.47:1 ✅ | ✅ |
| `outline` on `surface` | 4.30:1 ⚠️ | — |

### 4.2 Rules

1. **Always use a role with its paired `on-` role.** Text on `primary` = `onPrimary`; on `surfaceContainer` = `onSurface`; on `errorContainer` = `onErrorContainer`. Never put `onSurface` text on a `primary` fill.
2. **`$outline` is for borders and large/decorative text only** (4.3:1). Body text is always `onSurface` / `onSurfaceVariant`.
3. **Never communicate state by color alone** — error states get an icon + message, not just `$error` coloring. Critical for a broad learner audience.
4. **Touch targets ≥ 48×48dp** (M3 standard; larger than Jedi's 44 because mobile-first learners). Spacing between targets ≥ 8dp.
5. **Body text never below 14px on learner surfaces**; 12px caption for metadata only, 10px for incidental labels.
6. **Respect the elevation model:** raise importance with `surfaceContainer*` tonal steps, not heavy shadows. Shadows, if used, are subtle and use `$shadow`.
7. **Disabled states** = content at 38% opacity over the surface (M3 standard), or the `on-surface` role at reduced emphasis — never a custom grey.
8. **Generous spacing.** Learner surfaces breathe; don't pack content. This is the deliberate inverse of Jedi's density allowance.

### 4.3 Semantic elements & accessible names

In a cross-platform Tamagui monorepo this matters doubly: the same component renders to real DOM (`<a>` / `<button>`) on web and to RN accessibility roles on native. Get the semantics right once and both platforms announce correctly.

9. **Links navigate, buttons act — pick by behavior, not appearance.** Anything that changes the route is a link; anything that triggers an action (enroll, open sheet, toggle, submit) is a button. An action that *looks* like a link is still a button: use a **link-styled button**, not a navigational link. On web that must render `<button>` (or `<a role="button">` only if unavoidable); on native it carries `accessibilityRole="button"`. Never wire an action `onPress` onto something announced as a link.
10. **Use the link-styled button for inline text actions** ("Show more", "Resume"). It keeps the link look but is keyboard/screen-reader-announced as a button and is focus + Enter/Space operable. Genuine navigation (to a course, a profile) uses a real link with `accessibilityRole="link"`.
11. **Icon-only buttons only when an icon truly suffices — never without an accessible name.** Reserve icon-only for universally-understood actions (close, back, search, overflow `⋮`). Every one sets `accessibilityLabel` (web `aria-label`) and, on web, a tooltip. For primary or destructive actions, a labeled button beats an icon-only one (ties to §6.4 rule 11). An icon button with no accessible name is a hard failure on both platforms.
12. **One top-level heading per screen; heading levels descend without skipping.** Don't choose a type token for its size — use the structural level and restyle. Inputs have associated labels; meaningful images carry alt / `accessibilityLabel`, decorative ones are explicitly empty/hidden.

---

## 5. Aesthetic Intent

- **Warm, clear, confident.** Magna is for people learning something new — the UI should reduce anxiety, not add it. Roomy spacing, large readable type, obvious next actions.
- **Let M3 tonality do the work.** The container/surface tonal steps create depth and grouping without borders or shadows. Reach for a higher `surfaceContainer` before reaching for a divider or a shadow.
- **One primary action, made obvious.** A single `primary` / `primaryContainer` emphasis per view; everything else recedes to surface roles.
- **Color carries meaning, not decoration.** Primary = "the main thing"; tertiary and extended hues = categories/accents. Don't scatter accent colors for visual interest.
- **Title Case, friendly voice.** Buttons and labels read as human, not systemic.
- **Trends as execution quality:** smooth, M3-standard motion and state layers, refined empty states, skeleton loading — yes. Decorative gradients/glass that hurt legibility — no.

---

## 6. Interaction & Behavioral Design

Form follows function; for learners the bias is toward clarity and confidence over density. Each rule is flagged with the heuristic it operationalizes.

### 6.1 Choices & cognitive load
1. **~7 options at a *designed* decision point** (nav, action menus, filter groups) — group/search/progressive-disclose beyond. Does **not** apply to data-driven collections (a course catalog, a long dropdown): those get search, filter, pagination. `[Hick's / Miller's]`
2. **Forms: 7±2 fields per step (max 9)**, split into steps with visible progress beyond that. Learner forms especially benefit from chunking. `[chunking, goal-gradient]`
3. **Defaults do the work** — from data already trivially available (profile/state/last-used). Never requires building new tracking; out of scope unless asked. `[Tesler's law]`
4. **One primary action per view.** One `primary`/`primaryContainer`-emphasis control; everything else is surface/secondary. `[Von Restorff]`

### 6.2 Feedback & status
5. **Every action >400ms shows state** — skeletons for content areas, M3 progress indicators for waits. `[Nielsen #1, Doherty]`
6. **Success is explicit, never silent** — confirmation via snackbar (use `inverseSurface`/`inverseOnSurface`), state change, or check. `[Nielsen #1]`
7. **Destructive actions confirm; reversible actions don't** (with undo where feasible). Don't confirm-dialog harmless actions. `[Nielsen #5, alarm fatigue]`

### 6.3 Errors & recovery
8. **Prevent before you scold** — inline-validate on blur, constrain inputs, show requirements upfront. `[Nielsen #5]`
9. **Errors say what happened + what to do next**, in plain learner-friendly language, no codes or jargon. `[Nielsen #9]`
10. **Never destroy user input** on a failed submit. `[loss aversion]`

### 6.4 Recognition & continuity
11. **Recognition over recall: visible labels.** No icon-only primary/destructive actions; icon-only only for universal icons (close/search/back/overflow), always with an `accessibilityLabel` + tooltip on web (see §4.3). Inline text actions use the link-styled button, never an action wired onto a link. `[Nielsen #6]`
12. **Multi-step shows where you are** — steppers, course/lesson progress; unfinished work is visibly resumable (critical for learning journeys). `[Zeigarnik, goal-gradient]`
13. **Empty states are starting points** — every empty list/dashboard explains what belongs there and offers the action that fills it. `[Nielsen #10]`

### 6.5 Motion
14. **Tamagui + M3-standard motion.** Use the platform's standard easing/durations and M3 state layers; no custom or scroll-triggered animation unprompted. Custom motion on explicit request → flag under Deviations. Respect reduced-motion settings.

### 6.6 Scannability
15. **Tables/lists scan cleanly** — right-align numbers with tabular figures, left-align text, front-load the distinguishing word ("Algebra: Quadratics", not "Module 3 — Quadratics, Algebra"). `[F-pattern]`
16. **Label and value visually distinct** in key-value displays — label `$onSurfaceVariant`, value `$onSurface`. Never same weight/color.
17. **One clear entry point per screen**; group by proximity + tonal surface, not borders/dividers. `[visual hierarchy, Gestalt proximity]`
18. **Plain language, expand acronyms on first use, chunk under subheads.** Especially important for learners encountering new domain terms. `[reduces extraneous load]`

---

## 7. Content Design — Great Learning voice & rules

> Content design ships **with** this system. Every label, button, dialog, error, empty state, notification, heading and body string in magna follows the Great Learning content rules below. These rules are identical across Magna, Jedi and GLDS-Web — only which sections apply differs.

**Applies to magna** (learner-facing student app): Sections **A–H** apply to all in-app copy. Section **I (Olympus)** applies to student-facing surfaces. Section **J (SEO) does not apply** — Magna is an app, not a marketing page.

If a string can't satisfy both these rules and the design rules above, flag the conflict — don't silently pick one. Default to UK English unless the surface is region-specific. Full reviewer skill: `skills/magna-design-system/SKILL.md`.

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

How an AI coding agent works on this codebase — surface blind spots, help, never block, near-zero overhead.

### 7.1 State enumeration before generation
Any component tied to identity or a learner lifecycle has states the AI can't guess. Walk five dimensions:
1. **Identity** — anonymous / logged-in learner / (enrolled vs not) + any product roles
2. **Domain lifecycle** — e.g., course card: not logged in → logged in not enrolled → enrolled not started → in progress → completed → expired/locked
3. **Data** — loading, empty, error, partial, populated
4. **Interaction** — hover, focus, press, disabled, selected (M3 state layers cover these)
5. **Edge** — zero items, one item, hundreds, very long titles, slow network, no permission

Propose the state matrix for stateful components; static pieces skip this.

### 7.2 Ask vs assume vs build
- **Specified** (prompt/codebase/context) → build.
- **Inferable** → build on the inference and **declare it** in the coverage report. Don't ask.
- **Unknowable** (identity/lifecycle/business behavior nothing implies) → **ask before coding**, one batched round, framed as a state matrix to confirm. Never drip questions. Never ask what you can answer.

### 7.3 Coverage report — mandatory, ≤ 5 lines
```
COVERAGE
Covered:    <states/cases implemented>
Assumed:    <each inference made>
Not covered: <out of scope, deliberate or not>
Test first: <2–3 highest-risk paths>
Deviations: <off-system instructions followed — omit if none>
```
Self-declaration appended after generation (not test execution). Converts silent assumptions into visible ones; output is never presented as implicitly complete.

### 7.4 Reuse before create
Check the monorepo for an existing Tamagui component first; extend, don't fork. In a shared monorepo, duplicate components are especially costly. Justify any fork in the coverage report.

### 7.5 Pattern precedent
For unspecified patterns, match what the codebase already does — existing convention beats general best practice. Deviating requires a stated reason. `[Jakob's law, Nielsen #4]`

### 7.6 Use M3 roles, never raw values
The single most important Magna-specific rule: the AI must reference Tamagui role tokens (`$primary`, `$onSurface`, …) and never emit a hex or pick a color by hue. If a needed role seems missing, ask — don't invent a color. Pair every surface/container with its `on-` role.

### 7.7 Deviation flag, not refusal
Explicit off-system request → comply and record under `Deviations`. Never silently comply, never refuse.

### 7.8 Overhead cap & tiebreaker
Report ≤ 5 lines; state matrix only for stateful components; one question round max. When a decision is unspecified and uncovered: **choose the option with fewer steps to task completion** — and for learners, the one that's clearer to a first-time user.

### 7.9 Dev request template (optional)
```
What: <component/feature>
Who sees it: <anonymous / learner (enrolled?) — per-state differences>
Lifecycle states: <not enrolled / in progress / completed — what differs>
Data shape: <source + rough fields, or "mock">
Out of scope: <what NOT to build>
```

---

## 9. Tamagui wiring (sketch)

Magna's tokens map M3 roles into a Tamagui theme. Define each role once per mode; Tamagui resolves `$token` per active theme.

```ts
// tokens.ts — roles defined per mode (light/dark), referenced as $role
import { createTokens, createTamagui, createTheme } from 'tamagui'

const lightColors = {
  primary: '#0054D6', onPrimary: '#FFFFFF',
  primaryContainer: '#DAE1FF', onPrimaryContainer: '#001849',
  secondary: '#3A3BFF', onSecondary: '#FFFFFF',
  secondaryContainer: '#E1E0FF', onSecondaryContainer: '#05006D',
  tertiary: '#8B00E8', onTertiary: '#FFFFFF',
  tertiaryContainer: '#F1DBFF', onTertiaryContainer: '#2D0050',
  error: '#BA1A17', onError: '#FFFFFF',
  errorContainer: '#FFDAD5', onErrorContainer: '#410001',
  background: '#FDFBFF', onBackground: '#1A1B1E',
  surface: '#FAF9FD', onSurface: '#1A1B1E',
  surfaceVariant: '#E2E2EC', onSurfaceVariant: '#45464F',
  surfaceContainerLowest: '#E4E2E6', surfaceContainerLow: '#E9E7EC',
  surfaceContainer: '#EFEDF1', surfaceContainerHigh: '#F4F3F7',
  surfaceContainerHighest: '#FFFFFF',
  surfaceBright: '#FAF9FD', surfaceDim: '#DBD9DD',
  inverseSurface: '#2F3033', inverseOnSurface: '#F1F0F4', inversePrimary: '#B3C5FF',
  outline: '#757680', outlineVariant: '#C5C6D0',
  surfaceTint: '#0054D6', scrim: '#000000', shadow: '#000000',
}

const darkColors = {
  primary: '#B3C5FF', onPrimary: '#002B75',
  primaryContainer: '#003FA4', onPrimaryContainer: '#DAE1FF',
  secondary: '#C0C1FF', onSecondary: '#0C00AA',
  secondaryContainer: '#1600EC', onSecondaryContainer: '#E1E0FF',
  tertiary: '#DEB7FF', onTertiary: '#4A007F',
  tertiaryContainer: '#6900B2', onTertiaryContainer: '#F1DBFF',
  error: '#FFB4AA', onError: '#690003',
  errorContainer: '#2D171A', onErrorContainer: '#FFDAD5',
  background: '#1A1B1E', onBackground: '#E3E2E6',
  surface: '#121316', onSurface: '#C7C6CA',
  surfaceVariant: '#45464F', onSurfaceVariant: '#C5C6D0',
  surfaceContainerLowest: '#0D0E11', surfaceContainerLow: '#1A1B1E',
  surfaceContainer: '#1E1F23', surfaceContainerHigh: '#292A2D',
  surfaceContainerHighest: '#343538',
  surfaceBright: '#38393C', surfaceDim: '#121316',
  inverseSurface: '#E3E2E6', inverseOnSurface: '#1A1B1E', inversePrimary: '#0054D6',
  outline: '#8F909A', outlineVariant: '#45464F',
  surfaceTint: '#B3C5FF', scrim: '#000000', shadow: '#000000',
}

export const light = createTheme(lightColors)
export const dark = createTheme(darkColors)

// State layers: apply the on- role at 8/12/16% for hover/press/drag.
// e.g. a hovered primary button = primary fill + onPrimary @ 8% overlay.
```

Typography maps the §3 scale to Tamagui font tokens (`$body1`, `$headline3`, …) with size/lineHeight/letterSpacing/weight, plus the mobile overrides as a second font config or media-query variants. Inter is the single family across web and native.

---

## 10. Anti-patterns (what AI coders must never generate)

1. ❌ Any raw hex or rgba in component code — only Tamagui role tokens (`$primary`, `$onSurface`, …).
2. ❌ Picking a color by hue instead of role ("I need a blue" → use `$primary`, not `magnaColors/Blue/600`).
3. ❌ Mismatched role pairs — `onSurface` text on a `primary` fill, `onPrimary` on a surface, etc. Always the paired `on-` role.
4. ❌ Inventing success/warning/info colors loosely — use an extended hue's container + on-container pair.
5. ❌ Heavy shadows for elevation — use `surfaceContainer*` tonal steps (M3 model).
6. ❌ UPPERCASE buttons — Magna buttons are Title Case (only `overline` is uppercased).
7. ❌ Shrinking body text below 14px on learner surfaces.
8. ❌ Touch targets under 48dp.
9. ❌ Two primary-emphasis actions in one view.
10. ❌ Happy-path-only components — missing loading/empty/error states is incomplete work.
11. ❌ Confirm dialogs on harmless reversible actions.
12. ❌ Icon-only primary or destructive actions.
13. ❌ An icon-only button with no `accessibilityLabel`/`aria-label` — every icon button needs an accessible name.
14. ❌ An action `onPress` wired onto something announced as a link, or a link used for an in-place action — use a link-styled button (`accessibilityRole="button"`). Real navigation uses a real link.
15. ❌ Blank empty states.
16. ❌ Color-only status indication.
17. ❌ Inventing a role token that doesn't exist — ask instead.
18. ❌ Forking an existing monorepo component instead of extending it.
19. ❌ Unprompted custom animation — Tamagui/M3-standard motion on the first pass.
20. ❌ Borders/dividers for grouping that tonal surfaces could do.
21. ❌ Presenting output without the coverage report, or as implicitly complete.
