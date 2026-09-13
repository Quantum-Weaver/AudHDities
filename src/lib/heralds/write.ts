// src/lib/heralds/write.ts

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/generated/supabase/database.types';
import type { HeraldsInsert, NotificationChannel } from '@/lib/generated/types/hestia-core/heralds';

/** Any client the house holds: the visitor's, a route's, or the base's own. */
export type HeraldClient = SupabaseClient<Database>;

/** The kinds of herald the house writes. `heralds.herald_type` is free text. */
export const HERALD_TYPE = {
  ORDER_RECEIPT: 'order_receipt',
  SALE_MADE: 'sale_made',
  RENEWAL_RECEIPT: 'renewal_receipt',
  PAYOUTS_LIVE: 'payouts_live',
  MESSAGE_RECEIVED: 'message_received',
  QUEST_COMPLETED: 'quest_completed',
  APPLICATION_REVIEWED: 'application_reviewed',
  BADGE_EARNED: 'badge_earned',
} as const;

export type HeraldType = (typeof HERALD_TYPE)[keyof typeof HERALD_TYPE];

/** The channel a herald takes when the vessel's own setting cannot be read. */
export const DEFAULT_CHANNEL: NotificationChannel = 'in_app';

export interface HeraldInput {
  recipient: string;
  type: HeraldType;
  title: string;
  body: string;
  channel?: NotificationChannel;
  /** Whoever's act this is; the recipient when the house itself acts. */
  actor?: string;
  referenceTable?: string;
  referenceId?: string;
}

export interface WrittenHerald {
  recipient: string;
  herald_type: HeraldType;
  title: string;
  body: string;
  channel: NotificationChannel;
}

export type HeraldOutcome =
  | { written: true; herald: WrittenHerald }
  | { written: false; reason: 'muted' | 'not-written'; note: string };

/** The vessel's own herald settings, or null when they are not readable. */
async function settingsFor(db: HeraldClient, recipient: string) {
  try {
    const { data, error } = await db
      .from('vessel_config')
      .select('heralds_enabled, herald_channel')
      .eq('created_by', recipient)
      .maybeSingle();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Write one herald with the client it is handed. A herald that does not land
 * is logged and reported; it never throws into the act that called it.
 */
export async function herald(db: HeraldClient, input: HeraldInput): Promise<HeraldOutcome> {
  try {
    const settings = input.channel ? null : await settingsFor(db, input.recipient);
    if (settings && !settings.heralds_enabled) {
      return { written: false, reason: 'muted', note: 'this vessel keeps heralds off' };
    }

    const channel = input.channel ?? settings?.herald_channel ?? DEFAULT_CHANNEL;
    const row: HeraldsInsert = {
      recipient: input.recipient,
      created_by: input.actor ?? input.recipient,
      herald_type: input.type,
      title: input.title,
      body: input.body,
      channel,
      reference_table: input.referenceTable ?? null,
      reference_id: input.referenceId ?? null,
    };

    const { error } = await db.from('heralds').insert(row);
    if (error) {
      console.error('herald not written:', input.type, input.recipient, error.message);
      return { written: false, reason: 'not-written', note: error.message };
    }

    return {
      written: true,
      herald: {
        recipient: input.recipient,
        herald_type: input.type,
        title: input.title,
        body: input.body,
        channel,
      },
    };
  } catch (cause) {
    const note = cause instanceof Error ? cause.message : String(cause);
    console.error('herald not written:', input.type, input.recipient, note);
    return { written: false, reason: 'not-written', note };
  }
}
