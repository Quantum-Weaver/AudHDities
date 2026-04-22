// =====================================================
// FILE: types/generated/plutus-economics/transactions.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.920Z
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

export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type TransactionType = Database['public']['Enums']['transaction_type'];
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

