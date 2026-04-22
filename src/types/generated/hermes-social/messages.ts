// =====================================================
// FILE: types/generated/hermes-social/messages.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.325Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MessageStatus = Database['public']['Enums']['message_status'];
export type MessagesRow = Tables<'messages'>;
export type MessagesInsert = TablesInsert<'messages'>;
export type MessagesUpdate = TablesUpdate<'messages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of messages
 */
export interface PublicMessages {
  content: string;
  created_at: string | null;
  created_by: string | null;
  id: string;
  is_read: boolean | null;
  parent_id: string | null;
  read_at: string | null;
  recipient_id: string;
  sender_id: string;
  status: MessageStatus | null;
  thread_id: string | null;
}

/**
 * Form data for messages
 * All fields are optional for partial updates
 */
export interface MessagesFormData {
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  is_read?: boolean | null;
  parent_id?: string | null;
  read_at?: string | null;
  recipient_id?: string;
  sender_id?: string;
  status?: MessageStatus | null;
  thread_id?: string | null;
}

