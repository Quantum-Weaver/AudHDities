// =====================================================
// FILE: types/generated/plutus-economics/residual_pool.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.113Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ResidualPoolRow = Tables<'residual_pool'>;
export type ResidualPoolInsert = TablesInsert<'residual_pool'>;
export type ResidualPoolUpdate = TablesUpdate<'residual_pool'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicResidualPool = Omit<ResidualPoolRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ResidualPoolFormData = Partial<ResidualPoolInsert>;

