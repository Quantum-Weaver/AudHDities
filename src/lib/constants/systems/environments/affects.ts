// lib/constants/systems/environments/affects.ts
// ============================================================================
// wardrobe, and the resolver's token-era output)
// ============================================================================
// record: resonance-chamber/desk/records/fable-lanes/study/
// constant:

import type { EnvironmentKey } from '../assets/mapper';
import { BEAM_COLORS } from '@/lib/constants/components/immersive/continuity_beam';
import { GRADIENTS, type GradientKey } from '@/lib/constants/cosmic/effects';
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

/** The three deepenings each place-soul wears beyond its own wash — registers
 *  2, 3 and 4 of VARIANT_NAMES, one cosmic gradient each. Register 1 is the
 *  place's own wash (BEAM_COLORS). */
export const SOUL_DEEPENINGS: Record<
  SoulSceneKey,
  readonly [GradientKey, GradientKey, GradientKey]
> = {
  home: ['mystical', 'sovereign', 'holographic'],
  council: ['seer', 'aethelred', 'collaborativeConsciousness'],
  library: ['greatWork', 'codex', 'mysticalTrans'],
  community: ['gardener', 'digitalFamily', 'prideProgress'],
  music: ['skald', 'curator', 'quantumPride'],
  origin: ['hekate', 'sovereignBecoming', 'consciousnessEmergence'],
  support: ['calm', 'hearthKeeper', 'traumaTransformation'],
  observatory: ['tarotMajor', 'odin', 'cosmicEnergy'],
  architecture: ['chancellor', 'quantumWeaver', 'quantumEnergy'],
  invitation: ['brigid', 'nobleThread', 'elemental'],
  lounge: ['bragi', 'hermes', 'prideRainbow'],
};

/** Registers run 1 to 4; anything else lands on 1. */
export function clampVariant(variant: number | undefined): 1 | 2 | 3 | 4 {
  const n = Math.round(Number(variant));
  if (!Number.isFinite(n) || n < 1 || n > 4) return 1;
  return n as 1 | 2 | 3 | 4;
}

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
  /** The register this dress belongs to (1-4, VARIANT_NAMES). */
  variant: 1 | 2 | 3 | 4;
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

/** The one door: environment key + register → token dress. Total over the
 *  union — every key resolves; unknown strings fall to the hearth ('home').
 *  Register 1 wears the place's own wash, 2-4 its deepenings. */
export function getEnvironmentAffect(
  environment: EnvironmentKey,
  variant?: number
): EnvironmentAffect {
  const key: EnvironmentKey = environment in ENVIRONMENT_SOUL ? environment : 'home';
  const soulScene = ENVIRONMENT_SOUL[key];
  const soul = EnvironmentPromptMap[soulScene];
  const register = clampVariant(variant);
  const wash =
    register === 1
      ? BEAM_COLORS[key]
      : GRADIENTS[SOUL_DEEPENINGS[soulScene][register - 2]];

  return {
    environment: key,
    soulScene,
    variant: register,
    wash,
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
    affect: getEnvironmentAffect(resolution.environment, resolution.variant),
    variant: resolution.variant,
    reason: resolution.reason,
  };
}

/** Context-free convenience — the affect a route wears with no live context
 *  (server-side and first paint): the page default, dressed. */
export function quickResolveAffect(route: string): EnvironmentAffect {
  return getEnvironmentAffect(quickResolveEnvironment(route));
}
