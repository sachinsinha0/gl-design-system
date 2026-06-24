# GLDS Web — Great Learning Design System (Website & Landing Pages)

**Scope:** Foundations + Design Language + strict Component definitions. This is the **website / landing-page** system — distinct from Jedi (internal app) and Magna (learner app).
**Stack:** Ruby on Rails views, **plain HTML + CSS + JavaScript/jQuery**. No React, no component framework — components are HTML/CSS patterns, not JSX. Build them as partials/helpers and a shared stylesheet.
**Type:** Marketing pages, landing pages, the Academy+ website. Mostly static content with basic interactions (hover, focus, active, form submission). No app-style data lifecycles.
**Fonts:** **Poppins** (headings, UI, buttons) + Regular/Medium/SemiBold. Legacy body uses **Noto Sans**; new work uses Poppins throughout.
**Icons:** **Material Icons** (Google). Use the icon font or inline SVGs from the Material Icons set — do not mix in other icon libraries.
**Foundations + Design Language and the Components page must be followed strictly** — the definitions below are extracted directly from the production Figma file.
**Companion file:** `glds-web-design-system.context.md` — lean version for AI coding sessions.

---

## 1. Design Language (the brand voice in UI)

Great Learning's palette is built on named brand colors with intent — use them by meaning, not by hex:

| Brand color | Hex | Meaning / use |
|---|---|---|
| **Freedom Blue** | `#196AE5` | Primary brand & primary UI action (buttons, links, focus) |
| **Trust Blue** | `#0E39A9` | Deeper brand blue — emphasis, hover-dark, headings on light |
| **Wisdom Indigo** | `#0C1D5D` | Darkest brand blue — high-contrast headlines, footers |
| **Creativity Purple** | `#5C34B1` | Accent for creative/innovation themes |
| **Intellect Mandarin** | `#FF9800` | Secondary action / warm accent |
| **Energy Orange** | `#FFBF00` | Highlights, alert/attention (amber) |
| **Optimism Yellow** | `#FFDF00` | Bright accent, sparing use |
| **Balance Black** | `#000000` | Pure contrast |
| **Purity White** | `#FFFFFF` | Primary surface |

**Design Language principles:** Freedom Blue leads every interactive moment; warm colors (Mandarin/Orange/Yellow) are accents, never the primary action. Poppins gives the brand its confident, rounded, modern voice. Generous whitespace, large expressive headlines, clear single calls-to-action per section — this is marketing, so each section should have one obvious next step.

---

## 2. Foundations — Color

### 2.1 Primary UI Action (Freedom Blue ramp)

| Step | Hex | Step | Hex |
|---|---|---|---|
| 50 | `#E8F0FC` | 500 | `#196AE5` (base) |
| 100 | `#BAD2F7` | 600 | `#1455B7` |
| 200 | `#8CB5F2` | 700 | `#0041B2` |
| 300 | `#4788EA` | 800 | `#0F4089` |
| 400 | `#3079E8` | 900 | `#0D3573` |

Primary action = **500**; hover = **600**; pressed/active = **700/800**; tints/backgrounds = **50/100**.

### 2.2 Secondary UI Action (Mandarin ramp)

50 `#FFF3E0` · 100 `#FFE0B2` · 200 `#FFCC80` · 300 `#FFB74D` · 400 `#FFA726` · **500 `#FF9800`** · 600 `#FB8C00` · 700 `#F57C00` · 800 `#EF6C00` · 900 `#E65100`

### 2.3 Web Greys (light mode)

| Token | Hex | Use |
|---|---|---|
| Pure Contrast | `#000000` | Max-contrast text |
| Contrast 190 | `#201F1E` | Near-black headings |
| **Primary Text** | `#323130` | Body & heading text |
| Contrast 150 | `#3B3A39` | Strong text |
| **Secondary Text** | `#605E5C` | Supporting text, captions |
| **Disabled Text** | `#A19F9D` | Disabled |
| Contrast 60 / 50 / 40 | `#C8C6C4` / `#D2D0CE` / `#E1DFDD` | Borders, dividers, fills |
| **Divider** | `#EDEBE9` | Hairline separators |
| **Secondary Surface** | `#F8F8F8` | Alt section background |
| **Primary Surface** | `#FFFFFF` | Page background |

