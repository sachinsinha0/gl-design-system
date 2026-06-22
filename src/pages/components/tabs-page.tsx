import { useState } from 'react';
import { YStack, Stack, Typography, Tabs } from '@gl/elements';
import { DemoBlock } from '../../showcase-kit';

const TABS = [
  { value: '1', label: 'Overview', body: 'Overview content lives here.' },
  { value: '2', label: 'Activity', body: 'Activity content lives here.' },
  { value: '3', label: 'Settings', body: 'Settings content lives here.' }
];

export function TabsPage() {
  const [basic, setBasic] = useState('1');
  const [vertical, setVertical] = useState('1');

  return (
    <YStack gap="$3">
      <DemoBlock
        title="Basic"
        description="Controlled via value + onValueChange. Tabs.List holds Tabs.Tab; Tabs.Content renders per value.">
        <Stack width="100%">
          <Tabs value={basic} onValueChange={setBasic}>
            <Tabs.List>
              {TABS.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  <Typography variant="subtitle2">{tab.label}</Typography>
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Content key={tab.value} value={tab.value}>
                <Typography paddingVertical="$3" textAlign="center">
                  {tab.body}
                </Typography>
              </Tabs.Content>
            ))}
          </Tabs>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Full width"
        description="Tabs stretch to the container width; each tab flexes equally.">
        <Stack width="100%">
          <Tabs defaultValue="2">
            <Tabs.List>
              {TABS.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  <Typography variant="subtitle2">{tab.label}</Typography>
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Content key={tab.value} value={tab.value}>
                <Typography paddingVertical="$3" textAlign="center">
                  {tab.body}
                </Typography>
              </Tabs.Content>
            ))}
          </Tabs>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Custom active color"
        description="activeColor sets the indicator + active label color (token, e.g. $tertiary).">
        <Stack width="100%">
          <Tabs defaultValue="1" activeColor="$tertiary">
            <Tabs.List>
              {TABS.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  <Typography variant="subtitle2">{tab.label}</Typography>
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Content key={tab.value} value={tab.value}>
                <Typography paddingVertical="$3" textAlign="center">
                  {tab.body}
                </Typography>
              </Tabs.Content>
            ))}
          </Tabs>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Vertical"
        description="orientation='vertical' lays the tab list beside the content.">
        <Stack width="100%">
          <Tabs value={vertical} onValueChange={setVertical} orientation="vertical">
            <Tabs.List>
              {TABS.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  <Typography variant="subtitle2">{tab.label}</Typography>
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Content key={tab.value} value={tab.value}>
                <Typography padding="$3">{tab.body}</Typography>
              </Tabs.Content>
            ))}
          </Tabs>
        </Stack>
      </DemoBlock>
    </YStack>
  );
}
