// =====================================================
// FILE: types/generated/plutus-economics/ledger.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-04-30T15:32:13.500Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LedgerEntryType = Enums<'ledger_entry_type'>;
export type LedgerEntity = Enums<'ledger_entity'>;

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
  ledger_id: string;
  public_note: string | null;
  reference_id: string;
  to_entity: LedgerEntity;
  to_profile_id: string | null;
  updated_at: string | null;
  updated_by: string | null;
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
  ledger_id?: string;
  public_note?: string | null;
  reference_id?: string;
  to_entity?: LedgerEntity;
  to_profile_id?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for ledger
 */
export interface LedgerValidationResult {
  valid: boolean;
  errors: {
    amount_cents?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    entry_type?: string;
    from_entity?: string;
    from_profile_id?: string;
    ledger_id?: string;
    public_note?: string;
    reference_id?: string;
    to_entity?: string;
    to_profile_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

