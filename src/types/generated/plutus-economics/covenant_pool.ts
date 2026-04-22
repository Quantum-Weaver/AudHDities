// =====================================================
// FILE: types/generated/plutus-economics/covenant_pool.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.209Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CovenantPoolRow = Tables<'covenant_pool'>;
export type CovenantPoolInsert = TablesInsert<'covenant_pool'>;
export type CovenantPoolUpdate = TablesUpdate<'covenant_pool'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCovenantPool = Omit<CovenantPoolRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CovenantPoolFormData = Partial<CovenantPoolInsert>;

