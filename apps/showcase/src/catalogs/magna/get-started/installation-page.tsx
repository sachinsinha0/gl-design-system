import { YStack, XStack, Stack, Typography, Separator } from '@gl/elements';
import { InstallPage, ASSET_ICONS } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/magna/skills/magna-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/magna/skills/magna-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/magna/skills/magna-design-system/reference.md?url';
import pkgJsonUrl from '../../../../../../ai/magna/package.json?url';

function Code({ children }: { children: string }) {
  return (
    <Stack
      tag="pre"
      backgroundColor="$surfaceContainerHigh"
      borderRadius={10}
      padding="$3"
      marginTop="$2"
      overflow="hidden"
    >
      <Typography variant="caption1" fontFamily="$monospace" color="$onSurface">
        {children}
      </Typography>
    </Stack>
  );
}

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
            description: 'Full YAML-frontmatter skill — auto-loaded by Claude for learner-facing UI.',
            href: skillUrl,
            size: '~11 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'magna-design-system.SKILL.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">Drop the file into your project at:</Typography>
              <Code>{'.claude/skills/magna-design-system/SKILL.md'}</Code>
              <Typography variant="caption2" color="$onSurfaceVariant">
                Claude reads the frontmatter and triggers it on any "learner-facing UI / M3 / Tamagui" task.
              </Typography>
            </YStack>
          )
        },
        {
          id: 'context',
          label: 'Lean context (vibe)',
          asset: {
            label: 'magna-design-system.context.md',
            description: 'Compact ~1-page context — paste directly into ChatGPT, Cursor, or Copilot chat.',
            href: contextUrl,
            size: '~3 KB',
            icon: ASSET_ICONS.FileText,
            downloadAs: 'magna-design-system.context.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">
                Use this version when prompting from a chat surface that doesn't auto-load skills. Paste it
                at the top of the conversation, then describe the screen you want to build.
              </Typography>
              <Typography variant="caption2" color="$onSurfaceVariant">
                Same do/don't rules as the full reference, minus deep code examples — tuned for vibe coding
                where you trade depth for round-trip speed.
              </Typography>
            </YStack>
          )
        },
        {
          id: 'reference',
          label: 'Full reference',
          asset: {
            label: 'magna-design-system.reference.md',
            description: 'Complete spec — color, typography, components, accessibility, examples.',
            href: referenceUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'magna-design-system.reference.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">
                Attach as project-level context (Cursor "Docs" / Copilot workspace MD / Continue rules)
                when you want exhaustive guidance — tokens, full component table, accessibility checklist.
              </Typography>
            </YStack>
          )
        },
        {
          id: 'pkg',
          label: 'Node package',
          asset: {
            label: '@gl/ai-magna',
            description: 'npm package bundling skills/, guidelines/, components/, tokens/. Download manifest.',
            href: pkgJsonUrl,
            icon: ASSET_ICONS.Package,
            downloadAs: 'gl-ai-magna.package.json'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">Install:</Typography>
              <Code>{'npm install -D @gl/ai-magna\n# or\nyarn add -D @gl/ai-magna'}</Code>
              <Typography variant="body2">Then point your assistant at the installed assets:</Typography>
              <Code>{'# .claude/skills/magna-design-system  →  copy or symlink from:\nnode_modules/@gl/ai-magna/skills/magna-design-system/\n\n# AGENTS.md\nSee design rules in node_modules/@gl/ai-magna/skills/magna-design-system/SKILL.md'}</Code>
              <Separator marginVertical="$2" />
              <XStack gap="$2" flexWrap="wrap" alignItems="center">
                <Typography variant="caption2" color="$onSurfaceVariant">Ships:</Typography>
                <Typography variant="caption2" fontFamily="$monospace">skills/</Typography>
                <Typography variant="caption2" fontFamily="$monospace">guidelines/</Typography>
                <Typography variant="caption2" fontFamily="$monospace">components/</Typography>
                <Typography variant="caption2" fontFamily="$monospace">tokens/</Typography>
              </XStack>
            </YStack>
          )
        }
      ]}
    />
  );
}
