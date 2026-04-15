// =====================================================
// FILE: types/generated/hermes-social/messages.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.495Z
// SOURCE: database.types.ts lines 3139-3209
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MessageStatus = Database['public']['Enums']['message_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type MessagesRow = Database['public']['Tables']['messages']['Row'];
export type MessagesInsert = Database['public']['Tables']['messages']['Insert'];
export type MessagesUpdate = Database['public']['Tables']['messages']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of messages
 */
export interface PublicMessages {
  content: string;
  "created_at": "string | null";
  created_by: string | null;
  id: string;
  is_read: boolean | null;
  parent_id: string | null;
  "read_at": "string | null";
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

