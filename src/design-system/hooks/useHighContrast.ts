import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export function useHighContrast(): boolean {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const forcedColorsMediaQuery = window.matchMedia('(forced-colors: active)');

      const checkForcedColors = () => {
        setIsHighContrast(forcedColorsMediaQuery.matches);
      };

      checkForcedColors();

      forcedColorsMediaQuery.addEventListener('change', checkForcedColors);

      return () => {
        forcedColorsMediaQuery.removeEventListener('change', checkForcedColors);
      };
    }
  }, []);

  return isHighContrast;
}