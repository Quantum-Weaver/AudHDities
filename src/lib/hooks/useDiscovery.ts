// src/hooks/useDiscovery.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DISCOVERY MEMORY — what ground this vessel has walked              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

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
