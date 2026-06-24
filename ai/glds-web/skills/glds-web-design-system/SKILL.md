---
name: glds-web-design-system
description: >
  Use when building, editing, or reviewing any UI for GLDS-Web — Great Learning's marketing site & landing pages,
  built on Rails + HTML / CSS / jQuery (package @gl/glds-web). Bundles GLDS-Web's design rules and Great Learning's content
  rules (voice, casing, punctuation, component copy, error/empty states, SEO). Trigger before
  generating any GLDS-Web screen, component, or user-facing string, and before writing or reviewing GLDS-Web copy.
---

# GLDS-Web Design System — AI Skill

GLDS-Web is Great Learning's design system for the **marketing site & landing pages**.
Stack: **Rails + HTML / CSS / jQuery** · Package: `@gl/glds-web`.

Generated UI is correct only when it satisfies **both** the design rules and the content rules below.

## Part 1 — GLDS-Web design rules (summary)

Semantic tokens via CSS custom props (var(--glds-color-*)) · Poppins · Freedom Blue reserved for CTAs · one filled CTA per band · honest persuasion (real urgency only, no fake countdowns).

For the full spec — color system, type scale, component contracts, accessibility, interaction/behavioral rules, theme wiring, and the "never generate" anti-patterns list — load:
- Full spec: `glds-web-design-system.md`
- Lean paste-in version: `glds-web-design-system.context.md`

Follow the AI Engagement Protocol in that spec: enumerate states first, ask vs assume vs build, reuse before create, end with a ≤5-line coverage report, flag deviations rather than refuse.

## Part 2 — Great Learning content rules

Every user-facing string in GLDS-Web follows these rules. They are identical across Magna, Jedi and GLDS-Web — only which sections apply differs.

**Applies to GLDS-Web:** All of Sections A–H apply. Section J (SEO & keyword density) is MANDATORY on program/course/landing pages. Section I (Olympus) does NOT apply.

Default to UK English unless the surface is region-specific.

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
