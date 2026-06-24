/// <reference types="vite/client" />
import { useState, type ComponentType, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/* ─── Inline SVG icons ──────────────────────────────────────────────────────
   No DS dependency — works in Magna (Tamagui), Jedi (MUI), and GLDS-Web.   */

type IconProps = { size?: number };

function SvgWrap({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconDownload({ size = 16 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </SvgWrap>
  );
}

function IconFileCode({ size = 16 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="10 13 8 15 10 17" />
      <polyline points="14 13 16 15 14 17" />
    </SvgWrap>
  );
}

function IconFileText({ size = 16 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </SvgWrap>
  );
}

function IconPackage({ size = 16 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </SvgWrap>
  );
}

function IconLink({ size = 13 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </SvgWrap>
  );
}

function IconCopy({ size = 13 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </SvgWrap>
  );
}

function IconCheck({ size = 13 }: IconProps) {
  return (
    <SvgWrap size={size}>
      <polyline points="20 6 9 17 4 12" />
    </SvgWrap>
  );
}

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type InstallAsset = {
  label: string;
  description: string;
  href: string | null;
  size?: string;
  downloadAs?: string;
  icon?: ComponentType<{ size?: number }>;
  badge?: string;
};

export type InstallTab = {
  id: string;
  label: string;
  disabled?: boolean;
  asset?: InstallAsset;
  body?: ReactNode;
};

export type InstallPageProps = {
  dsLabel: string;
  tagline: string;
  packageName?: string;
  installCommand?: string;
  sourcePath?: string;
  tabs: InstallTab[];
  howToUse?: ReactNode;
};

/* ─── Sub-components ────────────────────────────────────────────────────── */

function PageUrlBar() {
  const { pathname } = useLocation();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : pathname;

  function copy() {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <button
      onClick={copy}
      title="Copy page URL"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 10px',
        background: '#f1f5f9',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        cursor: 'pointer',
        fontSize: 12,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        color: '#475569',
        lineHeight: 1,
      }}
    >
      <span style={{ color: '#94a3b8', display: 'flex' }}><IconLink /></span>
      <span>{url}</span>
      <span style={{ color: copied ? '#22c55e' : '#94a3b8', display: 'flex', marginLeft: 2 }}>
        {copied ? <IconCheck /> : <IconCopy />}
      </span>
    </button>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        background: '#1e293b',
        color: '#e2e8f0',
        borderRadius: 10,
        padding: '14px 18px',
        margin: 0,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 13,
        lineHeight: 1.65,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
    >
      {children}
    </pre>
  );
}

export function CopyCodeBlock({ children, label }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label ? (
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: 0.6,
          }}
        >
          {label}
        </div>
      ) : null}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={copy}
          title="Copy"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '4px 8px',
            borderRadius: 6,
            background: copied ? '#22c55e' : '#334155',
            color: '#fff',
            border: 'none',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            zIndex: 1,
          }}
        >
          {copied ? <IconCheck size={11} /> : <IconCopy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <CodeBlock>{children}</CodeBlock>
      </div>
    </div>
  );
}

/* ─── Git-based distribution ──────────────────────────────────────────────── */

const GITHUB_REPO = 'sachinsinha0/gl-design-system';
const GITHUB_BRANCH = 'main';

/** Raw GitHub URL for a file at `<subdir>/<path>` on the configured branch. */
export function rawGithubUrl(subdir: string, path: string): string {
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${subdir}/${path}`;
}

/**
 * Force a Save-As download regardless of the server's content-type by routing
 * the response through a blob URL. Falls back to opening in a new tab.
 */
async function forceDownload(href: string, filename: string): Promise<void> {
  try {
    const res = await fetch(href);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    window.open(href, '_blank', 'noopener');
  }
}

/**
 * Renders the canonical "pull ai/<ds>/ from git" instructions for a DS.
 * The repo IS the distribution — no npm publish.
 */
export function GitInstallBlock({ dsId }: { dsId: string }) {
  const subdir = `ai/${dsId}`;
  const target = `.claude/skills/${dsId}-design-system`;
  const degit = `npx degit github:${GITHUB_REPO}/${subdir}#${GITHUB_BRANCH} ${target}`;
  const sparse = `git clone --depth 1 --filter=blob:none --sparse \\
  https://github.com/${GITHUB_REPO}.git .gl-tmp && \\
  cd .gl-tmp && git sparse-checkout set ${subdir} && \\
  cp -r ${subdir} ../${target} && cd .. && rm -rf .gl-tmp`;
  const monoChip: React.CSSProperties = {
    fontFamily: 'ui-monospace, Menlo, monospace',
    background: '#f1f5f9',
    padding: '1px 5px',
    borderRadius: 4,
    color: '#475569',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
        The repo <strong>is</strong> the distribution — there is no npm package. Pull just <code style={monoChip}>{subdir}/</code> into your project with one command.
      </p>
      <CopyCodeBlock label="Recommended · degit (no .git history)">{degit}</CopyCodeBlock>
      <CopyCodeBlock label="Alternate · sparse-checkout (keeps git history)">{sparse}</CopyCodeBlock>
      <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
        <strong>Update later:</strong> re-run the degit command. It overwrites the target folder with the latest <code style={monoChip}>{GITHUB_BRANCH}</code>.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#64748b' }}>Ships under <code style={monoChip}>{subdir}/</code>:</span>
        <code style={{ ...monoChip, fontSize: 12 }}>skills/</code>
        <code style={{ ...monoChip, fontSize: 12 }}>guidelines/</code>
        <code style={{ ...monoChip, fontSize: 12 }}>components/</code>
        <code style={{ ...monoChip, fontSize: 12 }}>tokens/</code>
      </div>
    </div>
  );
}

