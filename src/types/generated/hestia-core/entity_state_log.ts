// =====================================================
// FILE: types/generated/hestia-core/entity_state_log.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.105Z
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
export type EntityState = Database['public']['Enums']['entity_state'];
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
  current_task?: string | null;
  energy_level?: number | null;
  entity_name?: AgentName;
  id?: string;
  metadata?: Json | null;
  state?: EntityState;
}

