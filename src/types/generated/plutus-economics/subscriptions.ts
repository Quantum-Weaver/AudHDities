// =====================================================
// FILE: types/generated/plutus-economics/subscriptions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.904Z
// SOURCE: database.types.ts lines 5738-5798
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SubscriptionStatus = Database['public']['Enums']['subscription_status'];

// =====================================================
// CORE TYPES
// =====================================================

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
  channel_id: string;
  created_at: string | null;
  created_by: string | null;
  expires_at: string | null;
  id: string;
  monthly_amount: number;
  status: SubscriptionStatus | null;
  subscriber_id: string;
  tier_applied: string;
  updated_at: string | null;
}

/**
 * Form data for subscriptions
 * All fields are optional for partial updates
 */
export interface SubscriptionsFormData {
  channel_id?: string;
  created_at?: string | null;
  created_by?: string | null;
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
    created_by?: string;
    expires_at?: string;
    id?: string;
    monthly_amount?: string;
    status?: string;
    subscriber_id?: string;
    tier_applied?: string;
    updated_at?: string;
  };
}

