import { XStack, Stack, Icon } from '@gl/elements';
import { Layers } from '@tamagui/lucide-icons';
import { useActiveDSId, useSetActiveDS } from '../platform/ds-context';
import { listDesignSystems, type DSId } from '../platform/ds-registry';

export function DSSwitcher() {
  const activeId = useActiveDSId();
  const setActive = useSetActiveDS();
  const systems = listDesignSystems();
  if (systems.length <= 1) return null;
  return (
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
      <Icon icon={<Layers />} size={16} color="$onSurfaceVariant" />
      <Stack>
        <select
          aria-label="Design system"
          value={activeId}
          onChange={(e) => setActive(e.target.value as DSId)}
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
          {systems.map((ds) => (
            <option key={ds.id} value={ds.id}>
              {ds.label}
            </option>
          ))}
        </select>
      </Stack>
    </XStack>
  );
}
