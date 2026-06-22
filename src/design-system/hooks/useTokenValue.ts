import { getTokens } from 'tamagui';

export function useTokenValue(token: string, value: string) {
  const tokens = getTokens();
  return tokens[token]?.[value]?.val;
}
