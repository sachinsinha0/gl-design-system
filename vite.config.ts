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
      'react-native': 'react-native-web',
      'react-native-edge-to-edge': path.resolve(__dirname, 'src/shims/react-native-edge-to-edge.ts')
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.json', '.mjs']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      resolveExtensions: ['.web.js', '.js', '.ts', '.tsx', '.jsx', '.json']
    }
  }
});
