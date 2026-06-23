import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      // Pick up tests both in this app and inside @gl/elements so vendored
      // design-system tests (e.g. theme-provider first-paint) continue to run.
      include: [
        'src/**/*.{test,spec}.{ts,tsx}',
        '../../packages/elements/src/**/*.{test,spec}.{ts,tsx}'
      ],
      server: { deps: { inline: [/react-native/, /@gl\/elements/, /tamagui/, /@tamagui/] } }
    }
  })
);

