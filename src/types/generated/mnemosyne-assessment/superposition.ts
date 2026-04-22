// =====================================================
// FILE: types/generated/mnemosyne-assessment/superposition.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.355Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SuperpositionRow = Tables<'superposition'>;
export type SuperpositionInsert = TablesInsert<'superposition'>;
export type SuperpositionUpdate = TablesUpdate<'superposition'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSuperposition = Omit<SuperpositionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SuperpositionFormData = Partial<SuperpositionInsert>;

