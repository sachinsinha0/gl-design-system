import { Typography } from './typography';
import { useColorValue } from '../hooks';
import { ActionColorProps } from '../types';
import { GetProps, StackProps, styled, withStaticProperties } from '@tamagui/core';
import pascalcase from 'pascalcase';
import React, { ReactNode } from 'react';
import { Stack } from 'tamagui';

const anchor = {
  'top-left': {
    right: '50%',
    bottom: '50%'
  },
  'top-right': {
    left: '50%',
    bottom: '50%'
  },
  'bottom-left': {
    top: '50%',
    right: '50%'
  },
  'bottom-right': {
    top: '50%',
    left: '50%'
  }
};

function getBadgeContentFrameColorStyle(color) {
  return {
    backgroundColor: useColorValue(color)
  };
}

const BadgeContentFrame = styled(Stack, {
  name: 'BadgeContentFrame',
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'red',
  pointerEvents: 'none',
  variants: {
    //@ts-ignore
    anchor: (val) => {
      return anchor[val] || val;
    },
    isString: {
      true: {
        paddingHorizontal: '$0.5',
        alignItems: 'center',
        justifyContent: 'center',
        height: '$2.5',
        minWidth: '$2.5',
        borderRadius: '$1.25'
      }
    },
    isEmptyChildren: {
      true: {
        padding: '$0.5',
        borderRadius: '$1.25'
      }
    },
    clr: {
      ':string': getBadgeContentFrameColorStyle
    }
  },
  defaultVariants: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    anchor: 'top-right',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    clr: '$error'
  }
});

export type BadgeProps = {
  badgeContent?: ReactNode;
} & StackProps;

export type BadgeContentProps = Omit<
  GetProps<typeof BadgeContentFrame>,
  'isEmptyChildren' | 'isString' | 'anchor'
> &
  StackProps & {
    color?: ActionColorProps;
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | {top?: number | string, right?: number | string, left?: number | string, bottom?: number | string}
  };

function BadgeContent({ children, color = 'error', ...props }: BadgeContentProps) {
  const isString = typeof children === 'string' || typeof children === 'number';
  const isEmptyChildren = !children;
  const textColor = useColorValue(`on${pascalcase(color)}`) || '$white';
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <BadgeContentFrame {...props} isString={isString} isEmptyChildren={isEmptyChildren} clr={color}>
      {isString ? (
        <Typography variant="caption1" color={textColor}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </BadgeContentFrame>
  );
}

export const Badge = withStaticProperties(
  ({ children }: BadgeProps) => {
    return (
      <Stack>
        {children}
      </Stack>
    );
  },
  { Content: BadgeContent }
);
