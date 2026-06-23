import { useEffect, type ReactNode } from 'react';

export function GLDSProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'glds-web-styles';
    if (document.getElementById(id)) return;
    const tag = document.createElement('style');
    tag.id = id;
    document.head.appendChild(tag);
    Promise.all([
      import('./styles/tokens.css?raw'),
      import('./styles/reset.css?raw'),
      import('./styles/utilities.css?raw')
    ]).then((mods) => {
      tag.textContent = mods.map((m) => (m as any).default ?? m).join('\n');
    });
  }, []);
  return <div data-ds="glds-web" style={{ minHeight: '100%' }}>{children}</div>;
}
