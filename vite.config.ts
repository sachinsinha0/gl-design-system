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
      disableExtraction: true
    })
  ],
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env.TAMAGUI_TARGET': JSON.stringify('web')
  },
  resolve: {
    alias: {
      '@gl/elements': path.resolve(__dirname, 'src/design-system'),
      // The vendored design-system Icon statically imports vector-icons submodules
      // for the legacy Material-icon string API. On web we render Lucide icons, and
      // the vector-icons CJS bundles do not transform under Vite/Vitest, so shim them.
      'react-native-vector-icons/dist/MaterialIcons': path.resolve(
        __dirname,
        'src/shims/react-native-vector-icon.tsx'
      ),
      'react-native-vector-icons/dist/MaterialCommunityIcons': path.resolve(
        __dirname,
        'src/shims/react-native-vector-icon.tsx'
      ),
      'react-native': 'react-native-web',
      'react-native-edge-to-edge': path.resolve(__dirname, 'src/shims/react-native-edge-to-edge.ts')
    },
    // Prefer the compiled `browser`/`module`/`main` builds over the `react-native`
    // package.json field, which points at raw `.tsx` TS source (e.g.
    // react-native-safe-area-context) that does not transform under Vite/Vitest.
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext', 'main'],
    conditions: ['browser', 'import', 'module', 'default'],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.json', '.mjs']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      resolveExtensions: ['.web.js', '.js', '.ts', '.tsx', '.jsx', '.json']
    }
  }
});
