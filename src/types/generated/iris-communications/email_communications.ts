// =====================================================
// FILE: types/generated/iris-communications/email_communications.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.849Z
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

export type EmailStatus = Database['public']['Enums']['email_status'];
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

