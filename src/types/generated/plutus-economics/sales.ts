// =====================================================
// FILE: types/generated/plutus-economics/sales.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.138Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SalesRow = Tables<'sales'>;
export type SalesInsert = TablesInsert<'sales'>;
export type SalesUpdate = TablesUpdate<'sales'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSales = Omit<SalesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SalesFormData = Partial<SalesInsert>;

