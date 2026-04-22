// =====================================================
// FILE: types/generated/hestia-core/agent_conversations.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:04.989Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AgentConversationsRow = Tables<'agent_conversations'>;
export type AgentConversationsInsert = TablesInsert<'agent_conversations'>;
export type AgentConversationsUpdate = TablesUpdate<'agent_conversations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAgentConversations = Omit<AgentConversationsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AgentConversationsFormData = Partial<AgentConversationsInsert>;

