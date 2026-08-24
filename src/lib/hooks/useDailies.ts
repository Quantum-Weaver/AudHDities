// src/lib/hooks/useDailies.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DAILIES MEMORY — which puzzles this vessel has already met         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Born 2026-08-24 with the Dailies, in the shape and the voice of
// useDiscovery.ts beside it, because it answers the same law with the same
// answer and a second dialect would be a second law.
//
// WHERE IT LIVES, and why: THIS VESSEL'S OWN DEVICE, and nowhere else.
// Law V of the play study (2026-07-31): "what the ledger never speaks, the
// base should not keep." A row recording which puzzles a person solved, and
// when, is an attendance ledger wearing a game's clothes — and the tenth-man
// pass on that study went further: "a pressure organ that cannot be built
// later is safer than one merely undisplayed." So there is no table, no
// request, no sync, and `daily_puzzles` carries that refusal in its own
// COMMENT ON TABLE where a later hand cannot fail to read it.
//
// WHAT THIS IS FOR, and the one thing it is NOT for. It exists so the shelf
// can hand you one you have not met, and so a puzzle you return to can say
// so quietly. It is NOT for counting. The shelf shows no marks, no tally,
// no "12 of 140" — because an index of dated rows with some of them ticked
// is a missing-slot silhouette, and the refusal column names that by name.
// The vessel is never handed arithmetic about themselves to perform.
//
// Consequences, stated plainly rather than hidden: a new device begins
// fresh, and every puzzle is new again. That is a FEATURE of the choice,
// paid openly — the cost of never keeping a record of someone's mornings.
//
// Laws worn: append-only (there is no un-meet, only the whole purge) ·
// own-only · the purge truly purges · a storage that fails is silent and
// harmless (a shelf that cannot remember still opens, and every puzzle on
// it still plays).

'use client';

import { useCallback, useEffect, useState } from 'react';

const SHELF = 'audhdities.dailies.met.v1';

function read(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SHELF);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    // A shelf that will not open is not an error worth telling anyone
    // about; the dailies simply open with nothing remembered yet.
    return [];
  }
}

function write(slugs: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SHELF, JSON.stringify(slugs));
  } catch {
    /* Private mode, full disk, a locked shelf — every puzzle still plays. */
  }
}

export interface DailiesMemory {
  /** Slugs this vessel has met. Append-only, and never rendered as a count. */
  met: string[];
  /** Name one as met. Calling twice changes nothing. */
  meet: (slug: string) => void;
  /** Has this one been met before? For the open puzzle only, never the shelf. */
  hasMet: (slug: string) => boolean;
  /** The vessel's own hand, and it clears wholly. */
  purge: () => void;
  /** False until the shelf has been read, so the first paint never lies. */
  ready: boolean;
}

export function useDailies(): DailiesMemory {
  const [met, setMet] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Read once on the client. The server render begins with nothing
  // remembered, which is honest: the server genuinely does not know, and
  // must not.
  useEffect(() => {
    setMet(read());
    setReady(true);
  }, []);

  const meet = useCallback((slug: string) => {
    const clean = String(slug || '').trim();
    if (!clean) return;
    setMet((standing) => {
      if (standing.includes(clean)) return standing; // keeps; no churn
      const grown = [...standing, clean];
      write(grown);
      return grown;
    });
  }, []);

  const hasMet = useCallback(
    (slug: string) => met.includes(String(slug || '').trim()),
    [met],
  );

  const purge = useCallback(() => {
    setMet([]);
    write([]);
  }, []);

  return { met, meet, hasMet, purge, ready };
}
