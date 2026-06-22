import type { CatalogGroup } from './types';
import { ColorsPage } from '../pages/foundations/colors-page';
export const catalog: CatalogGroup[] = [
  { id: 'foundations', label: 'Foundations', entries: [{ slug: 'colors', title: 'Colors', Component: ColorsPage }] },
  { id: 'components', label: 'Components', entries: [] },
  { id: 'prototypes', label: 'Prototypes', entries: [] }
];
export function allEntries(): CatalogGroup['entries'] { return catalog.flatMap((g) => g.entries); }
