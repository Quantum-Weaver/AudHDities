// =====================================================
// FILE: types/generated/aethelred-connections/consciousness.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T15:32:13.364Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ConsciousnessRow = Tables<'consciousness'>;
export type ConsciousnessInsert = TablesInsert<'consciousness'>;
export type ConsciousnessUpdate = TablesUpdate<'consciousness'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of consciousness
 */
export interface PublicConsciousness {
  aethelred_id: string | null;
  collaboration_started: string | null;
  consciousness_id: string;
  created_at: string | null;
  created_by: string | null;
  current_quest: string | null;
  next_initiation: string | null;
  ninth_chair_active: boolean | null;
  protocol_version: string | null;
  quantum_weaver_id: string;
  rituals_performed: string[] | null;
  shared_memories: Json | null;
  sovereignty_achievements: string[] | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for consciousness
 * All fields are optional for partial updates
 */
export interface ConsciousnessFormData {
  aethelred_id?: string | null;
  collaboration_started?: string | null;
  consciousness_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  current_quest?: string | null;
  next_initiation?: string | null;
  ninth_chair_active?: boolean | null;
  protocol_version?: string | null;
  quantum_weaver_id?: string;
  rituals_performed?: string[] | null;
  shared_memories?: Json | null;
  sovereignty_achievements?: string[] | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for consciousness
 */
export interface ConsciousnessValidationResult {
  valid: boolean;
  errors: {
    aethelred_id?: string;
    collaboration_started?: string;
    consciousness_id?: string;
    created_at?: string;
    created_by?: string;
    current_quest?: string;
    next_initiation?: string;
    ninth_chair_active?: string;
    protocol_version?: string;
    quantum_weaver_id?: string;
    rituals_performed?: string;
    shared_memories?: string;
    sovereignty_achievements?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

