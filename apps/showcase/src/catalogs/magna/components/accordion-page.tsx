import { YStack, XStack, Typography, Accordion, AccordionSummary, AccordionDetails, Icon } from '@gl/elements';
import { Info } from '@tamagui/lucide-icons';
import { DemoBlock } from '../../showcase-kit';

export function AccordionPage() {
  return (
    <YStack gap="$3">
      <DemoBlock
        title="Basic"
        description="First child is the AccordionSummary (header); the rest is AccordionDetails. Tap the header to toggle.">
        <YStack width="100%" gap="$2">
          <Accordion container="low" borderRadius="$2">
            <AccordionSummary>
              <Typography variant="subtitle2">What is the design system?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                A shared library of tokens and components used across the app.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Default expanded"
        description="defaultExpanded opens the accordion on first render (uncontrolled).">
        <YStack width="100%" gap="$2">
          <Accordion container="low" borderRadius="$2" defaultExpanded>
            <AccordionSummary>
              <Typography variant="subtitle2">Already open</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                This panel started expanded because defaultExpanded is set.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Multiple (independent)"
        description="Each Accordion owns its own state, so several can be open at once.">
        <YStack width="100%" gap="$2">
          {['Shipping', 'Returns', 'Warranty'].map((title) => (
            <Accordion key={title} container="low" borderRadius="$2">
              <AccordionSummary>
                <Typography variant="subtitle2">{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">Details about {title.toLowerCase()}.</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="With leading icon"
        description="Compose any content (incl. a Lucide Icon) inside AccordionSummary.">
        <YStack width="100%" gap="$2">
          <Accordion container="low" borderRadius="$2">
            <AccordionSummary>
              <XStack gap="$2" alignItems="center">
                <Icon icon={Info} size={18} color="$primary" />
                <Typography variant="subtitle2">More information</Typography>
              </XStack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Icons can live alongside the header text in the summary.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Nested"
        description="An Accordion can be placed inside another's AccordionDetails.">
        <YStack width="100%" gap="$2">
          <Accordion container="low" borderRadius="$2">
            <AccordionSummary>
              <Typography variant="subtitle2">Parent accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion container="lowest" borderRadius="$2">
                <AccordionSummary>
                  <Typography variant="subtitle2">Nested accordion</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">I am nested inside the parent.</Typography>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Disabled"
        description="disabled keeps the accordion collapsed and non-interactive.">
        <YStack width="100%" gap="$2">
          <Accordion container="low" borderRadius="$2" disabled>
            <AccordionSummary>
              <Typography variant="subtitle2" color="$onSurfaceVariant">
                Disabled section
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">This content cannot be expanded.</Typography>
            </AccordionDetails>
          </Accordion>
        </YStack>
      </DemoBlock>
    </YStack>
  );
}
