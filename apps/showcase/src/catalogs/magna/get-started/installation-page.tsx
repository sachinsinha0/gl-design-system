import {
  InstallPage,
  ASSET_ICONS,
  AssetCard,
  CodeBlock,
  ComponentsBlock,
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
          id: 'git',
          label: 'Devs · Git',
          body: <GitInstallBlock dsId="magna" />,
        },
        {
          id: 'components',
          label: 'Non-devs · Components',
          body: <ComponentsBlock dsId="magna" />,
        },
      ]}
    />
  );
}
