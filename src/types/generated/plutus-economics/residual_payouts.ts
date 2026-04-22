// =====================================================
// FILE: types/generated/plutus-economics/residual_payouts.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.092Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ResidualPayoutsRow = Tables<'residual_payouts'>;
export type ResidualPayoutsInsert = TablesInsert<'residual_payouts'>;
export type ResidualPayoutsUpdate = TablesUpdate<'residual_payouts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicResidualPayouts = Omit<ResidualPayoutsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ResidualPayoutsFormData = Partial<ResidualPayoutsInsert>;

