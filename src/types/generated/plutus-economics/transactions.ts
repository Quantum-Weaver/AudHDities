// =====================================================
// FILE: types/generated/plutus-economics/transactions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.867Z
// SOURCE: database.types.ts lines 6272-6338
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type TransactionType = Database['public']['Enums']['transaction_type'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "completed_at": "string | null";
  "created_at": "string | null";
  created_by: string | null;
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
  created_by?: string | null;
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
    created_by?: string;
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

