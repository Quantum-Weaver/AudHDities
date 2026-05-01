// =====================================================
// FILE: types/generated/aethelred-connections/resend_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T03:24:41.964Z
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

export type DeliveryStatus = Enums<'delivery_status'>;

export type ResendConnectionRow = Tables<'resend_connection'>;
export type ResendConnectionInsert = TablesInsert<'resend_connection'>;
export type ResendConnectionUpdate = TablesUpdate<'resend_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of resend_connection
 * Excludes sensitive fields: api_key
 */
export interface PublicResendConnection {
  created_at: string | null;
  created_by: string | null;
  delivery_status: DeliveryStatus | null;
  emails_failed: number | null;
  emails_sent: number | null;
  from_email: string;
  from_name: string;
  last_sent_at: string | null;
  operated_by: string | null;
  resend_connection_id: string;
  template_versions: Json | null;
  templates: Json | null;
  updated_at: string | null;
}

/**
 * Form data for resend_connection
 * All fields are optional for partial updates
 */
export interface ResendConnectionFormData {
  api_key?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  delivery_status?: DeliveryStatus | null;
  emails_failed?: number | null;
  emails_sent?: number | null;
  from_email?: string;
  from_name?: string;
  last_sent_at?: string | null;
  operated_by?: string | null;
  resend_connection_id?: string;
  template_versions?: Json | null;
  templates?: Json | null;
  updated_at?: string | null;
}

/**
 * Validation result for resend_connection
 */
export interface ResendConnectionValidationResult {
  valid: boolean;
  errors: {
    api_key?: string;
    created_at?: string;
    created_by?: string;
    delivery_status?: string;
    emails_failed?: string;
    emails_sent?: string;
    from_email?: string;
    from_name?: string;
    last_sent_at?: string;
    operated_by?: string;
    resend_connection_id?: string;
    template_versions?: string;
    templates?: string;
    updated_at?: string;
  };
}

