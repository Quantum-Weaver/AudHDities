// src/lib/hooks/useHouseHref.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE HOUSE HREF HOOK — the browser's host, read after hydration         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { houseHref } from '@/lib/site/house-href';

/** The host never changes under a mounted document; nothing to listen for. */
function watchHost(): () => void {
  return () => {};
}

function readHost(): string | null {
  return window.location.hostname;
}

function noHost(): null {
  return null;
}

/**
 * A function from app path to the href this host should carry. The host is
 * null on the server and through hydration, so the first paint renders the
 * plain path and the client's first re-render corrects it.
 */
export function useHouseHref(): (path: string) => string {
  const hostname = useSyncExternalStore(watchHost, readHost, noHost);
  return useCallback((path: string) => houseHref(path, hostname), [hostname]);
}
