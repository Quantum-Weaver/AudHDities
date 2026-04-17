// =====================================================
// FILE: validators/generated/athena-gamification/life_cycles.ts
// GENERATED: 2026-04-17T01:35:45.262Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { LIFE_CYCLE_PHASE } from '@/lib/constants/generated/athena-gamification/life_cycle_phase';

// =====================================================
// LifeCycles SCHEMAS
// =====================================================

export const LifeCyclesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  ended_at: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  phase: z.enum(Object.values(LIFE_CYCLE_PHASE)),
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
  phase: z.enum(Object.values(LIFE_CYCLE_PHASE)),
  started_at: z.string(),
  trigger_event: z.string().nullable().optional(),
  user_id: z.string(),
});

export const LifeCyclesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  ended_at: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  phase: z.enum(Object.values(LIFE_CYCLE_PHASE)).optional(),
  started_at: z.string().optional(),
  trigger_event: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LifeCyclesRowInput = z.infer<typeof LifeCyclesRowSchema>;
export type LifeCyclesInsertInput = z.infer<typeof LifeCyclesInsertSchema>;
export type LifeCyclesUpdateInput = z.infer<typeof LifeCyclesUpdateSchema>;
