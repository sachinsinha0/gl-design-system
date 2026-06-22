# GL Design Repository Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, web-only Vite app that vendors the `@gl/elements` Tamagui design system from `gl-app-native` and presents it as a browsable component catalog + screen-prototyping playground.

**Architecture:** A single React 19 + Vite SPA. The design system is vendored verbatim into `src/design-system/` (exposed via the `@gl/elements` path alias). A `catalog` registry drives both the sidebar and the routes. Pages live under `src/pages/{foundations,components,prototypes}`. All data is mocked; no Redux/RTK/navigation/backend.

**Tech Stack:** Vite, React 19, TypeScript 5.8, react-native-web 0.20, Tamagui 1.126.4 (runtime mode via `@tamagui/vite-plugin` with extraction disabled), react-router-dom 6, Vitest + Testing Library.

**Source of record:** `../gl-app-native` — design system at `packages/elements/src`, showcase at `packages/app/src/screens/elements-screen/elements-screen.tsx`. Spec: `docs/superpowers/specs/2026-06-22-design-repository-design.md`.

**Conventions (from gl-app-native CLAUDE.md):** kebab-case files, PascalCase named-export components (no default exports, no `React.FC`), `<ComponentName>Props` types, `use`-prefixed hooks, Tamagui token props (no hardcoded pixels), `gap` for spacing.

---

## File Structure

```
gl-app-native-design/
├── index.html                       # Vite entry HTML; loads icon-font CSS
├── package.json                     # deps + scripts
├── vite.config.ts                   # tamagui plugin (extraction off) + aliases + extensions
├── tsconfig.json                    # path alias @gl/elements → src/design-system
├── vitest.config.ts                 # jsdom + setup
├── vitest.setup.ts                  # RTL matchers + jsdom shims
├── README.md
├── src/
│   ├── main.tsx                     # mounts <App/>; imports reset.css + icon fonts
│   ├── App.tsx                      # <Provider> + <RouterProvider>
│   ├── design-system/               # VENDORED copy of packages/elements/src/**
│   ├── shims/
│   │   └── react-native-edge-to-edge.ts
│   ├── test/
│   │   └── render.tsx               # renderWithProvider() test helper
│   ├── mocks/
│   │   ├── i18n.ts                  # t() stub + useTranslation stub
│   │   ├── use-toggle.ts            # useToggle hook
│   │   └── data.ts                  # avatar URLs, sample lists, etc.
│   ├── showcase-kit/
│   │   ├── demo-block.tsx           # titled section wrapper
│   │   ├── variant-grid.tsx         # labelled grid of variants
│   │   ├── swatch.tsx               # color swatch
│   │   └── index.ts
│   ├── shell/
│   │   ├── app-shell.tsx            # sidebar + topbar + <Outlet/>
│   │   ├── sidebar.tsx              # nav generated from catalog
│   │   ├── top-bar.tsx              # title + theme switcher
│   │   └── theme-switcher.tsx       # colorScheme + GLTheme pickers
│   ├── catalog/
│   │   ├── types.ts                 # CatalogGroup / CatalogEntry types
│   │   └── registry.tsx             # the single source of pages
│   ├── router.tsx                   # builds routes from registry
│   ├── pages/
│   │   ├── foundations/             # colors, typography, spacing, elevation, icons
│   │   ├── components/              # one file per component category
│   │   └── prototypes/              # full-screen mockups
│   └── patterns/                    # composed blocks (card, list-item, app-bar, empty-state)
└── docs/superpowers/...
```

---

## Phase 0 — Project scaffold

### Task 1: Initialize package.json and install dependencies

**Files:**
- Create: `package.json`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "gl-app-native-design",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 2: Install runtime dependencies**

Run:
```bash
cd /Users/sachinsinha/Code/gl-app-native-design
npm install \
  react@19.0.0 react-dom@19.0.0 \
  react-native-web@^0.20.0 \
  react-router-dom@^6.26.0 \
  tamagui@1.126.4 \
  @tamagui/core@1.126.4 @tamagui/shorthands@1.126.4 @tamagui/font-inter@1.126.4 \
  @tamagui/lucide-icons@1.126.4 @tamagui/animations-react-native@1.126.4 \
  @tamagui/react-native-media-driver@1.126.4 @tamagui/portal@1.126.4 \
  react-native-svg@^15.11.2 react-native-safe-area-context@5.4.0 \
  react-native-vector-icons@^9.2.0 @react-native-async-storage/async-storage@^2.1.2 \
  ramda@^0.28.0 react-helmet@^6.1.0 react-portal@^4.2.2 \
  @react-spring/web@^9.4.4 @react-spring/native@^9.4.4 \
  @floating-ui/react@^0.26.0 pascalcase@^2.0.0
```
Expected: installs without peer-dep errors (warnings OK).

- [ ] **Step 3: Install dev dependencies**

Run:
```bash
npm install -D \
  vite@^5.4.0 @vitejs/plugin-react@^4.3.0 @tamagui/vite-plugin@1.126.4 \
  typescript@~5.8.3 @types/react@^19.0.0 @types/react-dom@^19.0.0 \
  @types/react-native@^0.73.0 @types/ramda@^0.28.0 @types/react-helmet@^6.1.0 \
  vitest@^2.1.0 jsdom@^25.0.0 \
  @testing-library/react@^16.0.0 @testing-library/jest-dom@^6.5.0 \
  @testing-library/user-event@^14.5.0
```
Expected: installs cleanly.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json && git commit -m "chore: scaffold package.json and install dependencies"
```

---

### Task 2: TypeScript config with path alias

**Files:**
- Create: `tsconfig.json`

- [ ] **Step 1: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@gl/elements": ["./src/design-system/index.ts"],
      "@gl/elements/icons": ["./src/design-system/icons/index.ts"],
      "react-native": ["./node_modules/react-native-web"]
    }
  },
  "include": ["src", "vite.config.ts", "vitest.config.ts", "vitest.setup.ts"]
}
```

- [ ] **Step 2: Commit**

```bash
git add tsconfig.json && git commit -m "chore: add tsconfig with @gl/elements alias"
```

---

### Task 3: Vite config (Tamagui runtime mode + RNW interop)

**Files:**
- Create: `vite.config.ts`

> **Why this shape:** `@tamagui/vite-plugin` with `disableExtraction: true` keeps us in **runtime mode** (no style compiler) while still handling the hard parts: aliasing `react-native` → `react-native-web`, transforming JSX/Flow shipped untranspiled in RN `node_modules` `.js` files, and injecting `__DEV__` / `process.env.TAMAGUI_TARGET`. The explicit `resolve.extensions` (no `.native.*`/`.ios.*`) implements spec §6.1 #2.

