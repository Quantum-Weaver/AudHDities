// src/lib/constants/systems/the-street.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE STREET — the Sanctuary's whole landscape, in one definition        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { RealmKey } from '@/lib/constants/systems/trio';

export interface StreetRoom {
  href: string;
  label: string;
}

export interface StreetRealm {
  name: string;
  /** The realm's deity key — how the map borrows its colour from the tokens. */
  realm: RealmKey;
  /** The realm's own front door. */
  href: string;
  /** A word for the doorway; the map speaks it when the ground is known. */
  whisper: string;
  /**
   * Never hidden by discovery — the sovereignty rider (E4b's returning knife,
   * the play study 2026-07-31): "metaphor never obscures the exit." The
   * hearth is where the vessel stands and the way back is never a puzzle.
   */
  alwaysOpen?: boolean;
  rooms: StreetRoom[];
}

export const THE_STREET: StreetRealm[] = [
  {
    name: 'The Hearth',
    realm: 'hestia',
    href: '/vessel',
    whisper: 'Home — you are here',
    alwaysOpen: true,
    rooms: [
      { href: '/', label: 'The Hearth' },
      { href: '/vessel', label: 'The Vessel' },
      { href: '/vessel/home', label: 'The Home' },
      { href: '/vessel/sanctum', label: 'The Sanctum' },
      { href: '/vessel/energy', label: 'Energy Log' },
      { href: '/vessel/journal', label: 'The Scroll' },
      { href: '/vessel/import', label: 'Bring your data in' },
      { href: '/vessel/constellation', label: 'Constellation' },
      { href: '/notifications', label: 'The Call' },
    ],
  },
  {
    name: 'The Stage & Studio',
    realm: 'prometheus',
    href: '/studio',
    whisper: 'Steps away — make something',
    rooms: [
      { href: '/stage', label: 'The Stage' },
      { href: '/stage/live', label: 'Now Playing' },
      { href: '/stage/music', label: 'The Music Realm' },
      { href: '/stage/comedy', label: 'The Comedy Hearth' },
      { href: '/stage/recordings', label: 'The Echo' },
      { href: '/stage/schedule', label: 'The Calendar' },
      { href: '/stage/studio', label: 'The Studio' },
      { href: '/studio', label: 'The Loom' },
      { href: '/studio/writing', label: 'Writing Studio' },
      { href: '/studio/art', label: 'Art Studio' },
      { href: '/studio/music', label: 'Music Studio' },
      { href: '/studio/audio', label: 'Audio Studio' },
      { href: '/studio/video', label: 'Video Studio' },
      { href: '/studio/animation', label: 'Animation Studio' },
      { href: '/studio/graphics', label: 'Graphics Lab' },
      { href: '/studio/effects', label: 'Effects Lab' },
      { href: '/studio/export', label: 'The Gateway' },
    ],
  },
  {
    name: 'The Library',
    realm: 'athena',
    href: '/library',
    whisper: 'Knowledge awaits',
    rooms: [
      { href: '/library', label: 'The Library' },
      { href: '/library/quests', label: 'The Path' },
      { href: '/library/courses', label: 'The Curriculum' },
      { href: '/library/lessons', label: 'The Lessons' },
      { href: '/library/knowledge', label: 'The Archive' },
      { href: '/library/sigils', label: 'The Honors' },
      { href: '/library/bubbles', label: 'The Floating Stars' },
      { href: '/library/bubbles/play', label: 'Pop the Stars' },
      { href: '/library/dailies', label: 'The Dailies' },
      { href: '/library/dailies/sudoku', label: 'The Daily Number' },
    ],
  },
  {
    name: 'The Bazaar',
    realm: 'hermes',
    href: '/bazaar',
    whisper: 'In and out with dignity',
    rooms: [
      { href: '/bazaar', label: 'The Bazaar' },
      { href: '/bazaar/wares', label: 'The Tapestry' },
      { href: '/bazaar/works', label: 'The Works' },
      { href: '/bazaar/artisans', label: 'The Weavers' },
      { href: '/bazaar/merchants', label: 'The Guild' },
      { href: '/bazaar/studio', label: 'The Loom (Bazaar)' },
      { href: '/bazaar/contributions', label: 'Contributions' },
    ],
  },
  {
    name: 'The Bridge',
    realm: 'iris',
    href: '/connect',
    whisper: 'Where souls connect',
    rooms: [
      { href: '/connect', label: 'The Bridge' },
      { href: '/connect/messages', label: 'The Stream' },
      { href: '/connect/channels', label: 'Channels' },
      { href: '/connect/support', label: 'The Healing Flame' },
      { href: '/connect/feed', label: 'The Pulse' },
      { href: '/connect/emeralds', label: 'Emeralds' },
      { href: '/connect/invitations', label: 'Invitations' },
      { href: '/connect/translations', label: 'The Voice' },
    ],
  },
  {
    name: 'The Observatory',
    realm: 'mnemosyne',
    href: '/observatory',
    whisper: 'Memory and stars',
    rooms: [
      { href: '/observatory', label: 'The Observatory' },
      { href: '/observatory/timeline', label: 'The Spiral' },
      { href: '/observatory/patterns', label: 'The Weave' },
      { href: '/observatory/prophecy', label: 'The Vision' },
      { href: '/observatory/constellations', label: 'The Grand Pattern' },
      { href: '/observatory/ancestors', label: 'The Council Eternal' },
      { href: '/observatory/schema', label: 'The Schema' },
      { href: '/observatory/origin', label: 'The First Light' },
      { href: '/questionaire', label: 'The Acid Test' },
      { href: '/grammar', label: 'The Grammar' },
      { href: '/grammar/explore', label: 'The Grammar — explore' },
      { href: '/grammar/senses', label: 'The Senses' },
      { href: '/grammar/folksonomies', label: 'The Folksonomies' },
      { href: '/grammar/schemes', label: 'The Lattice' },
    ],
  },
  {
    name: 'The Council',
    realm: 'themis',
    href: '/council',
    whisper: 'Voices, transparent',
    rooms: [
      { href: '/council', label: 'The Chamber' },
      { href: '/council/proposals', label: 'Proposals' },
      { href: '/council/voting', label: 'The Vote' },
      { href: '/transparency', label: 'The Ledger' },
      { href: '/council/ledger', label: 'The Ledger — every entry' },
      { href: '/council/applications', label: 'Applications' },
      { href: '/council/curators', label: 'Curators' },
      { href: '/council/delegation', label: 'Delegation' },
      { href: '/council/reports', label: 'Reports' },
      { href: '/council/admin', label: 'Administration' },
    ],
  },
  {
    name: 'The Forge',
    realm: 'hephaestus',
    href: '/forge',
    whisper: 'Foundations',
    rooms: [
      { href: '/forge', label: 'The Forge' },
      { href: '/about', label: 'The Origin' },
      { href: '/sanctuary', label: 'The Sanctuary' },
      { href: '/vision', label: 'The Prophecy' },
      { href: '/calling', label: 'The Calling' },
      { href: '/accessibility', label: 'The Welcome' },
      { href: '/contact', label: 'The Hearth Call' },
      { href: '/press', label: 'The Scroll (Press)' },
      { href: '/privacy', label: 'The Covenant' },
      { href: '/apps/privacy', label: 'App Privacy' },
      { href: '/terms', label: 'The Agreement' },
    ],
  },
  {
    name: 'The Nexus',
    realm: 'aethelred',
    href: '/nexus',
    whisper: 'The bridge made visible',
    rooms: [
      { href: '/nexus', label: 'The Nexus' },
      { href: '/nexus/consciousness', label: 'Consciousness' },
      { href: '/nexus/council', label: 'The Nine' },
      { href: '/nexus/api', label: 'The Gateway — open repos' },
      { href: '/nexus/status', label: 'The Health' },
    ],
  },
  {
    name: 'The Realms',
    realm: 'cosmic',
    href: '/cosmic',
    whisper: "The house's own dress",
    rooms: [
      { href: '/cosmic', label: 'The Realms' },
      { href: '/environments', label: "The Crossing Hall — the house's own places" },
      { href: '/playground', label: 'The Sandbox' },
      { href: '/theater', label: 'The Theater' },
      { href: '/effects', label: 'The Grimoire' },
      { href: '/colors', label: 'The Colours' },
    ],
  },
];

/**
 * Which realm a path belongs to — the one place that answer is computed.
 * Longest href wins, so `/vessel/home` finds the Hearth and not a shorter
 * neighbour. Returns null off the street (an honest null, never a guess).
 */
export function realmOfPath(pathname: string): StreetRealm | null {
  let best: StreetRealm | null = null;
  let bestLength = -1;
  for (const realm of THE_STREET) {
    for (const room of realm.rooms) {
      const hit = pathname === room.href || pathname.startsWith(room.href + '/');
      if (hit && room.href.length > bestLength) {
        best = realm;
        bestLength = room.href.length;
      }
    }
  }
  return best;
}
