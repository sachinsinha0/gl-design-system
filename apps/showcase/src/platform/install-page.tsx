import { useState, type ComponentType, type ReactNode } from 'react';
import { YStack, XStack, Stack, Typography, Separator } from '@gl/elements';
import { Download, FileCode, FileText, Package } from '@tamagui/lucide-icons';

export type InstallAsset = {
  /** Visible label, e.g. "magna-design-system.skill" or "Magna Design System.md" */
  label: string;
  /** Short description shown under the label */
  description: string;
  /** Resolved URL (use Vite `?url` import) for downloading the asset, or null if N/A. */
  href: string | null;
  /** Approximate size string ("10.6 KB"). */
  size?: string;
  /** Suggested download filename. Falls back to label. */
  downloadAs?: string;
  /** Override download icon. */
  icon?: ComponentType<{ size?: number; color?: string }>;
  /** Optional badge text (e.g. "coming soon") shown next to the title. */
  badge?: string;
};

export type InstallTab = {
  id: string;
  label: string;
  /** Tab is selectable but renders a "coming soon" placeholder if disabled. */
  disabled?: boolean;
  asset?: InstallAsset;
  /** Free-form per-tab body, rendered below the asset card. */
  body?: ReactNode;
};

export type InstallPageProps = {
  dsLabel: string;
  tagline: string;
  packageName: string;
  /** Two-line `yarn add` style command, shown in the install snippet. */
  installCommand: string;
  /** Repo-relative path shown in a "View source" caption. */
  sourcePath?: string;
  /** Tabs in display order. First non-disabled tab is selected on mount. */
  tabs: InstallTab[];
  /** Optional how-to-use blocks rendered under the tabs. */
  howToUse?: ReactNode;
};

function AssetCard({ asset }: { asset: InstallAsset }) {
  const Icon = asset.icon ?? FileCode;
  const disabled = !asset.href;
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      padding="$3"
      borderWidth={1}
      borderColor="$primary"
      borderRadius={12}
      gap="$3"
      backgroundColor="$surfaceContainerLow"
    >
      <XStack alignItems="center" gap="$3" flex={1}>
        <Stack
          width={40}
          height={40}
          borderRadius={10}
          backgroundColor="$primaryContainer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon size={20} color="$onPrimaryContainer" />
        </Stack>
        <YStack flex={1}>
          <Typography variant="subtitle1">{asset.label}</Typography>
          <Typography variant="caption2" color="$onSurfaceVariant">
            {asset.description}
            {asset.size ? ` · ${asset.size}` : ''}
          </Typography>
        </YStack>
      </XStack>
      {disabled ? (
        <Stack
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderRadius={8}
          backgroundColor="$surfaceContainerHigh"
        >
          <Typography variant="caption2" color="$onSurfaceVariant">
            Coming soon
          </Typography>
        </Stack>
      ) : (
        <a
          href={asset.href ?? '#'}
          download={asset.downloadAs ?? asset.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 10,
            background: 'var(--primary, #0066FF)',
            color: 'var(--onPrimary, #fff)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: 0.4,
            textTransform: 'uppercase'
          }}
        >
          <Download size={16} />
          Download
        </a>
      )}
    </XStack>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <Stack
      tag="pre"
      backgroundColor="$surfaceContainerHigh"
      borderRadius={10}
      padding="$3"
      overflow="hidden"
    >
      <Typography variant="caption1" fontFamily="$monospace" color="$onSurface">
        {children}
      </Typography>
    </Stack>
  );
}

export function InstallPage(props: InstallPageProps) {
  const { dsLabel, tagline, packageName, installCommand, sourcePath, tabs, howToUse } = props;
  const firstEnabled = tabs.find((t) => !t.disabled) ?? tabs[0];
  const [activeId, setActiveId] = useState(firstEnabled?.id);
  const active = tabs.find((t) => t.id === activeId) ?? firstEnabled;

  return (
    <YStack gap="$4" width="100%">
      <YStack gap="$1">
        <Typography variant="h3">{dsLabel}</Typography>
        <Typography variant="body1" color="$onSurfaceVariant">
          {tagline}
        </Typography>
        {sourcePath ? (
          <Typography variant="caption2" color="$onSurfaceVariant">
            Source · {sourcePath}
          </Typography>
        ) : null}
      </YStack>

      <XStack gap="$0" borderBottomWidth={1} borderColor="$outlineVariant">
        {tabs.map((t) => {
          const isActive = t.id === active?.id;
          return (
            <XStack
              key={t.id}
              tag="button"
              role="tab"
              aria-selected={isActive}
              onPress={() => setActiveId(t.id)}
              paddingHorizontal="$3"
              paddingVertical="$2.5"
              borderBottomWidth={2}
              borderColor={isActive ? '$primary' : 'transparent'}
              cursor="pointer"
              hoverStyle={{ backgroundColor: '$surfaceContainerHigh' }}
              backgroundColor="transparent"
              borderWidth={0}
            >
              <Typography
                variant="body2"
                color={isActive ? '$primary' : '$onSurfaceVariant'}
              >
                {t.label}
              </Typography>
            </XStack>
          );
        })}
      </XStack>

      {active?.asset ? <AssetCard asset={active.asset} /> : null}
      {active?.body}

      <Separator />

      <YStack gap="$2">
        <Typography variant="overline" color="$onSurfaceVariant">
          Install the package
        </Typography>
        <Typography variant="body2" color="$onSurface">
          Inside any workspace that consumes {dsLabel}:
        </Typography>
        <CodeBlock>{installCommand}</CodeBlock>
        <Typography variant="caption2" color="$onSurfaceVariant">
          Package: <Typography tag="code" fontFamily="$monospace">{packageName}</Typography>
        </Typography>
      </YStack>

      {howToUse ? (
        <>
          <Separator />
          <YStack gap="$2">
            <Typography variant="overline" color="$onSurfaceVariant">
              How to use
            </Typography>
            {howToUse}
          </YStack>
        </>
      ) : null}
    </YStack>
  );
}

export const ASSET_ICONS = { FileCode, FileText, Package, Download };
