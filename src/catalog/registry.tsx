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
      { slug: 'dialogs', title: 'Dialogs', Component: DialogsPage }
    ]
  },
  { id: 'prototypes', label: 'Prototypes', entries: [] }
];
export function allEntries(): CatalogGroup['entries'] { return catalog.flatMap((g) => g.entries); }
