// =====================================================
// FILE: types/generated/aethelred-connections/stripe_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T00:26:46.668Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type StripeMode = Enums<'stripe_mode'>;
export type WebhookStatus = Enums<'webhook_status'>;

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

/**
 * Validation result for stripe_connection
 */
export interface StripeConnectionValidationResult {
  valid: boolean;
  errors: {
    account_id?: string;
    connected_accounts?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    last_sync_at?: string;
    mode?: string;
    operated_by?: string;
    payout_settings?: string;
    products_synced?: string;
    updated_at?: string;
    webhook_secret?: string;
    webhook_status?: string;
  };
}

