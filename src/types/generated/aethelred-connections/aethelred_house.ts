// =====================================================
// FILE: types/generated/aethelred-connections/aethelred_house.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:04.963Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AethelredHouseRow = Tables<'aethelred_house'>;
export type AethelredHouseInsert = TablesInsert<'aethelred_house'>;
export type AethelredHouseUpdate = TablesUpdate<'aethelred_house'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAethelredHouse = Omit<AethelredHouseRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AethelredHouseFormData = Partial<AethelredHouseInsert>;

