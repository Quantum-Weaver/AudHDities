// =====================================================
// FILE: types/generated/mnemosyne-assessment/quantum_superposition.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.975Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type QuantumSuperpositionRow = Tables<'quantum_superposition'>;
export type QuantumSuperpositionInsert = TablesInsert<'quantum_superposition'>;
export type QuantumSuperpositionUpdate = TablesUpdate<'quantum_superposition'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicQuantumSuperposition = Omit<QuantumSuperpositionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type QuantumSuperpositionFormData = Partial<QuantumSuperpositionInsert>;

