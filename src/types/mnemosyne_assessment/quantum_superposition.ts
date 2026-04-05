// =====================================================
// FILE: types/mnemosyne_assessment/quantum_superposition.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T19:46:33.075Z
// SOURCE: database.types.ts lines 3598-3642
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type QuantumSuperpositionRow = Database['public']['Tables']['quantum_superposition']['Row'];
export type QuantumSuperpositionInsert = Database['public']['Tables']['quantum_superposition']['Insert'];
export type QuantumSuperpositionUpdate = Database['public']['Tables']['quantum_superposition']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of quantum_superposition
 */
export interface PublicQuantumSuperposition {
  chosen_meaning: string
  collapse_reason: string | null
  confidence: number
  created_at: string | null
  id: string
  superposition_id: string
  user_id: string
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
  id?: string;
  superposition_id?: string;
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
    id?: string;
    superposition_id?: string;
    user_id?: string;
  };
}

