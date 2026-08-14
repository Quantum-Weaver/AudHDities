// lib/constants/systems/environments/affects.ts
// ============================================================================
// THE AFFECT BUNDLES — EnvironmentKey → token dress (the fifth instrument's
// wardrobe, and the resolver's token-era output)
// ============================================================================
// Provenance: THE-FRONTEND-REIMAGINING, finishing session 2026-07-29 (study
// record: resonance-chamber/desk/records/fable-lanes/study/
// e2-the-ux-study-bus.md — round 8a work-order, steps ② and ③). KP's
// commission verbatim: "the current state of the AudHDities build still has
// background images. i want to use our cosmic system to provide a better
// dynamic ui system." The images are RETIRED (KP's ✍ stroke 2026-07-19,
// lose-nothing ×2: Well archive + holodeck second life). Affect comes from
// constants, not pictures.
//
// Additions-only, pure reference — every value points at an already-signed
// constant:
//   · the wash — BEAM_COLORS[environment] (cosmic GRADIENTS; the beam's own
//     environment→color judgment, reused whole rather than re-decided)
//   · the soul — EnvironmentPromptMap mood/colors/themes (the places' souls,
//     preserved as data when the panoramas retired; the alias table below is
//     the AssetMapper's own scene-sharing, lifted verbatim under the piecing
//     license so the souls outlive the image catalog)
//   · the breathing — the old engine's measured cadence (SCALING_CONFIG,
//     47.7s scale constellation), carried whole so the token era breathes at
//     the exact tempo the image era did. Instant under reduced motion — the
//     sensory law rides in the component, not here.

import type { EnvironmentKey } from '../assets/mapper';
import { BEAM_COLORS } from '@/lib/constants/components/immersive/continuity_beam';
import {
  SCALING_CONFIG,
  backgroundScales,
} from '@/lib/constants/components/immersive/quantum_background';
import { EnvironmentPromptMap } from '../assets/environment_prompts';
import {
  resolveEnvironment,
  quickResolveEnvironment,
  type ResolveEnvironmentOptions,
} from './resolver';

// ============================================================================
// THE SOUL TABLE — which of the 11 place-souls each environment key carries
// (the AssetMapper's own alias groups, recorded verbatim at the piecing;
// 32 keys, 11 scenes — the same sharing the image catalog encoded in paths)
// ============================================================================

export type SoulSceneKey = keyof typeof EnvironmentPromptMap;

export const ENVIRONMENT_SOUL: Record<EnvironmentKey, SoulSceneKey> = {
  home: 'home',
  gateway: 'home',
  seasonal: 'home',
  council: 'council',
  admin: 'council',
  creator: 'council',
  library: 'library',
  forge: 'library',
  ecosystem: 'library',
  learn: 'library',
  community: 'community',
  business: 'community',
  plan: 'community',
  marketplace: 'community',
  music: 'music',
  timer: 'music',
  origin: 'origin',
  questionaire: 'origin',
  progress: 'origin',
  support: 'support',
  contact: 'support',
  anon: 'support',
  observatory: 'observatory',
  about: 'observatory',
  vision: 'observatory',
  architecture: 'architecture',
  dashboard: 'architecture',
  edit: 'architecture',
  cure: 'architecture',
  invitation: 'invitation',
  transparency: 'invitation',
  lounge: 'lounge',
};

// ============================================================================
// THE BUNDLE
// ============================================================================

export interface EnvironmentAffect {
  /** The environment key this bundle dresses. */
  environment: EnvironmentKey;
  /** The place-soul this environment carries (EnvironmentPromptMap key). */
  soulScene: SoulSceneKey;
  /** The base wash — a CSS background-image value (cosmic GRADIENTS via
   *  BEAM_COLORS). Worn at ambient strength over the app's dark base, never
   *  full-bleed loud: the realm is weather, not wallpaper. */
  wash: string;
  /** The place written as story (EnvironmentPromptMap description). */
  description?: string;
  /** The soul's registers — for motion/palette/content matching downstream. */
  mood: readonly string[];
  colors: readonly string[];
  themes: readonly string[];
  /** The breathing — the old engine's measured cadence, carried whole. */
  breathing: {
    scales: readonly number[];
    /** seconds per cycle (47.7 — the image era's own tempo) */
    duration: number;
  };
}

/** The one door: environment key → token dress. Total over the union —
 *  every key resolves; unknown strings fall to the hearth ('home'). */
export function getEnvironmentAffect(environment: EnvironmentKey): EnvironmentAffect {
  const key: EnvironmentKey = environment in ENVIRONMENT_SOUL ? environment : 'home';
  const soulScene = ENVIRONMENT_SOUL[key];
  const soul = EnvironmentPromptMap[soulScene];

  return {
    environment: key,
    soulScene,
    wash: BEAM_COLORS[key],
    description: soul.description,
    mood: soul.mood ?? [],
    colors: soul.colors ?? [],
    themes: soul.themes ?? [],
    breathing: {
      scales: backgroundScales,
      duration: SCALING_CONFIG.duration,
    },
  };
}

// ============================================================================
// THE RESOLVER, REPOINTED (work-order step ③) — the seven rule families
// (tier · sovereignty · energy · time · season · accessibility · performance)
// now feed a TOKEN BUNDLE, not an image path. The Sanctuary breathes: it
// softens when the vessel is tired, warms at evening, turns with the seasons
// — and what changes is affect-from-constants, never a picture swap.
// ============================================================================

export interface EnvironmentAffectResolution {
  affect: EnvironmentAffect;
  /** The underlying resolution (environment, variant, matched-rule reason)
   *  — kept whole so surfaces can tell the vessel WHY the room softened,
   *  in plain words, if they ever choose to. */
  variant: number;
  reason?: string;
}

export function resolveEnvironmentAffect(
  options: ResolveEnvironmentOptions
): EnvironmentAffectResolution {
  const resolution = resolveEnvironment(options);
  return {
    affect: getEnvironmentAffect(resolution.environment),
    variant: resolution.variant,
    reason: resolution.reason,
  };
}

/** Context-free convenience — the affect a route wears with no live context
 *  (server-side and first paint): the page default, dressed. */
export function quickResolveAffect(route: string): EnvironmentAffect {
  return getEnvironmentAffect(quickResolveEnvironment(route));
}
