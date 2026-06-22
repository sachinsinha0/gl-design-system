import type { CatalogGroup } from './types';
import { ColorsPage } from '../pages/foundations/colors-page';
import { TypographyPage } from '../pages/foundations/typography-page';
import { SpacingPage } from '../pages/foundations/spacing-page';
import { ElevationPage } from '../pages/foundations/elevation-page';
import { IconsPage } from '../pages/foundations/icons-page';
import { ButtonsPage } from '../pages/components/buttons-page';
import { InputsPage } from '../pages/components/inputs-page';
import { SelectPage } from '../pages/components/select-page';
import { SelectionControlsPage } from '../pages/components/selection-controls-page';
import { ChipsPage } from '../pages/components/chips-page';
import { TabsPage } from '../pages/components/tabs-page';
import { AccordionPage } from '../pages/components/accordion-page';
import { DialogsPage } from '../pages/components/dialogs-page';
import { SheetPage } from '../pages/components/sheet-page';
import { FeedbackPage } from '../pages/components/feedback-page';
import { DataDisplayPage } from '../pages/components/data-display-page';
import { NavigationPage } from '../pages/components/navigation-page';
import { GridPage } from '../pages/components/grid-page';
import { PrototypesIndex } from '../pages/prototypes/prototypes-index';
import { LoginPrototype } from '../pages/prototypes/login-prototype';
import { FeedPrototype } from '../pages/prototypes/feed-prototype';
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
  {
    id: 'components',
    label: 'Components',
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
    entries: [
      { slug: 'prototypes', title: 'Overview', Component: PrototypesIndex },
      { slug: 'proto-login', title: 'Login screen', Component: LoginPrototype },
      { slug: 'proto-feed', title: 'Feed screen', Component: FeedPrototype }
    ]
  }
];
export function allEntries(): CatalogGroup['entries'] { return catalog.flatMap((g) => g.entries); }
