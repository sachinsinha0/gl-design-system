import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { YStack, XStack, Stack, Typography, ScrollView, Separator } from '@gl/elements';
import { Check, ChevronsUpDown, Home } from '@tamagui/lucide-icons';
import { useActiveDS, useActiveDSId, useSetActiveDS } from '../platform/ds-context';
import { listDesignSystems, hasDesignSystem, type DSId, type DSChrome } from '../platform/ds-registry';
import { equivalentSlug } from '../platform/ds-equivalence';
import { SearchBox } from './search-box';
import { ThemeSwitcher } from './theme-switcher';

const DEFAULT_CHROME: DSChrome = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  accent: '#E8F0FE',
  accentText: '#0B57D0'
};

function DSSwitchHeader() {
  const activeId = useActiveDSId();
  const ds = useActiveDS();
  const setActive = useSetActiveDS();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const systems = listDesignSystems();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(t) &&
        menuRef.current && !menuRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function switchTo(newId: DSId) {
    setOpen(false);
    if (newId === activeId) return;
    const parts = pathname.split('/').filter(Boolean);
    const [first, ...rest] = parts;
    const currentSlug = first && hasDesignSystem(first) && rest.length > 0 ? rest.join('/') : 'home';
    setActive(newId);
    const targetSlug = equivalentSlug(activeId, currentSlug, newId);
    navigate(targetSlug === 'home' ? `/${newId}` : `/${newId}/${targetSlug}`);
  }

  return (
    <Stack position="relative" {...({ ref: triggerRef } as any)}>
      <XStack
        tag="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Switch design system. Current: ${ds.label}`}
        onPress={() => setOpen((v) => !v)}
        alignItems="center"
        gap="$2"
        paddingHorizontal="$3"
        paddingVertical="$3"
        backgroundColor={open ? '$surfaceContainerHigh' : 'transparent'}
        hoverStyle={{ backgroundColor: '$surfaceContainerHigh' }}
        cursor="pointer"
        borderWidth={0}
        width="100%"
      >
        <Stack
          width={36}
          height={36}
          borderRadius={10}
          alignItems="center"
          justifyContent="center"
          style={{ background: 'var(--ds-chrome-accent-text)' }}
        >
          <Typography variant="subtitle1" style={{ color: '#fff' }}>
            {ds.label.slice(0, 2).toUpperCase()}
          </Typography>
        </Stack>
        <YStack flex={1} alignItems="flex-start">
          <Typography variant="subtitle1">{ds.label}</Typography>
          <Typography variant="caption2" color="$onSurfaceVariant">
            {ds.tagline}
          </Typography>
        </YStack>
        <Stack opacity={0.7}>
          <ChevronsUpDown size={16} color="$onSurfaceVariant" />
        </Stack>
      </XStack>
      {open ? (
        <YStack
          {...({ ref: menuRef } as any)}
          role="listbox"
          position="absolute"
          top="100%"
          left="$2"
          right="$2"
          marginTop="$1"
          backgroundColor="$surface"
          borderRadius={12}
          borderWidth={1}
          borderColor="$outlineVariant"
          padding="$1"
          zIndex={1000}
          shadowColor="rgba(0,0,0,0.18)"
          shadowRadius={16}
          shadowOffset={{ width: 0, height: 8 }}
        >
          {systems.map((d) => {
            const active = d.id === activeId;
            return (
              <XStack
                key={d.id}
                tag="button"
                role="option"
                aria-selected={active}
                onPress={() => switchTo(d.id)}
                alignItems="center"
                gap="$2"
                paddingHorizontal="$2.5"
                paddingVertical="$2"
                borderRadius={8}
                borderWidth={0}
                hoverStyle={{ backgroundColor: '$surfaceContainerHigh' }}
                cursor="pointer"
                width="100%"
                style={
                  active
                    ? { background: 'var(--ds-chrome-accent)' }
                    : { background: 'transparent' }
                }
              >
                <Stack width={20} alignItems="center">
                  {active ? (
                    <Check size={16} style={{ color: 'var(--ds-chrome-accent-text)' }} />
                  ) : null}
                </Stack>
                <YStack flex={1} alignItems="flex-start">
                  <Typography
                    variant="body2"
                    style={active ? { color: 'var(--ds-chrome-accent-text)' } : undefined}
                  >
                    {d.label}
                  </Typography>
                  <Typography variant="caption2" color="$onSurfaceVariant">
                    {d.tagline}
                  </Typography>
                </YStack>
              </XStack>
            );
          })}
        </YStack>
      ) : null}
    </Stack>
  );
}

