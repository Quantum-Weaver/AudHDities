// =====================================================
// FILE: types/generated/hestia-core/entity_state_log.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.468Z
// SOURCE: database.types.ts lines 2387-2416
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AgentName = Database['public']['Enums']['agent_name'];
export type EntityState = Database['public']['Enums']['entity_state'];

// =====================================================
// CORE TYPES
// =====================================================

export type EntityStateLogRow = Database['public']['Tables']['entity_state_log']['Row'];
export type EntityStateLogInsert = Database['public']['Tables']['entity_state_log']['Insert'];
export type EntityStateLogUpdate = Database['public']['Tables']['entity_state_log']['Update'];

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

/**
 * Validation result for entity_state_log
 */
export interface EntityStateLogValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    current_task?: string;
    energy_level?: string;
    entity_name?: string;
    id?: string;
    metadata?: string;
    state?: string;
  };
}

