# @gl/ai-jedi

AI assets for the **Jedi** design system (`@gl/jedi`, built on MUI v6 with the Jedi theme).

## Install

```bash
npm install @gl/ai-jedi
# or
yarn add @gl/ai-jedi
```

## Contents

| Folder | Description |
|---|---|
| `skills/jedi-design-system/` | Claude/Cursor/Copilot skill with the canonical Jedi rules: import from `@gl/jedi` (never `@mui/material` directly), wrap regions in `<JediProvider>`, use `jediTheme` tokens, prefer `<ScopedCssBaseline>` over global `<CssBaseline />`. |
| `guidelines/*.mdx` | Long-form MDX guidance — color, typography, spacing, accessibility, usage. |
| `components/*.json` | One file per Jedi component. Schema in `ai/_schema/component.schema.json`. |
| `tokens/tokens.json` | Snapshot of `jediTheme` palette, typography, shape, and spacing generated from `packages/jedi/src/theme/`. Regenerated via `yarn ai:tokens:jedi`. |

## Loading the skill

**Claude (project settings or `.claude/skills/`)**: copy or symlink the folder.

**Cursor / VS Code Copilot**: paste `skills/jedi-design-system/SKILL.md` into custom instructions.

## Source of record

The Jedi design system itself lives in `@gl/jedi`. This package only distributes AI-facing assets; it does **not** install any runtime code.
