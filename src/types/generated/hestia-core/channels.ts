// =====================================================
// FILE: types/generated/hestia-core/channels.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.656Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentRating = Database['public']['Enums']['content_rating'];
export type ChannelsRow = Tables<'channels'>;
export type ChannelsInsert = TablesInsert<'channels'>;
export type ChannelsUpdate = TablesUpdate<'channels'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of channels
 */
export interface PublicChannels {
  allow_subscriptions: boolean | null;
  avatar_url: string | null;
  banner_url: string | null;
  content_rating: ContentRating | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  display_name: string;
  handle: string;
  id: string;
  owner_id: string | null;
  subscriber_count: number | null;
  subscription_price_ally: number | null;
  subscription_price_community: number | null;
  total_emeralds: number | null;
  updated_at: string | null;
}

/**
 * Form data for channels
 * All fields are optional for partial updates
 */
export interface ChannelsFormData {
  allow_subscriptions?: boolean | null;
  avatar_url?: string | null;
  banner_url?: string | null;
  content_rating?: ContentRating | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  display_name?: string;
  handle?: string;
  id?: string;
  owner_id?: string | null;
  subscriber_count?: number | null;
  subscription_price_ally?: number | null;
  subscription_price_community?: number | null;
  total_emeralds?: number | null;
  updated_at?: string | null;
}

