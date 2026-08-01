// lib/constants/systems/environments/places.ts
// ============================================================================
// THE HALL GEOMETRY + PLACE DISPLAY — the Crossing Hall's fixed order and the
// display-only survivors of the (cosmic) gallery's retired ENVIRONMENTS data
// ============================================================================
// Provenance: REALMS-AS-TRAVEL, ruled at KP's ⚛ word 2026-07-30 ("please
// continue on then friend" — the ruling recorded on the (cosmic) REALM-BUS).
// Move 4 of the design: the duplicated static data in EnvironmentsGallery /
// EnvironmentDetail retires; descriptions/mood/colors/themes now come from
// the place-souls via getEnvironmentAffect(). What survives here is ONLY what
// the souls do not carry: the display name, the icon, and the hall's order.
//
// THE GEOMETRY LAW (inherited from RealmMapFurniture, the same map at two
// scales): one order, everywhere, forever — the hall NEVER shuffles, and no
// search or filter reorders it. The order is DERIVED, not invented: it
// follows REALM_MAP_ORDER's sequence, each realm's door translated to the
// place-soul its own route wears (PAGE_ENVIRONMENT_MAP defaults), first
// plain correspondence claiming the soul; the three souls no realm door
// wears close the hall in catalog order.
//
//   /vessel → home · /studio → music (the shortest edge holds: hearth beside
//   stage) · /library → library · /bazaar → community · iris's own hearth-
//   room /connect/support → support (its front door shares community with
//   the Bazaar) · mnemosyne → observatory (by name and /vessel/constellation)
//   · /council → council · /docs & /nexus → architecture (hephaestus and
//   aethelred share the machine sky) · then origin (/enter, the gate) ·
//   invitation (/careers, the calling) · lounge (the resolver's own
//   fallback sky).

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
