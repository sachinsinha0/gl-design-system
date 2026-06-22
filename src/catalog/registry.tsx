import type { CatalogGroup } from './types';
import { ColorsPage } from '../pages/foundations/colors-page';
import { TypographyPage } from '../pages/foundations/typography-page';
import { SpacingPage } from '../pages/foundations/spacing-page';
import { ElevationPage } from '../pages/foundations/elevation-page';
import { IconsPage } from '../pages/foundations/icons-page';
export const catalog: CatalogGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    entries: [
      { slug: 'colors', title: 'Colors', Component: ColorsPage },
      { slug: 'typography', title: 'Typography', Component: TypographyPage },
      { slug: 'spacing', title: 'Spacing', Component: SpacingPage },
      { slug: 'elevation', title: 'Elevation', Component: ElevationPage },
      { slug: 'icons', title: 'Icons', Component: IconsPage }
    ]
  },
  { id: 'components', label: 'Components', entries: [] },
  { id: 'prototypes', label: 'Prototypes', entries: [] }
];
export function allEntries(): CatalogGroup['entries'] { return catalog.flatMap((g) => g.entries); }
