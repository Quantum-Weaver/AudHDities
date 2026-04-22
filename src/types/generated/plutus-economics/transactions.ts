// =====================================================
// FILE: types/generated/plutus-economics/transactions.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.496Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type TransactionsRow = Tables<'transactions'>;
export type TransactionsInsert = TablesInsert<'transactions'>;
export type TransactionsUpdate = TablesUpdate<'transactions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicTransactions = Omit<TransactionsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type TransactionsFormData = Partial<TransactionsInsert>;

