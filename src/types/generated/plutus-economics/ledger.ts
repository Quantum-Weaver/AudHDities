// =====================================================
// FILE: types/generated/plutus-economics/ledger.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.496Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type LedgerRow = Tables<'ledger'>;
export type LedgerInsert = TablesInsert<'ledger'>;
export type LedgerUpdate = TablesUpdate<'ledger'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicLedger = Omit<LedgerRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type LedgerFormData = Partial<LedgerInsert>;

