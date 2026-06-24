import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GLDSProvider } from '@gl/glds-web';
import { useActiveDS, useActiveDSId, useSetActiveDS } from '../../../platform/ds-context';
import { listDesignSystems, hasDesignSystem, type DSId } from '../../../platform/ds-registry';
import { equivalentSlug } from '../../../platform/ds-equivalence';
import { useDSSearch } from '../../../platform/search-index';
import { usePageHeader } from '../../../platform/page-header';
import './glds-shell.css';

function DSSwitcher() {
  const activeId = useActiveDSId();
  const ds = useActiveDS();
  const setActive = useSetActiveDS();
  const { pathname } = useLocation();
  const systems = listDesignSystems();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

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

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="glds-shell__ds-switch"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Switch design system. Current: ${ds.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="glds-shell__avatar">{ds.label.slice(0, 2).toUpperCase()}</span>
        <span className="glds-shell__ds-name">
          <strong>{ds.label}</strong>
          <span>{ds.tagline}</span>
        </span>
        <span className="glds-shell__chevron" aria-hidden>⇅</span>
      </button>
      {open ? (
        <ul className="glds-shell__menu" role="listbox">
          {systems.map((d) => {
            const isActive = d.id === activeId;
            return (
              <li key={d.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className="glds-shell__menu-item"
                  onClick={() => switchTo(d.id)}
                >
                  <span className="glds-shell__check" aria-hidden>{isActive ? '✓' : ''}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <strong>{d.label}</strong>
                    <span>{d.tagline}</span>
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

function GLDSSearch() {
  const activeId = useActiveDSId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useDSSearch(query);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  function navigateTo(path: string, targetDsId: DSId) {
    setQuery('');
    setOpen(false);
    if (targetDsId !== activeId) {
      window.location.assign(path);
    } else {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  const showResults = open && query.trim().length > 0 && results.length > 0;

  return (
    <div ref={wrapperRef} className="glds-shell__search">
      <label className="glds-shell__search-input">
        <span aria-hidden style={{ color: '#6b6b6b', flexShrink: 0 }}>⌕</span>
        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          aria-label="Search design systems"
          placeholder="Search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />
      </label>
      {showResults ? (
        <ul className="glds-shell__search-results" role="listbox">
          {results.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                className="glds-shell__result"
                role="option"
                onClick={() => navigateTo(r.path, r.dsId)}
              >
                <strong>{r.title}</strong>
                <span>{r.dsLabel} · {r.group}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function GLDSThemeSwitcher() {
  const [dark, setDark] = useState(false);
  return (
    <button
      type="button"
      className="glds-shell__theme-btn"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDark((v) => !v)}
    >
      <span aria-hidden style={{ fontSize: 16 }}>{dark ? '☀' : '☾'}</span>
    </button>
  );
}

function GLDSPageHeader() {
  const { eyebrow, title } = usePageHeader();
  return (
    <div>
      {eyebrow ? <span className="glds-shell__eyebrow">{eyebrow}</span> : null}
      <h1 className="glds-shell__title">{title}</h1>
    </div>
  );
}

function GLDSSidebar() {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const homePath = `/${dsId}`;
  return (
    <aside className="glds-shell__aside">
      <DSSwitcher />
      <GLDSSearch />
      <hr className="glds-shell__divider" />
      <ul className="glds-shell__nav">
        <li>
          <Link
            to={homePath}
            className="glds-shell__nav-link"
            aria-current={pathname === homePath ? 'page' : undefined}
          >
            <span aria-hidden>⌂</span> Home
          </Link>
        </li>
        {ds.registry.map((group) => {
          const GroupIcon = group.icon as ComponentType<{ size?: number; color?: string }> | undefined;
          return (
            <li key={group.id} className="glds-shell__group">
              <div className="glds-shell__group-label">
                {GroupIcon ? <GroupIcon size={12} color="currentColor" /> : null}
                {group.label}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {group.entries.map((entry) => {
                  const to = `${homePath}/${entry.slug}`;
                  return (
                    <li key={entry.slug}>
                      <Link
                        to={to}
                        className="glds-shell__nav-link"
                        aria-current={pathname === to ? 'page' : undefined}
                      >
                        {entry.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <hr className="glds-shell__divider" />
      <div className="glds-shell__footer">
        <GLDSThemeSwitcher />
      </div>
    </aside>
  );
}

export function GLDSShell({ children }: { children: ReactNode }) {
  return (
    <GLDSProvider>
      <div className="glds-shell">
        <GLDSSidebar />
        <main className="glds-shell__main">
          <div className="glds-shell__main-inner">
            <div className="glds-shell__content">
              <GLDSPageHeader />
              {children}
            </div>
          </div>
        </main>
      </div>
    </GLDSProvider>
  );
}
