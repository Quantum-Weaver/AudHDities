// src/lib/constants/systems/trio.ts
// ============================================================================
// THE TRIO DRIVER MAP — realm → chrome (X-OP-0 keystone, addressed)
// ============================================================================
// Provenance: Shuttle Run 08 — Phase 5, Movement I, Step 2 ("THE TRIO
// ADDRESSABLE"), resonance-chamber/desk/REIMAGINING-BOARD.md. Composes X-OP-0's
// own driver-map lean ("the realm+state→trio mapping... in lib/constants/
// systems, beside the AssetMapper/environments engine" —
// desk/realm-proposals/cross-realm-opus.md) and IRI-1 ("the beam rewired" —
// desk/realm-proposals/iris.md). Feeling lines below are quoted, realm by
// realm, from each realm's own desk/realm-proposals/<realm>.md, which in turn
// quote the L1-03 realm→feeling atlas (Phase 1, THE REALM AUDIENCES).
//
// Additions-only: every value is a REFERENCE into an already-signed constant
// (BEAM_COLORS via getBeamConfig, STATUS_BAR_CONFIG via getStatusBarConfig,
// EnvironmentKey) — no new colors, no new gradients, no new tokens. This file
// is the one address book the chrome trio (ContinuityBeam + StatusBar + nav)
// reads to know which realm it is standing in.
//
// Known, honest limit (observed, not fixed here — no route changes this
// pass): Hermes (`/bazaar`) and Iris (`/connect`) both resolve to the
// `community` EnvironmentKey in page_mapping.ts today, so their beam washes
// share one gradient. That conflation predates this file; it is named here
// rather than quietly inherited.

import type { EnvironmentKey } from './assets/mapper';
import {
  getBeamConfig,
  type BeamIntensity,
} from '@/lib/constants/components/immersive/continuity_beam';
import { getStatusBarConfig } from './environments/status_bar';

// ============================================================================
// REALM KEYS — the eleven `(parenthesis)` route groups + auth
// ============================================================================

export type RealmKey =
  | 'hestia'
  | 'themis'
  | 'iris'
  | 'hermes'
  | 'prometheus'
  | 'aethelred'
  | 'cosmic'
  | 'athena'
  | 'hephaestus'
  | 'mnemosyne'
  | 'auth';

export interface RealmTrioConfig {
  /** The environment key this realm's hub route resolves to (drives the
   *  PanoramaViewer, the beam gradient, and the status-bar metric set). */
  environment: EnvironmentKey;
  /** A distinct sub-threshold this realm carries a second, named beam wash
   *  for (e.g. Iris's Healing Flame, IRI-1). The live per-route environment
   *  (`useEnvironment()`, already pathname-reactive via page_mapping.ts)
   *  resolves the exact wash in practice; this field documents the intent. */
  subEnvironment?: EnvironmentKey;
  /** Beam gradient for the primary environment (BEAM_COLORS, via getBeamConfig — not duplicated here). */
  beamGradient: string;
  /** Beam gradient for the named sub-environment, where one exists. */
  subBeamGradient?: string;
  /** Baseline beam intensity category for arrival at this realm. */
  beamIntensity: BeamIntensity;
  /** Status-bar height mode already assigned to this environment (sm/md/lg). */
  statusBarHeight: 'sm' | 'md' | 'lg';
  /** Status-bar accent color class already assigned to this environment's
   *  first metric (STATUS_BAR_CONFIG) — the tone the chrome wears here. */
  statusBarAccent: string;
  /** The realm's Feeling line, quoted from its own desk/realm-proposals file. */
  feeling: string;
  /** Route prefixes (as-built, from src/app/(realm)/…) this realm claims.
   *  Used by detectRealmFromPath — longest-prefix match wins. */
  routes: string[];
}

function buildRealmConfig(
  environment: EnvironmentKey,
  routes: string[],
  feeling: string,
  subEnvironment?: EnvironmentKey
): RealmTrioConfig {
  const beam = getBeamConfig(environment);
  const statusConfig = getStatusBarConfig(environment);
  const subBeam = subEnvironment ? getBeamConfig(subEnvironment) : undefined;

  return {
    environment,
    subEnvironment,
    beamGradient: beam.gradient,
    subBeamGradient: subBeam?.gradient,
    beamIntensity: beam.intensity,
    statusBarHeight: statusConfig.height,
    statusBarAccent: statusConfig.metrics[0]?.color ?? 'text-neurospark',
    feeling,
    routes,
  };
}

// ============================================================================
// THE MAP — one entry per realm
// ============================================================================

export const REALM_TRIO_MAP: Record<RealmKey, RealmTrioConfig> = {
  hestia: buildRealmConfig(
    'home',
    ['/', '/vessel', '/notifications'],
    'Warm, welcoming, safe, reflective'
  ),
  themis: buildRealmConfig(
    'council',
    ['/council'],
    'Transparent, just, collaborative, wise'
  ),
  iris: buildRealmConfig(
    'community',
    ['/connect'],
    'Connected, understood, welcomed, celebrated',
    'support' // The Healing Flame (/connect/support), IRI-1's second wash
  ),
  hermes: buildRealmConfig(
    'community',
    ['/bazaar'],
    'Abundant, curious, playful, connected'
  ),
  prometheus: buildRealmConfig(
    'music',
    ['/stage', '/studio'],
    'Generative, fluid, sovereign, unbounded'
  ),
  aethelred: buildRealmConfig(
    'architecture',
    ['/nexus'],
    'Bridging, integrating, whole, sovereign'
  ),
  cosmic: buildRealmConfig(
    'architecture',
    ['/environments', '/playground', '/theater', '/effects'],
    'Playful, alive, boundless, curious'
  ),
  athena: buildRealmConfig(
    'library',
    ['/library'],
    'Peaceful, wise, expansive, curious'
  ),
  hephaestus: buildRealmConfig(
    'forge',
    ['/forge', '/about', '/privacy', '/terms', '/sanctuary'],
    // Both Feeling lines held at once — KP's Phase 4 signature, verbatim:
    // "hephaestus's register was deliberately both at once."
    'Structured, transparent, reliable, foundational — and, held at once, intelligent, powerful, sacred'
  ),
  mnemosyne: buildRealmConfig(
    'observatory',
    ['/observatory', '/questionaire'],
    'Awe-inspiring, reflective, cosmic, visionary'
  ),
  auth: buildRealmConfig(
    'origin',
    ['/login', '/signup', '/enter'],
    'Sacred, contemplative, ancient, awakening'
  ),
};

export const DEFAULT_REALM: RealmKey = 'hestia';

// ============================================================================
// DETECTION — pathname → realm (longest route-prefix wins)
// ============================================================================

export function detectRealmFromPath(pathname: string | null | undefined): RealmKey {
  if (!pathname) return DEFAULT_REALM;

  let best: { realm: RealmKey; length: number } | null = null;

  for (const [realm, config] of Object.entries(REALM_TRIO_MAP) as [RealmKey, RealmTrioConfig][]) {
    for (const route of config.routes) {
      const matches = route === '/' ? pathname === '/' : pathname.startsWith(route);
      if (matches && (!best || route.length > best.length)) {
        best = { realm, length: route.length };
      }
    }
  }

  return best?.realm ?? DEFAULT_REALM;
}

/** Convenience accessor — the environment key a realm's chrome should read. */
export function getRealmEnvironment(realm: RealmKey): EnvironmentKey {
  return REALM_TRIO_MAP[realm].environment;
}
