// import { useBackHandler } from '../../../app/src/hooks';
import { StatusBar } from './status-bar';
import { Footer } from './footer';
import { SheetProps as TMSheetProps } from '@tamagui/sheet/src/types';
import React, { PropsWithChildren } from 'react';
import { ScrollViewProps, Sheet as TMSheet, Stack, isWebTouchable, ScrollView } from 'tamagui';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SheetProps = PropsWithChildren<
  TMSheetProps & {
    handle?: boolean;
    fullScreen?: boolean;
    scroll?: boolean;
    scrollviewProps?: ScrollViewProps;
    backgroundColor?: string;
    onClose?: () => void;
    safeAreaEdges?: ('top' | 'bottom')[];
  }
>;

export function Sheet({
  handle = true,
  children,
  fullScreen,
  snapPoints = [85, 50, 25],
  modal = true,
  scroll,
  backgroundColor = '$background',
  scrollviewProps,
  onClose,
  open,
  safeAreaEdges = ['bottom'],
  ...sheetProps
}: SheetProps) {
  // useBackHandler(() => {
  //   if (typeof onClose === 'function' && open) {
  //     onClose();
  //     return true;
  //   }
  //   return false;
  // });
  return (
    <TMSheet
      {...sheetProps}
      open={open}
      modal={modal}
      snapPoints={fullScreen ? [100] : snapPoints}
      disableDrag={fullScreen ? true : !!sheetProps.disableDrag}>
      {!fullScreen && <TMSheet.Overlay backgroundColor="$onSurfaceOpacity16P" />}
      <TMSheet.Frame
        flex={1}
        marginBottom={isWebTouchable ? '$3' : 0}
        borderTopLeftRadius={fullScreen ? 0 : '$4'}
        borderTopRightRadius={fullScreen ? 0 : '$4'}
        backgroundColor={backgroundColor}>
        {handle && !fullScreen && (
          <Stack height="$2.5" justifyContent="center" backgroundColor={backgroundColor}>
            <TMSheet.Handle
              cursor="pointer"
              height="$0.5"
              width="$4"
              margin={0}
              marginLeft="auto"
              marginRight="auto"
              backgroundColor="$onBackgroundOpacity16P"
            />
          </Stack>
        )}
        {scroll ? (
          <ScrollView {...scrollviewProps}>
            {safeAreaEdges.includes('top') && <StatusBar backgroundColor={backgroundColor} />}
            {children}
            {safeAreaEdges.includes('bottom') && <Footer backgroundColor={backgroundColor} />}
          </ScrollView>
        ) : (
          <>
            {safeAreaEdges.includes('top') && <StatusBar backgroundColor={backgroundColor} />}
            {children}
            {safeAreaEdges.includes('bottom') && <Footer backgroundColor={backgroundColor} />}
          </>
        )}
      </TMSheet.Frame>
    </TMSheet>
  );
}
