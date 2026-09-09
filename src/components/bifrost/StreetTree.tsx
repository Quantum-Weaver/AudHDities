// src/components/bifrost/StreetTree.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE STREET TREE — every realm named, its rooms folded beneath it       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Circle, Footprints, MapPin } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/yggdrasil/Accordion';
import {
  THE_STREET,
  realmOfPath,
  type StreetRealm,
} from '@/lib/constants/systems/the-street';
import { useDiscovery } from '@/hooks/useDiscovery';
import { cn } from '@/lib/utils';

/** A 2px hearth-gold ring at 2px offset — 12.7:1 on the bar ground. */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

/** One realm as the tree draws it. */
export interface StreetTreeRow {
  realm: StreetRealm;
  /** The realm the current path stands in. */
  here: boolean;
  /** Walked ground; null until the discovery shelf has been read. */
  walked: boolean | null;
}

/** The whole street as rows — every realm of THE_STREET, in its own order. */
export function streetRows(
  pathname: string,
  discovered: readonly string[],
  ready: boolean
): StreetTreeRow[] {
  const standing = realmOfPath(pathname || '/');
  const known = new Set(discovered);
  return THE_STREET.map((realm) => ({
    realm,
    here: standing?.name === realm.name,
    walked: ready ? known.has(realm.name) || realm.alwaysOpen === true : null,
  }));
}

/** The realms the tree opens on: the one the vessel stands in. */
export function openRealms(rows: ReadonlyArray<StreetTreeRow>): string[] {
  return rows.filter((row) => row.here).map((row) => row.realm.name);
}

export interface StreetTreeProps {
  /** Called when the vessel walks through a door — the caller folds itself. */
  onTravel?: () => void;
  className?: string;
  /** Denser rows, for the drawer. */
  compact?: boolean;
}

export default function StreetTree({ onTravel, className, compact = false }: StreetTreeProps) {
  const pathname = usePathname() || '/';
  const { discovered, ready } = useDiscovery();

  const rows = useMemo(
    () => streetRows(pathname, discovered, ready),
    [pathname, discovered, ready]
  );

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <Accordion
      key={pathname}
      type="multiple"
      variant="minimal"
      size="sm"
      defaultValue={openRealms(rows)}
      className={cn('w-full', className)}
    >
      {rows.map(({ realm, here, walked }) => (
        <AccordionItem key={realm.name} value={realm.name}>
          <AccordionTrigger
            className={cn(
              'min-h-11 rounded-lg text-star-dust/80 hover:bg-white/5',
              compact ? 'px-2 py-1.5' : 'px-3 py-2',
              FOCUS_RING
            )}
          >
            <span className="flex min-w-0 flex-col items-start gap-0.5">
              <span className="flex items-center gap-2">
                <span className={cn('truncate text-star-dust', compact ? 'text-sm' : 'text-sm font-medium')}>
                  {realm.name}
                </span>
                {here && (
                  <span className="flex items-center text-neurospark">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">You are here.</span>
                  </span>
                )}
                {walked === true && (
                  <span className="flex items-center text-star-dust/50">
                    <Footprints className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">Walked.</span>
                  </span>
                )}
                {walked === false && (
                  <span className="flex items-center text-star-dust/30">
                    <Circle className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">Not yet walked.</span>
                  </span>
                )}
              </span>
              <span className={cn('truncate font-normal text-star-dust/50', compact ? 'text-[10px]' : 'text-xs')}>
                {realm.whisper}
              </span>
            </span>
          </AccordionTrigger>

          <AccordionContent className={cn('pt-0', compact ? 'px-2 pb-1' : 'px-3 pb-2')}>
            <ul className="flex flex-col gap-0.5 border-l border-white/10 pl-2">
              {realm.rooms.map((room) => {
                const active = isActive(room.href);
                return (
                  <li key={room.href}>
                    <Link
                      href={room.href}
                      onClick={onTravel}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors motion-reduce:transition-none',
                        compact ? 'py-1.5' : 'py-2',
                        FOCUS_RING,
                        active
                          ? 'bg-neurospark/15 text-neurospark'
                          : 'text-star-dust/70 hover:bg-white/5 hover:text-star-dust'
                      )}
                    >
                      {room.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
