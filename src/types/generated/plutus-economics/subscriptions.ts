// =====================================================
// FILE: types/generated/plutus-economics/subscriptions.ts
// HANDLING: join_table
// GENERATED: 2026-04-15T19:30:35.466Z
// SOURCE: database.types.ts lines 5738-5798
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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

