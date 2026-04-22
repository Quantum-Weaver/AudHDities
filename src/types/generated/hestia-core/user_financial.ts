// =====================================================
// FILE: types/generated/hestia-core/user_financial.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.546Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type UserFinancialRow = Tables<'user_financial'>;
export type UserFinancialInsert = TablesInsert<'user_financial'>;
export type UserFinancialUpdate = TablesUpdate<'user_financial'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicUserFinancial = Omit<UserFinancialRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type UserFinancialFormData = Partial<UserFinancialInsert>;

