import { ThemeSettingsContext, ThemeSettingsContextType } from '../components/theme-provider';
import { useContext } from 'react';
// import { useColorScheme } from 'react-native';

export const useThemeSetting = (): ThemeSettingsContextType => useContext(ThemeSettingsContext);
