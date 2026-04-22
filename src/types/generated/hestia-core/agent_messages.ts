// =====================================================
// FILE: types/generated/hestia-core/agent_messages.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.563Z
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

export type MessageDirection = Database['public']['Enums']['message_direction'];
export type AgentName = Database['public']['Enums']['agent_name'];
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

