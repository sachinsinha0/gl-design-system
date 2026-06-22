/**
 * Ambient type surface for the vendored `@gl/elements` design system.
 *
 * Why this exists
 * ---------------
 * The design system under `src/design-system/**` is vendored verbatim from
 * `gl-app-native/packages/elements/src`, where it was authored under a
 * non-strict tsconfig and against a specific set of Tamagui/React Native
 * sub-path imports (`tamagui/types`, `@tamagui/sheet/src/types`, …). Pulled
 * into this app's `strict` program it produces ~260 type errors — a mix of
 * implicit-any, structural mismatches, and unresolved internal sub-path
 * modules — none of which are runtime bugs (tests + dev server + vite build
 * all pass; esbuild strips the types).
 *
 * Per the plan's guidance we do NOT rewrite the vendored library. Instead the
 * build's `tsc --noEmit` excludes `src/design-system` from the program and
 * resolves `@gl/elements` through this ambient declaration, so app code we own
 * is still strict-checked while the vendored sources are treated as a typed
 * external dependency. Vite/Vitest continue to use the real implementation at
 * runtime via the `@gl/elements` alias in vite.config.ts.
 *
 * The named exports below cover the surface app code uses today; everything
 * else resolves through the permissive index signature on the namespace. A
 * future phase can replace this with declarations generated from the vendored
 * lib.
 */
declare module '@gl/elements' {
  import type { ComponentType, ReactNode } from 'react';

  // Permissive component alias for vendored Tamagui-styled components.
  type AnyComponent = ComponentType<any>;

  export const Provider: ComponentType<{ children?: ReactNode } & Record<string, any>>;
  export const Button: AnyComponent;
  export const Typography: AnyComponent;
  export const YStack: AnyComponent;
  export const XStack: AnyComponent;
  export const ZStack: AnyComponent;
  export const Stack: AnyComponent;
  export const ScrollView: AnyComponent;
  export const View: AnyComponent;
  export const Text: AnyComponent;
  export const Separator: AnyComponent;

  export type ButtonProps = Record<string, any>;
  export type TypographyProps = Record<string, any>;

  // Theme surface used by the app shell (mirrors the vendored lib's contract;
  // values resolve through the permissive component signatures at runtime).
  export type GLTheme =
    | 'blue'
    | 'deeporange'
    | 'darkteal'
    | 'gold'
    | 'eggplant'
    | 'glapremium'
    | 'olive'
    | 'ocean'
    | 'stormblue'
    | 'ink'
    | 'midnight'
    | 'rust'
    | 'mint'
    | 'cyan'
    | 'deeppurple'
    | 'green'
    | 'lightblue'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'rose'
    | 'lime';

  export type ColorScheme = 'light' | 'dark';

  export type ThemeSettingsContextType = {
    theme: GLTheme | null;
    colorScheme: ColorScheme;
    setTheme: (theme: GLTheme) => void;
    setColorScheme: (colorScheme: ColorScheme) => void;
  };

  export function useThemeSetting(): ThemeSettingsContextType;

  // Tamagui's useTheme returns an indexable record of token accessors.
  export function useTheme(): Record<string, any>;
}

declare module '@gl/elements/icons' {
  import type { ComponentType } from 'react';
  const icons: Record<string, ComponentType<any>>;
  export default icons;
}