- [ ] **Step 1: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tamaguiPlugin } from '@tamagui/vite-plugin';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: 'src/design-system/theme/tamagui.config.ts',
      components: ['@gl/elements'],
      disableExtraction: true // runtime mode — no build-time style extraction
    })
  ],
  define: {
    // RN/Tamagui read these at runtime; Vite must define them for the browser.
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env.TAMAGUI_TARGET': JSON.stringify('web')
  },
  resolve: {
    alias: {
      '@gl/elements': path.resolve(__dirname, 'src/design-system'),
      'react-native': 'react-native-web',
      // spec §6.1 #3: unconditional native import in status-bar.tsx
      'react-native-edge-to-edge': path.resolve(__dirname, 'src/shims/react-native-edge-to-edge.ts')
    },
    // spec §6.1 #2: web/base variants win; never pick .native.*/.ios.*
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.json', '.mjs']
  },
  optimizeDeps: {
    esbuildOptions: {
      // RN libs ship JSX inside .js files
      loader: { '.js': 'jsx' },
      resolveExtensions: ['.web.js', '.js', '.ts', '.tsx', '.jsx', '.json']
    }
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.ts && git commit -m "chore: add Vite config with Tamagui runtime mode + RNW interop"
```

---

### Task 4: Edge-to-edge shim, index.html, main.tsx

**Files:**
- Create: `src/shims/react-native-edge-to-edge.ts`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: Create the edge-to-edge shim**

`src/shims/react-native-edge-to-edge.ts`:
```ts
// Web stub for the native-only react-native-edge-to-edge module.
// status-bar.tsx imports SystemBars unconditionally but only uses it on native.
import type { ReactNode } from 'react';

export function SystemBars(_props: { style?: unknown }): ReactNode {
  return null;
}

export default { SystemBars };
```

- [ ] **Step 2: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GL Design Repository</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `src/main.tsx`** (loads icon fonts via JS import per spec §6.1 #5; the vendored reset.css comes in Task 7)

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
// Material icon fonts for react-native-vector-icons on web (spec §6.1 #5)
import 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

> Note: `App` is created in Task 9 (smoke) and finalized in Task 16. Until then `npm run dev` will error on the missing import — expected.

- [ ] **Step 4: Commit**

```bash
git add src/shims index.html src/main.tsx && git commit -m "chore: add edge-to-edge shim, index.html, main entry"
```

---

### Task 5: Vitest setup

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      server: { deps: { inline: [/react-native/, /@gl\/elements/, /tamagui/, /@tamagui/] } }
    }
  })
);
```

- [ ] **Step 2: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia, used by react-native-web's media driver.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }) as unknown as MediaQueryList;
}
```

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts vitest.setup.ts && git commit -m "chore: add Vitest config + jsdom setup"
```

---

## Phase 1 — Vendor design system + first render (validation gate)

### Task 6: Vendor the design system source

**Files:**
- Create: `src/design-system/**` (copy of `../gl-app-native/packages/elements/src/**`)

- [ ] **Step 1: Copy the source tree**

Run:
```bash
cd /Users/sachinsinha/Code/gl-app-native-design
mkdir -p src/design-system
cp -R ../gl-app-native/packages/elements/src/. src/design-system/
```

- [ ] **Step 2: Verify the copy landed**

Run: `ls src/design-system && ls src/design-system/components | head`
Expected: shows `components theme hooks icons css utils libs types index.ts` and component files (`button.tsx`, `typography.tsx`, …).

- [ ] **Step 3: Commit**

```bash
git add src/design-system && git commit -m "feat: vendor @gl/elements design system source"
```

---

### Task 7: Fix Provider first-paint (spec §6.1 #1)

**Files:**
- Modify: `src/design-system/components/theme-provider.tsx`
- Test: `src/design-system/components/theme-provider.test.tsx`

> **Problem:** `provider.tsx` renders `TamaguiProvider` only when `theme && colorScheme` are non-null, and `theme-provider.tsx` sets them inside an async `useEffect`. On web with empty storage, first paint is blank until the async resolves. **Fix:** seed both from `localStorage` synchronously in the `useState` initializer, defaulting to `'blue'` / `'light'`.

- [ ] **Step 1: Read the current file**

Run: `sed -n '1,120p' src/design-system/components/theme-provider.tsx`
Note the `useState<GLTheme | null>(null)` and `useState<ColorScheme | null>()` initializers and the storage keys `@elements-theme` / `@elements-color-scheme`.

- [ ] **Step 2: Write the failing test**

`src/design-system/components/theme-provider.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { Provider } from './provider';
import { Typography } from './typography';

test('renders children synchronously on first paint with empty storage', () => {
  localStorage.clear();
  render(
    <Provider>
      <Typography variant="body1">hello-design-system</Typography>
    </Provider>
  );
  // No async wait: children must be present immediately.
  expect(screen.getByText('hello-design-system')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- theme-provider`
Expected: FAIL — text not found (children gated behind async theme load).

- [ ] **Step 4: Apply the synchronous-default fix**

In `theme-provider.tsx`, replace the two state initializers so they read storage synchronously:

```tsx
const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const v = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return (v as unknown as T) || fallback;
  } catch {
    return fallback;
  }
};

const [theme, setTheme] = useState<GLTheme | null>(() =>
  readStored<GLTheme>(ThemeStorageKey, 'blue')
);
const [colorScheme, setColorScheme] = useState<ColorScheme | null>(() =>
  readStored<ColorScheme>(ColorSchemeStorageKey, 'light')
);
```

Then ensure the existing `useEffect` that calls `onChangeTheme`/`onChangeColorScheme` still fires on mount so the parent `Provider`'s state syncs (it reads from the callbacks). If the effect only ran after async load, change it to invoke the callbacks with the current synchronous values on mount:

```tsx
useEffect(() => {
  if (theme) onChangeTheme(theme);
  if (colorScheme) onChangeColorScheme(colorScheme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- theme-provider`
Expected: PASS.

> If this test surfaces RNW/Vitest transform errors instead of the assertion, that is the toolchain validation working — fix the config (Task 3/5) until the test runs, then assert.

- [ ] **Step 6: Commit**

```bash
git add src/design-system/components/theme-provider.tsx src/design-system/components/theme-provider.test.tsx
git commit -m "fix: render design-system Provider synchronously on first paint"
```

---

### Task 8: Test render helper

**Files:**
- Create: `src/test/render.tsx`

- [ ] **Step 1: Create the helper**

```tsx
import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from '@gl/elements';

export function renderWithProvider(ui: ReactElement) {
  const wrapper = ({ children }: { children: ReactNode }) => <Provider>{children}</Provider>;
  return render(ui, { wrapper });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/test/render.tsx && git commit -m "test: add renderWithProvider helper"
```

---

### Task 9: Smoke test — render one Button (THE validation gate)

**Files:**
- Create: `src/App.tsx` (temporary smoke version)
- Test: `src/smoke.test.tsx`

> This task proves the entire toolchain (Vite + RNW + Tamagui runtime + vendored Provider + fonts) actually renders. Do not proceed to Phase 2 until both the test and `npm run dev` show a styled button.

- [ ] **Step 1: Create a temporary `src/App.tsx`**

```tsx
import { Provider, Button, Typography, YStack } from '@gl/elements';
import { Home } from '@tamagui/lucide-icons';

export function App() {
  return (
    <Provider>
      <YStack gap="$3" padding="$4">
        <Typography variant="h3">GL Design Repository</Typography>
        <Button variant="contained" startIcon={Home}>It renders</Button>
      </YStack>
    </Provider>
  );
}
```

