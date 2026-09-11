// src/lib/nexus/gateway-contract.ts
// The Gateway's shapes: the register's columns, the four stores' testing tracks,
// the grouping, the GitHub read, and the collaboration request.

import type { Database } from '@/lib/generated/supabase/knowledge/database.types';

export type BeaconRow = Database['public']['Tables']['beacons']['Row'];

/** The two beacon types a store carries. */
export const STORE_TYPES = ['app', 'game'] as const satisfies readonly BeaconRow['beacon_type'][];

/** The word a channel column carries when nothing stands on it. */
export const NO_STANDING = 'none';

/** The register column carrying a beacon's leave to show its testing links. */
export const TESTING_PUBLIC_COLUMN = 'testing_public';

/** A value as trimmed text, empty when it is not text. */
export function trimmedText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** A status with its underscores opened into spaces. */
export function statusWords(value: string): string {
  return value.replace(/_/g, ' ');
}

/** The four channels' track columns, and the flag a public face reads first. */
export type TrackRow = Pick<
  BeaconRow,
  | 'play_status'
  | 'play_testing_version'
  | 'play_published_version'
  | 'play_testing_url'
  | 'play_listing_url'
  | 'galaxy_status'
  | 'galaxy_testing_version'
  | 'galaxy_published_version'
  | 'galaxy_testing_url'
  | 'galaxy_listing_url'
  | 'microsoft_status'
  | 'microsoft_testing_version'
  | 'microsoft_published_version'
  | 'microsoft_testing_url'
  | 'microsoft_listing_url'
  | 'audhdities_status'
  | 'audhdities_testing_version'
  | 'audhdities_published_version'
  | 'audhdities_testing_url'
  | 'audhdities_listing_url'
> & { testing_public: boolean };

interface TrackChannel {
  label: string;
  status: keyof TrackRow;
  testingVersion: keyof TrackRow;
  publishedVersion: keyof TrackRow;
  testingUrl: keyof TrackRow;
  listingUrl: keyof TrackRow;
}

/** The four stores, in the order a strip prints them. */
export const TESTING_TRACKS = [
  {
    label: 'Play',
    status: 'play_status',
    testingVersion: 'play_testing_version',
    publishedVersion: 'play_published_version',
    testingUrl: 'play_testing_url',
    listingUrl: 'play_listing_url',
  },
  {
    label: 'Galaxy',
    status: 'galaxy_status',
    testingVersion: 'galaxy_testing_version',
    publishedVersion: 'galaxy_published_version',
    testingUrl: 'galaxy_testing_url',
    listingUrl: 'galaxy_listing_url',
  },
  {
    label: 'Microsoft',
    status: 'microsoft_status',
    testingVersion: 'microsoft_testing_version',
    publishedVersion: 'microsoft_published_version',
    testingUrl: 'microsoft_testing_url',
    listingUrl: 'microsoft_listing_url',
  },
  {
    label: 'AudHDities',
    status: 'audhdities_status',
    testingVersion: 'audhdities_testing_version',
    publishedVersion: 'audhdities_published_version',
    testingUrl: 'audhdities_testing_url',
    listingUrl: 'audhdities_listing_url',
  },
] as const satisfies readonly TrackChannel[];

/** Every channel's track columns, for a select list. */
export const TRACK_COLUMNS: readonly string[] = TESTING_TRACKS.flatMap((channel) => [
  channel.status,
  channel.testingVersion,
  channel.publishedVersion,
  channel.testingUrl,
  channel.listingUrl,
]);

export const TESTING_WORD = 'testing';
export const PUBLISHED_WORD = 'published';
export const TESTING_LINK_WORD = 'testing link';
export const TEST_IT = 'Test it';

/** One store's cell in a tracks strip. */
export interface TrackCell {
  label: string;
  /** The register's status word in plain words, none when the column is empty. */
  status: string;
  testingVersion: string | null;
  publishedVersion: string | null;
  testingUrl: string | null;
  /** True when this store's status is anything but none. */
  stands: boolean;
}

