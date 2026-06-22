import { useState } from 'react';
import { YStack, Select, MultiSelect } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';
import { SELECT_OPTIONS } from '../../mocks/data';

// The Select / MultiSelect components expect options shaped as { name, value };
// the shared mock uses { label, value }, so map it once here.
const OPTIONS = SELECT_OPTIONS.map((o) => ({ name: o.label, value: o.value }));

export function SelectPage() {
  const [value, setValue] = useState('ml');
  const [empty, setEmpty] = useState('');
  const [multi, setMulti] = useState<string[]>(['ds', 'cloud']);

  return (
    <YStack gap="$3">
      <DemoBlock
        title="Select"
        description="Single choice. options={{ name, value }}, value + onValueChange.">
        <VariantCell label="controlled">
          <Select options={OPTIONS} value={value} onValueChange={setValue} />
        </VariantCell>
        <VariantCell label="placeholder">
          <Select
            options={OPTIONS}
            value={empty}
            onValueChange={setEmpty}
            placeholder="Pick a track"
          />
        </VariantCell>
        <VariantCell label="disabled">
          <Select options={OPTIONS} value={value} onValueChange={setValue} disabled />
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="MultiSelect"
        description="Multiple choice. value is an array; onValueChange receives the new array.">
        <VariantCell label="controlled">
          <MultiSelect
            options={OPTIONS}
            value={multi}
            onValueChange={(v: string[]) => setMulti(v)}
            placeholder="Select tracks"
          />
        </VariantCell>
      </DemoBlock>
    </YStack>
  );
}
