import type { ComponentType, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { YStack, Typography } from '@gl/elements';

const Wrap = ({ children, ...rest }: { children?: ReactNode; [k: string]: unknown }) => (
  <YStack {...rest}>{children}</YStack>
);

const components: Record<string, ComponentType<{ children?: ReactNode }>> = {
  h1: ({ children }) => (
    <Typography variant="h1" marginBottom="$3">
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h2" marginTop="$4" marginBottom="$2">
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h3" marginTop="$3" marginBottom="$2">
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h4" marginTop="$3" marginBottom="$2">
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" marginBottom="$2">
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <Wrap tag="ul" gap="$1" marginBottom="$2" paddingLeft="$4">
      {children}
    </Wrap>
  ),
  li: ({ children }) => <Typography variant="body1">{children}</Typography>,
  code: ({ children }) => (
    <Typography variant="caption1" fontFamily="$mono" color="$onSurfaceVariant">
      {children}
    </Typography>
  ),
  pre: ({ children }) => (
    <YStack
      backgroundColor="$surfaceContainerHigh"
      padding="$3"
      borderRadius="$3"
      marginVertical="$2"
      tag="pre"
    >
      {children}
    </YStack>
  ),
  blockquote: ({ children }) => (
    <YStack
      borderLeftWidth={3}
      borderColor="$primary"
      paddingLeft="$3"
      paddingVertical="$2"
      marginVertical="$2"
      backgroundColor="$primaryContainer"
    >
      {children}
    </YStack>
  )
};

export function MagnaMDXProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
