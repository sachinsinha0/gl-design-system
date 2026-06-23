import { getDesignSystem, type DSId } from './ds-registry';

type EquivalenceTable = Record<string, Partial<Record<DSId, string>>>;

const TABLE: EquivalenceTable = {
  home: { magna: 'home', jedi: 'home', 'glds-web': 'home' },
  colors: { magna: 'colors', jedi: 'colors', 'glds-web': 'tokens' },
  tokens: { magna: 'colors', jedi: 'colors', 'glds-web': 'tokens' },
  typography: { magna: 'typography', jedi: 'typography', 'glds-web': 'typography' },
  spacing: { magna: 'spacing' },
  elevation: { magna: 'elevation' },
  icons: { magna: 'icons' },
  buttons: { magna: 'buttons', jedi: 'buttons', 'glds-web': 'button' },
  button: { magna: 'buttons', jedi: 'buttons', 'glds-web': 'button' },
  inputs: { magna: 'inputs', jedi: 'colors', 'glds-web': 'text-field' },
  'text-field': { magna: 'inputs', jedi: 'colors', 'glds-web': 'text-field' },
  'text-input': { magna: 'inputs', jedi: 'colors', 'glds-web': 'text-field' },
  card: { magna: 'data-display', 'glds-web': 'card' },
  'guidelines/color': {
    magna: 'guidelines/color',
    jedi: 'guidelines/color',
    'glds-web': 'guidelines/color'
  },
  'guidelines/typography': {
    magna: 'guidelines/typography',
    jedi: 'guidelines/typography',
    'glds-web': 'guidelines/typography'
  },
  'guidelines/spacing': {
    magna: 'guidelines/spacing',
    jedi: 'guidelines/spacing',
    'glds-web': 'guidelines/spacing'
  },
  'guidelines/accessibility': {
    magna: 'guidelines/accessibility',
    jedi: 'guidelines/accessibility',
    'glds-web': 'guidelines/accessibility'
  },
  'guidelines/usage': {
    magna: 'guidelines/usage',
    jedi: 'guidelines/usage',
    'glds-web': 'guidelines/usage'
  }
};

function dsHasSlug(dsId: DSId, slug: string): boolean {
  if (slug === 'home') return true;
  const ds = getDesignSystem(dsId);
  if (!ds) return false;
  return ds.registry.some((g) => g.entries.some((e) => e.slug === slug));
}

/** Find the equivalent slug in `toDsId` for `fromSlug` in `fromDsId`. Falls back to `home`. */
export function equivalentSlug(fromDsId: DSId, fromSlug: string, toDsId: DSId): string {
  if (fromDsId === toDsId) return fromSlug;
  const row = TABLE[fromSlug];
  const candidate = row?.[toDsId];
  if (candidate && dsHasSlug(toDsId, candidate)) return candidate;
  if (dsHasSlug(toDsId, fromSlug)) return fromSlug;
  return 'home';
}
