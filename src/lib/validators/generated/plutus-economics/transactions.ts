// =====================================================
// FILE: validators/transactions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Transactions SCHEMAS
// =====================================================

export const TransactionsRowSchema = z.object({
  amount_cents: z.number(),
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  currency: z.string().nullable(),
  from_id: z.string().nullable(),
  id: z.string(),
  source_id: z.string(),
  status: z.enum(ENUM_VALUES.paymentStatus).nullable(),
  stripe_transfer_id: z.string().nullable(),
  to_id: z.string().nullable(),
  transaction_type: z.enum(ENUM_VALUES.transactionType),
});

export const TransactionsInsertSchema = z.object({
  amount_cents: z.number().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  from_id: z.string().nullable().optional(),
  id: z.string().optional(),
  source_id: z.string().optional(),
  status: z.enum(ENUM_VALUES.paymentStatus).nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
  to_id: z.string().nullable().optional(),
  transaction_type: z.enum(ENUM_VALUES.transactionType).optional(),
});

export const TransactionsUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  from_id: z.string().nullable().optional(),
  id: z.string().optional(),
  source_id: z.string().optional(),
  status: z.enum(ENUM_VALUES.paymentStatus).nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
  to_id: z.string().nullable().optional(),
  transaction_type: z.enum(ENUM_VALUES.transactionType).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TransactionsRowInput = z.infer<typeof TransactionsRowSchema>;
export type TransactionsInsertInput = z.infer<typeof TransactionsInsertSchema>;
export type TransactionsUpdateInput = z.infer<typeof TransactionsUpdateSchema>;
