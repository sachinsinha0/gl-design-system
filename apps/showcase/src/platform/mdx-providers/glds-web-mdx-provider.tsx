import type { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';

const components = {
  h1: () => null,
  h2: ({ children }: { children?: ReactNode }) => <h2 className="glds-h2">{children}</h2>,
  h3: ({ children }: { children?: ReactNode }) => <h3 className="glds-h3">{children}</h3>,
  h4: ({ children }: { children?: ReactNode }) => <h4 className="glds-h4">{children}</h4>,
  p: ({ children }: { children?: ReactNode }) => <p className="glds-body1">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => <ul className="glds-list">{children}</ul>,
  ol: ({ children }: { children?: ReactNode }) => <ol className="glds-list glds-list--ordered">{children}</ol>,
  li: ({ children }: { children?: ReactNode }) => <li className="glds-body1">{children}</li>,
  code: ({ children }: { children?: ReactNode }) => <code className="glds-code">{children}</code>,
  pre: ({ children }: { children?: ReactNode }) => <pre className="glds-pre">{children}</pre>,
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="glds-blockquote">{children}</blockquote>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="glds-table-wrap"><table className="glds-table">{children}</table></div>
  ),
  thead: ({ children }: { children?: ReactNode }) => <thead>{children}</thead>,
  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children?: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children?: ReactNode }) => <th>{children}</th>,
  td: ({ children }: { children?: ReactNode }) => <td>{children}</td>,
};

export function GldsWebMDXProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
