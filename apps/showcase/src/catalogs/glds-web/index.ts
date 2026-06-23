import { GLDSProvider } from '@gl/glds-web';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';

registerDesignSystem({
  id: 'glds-web',
  label: 'GLDS-Web',
  tagline: 'Marketing & public site',
  tech: 'html-css',
  Provider: GLDSProvider,
  registry: catalog,
  homePage: HomePage
});
