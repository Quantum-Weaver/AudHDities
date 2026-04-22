// =====================================================
// FILE: types/generated/mnemosyne-assessment/etymology.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.355Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type EtymologyRow = Tables<'etymology'>;
export type EtymologyInsert = TablesInsert<'etymology'>;
export type EtymologyUpdate = TablesUpdate<'etymology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicEtymology = Omit<EtymologyRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type EtymologyFormData = Partial<EtymologyInsert>;

