// =====================================================
// FILE: types/generated/plutus-economics/transactions.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-05-01T15:31:59.928Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PaymentStatus = Enums<'payment_status'>;
export type TransactionType = Enums<'transaction_type'>;

export type TransactionsRow = Tables<'transactions'>;
export type TransactionsInsert = TablesInsert<'transactions'>;
export type TransactionsUpdate = TablesUpdate<'transactions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of transactions
 */
export interface PublicTransactions {
  amount_cents: number;
  completed_at: string | null;
  created_at: string | null;
  created_by: string | null;
  currency: string | null;
  from_id: string | null;
  source_id: string;
  status: PaymentStatus | null;
  stripe_transfer_id: string | null;
  to_id: string | null;
  transaction_type: TransactionType;
  transactions_id: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for transactions
 * All fields are optional for partial updates
 */
export interface TransactionsFormData {
  amount_cents?: number;
  completed_at?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  currency?: string | null;
  from_id?: string | null;
  source_id?: string;
  status?: PaymentStatus | null;
  stripe_transfer_id?: string | null;
  to_id?: string | null;
  transaction_type?: TransactionType;
  transactions_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for transactions
 */
export interface TransactionsValidationResult {
  valid: boolean;
  errors: {
    amount_cents?: string;
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    currency?: string;
    from_id?: string;
    source_id?: string;
    status?: string;
    stripe_transfer_id?: string;
    to_id?: string;
    transaction_type?: string;
    transactions_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

