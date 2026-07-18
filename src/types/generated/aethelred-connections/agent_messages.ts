// =====================================================
// FILE: types/generated/aethelred-connections/agent_messages.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:17:10.594Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

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
 * Form data for agent_messages
 * All fields are optional for partial updates
 */
export interface AgentMessagesFormData {
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
 * Validation result for agent_messages
 */
export interface AgentMessagesValidationResult {
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

