// =====================================================
// FILE: types/generated/aethelred-connections/stripe_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:09:31.542Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  config_key: string;
  config_value: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  enabled_features: string[] | null;
  id: string;
  is_encrypted: boolean;
  last_verified_at: string | null;
  status: ContentStatus;
  stripe_mode: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for stripe_connection
 * All fields are optional for partial updates
 */
export interface StripeConnectionFormData {
  config_key?: string;
  config_value?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  enabled_features?: string[] | null;
  id?: string;
  is_encrypted?: boolean;
  last_verified_at?: string | null;
  status?: ContentStatus;
  stripe_mode?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for stripe_connection
 */
export interface StripeConnectionValidationResult {
  valid: boolean;
  errors: {
    config_key?: string;
    config_value?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    enabled_features?: string;
    id?: string;
    is_encrypted?: string;
    last_verified_at?: string;
    status?: string;
    stripe_mode?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

