// =====================================================
// FILE: types/generated/plutus-economics/payouts.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.761Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PayoutsRow = Tables<'payouts'>;
export type PayoutsInsert = TablesInsert<'payouts'>;
export type PayoutsUpdate = TablesUpdate<'payouts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPayouts = Omit<PayoutsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PayoutsFormData = Partial<PayoutsInsert>;

