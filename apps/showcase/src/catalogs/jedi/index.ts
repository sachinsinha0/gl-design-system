import { JediProvider } from '@gl/jedi';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';
import { JediShell } from './shell/jedi-shell';

registerDesignSystem({
  id: 'jedi',
  label: 'Jedi',
  tagline: 'Internal & partner tools',
  tech: 'mui',
  Provider: JediProvider,
  Shell: JediShell,
  registry: catalog,
  homePage: HomePage
});
