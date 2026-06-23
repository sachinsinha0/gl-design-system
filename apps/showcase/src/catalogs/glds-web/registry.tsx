import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes } from '@tamagui/lucide-icons';
import { TokensPage } from './foundations/tokens-page';
import { TypographyPage } from './foundations/typography-page';
import { ButtonPage } from './components/button-page';
import { CardPage } from './components/card-page';
import { TextFieldPage } from './components/text-field-page';

export const catalog: CatalogGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    icon: Palette,
    description: 'GLDS-Web tokens — pure CSS custom properties.',
    entries: [
      { slug: 'tokens', title: 'Tokens', Component: TokensPage },
      { slug: 'typography', title: 'Typography', Component: TypographyPage }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: Boxes,
    description: 'HTML + CSS recipes — copy and paste into any web stack.',
    entries: [
      { slug: 'button', title: 'Button', Component: ButtonPage },
      { slug: 'card', title: 'Card', Component: CardPage },
      { slug: 'text-field', title: 'Text Field', Component: TextFieldPage }
    ]
  }
];
