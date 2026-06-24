# Jedi · Component specifications

> Human-readable component spec for designers, PMs, and partners. Generated from `ai/jedi/components/*.json` — do not edit by hand.

**3 components**

- [Button](#button)
- [Chip](#chip)
- [TextField](#textfield)

---

## Button

`button` · jedi

> MUI Button restricted to the Jedi role system. Use `contained` for the principal action (exactly one per view — Behavioral rule B4), `outlined`/`text` for supporting actions. Labels are UPPERCASE; in dark mode the font-weight steps up to 600.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `root` | MUI Button root with `disableElevation` (flat system). | ✓ |
| `startIcon` | Optional MUI icon. |  |
| `label` | Typography `button` (14/24, 0.4px, UPPERCASE). |  |
| `endIcon` | Optional MUI icon. |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `variant` | `'contained' \| 'outlined' \| 'text'` | `contained` |  |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success'` | `primary` |  |
| `size` | `'small' \| 'medium' \| 'large'` | `medium` |  |
| `disabled` | `boolean` | `false` |  |
| `startIcon` | `ReactNode` |  |  |
| `endIcon` | `ReactNode` |  |  |
| `onClick` | `(e: MouseEvent) => void` |  | ✓ |
| `fullWidth` | `boolean` | `false` |  |

### Variants

- **variant** — `contained`, `outlined`, `text` _(default: `contained`)_
- **color** — `primary`, `secondary`, `error`, `warning`, `info`, `success` _(default: `primary`)_
- **size** — `small`, `medium`, `large` _(default: `medium`)_

### States

- **default** — Resting; uses `primary.main` for contained.
- **hover** — MUI state layer at 4% (light) / 8% (dark).
- **focus-visible** — Visible focus ring — never suppress.
- **active** — Pressed; deeper state-layer overlay.
- **disabled** — `action.disabled` + `action.disabled-background`; never `opacity: 0.5`.

### Accessibility

- Buttons act; if the control navigates (changes URL), use a link instead.
- `IconButton` and icon-only Buttons require `aria-label`.
- Never suppress the focus ring; keyboard navigation is first-class.
- Touch targets ≥ 44×44px on partner-facing surfaces.

### Examples

**Principal contained action**

```tsx
import { Button } from '@gl/jedi';

<Button onClick={save}>Save changes</Button>
```

**Secondary outlined + tertiary text**

```tsx
import { Stack, Button } from '@mui/material';

<Stack direction="row" spacing={1}>
  <Button variant="contained" onClick={save}>Save</Button>
  <Button variant="outlined" onClick={cancel}>Cancel</Button>
  <Button variant="text" color="error" onClick={discard}>Discard</Button>
</Stack>
```

### Do not

- Render two `contained` buttons in the same view — exactly one per view (B4).
- Use `color="warning"` as text — warning has no text-safe solid in light mode; use the 160p/190p tint recipe.
- Use `color="secondary"` (orange) to mean caution — that's `warning`'s job.
- Suppress the focus ring or replace `:focus` styles with `outline: none`.
- Apply manual `opacity: 0.5` to fake disabled state.

### Tokens used

`primary.main`, `primary.dark`, `secondary.main`, `error.dark`, `action.hover`, `action.disabled`, `action.disabled-background`

---

## Chip

`chip` · jedi

> Compact label, status indicator, or filter affordance. Typography spec: Inter 500, 12/16, 0.16px. Status chips use the 160p/190p tint recipe — background `shades-190-p`, content `shades-160-p`. Decorative category chips use `primary` / `secondary` palettes; status meaning belongs to `error`/`warning`/`info`/`success`.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `container` | Rounded surface with `shades-190-p` background (status) or `primary.shades-12-p` (selected filter). |  |
| `leading-icon` | Optional MUI icon at 16/20px in the same color as the label. |  |
| `label` | Chip typography (Inter 500, 12/16, 0.16px). | ✓ |
| `delete-icon` | Optional dismissable affordance; click target ≥ 24×24 inside chip. |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `label` | `string` |  | ✓ |
| `variant` | `'filled' \| 'outlined'` | `outlined` |  |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success'` | `default` |  |
| `size` | `'small' \| 'medium'` | `medium` |  |
| `icon` | `ReactElement` |  |  |
| `onDelete` | `() => void` |  |  |
| `onClick` | `() => void` |  |  |
| `disabled` | `boolean` | `false` |  |

### Variants

- **variant** — `filled`, `outlined` _(default: `outlined`)_
- **color** — `default`, `primary`, `secondary`, `error`, `warning`, `info`, `success` _(default: `default`)_
- **size** — `small`, `medium` _(default: `medium`)_

### States

- **rest**
- **hover** — State-layer overlay on the chip surface.
- **focus-visible** — Visible focus ring.
- **selected** — Filled `primary.shades-12-p` background, `primary.main` text — only when used as a filter toggle.
- **disabled** — `action.disabled` text + `action.disabled-background`.

### Accessibility

- If the chip is interactive (filter/toggle), it must be reachable by Tab and operable via Enter/Space; otherwise it's a non-interactive label.
- Status chips must include text — never indicate state via color alone.
- The delete icon needs an accessible name (e.g., `aria-label="Remove"`).

### Examples

**Status chip (success)**

```tsx
import { Chip } from '@mui/material';

<Chip label="Active" color="success" variant="filled" size="small" />
```

**Filter chip (toggle)**

```tsx
<Chip label="All cohorts" color={active ? 'primary' : 'default'} onClick={toggle} />
```

**Removable**

```tsx
<Chip label="Beta" onDelete={remove} />
```

### Do not

- Use a chip as the principal action of a view — that's a Button's job.
- Render a status chip in `secondary` (orange) to mean caution — caution belongs to `warning` via tint recipe.
- Skip the label and rely on a color-only chip.
- Stack >7 filter chips visible at once — group, hide behind a 'more' menu, or move to a multiselect.

### Tokens used

`primary.shades-12-p`, `primary.main`, `success.shades-190-p`, `success.shades-160-p`, `error.shades-190-p`, `error.shades-160-p`, `action.disabled`, `action.disabled-background`

---

## TextField

`text-field` · jedi

> MUI TextField in the Jedi system. Always paired with a real `<label>` (MUI does this for you when you pass `label`). Validation runs on blur; error state pairs `error.main` with a helper message (never color alone).

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `label` | Inter 400, 12/12, 0.15px; always present. | ✓ |
| `input` | Inter 400, 16/24, 0.15px; value in `text.primary`, placeholder in `text.secondary`. |  |
| `outline` | 1px border in `other.outlined-border-23-p` (outlined variant); thicker `primary.main` on focus. |  |
| `adornment` | Optional `InputAdornment` start/end (icon button or text). |  |
| `helper-text` | Inter 400, 12/16, 0.4px; switches to `error.dark` when invalid. |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `variant` | `'outlined' \| 'filled' \| 'standard'` | `outlined` |  |
| `label` | `string` |  | ✓ |
| `value` | `string` |  | ✓ |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` |  | ✓ |
| `helperText` | `ReactNode` |  |  |
| `error` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |
| `size` | `'small' \| 'medium'` | `medium` |  |
| `InputProps` | `Partial<InputProps>` |  |  |

### Variants

- **variant** — `outlined`, `filled`, `standard` _(default: `outlined`)_
- **size** — `small`, `medium` _(default: `medium`)_

### States

- **rest** — Outline `other.outlined-border-23-p`; label `text.secondary`.
- **hover** — Outline `text.primary` at hover opacity.
- **focus** — Outline `primary.main` 2px; floating label `primary.main`.
- **filled** — Value in `text.primary`.
- **error** — Outline + helper in `error.dark` (light) / `error.light` (dark); inline icon required.
- **disabled** — Color & outline use `action.disabled`; never custom opacity.

### Accessibility

- Every input has an associated label — pass `label`, do not rely on placeholder.
- Error state pairs color with a written error message; never use color alone.
- Validate on blur, never per keystroke.
- Failed form submissions preserve every field value (loss aversion).

### Examples

**Outlined with helper**

```tsx
import { TextField } from '@gl/jedi';

<TextField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="Use your work address."
/>
```

**Error with inline icon**

```tsx
import { TextField, InputAdornment } from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

<TextField
  label="Email"
  value={email}
  onChange={onChange}
  error={!!err}
  helperText={err}
  InputProps={{ endAdornment: err ? <InputAdornment position="end"><ErrorOutline color="error" /></InputAdornment> : undefined }}
/>
```

### Do not

- Drop the label and rely on a placeholder.
- Use `error.main` for the helper text (3.6:1 fails AA) — use `error.dark` or the 160p/190p tint recipe.
- Wipe entered values on a failed submit.
- Disable a field via `opacity: 0.5` or a custom grey.

### Tokens used

`primary.main`, `text.primary`, `text.secondary`, `other.outlined-border-23-p`, `error.dark`, `error.shades-160-p`, `error.shades-190-p`, `action.disabled`
