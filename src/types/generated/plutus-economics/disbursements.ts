// =====================================================
// FILE: types/generated/plutus-economics/disbursements.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.292Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type DisbursementsRow = Tables<'disbursements'>;
export type DisbursementsInsert = TablesInsert<'disbursements'>;
export type DisbursementsUpdate = TablesUpdate<'disbursements'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicDisbursements = Omit<DisbursementsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type DisbursementsFormData = Partial<DisbursementsInsert>;

