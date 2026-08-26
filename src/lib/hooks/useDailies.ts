// src/lib/hooks/useDailies.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DAILIES MEMORY — which puzzles this vessel has already met         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

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
