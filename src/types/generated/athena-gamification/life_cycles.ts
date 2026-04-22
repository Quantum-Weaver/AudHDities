// =====================================================
// FILE: types/generated/athena-gamification/life_cycles.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.282Z
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

export type LifeCyclePhase = Database['public']['Enums']['life_cycle_phase'];
export type LifeCyclesRow = Tables<'life_cycles'>;
export type LifeCyclesInsert = TablesInsert<'life_cycles'>;
export type LifeCyclesUpdate = TablesUpdate<'life_cycles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of life_cycles
 */
export interface PublicLifeCycles {
  created_at: string | null;
  created_by: string | null;
  ended_at: string | null;
  id: string;
  metadata: Json | null;
  phase: LifeCyclePhase;
  started_at: string;
  trigger_event: string | null;
  user_id: string;
}

/**
 * Form data for life_cycles
 * All fields are optional for partial updates
 */
export interface LifeCyclesFormData {
  created_at?: string | null;
  created_by?: string | null;
  ended_at?: string | null;
  id?: string;
  metadata?: Json | null;
  phase?: LifeCyclePhase;
  started_at?: string;
  trigger_event?: string | null;
  user_id?: string;
}

