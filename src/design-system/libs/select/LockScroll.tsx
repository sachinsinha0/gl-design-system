import { FloatingPortal, FloatingOverlay } from '@floating-ui/react';
import * as React from 'react';

type LockScrollProps = {
  lock: boolean;
  children: any;
};

export const LockScroll = ({ children, lock }: LockScrollProps) => {
  if (lock)
    return (
      <FloatingPortal>
        <FloatingOverlay lockScroll={true}>{children}</FloatingOverlay>
      </FloatingPortal>
    );

  return children;
};
