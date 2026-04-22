// =====================================================
// FILE: types/generated/plutus-economics/ledger.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.255Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LedgerEntryType = Database['public']['Enums']['ledger_entry_type'];
export type LedgerEntity = Database['public']['Enums']['ledger_entity'];
export type LedgerRow = Tables<'ledger'>;
export type LedgerInsert = TablesInsert<'ledger'>;
export type LedgerUpdate = TablesUpdate<'ledger'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of ledger
 */
export interface PublicLedger {
  amount_cents: number;
  created_at: string | null;
  created_by: string | null;
  description: string;
  entry_type: LedgerEntryType;
  from_entity: LedgerEntity;
  from_profile_id: string | null;
  id: string;
  public_note: string | null;
  reference_id: string;
  to_entity: LedgerEntity;
  to_profile_id: string | null;
}

/**
 * Form data for ledger
 * All fields are optional for partial updates
 */
export interface LedgerFormData {
  amount_cents?: number;
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  entry_type?: LedgerEntryType;
  from_entity?: LedgerEntity;
  from_profile_id?: string | null;
  id?: string;
  public_note?: string | null;
  reference_id?: string;
  to_entity?: LedgerEntity;
  to_profile_id?: string | null;
}

