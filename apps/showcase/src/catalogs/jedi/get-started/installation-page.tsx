import {
  InstallPage,
  ASSET_ICONS,
  AssetCard,
  CodeBlock,
  GitInstallBlock,
} from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/jedi/skills/jedi-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/jedi/skills/jedi-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/jedi/skills/jedi-design-system/reference.md?url';

const dim = { margin: 0, fontSize: 12, color: '#64748b' };

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="Jedi Design System"
      tagline="Internal & partner tools — MUI v6 themed by Jedi, Inter, role-driven palette."
      sourcePath="packages/jedi · ai/jedi"
      tabs={[
        {
          id: 'skill',
          label: 'Skill (.md)',
          asset: {
            label: 'jedi-design-system.SKILL.md',
            description: 'YAML-frontmatter skill — auto-loaded by Claude for internal-tool UI.',
            href: skillUrl,
            size: '~10 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'jedi-design-system.SKILL.md',
          },
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
                Drop the file into your project at:
              </p>
              <CodeBlock>{'.claude/skills/jedi-design-system/SKILL.md'}</CodeBlock>
              <p style={dim}>
                Triggers on any staff / partner-admin UI task. Don&apos;t cross-fire with Magna or GLDS-Web skills.
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
                  label: 'jedi-design-system.context.md',
                  description: 'Compact ~1-page context — paste into ChatGPT, Cursor, or Copilot chat.',
                  href: contextUrl,
                  size: '~3 KB',
                  icon: ASSET_ICONS.FileText,
                  downloadAs: 'jedi-design-system.context.md',
                }}
              />
              <AssetCard
                asset={{
                  label: 'jedi-design-system.reference.md',
                  description: 'Complete spec — MUI v6 components, jediTheme, color roles, accessibility.',
                  href: referenceUrl,
                  icon: ASSET_ICONS.FileText,
                  downloadAs: 'jedi-design-system.reference.md',
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
                <strong>For engineers wiring Jedi components.</strong> Pulls{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>skills/</code>,{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>guidelines/</code>, and{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>tokens/</code>{' '}
                — no component spec files (devs read the source under <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>packages/jedi/</code>).
              </p>
              <GitInstallBlock dsId="jedi" branch="dev" variant="dev" />
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
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>components/*.json</code>{' '}
                (machine-readable specs) and{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>components.md</code>{' '}
                (one human-readable page covering every component — anatomy, props, variants, states, a11y, examples, do-nots).
              </p>
              <GitInstallBlock dsId="jedi" branch="non-dev" variant="non-dev" />
            </div>
          ),
        },
      ]}
    />
  );
}
