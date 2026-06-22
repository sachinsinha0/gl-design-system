import { useState } from 'react';
import { YStack, TextField, TextArea } from '@gl/elements';
import { Search, Eye } from '@tamagui/lucide-icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';

export function InputsPage() {
  const [value, setValue] = useState('');
  const [withIcon, setWithIcon] = useState('');
  const [errorValue, setErrorValue] = useState('not-an-email');
  const [area, setArea] = useState('');

  return (
    <YStack gap="$3">
      <DemoBlock
        title="TextField"
        description="Outlined input. No label prop — pair with surrounding copy. Sizes: default · small.">
        <VariantCell label="default">
          <TextField placeholder="Type here" value={value} onChangeText={setValue} />
        </VariantCell>
        <VariantCell label="small">
          <TextField size="small" placeholder="Small field" value={value} onChangeText={setValue} />
        </VariantCell>
        <VariantCell label="helperText">
          <TextField
            placeholder="Email"
            helperText="We'll never share it."
            value={value}
            onChangeText={setValue}
          />
        </VariantCell>
      </DemoBlock>

      <DemoBlock title="States" description="error · disabled">
        <VariantCell label="error">
          <TextField
            error
            placeholder="Email"
            helperText="Enter a valid email."
            value={errorValue}
            onChangeText={setErrorValue}
          />
        </VariantCell>
        <VariantCell label="disabled">
          <TextField disabled placeholder="Disabled" value="Read only" onChangeText={() => undefined} />
        </VariantCell>
      </DemoBlock>

      <DemoBlock title="With icons" description="Lucide startIcon / endIcon">
        <VariantCell label="startIcon">
          <TextField
            startIcon={Search}
            placeholder="Search"
            value={withIcon}
            onChangeText={setWithIcon}
          />
        </VariantCell>
        <VariantCell label="endIcon">
          <TextField
            endIcon={Eye}
            placeholder="Password"
            value={withIcon}
            onChangeText={setWithIcon}
          />
        </VariantCell>
      </DemoBlock>

      <DemoBlock title="TextArea" description="Multiline input">
        <VariantCell label="default">
          <TextArea placeholder="Write a message…" value={area} onChangeText={setArea} />
        </VariantCell>
        <VariantCell label="multiline (taller)">
          <TextArea
            height={120}
            placeholder="Longer note…"
            value={area}
            onChangeText={setArea}
          />
        </VariantCell>
        <VariantCell label="error + helperText">
          <TextArea
            error
            helperText="This field is required."
            placeholder="Required note"
            value={area}
            onChangeText={setArea}
          />
        </VariantCell>
      </DemoBlock>
    </YStack>
  );
}
