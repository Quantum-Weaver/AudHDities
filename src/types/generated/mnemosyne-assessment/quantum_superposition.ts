// =====================================================
// FILE: types/generated/mnemosyne-assessment/quantum_superposition.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T15:32:13.638Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

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
  quantum_superposition_id: string;
  superposition_id: string;
  updated_at: string | null;
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
  quantum_superposition_id?: string;
  superposition_id?: string;
  updated_at?: string | null;
  user_id?: string;
}

/**
 * Validation result for quantum_superposition
 */
export interface QuantumSuperpositionValidationResult {
  valid: boolean;
  errors: {
    chosen_meaning?: string;
    collapse_reason?: string;
    confidence?: string;
    created_at?: string;
    created_by?: string;
    quantum_superposition_id?: string;
    superposition_id?: string;
    updated_at?: string;
    user_id?: string;
  };
}

