// src/lib/apps/apps-contract.ts
// The company page's shapes: the register's columns, the four store channels,
// the standing line, the platforms line, and the register fault.

import type { Database } from '@/lib/generated/supabase/knowledge/database.types';
import { REGISTER_TABLE } from '@/lib/nexus/gateway-contract';

export type BeaconRow = Database['public']['Tables']['beacons']['Row'];

/** The register columns the company page shows. */
export type PublishedApp = Pick<
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
  | 'audhdities_status'
  | 'galaxy_status'
  | 'microsoft_status'
  | 'play_status'
  | 'audhdities_listing_url'
  | 'galaxy_listing_url'
  | 'microsoft_listing_url'
  | 'play_listing_url'
  | 'audhdities_price_cents'
  | 'galaxy_price_cents'
  | 'microsoft_price_cents'
  | 'play_price_cents'
  | 'currency'
>;

/** The select list for the published-apps read. */
export const APP_COLUMNS = [
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
  'audhdities_status',
  'galaxy_status',
  'microsoft_status',
  'play_status',
  'audhdities_listing_url',
  'galaxy_listing_url',
  'microsoft_listing_url',
  'play_listing_url',
  'audhdities_price_cents',
  'galaxy_price_cents',
  'microsoft_price_cents',
  'play_price_cents',
  'currency',
].join(', ');

/** The two beacon types the company publishes. */
export const APP_TYPES = ['app', 'game'] as const satisfies readonly BeaconRow['beacon_type'][];

/** The standing value a channel carries when the app is not on it. */
export const NO_STANDING = 'none';

/** Every standing a channel column may carry. */
export const STANDINGS = [
  'planned',
  'building',
  'internal_testing',
  'closed_testing',
  'open_testing',
  'in_review',
  'published',
  'rejected',
  'withdrawn',
] as const;

export type Standing = (typeof STANDINGS)[number];

interface Channel {
  label: string;
  status: keyof PublishedApp;
  listing: keyof PublishedApp;
  price: keyof PublishedApp;
}

/** The four store channels a register row carries. */
export const APP_CHANNELS = [
  {
    label: 'audhdities',
    status: 'audhdities_status',
    listing: 'audhdities_listing_url',
    price: 'audhdities_price_cents',
  },
  {
    label: 'galaxy',
    status: 'galaxy_status',
    listing: 'galaxy_listing_url',
    price: 'galaxy_price_cents',
  },
  {
    label: 'microsoft',
    status: 'microsoft_status',
    listing: 'microsoft_listing_url',
    price: 'microsoft_price_cents',
  },
  {
    label: 'play',
    status: 'play_status',
    listing: 'play_listing_url',
    price: 'play_price_cents',
  },
] as const satisfies readonly Channel[];

export const FREE = 'free';
export const NOT_IN_ANY_STORE = 'not yet in any store';
export const PLATFORMS_LABEL = 'available on';
export const PART_SEPARATOR = ' · ';

/** A standing with its underscores opened into spaces. */
export function standingWords(value: string): string {
  return value.replace(/_/g, ' ');
}

/** The price a channel prints: free at zero, the amount when set, nothing when null. */
export function priceWords(cents: number | null, currency: string): string | null {
  if (cents === null) return null;
  if (cents === 0) return FREE;
  const amount = (cents / 100).toFixed(2);
  const code = currency.trim().toUpperCase();
  return code === 'USD' ? `$${amount}` : `${amount} ${code}`;
}

export interface AppStanding {
  label: string;
  standing: string;
  listing: string | null;
  price: string | null;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function cents(value: unknown): number | null {
  return typeof value === 'number' ? value : null;
}

/** Every channel whose standing is not none, in channel order. */
export function standingEntries(app: PublishedApp): AppStanding[] {
  return APP_CHANNELS.map((channel) => ({
    label: channel.label,
    standing: text(app[channel.status]),
    listing: text(app[channel.listing]) || null,
    price: priceWords(cents(app[channel.price]), app.currency),
  })).filter(
    (entry) => entry.standing.length > 0 && entry.standing.toLowerCase() !== NO_STANDING
  );
}

/** One channel's words: the channel, its standing, and its price when set. */
export function standingText(entry: AppStanding): string {
  const words = `${entry.label} ${standingWords(entry.standing)}`;
  return entry.price ? `${words} ${entry.price}` : words;
}

/** The platforms a row names, or null when it names none. */
export function platformsLine(app: PublishedApp): string | null {
  const platforms = app.available_on.map((platform) => platform.trim()).filter(Boolean);
  if (platforms.length === 0) return null;
  return `${PLATFORMS_LABEL}${PART_SEPARATOR}${platforms.join(PART_SEPARATOR)}`;
}

/** The standing line: the channels that stand, else the sentence for a row in no store. */
export function standingLine(app: PublishedApp): string | null {
  const entries = standingEntries(app);
  if (entries.length > 0) return entries.map(standingText).join(PART_SEPARATOR);
  return platformsLine(app) === null ? NOT_IN_ANY_STORE : null;
}

/** The count line under the grid. */
export function countLine(rows: readonly PublishedApp[]): string {
  return `${rows.length} apps and games in the register${PART_SEPARATOR}counted from rows`;
}

export const NO_APPS = 'the register holds no app and no game';
export const FAULT_NEXT = `a read policy on ${REGISTER_TABLE} for the anon door`;

export interface AppsView {
  apps: PublishedApp[];
  /** The base's own message when the register read was refused. */
  fault: string | null;
  doorNamed: boolean;
}
