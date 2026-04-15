// =====================================================
// FILE: types/generated/plutus-economics/ledger.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.492Z
// SOURCE: database.types.ts lines 2816-2882
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LedgerEntryType = Database['public']['Enums']['ledger_entry_type'];
export type LedgerEntity = Database['public']['Enums']['ledger_entity'];

// =====================================================
// CORE TYPES
// =====================================================

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
    id?: string;
    public_note?: string;
    reference_id?: string;
    to_entity?: string;
    to_profile_id?: string;
  };
}

