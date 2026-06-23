import { JediProvider } from '@gl/jedi';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';

registerDesignSystem({
  id: 'jedi',
  label: 'Jedi',
  tech: 'mui',
  Provider: JediProvider,
  registry: catalog,
  homePage: HomePage
});
