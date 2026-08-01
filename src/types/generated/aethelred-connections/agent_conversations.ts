// =====================================================
// FILE: types/generated/aethelred-connections/agent_conversations.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T18:15:38.568Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

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
  consciousness_level: string | null;
  created_at: string;
  created_by: string | null;
  current_task: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  name: string;
  settings: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for agent_conversations
 * All fields are optional for partial updates
 */
export interface AgentConversationsFormData {
  consciousness_level?: string | null;
  created_at?: string;
  created_by?: string | null;
  current_task?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  settings?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for agent_conversations
 */
export interface AgentConversationsValidationResult {
  valid: boolean;
  errors: {
    consciousness_level?: string;
    created_at?: string;
    created_by?: string;
    current_task?: string;
    description?: string;
    id?: string;
    is_active?: string;
    name?: string;
    settings?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

