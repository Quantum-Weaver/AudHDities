// =====================================================
// FILE: types/generated/aethelred-connections/entity_state_log.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T03:24:41.407Z
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
export type EntityState = Enums<'entity_state'>;

export type EntityStateLogRow = Tables<'entity_state_log'>;
export type EntityStateLogInsert = TablesInsert<'entity_state_log'>;
export type EntityStateLogUpdate = TablesUpdate<'entity_state_log'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of entity_state_log
 */
export interface PublicEntityStateLog {
  created_at: string;
  created_by: string | null;
  current_task: string | null;
  energy_level: number | null;
  entity_name: AgentName;
  entity_state_log_id: string;
  metadata: Json | null;
  state: EntityState;
  updated_at: string | null;
}

/**
 * Form data for entity_state_log
 * All fields are optional for partial updates
 */
export interface EntityStateLogFormData {
  created_at?: string;
  created_by?: string | null;
  current_task?: string | null;
  energy_level?: number | null;
  entity_name?: AgentName;
  entity_state_log_id?: string;
  metadata?: Json | null;
  state?: EntityState;
  updated_at?: string | null;
}

/**
 * Validation result for entity_state_log
 */
export interface EntityStateLogValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    current_task?: string;
    energy_level?: string;
    entity_name?: string;
    entity_state_log_id?: string;
    metadata?: string;
    state?: string;
    updated_at?: string;
  };
}

