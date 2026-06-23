# @gl/elements

Magna design system runtime — Great Learning's learner-facing UI built on **Tamagui** + **React-Native-Web**, with Material 3 role tokens (`$color.primary`, `$color.onSurface`, …) and the GL palette.

## Install

```bash
yarn add @gl/elements react react-dom react-native-web tamagui
# or
npm install @gl/elements react react-dom react-native-web tamagui
```

`react`, `react-dom`, `react-native-web`, and `tamagui` are peer dependencies.

## Quick start

```tsx
import { Provider as GLProvider, Button, Text } from '@gl/elements';

export function App() {
  return (
    <GLProvider>
      <Text variant="titleLarge">Hello, learner</Text>
      <Button onPress={() => console.log('go')}>Get started</Button>
    </GLProvider>
  );
}
```

Wrap your tree in `Provider` once at the root; it loads Tamagui, the GL theme, fonts, and the safe-area context.

## What's inside

- `components/` — Buttons, inputs, chips, tabs, dialogs, sheets, navigation, feedback, data display.
- `theme/` — Tamagui config + M3 role tokens for every GL color theme × light/dark.
- `hooks/` — `useToggle`, `useDebouncedValue`, and other shared hooks.
- `icons/` — Custom GL SVG icons (use `@tamagui/lucide-icons` for everything else).
- `css/` — CSS resets and font face declarations.

## AI guidance

For Claude/Cursor/Copilot, install **[`@gl/ai-magna`](../../ai/magna)** — it ships the Magna skill, component definitions, MDX guidelines, and a token snapshot.

## License

Internal — Great Learning.
