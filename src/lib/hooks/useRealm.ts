// src/hooks/useRealm.ts
// ============================================================================
// useRealm — derives the current realm from the route (X-OP-0 keystone,
// Run 08 Phase 5 Movement I Step 2, "THE TRIO ADDRESSABLE")
// ============================================================================
// A small, realm-generic utility so any trio component (StatusBar, nav,
// ContinuityBeam) can ask "which realm am I standing in?" without each one
// re-deriving pathname → realm on its own. Reads the driver map
// (lib/constants/systems/trio.ts) built from BEAM_COLORS + STATUS_BAR_CONFIG.

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
