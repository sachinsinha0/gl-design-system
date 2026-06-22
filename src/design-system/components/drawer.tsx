import { useLockBodyScroll } from '../hooks';
import { AnimatePresence, Stack, StackProps, XStack } from 'tamagui';
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';

export type DrawerProps = StackProps & {
  orientation?: 'right' | 'left';
  onClose: () => void;
  drawerWidth?: number;
  open: boolean;
  canCloseOnBackgroundPress?: boolean;
};

export const Drawer = React.memo(function Drawer({
  open,
  drawerWidth: drawerWidthProp,
  orientation = 'left',
  children,
  onClose
}: DrawerProps) {
  const drawerWidth = drawerWidthProp || 328;

  useLockBodyScroll(open);
  const dimensions = useWindowDimensions();
  const originX = orientation == 'right' ? dimensions.width - drawerWidth : 0;

  return (
    <XStack
      pointerEvents="auto"
      width={Platform.select({ web: '100vw' })}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position={Platform.select({ web: 'fixed' })}
      zIndex={201}>
      <AnimatePresence>
        {open && (
          <Stack
            key={'foreground'}
            height={Platform.select({ web: '100vh' })}
            pointerEvents="auto"
            zIndex={202}
            transform={[{ translateX: originX }]}
            // This is necessary to window back scroll behind drawer
            onPress={(e) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              if (e.target.type != 'file') {
                e.preventDefault();
              }
            }}
            enterStyle={{ x: orientation == 'right' ? originX : -drawerWidth }}
            exitStyle={{ x: orientation == 'right' ? dimensions.width : -drawerWidth }}
            animation={'fast'}
            width={drawerWidth}
            backgroundColor={'$surfaceContainerLowest'}>
            {children}
          </Stack>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Stack
            key={'background'}
            position="absolute"
            left={0}
            width={'100%'}
            height={'100%'}
            opacity={1}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            animation={'fast'}
            pointerEvents="auto"
            flex={1}
            backgroundColor={'$onSurfaceOpacity16P'}
            onPress={onClose}
          />
        )}
      </AnimatePresence>
    </XStack>
  );
});
