// =====================================================
// FILE: types/generated/hestia-core/agent_conversations.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.334Z
// SOURCE: database.types.ts lines 545-598
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AgentName = Database['public']['Enums']['agent_name'];
export type ConversationStatus = Database['public']['Enums']['conversation_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type AgentConversationsRow = Database['public']['Tables']['agent_conversations']['Row'];
export type AgentConversationsInsert = Database['public']['Tables']['agent_conversations']['Insert'];
export type AgentConversationsUpdate = Database['public']['Tables']['agent_conversations']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of agent_conversations
 */
export interface PublicAgentConversations {
  context_id: string | null;
  context_type: string | null;
  created_at: string;
  id: string;
  last_message_at: string | null;
  message_count: number | null;
  metadata: Json | null;
  participants: AgentName[];
  resolved_at: string | null;
  started_at: string;
  status: ConversationStatus;
  summary: string | null;
  title: string | null;
  updated_at: string;
  user_id: string | null;
}

/**
 * Form data for agent_conversations
 * All fields are optional for partial updates
 */
export interface AgentConversationsFormData {
  context_id?: string | null;
  context_type?: string | null;
  created_at?: string;
  id?: string;
  last_message_at?: string | null;
  message_count?: number | null;
  metadata?: Json | null;
  participants?: AgentName[];
  resolved_at?: string | null;
  started_at?: string;
  status?: ConversationStatus;
  summary?: string | null;
  title?: string | null;
  updated_at?: string;
  user_id?: string | null;
}

/**
 * Validation result for agent_conversations
 */
export interface AgentConversationsValidationResult {
  valid: boolean;
  errors: {
    context_id?: string;
    context_type?: string;
    created_at?: string;
    id?: string;
    last_message_at?: string;
    message_count?: string;
    metadata?: string;
    participants?: string;
    resolved_at?: string;
    started_at?: string;
    status?: string;
    summary?: string;
    title?: string;
    updated_at?: string;
    user_id?: string;
  };
}

