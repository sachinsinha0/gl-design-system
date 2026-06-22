import type { ComponentType } from 'react';
export type CatalogEntry = { slug: string; title: string; Component: ComponentType };
export type CatalogGroup = { id: string; label: string; entries: CatalogEntry[] };
