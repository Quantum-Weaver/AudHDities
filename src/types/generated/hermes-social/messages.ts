// =====================================================
// FILE: types/generated/hermes-social/messages.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-04-23T02:14:53.060Z
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

/**
 * Validation result for messages
 */
export interface MessagesValidationResult {
  valid: boolean;
  errors: {
    content?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    is_read?: string;
    parent_id?: string;
    read_at?: string;
    recipient_id?: string;
    sender_id?: string;
    status?: string;
    thread_id?: string;
  };
}

