import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes, BookOpen } from 'lucide-react';
import { TokensPage } from './foundations/tokens-page';
import { TypographyPage } from './foundations/typography-page';
import { ButtonPage } from './components/button-page';
import { CardPage } from './components/card-page';
import { TextFieldPage } from './components/text-field-page';
import { GldsWebMDXProvider } from '../../platform/mdx-providers/glds-web-mdx-provider';
import ColorGuide from '../../../../../ai/glds-web/guidelines/color.mdx';
import TypeGuide from '../../../../../ai/glds-web/guidelines/typography.mdx';
import SpacingGuide from '../../../../../ai/glds-web/guidelines/spacing.mdx';
import AccessibilityGuide from '../../../../../ai/glds-web/guidelines/accessibility.mdx';
import UsageGuide from '../../../../../ai/glds-web/guidelines/usage.mdx';

const wrap = (Mdx: React.ComponentType) =>
  function GuidelinePage() {
    return (
      <GldsWebMDXProvider>
        <Mdx />
      </GldsWebMDXProvider>
    );
  };

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
  },
  {
    id: 'guidelines',
    label: 'Guidelines',
    icon: BookOpen,
    description: 'GLDS-Web design rules — color, typography, spacing, accessibility, usage.',
    entries: [
      { slug: 'guidelines/color', title: 'Color', Component: wrap(ColorGuide) },
      { slug: 'guidelines/typography', title: 'Typography', Component: wrap(TypeGuide) },
      { slug: 'guidelines/spacing', title: 'Spacing', Component: wrap(SpacingGuide) },
      { slug: 'guidelines/accessibility', title: 'Accessibility', Component: wrap(AccessibilityGuide) },
      { slug: 'guidelines/usage', title: 'Usage', Component: wrap(UsageGuide) }
    ]
  }
];
