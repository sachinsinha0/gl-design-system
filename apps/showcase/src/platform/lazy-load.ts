import type { DSId } from './ds-registry';

const loaders: Partial<Record<DSId, Promise<void>>> = {};

const importers: Partial<Record<DSId, () => Promise<unknown>>> = {
  magna: () => import('../catalogs/magna')
};

export function loadCatalog(id: DSId): Promise<void> {
  if (loaders[id]) return loaders[id]!;
  const importer = importers[id];
  if (!importer) return Promise.resolve();
  const promise = importer().then(() => undefined);
  loaders[id] = promise;
  return promise;
}
