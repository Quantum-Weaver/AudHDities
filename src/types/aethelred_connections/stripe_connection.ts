// =====================================================
// FILE: types/aethelred_connections/stripe_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T19:46:33.131Z
// SOURCE: database.types.ts lines 4632-4684
// =====================================================

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

export type StripeConnectionRow = Database['public']['Tables']['stripe_connection']['Row'];
export type StripeConnectionInsert = Database['public']['Tables']['stripe_connection']['Insert'];
export type StripeConnectionUpdate = Database['public']['Tables']['stripe_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of stripe_connection
 */
export interface PublicStripeConnection {
  account_id: string
  connected_accounts: Json | null
  created_at: string | null
  id: string
  last_sync_at: string | null
  mode: StripeMode | null
  operated_by: string | null
  payout_settings: Json | null
  products_synced: number | null
  updated_at: string | null
  webhook_secret: string | null
  webhook_status: WebhookStatus | null
}

/**
 * Form data for stripe_connection
 * All fields are optional for partial updates
 */
export interface StripeConnectionFormData {
  account_id?: string;
  connected_accounts?: Json | null;
  created_at?: string | null;
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

