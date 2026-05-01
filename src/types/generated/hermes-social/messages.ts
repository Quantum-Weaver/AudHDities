// =====================================================
// FILE: types/generated/hermes-social/messages.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-05-01T15:31:59.658Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MessageStatus = Enums<'message_status'>;

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
  is_read: boolean | null;
  messages_id: string;
  parent_id: string | null;
  read_at: string | null;
  recipient_id: string;
  sender_id: string;
  status: MessageStatus | null;
  thread_id: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for messages
 * All fields are optional for partial updates
 */
export interface MessagesFormData {
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  is_read?: boolean | null;
  messages_id?: string;
  parent_id?: string | null;
  read_at?: string | null;
  recipient_id?: string;
  sender_id?: string;
  status?: MessageStatus | null;
  thread_id?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for messages
 */
export interface MessagesValidationResult {
  valid: boolean;
  errors: {
    content?: string;
    created_at?: string;
    created_by?: string;
    is_read?: string;
    messages_id?: string;
    parent_id?: string;
    read_at?: string;
    recipient_id?: string;
    sender_id?: string;
    status?: string;
    thread_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

