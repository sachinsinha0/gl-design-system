import { YStack, Typography } from '@gl/elements';
import { InstallPage, ASSET_ICONS } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/jedi/skills/jedi-design-system/SKILL.md?url';
import specUrl from '../../../../../../ai/jedi/skills/jedi-design-system/reference.md?url';

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="Jedi Design System"
      tagline="Internal & partner tools — MUI v6 themed by Jedi, Inter, role-driven palette."
      packageName="@gl/jedi"
      sourcePath="packages/jedi · ai/jedi"
      installCommand={'# Yarn 4 workspace\nyarn workspace <your-tool> add @gl/jedi @mui/material @emotion/react @emotion/styled\n\n# or plain npm\nnpm install @gl/jedi @mui/material @emotion/react @emotion/styled'}
      tabs={[
        {
          id: 'skill',
          label: 'Claude skill',
          asset: {
            label: 'jedi-design-system.SKILL.md',
            description: 'YAML frontmatter + full source-of-truth guidance for AI tools.',
            href: skillUrl,
            size: '~10 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'jedi-design-system.SKILL.md'
          }
        },
        {
          id: 'spec',
          label: 'Markdown spec',
          asset: {
            label: 'Jedi Design System.md',
            description: 'Full Markdown reference — MUI v6 components, jediTheme, getColors(mode).',
            href: specUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'jedi-design-system.md'
          }
        },
        {
          id: 'pkg',
          label: 'Node package (coming soon)',
          disabled: true,
          asset: {
            label: '@gl/jedi (npm)',
            description: 'Published MUI v6 wrapper + theme. Currently consumed via workspace.',
            href: null,
            icon: ASSET_ICONS.Package
          }
        }
      ]}
      howToUse={
        <YStack gap="$2">
          <Typography variant="body2">
            <Typography tag="strong">Claude skill (.SKILL.md)</Typography> — drop into{' '}
            <Typography tag="code" fontFamily="$monospace">.claude/skills/</Typography>. Claude auto-loads it
            when building staff or partner-admin UI. Don't cross-fire with Magna or GLDS-Web skills.
          </Typography>
          <Typography variant="body2">
            <Typography tag="strong">Markdown spec</Typography> — read or paste into any AI tool as context.
          </Typography>
          <Typography variant="body2">
            <Typography tag="strong">Package</Typography> — import from{' '}
            <Typography tag="code" fontFamily="$monospace">@gl/jedi</Typography> (never directly from{' '}
            <Typography tag="code" fontFamily="$monospace">@mui/material</Typography>); wrap regions in{' '}
            <Typography tag="code" fontFamily="$monospace">{'<JediProvider>'}</Typography> and pull colors
            from <Typography tag="code" fontFamily="$monospace">getColors(mode)</Typography> or the CSS
            variables Jedi emits.
          </Typography>
        </YStack>
      }
    />
  );
}
