# GLDS-Web · Component specifications

> Human-readable component spec for designers, PMs, and partners. Generated from `ai/glds-web/components/*.json` — do not edit by hand.

**3 components**

- [Button](#button)
- [Tag](#tag)
- [Text Input](#text-input)

---

## Button

`button` · glds-web

> HTML+CSS button. Variant axes match the Figma Components page exactly: configuration (linkbutton|text|outlined|filled|tonal) × icon (no-icon|with-icon-left|with-icon-right) × size (Small|Medium|Large) × color (primary). A `filled` button is the single CTA per section; supporting actions use `outlined`/`text`/`linkbutton`.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `container` | Real `<button>` element with `class="glds-btn glds-btn--{configuration} glds-btn--{size}"`. | ✓ |
| `leading-icon` | Material Icons span before label (optional). |  |
| `label` | Poppins SemiBold; UPPERCASE per the Button type style. | ✓ |
| `trailing-icon` | Material Icons span after label (optional). |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `configuration` | `'linkbutton' \| 'text' \| 'outlined' \| 'filled' \| 'tonal'` | `filled` |  |
| `size` | `'Small' \| 'Medium' \| 'Large'` | `Medium` |  |
| `iconPosition` | `'no-icon' \| 'with-icon-left' \| 'with-icon-right'` | `no-icon` |  |
| `color` | `'primary'` | `primary` |  |
| `disabled` | `boolean` | `false` |  |
| `type` | `'button' \| 'submit' \| 'reset'` | `button` |  |

### Variants

- **configuration** — `linkbutton`, `text`, `outlined`, `filled`, `tonal` _(default: `filled`)_
- **size** — `Small`, `Medium`, `Large` _(default: `Medium`)_
- **icon** — `no-icon`, `with-icon-left`, `with-icon-right` _(default: `no-icon`)_
- **color** — `primary` _(default: `primary`)_

### States

- **enabled** — Resting; filled = Primary 500 bg, white label.
- **hovered** — filled → Primary 600 bg; outlined → Primary 50 bg fill.
- **pressed** — filled → Primary 700; outlined → Primary 100.
- **disabled** — Disabled Text `#A19F9D` + muted fill; never lower whole-element opacity.
- **focus-visible** — Always include a visible focus ring — never `outline: none` without a replacement.

### Accessibility

- Always use a real `<button>`; never an `<a>` with a JS click handler for an action.
- `linkbutton` looks like a link but IS a button — `<button class="glds-btn glds-btn--linkbutton">`.
- Material icon-only controls (rare in this set) MUST carry `aria-label`.
- Keep `:focus-visible` ring; tap targets ≥ 48px on mobile.

### Examples

**Primary CTA (filled)**

```html
<button class="glds-btn glds-btn--filled glds-btn--medium">Start free trial</button>
```

**Tonal secondary CTA**

```html
<button class="glds-btn glds-btn--tonal glds-btn--medium">Book a demo</button>
```

**Outlined with leading icon**

```html
<button class="glds-btn glds-btn--outlined glds-btn--medium">
  <span class="material-icons" aria-hidden="true">download</span>
  Download brochure
</button>
```

**Inline link-styled button**

```html
<button class="glds-btn glds-btn--linkbutton">Show more</button>
```

### Do not

- Use an `<a>` with a JS handler for an action — use `linkbutton`.
- Use a `<button>` for plain navigation — use `<a href>`.
- Place two `filled` buttons next to each other (competing primaries).
- Hide the focus ring without a visible replacement.
- Use vague labels like 'Submit' or 'Click here' — write action+value (`Enroll now`).

### Tokens used

`--glds-primary-500`, `--glds-primary-600`, `--glds-primary-700`, `--glds-primary-50`, `--glds-primary-100`, `--glds-grey-disabled-text`, `--glds-purity-white`

---

## Tag

`tag` · glds-web

> Small rounded label for status/category. Variant axes from the Figma Components page: Size (Small|Large) × Style (Filled|Tonal|Outlined|Outlined Ghost) × Colour (Primary|Secondary|Success|Error) × Icon (Left|Right). Tags are NOT actions — color carries meaning.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `container` | `<span class="glds-tag glds-tag--{style} glds-tag--{color} glds-tag--{size}">`. | ✓ |
| `leading-icon` | Material Icons span before label (optional). |  |
| `label` | Short 1–2 word text. | ✓ |
| `trailing-icon` | Material Icons span after label (optional). |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `label` | `string` |  | ✓ |
| `size` | `'Small' \| 'Large'` | `Small` |  |
| `style` | `'Filled' \| 'Tonal' \| 'Outlined' \| 'Outlined Ghost'` | `Tonal` |  |
| `color` | `'Primary' \| 'Secondary' \| 'Success' \| 'Error'` | `Primary` |  |
| `iconPosition` | `'none' \| 'left' \| 'right'` | `none` |  |

### Variants

- **size** — `Small`, `Large` _(default: `Small`)_
- **style** — `Filled`, `Tonal`, `Outlined`, `Outlined Ghost` _(default: `Tonal`)_
- **color** — `Primary`, `Secondary`, `Success`, `Error` _(default: `Primary`)_
- **icon** — `none`, `left`, `right` _(default: `none`)_

### States

- **default** — Tags are static — no hover/focus/active.

### Accessibility

- Tags must always include text — never indicate state via color alone.
- If a tag is interactive (filter), convert it to a `<button>` and respect button rules.
- Color pairings: Success/Error from UI Feedback; Primary/Secondary for category.

### Examples

**Success tonal tag**

```html
<span class="glds-tag glds-tag--tonal glds-tag--success glds-tag--small">Active</span>
```

**Primary outlined tag with leading icon**

```html
<span class="glds-tag glds-tag--outlined glds-tag--primary glds-tag--large">
  <span class="material-icons" aria-hidden="true">star</span>
  Featured
</span>
```

### Do not

- Use a tag as a button (it's a label).
- Render an Error tag without the word ('Error', 'Failed', etc.).
- Add colors outside the four defined (Primary/Secondary/Success/Error).
- Use long phrases — keep to 1–2 words.

### Tokens used

`--glds-primary-500`, `--glds-primary-50`, `--glds-secondary-500`, `--glds-feedback-success-500`, `--glds-feedback-success-50`, `--glds-feedback-error-500`, `--glds-feedback-error-50`

---

## Text Input

`text-input` · glds-web

> Form text input as defined in Figma. Variant axes: Size (Small|Medium) × State (Enabled|Hovered|Focused|Disabled|Error) × Has Value × Adornment × Icon End × Helper Text. Every input has a real `<label>`; validate on blur, never per keystroke.

### Anatomy

| Part | Description | Required |
| --- | --- | :---: |
| `label` | Real `<label>` with `for` matching the input `id`. | ✓ |
| `field-container` | Bordered container (`--glds-grey-contrast-60` border, `--glds-radius-md`). |  |
| `leading-adornment` | Optional Material Icon or text prefix (currency, unit). |  |
| `input` | `<input>` — placeholder in `--glds-grey-secondary-text`, value in `--glds-grey-primary-text`. | ✓ |
| `trailing-icon` | Optional Material Icon (clear, password reveal). |  |
| `helper-text` | 12px caption; sits below the field; switches to error styling on invalid. |  |

### Props

| Name | Type | Default | Required |
| --- | --- | --- | :---: |
| `id` | `string` |  | ✓ |
| `label` | `string` |  | ✓ |
| `name` | `string` |  |  |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `text` |  |
| `value` | `string` |  |  |
| `placeholder` | `string` |  |  |
| `size` | `'Small' \| 'Medium'` | `Medium` |  |
| `state` | `'Enabled' \| 'Hovered' \| 'Focused' \| 'Disabled' \| 'Error'` | `Enabled` |  |
| `helperText` | `string` |  |  |
| `errorMessage` | `string` |  |  |
| `adornment` | `string` |  |  |
| `iconEnd` | `string` |  |  |

### Variants

- **size** — `Small`, `Medium` _(default: `Medium`)_
- **state** — `Enabled`, `Hovered`, `Focused`, `Disabled`, `Error` _(default: `Enabled`)_
- **hasValue** — `true`, `false` _(default: `false`)_
- **adornment** — `true`, `false` _(default: `false`)_
- **iconEnd** — `true`, `false` _(default: `false`)_
- **helperText** — `true`, `false` _(default: `false`)_

### States

- **Enabled** — Grey border (`--glds-grey-contrast-60`).
- **Hovered** — Darker border (`--glds-grey-contrast-150`).
- **Focused** — Primary 500 border + visible focus ring.
- **Error** — Error 500 border; helper text replaced/augmented with error message (grey 800).
- **Disabled** — Disabled Text color + muted border; never whole-element `opacity`.

### Accessibility

- Every input has an associated `<label>` (via `for`/`id`).
- Error message text is grey 800 (`--glds-feedback-error-800`) — never the Error 500 hex (fails contrast as text).
- Errors pair color with a written message; never color alone.
- Validate on blur; preserve entered values on failed submission.

### Examples

**Enabled with helper text**

```html
<div class="glds-field glds-field--medium">
  <label class="glds-field__label" for="email">Email</label>
  <input class="glds-field__input" id="email" name="email" type="email" placeholder="you@example.com" />
  <p class="glds-field__helper">We won't share this address.</p>
</div>
```

**Error state**

```html
<div class="glds-field glds-field--medium glds-field--error">
  <label class="glds-field__label" for="pw">Password</label>
  <input class="glds-field__input" id="pw" name="password" type="password" />
  <p class="glds-field__helper glds-field__helper--error">At least 8 characters.</p>
</div>
```

### Do not

- Skip the label and rely on a placeholder.
- Render an Error state without an accompanying message.
- Disable a field via `opacity: 0.5`.
- Color the error message in `--glds-feedback-error-500` — it fails contrast as text on white.

### Tokens used

`--glds-primary-500`, `--glds-grey-primary-text`, `--glds-grey-secondary-text`, `--glds-grey-contrast-60`, `--glds-grey-contrast-150`, `--glds-grey-disabled-text`, `--glds-feedback-error-500`, `--glds-feedback-error-800`
