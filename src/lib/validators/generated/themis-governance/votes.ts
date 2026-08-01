// =====================================================
// FILE: validators/votes.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Votes SCHEMAS
// =====================================================

export const VotesRowSchema = z.object({
  cast_at: z.string(),
  choice: z.string(),
  id: z.string(),
  proposal_id: z.string(),
  updated_at: z.string(),
  voter_id: z.string(),
});

export const VotesInsertSchema = z.object({
  cast_at: z.string().optional(),
  choice: z.string(),
  id: z.string().optional(),
  proposal_id: z.string(),
  updated_at: z.string().optional(),
  voter_id: z.string(),
});

export const VotesUpdateSchema = z.object({
  cast_at: z.string().optional(),
  choice: z.string().optional(),
  id: z.string().optional(),
  proposal_id: z.string().optional(),
  updated_at: z.string().optional(),
  voter_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VotesRowInput = z.infer<typeof VotesRowSchema>;
export type VotesInsertInput = z.infer<typeof VotesInsertSchema>;
export type VotesUpdateInput = z.infer<typeof VotesUpdateSchema>;
