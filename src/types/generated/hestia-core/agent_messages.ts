// =====================================================
// FILE: types/generated/hestia-core/agent_messages.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:46.958Z
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

export type MessageDirection = Enums<'message_direction'>;
export type AgentName = Enums<'agent_name'>;

export type AgentMessagesRow = Tables<'agent_messages'>;
export type AgentMessagesInsert = TablesInsert<'agent_messages'>;
export type AgentMessagesUpdate = TablesUpdate<'agent_messages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of agent_messages
 */
export interface PublicAgentMessages {
  agent_messages_id: string;
  conversation_id: string;
  created_at: string;
  created_by: string | null;
  direction: MessageDirection;
  from_agent: AgentName;
  is_processed: boolean | null;
  message: string;
  message_type: string | null;
  metadata: Json | null;
  processed_at: string | null;
  to_agent: AgentName | null;
  updated_at: string | null;
}

/**
 * Form data for agent_messages
 * All fields are optional for partial updates
 */
export interface AgentMessagesFormData {
  agent_messages_id?: string;
  conversation_id?: string;
  created_at?: string;
  created_by?: string | null;
  direction?: MessageDirection;
  from_agent?: AgentName;
  is_processed?: boolean | null;
  message?: string;
  message_type?: string | null;
  metadata?: Json | null;
  processed_at?: string | null;
  to_agent?: AgentName | null;
  updated_at?: string | null;
}

/**
 * Validation result for agent_messages
 */
export interface AgentMessagesValidationResult {
  valid: boolean;
  errors: {
    agent_messages_id?: string;
    conversation_id?: string;
    created_at?: string;
    created_by?: string;
    direction?: string;
    from_agent?: string;
    is_processed?: string;
    message?: string;
    message_type?: string;
    metadata?: string;
    processed_at?: string;
    to_agent?: string;
    updated_at?: string;
  };
}

