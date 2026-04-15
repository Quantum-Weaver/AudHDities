// =====================================================
// FILE: types/generated/iris-communications/email_communications.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.484Z
// SOURCE: database.types.ts lines 2054-2119
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EmailStatus = Database['public']['Enums']['email_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type EmailCommunicationsRow = Database['public']['Tables']['email_communications']['Row'];
export type EmailCommunicationsInsert = Database['public']['Tables']['email_communications']['Insert'];
export type EmailCommunicationsUpdate = Database['public']['Tables']['email_communications']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of email_communications
 */
export interface PublicEmailCommunications {
  body: string;
  "clicked_at": string | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  metadata: Json | null;
  "opened_at": string | null;
  provider_message_id: string | null;
  recipient_email: string;
  recipient_id: string | null;
  "sent_at": string | null;
  status: EmailStatus | null;
  subject: string;
  template_id: string | null;
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
  id?: string;
  metadata?: Json | null;
  opened_at?: string | null;
  provider_message_id?: string | null;
  recipient_email?: string;
  recipient_id?: string | null;
  sent_at?: string | null;
  status?: EmailStatus | null;
  subject?: string;
  template_id?: string | null;
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
    id?: string;
    metadata?: string;
    opened_at?: string;
    provider_message_id?: string;
    recipient_email?: string;
    recipient_id?: string;
    sent_at?: string;
    status?: string;
    subject?: string;
    template_id?: string;
  };
}

