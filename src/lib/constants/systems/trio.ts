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
// THE PIECING LICENSE — FIRST FRUIT (KP, 2026-07-20, verbatim: "i had build an
// environment variable system you likely have ran across by now, feel free to
// piece it out"; REIMAGINING-BOARD.md). The honest flag carried from Step 2 —
// Hermes (`/bazaar`) and Iris (`/connect`) both resolve to the `community`
// EnvironmentKey in page_mapping.ts, so their beam washes shared ONE gradient —
// is given its first fix HERE, additively: each realm now carries a DISTINCT
// beamGradient in the driver map, chosen from the existing GRADIENTS families
// (no new colors), in its own Feeling register:
//   · Hermes ("Abundant, curious, playful, connected") → GRADIENTS.hermes,
//     the deity's own warm/gold gradient — strongest provenance, the god of
//     the Bazaar wearing his own hue.
//   · Iris ("Connected, understood, welcomed, celebrated") → GRADIENTS.bifrostDomain,
//     the rainbow bridge — Iris IS the rainbow bridge of myth; connected,
//     welcomed, celebrated.
// This distinguishes their DRIVER-MAP intent now; the runtime page_mapping.ts
// route→environment share is a route-layer change left for Movement IV (no
// route changes this pass). Pure reference, no new gradients.

import type { EnvironmentKey } from './assets/mapper';
import {
  getBeamConfig,
  type BeamIntensity,
} from '@/lib/constants/components/immersive/continuity_beam';
import { GRADIENTS } from '@/lib/constants/cosmic/effects';
import { getStatusBarConfig } from './environments/status_bar';
import { HEADER_DATA, getPageMetadata } from './environments/page_mapping';
import type { BaseEnvironmentKey, HeaderTypography } from './environments/types';

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
  subEnvironment?: EnvironmentKey,
  /** Piecing-license override: a distinct GRADIENTS reference for realms whose
   *  environment share would otherwise conflate their beam wash (Hermes, Iris). */
  beamGradientOverride?: string
): RealmTrioConfig {
  const beam = getBeamConfig(environment);
  const statusConfig = getStatusBarConfig(environment);
  const subBeam = subEnvironment ? getBeamConfig(subEnvironment) : undefined;

  return {
    environment,
    subEnvironment,
    beamGradient: beamGradientOverride ?? beam.gradient,
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
    'support', // The Healing Flame (/connect/support), IRI-1's second wash
    GRADIENTS.bifrostDomain // piecing-license first fruit: the rainbow bridge (Iris IS the rainbow bridge)
  ),
  hermes: buildRealmConfig(
    'community',
    ['/bazaar'],
    'Abundant, curious, playful, connected',
    undefined,
    GRADIENTS.hermes // piecing-license first fruit: the deity's own warm/gold gradient (was shared `community`)
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

// ============================================================================
// THE HEADER LANE — the quartet's fourth instrument joins the driver map
// ============================================================================
// Provenance: THE QUARTET CORRECTION (KP, 2026-07-20, REIMAGINING-BOARD.md:
// "i realize now i left out the header when offering the immersive
// environmental tools") — the audience said it first (L1-05: "the status bar
// should display something other than title and subtitle as the header
// handles those"). Movement IV duty, built 2026-07-29 by the finishing
// session of THE-FRONTEND-REIMAGINING (study record:
// fable/lanes/study/e2-the-ux-study-bus.md, round 8a work-order step ①).
//
// A REFERENCE lane, additions-only: every value points at data that already
// lives one file over — HEADER_DATA + getPageMetadata (page_mapping.ts) and
// each realm's Feeling line already quoted above. The Header was always the
// quartet's DRIVER (it sets the environment on route change); this lane lets
// it also DRESS from the same spine the other three instruments read.

export interface RealmHeaderConfig {
  /** Page title (page-specific override, else the realm's environment default). */
  title: string;
  /** Page subtitle, same resolution order. */
  subtitle: string;
  /** The realm's Feeling line — the affect register this header stands in
   *  (addressable for surfaces that wear it; the Header itself stays quiet). */
  feeling: string;
  /** The environment key the resolved page carries — the Header sets this
   *  into ContinuityBeamContext, driving the other three instruments. */
  environment: BaseEnvironmentKey;
  /** Whether the header may carry an ancient quote (HEADER_DATA default). */
  showAncientQuote: boolean;
  /** Typography classes per breakpoint — HEADER_DATA.typography, by reference. */
  typography: {
    default: HeaderTypography;
    mobile: HeaderTypography;
    desktop: HeaderTypography;
  };
}

/** The header lane's one door: pathname → realm-aware header dress.
 *  Resolution order preserved from the pre-lane Header: page metadata wins
 *  (exact route, then wildcard), the environment default is the fallback —
 *  behavior identical, address unified. */
export function getRealmHeader(pathname: string | null | undefined): RealmHeaderConfig {
  const realm = detectRealmFromPath(pathname);
  const metadata = getPageMetadata(pathname ?? '/');

  return {
    title: metadata.title,
    subtitle: metadata.subtitle,
    feeling: REALM_TRIO_MAP[realm].feeling,
    environment: metadata.environment,
    showAncientQuote: HEADER_DATA.showAncientQuoteDefault,
    typography: HEADER_DATA.typography,
  };
}
