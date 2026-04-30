// =====================================================
// FILE: types/generated/hestia-core/entity_state_log.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T00:26:45.935Z
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
  id: string;
  metadata: Json | null;
  state: EntityState;
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
  id?: string;
  metadata?: Json | null;
  state?: EntityState;
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
    id?: string;
    metadata?: string;
    state?: string;
  };
}

