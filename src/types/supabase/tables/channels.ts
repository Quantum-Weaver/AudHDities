// src/types/supabase/tables/channels.ts
import type { Database } from '../database.types';

export type Channel = Database['public']['Tables']['channels']['Row'];
export type ChannelInsert = Database['public']['Tables']['channels']['Insert'];
export type ChannelUpdate = Database['public']['Tables']['channels']['Update'];

export interface ChannelWithRelations extends Channel {
  owner?: Database['public']['Tables']['profiles']['Row'];
  posts?: Database['public']['Tables']['posts']['Row'][];
  subscriptions?: Database['public']['Tables']['subscriptions']['Row'][];
}

export const channelDefaults = {
  allow_subscriptions: true,
  content_rating: 'general',
  subscriber_count: 0,
  total_emeralds: 0,
} as const;