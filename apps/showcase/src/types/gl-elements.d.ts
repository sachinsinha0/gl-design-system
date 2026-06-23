/**
 * Ambient type surface for the vendored `@gl/elements` design system.
 *
 * Why this exists
 * ---------------
 * The design system under `src/design-system/**` is vendored verbatim from
 * `gl-app-native/packages/elements/src`, where it was authored under a
 * non-strict tsconfig and against Tamagui/React Native internal sub-path
 * imports that don't resolve here. Pulled into this app's `strict` program it
 * produces ~260 type errors — none of which are runtime bugs (tests + dev
 * server + vite build all pass; esbuild strips the types).
 *
 * Per the plan's guidance we do NOT rewrite the vendored library. Instead the
 * build's `tsc --noEmit` excludes `src/design-system` from the program and
 * resolves `@gl/elements` through these BODY-LESS ambient declarations, which
 * make every import from `@gl/elements` resolve to `any`. App code we own is
 * still strict-checked; the design system is treated as an untyped external
 * dependency. Vite/Vitest use the real implementation at runtime via the
 * `@gl/elements` alias in vite.config.ts.
 *
 * Body-less (rather than enumerating exports) is deliberate: catalog/foundation
 * pages import dozens of different components and hooks from `@gl/elements`, and
 * a body-less module declaration covers all of them without this file needing
 * an edit per new export. The trade-off — no compile-time type safety on the
 * design-system surface — is accepted for this prototyping repo; the per-unit
 * render tests are the real safety net. A future phase can replace this with
 * declarations generated from the vendored lib to restore type safety.
 */
declare module '@gl/elements';
declare module '@gl/elements/icons';
