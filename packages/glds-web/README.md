# @gl/glds-web

GLDS-Web design system — Great Learning's **framework-agnostic HTML + CSS recipe library** for the marketing site and public-facing pages. Plain HTML markup, CSS custom properties, Poppins typography, Material Icons. **No JavaScript framework dependency.**

## Install

```bash
yarn add @gl/glds-web
# or
npm install @gl/glds-web
```

## Quick start

Mount the GLDS scope once (sets `data-ds="glds-web"` and loads the global stylesheet + fonts):

```tsx
import { GLDSProvider } from '@gl/glds-web';
import '@gl/glds-web/styles/global.css';

export function App() {
  return (
    <GLDSProvider>
      <button className="glds-button glds-button--primary">Enroll now</button>
    </GLDSProvider>
  );
}
```

Or use a recipe directly — every component is shipped as a raw HTML string you can render verbatim:

```ts
import buttonRecipe from '@gl/glds-web/recipes/button.html?raw';

document.querySelector('#cta').innerHTML = buttonRecipe;
```

All selectors live behind `[data-ds="glds-web"]`, so GLDS styles never leak into other DS regions on the same page.

## What's inside

- `provider.tsx` — `<GLDSProvider>` (sets `data-ds`, loads fonts).
- `styles/` — Global stylesheet, CSS reset, token CSS custom properties.
- `recipes/` — One HTML file per component (button, tag, text-input, …). Load via Vite's `?raw` query.
- `tokens/tokens.json` — Source of truth for GLDS tokens (color, type, space, radius). Exposed as `var(--glds-*)` custom properties.

## AI guidance

For Claude/Cursor/Copilot, install **[`@gl/ai-glds-web`](../../ai/glds-web)** — it ships the GLDS-Web skill, recipe definitions, MDX guidelines, and a token snapshot.

## License

Internal — Great Learning.
