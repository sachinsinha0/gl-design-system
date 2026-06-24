import { InstallPage, ASSET_ICONS, CodeBlock, GitInstallBlock } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/jedi/skills/jedi-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/jedi/skills/jedi-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/jedi/skills/jedi-design-system/reference.md?url';

const body = {
  p: (text: string) => <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>{text}</p>,
  small: (...children: React.ReactNode[]) => (
    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{children}</p>
  ),
  mono: (text: string) => (
    <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>
      {text}
    </code>
  ),
  stack: (...children: React.ReactNode[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
  ),
  row: (...children: React.ReactNode[]) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>{children}</div>
  ),
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />,
  tag: (text: string) => (
    <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, color: '#475569' }}>
      {text}
    </code>
  ),
};

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="Jedi Design System"
      tagline="Internal & partner tools — MUI v6 themed by Jedi, Inter, role-driven palette."
      packageName="@gl/jedi"
      sourcePath="packages/jedi · ai/jedi"
      installCommand={'# Inside this monorepo (MUI + Emotion already installed)\nyarn workspace <your-tool> add @gl/jedi\n\n# Fresh project (add peer deps too)\nyarn add @gl/jedi @mui/material @emotion/react @emotion/styled\nnpm install @gl/jedi @mui/material @emotion/react @emotion/styled'}
      tabs={[
        {
          id: 'skill',
          label: 'Claude skill',
          asset: {
            label: 'jedi-design-system.SKILL.md',
            description: 'Full YAML-frontmatter skill — auto-loaded by Claude for internal-tool UI.',
            href: skillUrl,
            size: '~10 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'jedi-design-system.SKILL.md',
          },
          body: body.stack(
            body.p('Drop the file into your project at:'),
            <CodeBlock key="path">{'.claude/skills/jedi-design-system/SKILL.md'}</CodeBlock>,
            body.small('Triggers on any staff / partner-admin UI task. Don\'t cross-fire with Magna or GLDS-Web skills.')
          ),
        },
        {
          id: 'context',
          label: 'Lean context (vibe)',
          asset: {
            label: 'jedi-design-system.context.md',
            description: 'Compact ~1-page context — paste into ChatGPT, Cursor, or Copilot chat.',
            href: contextUrl,
            size: '~3 KB',
            icon: ASSET_ICONS.FileText,
            downloadAs: 'jedi-design-system.context.md',
          },
          body: body.stack(
            body.p('Paste at the top of the conversation, then describe the dashboard / table / form you want.'),
            body.small(
              'Includes the must-knows: import from ',
              body.mono('@gl/jedi'),
              ', wrap in ',
              body.mono('<JediProvider>'),
              ', pull colors from ',
              body.mono('getColors(mode)'),
              '.'
            )
          ),
        },
        {
          id: 'reference',
          label: 'Full reference',
          asset: {
            label: 'jedi-design-system.reference.md',
            description: 'Complete spec — MUI v6 components, jediTheme, color roles, accessibility.',
            href: referenceUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'jedi-design-system.reference.md',
          },
          body: body.stack(
            body.p('Attach as project-level docs in Cursor / Copilot / Continue when you need exhaustive coverage.')
          ),
        },
        {
          id: 'git',
          label: 'Git install',
          body: <GitInstallBlock dsId="jedi" />,
        },
      ]}
    />
  );
}
