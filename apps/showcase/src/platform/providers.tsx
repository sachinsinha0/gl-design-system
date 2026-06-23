import { useEffect, useRef, type ReactNode } from 'react';
import { useActiveDS } from './ds-context';

export function ActiveDSProvider({ children }: { children: ReactNode }) {
  const descriptor = useActiveDS();
  const loadedStyles = useRef(new Set<string>());

  useEffect(() => {
    if (descriptor.loadStyles && !loadedStyles.current.has(descriptor.id)) {
      loadedStyles.current.add(descriptor.id);
      void descriptor.loadStyles();
    }
  }, [descriptor]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (descriptor.id === 'glds-web') {
      document.documentElement.dataset.ds = 'glds-web';
      return () => {
        delete document.documentElement.dataset.ds;
      };
    }
    return undefined;
  }, [descriptor.id]);

  const DSProviderComponent = descriptor.Provider;
  return <DSProviderComponent>{children}</DSProviderComponent>;
}
