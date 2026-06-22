import { getTokens, useTheme } from 'tamagui';

export function useColorValue(color: string) {
  const tokens = getTokens();
  const theme = useTheme();
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    color?.val ||
    tokens.color[color]?.val ||
    theme[color]?.val ||
    theme[color.replace('$', '')]?.val ||
    color
  );
}
