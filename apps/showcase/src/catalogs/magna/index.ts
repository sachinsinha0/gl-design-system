import { Provider as MagnaProvider } from '@gl/elements';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';
import { magnaThemes } from './themes';

registerDesignSystem({
  id: 'magna',
  label: 'Magna',
  tagline: 'Learner product UI',
  tech: 'tamagui',
  Provider: MagnaProvider,
  registry: catalog,
  homePage: HomePage,
  themes: magnaThemes,
  chrome: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    accent: '#E8F0FE',
    accentText: '#0B57D0'
  }
});
