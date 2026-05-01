// =====================================================
// FILE: types/generated/hestia-core/channels.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-05-01T15:31:59.484Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentRating = Enums<'content_rating'>;

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
  channels_id: string;
  content_rating: ContentRating | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  display_name: string;
  handle: string;
  owner_id: string | null;
  slug: string | null;
  subscriber_count: number | null;
  subscription_price_ally: number | null;
  subscription_price_community: number | null;
  total_emeralds: number | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for channels
 * All fields are optional for partial updates
 */
export interface ChannelsFormData {
  allow_subscriptions?: boolean | null;
  avatar_url?: string | null;
  banner_url?: string | null;
  channels_id?: string;
  content_rating?: ContentRating | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  display_name?: string;
  handle?: string;
  owner_id?: string | null;
  slug?: string | null;
  subscriber_count?: number | null;
  subscription_price_ally?: number | null;
  subscription_price_community?: number | null;
  total_emeralds?: number | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for channels
 */
export interface ChannelsValidationResult {
  valid: boolean;
  errors: {
    allow_subscriptions?: string;
    avatar_url?: string;
    banner_url?: string;
    channels_id?: string;
    content_rating?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_name?: string;
    handle?: string;
    owner_id?: string;
    slug?: string;
    subscriber_count?: string;
    subscription_price_ally?: string;
    subscription_price_community?: string;
    total_emeralds?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