- [ ] **Step 2: Write the smoke test**

`src/smoke.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import { renderWithProvider } from './test/render';
import { Button } from '@gl/elements';
import { Home } from '@tamagui/lucide-icons';

test('a design-system Button renders with its label', () => {
  renderWithProvider(<Button variant="contained" startIcon={Home}>It renders</Button>);
  expect(screen.getByText('It renders')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the smoke test**

Run: `npm test -- smoke`
Expected: PASS.

- [ ] **Step 4: Run the dev server and verify visually**

Run: `npm run dev` (then open the printed localhost URL)
Expected: a styled heading + contained button with a home icon. Kill the server after confirming.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/smoke.test.tsx && git commit -m "test: toolchain smoke test renders a design-system Button"
```

---

## Phase 2 — App shell, mocks, showcase kit

### Task 10: Mocks (i18n stub, useToggle, sample data)

**Files:**
- Create: `src/mocks/i18n.ts`, `src/mocks/use-toggle.ts`, `src/mocks/data.ts`

- [ ] **Step 1: Create `src/mocks/i18n.ts`**

```ts
import { useMemo } from 'react';

// Trivial i18n stub: returns the key (or a provided default) — spec §11.
export function t(key: string, opts?: { defaultValue?: string }): string {
  return opts?.defaultValue ?? key;
}

export function useTranslation() {
  return useMemo(() => ({ t, i18n: { language: 'en', changeLanguage: async () => undefined } }), []);
}
```

- [ ] **Step 2: Create `src/mocks/use-toggle.ts`**

```ts
import { useCallback, useState } from 'react';

export function useToggle(initial = false): [boolean, () => void, (v: boolean) => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
}
```

- [ ] **Step 3: Create `src/mocks/data.ts`**

```ts
export const AVATAR_URL = 'https://i.pravatar.cc/120?img=12';
export const AVATAR_URL_2 = 'https://i.pravatar.cc/120?img=32';
export const SAMPLE_IMAGE = 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?w=640';

export const PEOPLE = [
  { id: '1', name: 'Aanya Sharma', role: 'Mentor', avatar: AVATAR_URL },
  { id: '2', name: 'Rohan Mehta', role: 'Learner', avatar: AVATAR_URL_2 },
  { id: '3', name: 'Priya Nair', role: 'Learner', avatar: undefined }
];

export const SELECT_OPTIONS = [
  { label: 'Data Science', value: 'ds' },
  { label: 'Machine Learning', value: 'ml' },
  { label: 'Cloud Computing', value: 'cloud' },
  { label: 'Cybersecurity', value: 'sec' }
];
```

- [ ] **Step 4: Commit**

```bash
git add src/mocks && git commit -m "feat: add i18n stub, useToggle, and sample mock data"
```

---

### Task 11: Showcase kit (DemoBlock, VariantGrid, Swatch)

**Files:**
- Create: `src/showcase-kit/demo-block.tsx`, `variant-grid.tsx`, `swatch.tsx`, `index.ts`
- Test: `src/showcase-kit/demo-block.test.tsx`

- [ ] **Step 1: Create `src/showcase-kit/demo-block.tsx`**

```tsx
import type { ReactNode } from 'react';
import { YStack, XStack, Typography, Separator } from '@gl/elements';

export type DemoBlockProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DemoBlock({ title, description, children }: DemoBlockProps) {
  return (
    <YStack gap="$2" paddingVertical="$3">
      <YStack gap="$1">
        <Typography variant="h4">{title}</Typography>
        {description ? (
          <Typography variant="body2" color="$onSurfaceVariant">
            {description}
          </Typography>
        ) : null}
      </YStack>
      <Separator />
      <XStack gap="$3" flexWrap="wrap" alignItems="center" paddingTop="$2">
        {children}
      </XStack>
    </YStack>
  );
}
```

- [ ] **Step 2: Create `src/showcase-kit/variant-grid.tsx`**

```tsx
import type { ReactNode } from 'react';
import { YStack, Typography } from '@gl/elements';

export type VariantCellProps = { label: string; children: ReactNode };

export function VariantCell({ label, children }: VariantCellProps) {
  return (
    <YStack gap="$1" alignItems="flex-start" minWidth={140}>
      <Typography variant="caption1" color="$onSurfaceVariant">
        {label}
      </Typography>
      {children}
    </YStack>
  );
}
```

- [ ] **Step 3: Create `src/showcase-kit/swatch.tsx`**

```tsx
import { YStack, XStack, Typography, useTheme } from '@gl/elements';

export type SwatchProps = { token: string };

export function Swatch({ token }: SwatchProps) {
  const theme = useTheme();
  const value = (theme as Record<string, { get?: () => string } | undefined>)[token];
  const color = value?.get?.() ?? `$${token}`;
  return (
    <YStack gap="$0.5" minWidth={120}>
      <XStack
        height={48}
        borderRadius="$2"
        borderWidth={1}
        borderColor="$outlineVariant"
        backgroundColor={`$${token}` as never}
      />
      <Typography variant="caption2">{token}</Typography>
      <Typography variant="caption2" color="$onSurfaceVariant">
        {String(color)}
      </Typography>
    </YStack>
  );
}
```

- [ ] **Step 4: Create `src/showcase-kit/index.ts`**

```ts
export { DemoBlock } from './demo-block';
export type { DemoBlockProps } from './demo-block';
export { VariantCell } from './variant-grid';
export type { VariantCellProps } from './variant-grid';
export { Swatch } from './swatch';
export type { SwatchProps } from './swatch';
```

- [ ] **Step 5: Write the test**

`src/showcase-kit/demo-block.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../test/render';
import { DemoBlock } from './demo-block';
import { Typography } from '@gl/elements';

test('DemoBlock renders its title and children', () => {
  renderWithProvider(
    <DemoBlock title="Buttons" description="All button variants">
      <Typography variant="body1">child-content</Typography>
    </DemoBlock>
  );
  expect(screen.getByText('Buttons')).toBeInTheDocument();
  expect(screen.getByText('child-content')).toBeInTheDocument();
});
```

- [ ] **Step 6: Run the test**

Run: `npm test -- demo-block`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/showcase-kit && git commit -m "feat: add showcase kit (DemoBlock, VariantCell, Swatch)"
```

---

### Task 12: Catalog registry

**Files:**
- Create: `src/catalog/types.ts`, `src/catalog/registry.tsx`
- Test: `src/catalog/registry.test.ts`

> The registry is the single source that drives both the sidebar and the routes. Adding a page = add one entry + one page file. Pages are added lazily as later tasks create them; entries are uncommented/added as each page lands. This task establishes the structure and the Foundations group skeleton.

- [ ] **Step 1: Create `src/catalog/types.ts`**

```ts
import type { ComponentType } from 'react';

export type CatalogEntry = {
  /** URL slug, unique within the app, e.g. "buttons" */
  slug: string;
  /** Sidebar + page title */
  title: string;
  /** The page component */
  Component: ComponentType;
};

