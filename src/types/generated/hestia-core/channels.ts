// =====================================================
// FILE: types/generated/hestia-core/channels.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.888Z
// SOURCE: database.types.ts lines 917-988
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentRating = Database['public']['Enums']['content_rating'];

// =====================================================
// CORE TYPES
// =====================================================

export type ChannelsRow = Database['public']['Tables']['channels']['Row'];
export type ChannelsInsert = Database['public']['Tables']['channels']['Insert'];
export type ChannelsUpdate = Database['public']['Tables']['channels']['Update'];

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

/**
 * Validation result for channels
 */
export interface ChannelsValidationResult {
  valid: boolean;
  errors: {
    allow_subscriptions?: string;
    avatar_url?: string;
    banner_url?: string;
    content_rating?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_name?: string;
    handle?: string;
    id?: string;
    owner_id?: string;
    subscriber_count?: string;
    subscription_price_ally?: string;
    subscription_price_community?: string;
    total_emeralds?: string;
    updated_at?: string;
  };
}

