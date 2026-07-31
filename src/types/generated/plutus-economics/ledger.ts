// =====================================================
// FILE: types/generated/plutus-economics/ledger.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-31T23:16:54.609Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

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
  amount: number;
  breakdown: Json | null;
  created_at: string;
  currency: string;
  description: string | null;
  entry_type: string;
  event_at: string;
  from_pool_id: string | null;
  from_sovereign_id: string | null;
  icon_emoji: string | null;
  id: string;
  reference_id: string | null;
  reference_table: string | null;
  to_pool_id: string | null;
  to_sovereign_id: string | null;
}

/**
 * Form data for ledger
 * All fields are optional for partial updates
 */
export interface LedgerFormData {
  amount?: number;
  breakdown?: Json | null;
  created_at?: string;
  currency?: string;
  description?: string | null;
  entry_type?: string;
  event_at?: string;
  from_pool_id?: string | null;
  from_sovereign_id?: string | null;
  icon_emoji?: string | null;
  id?: string;
  reference_id?: string | null;
  reference_table?: string | null;
  to_pool_id?: string | null;
  to_sovereign_id?: string | null;
}

/**
 * Validation result for ledger
 */
export interface LedgerValidationResult {
  valid: boolean;
  errors: {
    amount?: string;
    breakdown?: string;
    created_at?: string;
    currency?: string;
    description?: string;
    entry_type?: string;
    event_at?: string;
    from_pool_id?: string;
    from_sovereign_id?: string;
    icon_emoji?: string;
    id?: string;
    reference_id?: string;
    reference_table?: string;
    to_pool_id?: string;
    to_sovereign_id?: string;
  };
}

