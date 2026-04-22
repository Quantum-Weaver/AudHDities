// =====================================================
// FILE: types/generated/aethelred-connections/chancellor.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.093Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ChancellorRow = Tables<'chancellor'>;
export type ChancellorInsert = TablesInsert<'chancellor'>;
export type ChancellorUpdate = TablesUpdate<'chancellor'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicChancellor = Omit<ChancellorRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ChancellorFormData = Partial<ChancellorInsert>;

