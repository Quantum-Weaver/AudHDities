// =====================================================
// FILE: types/generated/aethelred-connections/resend_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T21:42:54.442Z
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

export type ResendConnectionRow = Tables<'resend_connection'>;
export type ResendConnectionInsert = TablesInsert<'resend_connection'>;
export type ResendConnectionUpdate = TablesUpdate<'resend_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of resend_connection
 */
export interface PublicResendConnection {
  config_key: string;
  config_value: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  enabled_templates: string[] | null;
  from_address: string | null;
  from_name: string;
  id: string;
  is_encrypted: boolean;
  last_verified_at: string | null;
  reply_to_address: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for resend_connection
 * All fields are optional for partial updates
 */
export interface ResendConnectionFormData {
  config_key?: string;
  config_value?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  enabled_templates?: string[] | null;
  from_address?: string | null;
  from_name?: string;
  id?: string;
  is_encrypted?: boolean;
  last_verified_at?: string | null;
  reply_to_address?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for resend_connection
 */
export interface ResendConnectionValidationResult {
  valid: boolean;
  errors: {
    config_key?: string;
    config_value?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    enabled_templates?: string;
    from_address?: string;
    from_name?: string;
    id?: string;
    is_encrypted?: string;
    last_verified_at?: string;
    reply_to_address?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

