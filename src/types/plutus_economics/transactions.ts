// =====================================================
// FILE: types/plutus_economics/transactions.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T21:55:13.108Z
// SOURCE: database.types.ts lines 5158-5214
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type PaymentStatus = Database['public']['Enums']['payment_status'];
export type TransactionType = Database['public']['Enums']['transaction_type'];

export type TransactionsRow = Database['public']['Tables']['transactions']['Row'];
export type TransactionsInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionsUpdate = Database['public']['Tables']['transactions']['Update'];

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
  currency: string | null;
  from_id: string | null;
  id: string;
  source_id: string;
  status: PaymentStatus | null;
  stripe_transfer_id: string | null;
  to_id: string | null;
  transaction_type: TransactionType;
}

/**
 * Form data for transactions
 * All fields are optional for partial updates
 */
export interface TransactionsFormData {
  amount_cents?: number;
  completed_at?: string | null;
  created_at?: string | null;
  currency?: string | null;
  from_id?: string | null;
  id?: string;
  source_id?: string;
  status?: PaymentStatus | null;
  stripe_transfer_id?: string | null;
  to_id?: string | null;
  transaction_type?: TransactionType;
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
    currency?: string;
    from_id?: string;
    id?: string;
    source_id?: string;
    status?: string;
    stripe_transfer_id?: string;
    to_id?: string;
    transaction_type?: string;
  };
}

