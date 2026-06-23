import { Icon } from './icon';
import { Typography } from './typography';
// import {
//   Select as TMSelect,
//   SelectProps as TMSelectProps,
//   SelectTriggerProps,
//   useSelectContext,
//   useSelectItemParentContext
// } from '../libs';
import { ActionColorProps, Sheet } from '../';
import { Check, ChevronDown } from '../icons';
import React, { ReactNode, useId } from 'react';
import { Platform } from 'react-native';
import {
  Adapt,
  isClient,
  isWeb,
  Stack,
  styled,
  TamaguiElement,
  useComposedRefs,
  XStack,
  Select as TMSelect,
  SelectProps as TMSelectProps,
  SelectTriggerProps,
  useSelectContext,
  useSelectItemParentContext
} from 'tamagui';

const iconSize = {
  small: 24,
  default: 24
};

function getVariantStyle(variant, { props, theme }) {
  if (!props.error && !props.disabled) {
    return {
      backgroundColor: '$surfaceContainerLowest',
      borderColor: theme['outline'],
      borderWidth: 1,
      hoverStyle: {
        backgroundColor: '$surfaceContainerLow',
        borderColor: theme[`${props.clr}`] || props.hoverStyle?.borderColor,
        color: '$onSurface'
      },
      focusStyle: {
        backgroundColor: '$surfaceContainerLow',
        borderWidth: 2,
        // backgroundColor: theme[`${props.clr}Shades8P`] || props.focusStyle?.backgroundColor,
        borderColor: theme[`${props.clr}`] || props.focusStyle?.borderColor,
        color: '$onSurface'
      },
      pressStyle: {
        backgroundColor: '$surfaceContainerLow',
        borderWidth: 2,
        // backgroundColor: theme[`${props.clr}Shades8P`] || props.focusStyle?.backgroundColor,
        borderColor: theme[`${props.clr}`] || props.focusStyle?.borderColor,
        color: '$onSurface'
      }
    };
  }
}

function getSizeStyle(val, { fonts, props }) {
  return {
    height: val === 'small' ? 40 : 56,
    paddingHorizontal: 12
  };
}

export const SelectTriggerFrame = styled(XStack, {
  name: 'Select.Trigger',
  borderWidth: 1,
  borderRadius: '$true',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  color: '$textSecondary',
  minWidth: 200,
  cursor: 'pointer',
  alignItems: 'center',
  variants: {
    variant: {
      outlined: getVariantStyle
    },
    size: {
      default: getSizeStyle,
      small: getSizeStyle
    },
    error: {
      true: {
        backgroundColor: '$surfaceContainerLowest',
        borderColor: '$error',
        borderWidth: 2,
        hoverStyle: {
          backgroundColor: '$surfaceContainerLow',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          color: '$onSurface'
        },
        focusStyle: {
          backgroundColor: '$surfaceContainerLow',
          color: '$onSurface'
        },
        pressStyle: {
          backgroundColor: '$surfaceContainerLow',
          color: '$onSurface'
        }
      }
    },
    disabled: {
      true: {
        backgroundColor: '$surfaceContainerHighest',
        borderColor: '$outline',
        borderWidth: 1,
        pointerEvents: 'none',
        opacity: 0.5,
        hoverStyle: {
          color: '$onSurface'
        },
        focusStyle: {
          color: '$onSurface'
        },
        pressStyle: {
          color: '$onSurface'
        }
      }
    }
  } as const,

  defaultVariants: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    variant: 'outlined',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    size: 'default'
  }
});

const isPointerCoarse = isWeb && isClient ? window.matchMedia('(pointer:coarse)').matches : true;

export const SelectTriggerContainer = React.forwardRef<TamaguiElement, SelectTriggerProps>(
  function SelectTrigger(props: SelectScopedProps<SelectTriggerProps>, forwardedRef) {
    const {
      __scopeSelect,
      disabled = false,
      color = 'primary',
      size = 'default',
      ...triggerProps
    } = props;

    const context = useSelectContext('SelectTrigger', __scopeSelect);
    const itemParentContext = useSelectItemParentContext('SelectTrigger', __scopeSelect);
    const composedRefs = useComposedRefs(
      forwardedRef,
      context.floatingContext?.refs.setReference as any
    );
    // const getItems = useCollection(__scopeSelect)
    // const labelId = useLabelContext(context.trigger)
    // const labelledBy = ariaLabelledby || labelId
    if (itemParentContext.shouldRenderWebNative) {
      return null;
    }

    return (
      <>
        <SelectTriggerFrame
          unstyled
          disabled={disabled}
          clr={color}
          size={size}
          {...triggerProps}
          ref={composedRefs}
          {...(process.env.TAMAGUI_TARGET === 'web' && itemParentContext.interactions
            ? {
                ...itemParentContext.interactions.getReferenceProps(),
                ...(isPointerCoarse
                  ? {
                      onPress() {
                        itemParentContext.setOpen(!context.open);
                      }
                    }
                  : {
                      onMouseDown() {
                        context.floatingContext?.update();
                        itemParentContext.setOpen(!context.open);
                      }
                    })
              }
            : {
                onPress() {
                  itemParentContext.setOpen(!context.open);
                }
              })}
        />
      </>
    );
  }
);

