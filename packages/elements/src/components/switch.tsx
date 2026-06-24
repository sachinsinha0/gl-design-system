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
      // Horizontal "safe space" so the thumb never touches the track ends.
      // Border (2px) alone left the thumb flush under runtime Tamagui; ~3px of
      // padding insets it to match the production switch (~5px each side).
      paddingHorizontal={3}
      {...props}>
      <TMSwitch.Thumb
        disabled={disabled}
        animation="quicker"
        {...thumb}
        height={thumbSizeValue}
        width={thumbSizeValue}
        // Center the fixed-height thumb vertically. The track is alignItems:
        // "stretch", so under runtime Tamagui (no compiler) the thumb otherwise
        // anchors to the top of the track (the production app centers it via the
        // build-time extractor). Auto vertical margins center it regardless of
        // the frame's flex direction, without affecting the horizontal travel.
        marginVertical="auto"
      />
    </TMSwitch>
  );
}
