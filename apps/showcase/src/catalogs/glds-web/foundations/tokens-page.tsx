import tokens from '@gl/glds-web/tokens/tokens.json';

export function TokensPage() {
  const colors = (tokens as any).color as Record<string, string>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ margin: 0 }}>Color tokens</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {Object.entries(colors).map(([name, value]) => (
          <div key={name} style={{ border: '1px solid #C6CBD1', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 64, background: value }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 12, color: '#41474D' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
