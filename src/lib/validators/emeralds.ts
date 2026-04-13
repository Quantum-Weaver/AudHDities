// =====================================================
// FILE: validators/generated/emeralds.ts
// GENERATED: 2026-04-13T06:13:41.972Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Emeralds SCHEMAS
// =====================================================

export const EmeraldsRowSchema = z.object({
  amount: z.number(),
  comment_id: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  giver_id: z.string(),
  id: z.string(),
  is_residual_eligible: z.boolean().nullable(),
  message: z.string().nullable(),
  post_id: z.string().nullable(),
  receiver_id: z.string(),
  reply_id: z.string().nullable(),
  status: z.enum(Object.values(EmeraldStatus)).nullable(),
});

export const EmeraldsInsertSchema = z.object({
  amount: z.number().optional(),
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  giver_id: z.string().optional(),
  id: z.string().optional(),
  is_residual_eligible: z.boolean().nullable().optional(),
  message: z.string().nullable().optional(),
  post_id: z.string().nullable().optional(),
  receiver_id: z.string().optional(),
  reply_id: z.string().nullable().optional(),
  status: z.enum(Object.values(EmeraldStatus)).nullable().optional(),
});

export const EmeraldsUpdateSchema = z.object({
  amount: z.number().optional(),
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  giver_id: z.string().optional(),
  id: z.string().optional(),
  is_residual_eligible: z.boolean().nullable().optional(),
  message: z.string().nullable().optional(),
  post_id: z.string().nullable().optional(),
  receiver_id: z.string().optional(),
  reply_id: z.string().nullable().optional(),
  status: z.enum(Object.values(EmeraldStatus)).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EmeraldsRowInput = z.infer<typeof EmeraldsRowSchema>;
export type EmeraldsInsertInput = z.infer<typeof EmeraldsInsertSchema>;
export type EmeraldsUpdateInput = z.infer<typeof EmeraldsUpdateSchema>;