export type CatalogGroup = {
  /** Group id, e.g. "foundations" */
  id: string;
  /** Group label in the sidebar */
  label: string;
  entries: CatalogEntry[];
};
```

- [ ] **Step 2: Create `src/catalog/registry.tsx`** (start with one real Foundations page placeholder so the app boots; later tasks append entries)

```tsx
import type { CatalogGroup } from './types';
import { ColorsPage } from '../pages/foundations/colors-page';

export const catalog: CatalogGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    entries: [{ slug: 'colors', title: 'Colors', Component: ColorsPage }]
  },
  { id: 'components', label: 'Components', entries: [] },
  { id: 'prototypes', label: 'Prototypes', entries: [] }
];

export function allEntries(): CatalogGroup['entries'] {
  return catalog.flatMap((g) => g.entries);
}
```

> `ColorsPage` is created in Task 17. To keep this task independently committable, create a one-line placeholder now and replace it in Task 17:
> `src/pages/foundations/colors-page.tsx`:
> ```tsx
> import { Typography } from '@gl/elements';
> export function ColorsPage() { return <Typography variant="h3">Colors</Typography>; }
> ```

- [ ] **Step 3: Write the test**

`src/catalog/registry.test.ts`:
```ts
import { catalog, allEntries } from './registry';

test('catalog has the three top-level groups', () => {
  expect(catalog.map((g) => g.id)).toEqual(['foundations', 'components', 'prototypes']);
});

