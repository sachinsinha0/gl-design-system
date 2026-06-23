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
  themes: magnaThemes
});
