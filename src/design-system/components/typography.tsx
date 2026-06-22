import { useFontByBreakpoint } from '../hooks/index';
import { GetProps, styled, Text, TextProps } from '@tamagui/core';

function mapVariantToFont(variant) {
  let font = '$body';

  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
      font = '$heading';
      break;
    case 'subtitle1':
    case 'subtitle2':
      font = '$subtitle';
      break;
    case 'body1':
    case 'body2':
      font = '$body';
      break;
    case 'caption1':
    case 'caption2':
      font = '$caption';
      break;
    case 'overline':
      font = '$overline';
      break;
    default:
      font = '$body';
  }

  return useFontByBreakpoint(font);
}

function getVariantStyle(variant, { props, fonts }) {
  const size = `$${variant}`;

  const font = fonts[mapVariantToFont(variant)];
  const fontFamily = font.family;
  const fontSize = props.fontSize || font.size[size];
  const lineHeight = props.lineHeight || font.lineHeight[size];
  const fontWeight = props.fontWeight || font.weight[size];
  const letterSpacing = props.letterSpacing || font.letterSpacing[size];
  const textTransform = props.textTransform || font.transform?.[size];
  const color = props.color || props.textColor || font.color[size];

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

export const Typography = styled(Text, {
  name: 'Typography',
  variants: {
    variant: {
      h1: getVariantStyle,
      h2: getVariantStyle,
      h3: getVariantStyle,
      h4: getVariantStyle,
      h5: getVariantStyle,
      subtitle1: getVariantStyle,
      subtitle2: getVariantStyle,
      body1: getVariantStyle,
      body2: getVariantStyle,
      caption1: getVariantStyle,
      caption2: getVariantStyle,
      overline: getVariantStyle
    }
  } as const,

  defaultVariants: {
    variant: 'body1'
  }
});

export type TypographyProps = TextProps & GetProps<typeof Typography>;
