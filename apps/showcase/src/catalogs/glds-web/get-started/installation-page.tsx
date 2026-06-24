import { InstallPage, ASSET_ICONS, CodeBlock, GitInstallBlock } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/reference.md?url';

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
      dsLabel="GLDS-Web Design System"
      tagline={"Marketing & public web — plain HTML + CSS recipes, Poppins, scoped under [data-ds='glds-web']."}
      packageName="@gl/glds-web"
      sourcePath="packages/glds-web · ai/glds-web"
      installCommand={'# Inside this monorepo\nyarn workspace <your-site> add @gl/glds-web\n\n# Fresh project\nyarn add @gl/glds-web\nnpm install @gl/glds-web\n\n# Import the global CSS once at app bootstrap:\nimport \'@gl/glds-web/css/glds-web.css\';'}
      tabs={[
        {
          id: 'skill',
          label: 'Claude skill',
          asset: {
            label: 'glds-web-design-system.SKILL.md',
            description: 'Full YAML-frontmatter skill — auto-loaded by Claude for marketing/public UI.',
            href: skillUrl,
            size: '~9 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'glds-web-design-system.SKILL.md',
          },
          body: body.stack(
            body.p('Drop the file into your project at:'),
            <CodeBlock key="path">{'.claude/skills/glds-web-design-system/SKILL.md'}</CodeBlock>,
            body.small(
              'Triggers on marketing / public-site UI tasks. Reminds Claude to scope everything under ',
              body.mono('[data-ds="glds-web"]'),
              '.'
            )
          ),
        },
        {
          id: 'context',
          label: 'Lean context (vibe)',
          asset: {
            label: 'glds-web-design-system.context.md',
            description: 'Compact ~1-page context — paste into ChatGPT, Cursor, or Copilot chat.',
            href: contextUrl,
            size: '~3 KB',
            icon: ASSET_ICONS.FileText,
            downloadAs: 'glds-web-design-system.context.md',
          },
          body: body.stack(
            body.p('Paste at the top of the conversation when iterating on landing pages or campaign sections.'),
            body.small(
              'Covers token vocabulary (',
              body.mono('--glds-color-*'),
              ', ',
              body.mono('--glds-space-*'),
              ') and recipe usage.'
            )
          ),
        },
        {
          id: 'reference',
          label: 'Full reference',
          asset: {
            label: 'glds-web-design-system.reference.md',
            description: 'Complete spec — tokens, recipes, theming under [data-ds], accessibility.',
            href: referenceUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'glds-web-design-system.reference.md',
          },
          body: body.stack(
            body.p('Attach as project-level docs in Cursor / Copilot / Continue when you need exhaustive coverage.')
          ),
        },
        {
          id: 'git',
          label: 'Git install',
          body: <GitInstallBlock dsId="glds-web" />,
        },
      ]}
    />
  );
}
