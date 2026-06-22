import { useState } from 'react';
import { YStack, XStack, Checkbox, Radio, RadioGroup, Switch } from '@gl/elements';
import { DemoBlock, VariantCell } from '../../showcase-kit';

const CHECKBOX_SIZES = ['xs', 'sm', 'md'] as const;

export function SelectionControlsPage() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('ml');
  const [group, setGroup] = useState('ds');
  const [on, setOn] = useState(true);

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

      <DemoBlock title="Switch" description="checked + onCheckedChange. size is a token (e.g. $3).">
        <VariantCell label="on">
          <Switch checked={on} onCheckedChange={setOn} />
        </VariantCell>
        <VariantCell label="sizes">
          <XStack gap="$3" alignItems="center">
            <Switch size="$2" checked={on} onCheckedChange={setOn} />
            <Switch size="$3" checked={on} onCheckedChange={setOn} />
            <Switch size="$4" checked={on} onCheckedChange={setOn} />
          </XStack>
        </VariantCell>
        <VariantCell label="disabled">
          <Switch disabled checked onCheckedChange={() => undefined} />
        </VariantCell>
      </DemoBlock>
    </YStack>
  );
}
