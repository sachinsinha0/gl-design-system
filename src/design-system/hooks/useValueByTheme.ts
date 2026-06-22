import { useThemeSetting } from './useThemeSetting';
import { GLTheme } from '../theme/themes';

export type UseValueByThemeProps = {
  [K in GLTheme]: any;
};

export function useValueByTheme(props: UseValueByThemeProps) {
  const { theme } = useThemeSetting();
  return props[theme];
}
