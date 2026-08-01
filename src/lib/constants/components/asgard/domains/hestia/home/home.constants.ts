// src/lib/constants/components/asgard/domains/hestia/home/home.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HOME PAGE CONSTANTS                                    ║
// ║                    Raw values — no CVA, no logic                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { SPACING_SCALE, BORDER_RADII } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

export const HOME_METADATA = {
  TITLE: 'AudHDities — Sovereign Sanctuary',
  DESCRIPTION: 'A place where you belong. For neurodivergent creators, contributors, and community.',
} as const;

export const HOME_LABELS = {
  BADGE: 'A Sovereign Sanctuary',
  HEADING_PREFIX: 'A Place Where',
  HEADING_HIGHLIGHT: 'You Belong',
  SUBTITLE: 'For neurodivergent creators, contributors, and community.',
  SUBTITLE_SECOND: 'Come as you are. Your sovereignty is respected here.',
  CTA: 'Enter the Sanctuary',
  TRUST_1: 'No hidden fees',
  TRUST_2: '100% transparent',
  TRUST_3: 'Community-owned',
  // FÁILTE — the Hearth's own greeting (Shuttle Run 08, Phase 5, Movement
  // III, "THE THRESHOLDS"). Provenance: REIMAGINING-BOARD.md, THE SIX
  // STROKES, stroke 1, KP's word verbatim: "Velkomin at the door + Fáilte
  // at the Hearth." Irish — Brigid's own tongue, the Hearth-Keeper deity;
  // a NOUN-greeting, structurally incapable of inference (no tense, no
  // "back," no assumption about return-vs-first-visit). Distinct from
  // Velkomin (the door's word, fired once at the crossing in
  // VelkominGreeting.tsx) — this is the persistent eyebrow the Hearth
  // always wears, every visit, never doubled with the door's word in the
  // same glance.
  HEARTH_GREETING: 'Fáilte',
  GREETING_FALLBACK: 'Sovereign',
} as const;

export const HOME_ROUTES = {
  SANCTUARY: '/sanctuary',
} as const;

export const HOME_DIMENSIONS = {
  HERO_PADDING_Y: SPACING_SCALE['20'],
  HERO_PADDING_X: SPACING_SCALE['6'],
  ORB_SIZE: 'w-96 h-96',
  BADGE_RADIUS: BORDER_RADII.full,
  ICON_SIZE: 14,
  CTA_ICON_SIZE: 18,
} as const;

export const HOME_TRANSITION = {
  DURATION: durations.normal,
} as const;