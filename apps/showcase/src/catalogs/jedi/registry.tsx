import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes } from '@tamagui/lucide-icons';
import { ColorsPage } from './foundations/colors-page';
import { TypographyPage } from './foundations/typography-page';
import { ButtonsPage } from './components/buttons-page';

export const catalog: CatalogGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    icon: Palette,
    description: 'Jedi (MUI v6) tokens — palette, type and shape.',
    entries: [
      { slug: 'colors', title: 'Colors', Component: ColorsPage },
      { slug: 'typography', title: 'Typography', Component: TypographyPage }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: Boxes,
    description: 'MUI v6 components themed by Jedi.',
    entries: [
      { slug: 'buttons', title: 'Buttons', Component: ButtonsPage }
    ]
  }
];
