import { Button, Container } from '.';
import { Icon } from './icon';
import { Typography } from './typography';
import { SelectTriggerFrame } from './select';
import { Sheet } from './sheet';
import { IconButton } from './icon-button';
import { ActionColorProps } from '../types';
import { useClickOutside } from '../hooks';
import { Check, ChevronDown, X } from '@tamagui/lucide-icons';
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { SelectProps, Stack, XStack, isWeb, useMedia } from 'tamagui';
import { FlatList, Platform } from 'react-native';
import { equals } from 'ramda';
import * as React from 'react';

const iconSize = {
  small: 24,
  default: 24
};

type ListItemProps = {
  name: string;
  onPress?: () => void;
};

type ListItemHandle = {
  setSelected: (val: boolean) => void;
};

const ListItem = forwardRef<ListItemHandle, ListItemProps>(({ name, onPress }, ref) => {
  const [isPressed, setIsPressed] = useState(false);

  const isWeb = Platform.OS === 'web';
  const [isSelected, setSelected] = useState(false);

  useImperativeHandle(ref, () => ({ setSelected }));

  const colors = {
    cardBackground: isSelected || isPressed ? '$primaryOpacity12P' : undefined,
    textColor: isPressed ? '$primary' : '$onSurfaceVariant'
  };

  return (
    <XStack
      cursor="pointer"
      backgroundColor={colors.cardBackground}
      paddingVertical={isWeb ? '$1' : '$2.5'}
      paddingHorizontal="$2"
      // marginBottom="$1"
      borderRadius="$true"
      justifyContent="space-between"
      alignItems="center"
      borderWidth={isWeb ? 0 : 1}
      hoverStyle={{ backgroundColor: '$primaryOpacity8P' }}
      borderColor={!isWeb ? (isPressed ? '$primary' : '$outlineOpacity16P') : undefined}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}>
      <Typography flex={1} numberOfLines={2} color={colors.textColor} variant="body1">
        {name}
      </Typography>
      <Stack height="$3">
        {isSelected && <Icon color="$primary" icon={<Check />} size="$3" />}
      </Stack>
    </XStack>
  );
});

ListItem.displayName = 'ListItem';

type Option = {
  name: string;
  value: any;
};

export interface MultiSelectProps
  extends Omit<SelectProps, 'value' | 'defaultValue' | 'size' | 'onValueChange'> {
  value: Array<any>;
  options: Array<Option>;
  color?: ActionColorProps;
  helperText?: string;
  size?: 'small' | 'default';
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  sheetTitle?: string;
  startIconPress?: () => any;
  startIcon?: string | ReactNode;
  maxDropdownHeight?: number;
  dropdownWidth?: number | string;
  onValueChange: (val: Option[]) => void;
}

