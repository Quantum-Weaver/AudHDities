// =====================================================
// FILE: validators/activity.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Activity SCHEMAS
// =====================================================

export const ActivityRowSchema = z.object({
  action_type: z.any(),
  actor_id: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  target_id: z.string().nullable(),
  target_type: z.any().nullable(),
  user_id: z.string(),
  visibility: z.any().nullable(),
});

export const ActivityInsertSchema = z.object({
  action_type: z.any().optional(),
  actor_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_type: z.any().nullable().optional(),
  user_id: z.string().optional(),
  visibility: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ActivityRowInput = z.infer<typeof ActivityRowSchema>;
export type ActivityInsertInput = z.infer<typeof ActivityInsertSchema>;
