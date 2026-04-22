// =====================================================
// FILE: types/generated/plutus-economics/subscriptions.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:24:19.919Z
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

export type SubscriptionStatus = Database['public']['Enums']['subscription_status'];
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
  id?: string;
  monthly_amount?: number;
  status?: SubscriptionStatus | null;
  subscriber_id?: string;
  tier_applied?: string;
  updated_at?: string | null;
}

