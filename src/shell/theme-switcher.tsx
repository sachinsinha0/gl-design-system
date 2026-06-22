import { XStack, Stack, Button, Icon, useThemeSetting } from '@gl/elements';
import { Palette, Sun, Moon } from '@tamagui/lucide-icons';

// GL theme names (the 22 themes in design-system/theme/colors). Typed as
// string here because `@gl/elements` is an untyped ambient module (see
// src/types/gl-elements.d.ts); the values are validated at runtime by Tamagui.
const THEMES: string[] = ['blue','deeporange','darkteal','gold','eggplant','glapremium','olive','ocean','stormblue','ink','midnight','rust','mint','cyan','deeppurple','green','lightblue','orange','pink','purple','rose','lime'];

export function ThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeSetting();
  const isDark = colorScheme === 'dark';
  return (
    <XStack gap="$2" alignItems="center">
      {/* Theme picker: a Palette-labelled native select wrapped to look intentional. */}
      <XStack
        alignItems="center"
        gap="$1.5"
        paddingLeft="$2.5"
        paddingRight="$1.5"
        height={38}
        borderRadius={10}
        borderWidth={1}
        borderColor="$outlineVariant"
        backgroundColor="$surfaceContainerLow"
      >
        <Icon icon={<Palette />} size={16} color="$onSurfaceVariant" />
        <Stack>
          <select
            aria-label="Color theme"
            value={theme ?? 'blue'}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              font: 'inherit',
              fontSize: 14,
              padding: '6px 4px',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none'
            }}
          >
            {THEMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Stack>
      </XStack>

      {/* Light/dark toggle — keeps a text label alongside the icon. */}
      <Button
        variant="tonal"
        size="sm"
        startIcon={isDark ? Sun : Moon}
        onPress={() => setColorScheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? 'Light' : 'Dark'}
      </Button>
    </XStack>
  );
}
