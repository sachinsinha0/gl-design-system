import { GLDSProvider } from '@gl/glds-web';
import { registerDesignSystem } from '../../platform/ds-registry';
import { catalog } from './registry';
import { HomePage } from './home-page';
import { GLDSShell } from './shell/glds-shell';

registerDesignSystem({
  id: 'glds-web',
  label: 'GLDS-Web',
  tagline: 'Marketing & public site',
  tech: 'html-css',
  Provider: GLDSProvider,
  Shell: GLDSShell,
  registry: catalog,
  homePage: HomePage
});
