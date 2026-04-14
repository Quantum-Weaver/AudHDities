// =====================================================
// FILE: validators/generated/hestia-core/user_financial.ts
// GENERATED: 2026-04-14T22:37:52.736Z
// SOURCE: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// UserFinancial SCHEMAS
// =====================================================

export const UserFinancialRowSchema = z.object({
  bank_account_last4: z.string().nullable();
  bank_account_type: z.string().nullable();
  bank_routing_last4: z.string().nullable();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  crypto_addresses: z.any().nullable();
  id: z.string();
  minimum_payout: z.number().nullable();
  paypal_email: z.string().nullable();
  residual_pledge_percent: z.number().nullable();
  stripe_account_id: z.string().nullable();
  "updated_at": "z.string().nullable()";
}),

export const UserFinancialInsertSchema = z.object({
  bank_account_last4: z.string().nullable().optional();
  bank_account_type: z.string().nullable().optional();
  bank_routing_last4: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  crypto_addresses: z.any().nullable().optional();
  id: z.string().optional();
  minimum_payout: z.number().nullable().optional();
  paypal_email: z.string().nullable().optional();
  residual_pledge_percent: z.number().nullable().optional();
  stripe_account_id: z.string().nullable().optional();
  "updated_at": "z.string().nullable().optional()";
});

export const UserFinancialUpdateSchema = z.object({
  bank_account_last4: z.string().nullable().optional();
  bank_account_type: z.string().nullable().optional();
  bank_routing_last4: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  crypto_addresses: z.any().nullable().optional();
  id: z.string().optional();
  minimum_payout: z.number().nullable().optional();
  paypal_email: z.string().nullable().optional();
  residual_pledge_percent: z.number().nullable().optional();
  stripe_account_id: z.string().nullable().optional();
  "updated_at": "z.string().nullable().optional()";
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserFinancialRowInput = z.infer<typeof UserFinancialRowSchema>;
export type UserFinancialInsertInput = z.infer<typeof UserFinancialInsertSchema>;
export type UserFinancialUpdateInput = z.infer<typeof UserFinancialUpdateSchema>;
