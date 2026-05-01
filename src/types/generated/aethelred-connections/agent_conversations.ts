// =====================================================
// FILE: types/generated/aethelred-connections/agent_conversations.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T03:24:41.067Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AgentName = Enums<'agent_name'>;
export type ConversationStatus = Enums<'conversation_status'>;

export type AgentConversationsRow = Tables<'agent_conversations'>;
export type AgentConversationsInsert = TablesInsert<'agent_conversations'>;
export type AgentConversationsUpdate = TablesUpdate<'agent_conversations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of agent_conversations
 */
export interface PublicAgentConversations {
  agent_conversations_id: string;
  context_id: string | null;
  context_type: string | null;
  created_at: string;
  created_by: string | null;
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
  agent_conversations_id?: string;
  context_id?: string | null;
  context_type?: string | null;
  created_at?: string;
  created_by?: string | null;
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
    agent_conversations_id?: string;
    context_id?: string;
    context_type?: string;
    created_at?: string;
    created_by?: string;
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

