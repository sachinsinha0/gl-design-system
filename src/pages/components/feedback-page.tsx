import {
  YStack,
  XStack,
  Stack,
  Typography,
  Button,
  IconButton,
  Avatar,
  Spinner,
  Alert,
  Tooltip,
  Badge,
  RadialProgress
} from '@gl/elements';
import { Bell, Mail } from '@tamagui/lucide-icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';
import { AVATAR_URL } from '../../mocks/data';

const SEVERITIES = ['info', 'success', 'warning', 'error'] as const;
const ALERT_VARIANTS = ['standard', 'filled', 'outlined'] as const;

export function FeedbackPage() {
  return (
    <YStack gap="$3">
      <DemoBlock
        title="Alert"
        description="severity: info | success | warning | error. variant: standard | filled | outlined. title + content are string props; a severity icon is shown by default.">
        <YStack width="100%" gap="$3">
          {ALERT_VARIANTS.map((variant) => (
            <YStack key={variant} gap="$2">
              <Typography variant="caption1" color="$onSurfaceVariant">
                {variant}
              </Typography>
              {SEVERITIES.map((severity) => (
                <Alert
                  key={severity}
                  variant={variant}
                  severity={severity}
                  title={severity[0].toUpperCase() + severity.slice(1)}
                  content={`This is a ${severity} ${variant} alert.`}
                />
              ))}
            </YStack>
          ))}
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Tooltip"
        description="First child is the trigger; Tooltip.Content holds the bubble. placement positions it (top | bottom | left | right).">
        {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
          <VariantCell key={placement} label={placement}>
            <Tooltip placement={placement}>
              <Tooltip.Trigger>
                <Button variant="outlined">Hover {placement}</Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Typography variant="body2">Tooltip on {placement}</Typography>
              </Tooltip.Content>
            </Tooltip>
          </VariantCell>
        ))}
      </DemoBlock>

      <DemoBlock
        title="Badge"
        description="Badge wraps any element; Badge.Content is an absolutely-positioned overlay (anchor + color) for a count or dot.">
        <VariantCell label="count">
          <Badge>
            <IconButton icon={Bell} variant="tonal" />
            <Badge.Content color="error">5</Badge.Content>
          </Badge>
        </VariantCell>
        <VariantCell label="dot">
          <Badge>
            <IconButton icon={Mail} variant="tonal" />
            <Badge.Content color="success" />
          </Badge>
        </VariantCell>
        <VariantCell label="on avatar">
          <Badge>
            <Avatar circular size="$4">
              <Avatar.Image src={AVATAR_URL} />
              <Avatar.Fallback backgroundColor="$primaryContainer" />
            </Avatar>
            <Badge.Content color="primary" anchor="bottom-right">
              3
            </Badge.Content>
          </Badge>
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="Spinner"
        description="Indeterminate activity indicator. size: small | large; color is a token.">
        <VariantCell label="small">
          <Spinner size="small" color="$primary" />
        </VariantCell>
        <VariantCell label="large">
          <Spinner size="large" color="$primary" />
        </VariantCell>
        <VariantCell label="success">
          <Spinner size="large" color="$success" />
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="RadialProgress"
        description="Circular determinate progress. percentage drives the arc; size scales it; children render in the center.">
        {[25, 50, 75, 100].map((percentage) => (
          <VariantCell key={percentage} label={`${percentage}%`}>
            <RadialProgress percentage={percentage} size={56}>
              <Stack>
                <Typography variant="caption1">{percentage}%</Typography>
              </Stack>
            </RadialProgress>
          </VariantCell>
        ))}
      </DemoBlock>
    </YStack>
  );
}
