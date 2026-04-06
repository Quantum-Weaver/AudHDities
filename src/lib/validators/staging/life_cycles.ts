// =====================================================
// FILE: validators/life_cycles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// LifeCycles SCHEMAS
// =====================================================

export const LifeCyclesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  ended_at: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  phase: z.any(),
  started_at: z.string(),
  trigger_event: z.string().nullable(),
  user_id: z.string(),
});

export const LifeCyclesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  ended_at: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  phase: z.any().optional(),
  started_at: z.string().optional(),
  trigger_event: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LifeCyclesRowInput = z.infer<typeof LifeCyclesRowSchema>;
export type LifeCyclesInsertInput = z.infer<typeof LifeCyclesInsertSchema>;
