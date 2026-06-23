import { Provider as MagnaProvider } from '@gl/elements';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';
import { magnaThemes } from './themes';
import { MagnaShell } from './shell/magna-shell';

registerDesignSystem({
  id: 'magna',
  label: 'Magna',
  tagline: 'Learner product UI',
  tech: 'tamagui',
  Provider: MagnaProvider,
  Shell: MagnaShell,
  registry: catalog,
  homePage: HomePage,
  themes: magnaThemes
});
