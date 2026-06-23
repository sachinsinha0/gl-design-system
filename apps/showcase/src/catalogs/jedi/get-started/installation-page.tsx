import { YStack, XStack, Stack, Typography, Separator } from '@gl/elements';
import { InstallPage, ASSET_ICONS } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/jedi/skills/jedi-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/jedi/skills/jedi-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/jedi/skills/jedi-design-system/reference.md?url';
import pkgJsonUrl from '../../../../../../ai/jedi/package.json?url';

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
            description: 'Full YAML-frontmatter skill — auto-loaded by Claude for internal-tool UI.',
            href: skillUrl,
            size: '~10 KB',
            icon: ASSET_ICONS.FileCode,
            downloadAs: 'jedi-design-system.SKILL.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">Drop the file into your project at:</Typography>
              <Code>{'.claude/skills/jedi-design-system/SKILL.md'}</Code>
              <Typography variant="caption2" color="$onSurfaceVariant">
                Triggers on any staff / partner-admin UI task. Don't cross-fire with Magna or GLDS-Web skills.
              </Typography>
            </YStack>
          )
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
            downloadAs: 'jedi-design-system.context.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">
                Paste at the top of the conversation, then describe the dashboard / table / form you want.
              </Typography>
              <Typography variant="caption2" color="$onSurfaceVariant">
                Includes the must-knows: import from <Typography tag="code" fontFamily="$monospace">@gl/jedi</Typography>,
                wrap in <Typography tag="code" fontFamily="$monospace">{'<JediProvider>'}</Typography>, pull colors from
                <Typography tag="code" fontFamily="$monospace"> getColors(mode)</Typography>.
              </Typography>
            </YStack>
          )
        },
        {
          id: 'reference',
          label: 'Full reference',
          asset: {
            label: 'jedi-design-system.reference.md',
            description: 'Complete spec — MUI v6 components, jediTheme, color roles, accessibility.',
            href: referenceUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'jedi-design-system.reference.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">
                Attach as project-level docs in Cursor / Copilot / Continue when you need exhaustive coverage.
              </Typography>
            </YStack>
          )
        },
        {
          id: 'pkg',
          label: 'Node package',
          asset: {
            label: '@gl/ai-jedi',
            description: 'npm package bundling skills/, guidelines/, components/, tokens/. Download manifest.',
            href: pkgJsonUrl,
            icon: ASSET_ICONS.Package,
            downloadAs: 'gl-ai-jedi.package.json'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">Install:</Typography>
              <Code>{'npm install -D @gl/ai-jedi\n# or\nyarn add -D @gl/ai-jedi'}</Code>
              <Typography variant="body2">Then point your assistant at the installed assets:</Typography>
              <Code>{'# .claude/skills/jedi-design-system  →  copy or symlink from:\nnode_modules/@gl/ai-jedi/skills/jedi-design-system/\n\n# AGENTS.md\nSee design rules in node_modules/@gl/ai-jedi/skills/jedi-design-system/SKILL.md'}</Code>
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
