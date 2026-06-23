---
name: jedi-design-system
description: Use when building, styling, or reviewing any UI built on @gl/jedi (MUI v6 + Jedi tokens). Triggers on picking colors, typography, spacing, components, or component states for Jedi.
---

# Jedi Design System

> TODO (Phase 10): Author full rules. This is a placeholder.

## Core rules (draft)

- Always import components from `@gl/jedi`, never from `@mui/material` directly in app code. The Jedi re-exports apply project defaults.
- Use `jediTheme` tokens (palette, typography, shape) — never hard-code hex values.
- Wrap any Jedi UI region in `<JediProvider>`. Do NOT enable MUI's global `<CssBaseline />` — Jedi uses `<ScopedCssBaseline>` to avoid leaking styles into Magna or GLDS-Web pages.

See [reference.md](./reference.md) for the full token table.