> Brand text ink is `#323130`, not pure black — softer on long marketing copy. Use Pure Contrast/`#000` only where maximum contrast is intended.

### 2.4 Web Dark Mode

Primary Surface `#000000` · Secondary Surface `#201F1E` · Tertiary Surface `#323130` · Disabled Text `#605E5C` · Contrast 90 `#A19F9D` · Contrast 60 `#C8C6C4` · Body Divider `#D2D0CE` · Contrast 40 `#E1DFDD` · Secondary Text `#F8F8F8` · Primary Text `#FFFFFF`

### 2.5 UI Feedback

| Type | 50 (bg) | 500 (main) | 800 (text) |
|---|---|---|---|
| **Error** | `#FFEBEE` | `#FF3333` | `#323130` |
| **Alert** | `#FFF8E1` | `#FFBF00` | `#323130` |
| **Success** | `#E7F7E7` | `#22BB33` | `#323130` |

Pattern: tint-50 background, 500 for icon/border, dark grey 800 for the message text (amber/red/green fail as text on white — never set feedback message text in the 500 color).

### 2.6 Course Card colors (background / foreground pairs)

Cool: Cool10 `#E1F4F4`/`#00A498` · Cool20 `#E3F4FF`/`#196BE5` · Cool30 `#E7E9F7`/`#0E39A9` · Cool40 `#EDE7F6`/`#5C34B1`
Warm: Warm10 `#FFF8E1`/`#FFA200` · Warm20 `#FBE9E7`/`#E64A19` · Warm30 `#FBE8E7`/`#E53119` · Warm40 `#FCE4EC`/`#C2185B`

Always use a pair together (background + its foreground) so text/icon contrast holds on the tinted card.

---

## 3. Foundations — Typography

Two scales exist in the file. **Use the `Web` scale (Poppins throughout) for all new work.** The older `GLDS Typescale` (Poppins headings + Noto Sans body) is legacy — documented in §3.3 for maintaining existing pages.

### 3.1 Web scale — Desktop (Poppins)

| Style | Size | Weight | Line height | Letter spacing | Case |
|---|---|---|---|---|---|
| Headline 1 | 64px | SemiBold | 80px | -2% | — |
| Headline 2 | 48px | SemiBold | 64px | -2% | — |
| Headline 3 | 32px | SemiBold | 40px | 0 | — |
| Headline 4 | 28px | SemiBold | 40px | 0 | — |
| Headline 5 | 24px | SemiBold | 32px | 0 | — |
| Headline 6 | 20px | SemiBold | 32px | 0.15px | — |
| Subtitle 1 | 16px | SemiBold | 24px | 0 | — |
| Subtitle 2 | 14px | SemiBold | 20px | 0 | — |
| Body 1 | 16px | Regular | 24px | 0 | — |
| Body 2 | 14px | Regular | 20px | 2% | — |
| Button | 16px | SemiBold | 16px | 0.5px | UPPERCASE |
| Button (Title Case) | 16px | SemiBold | 24px | 1px | Title Case |
| Button Small | 12px | Medium | 16px | 0.5px | UPPERCASE |
| Caption | 12px | Regular | 20px | 0.15px | — |
| Overline | 12px | SemiBold | 16px | 20% | UPPERCASE |

### 3.2 Web scale — Mobile

H1 40/48/-2% · H2 32/40/-2% · H3 24/32 · H4 20/32 · H5 18/24 · H6 16/24/0.15px · Subtitle1 14/20 · Subtitle2 12/16/0.15px · Body1 14/20 · Body2 12/16 · Button 14/16/0.5px UPPER · Button TC 14/20 Title · Caption 10/16/0.15px · Overline 10/16/1.5px UPPER. All Poppins.

> Headlines scale down substantially on mobile (H1 64→40). Use the responsive pair, not a single fluid value, unless you implement clamp() carefully.

