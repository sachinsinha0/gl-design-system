---
name: glds-web-design-system
description: Use when building, styling, or reviewing any UI built on @gl/glds-web (HTML + CSS recipes). Triggers on picking colors, typography, spacing, or composing a recipe for the GLDS-Web design system.
---

# GLDS-Web Design System

> TODO (Phase 10): Author full rules. This is a placeholder.

## Core rules (draft)

- Every GLDS-Web region must be wrapped in a `[data-ds="glds-web"]` container so the scoped CSS variables apply. The `GLDSProvider` component from `@gl/glds-web` does this for you.
- Use the recipes shipped under `@gl/glds-web/recipes/<component>/`. Copy the HTML and reference the CSS — do NOT inline styles.
- Use the CSS custom properties (`var(--glds-color-primary)`, `var(--glds-space-4)`, etc.) — never hard-code hex or px values.
- Do NOT introduce a JavaScript framework dependency. GLDS-Web is framework-agnostic.

See [reference.md](./reference.md) for the full token table.
