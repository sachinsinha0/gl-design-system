import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useKeyDown(targetKeys, callback: (event: any) => void) {
  // Event handler
  function downHandler({ key, ...rest }) {
    if (targetKeys.includes(key)) {
      if (typeof callback === 'function') {
        callback({ key, ...rest });
      }
    }
  }

  // Add event listeners on component mount
  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('keydown', downHandler);
    }
    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('keydown', downHandler);
      }
    };
  }, [callback, targetKeys]);
}
