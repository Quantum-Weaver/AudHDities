// =====================================================
// FILE: types/generated/plutus-economics/subscriptions.ts
// HANDLING: join_table
// DEITY: plutus-economics
// GENERATED: 2026-05-01T15:31:59.876Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SubscriptionStatus = Enums<'subscription_status'>;

export type SubscriptionsRow = Tables<'subscriptions'>;
export type SubscriptionsInsert = TablesInsert<'subscriptions'>;
export type SubscriptionsUpdate = TablesUpdate<'subscriptions'>;

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
  monthly_amount?: number;
  status?: SubscriptionStatus | null;
  subscriber_id?: string;
  subscriptions_id?: string;
  tier_applied?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

