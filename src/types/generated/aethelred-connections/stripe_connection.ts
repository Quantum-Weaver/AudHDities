// =====================================================
// FILE: types/generated/aethelred-connections/stripe_connection.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.737Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type StripeMode = Database['public']['Enums']['stripe_mode'];
export type WebhookStatus = Database['public']['Enums']['webhook_status'];
export type StripeConnectionRow = Tables<'stripe_connection'>;
export type StripeConnectionInsert = TablesInsert<'stripe_connection'>;
export type StripeConnectionUpdate = TablesUpdate<'stripe_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of stripe_connection
 */
export interface PublicStripeConnection {
  account_id: string;
  connected_accounts: Json | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  last_sync_at: string | null;
  mode: StripeMode | null;
  operated_by: string | null;
  payout_settings: Json | null;
  products_synced: number | null;
  updated_at: string | null;
  webhook_secret: string | null;
  webhook_status: WebhookStatus | null;
}

/**
 * Form data for stripe_connection
 * All fields are optional for partial updates
 */
export interface StripeConnectionFormData {
  account_id?: string;
  connected_accounts?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  last_sync_at?: string | null;
  mode?: StripeMode | null;
  operated_by?: string | null;
  payout_settings?: Json | null;
  products_synced?: number | null;
  updated_at?: string | null;
  webhook_secret?: string | null;
  webhook_status?: WebhookStatus | null;
}

