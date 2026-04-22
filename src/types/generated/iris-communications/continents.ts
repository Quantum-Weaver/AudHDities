// =====================================================
// FILE: types/generated/iris-communications/continents.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.170Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ContinentsRow = Tables<'continents'>;
export type ContinentsInsert = TablesInsert<'continents'>;
export type ContinentsUpdate = TablesUpdate<'continents'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicContinents = Omit<ContinentsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ContinentsFormData = Partial<ContinentsInsert>;

