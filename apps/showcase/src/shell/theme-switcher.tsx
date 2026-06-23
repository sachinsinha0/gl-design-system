import { XStack, Stack, Button, Icon, useThemeSetting } from '@gl/elements';
import { Palette, Sun, Moon } from '@tamagui/lucide-icons';
import { useActiveDS } from '../platform/ds-context';

export function ThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeSetting();
  const ds = useActiveDS();
  const themes = ds.themes ?? [];
  const isDark = colorScheme === 'dark';
  return (
    <XStack gap="$2" alignItems="center">
      {themes.length > 0 ? (
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
              value={theme ?? themes[0]?.id ?? ''}
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
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Stack>
        </XStack>
      ) : null}

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
