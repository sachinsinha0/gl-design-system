import { YStack, Typography } from '@gl/elements';
import { InstallPage, ASSET_ICONS } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/magna/skills/magna-design-system/SKILL.md?url';
import specUrl from '../../../../../../ai/magna/skills/magna-design-system/reference.md?url';

export function InstallationPage() {
  return (
    <InstallPage
      dsLabel="Magna Design System"
      tagline="Learner-facing design system — Tamagui + M3 roles, Inter, light + dark, mobile-first clarity."
      packageName="@gl/elements"
      sourcePath="packages/elements · ai/magna"
      installCommand={'# Yarn 4 workspace\nyarn workspace <your-app> add @gl/elements\n\n# or plain npm / pnpm\nnpm install @gl/elements\npnpm add @gl/elements'}
      tabs={[
        {
          id: 'skill',
          label: 'Claude skill',
          asset: {
            label: 'magna-design-system.SKILL.md',
            description: 'YAML frontmatter + full source-of-truth guidance for AI tools.',
            href: skillUrl,
            size: '~11 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'magna-design-system.SKILL.md'
          }
        },
        {
          id: 'spec',
          label: 'Markdown spec',
          asset: {
            label: 'Magna Design System.md',
            description: 'Full Markdown reference for humans — color, typography, components, accessibility.',
            href: specUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'magna-design-system.md'
          }
        },
        {
          id: 'pkg',
          label: 'Node package (coming soon)',
          disabled: true,
          asset: {
            label: '@gl/elements (npm)',
            description: 'Published Tamagui components + theme. Currently consumed via workspace.',
            href: null,
            icon: ASSET_ICONS.Package
          }
        }
      ]}
      howToUse={
        <YStack gap="$2">
          <Typography variant="body2">
            <Typography tag="strong">Claude skill (.SKILL.md)</Typography> — drop the file into{' '}
            <Typography tag="code" fontFamily="$monospace">.claude/skills/</Typography> in your project
            (or your user-level skills directory). Claude reads the frontmatter and auto-loads it when
            building learner-facing UI.
          </Typography>
          <Typography variant="body2">
            <Typography tag="strong">Markdown spec</Typography> — read it directly, or paste into ChatGPT
            / Cursor / Copilot as context. The lean version lives at{' '}
            <Typography tag="code" fontFamily="$monospace">ai/magna/skills/magna-design-system/context.md</Typography>.
          </Typography>
          <Typography variant="body2">
            <Typography tag="strong">Package</Typography> — once published, import Tamagui primitives
            from <Typography tag="code" fontFamily="$monospace">@gl/elements</Typography> and wrap your
            tree in <Typography tag="code" fontFamily="$monospace">{'<Provider>'}</Typography>. Until
            then, depend on it via the monorepo workspace.
          </Typography>
        </YStack>
      }
    />
  );
}
