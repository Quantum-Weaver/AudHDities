// =====================================================
// FILE: validators/generated/plutus-economics/transactions.ts
// GENERATED: 2026-04-14T22:37:52.734Z
// SOURCE: database.types.ts
// =====================================================

import type { PaymentStatus } from '@/lib/constants/generated/plutus-economics/payment_status';
import type { TransactionType } from '@/lib/constants/generated/plutus-economics/transaction_type';
import z from 'zod';

// =====================================================
// Transactions SCHEMAS
// =====================================================

export const TransactionsRowSchema = z.object({
  amount_cents: z.number();
  "completed_at": "z.string().nullable()";
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  currency: z.string().nullable();
  from_id: z.string().nullable();
  id: z.string();
  source_id: z.string();
  status: z.enum(Object.values(PaymentStatus)).nullable();
  stripe_transfer_id: z.string().nullable();
  to_id: z.string().nullable();
  transaction_type: z.enum(Object.values(TransactionType));
}),

export const TransactionsInsertSchema = z.object({
  amount_cents: z.number().optional();
  "completed_at": "z.string().nullable().optional()";
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  currency: z.string().nullable().optional();
  from_id: z.string().nullable().optional();
  id: z.string().optional();
  source_id: z.string().optional();
  status: z.enum(Object.values(PaymentStatus)).nullable().optional();
  stripe_transfer_id: z.string().nullable().optional();
  to_id: z.string().nullable().optional();
  transaction_type: z.enum(Object.values(TransactionType)).optional();
});

export const TransactionsUpdateSchema = z.object({
  amount_cents: z.number().optional();
  "completed_at": "z.string().nullable().optional()";
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  currency: z.string().nullable().optional();
  from_id: z.string().nullable().optional();
  id: z.string().optional();
  source_id: z.string().optional();
  status: z.enum(Object.values(PaymentStatus)).nullable().optional();
  stripe_transfer_id: z.string().nullable().optional();
  to_id: z.string().nullable().optional();
  transaction_type: z.enum(Object.values(TransactionType)).optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TransactionsRowInput = z.infer<typeof TransactionsRowSchema>;
export type TransactionsInsertInput = z.infer<typeof TransactionsInsertSchema>;
export type TransactionsUpdateInput = z.infer<typeof TransactionsUpdateSchema>;
