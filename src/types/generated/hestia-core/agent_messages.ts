// =====================================================
// FILE: types/generated/hestia-core/agent_messages.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.004Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AgentMessagesRow = Tables<'agent_messages'>;
export type AgentMessagesInsert = TablesInsert<'agent_messages'>;
export type AgentMessagesUpdate = TablesUpdate<'agent_messages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAgentMessages = Omit<AgentMessagesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AgentMessagesFormData = Partial<AgentMessagesInsert>;

