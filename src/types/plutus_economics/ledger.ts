// =====================================================
// FILE: types/plutus_economics/ledger.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T19:46:33.018Z
// SOURCE: database.types.ts lines 2421-2477
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LedgerEntryType = Database['public']['Enums']['ledger_entry_type'];
export type LedgerEntity = Database['public']['Enums']['ledger_entity'];

export type LedgerRow = Database['public']['Tables']['ledger']['Row'];
export type LedgerInsert = Database['public']['Tables']['ledger']['Insert'];
export type LedgerUpdate = Database['public']['Tables']['ledger']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of ledger
 */
export interface PublicLedger {
  amount_cents: number
  created_at: string | null
  description: string
  entry_type: LedgerEntryType
  from_entity: LedgerEntity
  from_profile_id: string | null
  id: string
  public_note: string | null
  reference_id: string
  to_entity: LedgerEntity
  to_profile_id: string | null
}

/**
 * Form data for ledger
 * All fields are optional for partial updates
 */
export interface LedgerFormData {
  amount_cents?: number;
  created_at?: string | null;
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

/**
 * Validation result for ledger
 */
export interface LedgerValidationResult {
  valid: boolean;
  errors: {
    amount_cents?: string;
    created_at?: string;
    description?: string;
    entry_type?: string;
    from_entity?: string;
    from_profile_id?: string;
    id?: string;
    public_note?: string;
    reference_id?: string;
    to_entity?: string;
    to_profile_id?: string;
  };
}

