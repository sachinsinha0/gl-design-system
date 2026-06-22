import { useFontByBreakpoint } from './useFontByBreakpoint';
import { fonts } from '../theme';

function mapVariantToFont(variant) {
  let font = '$body';

  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
      font = 'heading';
      break;
    case 'subtitle1':
    case 'subtitle2':
      font = 'subtitle';
      break;
    case 'body1':
    case 'body2':
      font = 'body';
      break;
    case 'caption1':
    case 'caption2':
      font = '$caption';
      break;
    case 'overline':
      font = 'overline';
      break;
    default:
      font = 'body';
  }

  return useFontByBreakpoint(font);
}

export function useTypographyValue(variant: string) {
  const size = `$${variant}`;
  // try{

  // }catch(){
  //   console.log("error:", error);
  // }
  // const mapVariantToFont = mapVariantToFont(variant);
  const font = fonts[mapVariantToFont(variant)];

  const fontFamily = font.family;
  const fontSize = font.size[variant];
  const lineHeight = font.lineHeight[variant];
  const fontWeight = font.weight[variant];
  const letterSpacing = font.letterSpacing[variant];
  const textTransform = font.transform?.[variant];
  const color = font.color[variant];

  return {
    textTransform,
    fontFamily,
    fontWeight,
    letterSpacing,
    fontSize,
    lineHeight,
    color
  };
}
