// =====================================================
// FILE: validators/generated/plutus-economics/contributions.ts
// GENERATED: 2026-04-15T19:30:35.491Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { CONTRIBUTION_TYPE } from '@/lib/constants/generated/plutus-economics/contribution_type';

// =====================================================
// Contributions SCHEMAS
// =====================================================

export const ContributionsRowSchema = z.object({
  contribution_type: z.enum(Object.values(CONTRIBUTION_TYPE)),
  contributor_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_one_time: z.boolean().nullable(),
  is_residual_eligible: z.boolean().nullable(),
  percent_share: z.number(),
  product_id: z.string(),
  updated_at: z.string().nullable(),
});

export const ContributionsInsertSchema = z.object({
  contribution_type: z.enum(Object.values(CONTRIBUTION_TYPE)).optional(),
  contributor_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_one_time: z.boolean().nullable().optional(),
  is_residual_eligible: z.boolean().nullable().optional(),
  percent_share: z.number().optional(),
  product_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ContributionsUpdateSchema = z.object({
  contribution_type: z.enum(Object.values(CONTRIBUTION_TYPE)).optional(),
  contributor_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_one_time: z.boolean().nullable().optional(),
  is_residual_eligible: z.boolean().nullable().optional(),
  percent_share: z.number().optional(),
  product_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ContributionsRowInput = z.infer<typeof ContributionsRowSchema>;
export type ContributionsInsertInput = z.infer<typeof ContributionsInsertSchema>;
export type ContributionsUpdateInput = z.infer<typeof ContributionsUpdateSchema>;
