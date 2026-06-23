import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDSSearch } from '../platform/search-index';

/**
 * Compact sidebar search box. Cmd/Ctrl+K focuses the input from anywhere.
 * Results dropdown opens below and shows up to 8 cross-DS matches.
 */
export function SearchBox() {
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
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
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
          height: 34,
          width: '100%',
          padding: '0 12px',
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.15)',
          background: 'rgba(0,0,0,0.04)',
          fontSize: 13,
          outline: 'none',
          color: 'inherit',
          boxSizing: 'border-box'
        }}
      />
      {showDropdown ? (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            maxHeight: 360,
            overflow: 'auto',
            margin: 0,
            padding: 4,
            listStyle: 'none',
            background: 'var(--surface, #fff)',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
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
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.title}</div>
                <div style={{ fontSize: 11, opacity: 0.65 }}>
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
