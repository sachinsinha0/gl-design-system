import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XStack, YStack, Typography } from '@gl/elements';
import { useActiveDS, useActiveDSId } from '../platform/ds-context';
import { useDSSearch } from '../platform/search-index';
import { ThemeSwitcher } from './theme-switcher';

export function TopBar() {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const homePath = `/${dsId}`;
  const { eyebrow, title } = (() => {
    if (pathname === homePath || pathname === '/') return { eyebrow: ds.label, title: 'Home' };
    for (const group of ds.registry) {
      const entry = group.entries.find((e) => `${homePath}/${e.slug}` === pathname);
      if (entry) return { eyebrow: `${ds.label} · ${group.label}`, title: entry.title };
    }
    return { eyebrow: undefined as string | undefined, title: 'GL Design Repository' };
  })();
  return (
    <XStack
      height={68}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$5"
      gap="$3"
      borderBottomWidth={1}
      borderColor="$outlineVariant"
      backgroundColor="$surface"
    >
      <YStack flexShrink={1}>
        {eyebrow ? (
          <Typography variant="overline" color="$onSurfaceVariant">
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h4">{title}</Typography>
      </YStack>
      <XStack gap="$2" alignItems="center" flexShrink={0}>
        <SearchBox />
        <ThemeSwitcher />
      </XStack>
    </XStack>
  );
}

function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const results = useDSSearch(query);

  useEffect(() => {
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
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const showDropdown = open && query.trim().length > 0 && results.length > 0;

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label="Search design systems"
        placeholder="Search…  ⌘K"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        style={{
          height: 36,
          width: 220,
          padding: '0 12px',
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.15)',
          background: 'rgba(0,0,0,0.03)',
          fontSize: 14,
          outline: 'none',
          color: 'inherit'
        }}
      />
      {showDropdown ? (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            width: 320,
            maxHeight: 360,
            overflow: 'auto',
            margin: 0,
            padding: 4,
            listStyle: 'none',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 1000
          }}
        >
          {results.map((r) => (
            <li key={r.id} role="option">
              <Link
                to={r.path}
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                }}
                style={{
                  display: 'block',
                  padding: '8px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 500 }}>{r.title}</div>
                <div style={{ fontSize: 12, opacity: 0.65 }}>
                  {r.dsLabel} · {r.group}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
