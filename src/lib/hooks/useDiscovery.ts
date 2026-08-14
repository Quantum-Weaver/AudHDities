// src/hooks/useDiscovery.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DISCOVERY MEMORY — what ground this vessel has walked              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Born 2026-08-11 with the Léarscáil, at KP's ⚛ ruling this sitting:
// discovery happens BY VISITING THE PLACE. Walk into the Library once and
// the Library's ground is named on your map, forever. Discovery follows
// living — never a task, never a checklist, never an errand the house sets.
//
// WHERE IT LIVES, and why: THIS VESSEL'S OWN DEVICE, and nowhere else.
// Law V of the play study (2026-07-31), the structural half: "what the
// ledger never speaks, the base should not keep — absence beats encryption."
// A row recording which rooms a person has entered is an attendance ledger
// (the refusal column names it by that name), and the Sanctuary has no
// business holding one. So there is no table, no request, no sync: the map
// remembers on the glass in front of the vessel, and forgets utterly when
// they say so.
//
// Consequences, stated plainly rather than hidden: a new device begins with
// a new map. That is a FEATURE of the choice, not a defect of it — the cost
// of never keeping a record of someone's movements, paid openly. Should KP ⚛
// ever want the map to travel, that is a schema gate at his hand and a
// consent question before it, never a default.
//
// Laws worn: append-only (what opens, keeps — there is no forget verb, only
// the whole purge) · own-only · the purge truly purges · a storage that
// fails is silent and harmless (a map that cannot remember still opens).

'use client';

import { useCallback, useEffect, useState } from 'react';

const SHELF = 'audhdities.learscail.discovered.v1';

function read(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SHELF);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    // A shelf that will not open is not an error worth telling anyone about;
    // the map simply opens with nothing named yet.
    return [];
  }
}

function write(names: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SHELF, JSON.stringify(names));
  } catch {
    /* Private mode, full disk, a locked shelf — the map still works. */
  }
}

export interface Discovery {
  /** Province names this vessel has walked. Append-only. */
  discovered: string[];
  /** Name a province — walking is the act; calling twice changes nothing. */
  discover: (name: string) => void;
  /** The vessel's own hand, and it clears wholly. */
  purge: () => void;
  /** False until the shelf has been read, so the first paint never lies. */
  ready: boolean;
}

export function useDiscovery(): Discovery {
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Read once on the client. Server render begins with nothing named, which
  // is honest: the server genuinely does not know, and must not.
  useEffect(() => {
    setDiscovered(read());
    setReady(true);
  }, []);

  const discover = useCallback((name: string) => {
    const clean = String(name || '').trim();
    if (!clean) return;
    setDiscovered((standing) => {
      if (standing.includes(clean)) return standing; // keeps; no churn
      const grown = [...standing, clean];
      write(grown);
      return grown;
    });
  }, []);

  const purge = useCallback(() => {
    setDiscovered([]);
    write([]);
  }, []);

  return { discovered, discover, purge, ready };
}
