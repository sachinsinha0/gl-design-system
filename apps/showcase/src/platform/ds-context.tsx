import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  type DSId,
  type DesignSystemDescriptor,
  getDesignSystem,
  hasDesignSystem,
  listDesignSystems
} from './ds-registry';

const STORAGE_KEY = 'ds.active';
const DEFAULT_DS: DSId = 'magna';

type DSContextValue = {
  activeId: DSId;
  setActiveId: (id: DSId) => void;
};

const DSContext = createContext<DSContextValue | null>(null);

function readInitialActiveId(): DSId {
  if (typeof window === 'undefined') return DEFAULT_DS;
  // URL wins on first paint: /:dsId/...
  const urlFirst = window.location.pathname.split('/')[1];
  if (urlFirst && hasDesignSystem(urlFirst)) return urlFirst;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && hasDesignSystem(stored)) return stored;
  return DEFAULT_DS;
}

export function DSProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveIdState] = useState<DSId>(readInitialActiveId);

  useEffect(() => {
    if (!hasDesignSystem(activeId)) {
      const first = listDesignSystems()[0];
      if (first && first.id !== activeId) setActiveIdState(first.id);
    }
  }, [activeId]);

  const setActiveId = useCallback((id: DSId) => {
    setActiveIdState(id);
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const value = useMemo(() => ({ activeId, setActiveId }), [activeId, setActiveId]);
  return <DSContext.Provider value={value}>{children}</DSContext.Provider>;
}

function useDSContext(): DSContextValue {
  const ctx = useContext(DSContext);
  if (!ctx) throw new Error('useDSContext must be used within a <DSProvider>');
  return ctx;
}

export function useActiveDSId(): DSId {
  return useDSContext().activeId;
}

export function useActiveDS(): DesignSystemDescriptor {
  const { activeId } = useDSContext();
  const descriptor = getDesignSystem(activeId) ?? listDesignSystems()[0];
  if (!descriptor) throw new Error('No design system is registered');
  return descriptor;
}

export function useSetActiveDS(): (id: DSId) => void {
  const { setActiveId } = useDSContext();
  const location = useLocation();
  return useCallback(
    (id: DSId) => {
      setActiveId(id);
      // Each DS owns its own native chrome (Magna=Tamagui, Jedi=MUI, GLDS-Web=HTML+CSS).
      // To avoid mounting multiple framework providers simultaneously, switching DSes
      // hard-reloads the page so only the destination DS's Shell + Provider mount fresh.
      if (typeof window === 'undefined') return;
      const first = location.pathname.split('/')[1];
      const target = first && hasDesignSystem(first) ? `/${id}` : `/${id}`;
      window.location.assign(target);
    },
    [setActiveId, location.pathname]
  );
}
