import type { ComponentType, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { YStack, Typography } from '@gl/elements';

const Wrap = ({ children, ...rest }: { children?: ReactNode; [k: string]: unknown }) => (
  <YStack {...rest}>{children}</YStack>
);

const components: Record<string, ComponentType<{ children?: ReactNode }>> = {
  h1: () => null,
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
    <ul style={{ margin: '0 0 16px', paddingLeft: 22, listStyleType: 'disc' }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: '0 0 16px', paddingLeft: 22, listStyleType: 'decimal' }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: 6, display: 'list-item' }}>
      <Typography tag="span" variant="body1">{children}</Typography>
    </li>
  ),
  code: ({ children }) => (
    <code
      style={{
        fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
        fontSize: '0.875em',
        background: 'rgba(0,0,0,0.06)',
        padding: '1px 5px',
        borderRadius: 4,
      }}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre
      style={{
        margin: '16px 0 20px',
        padding: '18px 20px',
        background: '#0f172a',
        borderRadius: 12,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.65,
        color: '#e2e8f0',
        fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
        whiteSpace: 'pre',
      }}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <YStack
      marginVertical="$3"
      paddingHorizontal="$4"
      paddingVertical="$3"
      backgroundColor="$primaryFixedOpacity16P"
      borderRadius={16}
      borderWidth={1}
      borderColor="$primaryFixed"
    >
      {children}
    </YStack>
  ),
  table: ({ children }) => (
    <div style={{ overflowX: 'auto', margin: '16px 0 24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif' }}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th style={{ textAlign: 'left', fontWeight: 600, fontSize: 12, padding: '10px 14px', borderBottom: '2px solid #cac4d0', color: '#49454f', whiteSpace: 'nowrap' as const }}>{children}</th>
  ),
  td: ({ children }) => (
    <td style={{ padding: '9px 14px', borderBottom: '1px solid #ece6f0', color: '#1c1b1f', verticalAlign: 'top', lineHeight: 1.55 }}>{children}</td>
  ),
};

export function MagnaMDXProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
