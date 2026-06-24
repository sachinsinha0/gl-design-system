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
          label: 'Non-devs',
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
                <strong>For designers, PMs, and partners.</strong> Same as the dev pull plus{' '}
                <code style={mono}>components/*.json</code> (machine-readable specs) and{' '}
                <code style={mono}>components.md</code> (one human-readable page covering every component — anatomy, props, variants, states, a11y, examples, do-nots).
              </p>
              <GitInstallBlock dsId="glds-web" branch="non-dev" variant="non-dev" />
            </div>
          ),
        },
      ]}
    />
  );
}
