// =====================================================
// FILE: types/generated/aethelred-connections/resend_connection.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.736Z
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

export type DeliveryStatus = Database['public']['Enums']['delivery_status'];
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

