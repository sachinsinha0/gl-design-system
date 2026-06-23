# @gl/ai-magna

AI assets for the **Magna** design system (`@gl/elements`, Tamagui, Material 3 role tokens).

## Install

```bash
npm install @gl/ai-magna
# or
yarn add @gl/ai-magna
```

## Contents

| Folder | Description |
|---|---|
| `skills/magna-design-system/` | Claude/Cursor/Copilot skill with the canonical Magna rules: role tokens, typography variants, Lucide icons, never raw `react-native` primitives. |
| `guidelines/*.mdx` | Long-form MDX guidance — color, typography, spacing, accessibility, usage. |
| `components/*.json` | One file per Magna component. Schema in `ai/_schema/component.schema.json`. |
| `tokens/tokens.json` | Snapshot of role tokens, palette per theme, type scale, and spacing scale generated from `packages/elements/src/theme/`. Regenerated via `yarn ai:tokens:magna`. |

## Loading the skill

**Claude (project settings or `.claude/skills/`)**: copy or symlink the folder.

**Cursor / VS Code Copilot**: paste `skills/magna-design-system/SKILL.md` into custom instructions.

## Source of record

The Magna design system itself lives in `@gl/elements`. This package only distributes AI-facing assets; it does **not** install any runtime code.
