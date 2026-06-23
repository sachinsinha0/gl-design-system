import { useTokenValue } from '../hooks';
import { Switch as TMSwitch, SwitchProps } from 'tamagui';
import * as React from 'react';

function getSwitchStyles({ checked, disabled }) {
  if (disabled) {
    return {
      thumb: {
        backgroundColor: '$surface'
      },
      frame: {
        borderColor: 'transparent',
        backgroundColor: '$onSurfaceOpacity12P',
        cursor: 'default'
      }
    };
  } else if (checked) {
    return {
      thumb: {
        backgroundColor: '$white',
        hoverStyle: {
          backgroundColor: '$surfaceContainer'
        }
      },
      frame: {
        backgroundColor: '$primary',
        borderColor: '$primary',
        cursor: 'pointer'
      }
    };
  } else {
    return {
      thumb: {
        backgroundColor: '$outline'
      },
      frame: {
        backgroundColor: '$surfaceVariant',
        borderColor: '$outline',
        cursor: 'pointer'
      }
    };
  }
}

export function Switch({ checked, size = '$3', disabled, onCheckedChange, ...props }: SwitchProps) {
  const { thumb, frame } = getSwitchStyles({ checked, disabled });
  const thumbSizeValue = (useTokenValue('size', size) || size) * 0.5;

  return (
    <TMSwitch
      size={size}
      defaultChecked={checked}
      checked={checked}
      disabled={disabled}
      onCheckedChange={!disabled ? onCheckedChange : undefined}
      {...frame}
      {...props}>
      <TMSwitch.Thumb
        disabled={disabled}
        animation="quicker"
        {...thumb}
        height={thumbSizeValue}
        width={thumbSizeValue}
      />
    </TMSwitch>
  );
}
