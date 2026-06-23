import { YStack, Typography } from '@gl/elements';
import { InstallPage, ASSET_ICONS } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/SKILL.md?url';
import specUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/reference.md?url';

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="GLDS-Web Design System"
      tagline="Marketing & public web — plain HTML + CSS recipes, Poppins, scoped under [data-ds='glds-web']."
      packageName="@gl/glds-web"
      sourcePath="packages/glds-web · ai/glds-web"
      installCommand={'# Yarn 4 workspace\nyarn workspace <your-site> add @gl/glds-web\n\n# or plain npm\nnpm install @gl/glds-web\n\n# Then import the global CSS once at app bootstrap:\nimport \'@gl/glds-web/css/glds-web.css\';'}
      tabs={[
        {
          id: 'skill',
          label: 'Claude skill',
          asset: {
            label: 'glds-web-design-system.SKILL.md',
            description: 'YAML frontmatter + full source-of-truth guidance for AI tools.',
            href: skillUrl,
            size: '~9 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'glds-web-design-system.SKILL.md'
          }
        },
        {
          id: 'spec',
          label: 'Markdown spec',
          asset: {
            label: 'GLDS-Web Design System.md',
            description: 'Full Markdown reference — tokens, recipes, theming under [data-ds].',
            href: specUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'glds-web-design-system.md'
          }
        },
        {
          id: 'pkg',
          label: 'Node package (coming soon)',
          disabled: true,
          asset: {
            label: '@gl/glds-web (npm)',
            description: 'Published HTML + CSS recipe bundle. Currently consumed via workspace.',
            href: null,
            icon: ASSET_ICONS.Package
          }
        }
      ]}
      howToUse={
        <YStack gap="$2">
          <Typography variant="body2">
            <Typography tag="strong">Claude skill (.SKILL.md)</Typography> — drop into{' '}
            <Typography tag="code" fontFamily="$monospace">.claude/skills/</Typography>. Claude auto-loads
            it when building marketing / public-site UI.
          </Typography>
          <Typography variant="body2">
            <Typography tag="strong">Markdown spec</Typography> — read or paste into any AI tool as context.
          </Typography>
          <Typography variant="body2">
            <Typography tag="strong">Package</Typography> — set{' '}
            <Typography tag="code" fontFamily="$monospace">data-ds="glds-web"</Typography> on the root
            element (or wrap with <Typography tag="code" fontFamily="$monospace">{'<GLDSProvider>'}</Typography>),
            then copy any recipe from <Typography tag="code" fontFamily="$monospace">packages/glds-web/src/recipes/</Typography>{' '}
            into your markup. Style hooks live on{' '}
            <Typography tag="code" fontFamily="$monospace">var(--glds-color-*)</Typography> and{' '}
            <Typography tag="code" fontFamily="$monospace">var(--glds-space-*)</Typography>.
          </Typography>
        </YStack>
      }
    />
  );
}
