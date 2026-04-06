// =====================================================
// FILE: types/hermes_social/messages.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T21:55:13.010Z
// SOURCE: database.types.ts lines 2694-2754
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MessageStatus = Database['public']['Enums']['message_status'];

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
  created_at: string | null;
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

