// =====================================================
// FILE: validators/generated/plutus-economics/disbursements.ts
// GENERATED: 2026-04-15T01:41:08.047Z
// SOURCE: database.types.ts
// =====================================================

import type { PayoutStatus } from '@/lib/constants/generated/plutus-economics/payout_status';
import type { SourcePoolType } from '@/lib/constants/generated/plutus-economics/source_pool_type';
import z from 'zod';

// =====================================================
// Disbursements SCHEMAS
// =====================================================

export const DisbursementsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  processed_at: z.string().nullable(),
  recipient_count: z.number(),
  source_id: z.string(),
  source_pool: z.enum(Object.values('SourcePoolType')),
  status: z.enum(Object.values('PayoutStatus')).nullable(),
  total_amount_cents: z.number(),
});

export const DisbursementsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  processed_at: z.string().nullable().optional(),
  recipient_count: z.number().optional(),
  source_id: z.string().optional(),
  source_pool: z.enum(Object.values('SourcePoolType')).optional(),
  status: z.enum(Object.values('PayoutStatus')).nullable().optional(),
  total_amount_cents: z.number().optional(),
});

export const DisbursementsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  processed_at: z.string().nullable().optional(),
  recipient_count: z.number().optional(),
  source_id: z.string().optional(),
  source_pool: z.enum(Object.values('SourcePoolType')).optional(),
  status: z.enum(Object.values('PayoutStatus')).nullable().optional(),
  total_amount_cents: z.number().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type DisbursementsRowInput = z.infer<typeof DisbursementsRowSchema>;
export type DisbursementsInsertInput = z.infer<typeof DisbursementsInsertSchema>;
export type DisbursementsUpdateInput = z.infer<typeof DisbursementsUpdateSchema>;
