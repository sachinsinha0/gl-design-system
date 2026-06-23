import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes, BookOpen, Rocket } from 'lucide-react';
import { InstallationPage } from './get-started/installation-page';
import { ColorsPage } from './foundations/colors-page';
import { TypographyPage } from './foundations/typography-page';
import { ButtonsPage } from './components/buttons-page';
import { JediMDXProvider } from '../../platform/mdx-providers/jedi-mdx-provider';
import ColorGuide from '../../../../../ai/jedi/guidelines/color.mdx';
import TypeGuide from '../../../../../ai/jedi/guidelines/typography.mdx';
import SpacingGuide from '../../../../../ai/jedi/guidelines/spacing.mdx';
import AccessibilityGuide from '../../../../../ai/jedi/guidelines/accessibility.mdx';
import UsageGuide from '../../../../../ai/jedi/guidelines/usage.mdx';

const wrap = (Mdx: React.ComponentType) =>
  function GuidelinePage() {
    return (
      <JediMDXProvider>
        <Mdx />
      </JediMDXProvider>
    );
  };

export const catalog: CatalogGroup[] = [
  {
    id: 'get-started',
    label: 'Get started',
    icon: Rocket,
    description: 'Install @gl/jedi, download the Claude skill or the Markdown spec.',
    entries: [
      { slug: 'installation', title: 'Installation', Component: InstallationPage }
    ]
  },
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
  },
  {
    id: 'guidelines',
    label: 'Guidelines',
    icon: BookOpen,
    description: 'Jedi design rules — color, typography, spacing, accessibility, usage.',
    entries: [
      { slug: 'guidelines/color', title: 'Color', Component: wrap(ColorGuide) },
      { slug: 'guidelines/typography', title: 'Typography', Component: wrap(TypeGuide) },
      { slug: 'guidelines/spacing', title: 'Spacing', Component: wrap(SpacingGuide) },
      { slug: 'guidelines/accessibility', title: 'Accessibility', Component: wrap(AccessibilityGuide) },
      { slug: 'guidelines/usage', title: 'Usage', Component: wrap(UsageGuide) }
    ]
  }
];