### 3.3 Legacy GLDS Typescale (existing pages only)

Poppins Medium headlines (H1 92px down to H6 20px) with **Noto Sans** Body 1/2/3 (16/14/12). Don't use for new pages; migrate to the Web scale when touching old templates.

---

## 4. Foundations — Spacing, Icons, Layout, Breakpoints

- **Spacing rhythm: base-8.** Confirmed tokens `spacing-xsm = 8px`, `spacing-sm = 16px`; continue the 8px rhythm (8/16/24/32/48/64…) for section padding and gaps.
- **Icons: Material Icons.** Use the Material Icons font (`<span class="material-icons">name</span>`) or inline Material SVGs. Standard sizes 20/24px inline with text; keep icon color matched to adjacent text color. No other icon set.
- **Layout:** marketing sections are full-width bands with a centered max-width content column; alternate Primary Surface (`#FFFFFF`) and Secondary Surface (`#F8F8F8`) to separate bands rather than drawing dividers.

### 4.1 Breakpoints & mobile-first

The targets are **mobile browsers**, **tablets**, and **Windows desktop**. Three device bands:

- **Mobile:** below **768px**
- **Tablet:** **768px – 1024px**
- **Desktop:** above **1024px**

Define these as variables once (`$breakpoint-md: 768px`, `$breakpoint-lg: 1024px`) and reference them everywhere — never hardcode the numbers per-component.

**Type scale swap.** The file ships two discrete type scales (Mobile and Desktop) — type **swaps at a breakpoint**, it does not fluidly interpolate. With three device bands and two scales, the mapping is:
- **< 768px (mobile):** Mobile type scale
- **≥ 768px (tablet + desktop):** Desktop type scale

Tablets are wide enough for the Desktop scale, so the type switch happens at **768px**. The **1024px** breakpoint governs **layout** (column counts, container max-width, grid changes) — not type.

> ⚠️ **Assumption to confirm:** mapping tablet to the Desktop type scale matches the file's two-scale design. If the team wants tablet to use the Mobile scale (or a dedicated tablet treatment), that's a design decision — change the swap point and note it. The band values (768 / 1024) are the standard cutoffs.

**Mobile-first rules** (most ad/landing traffic is mobile):
- The hero value proposition + primary CTA must be visible without scrolling on a typical phone viewport — don't let a decorative hero image push them below the fold.
- **No hover-dependent content.** Touch has no hover; hover may *enhance* but must never *reveal* essential content or actions. Anything behind a hover must also be reachable on tap/focus. (Applies to mobile and tablet — both are touch.)
- CTAs are thumb-reachable; tap targets ≥ 48px, ≥ 8px apart.
- Headlines must survive the 40px mobile H1 without breaking into an awkward wrap — keep hero copy short.

---

## 5. Components (STRICT — match the Figma Components page)

These are HTML/CSS components, not framework components. Each spec gives **anatomy, variants, states, and usage**. The variant axes are exactly those defined in Figma — don't add or rename variants.

### 5.1 Button

**Anatomy:** container (padding + radius) · optional leading icon · label (Button type style) · optional trailing icon. Min height per size; icon is a Material Icon matched to label color.

**Variants (axes from Figma):**
- **configuration:** `linkbutton` · `text` · `outlined` · `filled` · `tonal`
- **icon:** `no-icon` · `with-icon-left` · `with-icon-right`
- **size:** `Small` · `Medium` · `Large`
- **color:** `primary` (Freedom Blue)

**Configuration definitions:**
- **filled** — solid Primary 500 background, white label. The main page CTA. Hover → Primary 600; pressed → Primary 700.
- **tonal** — Primary 50/100 tint background, Primary 700 label. Medium emphasis, secondary CTA.
- **outlined** — transparent bg, Primary 500 border + label. Hover → Primary 50 bg fill.
- **text** — no bg/border, Primary 500 label, padding retained. Low emphasis inline action.
- **linkbutton** — looks like a link (Primary 500, no padding box) but is a real `<button>`. Use for inline text actions that perform an action rather than navigate. **A `<button>`, never an `<a>` with a JS handler.**

