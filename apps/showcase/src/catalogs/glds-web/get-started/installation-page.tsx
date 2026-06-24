import {
  InstallPage,
  ASSET_ICONS,
  AssetCard,
  CodeBlock,
  GitInstallBlock,
} from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/reference.md?url';

const dim = { margin: 0, fontSize: 12, color: '#64748b' };
const mono: React.CSSProperties = {
  fontFamily: 'ui-monospace, Menlo, monospace',
  background: '#f1f5f9',
  padding: '1px 5px',
  borderRadius: 4,
};

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="GLDS-Web Design System"
      tagline={"Marketing & public web — plain HTML + CSS recipes, Poppins, scoped under [data-ds='glds-web']."}
      sourcePath="packages/glds-web · ai/glds-web"
      tabs={[
        {
          id: 'skill',
          label: 'Skill (.md)',
          asset: {
            label: 'glds-web-design-system.SKILL.md',
            description: 'YAML-frontmatter skill — auto-loaded by Claude for marketing/public UI.',
            href: skillUrl,
            size: '~9 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'glds-web-design-system.SKILL.md',
          },
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
                Drop the file into your project at:
              </p>
              <CodeBlock>{'.claude/skills/glds-web-design-system/SKILL.md'}</CodeBlock>
              <p style={dim}>
                Triggers on marketing / public-site UI tasks. Reminds Claude to scope everything under{' '}
                <code style={mono}>[data-ds=&quot;glds-web&quot;]</code>.
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                }}
              >
                Also ships in the same folder
              </p>
              <AssetCard
                asset={{
                  label: 'glds-web-design-system.context.md',
                  description: 'Compact ~1-page context — paste into ChatGPT, Cursor, or Copilot chat.',
                  href: contextUrl,
                  size: '~3 KB',
                  icon: ASSET_ICONS.FileText,
                  downloadAs: 'glds-web-design-system.context.md',
                }}
              />
              <AssetCard
                asset={{
                  label: 'glds-web-design-system.reference.md',
                  description: 'Complete spec — tokens, recipes, theming under [data-ds], accessibility.',
                  href: referenceUrl,
                  icon: ASSET_ICONS.FileText,
                  downloadAs: 'glds-web-design-system.reference.md',
                }}
              />
            </div>
          ),
        },
        {
          id: 'dev',
          label: 'Devs',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
                <strong>For engineers wiring GLDS-Web markup.</strong> Pulls{' '}
                <code style={mono}>skills/</code>, <code style={mono}>guidelines/</code>, and <code style={mono}>tokens/</code>{' '}
                — no component spec files (devs read the source under <code style={mono}>packages/glds-web/</code>).
              </p>
              <GitInstallBlock dsId="glds-web" branch="dev" variant="dev" />
            </div>
          ),
        },
        {
          id: 'non-dev',
          label: 'Rails / Non-JS',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                padding: '12px 16px',
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: 10,
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 18, lineHeight: 1.2, flexShrink: 0 }}>⚠️</span>
                <div>
                  <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14, color: '#9a3412' }}>
                    npm / Yarn won&apos;t work for Rails apps
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: '#7c2d12' }}>
                    GLDS-Web ships as plain HTML + CSS, not a JS package. There&apos;s no <code style={mono}>npm install @gl/glds-web</code> that
                    works in a Rails asset pipeline. Use the Skill or context.md files above instead — download from the <strong>Skill (.md)</strong> tab.
                  </p>
                </div>
              </div>
              <div style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 10,
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 18, lineHeight: 1.2, flexShrink: 0 }}>💎</span>
                <div>
                  <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14, color: '#166534' }}>
                    Ruby gem — coming soon
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: '#15803d' }}>
                    A <code style={mono}>gl-glds-web</code> Ruby gem will let you drop GLDS-Web into any Rails app via the asset pipeline.
                    Until then, copy the CSS recipes directly from the <strong>Components</strong> section above, or pull the AI skill with degit.
                  </p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
                For non-JS contexts that still want AI-assisted design, pull the full AI context via degit below:
              </p>
              <GitInstallBlock dsId="glds-web" branch="non-dev" variant="non-dev" />
            </div>
          ),
        },
      ]}
    />
  );
}
