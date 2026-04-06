// =====================================================
// FILE: types/iris_communications/email_communications.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T21:55:12.979Z
// SOURCE: database.types.ts lines 1761-1816
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EmailStatus = Database['public']['Enums']['email_status'];

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
  clicked_at: string | null;
  created_at: string | null;
  id: string;
  metadata: Json | null;
  opened_at: string | null;
  provider_message_id: string | null;
  recipient_email: string;
  recipient_id: string | null;
  sent_at: string | null;
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

