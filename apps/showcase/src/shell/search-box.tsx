import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '@tamagui/lucide-icons';
import { useDSSearch } from '../platform/search-index';

/**
 * Sidebar search. ⌘K / Ctrl+K focuses the input; Esc blurs. Typography
 * inherits the sidebar's active-DS font family. Visual cues match a polished
 * command-palette input rather than a raw `<input>`.
 */
export function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
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
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 36,
          padding: '0 8px 0 10px',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.04)',
          border: `1px solid ${focused ? 'var(--ds-chrome-accent-text, #0B57D0)' : 'rgba(0,0,0,0.10)'}`,
          boxShadow: focused ? '0 0 0 3px var(--ds-chrome-accent, rgba(11,87,208,0.18))' : 'none',
          transition: 'border-color 120ms ease, box-shadow 120ms ease, background 120ms ease',
          cursor: 'text'
        }}
      >
        <Search size={15} color="currentColor" style={{ opacity: 0.55, flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          aria-label="Search design systems"
          placeholder="Search"
          value={query}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          style={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            padding: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: 13,
            lineHeight: 1.4,
            letterSpacing: 0.1,
            WebkitAppearance: 'none' as never
          }}
        />
        <kbd
          aria-hidden
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 10,
            letterSpacing: 0.4,
            padding: '2px 6px',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.12)',
            background: 'rgba(255,255,255,0.6)',
            opacity: 0.7,
            flexShrink: 0
          }}
        >
          ⌘K
        </kbd>
      </label>
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
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 10,
            boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
            zIndex: 1000,
            fontFamily: 'inherit'
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
                  color: 'inherit',
                  fontFamily: 'inherit'
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{r.title}</div>
                <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>
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