/** One named link to a store's testing track. */
export interface TestItLink {
  label: string;
  url: string;
}

/** One cell per store, in strip order, an empty column reading none. */
export function trackCells(row: TrackRow): TrackCell[] {
  return TESTING_TRACKS.map((channel) => {
    const status = trimmedText(row[channel.status]);
    return {
      label: channel.label,
      status: status ? statusWords(status) : NO_STANDING,
      testingVersion: trimmedText(row[channel.testingVersion]) || null,
      publishedVersion: trimmedText(row[channel.publishedVersion]) || null,
      testingUrl: trimmedText(row[channel.testingUrl]) || null,
      stands: status.length > 0 && status.toLowerCase() !== NO_STANDING,
    };
  });
}

/** One link per store whose testing link stands, none at all until the flag is true. */
export function testItLinks(row: TrackRow): TestItLink[] {
  if (!row.testing_public) return [];
  return trackCells(row).flatMap((cell) =>
    cell.testingUrl ? [{ label: cell.label, url: cell.testingUrl }] : []
  );
}

/** The register columns the Gateway shows. */
export type GatewayBeacon = Pick<
  BeaconRow,
  | 'name'
  | 'slug'
  | 'beacon_type'
  | 'status'
  | 'definition'
  | 'repo_url'
  | 'is_public'
  | 'version'
  | 'icon_emoji'
  | 'available_on'
> &
  TrackRow;

const GATEWAY_COLUMNS = [
  'name',
  'slug',
  'beacon_type',
  'status',
  'definition',
  'repo_url',
  'is_public',
  'version',
  'icon_emoji',
  'available_on',
  ...TRACK_COLUMNS,
];

/** The select list for the beacons read. */
export const BEACON_COLUMNS = [...GATEWAY_COLUMNS, TESTING_PUBLIC_COLUMN].join(', ');

/** The select list for a register that holds no testing_public column. */
export const BEACON_COLUMNS_UNFLAGGED = GATEWAY_COLUMNS.join(', ');

/** True when a card prints a tracks strip: a beacon of a store type. */
export function showsTracks(beacon: GatewayBeacon): boolean {
  const types: readonly string[] = STORE_TYPES;
  return types.includes(beacon.beacon_type);
}

export type GatewayGroupKey = 'open' | 'private' | 'no-repo';

export interface GatewayGroup {
  key: GatewayGroupKey;
  label: string;
  /** What this group prints when it holds no beacon. */
  empty: string;
  beacons: GatewayBeacon[];
}

export const GROUP_LABELS: Record<GatewayGroupKey, string> = {
  open: 'Open',
  private: 'Private',
  'no-repo': 'no repo',
};

const GROUP_EMPTIES: Record<GatewayGroupKey, string> = {
  open: 'no beacon in the register is public with a repo',
  private: 'no beacon in the register is private',
  'no-repo': 'every beacon in the register names a repo',
};

/** The group a beacon belongs to: no repo_url first, then its privacy state. */
export function groupKeyFor(beacon: GatewayBeacon): GatewayGroupKey {
  if (!beacon.repo_url) return 'no-repo';
  return beacon.is_public ? 'open' : 'private';
}

/** The two single-README front doors, pinned below the groups. */
export const THE_FACES = [
  { slug: 'quantum-weaver', login: 'Quantum-Weaver', url: 'https://github.com/Quantum-Weaver' },
  { slug: 'aethelred-cello', login: 'aethelred-cello', url: 'https://github.com/aethelred-cello' },
] as const;

const FACE_SLUGS: ReadonlySet<string> = new Set(THE_FACES.map((face) => face.slug));

/** True when a beacon is one of the two pinned faces. */
export function isFace(beacon: GatewayBeacon): boolean {
  return FACE_SLUGS.has(beacon.slug.toLowerCase());
}

/** The register row for a pinned face, or null. */
export function faceBeacon(rows: readonly GatewayBeacon[], slug: string): GatewayBeacon | null {
  return rows.find((beacon) => beacon.slug.toLowerCase() === slug) ?? null;
}

