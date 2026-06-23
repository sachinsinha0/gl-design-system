import type { ComponentType, ReactNode } from 'react';
import type { CatalogGroup } from '../catalogs/_shared/types';

export type DSId = 'magna' | 'jedi' | 'glds-web';

export type ThemeOption = { id: string; label: string };

export type DesignSystemDescriptor = {
  id: DSId;
  label: string;
  tech: 'tamagui' | 'mui' | 'html-css';
  Provider: ComponentType<{ children: ReactNode }>;
  registry: CatalogGroup[];
  /** Optional component rendered at the DS root index route (e.g. /magna). */
  homePage?: ComponentType;
  themes?: ThemeOption[];
  loadStyles?: () => Promise<void>;
};

const registry = new Map<DSId, DesignSystemDescriptor>();

export function registerDesignSystem(descriptor: DesignSystemDescriptor): void {
  registry.set(descriptor.id, descriptor);
}

export function getDesignSystem(id: DSId): DesignSystemDescriptor | undefined {
  return registry.get(id);
}

export function listDesignSystems(): DesignSystemDescriptor[] {
  return [...registry.values()];
}

export function hasDesignSystem(id: string): id is DSId {
  return registry.has(id as DSId);
}
