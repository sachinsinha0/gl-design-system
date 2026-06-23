export function TypographyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontSize: 44, fontWeight: 700, margin: 0 }}>Heading 1</h1>
      <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Heading 2</h2>
      <h3 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Heading 3</h3>
      <p style={{ fontSize: 16, margin: 0 }}>Body — the quick brown fox jumps over the lazy dog.</p>
      <small style={{ fontSize: 12 }}>Caption — the quick brown fox jumps over the lazy dog.</small>
    </div>
  );
}
