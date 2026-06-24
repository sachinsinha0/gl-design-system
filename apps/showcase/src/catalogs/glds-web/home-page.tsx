import { InstallationPage } from './get-started/installation-page';

export function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontFamily: 'Poppins, -apple-system, sans-serif' }}>
      <div
        style={{
          borderRadius: 24,
          background: '#fff7ed',
          padding: '48px 52px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            background: '#fff',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            color: '#b8531a',
            width: 'fit-content',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span className="material-icons" aria-hidden style={{ fontSize: 14, lineHeight: 1, color: '#b8531a' }}>
            auto_awesome
          </span>
          HTML + CSS · Poppins · Marketing
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 680 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
            }}
          >
            GLDS-Web Design System
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: '#52525b', lineHeight: 1.65 }}>
            HTML + CSS recipes for Great Learning&apos;s marketing site and public pages.
            Scoped under{' '}
            <code
              style={{
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: '0.9em',
                color: '#b8531a',
              }}
            >
              [data-ds=&quot;glds-web&quot;]
            </code>
            {' '}— copy markup into any stack, no JS framework required.
          </p>
        </div>
      </div>

      <div>
        <h2
          style={{
            margin: '0 0 16px',
            fontSize: 22,
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: '-0.01em',
          }}
        >
          Install
        </h2>
        <InstallationPage />
      </div>
    </div>
  );
}