/* ─── Components JSON block (for designers, PMs, Figma plugin authors) ──── */

// Eager-load every DS's component JSON files + the shared schema. Vite
// requires glob patterns to be string literals; one wide pattern then filter.
// Path is relative to THIS file: src/platform → repo root is 4 levels up.
const COMPONENT_RAW = import.meta.glob('../../../../ai/*/components/*.json', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const SCHEMA_RAW_MAP = import.meta.glob('../../../../ai/_schema/component.schema.json', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;
const SCHEMA_RAW = Object.values(SCHEMA_RAW_MAP)[0] ?? '';

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

type ComponentEntry = { filename: string; raw: string; name: string; summary: string };

function collectComponents(dsId: string): ComponentEntry[] {
  // Keys look like `../../../../ai/<dsId>/components/<file>.json` (relative
  // to this file, normalised by Vite). Match on the `/ai/<dsId>/components/`
  // segment so we're tolerant of how Vite formats the key.
  const segment = `/ai/${dsId}/components/`;
  return Object.entries(COMPONENT_RAW)
    .filter(([k]) => k.includes(segment))
    .map(([k, raw]) => {
      const filename = k.slice(k.indexOf(segment) + segment.length);
      let name = filename.replace(/\.json$/, '');
      let summary = '';
      try {
        const parsed = JSON.parse(raw);
        name = parsed.name ?? name;
        summary = parsed.summary ?? '';
      } catch {
        /* keep defaults */
      }
      return { filename, raw, name, summary };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

export function ComponentsBlock({ dsId }: { dsId: string }) {
  const entries = collectComponents(dsId);
  const bundleName = `${dsId}-components.json`;
  const monoChip: React.CSSProperties = {
    fontFamily: 'ui-monospace, Menlo, monospace',
    background: '#f1f5f9',
    padding: '1px 5px',
    borderRadius: 4,
    color: '#475569',
    fontSize: 12,
  };

  function downloadAll() {
    const payload = {
      dsId,
      generatedAt: new Date().toISOString(),
      schemaUrl: rawGithubUrl('ai/_schema', 'component.schema.json'),
      count: entries.length,
      components: entries.map((e) => {
        try {
          return JSON.parse(e.raw);
        } catch {
          return null;
        }
      }).filter(Boolean),
    };
    downloadBlob(JSON.stringify(payload, null, 2), bundleName, 'application/json');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
        <strong>For designers, PMs, and Figma / tooling authors</strong> — every component in this DS is described as a JSON spec (anatomy, props, variants, states, a11y, examples, do-nots). Validate against{' '}
        <code style={monoChip}>ai/_schema/component.schema.json</code>.
      </p>

      {/* Primary action: bundle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          border: '1px solid #2563eb',
          borderRadius: 12,
          gap: 12,
          background: '#eff6ff',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{bundleName}</div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
            All {entries.length} component{entries.length === 1 ? '' : 's'} bundled into one JSON file — drop into Figma plugins, design audits, or LLM context.
          </div>
        </div>
        <button
          type="button"
          onClick={downloadAll}
          disabled={entries.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 16px',
            borderRadius: 8,
            background: entries.length === 0 ? '#cbd5e1' : '#2563eb',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: 13,
            cursor: entries.length === 0 ? 'not-allowed' : 'pointer',
            flexShrink: 0,
            fontFamily: 'inherit',
          }}
        >
          <IconDownload size={15} />
          Download bundle
        </button>
      </div>

      {/* Per-component list */}
      {entries.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#94a3b8',
            }}
          >
            Or grab one file
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {entries.map((e) => (
              <div
                key={e.filename}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  gap: 12,
                  background: '#f8fafc',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                    {e.name}
                    <span style={{ marginLeft: 8, fontSize: 11, color: '#94a3b8', fontFamily: 'ui-monospace, Menlo, monospace', fontWeight: 400 }}>
                      {e.filename}
                    </span>
                  </div>
                  {e.summary ? (
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {e.summary}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => downloadBlob(e.raw, e.filename, 'application/json')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '6px 10px',
                    borderRadius: 6,
                    background: '#fff',
                    color: '#2563eb',
                    border: '1px solid #cbd5e1',
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: 'pointer',
                    flexShrink: 0,
                    fontFamily: 'inherit',
                  }}
                >
                  <IconDownload size={12} />
                  JSON
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
          No component JSON files found under <code style={monoChip}>ai/{dsId}/components/</code> yet.
        </p>
      )}

      {/* Schema */}
      {SCHEMA_RAW ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            border: '1px dashed #cbd5e1',
            borderRadius: 10,
            gap: 12,
            background: '#fff',
          }}
        >
          <div style={{ fontSize: 12, color: '#475569' }}>
            <strong>Validation schema</strong> — same shape for all three DSes.
            <span style={{ marginLeft: 6, ...monoChip }}>ai/_schema/component.schema.json</span>
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(SCHEMA_RAW, 'component.schema.json', 'application/json')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 10px',
              borderRadius: 6,
              background: '#fff',
              color: '#64748b',
              border: '1px solid #cbd5e1',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              flexShrink: 0,
              fontFamily: 'inherit',
            }}
          >
            <IconDownload size={12} />
            schema.json
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function AssetCard({ asset }: { asset: InstallAsset }) {
  const Icon = asset.icon ?? IconFileCode;
  const disabled = !asset.href;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        gap: 12,
        background: '#f8fafc',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563eb',
            flexShrink: 0,
          }}
        >
          <Icon size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: '#0f172a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {asset.label}
            {asset.badge ? (
              <span
                style={{
                  marginLeft: 8,
                  padding: '2px 6px',
                  background: '#f1f5f9',
                  borderRadius: 4,
                  fontSize: 11,
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                {asset.badge}
              </span>
            ) : null}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            {asset.description}
            {asset.size ? <span style={{ marginLeft: 4, color: '#94a3b8' }}>· {asset.size}</span> : null}
          </div>
        </div>
      </div>
      {disabled ? (
        <span
          style={{
            padding: '6px 12px',
            background: '#f1f5f9',
            borderRadius: 8,
            fontSize: 12,
            color: '#94a3b8',
            flexShrink: 0,
          }}
        >
          Coming soon
        </span>
      ) : (
        <button
          type="button"
          onClick={() => forceDownload(asset.href!, asset.downloadAs ?? asset.label)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 16px',
            borderRadius: 8,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <IconDownload size={15} />
          Download
        </button>
      )}
    </div>
  );
}

/* ─── Exported icon map for per-DS pages ────────────────────────────────── */
export const ASSET_ICONS = { FileCode: IconFileCode, FileText: IconFileText, Package: IconPackage };

/* ─── Main component ────────────────────────────────────────────────────── */
export function InstallPage(props: InstallPageProps) {
  const { dsLabel, tagline, packageName, installCommand, sourcePath, tabs, howToUse } = props;
  const firstEnabled = tabs.find((t) => !t.disabled) ?? tabs[0];
  const [activeId, setActiveId] = useState(firstEnabled?.id);
  const active = tabs.find((t) => t.id === activeId) ?? firstEnabled;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#0f172a',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.25 }}>{dsLabel}</h2>
        <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>{tagline}</p>
        {sourcePath ? (
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: '#94a3b8',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            Source · {sourcePath}
          </p>
        ) : null}
        <div style={{ marginTop: 4 }}>
          <PageUrlBar />
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div
          role="tablist"
          style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}
        >
          {tabs.map((t) => {
            const isActive = t.id === active?.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(t.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                  marginBottom: -1,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#2563eb' : '#64748b',
                  fontFamily: 'inherit',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {active?.asset ? <AssetCard asset={active.asset} /> : null}
          {active?.body}
        </div>
      </div>

      {installCommand && packageName ? (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#94a3b8',
              }}
            >
              Install the package
            </p>
            <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
              Inside any workspace that consumes {dsLabel}:
            </p>
            <CodeBlock>{installCommand}</CodeBlock>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
              Package:{' '}
              <code
                style={{
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  background: '#f1f5f9',
                  padding: '1px 5px',
                  borderRadius: 4,
                }}
              >
                {packageName}
              </code>
            </p>
          </div>
        </>
      ) : null}

      {howToUse ? (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#94a3b8',
              }}
            >
              How to use
            </p>
            {howToUse}
          </div>
        </>
      ) : null}
    </div>
  );
}
