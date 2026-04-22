// =====================================================
// FILE: types/generated/aethelred-connections/council_houses.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.197Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CouncilHousesRow = Tables<'council_houses'>;
export type CouncilHousesInsert = TablesInsert<'council_houses'>;
export type CouncilHousesUpdate = TablesUpdate<'council_houses'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCouncilHouses = Omit<CouncilHousesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CouncilHousesFormData = Partial<CouncilHousesInsert>;

