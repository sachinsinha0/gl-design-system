import type { ComponentType, ReactNode } from 'react';
import type { CatalogGroup } from '../catalogs/_shared/types';

export type DSId = 'magna' | 'jedi' | 'glds-web';

export type ThemeOption = { id: string; label: string };

/**
 * Sidebar / chrome look-and-feel for a DS. Applied via CSS variables on the
 * sidebar root so switching DSes visibly retunes the shell (font + accent),
 * even though the structural primitives stay Tamagui.
 */
export type DSChrome = {
  /** Font stack used inside the sidebar for that DS. */
  fontFamily: string;
  /** Background color for the active nav row + DS switcher selected state. */
  accent: string;
  /** Foreground color for active nav row text/icon. */
  accentText: string;
};

export type DesignSystemDescriptor = {
  id: DSId;
  label: string;
  /** 2-3 word audience summary shown under the DS name in the sidebar switcher. */
  tagline: string;
  tech: 'tamagui' | 'mui' | 'html-css';
  Provider: ComponentType<{ children: ReactNode }>;
  registry: CatalogGroup[];
  /** Optional component rendered at the DS root index route (e.g. /magna). */
  homePage?: ComponentType;
  themes?: ThemeOption[];
  loadStyles?: () => Promise<void>;
  /** Optional sidebar accent + font; falls back to Magna defaults if absent. */
  chrome?: DSChrome;
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
