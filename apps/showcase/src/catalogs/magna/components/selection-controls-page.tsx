import { useState } from 'react';
import { YStack, Checkbox, Radio, RadioGroup, Switch } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const CHECKBOX_SIZES = ['xs', 'sm', 'md'] as const;

export function SelectionControlsPage() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('ml');
  const [group, setGroup] = useState('ds');
  const [sw1, setSw1] = useState(false);
  const [sw2, setSw2] = useState(true);
  const [sw3, setSw3] = useState(true);

  return (
    <YStack gap="$3">
      <DemoBlock
        title="Checkbox"
        description="checked + onCheckedChange. Sizes: xs · sm · md.">
        <VariantCell label="controlled">
          <Checkbox checked={checked} onCheckedChange={setChecked} labelText="Subscribe" />
        </VariantCell>
        {CHECKBOX_SIZES.map((size) => (
          <VariantCell key={size} label={size}>
            <Checkbox size={size} checked={checked} onCheckedChange={setChecked} labelText={size} />
          </VariantCell>
        ))}
        <VariantCell label="error + helperText">
          <Checkbox
            error
            checked={false}
            onCheckedChange={() => undefined}
            labelText="Accept terms"
            helperText="Required"
          />
        </VariantCell>
        <VariantCell label="disabled">
          <Checkbox disabled checked labelText="Disabled" onCheckedChange={() => undefined} />
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="Radio"
        description="Standalone radios. value + checked + onValueChange.">
        <VariantCell label="Machine Learning">
          <Radio
            value="ml"
            checked={radio === 'ml'}
            onValueChange={setRadio}
            labelText="Machine Learning"
          />
        </VariantCell>
        <VariantCell label="Data Science">
          <Radio
            value="ds"
            checked={radio === 'ds'}
            onValueChange={setRadio}
            labelText="Data Science"
          />
        </VariantCell>
        <VariantCell label="disabled">
          <Radio
            disabled
            value="cloud"
            checked={radio === 'cloud'}
            onValueChange={setRadio}
            labelText="Cloud (disabled)"
          />
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="RadioGroup"
        description="Grouped radios via RadioGroup.Item. value + onValueChange.">
        <RadioGroup value={group} onValueChange={setGroup} labelText="Choose a track">
          <YStack gap="$2" paddingTop="$1">
            <RadioGroup.Item value="ds" labelText="Data Science" />
            <RadioGroup.Item value="ml" labelText="Machine Learning" />
            <RadioGroup.Item value="cloud" labelText="Cloud Computing" />
          </YStack>
        </RadioGroup>
      </DemoBlock>

      <DemoBlock
        title="Switch"
        description="checked + onCheckedChange. Sized $4 to match the GL app switch; $3 is a compact variant. Each toggles independently.">
        <VariantCell label={sw1 ? 'on' : 'off'}>
          <Switch size="$4" checked={sw1} onCheckedChange={setSw1} />
        </VariantCell>
        <VariantCell label="on">
          <Switch size="$4" checked={sw2} onCheckedChange={setSw2} />
        </VariantCell>
        <VariantCell label="disabled">
          <Switch size="$4" disabled checked onCheckedChange={() => undefined} />
        </VariantCell>
        <VariantCell label="compact ($3)">
          <Switch size="$3" checked={sw3} onCheckedChange={setSw3} />
        </VariantCell>
      </DemoBlock>
    </YStack>
  );
}
