// =====================================================
// FILE: types/generated/hestia-core/agent_messages.ts
// HANDLING: full_crud
// GENERATED: 2026-04-19T20:39:34.616Z
// SOURCE: database.types.ts lines 599-648
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type MessageDirection = Database['public']['Enums']['message_direction'];
export type AgentName = Database['public']['Enums']['agent_name'];

// =====================================================
// CORE TYPES
// =====================================================

export type AgentMessagesRow = Database['public']['Tables']['agent_messages']['Row'];
export type AgentMessagesInsert = Database['public']['Tables']['agent_messages']['Insert'];
export type AgentMessagesUpdate = Database['public']['Tables']['agent_messages']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of agent_messages
 */
export interface PublicAgentMessages {
  conversation_id: string;
  created_at: string;
  direction: MessageDirection;
  from_agent: AgentName;
  id: string;
  is_processed: boolean | null;
  message: string;
  message_type: string | null;
  metadata: Json | null;
  processed_at: string | null;
  to_agent: AgentName | null;
}

/**
 * Form data for agent_messages
 * All fields are optional for partial updates
 */
export interface AgentMessagesFormData {
  conversation_id?: string;
  created_at?: string;
  direction?: MessageDirection;
  from_agent?: AgentName;
  id?: string;
  is_processed?: boolean | null;
  message?: string;
  message_type?: string | null;
  metadata?: Json | null;
  processed_at?: string | null;
  to_agent?: AgentName | null;
}

/**
 * Validation result for agent_messages
 */
export interface AgentMessagesValidationResult {
  valid: boolean;
  errors: {
    conversation_id?: string;
    created_at?: string;
    direction?: string;
    from_agent?: string;
    id?: string;
    is_processed?: string;
    message?: string;
    message_type?: string;
    metadata?: string;
    processed_at?: string;
    to_agent?: string;
  };
}

