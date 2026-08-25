// src/lib/constants/systems/the-street.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE STREET — the Sanctuary's whole landscape, in one definition        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Lifted out of Navigation.tsx 2026-08-11 so the NAV and the LÉARSCÁIL read
// the same ground and cannot drift apart. One definition per object — the
// Resonance Grammar's own first law, and the reason this file exists rather
// than a second copy of the same list.
//
// The geometry NEVER shuffles: the order below is the one order, everywhere,
// forever (the intelligibility law — a layout is a place when its map can be
// held in the head). First entry is the shortest edge: the hearth, where the
// vessel already stands.
//
// Every href is a route that exists on disk — the map never lies. That was
// Navigation.tsx's own standing promise and it rides with the data.

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
      // 2026-08-24, board ②'s mend (the four-item bar). `/` was the one door
      // that lost its bar item and landed NOWHERE — it appears in no other
      // realm's rooms, and the Header's wordmark points at /vessel. The map
      // is where retired doors go, by KP's own sentence, so `/` goes here.
      { href: '/', label: 'The Hearth' },
      { href: '/vessel', label: 'The Vessel' },
      { href: '/vessel/home', label: 'The Home' },
      { href: '/vessel/sanctum', label: 'The Sanctum' },
      { href: '/vessel/energy', label: 'Energy Log' },
      { href: '/vessel/journal', label: 'The Scroll' },
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
      { href: '/studio', label: 'The Loom' },
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
      // 2026-08-25, refine/athena (board ⑧): the street listed seven rooms
      // and omitted two that exist on disk. The map never lies.
      { href: '/library/lessons', label: 'The Lessons' },
      { href: '/library/knowledge', label: 'The Archive' },
      { href: '/library/badges', label: 'The Honors' },
      { href: '/library/bubbles', label: 'The Floating Stars' },
      // 2026-08-25, mend/floating-stars-play-door. KP's ⚛ word, verbatim:
      // "the floating stars currently has no entry to "/play"". The room
      // exists (BubblePopGame.tsx at this route) and now has a door in from
      // the gallery too — the map never lies, so it earns its line here.
      { href: '/library/bubbles/play', label: 'Pop the Stars' },
      { href: '/library/dailies', label: 'The Dailies' },
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
    ],
  },
  {
    name: 'The Observatory',
    realm: 'mnemosyne',
    href: '/observatory',
    whisper: 'Memory and stars',
    rooms: [{ href: '/observatory', label: 'The Observatory' }],
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
      // 2026-08-24, board ④. Two rooms, one table, and now two distinct
      // labels: /transparency is the PUBLIC TELLING (lifetime totals, where
      // the fee goes, the admin log — read by anyone); /council/ledger is
      // the ENTRIES THEMSELVES, one line each. It was in no realm's rooms
      // before this pass and so stood in no map.
      { href: '/transparency', label: 'The Ledger' },
      { href: '/council/ledger', label: 'The Ledger — every entry' },
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
      // { href: '/donate', label: 'The Offering' } — RETIRED 2026-08-24 at
      // KP's ⚛ word, verbatim, spacing kept: "retire the donate and create
      // subscription tiers for me rather than the platform, and  i will
      // still have my covenant set to 50%. the donations tab was before we
      // had a built sanctuary and had different outlooks."
      // The route is gone with it, so this line leaves map and drawer at
      // once — the map never lies. The tiers are a WARE of KP's and belong
      // to the Bazaar's spec, not to a Forge room.
      { href: '/privacy', label: 'The Covenant' },
      // 2026-08-25, board ①. KP ⚛ 2026-08-24, verbatim: "we already have a
      // terms/ and privacy/ we will need an apps/privacy". The apps are
      // local-first and collect nothing; the site has accounts and
      // payments. Two different truths need two different pages.
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
    href: '/environments',
    whisper: 'The design playground',
    rooms: [
      { href: '/environments', label: 'The Crossing Hall' },
      { href: '/playground', label: 'The Sandbox' },
      { href: '/theater', label: 'The Theater' },
      { href: '/effects', label: 'The Grimoire' },
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
