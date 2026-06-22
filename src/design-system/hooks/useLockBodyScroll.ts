//@ts-nocheck
import { useEffect, useRef } from 'react';
import { useLayoutEffect } from 'react';
import { Platform } from 'react-native';

export function useLockBodyScroll(locked) {
  const originalStyle = useRef();

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (locked) {
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }, [locked]);

  useLayoutEffect(() => {
    if (Platform.OS === 'web') {
      // Get original body overflow
      originalStyle.current = window.getComputedStyle(document.body).overflow;
      // Re-enable scrolling when component unmounts
      return () => {
        document.body.style.overflow = '';//originalStyle.current;
      };
    }
  }, []);
}
