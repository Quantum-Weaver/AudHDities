// =====================================================
// FILE: types/generated/aethelred-connections/resend_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.458Z
// SOURCE: database.types.ts lines 4917-4986
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type DeliveryStatus = Database['public']['Enums']['delivery_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type ResendConnectionRow = Database['public']['Tables']['resend_connection']['Row'];
export type ResendConnectionInsert = Database['public']['Tables']['resend_connection']['Insert'];
export type ResendConnectionUpdate = Database['public']['Tables']['resend_connection']['Update'];

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
  id: string;
  last_sent_at: string | null;
  operated_by: string | null;
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
  id?: string;
  last_sent_at?: string | null;
  operated_by?: string | null;
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
    id?: string;
    last_sent_at?: string;
    operated_by?: string;
    template_versions?: string;
    templates?: string;
    updated_at?: string;
  };
}

