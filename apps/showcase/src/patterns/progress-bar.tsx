import { Stack } from '@gl/elements';

export type ProgressBarProps = {
  /** 0–100 */
  value: number;
  height?: number;
};

export function ProgressBar({ value, height = 8 }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <Stack
      width="100%"
      height={height}
      borderRadius={999}
      backgroundColor="$surfaceVariant"
      overflow="hidden"
    >
      <Stack
        height={height}
        borderRadius={999}
        backgroundColor="$primary"
        width={`${pct}%` as never}
      />
    </Stack>
  );
}
