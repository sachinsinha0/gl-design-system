import { JediProvider } from '@gl/jedi';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';

registerDesignSystem({
  id: 'jedi',
  label: 'Jedi',
  tagline: 'Internal & partner tools',
  tech: 'mui',
  Provider: JediProvider,
  registry: catalog,
  homePage: HomePage,
  chrome: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    accent: '#EEF1F6',
    accentText: '#1F3A93'
  }
});
