import type { ReactNode } from 'react';

/**
 * Web/test shim for `react-native-vector-icons` icon-set submodules
 * (e.g. `react-native-vector-icons/dist/MaterialIcons`).
 *
 * The design-system `Icon` component statically imports these submodules to
 * support the legacy Material-icon string API. On web we render Lucide icons
 * instead, and the vector-icons CJS bundles do not transform cleanly under
 * Vite/Vitest. This shim renders nothing for the legacy path while keeping the
 * import graph resolvable. The default export matches the
 * `createIconSet`-style React component the real package exposes.
 */
type VectorIconProps = {
  name?: string;
  size?: number;
  color?: string;
  [key: string]: unknown;
};

export function VectorIcon(_props: VectorIconProps): ReactNode {
  return null;
}

export default VectorIcon;