function NavRow({
  to,
  label,
  active,
  icon
}: {
  to: string;
  label: string;
  active: boolean;
  icon?: ReactNode;
}) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }} data-active={active || undefined}>
      <XStack
        alignItems="center"
        gap="$2"
        paddingHorizontal="$2.5"
        paddingVertical="$2"
        borderRadius={10}
        hoverStyle={{ backgroundColor: '$surfaceContainerHigh' }}
        cursor="pointer"
        style={
          active
            ? { background: 'var(--ds-chrome-accent)', color: 'var(--ds-chrome-accent-text)' }
            : undefined
        }
      >
        {icon ? <Stack width={18}>{icon}</Stack> : null}
        <Typography
          variant="body2"
          style={active ? { color: 'var(--ds-chrome-accent-text)' } : undefined}
        >
          {label}
        </Typography>
      </XStack>
    </Link>
  );
}

export function Sidebar() {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const chrome = ds.chrome ?? DEFAULT_CHROME;
  const homePath = `/${dsId}`;
  return (
    <div
      data-ds-chrome={dsId}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: chrome.fontFamily,
        ['--ds-chrome-accent' as never]: chrome.accent,
        ['--ds-chrome-accent-text' as never]: chrome.accentText
      }}
    >
      {/* Force all sidebar text to inherit the active DS's font and to inherit color when an
          ancestor has set --ds-chrome-accent-text (the active row). */}
      <style>{`[data-ds-chrome] * { font-family: inherit; }`}</style>
      <YStack
        width={264}
        flex={1}
        backgroundColor="$surfaceContainerLow"
        borderRightWidth={1}
        borderColor="$outlineVariant"
      >
        <DSSwitchHeader />
        <Stack paddingHorizontal="$3" paddingBottom="$3">
          <SearchBox />
        </Stack>
        <Separator />
        <ScrollView flex={1} contentContainerStyle={{ padding: 12, gap: 4 }}>
          <NavRow
            to={homePath}
            label="Home"
            active={pathname === homePath}
            icon={<Home size={18} color={pathname === homePath ? '$onPrimaryContainer' : '$onSurfaceVariant'} />}
          />
          {ds.registry.map((group) => {
            const GroupIcon = group.icon as
              | ComponentType<{ size?: number; color?: string }>
              | undefined;
            return (
              <YStack key={group.id} gap="$0.5" marginTop="$3">
                <XStack alignItems="center" gap="$1.5" paddingHorizontal="$2.5" paddingBottom="$1">
                  {GroupIcon ? <GroupIcon size={14} color="$onSurfaceVariant" /> : null}
                  <Typography variant="overline" color="$onSurfaceVariant">
                    {group.label}
                  </Typography>
                </XStack>
                {group.entries.map((entry) => {
                  const to = `${homePath}/${entry.slug}`;
                  return (
                    <NavRow
                      key={entry.slug}
                      to={to}
                      label={entry.title}
                      active={pathname === to}
                    />
                  );
                })}
              </YStack>
            );
          })}
        </ScrollView>
        <Separator />
        <Stack paddingHorizontal="$3" paddingVertical="$2.5">
          <ThemeSwitcher />
        </Stack>
      </YStack>
    </div>
  );
}
