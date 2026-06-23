import { catalog, allEntries } from './registry';
test('catalog has the five top-level groups', () => {
  expect(catalog.map((g) => g.id)).toEqual([
    'get-started',
    'foundations',
    'components',
    'prototypes',
    'guidelines'
  ]);
});
test('slugs are unique across all entries', () => {
  const slugs = allEntries().map((e) => e.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});
