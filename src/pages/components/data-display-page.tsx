import {
  YStack,
  XStack,
  Stack,
  Typography,
  Avatar,
  Separator,
  Container,
  Breadcrumbs
} from '@gl/elements';
import { ChevronRight } from '@tamagui/lucide-icons';
import { DemoBlock, VariantCell } from '../../showcase-kit';
import { AVATAR_URL, PEOPLE } from '../../mocks/data';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const personWithAvatar = PEOPLE[0];
const personWithoutAvatar = PEOPLE.find((p) => !p.avatar) ?? PEOPLE[2];

export function DataDisplayPage() {
  return (
    <YStack gap="$3">
      <DemoBlock
        title="Avatar"
        description="Tamagui Avatar with Avatar.Image; size is set on the Avatar (e.g. 32 / 40 / 72). For a missing image, render an initials fallback: a Container with $primaryContainer bg + a Typography.">
        <VariantCell label="image 32">
          <Avatar circular size={32}>
            <Avatar.Image src={AVATAR_URL} />
            <Avatar.Fallback backgroundColor="$primaryContainer" />
          </Avatar>
        </VariantCell>
        <VariantCell label="image 40">
          <Avatar circular size={40}>
            <Avatar.Image src={AVATAR_URL} />
            <Avatar.Fallback backgroundColor="$primaryContainer" />
          </Avatar>
        </VariantCell>
        <VariantCell label="image 72">
          <Avatar circular size={72}>
            <Avatar.Image src={personWithAvatar.avatar} />
            <Avatar.Fallback backgroundColor="$primaryContainer" />
          </Avatar>
        </VariantCell>
        <VariantCell label={`initials (${personWithoutAvatar.name})`}>
          <Container
            width={72}
            height={72}
            borderRadius={9999}
            backgroundColor="$primaryContainer"
            alignItems="center"
            justifyContent="center">
            <Typography variant="h5" color="$onPrimaryContainer">
              {getInitials(personWithoutAvatar.name)}
            </Typography>
          </Container>
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="Separator"
        description="Thin divider. Default is horizontal; pass vertical for a vertical rule (give it a height when vertical). borderColor is a token.">
        <YStack width="100%" gap="$3">
          <YStack gap="$2">
            <Typography variant="caption1" color="$onSurfaceVariant">
              horizontal
            </Typography>
            <Typography variant="body2">Above the divider</Typography>
            <Separator />
            <Typography variant="body2">Below the divider</Typography>
          </YStack>
          <YStack gap="$2">
            <Typography variant="caption1" color="$onSurfaceVariant">
              vertical
            </Typography>
            <XStack height={40} alignItems="center" gap="$3">
              <Typography variant="body2">Left</Typography>
              <Separator vertical height="100%" />
              <Typography variant="body2">Right</Typography>
            </XStack>
          </YStack>
        </YStack>
      </DemoBlock>

      <DemoBlock
        title="Container"
        description="Surface card. container sets the background tier (lowest | low | default | high | highest); outlined adds a 1px border; shadow applies an elevation (xs…3xl). borderRadius + padding are token props.">
        <VariantCell label="lowest + outlined">
          <Container
            container="lowest"
            outlined
            padding="$3"
            borderRadius="$2"
            minWidth={180}>
            <Typography variant="subtitle2">Outlined card</Typography>
            <Typography variant="body2" color="$onSurfaceVariant">
              container=&quot;lowest&quot; outlined
            </Typography>
          </Container>
        </VariantCell>
        <VariantCell label="with shadow">
          <Container container="lowest" shadow="md" padding="$3" borderRadius="$2" minWidth={180}>
            <Typography variant="subtitle2">Elevated card</Typography>
            <Typography variant="body2" color="$onSurfaceVariant">
              shadow=&quot;md&quot;
            </Typography>
          </Container>
        </VariantCell>
        <VariantCell label="plain (high)">
          <Container container="high" padding="$3" borderRadius="$2" minWidth={180}>
            <Typography variant="subtitle2">Plain card</Typography>
            <Typography variant="body2" color="$onSurfaceVariant">
              container=&quot;high&quot;
            </Typography>
          </Container>
        </VariantCell>
      </DemoBlock>

      <DemoBlock
        title="Breadcrumbs"
        description="Children are the trail items; a separator (default '/') is inserted between them. Pass a custom separator node and maxItems to collapse long trails.">
        <YStack width="100%" gap="$3">
          <VariantCell label="default separator">
            <Breadcrumbs>
              <Typography variant="body2" color="$primary">
                Home
              </Typography>
              <Typography variant="body2" color="$primary">
                Courses
              </Typography>
              <Typography variant="body2" color="$primary">
                Data Science
              </Typography>
              <Typography variant="body2" color="$onSurface">
                Overview
              </Typography>
            </Breadcrumbs>
          </VariantCell>
          <VariantCell label="chevron separator">
            <Breadcrumbs separator={<ChevronRight size={16} color="$onSurfaceVariant" />}>
              <Typography variant="body2" color="$primary">
                Dashboard
              </Typography>
              <Typography variant="body2" color="$primary">
                Programs
              </Typography>
              <Typography variant="body2" color="$onSurface">
                Settings
              </Typography>
            </Breadcrumbs>
          </VariantCell>
        </YStack>
      </DemoBlock>
    </YStack>
  );
}