**States (every configuration × size):** `enabled` · `hovered` · `pressed` · `disabled`. Disabled uses Disabled Text `#A19F9D` and a muted/again-tint fill; never lower whole-element opacity. Always include a visible `:focus-visible` outline (keyboard).

**Usage:**
- One **filled** primary button per section/view — that's the section's single call-to-action.
- Pair filled (primary CTA) with outlined/text (secondary) — never two filled buttons competing.
- Button label is Poppins SemiBold; UPPERCASE per the Button type style, or Title Case where the friendlier `Button TC` style is specified.
- Icon-only buttons are not part of this set — buttons carry labels. (Material icon-only controls, if ever needed, require an `aria-label`.)

### 5.2 Tag

**Anatomy:** small rounded container · optional icon (left/right) · short label.

**Variants:** **Size** `Small`/`Large` · **Style** `Filled`/`Tonal`/`Outlined`/`Outlined Ghost` · **Colour** `Primary`/`Secondary`/`Success`/`Error` · **Icon** `Left`/`Right`.

- Filled = solid color bg; Tonal = tint bg + dark-color text; Outlined = border only; Outlined Ghost = subtle/low-contrast border.
- **Usage:** status/category labels, not actions. Color carries meaning (Success/Error from UI Feedback; Primary/Secondary for category). Keep labels to 1–2 words.

### 5.3 Text Input

**Anatomy:** label · field container (border, radius, padding) · optional leading adornment · value/placeholder · optional trailing icon · optional helper text.

**Variants:** **Size** `Small`/`Medium*` · **State** `Enabled`/`Hovered`/`Focused`/`Disabled`/`Error` · **Has Value** T/F · **Adornment** T/F · **Icon End** T/F · **Helper Text** T/F.

**States:** Enabled (grey border) · Hovered (darker border) · Focused (Primary 500 border + visible ring) · Error (Error 500 border + helper text in error) · Disabled (Disabled Text, muted border, not opacity). Placeholder uses Secondary Text; entered value uses Primary Text.

**Usage:** every input has a real `<label>` (associated via `for`/`id`). Helper text sits below; error message replaces/ː augments helper text and is announced. Validate on blur, not per keystroke. Error state pairs color with the helper message — never color alone.

### 5.4 Select

**Anatomy:** label · field (like Text Input) · trailing chevron (Material `expand_more`) · optional leading icon · menu list on open · optional helper text.

**Variants:** **Size** `Small`/`Medium*` · **State** `Enabled`/`Hovered`/`Focused`/`Disabled`/`Error` · **Has Value** T/F · **Icon Left** T/F · **Helper Text** T/F.

**Usage:** mirrors Text Input states/colors. Use a native `<select>` for accessibility and mobile unless a custom menu is required; if custom, manage keyboard (arrow/enter/escape) and `aria-expanded`. Closed-with-no-value shows placeholder in Secondary Text.

### 5.5 Checkbox

**Anatomy:** box (border/fill) · check or indeterminate glyph · optional label.

**Variants:** **Checked** T/F · **Indeterminate** T/F · **Label** T/F · **Size** `Small`/`Medium*` · **Color** `Default`/`Info`/`Primary*` · **State** `Hovered`/`Focused`/`Disabled`.

**States:** unchecked (border only) · checked (Primary/Info fill + white check) · indeterminate (fill + dash) · hovered (state-layer tint) · focused (visible ring) · disabled (Disabled Text). 
**Usage:** clickable label is part of the target (wrap in `<label>`); target ≥ the box + label area. Indeterminate only for parent-of-group "some selected".

### 5.6 Switch

**Anatomy:** track · thumb · optional label.

**Variants:** **Checked** T/F · **Label** T/F · **Size** `Small`/`Medium` · **Color** `Primary`/`Default` · **State** `Enabled`/`Hovered`/`Focused`.

**Usage:** for immediate on/off settings (not form submission choices — use Checkbox for those). Checked track = Primary 500. Always has an accessible label; the label states what ON means.

### 5.7 Pagination & PaginationItem

