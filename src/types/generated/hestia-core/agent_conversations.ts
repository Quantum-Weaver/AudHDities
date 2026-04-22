// =====================================================
// FILE: types/generated/hestia-core/agent_conversations.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.661Z
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

export type AgentName = Database['public']['Enums']['agent_name'];
export type ConversationStatus = Database['public']['Enums']['conversation_status'];
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