export function MultiSelect({
  value,
  startIcon,
  startIconPress,
  size = 'default',
  placeholder,
  sheetTitle,
  helperText,
  color = '$primary',
  options = [],
  maxDropdownHeight = 200,
  dropdownWidth = '100%',
  disabled,
  placeholderTextColor: placeholderTextColorProp,
  ...props
}: MultiSelectProps) {
  const dropdownRef = useRef();
  const selectedItems = useRef<Array<Option>>([]);
  const itemRefs = useRef<Record<string, ListItemHandle>>({});

  const media = useMedia();

  useClickOutside(dropdownRef, () => {
    if (media.gtMd) setSheetOpen(false);
  });

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isSelectedPresent, setSelectedPresent] = useState(value.length > 0);

  const textColor = disabled ? '$onSurfaceVariant' : '$onSurface';
  const placeholderTextColor = placeholderTextColorProp || '$onSurfaceVariant';
  placeholder = placeholder || 'Select an item';

  const display = useMemo(() => {
    if (value.length > 0) {
      if (value.length === 1) {
        return options.find((e) => e.value === value[0])?.name || placeholder;
      }
      return `${value.length} selected`;
    } else {
      return placeholder;
    }
  }, [value, options]);

  const optionsList = useMemo(() => {
    return (
      <FlatList
        data={options}
        ItemSeparatorComponent={() => <Stack height="$1" />}        
        renderItem={({ item }) => (
          <ListItem
            ref={(r) => (itemRefs.current[item.value.toString()] = r)}
            key={item.name}
            name={item.name}
            onPress={onItemPress(item, isWeb)}
          />
        )}
      />
    );
  }, [options]);

  useEffect(() => {
    selectedItems.current = [...value];
    setTimeout(reconcileItemStates, 0);
  }, [value]);

  function onItemPress(item: Option, propagateToTop?: boolean) {
    return () => {
      const v = selectedItems.current.find((s) => s === item.value);
      const newValue = v
        ? selectedItems.current.filter((s) => s !== item.value)
        : [...selectedItems.current, item.value];
      propagateToTop && props.onValueChange(newValue);
      selectedItems.current = newValue;
      reconcileItemStates();
    };
  }

  function setItemState(itemVal: any, state: boolean) {
    itemRefs.current[itemVal.toString()]?.setSelected(state);
  }

  function reconcileItemStates() {
    for (const o of options) {
      const isSelected = selectedItems.current.includes(o.value);
      setItemState(o.value, isSelected);
    }
    setSelectedPresent(selectedItems.current.length > 0);
  }

  function setAllItemState(state: boolean) {
    selectedItems.current = state ? options.map((e) => e.value) : [];
    options.forEach((e) => {
      setItemState(e.value, state);
    });
    setSelectedPresent(state);
  }

  return (
    <Stack flex={1} ref={dropdownRef} maxWidth={'100%'}>
      <SelectTriggerFrame
        unstyled
        disabled={disabled}
        clr={color}
        size={size}
        borderColor={'$surfaceContainerHighest'}
        {...props}
        onPress={() => setSheetOpen(true)}>
        <XStack flex={1} alignItems="center" gap="$1">
          {!!startIcon && (
            <Stack cursor={startIconPress && 'pointer'} onPress={startIconPress}>
              <Icon icon={startIcon} size={iconSize[size]} color={textColor} />
            </Stack>
          )}
          <Stack flex={1}>
            <Typography numberOfLines={1} color={placeholderTextColor}>
              {display}
            </Typography>
          </Stack>
          {isSelectedPresent ? (
            <IconButton
              icon={<X />}
              variant="text"
              size="md"
              onPress={() => {
                props.onValueChange([]);
                selectedItems.current = [];
                reconcileItemStates();
              }}
            />
          ) : (
            <ChevronDown size={24} color={textColor} />
          )}
        </XStack>
      </SelectTriggerFrame>
      {!!helperText && (
        <Typography variant="caption1" color={props.error ? '$error' : textColor}>
          {helperText}
        </Typography>
      )}
      {media.gtMd && Platform.OS === "web" && (
        <Container
          width={dropdownWidth || '100%'}
          maxWidth={dropdownWidth || '100%'}
          display={isSheetOpen ? 'flex' : 'none'}
          shadow="sm"
          zIndex={200000}
          backgroundColor="$surfaceContainerHigh"
          borderRadius="$true"
          position="absolute"
          top="110%"
          left={0}
          right={0}
          gap="$0.5"
          padding="$1"
          maxHeight={maxDropdownHeight}>
          {optionsList}
        </Container>
      )}
      {(!media.gtMd || ["android", "ios"].includes(Platform.OS)) && (
        <Sheet
          open={isSheetOpen}
          moveOnKeyboardChange
          handle={false}
          scroll={false}
          animation="bouncy"
          modal
          dismissOnSnapToBottom
          snapPoints={[85]}
          onOpenChange={(e: boolean) => {
            if (!e && !equals(selectedItems.current, value)) {
              selectedItems.current = value;
              reconcileItemStates();
            }
            setSheetOpen(e);
          }}
          onClose={() => {
            selectedItems.current = value;
            reconcileItemStates();
            setSheetOpen(false);
          }}>
          <Stack flex={1}>
            {!!sheetTitle && (
              <XStack
                paddingHorizontal="$2.5"
                paddingTop="$2"
                alignItems="center"
                justifyContent="space-between">
                <Typography variant="h4">{sheetTitle}</Typography>
                <IconButton
                  variant="text"
                  icon={<X />}
                  size="lg"
                  onPress={() => {
                    selectedItems.current = value;
                    reconcileItemStates();
                    setSheetOpen(false);
                  }}
                />
              </XStack>
            )}
            <Stack paddingHorizontal="$2" gap="$2" flex={1}>
              <XStack justifyContent="space-between">
                <Button variant="text" size="sm" height="$3" onPress={() => setAllItemState(true)}>
                  Select All
                </Button>
                {isSelectedPresent && (
                  <Button
                    alignItems="center"
                    height="$3"
                    variant="tonal"
                    size="sm"
                    textColor="$onPrimaryContainer"
                    onPress={() => setAllItemState(false)}
                    startIcon={<X />}>
                    Clear All
                  </Button>
                )}
              </XStack>
              {optionsList}
            </Stack>
          </Stack>
          <XStack
            justifyContent="flex-end"
            paddingHorizontal="$2"
            paddingVertical="$1.5"
            borderTopWidth={1}
            borderTopColor={'$outlineOpacity16P'}>
            <Button
              size="lg"
              variant="contained"
              onPress={() => {
                setSheetOpen(false);
                props.onValueChange(selectedItems.current);
              }}>
              Confirm
            </Button>
          </XStack>
        </Sheet>
      )}
    </Stack>
  );
}