/** The three groups, in order, every row but the two faces landing in exactly one. */
export function groupBeacons(rows: readonly GatewayBeacon[]): GatewayGroup[] {
  const grouped = rows.filter((beacon) => !isFace(beacon));
  const order: GatewayGroupKey[] = ['open', 'private', 'no-repo'];
  return order.map((key) => ({
    key,
    label: GROUP_LABELS[key],
    empty: GROUP_EMPTIES[key],
    beacons: grouped.filter((beacon) => groupKeyFor(beacon) === key),
  }));
}

/** A beacon whose repo may be read from GitHub without a token. */
export function readableOnGitHub(beacon: GatewayBeacon): boolean {
  return beacon.is_public && Boolean(beacon.repo_url);
}

export interface RepoAddress {
  owner: string;
  repo: string;
}

const GITHUB_HOSTS = new Set(['github.com', 'www.github.com']);

/** The owner and repo a github.com address names, or null. */
export function parseRepoAddress(url: string | null): RepoAddress | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!GITHUB_HOSTS.has(parsed.hostname.toLowerCase())) return null;
  const parts = parsed.pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  const owner = parts[0];
  const repo = parts[1].replace(/\.git$/i, '');
  if (!owner || !repo) return null;
  return { owner, repo };
}

export interface RepoFacts {
  description: string | null;
  pushed_at: string | null;
  stargazers_count: number | null;
  language: string | null;
  open_issues_count: number | null;
  archived: boolean;
}

export interface UserFacts {
  name: string | null;
  bio: string | null;
  public_repos: number | null;
  followers: number | null;
}

/** A GitHub read that either carries facts or the line for the miss. */
export type GitHubRead<T> = { facts: T; miss: null } | { facts: null; miss: string };

/** The one line a card prints when GitHub did not answer. */
export function missLine(status: number | string): string {
  return `GitHub did not answer · ${status}`;
}

export interface GatewayCard {
  beacon: GatewayBeacon;
  /** Null when no GitHub read was made for this beacon. */
  github: GitHubRead<RepoFacts> | null;
}

export interface GatewayGroupView {
  key: GatewayGroupKey;
  label: string;
  empty: string;
  cards: GatewayCard[];
}

export interface GatewayFace {
  login: string;
  url: string;
  /** The face's own register row, or null when the register holds none. */
  beacon: GatewayBeacon | null;
  /** Null when no GitHub read was made for this face. */
  read: GitHubRead<UserFacts> | null;
}

export interface GatewayView {
  groups: GatewayGroupView[];
  faces: GatewayFace[];
  /** The base's own message when the register read was refused. */
  fault: string | null;
  /** The sentence for a register holding no testing_public column, else null. */
  tracksNote: string | null;
  doorNamed: boolean;
  signedIn: boolean;
}

export const FACES_HEADING = 'The two faces';
export const NO_FACE_ROW = 'no register row';
export const REGISTER_TABLE = 'beacons';
export const REGISTER_UNREAD = 'register unread';
export const DOOR_UNNAMED = `${REGISTER_UNREAD} · the knowledge door is not named on this host`;
export const REGISTER_REFUSED = 'the register refused this read';
/** The paper that adds the flag column, and the chain that runs it. */
export const TESTING_FLAG_CLICK =
  'resonance-grammar/docs/sql/150-the-testing-public.sql through the seed chain';
export const TESTING_FLAG_UNREAD = `${REGISTER_TABLE}.${TESTING_PUBLIC_COLUMN} is not in the register · every row reads false · next · ${TESTING_FLAG_CLICK}`;
export const NO_DEFINITION = 'no definition recorded';
export const NO_VERSION = 'no version recorded';
export const SIGN_IN_TO_REQUEST = 'sign in to request';
export const REQUEST_WORD = 'Request to collaborate';
export const REQUEST_SENDING = 'sending';
export const REQUEST_LANDED = 'request landed';
export const NOTE_LABEL = 'a note, if you want one';

