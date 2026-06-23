import type { CatalogGroup } from '../_shared/types';
import { Palette, Boxes, MonitorSmartphone } from '@tamagui/lucide-icons';
import { ColorsPage } from './foundations/colors-page';
import { TypographyPage } from './foundations/typography-page';
import { SpacingPage } from './foundations/spacing-page';
import { ElevationPage } from './foundations/elevation-page';
import { IconsPage } from './foundations/icons-page';
import { ButtonsPage } from './components/buttons-page';
import { InputsPage } from './components/inputs-page';
import { SelectPage } from './components/select-page';
import { SelectionControlsPage } from './components/selection-controls-page';
import { ChipsPage } from './components/chips-page';
import { TabsPage } from './components/tabs-page';
import { AccordionPage } from './components/accordion-page';
import { DialogsPage } from './components/dialogs-page';
import { SheetPage } from './components/sheet-page';
import { FeedbackPage } from './components/feedback-page';
import { DataDisplayPage } from './components/data-display-page';
import { NavigationPage } from './components/navigation-page';
import { GridPage } from './components/grid-page';
import { PrototypesIndex } from './prototypes/prototypes-index';
import { LoginPrototype } from './prototypes/login-prototype';
import { FeedPrototype } from './prototypes/feed-prototype';
import { DetailPrototype } from './prototypes/detail-prototype';
export const catalog: CatalogGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    icon: Palette,
    description: 'Colors, type scale, spacing, elevation and icons — the visual primitives every screen is built from.',
    entries: [
      { slug: 'colors', title: 'Colors', Component: ColorsPage },
      { slug: 'typography', title: 'Typography', Component: TypographyPage },
      { slug: 'spacing', title: 'Spacing', Component: SpacingPage },
      { slug: 'elevation', title: 'Elevation', Component: ElevationPage },
      { slug: 'icons', title: 'Icons', Component: IconsPage }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    icon: Boxes,
    description: 'Ready-to-use UI building blocks from @gl/elements — buttons, inputs, overlays, navigation and more.',
    entries: [
      { slug: 'buttons', title: 'Buttons', Component: ButtonsPage },
      { slug: 'inputs', title: 'Inputs', Component: InputsPage },
      { slug: 'select', title: 'Select & MultiSelect', Component: SelectPage },
      {
        slug: 'selection-controls',
        title: 'Selection controls',
        Component: SelectionControlsPage
      },
      { slug: 'chips', title: 'Chips', Component: ChipsPage },
      { slug: 'tabs', title: 'Tabs', Component: TabsPage },
      { slug: 'accordion', title: 'Accordion', Component: AccordionPage },
      { slug: 'dialogs', title: 'Dialogs', Component: DialogsPage },
      { slug: 'sheet', title: 'Sheet & Drawer', Component: SheetPage },
      { slug: 'feedback', title: 'Feedback', Component: FeedbackPage },
      { slug: 'data-display', title: 'Data display', Component: DataDisplayPage },
      { slug: 'navigation', title: 'Navigation', Component: NavigationPage },
      { slug: 'grid', title: 'Grid', Component: GridPage }
    ]
  },
  {
    id: 'prototypes',
    label: 'Prototypes',
    icon: MonitorSmartphone,
    description: 'Full-screen mockups composed from components and patterns — copy one to start a new screen.',
    entries: [
      { slug: 'prototypes', title: 'Overview', Component: PrototypesIndex },
      { slug: 'proto-login', title: 'Login', Component: LoginPrototype },
      { slug: 'proto-feed', title: 'Learner home', Component: FeedPrototype },
      { slug: 'proto-detail', title: 'Course detail', Component: DetailPrototype }
    ]
  }
];
export function allEntries(): CatalogGroup['entries'] { return catalog.flatMap((g) => g.entries); }
