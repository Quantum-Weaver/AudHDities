// =====================================================
// FILE: types/generated/iris-communications/messages.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-08-01T17:46:58.433Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  body: string | null;
  created_at: string;
  created_by: string;
  id: string;
  is_deleted_by_recipient: boolean;
  is_deleted_by_sender: boolean;
  is_read: boolean;
  parent_message_id: string | null;
  read_at: string | null;
  recipient_id: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for messages
 * All fields are optional for partial updates
 */
export interface MessagesFormData {
  body?: string | null;
  created_at?: string;
  created_by?: string;
  id?: string;
  is_deleted_by_recipient?: boolean;
  is_deleted_by_sender?: boolean;
  is_read?: boolean;
  parent_message_id?: string | null;
  read_at?: string | null;
  recipient_id?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for messages
 */
export interface MessagesValidationResult {
  valid: boolean;
  errors: {
    body?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    is_deleted_by_recipient?: string;
    is_deleted_by_sender?: string;
    is_read?: string;
    parent_message_id?: string;
    read_at?: string;
    recipient_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

