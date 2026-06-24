import { InstallationPage } from './get-started/installation-page';

export function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontFamily: 'Poppins, -apple-system, sans-serif' }}>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          borderRadius: 20,
          background: 'linear-gradient(135deg, #fff7f0 0%, #fdf2e3 100%)',
          border: '1px solid #fed7aa',
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            background: '#fff',
            border: '1px solid #fed7aa',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            color: '#9a3412',
            width: 'fit-content',
          }}
        >
          HTML + CSS · Marketing &amp; public web
        </span>
        <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}>
          GLDS-Web Design System
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: '#6b6b6b', maxWidth: 600, lineHeight: 1.6 }}>
          HTML + CSS recipes for Great Learning's marketing site and public pages. Scoped under{' '}
          <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.9em', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>
            [data-ds=&quot;glds-web&quot;]
          </code>
          {' '}— copy markup and paste into any stack. Poppins + Material Icons included.
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e6e6e6', margin: 0 }} />

      {/* ── Installation ───────────────────────────────────────────────────── */}
      <div>
        <p style={{ margin: '0 0 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af' }}>
          Get started
        </p>
        <InstallationPage />
      </div>
    </div>
  );
}
