import { Sheet, SheetProps } from './sheet';
import { getElevationStyle } from './surface';
import { Footer } from './footer';
import { StatusBar } from './status-bar';
import { ShadowProps } from '../types';
// import { Dialog as TMDialog, DialogProps as TMDialogProps } from '../libs';
import { useKeyDown } from '../hooks';
import React, { PropsWithChildren } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Adapt,
  ScrollView,
  Stack,
  Dialog as TMDialog,
  DialogProps as TMDialogProps,
  useMedia
} from 'tamagui';
// import { useBackHandler } from '../../../app/src/hooks';

export type DialogProps = PropsWithChildren<
  Omit<TMDialogProps, 'size'> & {
    fullScreen?: boolean;
    backgroundColor?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    onClose: () => void;
    adaptToSheet?: boolean;
    fullWidth?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    scroll?: boolean;
    sheetProps?: SheetProps;
    zIndex?: number;
    shadow?: ShadowProps;
    safeAreaEdges?: ('top' | 'bottom')[];
  }
>;

const sizeMapping = {
  sm: 444,
  md: 600,
  lg: 900,
  xl: 1200
};

function DialogContent({
  safeAreaEdges,
  children,
  fullScreen,
  backgroundColor,
  height,
  scroll,
  adaptToSheet
}: DialogProps & { height: number }) {
  const media = useMedia();
  const showEdges = media.sm && adaptToSheet;
  const showTopEdge = safeAreaEdges.includes('top');
  const showBottomEdge = safeAreaEdges.includes('bottom');

  return scroll ? (
    <ScrollView $gtSm={{ maxHeight: fullScreen ? 'auto' : height }}>
      {showTopEdge && showEdges && <StatusBar backgroundColor={backgroundColor} />}
      {children}
      {showBottomEdge && showEdges && <Footer backgroundColor={backgroundColor} />}
    </ScrollView>
  ) : (
    <>
      {showTopEdge && showEdges && <StatusBar backgroundColor={backgroundColor} />}
      {children}
      {showBottomEdge && showEdges && <Footer backgroundColor={backgroundColor} />}
    </>
  );
}

function DialogSheet({
  safeAreaEdges,
  children,
  fullScreen,
  backgroundColor = '$surfaceContainerHigh',
  onClose,
  open,
  scroll,
  sheetProps
}: DialogProps) {
  const dimensions = useWindowDimensions();
  const computedHeight = dimensions.height - 64;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Adapt when={fullScreen ? null : 'sm'}>
      <Sheet
        open={open}
        zIndex={sheetProps?.zIndex || 200000}
        fullScreen
        modal
        backgroundColor={backgroundColor}
        onOpenChange={() => onClose()}
        dismissOnSnapToBottom
        {...sheetProps}
        snapPoints={sheetProps?.snapPoints || [99.9]}>
        <DialogContent
          safeAreaEdges={safeAreaEdges}
          height={computedHeight}
          backgroundColor={backgroundColor}
          fullScreen={fullScreen}
          scroll={scroll}
          adaptToSheet={true}>
          {children}
        </DialogContent>
      </Sheet>
    </Adapt>
  );
}

export function Dialog({
  children,
  fullScreen,
  scroll,
  backgroundColor = '$surfaceContainerHigh',
  onClose,
  modal = true,
  adaptToSheet = true,
  fullWidth = false,
  maxWidth,
  maxHeight,
  size = 'sm',
  open,
  sheetProps,
  zIndex,
  shadow = 'lg',
  safeAreaEdges = ['bottom'],
  ...props
}: DialogProps) {
  const dimensions = useWindowDimensions();
  const computedMinWidth = fullWidth ? maxWidth || sizeMapping[size] : 0;
  const computedMaxWidth = maxWidth || sizeMapping[size];
  const computedHeight = dimensions.height - 64;
  const computedMaxHeight = maxHeight || computedHeight;
  const shadowValue = getElevationStyle(shadow);
  // useBackHandler(() => {
  //   if (typeof onClose === 'function' && open) {
  //     onClose();
  //     return true;
  //   }
  //   return false;
  // });

  useKeyDown(['Escape'], () => {
    if (typeof onClose === 'function' && open) {
      onClose();
    }
  });

  return adaptToSheet || fullScreen ? (
    <DialogSheet
      fullScreen={fullScreen}
      scroll={scroll}
      backgroundColor={backgroundColor}
      onClose={onClose}
      modal={modal}
      adaptToSheet={adaptToSheet}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      size={size}
      open={open}
      zIndex={zIndex}
      shadow={shadow}
      safeAreaEdges={safeAreaEdges}>
      {children}
    </DialogSheet>
  ) : (
    <TMDialog modal={modal} open={open} {...props}>
      <TMDialog.Portal zIndex={zIndex}>
        <TMDialog.Overlay
          backgroundColor="rgba(0, 0, 0, 0.45)"
          key="overlay"
          animation="quick"
          onPress={onClose}
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <TMDialog.Content
          borderRadius={'$1'}
          padding={0}
          maxHeight={computedMaxHeight}
          minHeight={maxHeight ? computedMaxHeight : undefined}
          minWidth={
            computedMinWidth > dimensions.width - 64 ? dimensions.width - 64 : computedMinWidth
          }
          maxWidth={
            computedMaxWidth > dimensions.width - 64 ? dimensions.width - 64 : computedMaxWidth
          }
          backgroundColor={backgroundColor}
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          {...shadowValue}
          space>
          <DialogContent
            safeAreaEdges={safeAreaEdges}
            height={computedHeight}
            backgroundColor={backgroundColor}
            fullScreen={fullScreen}
            scroll={scroll}
            adaptToSheet={false}>
            {children}
          </DialogContent>
        </TMDialog.Content>
      </TMDialog.Portal>
    </TMDialog>
  );
}
