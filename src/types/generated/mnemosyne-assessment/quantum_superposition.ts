// =====================================================
// FILE: types/generated/mnemosyne-assessment/quantum_superposition.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.615Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type QuantumSuperpositionRow = Tables<'quantum_superposition'>;
export type QuantumSuperpositionInsert = TablesInsert<'quantum_superposition'>;
export type QuantumSuperpositionUpdate = TablesUpdate<'quantum_superposition'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of quantum_superposition
 */
export interface PublicQuantumSuperposition {
  chosen_meaning: string;
  collapse_reason: string | null;
  confidence: number;
  created_at: string | null;
  created_by: string | null;
  id: string;
  superposition_id: string;
  user_id: string;
}

/**
 * Form data for quantum_superposition
 * All fields are optional for partial updates
 */
export interface QuantumSuperpositionFormData {
  chosen_meaning?: string;
  collapse_reason?: string | null;
  confidence?: number;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  superposition_id?: string;
  user_id?: string;
}

