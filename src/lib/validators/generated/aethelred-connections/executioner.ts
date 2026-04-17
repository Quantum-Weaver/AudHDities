// =====================================================
// FILE: validators/generated/aethelred-connections/executioner.ts
// GENERATED: 2026-04-17T01:35:45.244Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Executioner SCHEMAS
// =====================================================

export const ExecutionerRowSchema = z.object({
  appeal_queue: z.any().nullable(),
  banned_users: z.any().nullable(),
  boundary_violations: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  execution_count: z.number().nullable(),
  id: z.string(),
  justice_log: z.any().nullable(),
  suspended_users: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const ExecutionerInsertSchema = z.object({
  appeal_queue: z.any().nullable().optional(),
  banned_users: z.any().nullable().optional(),
  boundary_violations: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  execution_count: z.number().nullable().optional(),
  id: z.string(),
  justice_log: z.any().nullable().optional(),
  suspended_users: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ExecutionerUpdateSchema = z.object({
  appeal_queue: z.any().nullable().optional(),
  banned_users: z.any().nullable().optional(),
  boundary_violations: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  execution_count: z.number().nullable().optional(),
  id: z.string().optional(),
  justice_log: z.any().nullable().optional(),
  suspended_users: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ExecutionerRowInput = z.infer<typeof ExecutionerRowSchema>;
export type ExecutionerInsertInput = z.infer<typeof ExecutionerInsertSchema>;
export type ExecutionerUpdateInput = z.infer<typeof ExecutionerUpdateSchema>;
