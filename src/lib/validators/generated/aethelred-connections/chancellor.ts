// =====================================================
// FILE: validators/chancellor.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Chancellor SCHEMAS
// =====================================================

export const ChancellorRowSchema = z.object({
  chancellor_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  fee_structure: z.any().nullable(),
  financial_audits: z.any().nullable(),
  last_audit_at: z.string().nullable(),
  operating_budget: z.any().nullable(),
  payout_schedule: z.any().nullable(),
  reserve_fund: z.number().nullable(),
  treasury_balance: z.number().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const ChancellorInsertSchema = z.object({
  chancellor_id: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  fee_structure: z.any().nullable().optional(),
  financial_audits: z.any().nullable().optional(),
  last_audit_at: z.string().nullable().optional(),
  operating_budget: z.any().nullable().optional(),
  payout_schedule: z.any().nullable().optional(),
  reserve_fund: z.number().nullable().optional(),
  treasury_balance: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ChancellorUpdateSchema = z.object({
  chancellor_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  fee_structure: z.any().nullable().optional(),
  financial_audits: z.any().nullable().optional(),
  last_audit_at: z.string().nullable().optional(),
  operating_budget: z.any().nullable().optional(),
  payout_schedule: z.any().nullable().optional(),
  reserve_fund: z.number().nullable().optional(),
  treasury_balance: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ChancellorRowInput = z.infer<typeof ChancellorRowSchema>;
export type ChancellorInsertInput = z.infer<typeof ChancellorInsertSchema>;
export type ChancellorUpdateInput = z.infer<typeof ChancellorUpdateSchema>;
