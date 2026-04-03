// =====================================================
/* @/types/core/channels.ts */
// CHANNELS - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type ContentRating = Database['public']['Enums']['content_rating'];

// =====================================================
// CORE Channel TYPES
// =====================================================
/**
 * Raw Channel row from database
 * Matches exactly what Supabase returns
**/
export type ChannelRow = Database['public']['Tables']['channels']['Row'];

export type ChannelInsert = Database['public']['Tables']['channels']['Insert'];
export type ChannelUpdate = Database['public']['Tables']['channels']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * Public Channel - what anyone can see
 */
export interface PublicChannel {
  id: string;
  handle: string;
  description: string | null;
  avatar_url: string | null;
  display_name: string;
  subscriber_count: number | null; 
  content_rating: ContentRating;
  created_at: string | null;
}

/**
 * Own Channel - includes private fields
 */
export interface OwnChannel extends PublicChannel {
  allow_subscriptions: boolean | null;  
  owner_id: string | null;
  subscription_price_ally?: number | null;
  total_emeralds: number | null;
  subscription_price_community?: number | null;
  updated_at: string | null;
}

/**
 * Channel form data (for editing)
 */
export interface ChannelFormData {
  display_name: string;
  description: string | null;
  allow_subscriptions: boolean | null;
  subscription_price_ally?: number | null;
  handle: string;
  total_emeralds: number | null;
  subscription_price_community?: number | null; 
  content_rating: ContentRating;
  avatar_url: string | null;
}

/**
 * Channel validation result
 */
export interface ChannelValidationResult {
  valid: boolean;
  errors: {
    handle?: string;
    display_name?: string;
  };
}