**Pagination variants:** **Shape** `Circular*`/`Rounded` · **Color** `Primary`/`Default`.
**PaginationItem variants:** **Active** T/F · **Icon** T/F (prev/next arrows) · **Size** `Small`/`Medium*`/`Large` · **Variant** `Text*`/`Outlined` · **Shape** `Circular*`/`Rounded` · **Color** `Standard*`/`Primary`/`Secondary` · **Disabled** T/F.

**Usage:** active page item uses the color fill; others are Text variant. Prev/next use Material chevron icons; disable (not hide) them at the ends. Each item is a real link/button with an accessible name ("Page 3", "Next page").

### 5.8 Brand logos & Keyboard

The Components page also includes a **Brand logos** section (partner/brand marks) and a **Keyboard** widget (on-screen keys/toolbar/navigation for specific product surfaces). Reuse these assets as-is; don't recreate logos.

---

## 6. Interaction, Behavioral & Accessibility rules

Marketing pages are mostly static, so the protocol is lighter than the app systems — but these still hold:

1. **One primary call-to-action per section.** One **filled** button; supporting actions are outlined/text/link. `[Von Restorff]`
2. **Links navigate, buttons act.** A link goes to a URL (`<a href>`); an action that looks like a link is a **linkbutton** (`<button>` styled as a link), never an `<a>` with a JS click handler. `[semantics/a11y]`
3. **Material icon-only controls require an `aria-label`.** Buttons in this system carry labels; icon-only is the exception and always needs an accessible name. `[Nielsen #6]`
4. **Interaction states are mandatory, not optional polish:** every interactive element defines `:hover`, `:focus-visible` (visible ring — never `outline:none` without a replacement), `:active`, and disabled. `[Nielsen #1]`
5. **Forms:** real `<label>` per field; validate on blur; errors pair color + message (never color alone) and preserve entered values on failed submit. `[Nielsen #5/#9, loss aversion]`
6. **Feedback color is never text color.** Error/Alert/Success message text is grey 800; the 500 color is for icon/border/accent only (they fail WCAG as text on white). `[contrast]`
7. **Contrast:** body text uses Primary Text `#323130` (≈12:1 on white); Secondary Text `#605E5C` for supporting copy; never set body copy in a brand accent or feedback color.
8. **Heading order:** one `<h1>` per page (usually the hero), descend without skipping levels; pick the heading level for structure, style via CSS.
9. **Respect `prefers-reduced-motion`;** marketing animation (reveals, parallax) must degrade gracefully and never block content.
10. **Scannability:** large headline → short subhead → single CTA per band; front-load the value proposition; don't wall-of-text a landing page. `[F-pattern]`

---

## 7. Conversion & Landing-Page Design