/** The superposition table one collaboration request lands in. */
export const REQUEST_TABLE = 'contact_submissions';
/** The free-text category column's value for a collaboration request. */
export const REQUEST_CATEGORY = 'collaboration';
/** A legal content_status value. */
export const REQUEST_STATUS = 'draft' as const;
export const NOTE_MAX = 2000;

/** The subject line carrying the beacon slug. */
export function requestSubject(slug: string): string {
  return `collaborate · ${slug}`;
}

/** The message body carrying the beacon and the visitor's note. */
export function requestMessage(slug: string, beaconName: string, note: string): string {
  const trimmed = note.trim().slice(0, NOTE_MAX);
  const lines = [`request to collaborate on ${beaconName} (${slug})`];
  if (trimmed) lines.push('', trimmed);
  return lines.join('\n');
}

/** What happened, why, the next step. */
export interface RequestRefusal {
  what: string;
  why: string;
  next: string;
}

export type RequestOutcome = { ok: true; at: string } | ({ ok: false } & RequestRefusal);

export const REQUEST_NOT_LANDED = 'the request did not land';

/** The refusal for a visit that carries no session. */
export function unsignedRefusal(): RequestRefusal {
  return {
    what: REQUEST_NOT_LANDED,
    why: 'this visit carries no session',
    next: 'sign in, then request again',
  };
}

/** The refusal the base's own message makes. */
export function baseRefusal(message: string): RequestRefusal {
  return {
    what: REQUEST_NOT_LANDED,
    why: `${REQUEST_TABLE} · ${message}`,
    next: `an insert policy on ${REQUEST_TABLE} for this visitor`,
  };
}

/** The refusal for a request the register could not be read for. */
export function registerUnreadRefusal(fault: string | null): RequestRefusal {
  return {
    what: REQUEST_NOT_LANDED,
    why: `${REGISTER_TABLE} · ${fault ?? DOOR_UNNAMED}`,
    next: 'reload the Gateway and request again',
  };
}

export const SLUG_MAX = 80;
export const NOT_PRIVATE = 'this slug is not a private repo in the register';

const SLUG_SHAPE = /^[a-z0-9-]+$/;

/** A slug lowercased and held to letters, digits and hyphens within SLUG_MAX, else null. */
export function boundSlug(slug: string): string | null {
  const bounded = slug.trim().toLowerCase();
  if (!bounded || bounded.length > SLUG_MAX) return null;
  return SLUG_SHAPE.test(bounded) ? bounded : null;
}

/** The refusal for a slug that names no private beacon. */
export function notPrivateRefusal(why: string): RequestRefusal {
  return {
    what: NOT_PRIVATE,
    why,
    next: 'reload the Gateway and request a private beacon',
  };
}

export type RequestAdmission =
  | { admitted: true; slug: string; beaconName: string }
  | { admitted: false; refusal: RequestRefusal };

/** Admits a slug only when the register holds it private and unpinned. */
export function admitRequest(
  rows: readonly GatewayBeacon[],
  slug: string
): RequestAdmission {
  const bounded = boundSlug(slug);
  if (!bounded) {
    return {
      admitted: false,
      refusal: notPrivateRefusal(
        `a slug is lowercase letters, digits and hyphens, at most ${SLUG_MAX}`
      ),
    };
  }
  const row = rows.find((beacon) => beacon.slug.toLowerCase() === bounded) ?? null;
  if (!row) {
    return {
      admitted: false,
      refusal: notPrivateRefusal(`${REGISTER_TABLE} holds no beacon under ${bounded}`),
    };
  }
  if (isFace(row)) {
    return { admitted: false, refusal: notPrivateRefusal(`${bounded} is a pinned face`) };
  }
  if (row.is_public) {
    return {
      admitted: false,
      refusal: notPrivateRefusal(`${bounded} is public in ${REGISTER_TABLE}`),
    };
  }
  return { admitted: true, slug: bounded, beaconName: row.name };
}
