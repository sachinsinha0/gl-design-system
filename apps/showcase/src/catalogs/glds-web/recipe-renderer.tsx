import { useEffect, useState } from 'react';
import { loadRecipe, type RecipeId } from '@gl/glds-web';

export function RecipeRenderer({ id }: { id: RecipeId }) {
  const [data, setData] = useState<{ markup: string; css: string } | null>(null);
  const [tab, setTab] = useState<'preview' | 'html' | 'css'>('preview');
  useEffect(() => {
    let cancelled = false;
    loadRecipe(id).then((d) => { if (!cancelled) setData({ markup: d.markup, css: d.css }); });
    return () => { cancelled = true; };
  }, [id]);
  if (!data) return <div>Loading recipe…</div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {(['preview', 'html', 'css'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '6px 12px',
              border: '1px solid #C6CBD1',
              background: tab === t ? '#1F6FEB' : 'transparent',
              color: tab === t ? '#fff' : 'inherit',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === 'preview' ? (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, background: '#fff' }}>
          <style>{data.css}</style>
          <div dangerouslySetInnerHTML={{ __html: data.markup }} />
        </div>
      ) : (
        <pre style={{ background: '#0E1116', color: '#E6E8EB', padding: 16, borderRadius: 12, overflow: 'auto', fontSize: 13, lineHeight: 1.5 }}>
          <code>{tab === 'html' ? data.markup : data.css}</code>
        </pre>
      )}
    </div>
  );
}
