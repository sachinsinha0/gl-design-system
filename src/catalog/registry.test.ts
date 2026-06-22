import { catalog, allEntries } from './registry';
test('catalog has the three top-level groups', () => {
  expect(catalog.map((g) => g.id)).toEqual(['foundations', 'components', 'prototypes']);
});
test('slugs are unique across all entries', () => {
  const slugs = allEntries().map((e) => e.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});
