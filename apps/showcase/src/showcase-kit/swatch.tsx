import { YStack, XStack, Typography, useTheme } from '@gl/elements';
export type SwatchProps = { token: string };
export function Swatch({ token }: SwatchProps) {
  const theme = useTheme();
  const value = (theme as Record<string, { get?: () => string } | undefined>)[token];
  const color = value?.get?.() ?? `$${token}`;
  return (
    <YStack gap="$0.5" minWidth={120}>
      <XStack height={48} borderRadius="$2" borderWidth={1} borderColor="$outlineVariant" backgroundColor={`$${token}` as never} />
      <Typography variant="caption2">{token}</Typography>
      <Typography variant="caption2" color="$onSurfaceVariant">{String(color)}</Typography>
    </YStack>
  );
}
