import { YStack, XStack, Stack, Typography, Separator } from '@gl/elements';
import { InstallPage, ASSET_ICONS } from '../../../platform/install-page';
import skillUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/SKILL.md?url';
import contextUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/context.md?url';
import referenceUrl from '../../../../../../ai/glds-web/skills/glds-web-design-system/reference.md?url';
import pkgJsonUrl from '../../../../../../ai/glds-web/package.json?url';

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
      dsLabel="GLDS-Web Design System"
      tagline={"Marketing & public web \u2014 plain HTML + CSS recipes, Poppins, scoped under [data-ds='glds-web']."}
      packageName="@gl/glds-web"
      sourcePath="packages/glds-web · ai/glds-web"
      installCommand={"# Yarn 4 workspace\nyarn workspace <your-site> add @gl/glds-web\n\n# or plain npm\nnpm install @gl/glds-web\n\n# Then import the global CSS once at app bootstrap:\nimport '@gl/glds-web/css/glds-web.css';"}
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
            downloadAs: 'glds-web-design-system.SKILL.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">Drop the file into your project at:</Typography>
              <Code>{'.claude/skills/glds-web-design-system/SKILL.md'}</Code>
              <Typography variant="caption2" color="$onSurfaceVariant">
                Triggers on marketing / public-site UI tasks. Reminds Claude to scope everything under{' '}
                <Typography tag="code" fontFamily="$monospace">[data-ds="glds-web"]</Typography>.
              </Typography>
            </YStack>
          )
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
            downloadAs: 'glds-web-design-system.context.md'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">
                Paste at the top of the conversation when iterating on landing pages or campaign sections.
              </Typography>
              <Typography variant="caption2" color="$onSurfaceVariant">
                Covers token vocabulary (<Typography tag="code" fontFamily="$monospace">--glds-color-*</Typography>,{' '}
                <Typography tag="code" fontFamily="$monospace">--glds-space-*</Typography>) and recipe usage.
              </Typography>
            </YStack>
          )
        },
        {
          id: 'reference',
          label: 'Full reference',
          asset: {
            label: 'glds-web-design-system.reference.md',
            description: 'Complete spec — tokens, recipes, theming under [data-ds], accessibility.',
            href: referenceUrl,
            icon: ASSET_ICONS.FileText,
            downloadAs: 'glds-web-design-system.reference.md'
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
            label: '@gl/ai-glds-web',
            description: 'npm package bundling skills/, guidelines/, components/, tokens/. Download manifest.',
            href: pkgJsonUrl,
            icon: ASSET_ICONS.Package,
            downloadAs: 'gl-ai-glds-web.package.json'
          },
          body: (
            <YStack gap="$2">
              <Typography variant="body2">Install:</Typography>
              <Code>{'npm install -D @gl/ai-glds-web\n# or\nyarn add -D @gl/ai-glds-web'}</Code>
              <Typography variant="body2">Then point your assistant at the installed assets:</Typography>
              <Code>{'# .claude/skills/glds-web-design-system  →  copy or symlink from:\nnode_modules/@gl/ai-glds-web/skills/glds-web-design-system/\n\n# AGENTS.md\nSee design rules in node_modules/@gl/ai-glds-web/skills/glds-web-design-system/SKILL.md'}</Code>
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
