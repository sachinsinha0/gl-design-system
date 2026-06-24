# Magna · Component specifications

> Human-readable component spec for designers, PMs, and partners. Generated from `ai/magna/components/*.json` — do not edit by hand.

**3 components**

- [Button](#button)
- [Card](#card)
- [TextField](#textfield)

---

## Button

`button` · magna

> Primary tappable action surface. Built on Tamagui's Button; resolves to a pressable region with M3 role tokens for fill and content. Use `$primary`/`onPrimary` for the principal CTA, `$secondaryContainer`/`$onSecondaryContainer` for tonal supporting actions, and the outline/text variants for low-emphasis actions.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `container` | Pressable surface with role-fill, paired with its `on-` role for content. | ✓ |
| `label` | `Typography` variant `subtitle1` or `buttonLarge`/`buttonMedium`/`buttonSmall` in Title Case. |  |
| `leading-icon` | Optional Lucide icon (color = matching `on-` role). |  |
| `trailing-icon` | Optional Lucide icon for forward navigation or status. |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `variant` | `'filled' \| 'tonal' \| 'outlined' \| 'text'` | `filled` |  |
| `size` | `'sm' \| 'md' \| 'lg'` | `md` |  |
| `disabled` | `boolean` | `false` |  |
| `loading` | `boolean` | `false` |  |
| `onPress` | `() => void` |  | ✓ |
| `icon` | `ReactNode` |  |  |

### Variants

- **variant** — `filled`, `tonal`, `outlined`, `text` _(default: `filled`)_
- **size** — `sm`, `md`, `lg` _(default: `md`)_

### States

- **default** — Resting state — role fill at full opacity.
- **hover** — 8% state-layer overlay (matching `on-` role).
- **focus** — 12% state-layer overlay + visible focus ring.
- **pressed** — 12% state-layer overlay.
- **disabled** — 38% opacity over surface; never custom grey.
- **loading** — Spinner; label hidden but width preserved.

### Accessibility

- Always reachable by keyboard; never hide the focus ring.
- Use `accessibilityLabel` (or label child) — icon-only buttons must carry an accessible name.
- Touch target ≥ 48×48dp (M3 standard).
- Disabled buttons use `disabled` + reduced emphasis tokens, never opacity 0.5.

### Examples

**Primary CTA**

```tsx
import { Button } from '@gl/elements';

<Button onPress={enroll}>Enroll in course</Button>
```

**Tonal supporting action**

```tsx
<Button variant="tonal" onPress={saveDraft}>Save for later</Button>
```

**With leading icon**

```tsx
import { Play } from '@tamagui/lucide-icons';
import { Button } from '@gl/elements';

<Button icon={<Play />} onPress={resume}>Resume</Button>
```

### Do not

- Two filled (`primary`) buttons in the same view — there must be exactly one principal CTA.
- Hex/raw colors on `backgroundColor` — use role tokens (`$primary`, `$secondaryContainer`) only.
- Material string-name icons (`icon="play_arrow"`) — they render nothing on web; use Lucide.
- Icon-only buttons without an accessible name.
- UPPERCASE labels — Magna buttons are Title Case (only `overline` is uppercased).

### Tokens used

`$primary`, `$onPrimary`, `$secondaryContainer`, `$onSecondaryContainer`, `$outline`, `$surface`, `$onSurface`

---

## Card

`card` · magna

> Tonal-surface container for a single logical unit (course tile, lesson summary, settings group). M3 expresses elevation through `surfaceContainer*` tonal steps, not shadows. The default Magna card is `surfaceContainer`; raise to `surfaceContainerHigh` only when the card needs to read as raised.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `container` | `Surface` at a `surfaceContainer*` tonal level; `$outline` border optional. | ✓ |
| `media` | Optional image/thumbnail; honors the container border-radius. |  |
| `header` | Title (`Typography subtitle1` in `$onSurface`) + optional supporting text in `$onSurfaceVariant`. |  |
| `body` | Free-form content using `body1` / `body2`. |  |
| `actions` | Trailing action row — buttons (text/tonal); follows the one-primary-action rule. |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `elevation` | `'surface' \| 'low' \| 'default' \| 'high' \| 'highest'` | `default` |  |
| `outlined` | `boolean` | `false` |  |
| `onPress` | `() => void` |  |  |
| `padding` | `'sm' \| 'md' \| 'lg'` | `md` |  |

### Variants

- **elevation** — `surface`, `low`, `default`, `high`, `highest` _(default: `default`)_
- **outlined** — `true`, `false` _(default: `false`)_

### States

- **static** — Non-interactive container.
- **interactive-rest** — When `onPress` is set; default tonal level.
- **hover** — State-layer overlay `$onSurface` at 8%.
- **pressed** — State-layer overlay `$onSurface` at 12%.
- **focus** — Visible focus ring in `$primary`.

### Accessibility

- If interactive, the whole card is a single tab stop with a clear accessible name (title or summary).
- Do not nest two interactive elements inside the same card without separating them as distinct tab stops.
- Image content needs `alt`; decorative images get `alt=""`.

### Examples

**Course summary card**

```tsx
import { Surface, YStack, Typography } from '@gl/elements';

<Surface backgroundColor="$surfaceContainer" borderRadius="$lg" padding="$md">
  <YStack gap="$sm">
    <Typography variant="subtitle1">React fundamentals</Typography>
    <Typography variant="body2" color="$onSurfaceVariant">12 lessons · 4h 30m</Typography>
  </YStack>
</Surface>
```

### Do not

- Use `box-shadow` / heavy elevation to denote importance — use a higher `surfaceContainer*` tone instead.
- Apply `$primary` as a card background to make it pop.
- Stack two filled buttons inside a card — only one primary action per card.
- Hardcode a hex grey for the card background.

### Tokens used

`$surface`, `$surfaceContainer`, `$surfaceContainerHigh`, `$surfaceContainerHighest`, `$onSurface`, `$onSurfaceVariant`, `$outline`

---

## TextField

`text-field` · magna

> Single-line text input built on Tamagui Input. Uses M3 surface + outline tokens. Always pair with a `<label>` (or `Typography` label slot) — placeholder text never substitutes for a label.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `label` | `Typography subtitle2` in `$onSurfaceVariant`; required. | ✓ |
| `container` | Field surface — `outlined` (border `$outline`) or `filled` (`$surfaceVariant`). |  |
| `leading-adornment` | Optional Lucide icon or small text (units). |  |
| `input` | `body1` text in `$onSurface`; placeholder in `$onSurfaceVariant`. |  |
| `trailing-icon` | Optional icon (clear, password reveal). |  |
| `helper-text` | `caption` in `$onSurfaceVariant` (or `$error` when invalid). |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `variant` | `'outlined' \| 'filled'` | `outlined` |  |
| `label` | `string` |  | ✓ |
| `value` | `string` |  | ✓ |
| `onChangeText` | `(v: string) => void` |  | ✓ |
| `placeholder` | `string` |  |  |
| `helperText` | `string` |  |  |
| `error` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` |  |
| `leading` | `ReactNode` |  |  |
| `trailing` | `ReactNode` |  |  |
| `secureTextEntry` | `boolean` | `false` |  |

### Variants

- **variant** — `outlined`, `filled` _(default: `outlined`)_
- **size** — `sm`, `md` _(default: `md`)_

### States

- **rest** — Border `$outline`; label `$onSurfaceVariant`.
- **hover** — Border `$onSurface` at 8% state-layer.
- **focus** — Border `$primary` 2px; label `$primary`.
- **filled** — Value rendered in `$onSurface`.
- **error** — Border + helper text in `$error`; pair with an inline icon, never color alone.
- **disabled** — Container + label at 38% emphasis.

### Accessibility

- Every TextField MUST have an associated label (visible or via accessibilityLabel).
- Error state pairs `$error` color with the helper message — never color alone.
- Validate on blur, not on every keystroke (matches M3 input conventions).
- Touch target ≥ 48×48dp.

### Examples

**Outlined with helper**

```tsx
import { TextField } from '@gl/elements';

<TextField
  label="Email"
  value={email}
  onChangeText={setEmail}
  helperText="We'll never share this."
/>
```

**Error state**

```tsx
<TextField label="Password" value={pw} onChangeText={setPw} error helperText="At least 8 characters." secureTextEntry />
```

### Do not

- Use a placeholder as a replacement for a label.
- Show an error border without an accompanying error message.
- Disable a field with `opacity: 0.5` — use the disabled variant.
- Set the input text in `$primary` to make it stand out.

### Tokens used

`$primary`, `$onSurface`, `$onSurfaceVariant`, `$surfaceVariant`, `$outline`, `$error`, `$errorContainer`, `$onErrorContainer`
