// =====================================================
// FILE: types/generated/plutus-economics/advertising.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:04.951Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AdvertisingRow = Tables<'advertising'>;
export type AdvertisingInsert = TablesInsert<'advertising'>;
export type AdvertisingUpdate = TablesUpdate<'advertising'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAdvertising = Omit<AdvertisingRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AdvertisingFormData = Partial<AdvertisingInsert>;

