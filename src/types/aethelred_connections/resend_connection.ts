// =====================================================
// FILE: types/aethelred_connections/resend_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T21:55:13.058Z
// SOURCE: database.types.ts lines 3975-4034
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type DeliveryStatus = Database['public']['Enums']['delivery_status'];

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

