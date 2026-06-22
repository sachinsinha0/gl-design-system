import { XStack, Button, useThemeSetting } from '@gl/elements';
import type { GLTheme } from '@gl/elements';
const THEMES: GLTheme[] = ['blue','deeporange','darkteal','gold','eggplant','glapremium','olive','ocean','stormblue','ink','midnight','rust','mint','cyan','deeppurple','green','lightblue','orange','pink','purple','rose','lime'];
export function ThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeSetting();
  return (
    <XStack gap="$2" alignItems="center">
      <select aria-label="Color theme" value={theme ?? 'blue'} onChange={(e) => setTheme(e.target.value as GLTheme)}>
        {THEMES.map((name) => (<option key={name} value={name}>{name}</option>))}
      </select>
      <Button variant="outlined" size="sm" onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
        {colorScheme === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </XStack>
  );
}
