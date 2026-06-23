# @gl/jedi

Jedi design system runtime — Great Learning's UI library for **internal tools, admin consoles, and partner dashboards**. Built on **MUI v6** with the Jedi theme, Inter typography, and accessible defaults.

## Install

```bash
yarn add @gl/jedi @mui/material @emotion/react @emotion/styled react react-dom
# or
npm install @gl/jedi @mui/material @emotion/react @emotion/styled react react-dom
```

`@mui/material`, `@emotion/react`, `@emotion/styled`, `react`, and `react-dom` are peer dependencies.

## Quick start

```tsx
import { JediProvider, Button, getColors } from '@gl/jedi';

export function App() {
  return (
    <JediProvider mode="light">
      <Button variant="contained">Save</Button>
    </JediProvider>
  );
}

// Pull colors out of the theme — never hard-code hex
const colors = getColors('light');
```

`JediProvider` injects `jediTheme`, scoped CSS baseline, and the Inter font. Mount it once per app or per region.

## What's inside

- `provider.tsx` — `<JediProvider>` (theme + scoped baseline + fonts).
- `theme/` — `jediTheme`, `getColors(mode)`, typography, shape, spacing.
- `components/` — Re-exports of MUI primitives configured with Jedi defaults (never import from `@mui/material` directly in app code).

## AI guidance

For Claude/Cursor/Copilot, install **[`@gl/ai-jedi`](../../ai/jedi)** — it ships the Jedi skill, component definitions, MDX guidelines, and a token snapshot.

## License

Internal — Great Learning.
