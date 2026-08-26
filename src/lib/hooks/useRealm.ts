// src/hooks/useRealm.ts
// ============================================================================
// ============================================================================

"use client";

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  REALM_TRIO_MAP,
  detectRealmFromPath,
  type RealmKey,
  type RealmTrioConfig,
} from '@/lib/constants/systems/trio';

export interface UseRealmReturn {
  /** The realm key detected from the current pathname. */
  realm: RealmKey;
  /** That realm's full trio driver entry (environment, beam, status bar, feeling). */
  config: RealmTrioConfig;
}

export function useRealm(): UseRealmReturn {
  const pathname = usePathname();

  const realm = useMemo(() => detectRealmFromPath(pathname), [pathname]);
  const config = REALM_TRIO_MAP[realm];

  return { realm, config };
}