These pages are **transient and attention-first**: a visitor arrives from an ad or search, gives a few seconds, *scans* (doesn't read), and either commits or leaves. The goal is comprehension-and-commitment in one fast pass — not task completion over time. Every rule here serves that.

### 7.1 The band model (one job per section)

Build pages as a vertical stack of full-width **bands**, each self-contained with **one headline, one supporting line, one action** — a single visual path, never competing focal points. A typical landing flow: **hero → value props → social proof → (pricing) → final CTA**. The eye should never have to choose where to look first within a band; if a band has two messages, split it into two bands.

### 7.2 The hero / above-the-fold contract

The first viewport must answer three questions before any scroll, on both mobile and desktop: **what is this · what do I get · what do I do.** That means a value-driven headline (clarity over cleverness), a subhead with the specifics/proof, and the primary CTA — all visible without scrolling. Decorative hero imagery must not push the value proposition or CTA below the fold.

### 7.3 Visual hierarchy & scan path

Visitors scan in an **F/Z pattern** — front-load the important words. Establish one clear focal point per band through size, weight, and position; everything else recedes. Use **whitespace and proximity as the grouping mechanism** (Gestalt): related elements close together, unrelated groups pushed apart, generous space between bands. Whitespace isn't empty space — it's what isolates the one thing you want seen. This is how information stays *connected for the eye* rather than scattered. `[F-pattern, Gestalt proximity, visual hierarchy]`

### 7.4 CTA system

- **Freedom Blue (Primary 500) is reserved for CTAs** — never use it as a decorative accent, so the action color never has to compete for meaning.
- **Repeat the CTA down a long page.** Visitors commit at different scroll depths; the hero CTA, a mid-page CTA, and a closing CTA are all the same action.
- **Action-and-value labels:** "Start free trial", "Book a demo", "Enroll now" — never "Submit"/"Click here". `[goal clarity]`
- **One filled primary CTA per band** (existing rule); supporting actions are outlined/text/linkbutton.

### 7.5 Forms — conversion choke points

Every field costs conversions, so ask for the minimum that the next step truly needs. Real `<label>` per field; validate on blur (not per keystroke); errors pair color + message and **never lose entered input** on a failed submit; show progress on multi-step forms; the submit button states its value ("Get my free guide", not "Submit"). `[Nielsen #5/#9, loss aversion, goal-gradient]`

### 7.6 Motion — spotlight, not wallpaper

Motion must **earn its place by directing attention**, not decorating. The test for any animation: *does it guide the eye to something that matters (the CTA, the next section, a state change)?* If not, cut it. Three tiers:

1. **Functional motion — always fine.** Hover/focus/active feedback, state transitions, validation appearing. Confirmation, not decoration.
2. **Attention motion — allowed but rationed.** Hero element easing in, one key stat counting up, a subtle CTA emphasis. Rule: **one focal animation per viewport, tied to the thing you want seen** — never competing animations in the same eyeful. Entrance reveals fire **once** on scroll-in and are **fast (200–400ms)** so they accelerate the scan, never make the visitor wait.
3. **Decorative / continuous motion — avoid.** Looping backgrounds, scroll-hijacking parallax, auto-advancing carousels (they move at the machine's pace, not the reader's, and measurably hurt conversion).

**Non-negotiables:** motion never hides content (especially on touch — no hover-reveal), never blocks interaction, never delays the CTA becoming usable, always honors `prefers-reduced-motion` with a static fallback. Lean toward *less* on mobile.

### 7.7 Persuasion & Trust (Cialdini's *Influence*, ethical form)

These principles describe how to present **true** things compellingly. Each has an honest form (use it) and a manufactured form (forbidden). The single test: **is the signal real?**

| Principle | Use (when real) |
|---|---|
| **Authority** | Accreditations, university/partner affiliations, instructor credentials, press. *Great Learning's strongest lever — university partnerships are the authority signal.* |
| **Social proof** | Real testimonials (name/photo), enrollment counts, ratings, "most popular" — placed near CTAs. |
| **Scarcity / Urgency** | **Real cohort start dates, application deadlines, genuinely limited seats, time-bound pricing that actually ends.** Urgency is permitted and encouraged where the constraint is true — express it boldly. |
| **Commitment & consistency** | Free/low-friction first step (free lesson, trial), small first yes before the big ask. `[goal-gradient]` |
| **Reciprocity** | Give value first — a useful guide or sample lesson before asking for signup. |
| **Liking** | Warm human voice, relatable faces and imagery, shared-values framing. |
| **Unity** | Belonging language — "join learners like you", community framing. |

**Forbidden — fabricated urgency/proof (dark patterns):** countdown timers that reset on refresh, "only 3 seats left" untied to real inventory, a discount "ending today" that ends every day, fake "N people viewing now" counters, invented reviews/counts, "free" that hides a charge. Real urgency = express it as strongly as you like; if it isn't true, don't invent it. Trust is the conversion metric that compounds.

### 7.8 Measurement hooks

Give CTAs and key bands stable IDs/data attributes so analytics and A/B testing can attach — it's how "better conversion" gets verified rather than assumed. (Implementation/tagging is a build concern; just don't generate markup that makes elements impossible to target.)

---

## 8. Content Design — Great Learning voice & rules

> Content design ships **with** this system. Every label, button, dialog, error, empty state, notification, heading and body string in glds-web follows the Great Learning content rules below. These rules are identical across Magna, Jedi and GLDS-Web — only which sections apply differs.

