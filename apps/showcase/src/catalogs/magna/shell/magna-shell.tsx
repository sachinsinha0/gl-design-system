import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Provider as MagnaProvider,
  YStack,
  XStack,
  Stack,
  Typography,
  ScrollView,
  Separator,
  Icon,
  useThemeSetting
} from '@gl/elements';
import { Check, ChevronsUpDown, Home, Search, Sun, Moon, Palette } from '@tamagui/lucide-icons';
import { useActiveDS, useActiveDSId, useSetActiveDS } from '../../../platform/ds-context';
import { listDesignSystems, hasDesignSystem, type DSId } from '../../../platform/ds-registry';
import { equivalentSlug } from '../../../platform/ds-equivalence';
import { useDSSearch } from '../../../platform/search-index';
import { usePageHeader } from '../../../platform/page-header';

function DSSwitchHeader() {
  const activeId = useActiveDSId();
  const ds = useActiveDS();
  const setActive = useSetActiveDS();
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
    const targetSlug = equivalentSlug(activeId, currentSlug, newId);
    if (typeof window !== 'undefined' && targetSlug !== 'home') {
      window.localStorage.setItem('ds.pendingSlug', targetSlug);
    }
    setActive(newId);
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
          backgroundColor="$primary"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="subtitle1" color="$onPrimary">
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
                backgroundColor={active ? '$primaryContainer' : 'transparent'}
                hoverStyle={{ backgroundColor: active ? '$primaryContainer' : '$surfaceContainerHigh' }}
                cursor="pointer"
                width="100%"
              >
                <Stack width={20} alignItems="center">
                  {active ? <Check size={16} color="$onPrimaryContainer" /> : null}
                </Stack>
                <YStack flex={1} alignItems="flex-start">
                  <Typography variant="body2" color={active ? '$onPrimaryContainer' : '$onSurface'}>
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

function MagnaSearchBox() {
  const activeId = useActiveDSId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const results = useDSSearch(query);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function navigateTo(path: string, targetDsId: DSId) {
    setOpen(false);
    setQuery('');
    if (targetDsId !== activeId) {
      window.location.assign(path);
    } else {
      // Same DS: soft nav via Link.
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  const showDropdown = open && query.trim().length > 0 && results.length > 0;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <XStack
        alignItems="center"
        gap="$2"
        paddingHorizontal="$2.5"
        height={36}
        borderRadius={10}
        borderWidth={1}
        borderColor="$outlineVariant"
        backgroundColor="$surfaceContainerLowest"
      >
        <Icon icon={<Search />} size={15} color="$onSurfaceVariant" />
        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          aria-label="Search design systems"
          placeholder="Search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          style={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: 13,
            WebkitAppearance: 'none' as never
          }}
        />
        <Stack
          paddingHorizontal="$1.5"
          paddingVertical="$0.5"
          borderRadius={4}
          borderWidth={1}
          borderColor="$outlineVariant"
          opacity={0.7}
        >
          <Typography variant="caption2" fontFamily="$monospace">⌘K</Typography>
        </Stack>
      </XStack>
      {showDropdown ? (
        <YStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          marginTop={6}
          backgroundColor="$surface"
          borderRadius={10}
          borderWidth={1}
          borderColor="$outlineVariant"
          padding={4}
          zIndex={1000}
          maxHeight={360}
          overflow="scroll"
          shadowColor="rgba(0,0,0,0.18)"
          shadowRadius={20}
          shadowOffset={{ width: 0, height: 10 }}
        >
          {results.map((r) => (
            <XStack
              key={r.id}
              tag="button"
              onPress={() => navigateTo(r.path, r.dsId)}
              paddingHorizontal="$2.5"
              paddingVertical="$2"
              borderRadius={6}
              borderWidth={0}
              backgroundColor="transparent"
              hoverStyle={{ backgroundColor: '$surfaceContainerHigh' }}
              cursor="pointer"
              width="100%"
            >
              <YStack flex={1} alignItems="flex-start">
                <Typography variant="body2">{r.title}</Typography>
                <Typography variant="caption2" color="$onSurfaceVariant">
                  {r.dsLabel} · {r.group}
                </Typography>
              </YStack>
            </XStack>
          ))}
        </YStack>
      ) : null}
    </div>
  );
}

function MagnaThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeSetting();
  const ds = useActiveDS();
  const themes = ds.themes ?? [];
  const isDark = colorScheme === 'dark';
  return (
    <XStack gap="$2" alignItems="center" justifyContent="space-between" width="100%">
      {themes.length > 0 ? (
        <XStack
          alignItems="center"
          gap="$1.5"
          paddingLeft="$2.5"
          paddingRight="$1.5"
          height={34}
          borderRadius={8}
          borderWidth={1}
          borderColor="$outlineVariant"
          flex={1}
        >
          <Icon icon={<Palette />} size={14} color="$onSurfaceVariant" />
          <select
            aria-label="Color theme"
            value={theme ?? themes[0]?.id ?? ''}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              font: 'inherit',
              fontSize: 13,
              padding: '4px 4px',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none' as never
            }}
          >
            {themes.map((t: { id: string; label: string }) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </XStack>
      ) : <Stack flex={1} />}
      <XStack
        tag="button"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onPress={() => setColorScheme(isDark ? 'light' : 'dark')}
        width={34}
        height={34}
        borderRadius={8}
        borderWidth={1}
        borderColor="$outlineVariant"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        backgroundColor="transparent"
        hoverStyle={{ backgroundColor: '$surfaceContainerHigh' }}
      >
        <Icon icon={isDark ? <Sun /> : <Moon />} size={16} color="$onSurface" />
      </XStack>
    </XStack>
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
    <Link to={to} style={{ textDecoration: 'none' }}>
      <XStack
        alignItems="center"
        gap="$2"
        paddingHorizontal="$2.5"
        paddingVertical="$2"
        borderRadius={10}
        backgroundColor={active ? '$primaryContainer' : 'transparent'}
        hoverStyle={{ backgroundColor: active ? '$primaryContainer' : '$surfaceContainerHigh' }}
        cursor="pointer"
      >
        {icon ? <Stack width={18}>{icon}</Stack> : null}
        <Typography variant="body2" color={active ? '$onPrimaryContainer' : '$onSurface'}>
          {label}
        </Typography>
      </XStack>
    </Link>
  );
}

function MagnaPageHeader() {
  const { eyebrow, title } = usePageHeader();
  return (
    <YStack paddingBottom="$3" gap="$0.5">
      {eyebrow ? (
        <Typography variant="overline" color="$onSurfaceVariant">{eyebrow}</Typography>
      ) : null}
      <Typography variant="h4">{title}</Typography>
    </YStack>
  );
}

function MagnaSidebar() {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const homePath = `/${dsId}`;
  return (
    <YStack
      width={264}
      height="100%"
      backgroundColor="$surfaceContainerLow"
      borderRightWidth={1}
      borderColor="$outlineVariant"
    >
      <DSSwitchHeader />
      <Stack paddingHorizontal="$3" paddingBottom="$3">
        <MagnaSearchBox />
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
          const GroupIcon = group.icon as ComponentType<{ size?: number; color?: string }> | undefined;
          return (
            <YStack key={group.id} gap="$0.5" marginTop="$3">
              <XStack alignItems="center" gap="$1.5" paddingHorizontal="$2.5" paddingBottom="$1">
                {GroupIcon ? <GroupIcon size={14} color="$onSurfaceVariant" /> : null}
                <Typography variant="overline" color="$onSurfaceVariant">{group.label}</Typography>
              </XStack>
              {group.entries.map((entry) => {
                const to = `${homePath}/${entry.slug}`;
                return (
                  <NavRow key={entry.slug} to={to} label={entry.title} active={pathname === to} />
                );
              })}
            </YStack>
          );
        })}
      </ScrollView>
      <Separator />
      <Stack paddingHorizontal="$3" paddingVertical="$2.5">
        <MagnaThemeSwitcher />
      </Stack>
    </YStack>
  );
}

export function MagnaShell({ children }: { children: ReactNode }) {
  return (
    <MagnaProvider>
      <XStack height="100vh" backgroundColor="$surface">
        <MagnaSidebar />
        <YStack flex={1} backgroundColor="$background">
          <ScrollView
            flex={1}
            contentContainerStyle={{
              paddingHorizontal: 40,
              paddingVertical: 36,
              alignItems: 'center'
            }}
          >
            <YStack width="100%" maxWidth={1180}>
              <MagnaPageHeader />
              {children}
            </YStack>
          </ScrollView>
        </YStack>
      </XStack>
    </MagnaProvider>
  );
}
