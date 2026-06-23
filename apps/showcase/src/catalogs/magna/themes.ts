import type { ThemeOption } from '../../platform/ds-registry';

const NAMES = [
  'blue','deeporange','darkteal','gold','eggplant','glapremium','olive','ocean',
  'stormblue','ink','midnight','rust','mint','cyan','deeppurple','green',
  'lightblue','orange','pink','purple','rose','lime'
];

export const magnaThemes: ThemeOption[] = NAMES.map((id) => ({ id, label: id }));