**Applies to glds-web** (marketing site & landing pages): All of Sections **A–H** apply. Section **J (SEO & keyword density) is MANDATORY** for program, course, and landing pages. Section **I (Olympus) does not apply** — GLDS-Web is public marketing.

If a string can't satisfy both these rules and the design rules above, flag the conflict — don't silently pick one. Default to UK English unless the surface is region-specific. Full reviewer skill: `skills/glds-web-design-system/SKILL.md`.

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

## 9. AI Engagement Protocol (lightweight)

For an AI coding agent producing Rails views / HTML / CSS / jQuery against this system.

1. **Match the Components page exactly.** Use the defined variant axes and state names; don't invent variants, rename them, or add colors outside the foundations. If a needed variant isn't defined, ask.
2. **Tokens & type by name.** Reference the foundation colors and Web type styles by their role (Primary 500, Secondary Text, Web Headline 2…); emit the hex only into the central stylesheet/variables, never scattered inline.
3. **Use the right element.** Semantic HTML: `<button>` for actions, `<a>` for navigation, `<label>` for fields, Material Icons for icons. Linkbutton = styled `<button>`.
4. **Always include interaction states.** Any interactive element ships hover/focus-visible/active/disabled — generating only the resting state is incomplete work.
5. **Build to the band model** (§7): one headline / one supporting line / one CTA per band; hero answers what-is-this/what-do-I-get/what-do-I-do above the fold.
6. **Persuasion signals must reflect real facts** (§7.7). Use urgency for true deadlines; never fabricate scarcity, proof, or counters.
7. **Coverage report (≤ 4 lines)** after each component/section:
   `Covered:` states & variants built · `Assumed:` any inference · `Not covered:` out of scope · `Deviations:` off-system instructions followed (omit if none).
8. **Reuse before create**; match existing partials/conventions over inventing new patterns. Deviation on explicit request → comply and note under Deviations, never silently.

---

## 10. Anti-patterns (never generate)


1. ❌ Hex values scattered in markup — centralize as CSS variables / Sass tokens by role.
2. ❌ Non-Poppins fonts for new work (Noto Sans is legacy-only); no other icon set than Material Icons.
3. ❌ Feedback 500 colors (`#FF3333`/`#FFBF00`/`#22BB33`) as message text — use grey 800; 500 is icon/border only.
4. ❌ Pure black `#000` for body copy — use Primary Text `#323130`.
5. ❌ `<a>` with a JS click handler for an action — use a linkbutton (`<button>`); `<button>` for navigation — use `<a href>`.
6. ❌ `outline: none` on focus without a visible replacement ring.
7. ❌ Two filled primary buttons competing in one section.
8. ❌ Inventing button/tag/input variants beyond the defined axes.
9. ❌ Icon-only control without an `aria-label`.
10. ❌ Inputs without associated `<label>`; errors shown by color alone.
11. ❌ Disabled states via whole-element `opacity`.
12. ❌ Dividers/borders where alternating surface bands (`#FFFFFF`/`#F8F8F8`) would separate sections.
13. ❌ Skipped heading levels / multiple `<h1>` per page.
14. ❌ Course-card foreground used without its paired background (contrast breaks).
15. ❌ Hero where the value proposition or CTA sits below the fold; or essential content hidden behind hover (dead on touch).
16. ❌ Multiple competing focal points / animations in one band or viewport.
17. ❌ Freedom Blue used as a decorative accent — it's reserved for CTAs.
18. ❌ Auto-advancing carousels, looping background motion, scroll-hijacking parallax; reveals slower than ~400ms.
19. ❌ Fabricated urgency/proof — reset-on-refresh timers, fake seat counts, perpetual "ends today", fake viewer counters, invented reviews.
20. ❌ Vague CTA labels ("Submit", "Click here") instead of action-and-value labels.
21. ❌ Hardcoding breakpoint numbers per component instead of the shared `$breakpoint-md` (768) / `$breakpoint-lg` (1024) variables.
