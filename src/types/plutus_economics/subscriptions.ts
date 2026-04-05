// =====================================================
// FILE: types/plutus_economics/subscriptions.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T19:46:33.134Z
// SOURCE: database.types.ts lines 4685-4735
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SubscriptionStatus = Database['public']['Enums']['subscription_status'];

export type SubscriptionsRow = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionsInsert = Database['public']['Tables']['subscriptions']['Insert'];
export type SubscriptionsUpdate = Database['public']['Tables']['subscriptions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of subscriptions
 */
export interface PublicSubscriptions {
  channel_id: string
  created_at: string | null
  expires_at: string | null
  id: string
  monthly_amount: number
  status: SubscriptionStatus | null
  subscriber_id: string
  tier_applied: string
  updated_at: string | null
}

/**
 * Form data for subscriptions
 * All fields are optional for partial updates
 */
export interface SubscriptionsFormData {
  channel_id?: string;
  created_at?: string | null;
  expires_at?: string | null;
  id?: string;
  monthly_amount?: number;
  status?: SubscriptionStatus | null;
  subscriber_id?: string;
  tier_applied?: string;
  updated_at?: string | null;
}

/**
 * Validation result for subscriptions
 */
export interface SubscriptionsValidationResult {
  valid: boolean;
  errors: {
    channel_id?: string;
    created_at?: string;
    expires_at?: string;
    id?: string;
    monthly_amount?: string;
    status?: string;
    subscriber_id?: string;
    tier_applied?: string;
    updated_at?: string;
  };
}

