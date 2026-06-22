import { XStack, Button, useThemeSetting } from '@gl/elements';

// GL theme names (the 22 themes in design-system/theme/colors). Typed as
// string here because `@gl/elements` is an untyped ambient module (see
// src/types/gl-elements.d.ts); the values are validated at runtime by Tamagui.
const THEMES: string[] = ['blue','deeporange','darkteal','gold','eggplant','glapremium','olive','ocean','stormblue','ink','midnight','rust','mint','cyan','deeppurple','green','lightblue','orange','pink','purple','rose','lime'];
export function ThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeSetting();
  return (
    <XStack gap="$2" alignItems="center">
      <select aria-label="Color theme" value={theme ?? 'blue'} onChange={(e) => setTheme(e.target.value)}>
        {THEMES.map((name) => (<option key={name} value={name}>{name}</option>))}
      </select>
      <Button variant="outlined" size="sm" onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
        {colorScheme === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </XStack>
  );
}
