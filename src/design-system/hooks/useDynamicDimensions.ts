import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export function useDynamicDimensions() {
  const [dimensions, setDimensions] = useState(() => ({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
  }));

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        setDimensions((prev) => ({
          window: {
            width: window.innerWidth,
            height: window.innerHeight,
            scale: prev.window.scale,
            fontScale: prev.window.fontScale
          },
          screen: prev.screen
        }));
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      const update = () => {
        setDimensions({
          window: Dimensions.get('window'),
          screen: Dimensions.get('screen')
        });
      };
      const subscription = Dimensions.addEventListener('change', update);
      return () => subscription?.remove?.();
    }
  }, []);

  return dimensions;
}
