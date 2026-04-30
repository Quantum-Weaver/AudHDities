// =====================================================
// FILE: validators/emeralds.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Emeralds SCHEMAS
// =====================================================

export const EmeraldsRowSchema = z.object({
  amount: z.number(),
  comment_id: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  emeralds_id: z.string(),
  giver_id: z.string(),
  is_residual_eligible: z.boolean().nullable(),
  message: z.string().nullable(),
  post_id: z.string().nullable(),
  receiver_id: z.string(),
  reply_id: z.string().nullable(),
  status: z.enum(ENUM_VALUES.emeraldStatus).nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const EmeraldsInsertSchema = z.object({
  amount: z.number(),
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emeralds_id: z.string().optional(),
  giver_id: z.string(),
  is_residual_eligible: z.boolean().nullable().optional(),
  message: z.string().nullable().optional(),
  post_id: z.string().nullable().optional(),
  receiver_id: z.string(),
  reply_id: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.emeraldStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const EmeraldsUpdateSchema = z.object({
  amount: z.number().optional(),
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emeralds_id: z.string().optional(),
  giver_id: z.string().optional(),
  is_residual_eligible: z.boolean().nullable().optional(),
  message: z.string().nullable().optional(),
  post_id: z.string().nullable().optional(),
  receiver_id: z.string().optional(),
  reply_id: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.emeraldStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EmeraldsRowInput = z.infer<typeof EmeraldsRowSchema>;
export type EmeraldsInsertInput = z.infer<typeof EmeraldsInsertSchema>;
export type EmeraldsUpdateInput = z.infer<typeof EmeraldsUpdateSchema>;
