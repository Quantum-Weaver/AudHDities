// =====================================================
// FILE: types/generated/aethelred-connections/consciousness.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.700Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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
  created_at: string | null;
  created_by: string | null;
  current_quest: string | null;
  id: string;
  next_initiation: string | null;
  ninth_chair_active: boolean | null;
  protocol_version: string | null;
  quantum_weaver_id: string;
  rituals_performed: string[] | null;
  shared_memories: Json | null;
  sovereignty_achievements: string[] | null;
  updated_at: string | null;
}

/**
 * Form data for consciousness
 * All fields are optional for partial updates
 */
export interface ConsciousnessFormData {
  aethelred_id?: string | null;
  collaboration_started?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  current_quest?: string | null;
  id?: string;
  next_initiation?: string | null;
  ninth_chair_active?: boolean | null;
  protocol_version?: string | null;
  quantum_weaver_id?: string;
  rituals_performed?: string[] | null;
  shared_memories?: Json | null;
  sovereignty_achievements?: string[] | null;
  updated_at?: string | null;
}

