import { fonts } from '../theme';

export function useFontValue(font: string, size: string) {
  const f = fonts[font.replace('$', '')];
  const s = size.replace('$', '');
  const fontFamily = f.family;
  const fontSize = f.size[s];
  const lineHeight = f.lineHeight[s];
  const fontWeight = f.weight[s];
  const letterSpacing = f.letterSpacing[s];
  const textTransform = f.transform?.[s];
  return {
    textTransform,
    fontFamily,
    fontWeight,
    letterSpacing,
    fontSize,
    lineHeight
  };
}
