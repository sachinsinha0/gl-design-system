import type { ComponentType } from 'react';

export type CatalogEntry = { slug: string; title: string; Component: ComponentType };

export type CatalogGroup = {
  id: string;
  label: string;
  entries: CatalogEntry[];
  /** Lucide icon component shown beside the group in the sidebar + home cards. */
  icon?: ComponentType<{ size?: number; color?: string }>;
  /** One-line description shown on the home page group cards. */
  description?: string;
};