test('slugs are unique across all entries', () => {
  const slugs = allEntries().map((e) => e.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});
```

- [ ] **Step 4: Run the test**

Run: `npm test -- registry`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/catalog src/pages/foundations/colors-page.tsx
git commit -m "feat: add catalog registry + Colors placeholder"
```

---

### Task 13: Router from registry

**Files:**
- Create: `src/router.tsx`

- [ ] **Step 1: Create `src/router.tsx`**

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './shell/app-shell';
import { catalog, allEntries } from './catalog/registry';

const firstSlug = allEntries()[0]?.slug ?? 'colors';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to={`/${firstSlug}`} replace /> },
      ...catalog.flatMap((group) =>
        group.entries.map((entry) => ({
          path: entry.slug,
          element: <entry.Component />
        }))
      )
    ]
  }
]);
```

- [ ] **Step 2: Commit**

```bash
git add src/router.tsx && git commit -m "feat: build routes from catalog registry"
```

---

### Task 14: App shell (sidebar + top bar)

**Files:**
- Create: `src/shell/app-shell.tsx`, `src/shell/sidebar.tsx`, `src/shell/top-bar.tsx`
- Test: `src/shell/sidebar.test.tsx`

- [ ] **Step 1: Create `src/shell/sidebar.tsx`**

```tsx
import { Link, useLocation } from 'react-router-dom';
import { YStack, Typography, Separator } from '@gl/elements';
import { catalog } from '../catalog/registry';

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <YStack
      width={260}
      backgroundColor="$surfaceContainerLow"
      borderRightWidth={1}
      borderColor="$outlineVariant"
      padding="$3"
      gap="$3"
    >
      <Typography variant="h4">GL Design</Typography>
      <Separator />
      {catalog.map((group) => (
        <YStack key={group.id} gap="$1">
          <Typography variant="overline" color="$onSurfaceVariant">
            {group.label}
          </Typography>
          {group.entries.map((entry) => {
            const active = pathname === `/${entry.slug}`;
            return (
              <Link
                key={entry.slug}
                to={`/${entry.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="body2"
                  color={active ? '$primary' : '$onSurface'}
                  paddingVertical="$0.5"
                >
                  {entry.title}
                </Typography>
              </Link>
            );
          })}
        </YStack>
      ))}
    </YStack>
  );
}
```

- [ ] **Step 2: Create `src/shell/top-bar.tsx`** (ThemeSwitcher wired in Task 15; placeholder import now)

```tsx
import { XStack, Typography } from '@gl/elements';
import { useLocation } from 'react-router-dom';
import { allEntries } from '../catalog/registry';
import { ThemeSwitcher } from './theme-switcher';

export function TopBar() {
  const { pathname } = useLocation();
  const current = allEntries().find((e) => `/${e.slug}` === pathname);
  return (
    <XStack
      height={64}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$4"
      borderBottomWidth={1}
      borderColor="$outlineVariant"
      backgroundColor="$surface"
    >
      <Typography variant="h4">{current?.title ?? 'GL Design Repository'}</Typography>
      <ThemeSwitcher />
    </XStack>
  );
}
```

- [ ] **Step 3: Create `src/shell/app-shell.tsx`**

```tsx
import { Outlet } from 'react-router-dom';
import { XStack, YStack, ScrollView } from '@gl/elements';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

export function AppShell() {
  return (
    <XStack height="100vh" backgroundColor="$surface">
      <Sidebar />
      <YStack flex={1}>
        <TopBar />
        <ScrollView flex={1} contentContainerStyle={{ padding: 32 }}>
          <Outlet />
        </ScrollView>
      </YStack>
    </XStack>
  );
}
```

- [ ] **Step 4: Write the sidebar test**

`src/shell/sidebar.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../test/render';
import { Sidebar } from './sidebar';

test('sidebar lists the group labels', () => {
  renderWithProvider(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  expect(screen.getByText('Foundations')).toBeInTheDocument();
  expect(screen.getByText('Components')).toBeInTheDocument();
  expect(screen.getByText('Prototypes')).toBeInTheDocument();
});
```

- [ ] **Step 5: Run the test**

Run: `npm test -- sidebar`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/shell && git commit -m "feat: add app shell (sidebar + top bar)"
```

---

### Task 15: Theme switcher (colorScheme + GLTheme)

**Files:**
- Create: `src/shell/theme-switcher.tsx`
- Test: `src/shell/theme-switcher.test.tsx`

> Uses `useThemeSetting()` from `@gl/elements` (returns `{ theme, colorScheme, setTheme, setColorScheme }`). `GLTheme` has 22 values: blue, deeporange, darkteal, gold, eggplant, glapremium, olive, ocean, stormblue, ink, midnight, rust, mint, cyan, deeppurple, green, lightblue, orange, pink, purple, rose, lime.

- [ ] **Step 1: Create `src/shell/theme-switcher.tsx`**

```tsx
import { XStack, Button, useThemeSetting } from '@gl/elements';
import type { GLTheme } from '@gl/elements';

const THEMES: GLTheme[] = [
  'blue', 'deeporange', 'darkteal', 'gold', 'eggplant', 'glapremium', 'olive',
  'ocean', 'stormblue', 'ink', 'midnight', 'rust', 'mint', 'cyan', 'deeppurple',
  'green', 'lightblue', 'orange', 'pink', 'purple', 'rose', 'lime'
];

export function ThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeSetting();
  return (
    <XStack gap="$2" alignItems="center">
      <select
        aria-label="Color theme"
        value={theme ?? 'blue'}
        onChange={(e) => setTheme(e.target.value as GLTheme)}
      >
        {THEMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <Button
        variant="outlined"
        size="sm"
        onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      >
        {colorScheme === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </XStack>
  );
}
```

> Native `<select>` is used deliberately — it's a plain web control for the chrome, keeping the `@gl/elements` `Select` for the catalog demo. This renders fine under react-native-web.

- [ ] **Step 2: Write the test**

`src/shell/theme-switcher.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../test/render';
import { ThemeSwitcher } from './theme-switcher';

test('toggles color scheme label between Dark and Light', async () => {
  const user = userEvent.setup();
  renderWithProvider(<ThemeSwitcher />);
  const toggle = screen.getByRole('button');
  expect(toggle).toHaveTextContent('Dark');
  await user.click(toggle);
  expect(toggle).toHaveTextContent('Light');
});
```

- [ ] **Step 3: Run the test**

Run: `npm test -- theme-switcher`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/shell/theme-switcher.tsx src/shell/theme-switcher.test.tsx
git commit -m "feat: add theme switcher (color scheme + GL theme)"
```

---

### Task 16: Finalize App with Provider + Router

**Files:**
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Replace `src/App.tsx`** (was the Task 9 smoke version)

```tsx
import { RouterProvider } from 'react-router-dom';
import { Provider } from '@gl/elements';
import { router } from './router';

export function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}
```

- [ ] **Step 2: Write the test**

`src/App.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { App } from './App';

test('app boots and redirects to the first page (Colors)', async () => {
  render(<App />);
  expect(await screen.findByText('GL Design')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the test + dev server**

Run: `npm test -- App` → Expected: PASS.
Run: `npm run dev`, open the URL → Expected: sidebar + top bar render, lands on `/colors`. Kill server.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/App.test.tsx && git commit -m "feat: wire App with Provider + RouterProvider"
```

---

## Phase 3 — Foundations pages

> Each foundations page follows the same shape: render live from the vendored tokens/theme, wrap groups in `DemoBlock`, and add the entry to `src/catalog/registry.tsx` under the `foundations` group. Each page gets a render smoke test asserting its heading + one representative item.

### Task 17: Colors foundations page (worked example)

**Files:**
- Modify: `src/pages/foundations/colors-page.tsx` (replace Task 12 placeholder)
- Test: `src/pages/foundations/colors-page.test.tsx`

- [ ] **Step 1: Replace `colors-page.tsx`**

```tsx
import { YStack, XStack, Typography } from '@gl/elements';
import { DemoBlock, Swatch } from '../../showcase-kit';

const SEMANTIC = [
  'surface', 'surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainerHigh',
  'onSurface', 'onSurfaceVariant', 'primary', 'onPrimary', 'primaryContainer',
  'onPrimaryContainer', 'outline', 'outlineVariant'
];

export function ColorsPage() {
  return (
    <YStack gap="$3">
      <Typography variant="body1" color="$onSurfaceVariant">
        Semantic color tokens, rendered live from the active theme. Switch themes from the top bar.
      </Typography>
      <DemoBlock title="Semantic tokens" description="Surfaces, text, brand, and borders">
        <XStack gap="$3" flexWrap="wrap">
          {SEMANTIC.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </XStack>
      </DemoBlock>
    </YStack>
  );
}
```

- [ ] **Step 2: Write the test**

`src/pages/foundations/colors-page.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ColorsPage } from './colors-page';

test('Colors page shows semantic token swatches', () => {
  renderWithProvider(<ColorsPage />);
  expect(screen.getByText('Semantic tokens')).toBeInTheDocument();
  expect(screen.getByText('primary')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the test**

Run: `npm test -- colors-page`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/foundations/colors-page.tsx src/pages/foundations/colors-page.test.tsx
git commit -m "feat: add Colors foundations page"
```

---

### Task 18: Typography foundations page

**Files:**
- Create: `src/pages/foundations/typography-page.tsx`
- Test: `src/pages/foundations/typography-page.test.tsx`
- Modify: `src/catalog/registry.tsx`

Reference: source demo at `elements-screen.tsx:587-821`. Variants to render (each in a `VariantCell` labelled with its name + size): `h1`(26)`,h2`(24)`,h3`(22)`,h4`(20)`,h5`(18)`,subtitle1`(16)`,subtitle2`(14)`,body1`(16)`,body2`(14)`,caption1`(12)`,caption2`(10)`,overline`(10).

- [ ] **Step 1: Create the page**

```tsx
import { YStack } from '@gl/elements';
import { Typography } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const VARIANTS: { name: string; px: number }[] = [
  { name: 'h1', px: 26 }, { name: 'h2', px: 24 }, { name: 'h3', px: 22 },
  { name: 'h4', px: 20 }, { name: 'h5', px: 18 }, { name: 'subtitle1', px: 16 },
  { name: 'subtitle2', px: 14 }, { name: 'body1', px: 16 }, { name: 'body2', px: 14 },
  { name: 'caption1', px: 12 }, { name: 'caption2', px: 10 }, { name: 'overline', px: 10 }
];

export function TypographyPage() {
  return (
    <YStack gap="$3">
      <DemoBlock title="Typography variants" description="The 12 Typography variants">
        {VARIANTS.map((v) => (
          <VariantCell key={v.name} label={`${v.name} · ${v.px}px`}>
            <Typography variant={v.name as never}>The quick brown fox</Typography>
          </VariantCell>
        ))}
      </DemoBlock>
    </YStack>
  );
}
```

- [ ] **Step 2: Write the test** (`typography-page.test.tsx`): render `TypographyPage` with `renderWithProvider`, assert `screen.getByText('Typography variants')` is present and there are 12 `VariantCell` labels (assert `screen.getByText('body1 · 16px')`).

```tsx
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { TypographyPage } from './typography-page';

test('Typography page lists variants', () => {
  renderWithProvider(<TypographyPage />);
  expect(screen.getByText('Typography variants')).toBeInTheDocument();
  expect(screen.getByText('body1 · 16px')).toBeInTheDocument();
});
```

- [ ] **Step 3: Add the registry entry** — in `src/catalog/registry.tsx`, import `TypographyPage` and add `{ slug: 'typography', title: 'Typography', Component: TypographyPage }` to the `foundations` group's `entries`.

- [ ] **Step 4: Run the test** — `npm test -- typography-page` → PASS.

- [ ] **Step 5: Commit** — `git add src/pages/foundations/typography-page.* src/catalog/registry.tsx && git commit -m "feat: add Typography foundations page"`

---

### Task 19: Spacing foundations page

**Files:** Create `src/pages/foundations/spacing-page.tsx` + test; modify `registry.tsx`.

Render the spacing scale from `design-system-rules`: tokens `$0.5`(4) `$1`(8) `$1.5`(12) `$2`(16) `$3`(24) `$4`(32) `$6`(48). For each, a `VariantCell` labelled `"$2 · 16px"` containing a filled bar `<XStack height={16} width={`$${token}`} backgroundColor="$primary" />` (width via token). Wrap in a `DemoBlock title="Spacing scale"`.

- [ ] **Step 1:** Create the page (follow Task 18's structure; map over the token list, render a `$primaryContainer` bar whose width is the token value).
- [ ] **Step 2:** Test asserts `getByText('Spacing scale')` and `getByText('$2 · 16px')`.
- [ ] **Step 3:** Add registry entry `{ slug: 'spacing', title: 'Spacing', Component: SpacingPage }`.
- [ ] **Step 4:** `npm test -- spacing-page` → PASS.
- [ ] **Step 5:** Commit `feat: add Spacing foundations page`.

---

### Task 20: Elevation foundations page

**Files:** Create `src/pages/foundations/elevation-page.tsx` + test; modify `registry.tsx`.

Render the shadow steps. Use `@gl/elements` `Container` with its `shadow` prop (`xs`–`3xl`, per `design-system-rules` "shadow levels xs-3xl"). For each level render a `VariantCell label={level}` containing `<Container shadow={level} padding="$3" backgroundColor="$surfaceContainerLowest" width={120} height={64} />`. Wrap in `DemoBlock title="Elevation"`.

- [ ] **Step 1:** Create the page mapping over `['xs','sm','md','lg','xl','2xl','3xl']`.
- [ ] **Step 2:** Test asserts `getByText('Elevation')` and one level label (`getByText('md')`).
- [ ] **Step 3:** Add registry entry `{ slug: 'elevation', title: 'Elevation', Component: ElevationPage }`.
- [ ] **Step 4:** `npm test -- elevation-page` → PASS.
- [ ] **Step 5:** Commit `feat: add Elevation foundations page`.

> If `Container`'s `shadow` prop names differ from this list, read `src/design-system/components/container.tsx` and use the actual variant keys.

---

### Task 21: Icons foundations page

**Files:** Create `src/pages/foundations/icons-page.tsx` + test; modify `registry.tsx`.

Reference: `elements-screen.tsx:923-932`. Two `DemoBlock`s:
1. **Material icons** — render `@gl/elements` `Icon` with string names: `['home','search','settings','notifications-none','thumb-up','share','more-horiz','check-circle','star','favorite']`, each in a `VariantCell` labelled with the name, `size={24}`.
2. **Lucide icons** — import a handful from `@tamagui/lucide-icons` (`Home, Search, Settings, Heart, Star, Bell`) and render `<Icon icon={<Home />} size={24} />` each in a labelled cell.

- [ ] **Step 1:** Create the page.
- [ ] **Step 2:** Test asserts `getByText('Material icons')` and `getByText('home')`.
- [ ] **Step 3:** Add registry entry `{ slug: 'icons', title: 'Icons', Component: IconsPage }`.
- [ ] **Step 4:** `npm test -- icons-page` → PASS.
- [ ] **Step 5:** Commit `feat: add Icons foundations page`.

---

## Phase 4 — Component catalog

> **Pattern for every component page (follow Task 22 exactly):**
> 1. Create `src/pages/components/<name>-page.tsx`. Open the source section in `../gl-app-native/packages/app/src/screens/elements-screen/elements-screen.tsx` at the line range given. Port the JSX into one or more `DemoBlock`s, importing the components from `@gl/elements`.
> 2. **Strip production deps:** replace `useTranslation()`/`t()` with the stub from `src/mocks/i18n.ts`; replace `env.*`/external URLs with values from `src/mocks/data.ts`; replace `useToggle` with `src/mocks/use-toggle.ts`; delete any Redux/navigation/analytics calls.
> 3. Demo the real `@gl/elements` export (e.g. `Badge`, not the app `Badges` wrapper).
> 4. Write a render smoke test (`renderWithProvider`, assert the page's first `DemoBlock` title).
> 5. Add the entry to the `components` group in `src/catalog/registry.tsx`.
> 6. Run `npm test -- <name>-page` → PASS. Commit.

### Task 22: Buttons & IconButtons page (worked example — full code)

**Files:**
- Create: `src/pages/components/buttons-page.tsx`
- Test: `src/pages/components/buttons-page.test.tsx`
- Modify: `src/catalog/registry.tsx`

Source: `elements-screen.tsx:255-585`. `Button` props: `variant` (`contained`|`outlined`|`tonal`|`text`), `size` (`sm`|`md`|`lg`|`xl`), `startIcon`/`endIcon` (Lucide components), `disabled`. `IconButton` takes a Lucide component via `icon` + `variant`.

- [ ] **Step 1: Create `buttons-page.tsx`**

```tsx
import { YStack, XStack, Button, IconButton } from '@gl/elements';
import { Home, Heart, Settings } from '@tamagui/lucide-icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const VARIANTS = ['contained', 'outlined', 'tonal', 'text'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export function ButtonsPage() {
  return (
    <YStack gap="$3">
      <DemoBlock title="Variants" description="contained · outlined · tonal · text">
        {VARIANTS.map((variant) => (
          <VariantCell key={variant} label={variant}>
            <Button variant={variant} startIcon={Home}>
              Button
            </Button>
          </VariantCell>
        ))}
      </DemoBlock>

      <DemoBlock title="Sizes" description="sm · md · lg · xl">
        {SIZES.map((size) => (
          <VariantCell key={size} label={size}>
            <Button variant="contained" size={size} startIcon={Home}>
              Button
            </Button>
          </VariantCell>
        ))}
      </DemoBlock>

      <DemoBlock title="Icon placement">
        <VariantCell label="startIcon">
          <Button variant="contained" startIcon={Home}>Leading</Button>
        </VariantCell>
        <VariantCell label="endIcon">
          <Button variant="contained" endIcon={Heart}>Trailing</Button>
        </VariantCell>
      </DemoBlock>

      <DemoBlock title="States">
        <VariantCell label="disabled">
          <Button variant="contained" disabled startIcon={Home}>Disabled</Button>
        </VariantCell>
      </DemoBlock>

      <DemoBlock title="IconButtons" description="Lucide-only">
        <XStack gap="$2">
          <IconButton icon={Home} variant="text" />
          <IconButton icon={Heart} variant="tonal" />
          <IconButton icon={Settings} variant="outlined" />
        </XStack>
      </DemoBlock>
    </YStack>
  );
}
```

- [ ] **Step 2: Write the test**

`src/pages/components/buttons-page.test.tsx`:
```tsx
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../test/render';
import { ButtonsPage } from './buttons-page';

test('Buttons page shows variant and size demos', () => {
  renderWithProvider(<ButtonsPage />);
  expect(screen.getByText('Variants')).toBeInTheDocument();
  expect(screen.getByText('Sizes')).toBeInTheDocument();
  expect(screen.getByText('IconButtons')).toBeInTheDocument();
});
```

- [ ] **Step 3: Add registry entry** — import `ButtonsPage`, add `{ slug: 'buttons', title: 'Buttons', Component: ButtonsPage }` to the `components` group.

- [ ] **Step 4: Run the test** — `npm test -- buttons-page` → PASS.

- [ ] **Step 5: Commit** — `git add src/pages/components/buttons-page.* src/catalog/registry.tsx && git commit -m "feat: add Buttons & IconButtons catalog page"`

---

### Task 23: Inputs page (TextField, TextArea)

Source: `elements-screen.tsx:823-921`. Components: `TextField`, `TextArea`. Show: default, with `label`/placeholder, with `helperText`, error state, with `startIcon`/`endIcon`, disabled; and `TextArea` default + with rows. Use local `useState` for controlled values. Follow the Phase-4 pattern. Slug `inputs`, title `Inputs`. Test asserts the first `DemoBlock` title.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 24: Select & MultiSelect page

Build fresh from `@gl/elements` `Select` and `MultiSelect` (source page used the app `Selects` wrapper, so do not port it). Use `SELECT_OPTIONS` from `src/mocks/data.ts`. Show: single `Select` (controlled), `Select` with placeholder/disabled, `MultiSelect` (controlled array). Read `src/design-system/components/select.tsx` and `multi-select.tsx` for the exact prop API before writing. Slug `select`, title `Select & MultiSelect`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 25: Selection controls page (Checkbox, Radio, RadioGroup, Switch)

Sources: Checkbox `968-1042`, RadioGroup `1718-1759`, Radio `1761-1773`, Switch `2279-2292`. One `DemoBlock` per control. Controlled state via `useState`. Show sizes/labels/disabled/error where the component supports them. Slug `selection-controls`, title `Selection controls`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 26: Chips page

Source: `elements-screen.tsx:78-253`. Component `Chip` (variants `filled`/`outlined`, sizes `sm`/`md`, with avatar/icon, removable). Replace any `t()` with the stub; callbacks → `() => {}`. Slug `chips`, title `Chips`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 27: Tabs page

Source: `elements-screen.tsx:1585-1716`. `Tabs` + `Tabs.List` + `Tabs.Tab` (+ `Tabs.Content` if present). Show: full-width, custom width, vertical (as in source). Controlled `value` via `useState`. Slug `tabs`, title `Tabs`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 28: Accordion page

Source: `elements-screen.tsx:1105-1569` (large; port a representative subset: single, multiple-open, with/without icons, nested, disabled). `Accordion` + summary/details subcomponents. Slug `accordion`, title `Accordion`.

- [ ] Steps 1–6 per the Phase-4 pattern. Keep the page to ~6 representative variants — do not port all 20+.

---

### Task 29: Dialogs page (Dialog, AlertDialog, ConfirmDialog)

Source for AlertDialog: `elements-screen.tsx:1848-1896`. `Dialog` and `ConfirmDialog` built fresh from their exports (read `dialog.tsx`, `confirm-dialog.tsx`, `alert-dialog.tsx` for APIs). Each opened by a trigger `Button`; open state via `useState`. Slug `dialogs`, title `Dialogs`.

- [ ] Steps 1–6 per the Phase-4 pattern. Test asserts a trigger button renders (do not assert open content unless the component renders it inline).

---

### Task 30: Sheet & Drawer page (bottom sheets)

Build fresh from `@gl/elements` `Sheet` and `Drawer` (read `sheet.tsx`, `drawer.tsx`). Trigger buttons toggle open state via `useState`; render a sheet with sample content from `src/mocks/data.ts`. Slug `sheet`, title `Sheet & Drawer`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 31: Feedback page (Alert, Tooltip, Badge, Spinner, RadialProgress)

Sources: Alert `1044-1103`, Tooltip `1804-1847`, Spinner `1775-1792`, RadialProgress `1794-1802`. `Badge` built fresh from its export (read `badge.tsx`). One `DemoBlock` per. Alert: 4 severities × variants. Tooltip: a few placements. `useToggle` from mocks where the source used it. Slug `feedback`, title `Feedback`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 32: Data display page (Avatar, Separator, Container/Surface, Breadcrumbs)

Sources: Avatar `2294-2361` (use `AVATAR_URL` from mocks; include initials-fallback pattern from `design-system-rules`), Separator `2363-2373`, Container `934-966`. `Breadcrumbs` built fresh from its export (read `breadcrumbs.tsx`). Slug `data-display`, title `Data display`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 33: Navigation page (App Bar, Bottom Navigation, Footer)

Build fresh from `@gl/elements` `AppBar`, `BottomNavigation`, `Footer` (read `app-bar.tsx`, `bottom-navigation.tsx`, `footer.tsx` for APIs). Render static, non-interactive examples with mock labels/icons. Slug `navigation`, title `Navigation`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

### Task 34: Layout page (Grid)

Source: `../gl-app-native/packages/app/src/screens/elements-screen/grid-screen.tsx`. Port the responsive `Grid` demo; replace `useGridSpacing` with a static spacing value if it pulls app deps (read it first). Show a two-column (`lg={8}` + `lg={4}`) layout and a multi-item grid. Slug `grid`, title `Grid`.

- [ ] Steps 1–6 per the Phase-4 pattern.

---

## Phase 5 — Patterns + prototypes

### Task 35: Pattern blocks

**Files:**
- Create: `src/patterns/info-card.tsx`, `src/patterns/list-item.tsx`, `src/patterns/screen-app-bar.tsx`, `src/patterns/empty-state.tsx`, `src/patterns/index.ts`
- Test: `src/patterns/patterns.test.tsx`

> Reusable composed blocks built only from `@gl/elements`, so prototypes assemble quickly. Each is a named-export component with a typed `Props`.

- [ ] **Step 1: Create `src/patterns/info-card.tsx`**

```tsx
import { Container, YStack, XStack, Typography, Button, Avatar } from '@gl/elements';

export type InfoCardProps = {
  title: string;
  subtitle?: string;
  body?: string;
  avatarUrl?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function InfoCard({ title, subtitle, body, avatarUrl, actionLabel, onAction }: InfoCardProps) {
  return (
    <Container container="lowest" outlined padding="$3" gap="$2" width={320}>
      <XStack gap="$2" alignItems="center">
        {avatarUrl ? (
          <Avatar circular size={40}>
            <Avatar.Image source={{ uri: avatarUrl }} style={{ width: 40, height: 40 }} />
          </Avatar>
        ) : null}
        <YStack>
          <Typography variant="subtitle1">{title}</Typography>
          {subtitle ? (
            <Typography variant="caption1" color="$onSurfaceVariant">
              {subtitle}
            </Typography>
          ) : null}
        </YStack>
      </XStack>
      {body ? <Typography variant="body2">{body}</Typography> : null}
      {actionLabel ? (
        <Button variant="tonal" size="sm" onPress={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Container>
  );
}
```

- [ ] **Step 2: Create `list-item.tsx`** — an `XStack` row: optional leading `Avatar`/`Icon`, a `YStack` of `subtitle2` title + `caption1` meta, optional trailing `Icon`. Props: `{ title: string; meta?: string; avatarUrl?: string; onPress?: () => void }`. Use `pressStyle={{ opacity: 0.8 }}` and `cursor="pointer"` when `onPress` set.

- [ ] **Step 3: Create `screen-app-bar.tsx`** — a top bar `XStack` (height 56, `$surface`, bottom border): optional back `IconButton` (ChevronLeft from lucide), centered `subtitle1` title, optional trailing slot. Props `{ title: string; onBack?: () => void; trailing?: ReactNode }`.

- [ ] **Step 4: Create `empty-state.tsx`** — centered `YStack`: an `Icon`, an `h4` title, a `body2` description, optional `Button`. Props `{ title: string; description?: string; actionLabel?: string; onAction?: () => void }`.

- [ ] **Step 5: Create `src/patterns/index.ts`** exporting all four components + their `Props` types.

- [ ] **Step 6: Write `patterns.test.tsx`** — `renderWithProvider` each pattern with sample props; assert a representative text (e.g. `InfoCard` title) renders.

```tsx
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../test/render';
import { InfoCard } from './info-card';

test('InfoCard renders title and action', () => {
  renderWithProvider(<InfoCard title="Course" subtitle="Mentor" actionLabel="Open" />);
  expect(screen.getByText('Course')).toBeInTheDocument();
  expect(screen.getByText('Open')).toBeInTheDocument();
});
```

- [ ] **Step 7: Run** `npm test -- patterns` → PASS.
- [ ] **Step 8: Commit** `feat: add composable pattern blocks`.

---

### Task 36: Prototypes group + index page

**Files:**
- Create: `src/pages/prototypes/prototypes-index.tsx`
- Modify: `src/catalog/registry.tsx`

- [ ] **Step 1:** Create a `PrototypesIndex` page: a short intro `Typography` explaining the prototyping workflow + a grid of `InfoCard`s linking (via react-router `Link`) to each prototype slug.
- [ ] **Step 2:** Add `{ slug: 'prototypes', title: 'Overview', Component: PrototypesIndex }` to the `prototypes` group.
- [ ] **Step 3:** Test asserts the intro heading renders.
- [ ] **Step 4:** Commit `feat: add prototypes overview page`.

---

### Task 37: Seed prototype — Login screen

**Files:**
- Create: `src/pages/prototypes/login-prototype.tsx`
- Test: `src/pages/prototypes/login-prototype.test.tsx`
- Modify: `src/catalog/registry.tsx`

- [ ] **Step 1:** Build a centered login mockup from `@gl/elements`: a `Container` card with a heading, `TextField` (email), `TextField` (password, `secureTextEntry`), a full-width `contained` `Button` "Sign in", a `text` `Button` "Forgot password?". Local `useState` for fields; `onPress` handlers are `() => {}`. This is a self-contained file — the template AI/designers copy.
- [ ] **Step 2:** Test asserts "Sign in" button renders.
- [ ] **Step 3:** Add `{ slug: 'proto-login', title: 'Login screen', Component: LoginPrototype }` to `prototypes`.
- [ ] **Step 4:** `npm test -- login-prototype` → PASS.
- [ ] **Step 5:** Commit `feat: add login screen prototype`.

---

### Task 38: Seed prototype — Feed/list screen

**Files:** Create `src/pages/prototypes/feed-prototype.tsx` + test; modify `registry.tsx`.

- [ ] **Step 1:** Build a list screen: `ScreenAppBar` (title "Courses"), a `Tabs` row ("All" / "In progress"), and a vertical list of `ListItem`/`InfoCard` from `PEOPLE`/mock course data. Slug `proto-feed`, title `Feed screen`.
- [ ] **Step 2:** Test asserts the app-bar title renders.
- [ ] **Step 3:** Add registry entry.
- [ ] **Step 4:** `npm test -- feed-prototype` → PASS.
- [ ] **Step 5:** Commit `feat: add feed screen prototype`.

---

### Task 39: Seed prototype — Detail screen

**Files:** Create `src/pages/prototypes/detail-prototype.tsx` + test; modify `registry.tsx`.

- [ ] **Step 1:** Build a detail screen: `ScreenAppBar` with back button, a hero `Container`, `h3` title + meta, body `Typography`, a `Chip` row, and a bottom `contained` `Button`. Use `EmptyState` for one section to demonstrate it. Slug `proto-detail`, title `Detail screen`.
- [ ] **Step 2:** Test asserts the title renders.
- [ ] **Step 3:** Add registry entry.
- [ ] **Step 4:** `npm test -- detail-prototype` → PASS.
- [ ] **Step 5:** Commit `feat: add detail screen prototype`.

---

## Phase 6 — Documentation + final verification

### Task 40: README

**Files:**
- Create: `README.md`

- [ ] **Step 1:** Write `README.md` covering:
  - **What this is:** a web-only design/prototyping environment that vendors `@gl/elements`; not for production (link the spec).
  - **Run:** `npm install`, `npm run dev`, `npm test`, `npm run build`.
  - **Structure:** the `src/` tree (foundations / components / prototypes / patterns / design-system).
  - **Add a component page:** create `src/pages/components/<name>-page.tsx` using `DemoBlock`/`VariantCell`, add one entry to `src/catalog/registry.tsx` — done (sidebar + route auto-generated).
  - **Add a prototype:** copy a file from `src/pages/prototypes/`, compose from `@gl/elements` + `src/patterns/`, add a registry entry.
  - **Re-syncing the design system:** `cp -R ../gl-app-native/packages/elements/src/. src/design-system/` then re-apply the §6.1 web fixes (or keep them in a patch).
  - **AI prompting tips:** point at `src/patterns/` and the prototype templates as the building blocks.
- [ ] **Step 2:** Commit `docs: add README with run + extension instructions`.

---

### Task 41: Final verification

- [ ] **Step 1:** Run the full test suite — `npm test` → Expected: all PASS.
- [ ] **Step 2:** Run typecheck — `npm run typecheck` → Expected: no errors. Fix any.
- [ ] **Step 3:** Run a production build — `npm run build` → Expected: succeeds.
- [ ] **Step 4:** Run `npm run dev`, click through every sidebar entry (all foundations, all component pages, all prototypes), toggle dark mode and 3–4 themes. Expected: every page renders, theme switching restyles everything, no console errors. Note any broken pages and fix before final commit.
- [ ] **Step 5:** Commit any fixes — `git commit -m "fix: address issues found in final verification"`.

---

## Self-Review notes (for the implementer)

- **Spec coverage:** Foundations (§9) → Tasks 17–21. Component catalog (§8 list) → Tasks 22–34 (Buttons, Inputs, Select/MultiSelect, Checkbox/Radio/Switch, Chips, Tabs, Accordion, Dialogs, Sheet/Drawer, Feedback incl. Badge/Tooltip/Alert/Spinner/RadialProgress, Data display incl. Avatar/Separator/Container/Breadcrumbs, Navigation incl. AppBar/BottomNavigation/Footer, Grid). Patterns + prototypes (§10) → Tasks 35–39. Vendoring + web fixes (§6/§6.1) → Tasks 6–7 + config Tasks 3–4. Theme switching (§7) → Task 15. Mocking (§11) → Task 10. Non-goals (§12): nothing in the plan adds backend/native. README (§14 phase 7) → Task 40.
- **OMIT list (§11):** Videos, Uploader, StepProgressBar, Pagination, Logout — intentionally have **no task**.
- **Toolchain note:** the spec said "Tamagui runtime mode (no compiler)"; this plan implements that as `@tamagui/vite-plugin` with `disableExtraction: true`, which is runtime rendering plus the RNW/Vite plumbing. Task 9 is the gate that proves it works before any catalog work.
- **Naming consistency:** page components are `<Name>Page` (PascalCase, named export); slugs are kebab-case and unique (Task 12 test enforces uniqueness); files are kebab-case `*-page.tsx`.
