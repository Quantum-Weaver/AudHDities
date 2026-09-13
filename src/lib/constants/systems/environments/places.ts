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

/** The doorway each place wears: the name the house's own build gives the
 *  rooms that place dresses (page_mapping.ts), and an icon. The souls carry
 *  description/mood/colors/themes; they never carried a door name or icon. */
export const PLACE_DISPLAY: Record<string, { name: string; icon: string }> = {
  home: { name: 'The Hearth', icon: '🔥' },
  music: { name: 'The Stage', icon: '🎵' },
  library: { name: 'The Library', icon: '📚' },
  community: { name: 'The Bazaar', icon: '🌐' },
  support: { name: 'The Healing Flame', icon: '💚' },
  observatory: { name: 'The Observatory', icon: '🔭' },
  council: { name: 'The Council Chamber', icon: '🏛️' },
  architecture: { name: 'The Nexus', icon: '⚙️' },
  origin: { name: 'The Origin', icon: '📖' },
  invitation: { name: 'The Calling', icon: '🤝' },
  lounge: { name: 'The Comedy Hearth', icon: '🛋️' },
};

/** The four registers of the crossing; register 1 is the place's own wash. */
export const VARIANT_NAMES = ['Warm', 'Mystical', 'Sacred', 'Ethereal'] as const;
