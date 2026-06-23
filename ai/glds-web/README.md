# @gl/ai-glds-web

AI assets for the **GLDS-Web** design system (`@gl/glds-web`, a framework-agnostic HTML + CSS recipe library).

## Install

```bash
npm install @gl/ai-glds-web
# or
yarn add @gl/ai-glds-web
```

## Contents

| Folder | Description |
|---|---|
| `skills/glds-web-design-system/` | Claude/Cursor/Copilot skill with the canonical GLDS-Web rules: wrap regions in `[data-ds="glds-web"]` (via `GLDSProvider`), copy markup from shipped recipes, use CSS custom properties (`var(--glds-color-*)`, `var(--glds-space-*)`), never hard-code hex or px, never introduce a JS framework dependency. |
| `guidelines/*.mdx` | Long-form MDX guidance — color, typography, spacing, accessibility, recipe composition. |
| `components/*.json` | One file per GLDS-Web recipe. Schema in `ai/_schema/component.schema.json`. |
| `tokens/tokens.json` | Snapshot of the GLDS-Web CSS custom properties (color, type, space, radius) generated from `packages/glds-web/src/tokens/tokens.json`. Regenerated via `yarn ai:tokens:glds-web`. |

## Loading the skill

**Claude (project settings or `.claude/skills/`)**: copy or symlink the folder.

**Cursor / VS Code Copilot**: paste `skills/glds-web-design-system/SKILL.md` into custom instructions.

## Source of record

The GLDS-Web design system itself lives in `@gl/glds-web`. This package only distributes AI-facing assets; it does **not** install any runtime code.
