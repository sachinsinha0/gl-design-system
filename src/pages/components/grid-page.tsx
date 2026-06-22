import { YStack, Typography, Grid, Container } from '@gl/elements';
import { DemoBlock } from '../../showcase-kit';

// In the source app this comes from useGridSpacing(); we use a static token here.
const SPACING = '$2';

function Cell({ label, color = '$primaryContainer' }: { label: string; color?: string }) {
  return (
    <Container
      height={56}
      backgroundColor={color}
      borderRadius="$2"
      alignItems="center"
      justifyContent="center"
      padding="$2">
      <Typography variant="caption1" color="$onSurface">
        {label}
      </Typography>
    </Container>
  );
}

export function GridPage() {
  return (
    <YStack gap="$3">
      <DemoBlock
        title="Two-column layout"
        description="Grid is a 12-column flex grid. Set container row wrap spacing on the parent; each Grid child takes per-breakpoint span props (xxs / xs / sm / md / lg / xl) as a number out of 12. Here: lg={8} + lg={4}.">
        <YStack width="100%">
          <Grid container row wrap spacing={SPACING}>
            <Grid xs={12} lg={8}>
              <Cell label="lg=8 (main)" color="$primaryContainer" />
            </Grid>
            <Grid xs={12} lg={4}>
              <Cell label="lg=4 (aside)" color="$secondaryContainer" />
            </Grid>
          </Grid>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Responsive multi-item grid"
        description="Each cell stacks full-width on small screens and splits across columns as the viewport grows. Resize the window to see the spans change (xs vs sm vs md).">
        <YStack width="100%">
          <Grid container row wrap spacing={SPACING}>
            <Grid xs={12} sm={6} md={4}>
              <Cell label="xs=12 sm=6 md=4" />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Cell label="xs=12 sm=6 md=4" />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Cell label="xs=12 sm=6 md=4" />
            </Grid>
            <Grid xs={6} sm={4} md={3}>
              <Cell label="xs=6 sm=4 md=3" color="$tertiaryContainer" />
            </Grid>
            <Grid xs={6} sm={4} md={3}>
              <Cell label="xs=6 sm=4 md=3" color="$tertiaryContainer" />
            </Grid>
            <Grid xs={6} sm={4} md={3}>
              <Cell label="xs=6 sm=4 md=3" color="$tertiaryContainer" />
            </Grid>
            <Grid xs={6} sm={12} md={3}>
              <Cell label="xs=6 sm=12 md=3" color="$tertiaryContainer" />
            </Grid>
          </Grid>
        </YStack>
      </DemoBlock>
    </YStack>
  );
}
