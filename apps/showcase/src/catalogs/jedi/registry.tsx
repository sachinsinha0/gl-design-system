import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes, BookOpen, Rocket, MonitorSmartphone } from 'lucide-react';
import { InstallationPage } from './get-started/installation-page';
import { ColorsPage } from './foundations/colors-page';
import { TypographyPage } from './foundations/typography-page';
import { SpacingPage } from './foundations/spacing-page';
import { ElevationPage } from './foundations/elevation-page';
import { ButtonsPage } from './components/buttons-page';
import { InputsPage } from './components/inputs-page';
import { ChipsPage } from './components/chips-page';
import { FeedbackPage } from './components/feedback-page';
import { DataDisplayPage } from './components/data-display-page';
import { NavigationPage } from './components/navigation-page';
import { DialogsPage } from './components/dialogs-page';
import { MenusListsPage } from './components/menus-lists-page';
import { AdminTablePrototype } from './prototypes/admin-table-prototype';
import { PartnerFormPrototype } from './prototypes/partner-form-prototype';
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
    description: 'MUI v6 components themed by Jedi.',
    entries: [
      { slug: 'buttons', title: 'Buttons', Component: ButtonsPage },
      { slug: 'inputs', title: 'Inputs', Component: InputsPage },
      { slug: 'chips', title: 'Chips', Component: ChipsPage },
      { slug: 'feedback', title: 'Feedback', Component: FeedbackPage },
      { slug: 'data-display', title: 'Data display', Component: DataDisplayPage },
      { slug: 'navigation', title: 'Navigation', Component: NavigationPage },
      { slug: 'dialogs', title: 'Dialogs', Component: DialogsPage },
      { slug: 'menus-lists', title: 'Menus & lists', Component: MenusListsPage }
    ]
  },
  {
    id: 'prototypes',
    label: 'Prototypes',
    icon: MonitorSmartphone,
    description: 'End-to-end internal-tool patterns demonstrating Jedi interaction rules.',
    entries: [
      { slug: 'admin-table', title: 'Admin table', Component: AdminTablePrototype },
      { slug: 'partner-form', title: 'Partner form', Component: PartnerFormPrototype }
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

