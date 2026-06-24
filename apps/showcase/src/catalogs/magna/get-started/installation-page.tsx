import {
  InstallPage,
  ASSET_ICONS,
  AssetCard,
  CodeBlock,
  GitInstallBlock,
} from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/magna/skills/magna-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/magna/skills/magna-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/magna/skills/magna-design-system/reference.md?url';

const dim = { margin: 0, fontSize: 12, color: '#64748b' };

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="Magna Design System"
      tagline="Learner-facing design system — Tamagui + M3 roles, Inter, light + dark, mobile-first clarity."
      sourcePath="packages/elements · ai/magna"
      tabs={[
        {
          id: 'skill',
          label: 'Skill (.md)',
          asset: {
            label: 'magna-design-system.SKILL.md',
            description: 'YAML-frontmatter skill — auto-loaded by Claude for learner-facing UI.',
            href: skillUrl,
            size: '~11 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'magna-design-system.SKILL.md',
          },
          body: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
                Drop the file into your project at:
              </p>
              <CodeBlock>{'.claude/skills/magna-design-system/SKILL.md'}</CodeBlock>
              <p style={dim}>
                Claude reads the frontmatter and triggers on any "learner-facing UI / M3 / Tamagui" task.
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
                  label: 'magna-design-system.context.md',
                  description: 'Compact ~1-page context — paste into ChatGPT, Cursor, or Copilot chat.',
                  href: contextUrl,
                  size: '~3 KB',
                  icon: ASSET_ICONS.FileText,
                  downloadAs: 'magna-design-system.context.md',
                }}
              />
              <AssetCard
                asset={{
                  label: 'magna-design-system.reference.md',
                  description: 'Complete spec — color, typography, components, accessibility, examples.',
                  href: referenceUrl,
                  icon: ASSET_ICONS.FileText,
                  downloadAs: 'magna-design-system.reference.md',
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
                <strong>For engineers wiring Magna components.</strong> Pulls{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>skills/</code>,{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>guidelines/</code>, and{' '}
                <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>tokens/</code>{' '}
                — no component spec files (devs read the source under <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>packages/elements/</code>).
              </p>
              <GitInstallBlock dsId="magna" branch="dev" variant="dev" />
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
              <GitInstallBlock dsId="magna" branch="non-dev" variant="non-dev" />
            </div>
          ),
        },
      ]}
    />
  );
}