export type SelectProps = Omit<TMSelectProps, 'size'> & {
  value?: string;
  options: { name: string; value: any }[];
  color?: ActionColorProps;
  helperText?: string;
  size?: 'small' | 'default';
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  startIconPress?: () => any;
  startIcon?: string | ReactNode;
  placeholderTextColor?: string;
  borderColor?: string;
};

export const Select = ({
  options = [],
  placeholder = '',
  color = 'primary',
  startIcon,
  startIconPress,
  helperText,
  size = 'default',
  placeholderTextColor: placeholderTextColorProp,
  ...props
}: SelectProps) => {
  const id = useId();
  const textColor = props.disabled ? '$onSurfaceVariant' : '$onSurface';
  const placeholderTextColor = placeholderTextColorProp || '$onSurfaceVariant';

  return (
    <Stack space={'$xs'}>
      <TMSelect id={id} {...props}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <SelectTriggerContainer {...props} color={color} size={size} unstyled>
          <XStack height="100%" width="100%" alignItems="center">
            {startIcon && (
              <Stack marginRight="$1" cursor={startIconPress && 'pointer'} onPress={startIconPress}>
                <Icon icon={startIcon} size={iconSize[size]} color={textColor} />
              </Stack>
            )}

            <TMSelect.Value paddingVertical={0}>
              <Typography
                flex={1}
                fontSize={16}
                variant="body2"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                color={props.value ? textColor : placeholderTextColor}>
                {options.find((opt) => opt.value === props.value)?.name || placeholder}
              </Typography>
            </TMSelect.Value>
            <Stack marginLeft="auto">
              <ChevronDown size={24} color={textColor} />
            </Stack>
          </XStack>
        </SelectTriggerContainer>

        <Adapt {...Platform.select({ web: { when: 'sm' }, native: { platform: 'touch' } })}>
          <Sheet
            moveOnKeyboardChange
            snapPoints={[60]}
            handle
            scroll
            animation="bouncy"
            modal
            dismissOnSnapToBottom
            backgroundColor="$surfaceContainerHigh">
            <Adapt.Contents />
          </Sheet>
        </Adapt>

        <TMSelect.Content zIndex={200000}>
          <TMSelect.Viewport borderWidth={0}>
            <TMSelect.Group borderRadius={4} backgroundColor="$surfaceContainerHigh" padding="$1">
              {options.map((item, i) => (
                <TMSelect.Item
                  unstyled
                  borderRadius="$1"
                  backgroundColor={
                    props.value === item.value ? '$primaryOpacity16P' : 'transparent'
                  }
                  flexDirection="row"
                  alignItems="center"
                  cursor="pointer"
                  focusStyle={{ outline: 'none' }}
                  hoverStyle={{ backgroundColor: '$primaryOpacity8P' }}
                  pressStyle={{ backgroundColor: '$primaryOpacity16P' }}
                  index={i}
                  key={item.name}
                  value={`${item.value}`}
                  size={size === 'small' ? 40 : 56}
                  minHeight={size === 'small' ? '$5' : '$7'}
                  paddingHorizontal={'$2'}>
                  <XStack flex={1} gap={1} alignItems="center" justifyContent="space-between">
                    <TMSelect.ItemText
                      flex={1}
                      display="flex"
                      flexDirection="row"
                      height={Platform.select({ web: '100%' })}>
                      <Typography fontSize={16} variant="body2" color={textColor}>
                        {item.name}
                      </Typography>
                    </TMSelect.ItemText>

                    <TMSelect.ItemIndicator>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <Icon icon={Check} size={20} color="$primary" />
                    </TMSelect.ItemIndicator>
                  </XStack>
                </TMSelect.Item>
              ))}
            </TMSelect.Group>
          </TMSelect.Viewport>
        </TMSelect.Content>
      </TMSelect>
      {helperText && (
        <Typography variant="caption1" color={props.error ? '$error' : textColor}>
          {helperText}
        </Typography>
      )}
    </Stack>
  );
};
