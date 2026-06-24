import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useActiveDS, useActiveDSId, useSetActiveDS } from './ds-context';
import { listDesignSystems, hasDesignSystem, type DSId } from './ds-registry';
import { equivalentSlug } from './ds-equivalence';

/* Shared DS switcher — zero framework dependency, identical across Magna/Jedi/GLDS-Web.
   Uses only inline styles so MUI/Tamagui baselines can't override spacing or font. */

function ChevronIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 9l4-4 4 4" />
      <path d="M8 15l4 4 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: { position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '12px',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    color: 'inherit',
    fontFamily: 'inherit',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
    color: '#fff',
  },
  nameWrap: { flex: 1, minWidth: 0, textAlign: 'left' },
  name: { display: 'block', fontWeight: 600, fontSize: 14, lineHeight: 1.3, color: 'inherit' },
  tagline: { display: 'block', fontSize: 11, color: '#6b7280', marginTop: 1 },
  chevron: { color: '#9ca3af', flexShrink: 0, display: 'flex' },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 8,
    right: 8,
    marginTop: 4,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    boxShadow: '0 10px 32px rgba(0,0,0,0.13)',
    padding: 4,
    zIndex: 2000,
    listStyle: 'none',
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
    padding: '10px 10px',
    background: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#111827',
  },
  checkCol: { width: 16, flexShrink: 0, marginTop: 2, display: 'flex' },
  itemName: { display: 'block', fontWeight: 600, fontSize: 13, lineHeight: 1.3 },
  itemTagline: { display: 'block', fontSize: 11, color: '#6b7280', marginTop: 2 },
};

/** Avatar background per DS id — keeps each DS visually distinct in the switcher. */
const DS_COLOR: Record<string, string> = {
  magna: '#6750a4',
  jedi: '#1565c0',
  'glds-web': '#b8531a',
};

export function SharedDSSwitcher() {
  const activeId = useActiveDSId();
  const ds = useActiveDS();
  const setActive = useSetActiveDS();
  const { pathname } = useLocation();
  const systems = listDesignSystems();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function switchTo(newId: DSId) {
    setOpen(false);
    if (newId === activeId) return;
    const parts = pathname.split('/').filter(Boolean);
    const [first, ...rest] = parts;
    const currentSlug = first && hasDesignSystem(first) && rest.length > 0 ? rest.join('/') : 'home';
    const targetSlug = equivalentSlug(activeId, currentSlug, newId);
    if (typeof window !== 'undefined' && targetSlug !== 'home') {
      window.localStorage.setItem('ds.pendingSlug', targetSlug);
    }
    setActive(newId);
  }

  const avatarBg = DS_COLOR[activeId] ?? '#374151';

  return (
    <div ref={rootRef} style={S.root}>
      <button
        type="button"
        style={{ ...S.trigger, background: open ? 'rgba(0,0,0,0.04)' : 'transparent' }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Switch design system. Current: ${ds.label}`}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = open ? 'rgba(0,0,0,0.04)' : 'transparent'; }}
      >
        <span style={{ ...S.avatar, background: avatarBg }}>
          {ds.label.slice(0, 2).toUpperCase()}
        </span>
        <span style={S.nameWrap}>
          <strong style={S.name}>{ds.label}</strong>
          <span style={S.tagline}>{ds.tagline}</span>
        </span>
        <span style={S.chevron}><ChevronIcon /></span>
      </button>

      {open ? (
        <ul style={S.menu} role="listbox">
          {systems.map((d) => {
            const isActive = d.id === activeId;
            const isHovered = hovered === d.id;
            return (
              <li key={d.id} style={{ listStyle: 'none' }}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  style={{
                    ...S.item,
                    background: isActive ? '#eff6ff' : isHovered ? '#f3f4f6' : 'transparent',
                    color: isActive ? '#1d4ed8' : '#111827',
                  }}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => switchTo(d.id)}
                >
                  <span style={S.checkCol}>
                    {isActive ? <CheckIcon /> : null}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong style={S.itemName}>{d.label}</strong>
                    <span style={S.itemTagline}>{d.tagline}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
