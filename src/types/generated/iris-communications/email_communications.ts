// =====================================================
// FILE: types/generated/iris-communications/email_communications.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T15:32:13.428Z
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

export type EmailStatus = Enums<'email_status'>;

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
  body: string;
  clicked_at: string | null;
  created_at: string | null;
  created_by: string | null;
  email_communications_id: string;
  metadata: Json | null;
  opened_at: string | null;
  provider_message_id: string | null;
  recipient_email: string;
  recipient_id: string | null;
  sent_at: string | null;
  status: EmailStatus | null;
  subject: string;
  template_id: string | null;
  updated_at: string | null;
}

/**
 * Form data for email_communications
 * All fields are optional for partial updates
 */
export interface EmailCommunicationsFormData {
  body?: string;
  clicked_at?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  email_communications_id?: string;
  metadata?: Json | null;
  opened_at?: string | null;
  provider_message_id?: string | null;
  recipient_email?: string;
  recipient_id?: string | null;
  sent_at?: string | null;
  status?: EmailStatus | null;
  subject?: string;
  template_id?: string | null;
  updated_at?: string | null;
}

/**
 * Validation result for email_communications
 */
export interface EmailCommunicationsValidationResult {
  valid: boolean;
  errors: {
    body?: string;
    clicked_at?: string;
    created_at?: string;
    created_by?: string;
    email_communications_id?: string;
    metadata?: string;
    opened_at?: string;
    provider_message_id?: string;
    recipient_email?: string;
    recipient_id?: string;
    sent_at?: string;
    status?: string;
    subject?: string;
    template_id?: string;
    updated_at?: string;
  };
}

