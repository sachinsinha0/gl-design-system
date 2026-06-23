import MiniSearch from 'minisearch';
import { useMemo } from 'react';
import { listDesignSystems, type DSId } from './ds-registry';

export type SearchResult = {
  id: string;
  dsId: DSId;
  dsLabel: string;
  group: string;
  slug: string;
  title: string;
  path: string;
};

type IndexDoc = SearchResult & { searchText: string };

function buildDocs(): IndexDoc[] {
  const docs: IndexDoc[] = [];
  for (const ds of listDesignSystems()) {
    for (const group of ds.registry) {
      for (const entry of group.entries) {
        docs.push({
          id: `${ds.id}/${entry.slug}`,
          dsId: ds.id,
          dsLabel: ds.label,
          group: group.label,
          slug: entry.slug,
          title: entry.title,
          path: `/${ds.id}/${entry.slug}`,
          searchText: `${entry.title} ${group.label} ${ds.label} ${entry.slug.replace(/[-/]/g, ' ')}`
        });
      }
    }
  }
  return docs;
}

function buildIndex(): { index: MiniSearch<IndexDoc>; byId: Map<string, IndexDoc> } {
  const docs = buildDocs();
  const index = new MiniSearch<IndexDoc>({
    fields: ['title', 'group', 'dsLabel', 'searchText'],
    storeFields: ['id', 'dsId', 'dsLabel', 'group', 'slug', 'title', 'path'],
    idField: 'id',
    searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3, group: 1.5 } }
  });
  index.addAll(docs);
  return { index, byId: new Map(docs.map((d) => [d.id, d])) };
}

export function useDSSearch(query: string, limit = 8): SearchResult[] {
  const { index } = useMemo(buildIndex, []);
  return useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const hits = index.search(q).slice(0, limit);
    return hits.map((h) => ({
      id: String(h.id),
      dsId: h.dsId as DSId,
      dsLabel: h.dsLabel as string,
      group: h.group as string,
      slug: h.slug as string,
      title: h.title as string,
      path: h.path as string
    }));
  }, [query, limit, index]);
}
