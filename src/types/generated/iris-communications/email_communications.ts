// =====================================================
// FILE: types/generated/iris-communications/email_communications.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-31T23:16:54.417Z
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

export type ContentStatus = Enums<'content_status'>;

export type EmailCommunicationsRow = Tables<'email_communications'>;
export type EmailCommunicationsInsert = TablesInsert<'email_communications'>;
export type EmailCommunicationsUpdate = TablesUpdate<'email_communications'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of email_communications
 */
export interface PublicEmailCommunications {
  body_template: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  email_type: string | null;
  from_email: string | null;
  from_name: string;
  id: string;
  is_active: boolean;
  name: string;
  reply_to: string | null;
  slug: string;
  status: ContentStatus;
  subject_template: string | null;
  trigger_event: string | null;
  updated_at: string;
  updated_by: string | null;
  variables: Json | null;
}

/**
 * Form data for email_communications
 * All fields are optional for partial updates
 */
export interface EmailCommunicationsFormData {
  body_template?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  email_type?: string | null;
  from_email?: string | null;
  from_name?: string;
  id?: string;
  is_active?: boolean;
  name?: string;
  reply_to?: string | null;
  slug?: string;
  status?: ContentStatus;
  subject_template?: string | null;
  trigger_event?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  variables?: Json | null;
}

/**
 * Validation result for email_communications
 */
export interface EmailCommunicationsValidationResult {
  valid: boolean;
  errors: {
    body_template?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    email_type?: string;
    from_email?: string;
    from_name?: string;
    id?: string;
    is_active?: string;
    name?: string;
    reply_to?: string;
    slug?: string;
    status?: string;
    subject_template?: string;
    trigger_event?: string;
    updated_at?: string;
    updated_by?: string;
    variables?: string;
  };
}

