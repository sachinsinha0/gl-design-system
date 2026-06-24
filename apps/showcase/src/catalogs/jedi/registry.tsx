import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes, BookOpen } from 'lucide-react';
import { ColorsPage } from './foundations/colors-page';
import { TypographyPage } from './foundations/typography-page';
import { SpacingPage } from './foundations/spacing-page';
import { ElevationPage } from './foundations/elevation-page';
import { MuiBrowsePage } from './components/mui-browse-page';
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
    id: 'foundations',
    label: 'Foundations',
    icon: Palette,
    description: 'Jedi (MUI v6) tokens — palette, type, spacing, elevation.',
    entries: [
      { slug: 'colors', title: 'Colors', Component: ColorsPage },
      { slug: 'typography', title: 'Typography', Component: TypographyPage },
      { slug: 'spacing', title: 'Spacing', Component: SpacingPage },
      { slug: 'elevation', title: 'Elevation', Component: ElevationPage }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: Boxes,
    description: 'Browse all MUI v6 components with links to the official docs.',
    entries: [
      { slug: 'mui-browse', title: 'Browse MUI', Component: MuiBrowsePage }
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

