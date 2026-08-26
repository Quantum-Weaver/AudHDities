// lib/constants/systems/environments/places.ts
// ============================================================================
// ============================================================================

import type { EnvironmentKey } from '../assets/mapper';

/** The Crossing Hall's fixed geometry — one order, everywhere, forever. */
export const HALL_ORDER: readonly EnvironmentKey[] = [
  'home',
  'music',
  'library',
  'community',
  'support',
  'observatory',
  'council',
  'architecture',
  'origin',
  'invitation',
  'lounge',
] as const;

/** Display-only survivors of the retired gallery data — the souls carry
 *  description/mood/colors/themes; they never carried a door name or icon. */
export const PLACE_DISPLAY: Record<string, { name: string; icon: string }> = {
  home: { name: 'The Hearth', icon: '🔥' },
  music: { name: 'The Stage', icon: '🎵' },
  library: { name: 'The Library', icon: '📚' },
  community: { name: 'The Bazaar', icon: '🌐' },
  support: { name: 'The Healing Flame', icon: '💚' },
  observatory: { name: 'The Observatory', icon: '🔭' },
  council: { name: 'The Council Chamber', icon: '🏛️' },
  architecture: { name: 'The Architecture Realm', icon: '⚙️' },
  origin: { name: 'The Origin Temple', icon: '📖' },
  invitation: { name: 'The Invitation Chamber', icon: '🤝' },
  lounge: { name: 'The Lounge', icon: '🛋️' },
};

/** The four variant registers — unchanged from the gallery era. */
export const VARIANT_NAMES = ['Warm', 'Mystical', 'Sacred', 'Ethereal'] as const;
