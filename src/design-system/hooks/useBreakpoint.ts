import { MediaType } from '../theme';
import { useMedia } from 'tamagui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseBreakpointProps<T> = { [key in MediaType]?: T | any };

export function useBreakpoint<T>(props: UseBreakpointProps<T>): {
  gt: T | undefined;
  lt: T | undefined;
} {
  const media = useMedia();
  const response = { gt: undefined, lt: undefined };

  if (media.gtXXl && props.gtXXl) {
    response.gt = props.gtXXl;
  } else if (media.gtXl && props.gtXl) {
    response.gt = props.gtXl;
  } else if (media.gtLg && props.gtLg) {
    response.gt = props.gtLg;
  } else if (media.gtTablet && props.gtTablet) {
    response.gt = props.gtTablet;
  } else if (media.gtMd && props.gtMd) {
    response.gt = props.gtMd;
  } else if (media.gtSm && props.gtSm) {
    response.gt = props.gtSm;
  } else if (media.gtXs && props.gtXs) {
    response.gt = props.gtXs;
  } else if (media.gtXXs && props.gtXXs) {
    response.gt = props.gtXXs;
  }

  if (media.xxs && props.xxs) {
    response.lt = props.xxs;
  } else if (media.xs && props.xs) {
    response.lt = props.xs;
  } else if (media.sm && props.sm) {
    response.lt = props.sm;
  } else if (media.md && props.md) {
    response.lt = props.md;
  } else if (media.tablet && props.tablet) {
    response.lt = props.tablet;
  } else if (media.lg && props.lg) {
    response.lt = props.lg;
  } else if (media.xl && props.xl) {
    response.lt = props.xl;
  } else if (media.xxl && props.xxl) {
    response.lt = props.xxl;
  }

  return response;
}
