import { useMedia } from 'tamagui';

export function useFontByBreakpoint(font: string) {
  const media = useMedia();

  if (media.gtLg) {
    font = `${font}Desktop`;
  }

  return font;
}
