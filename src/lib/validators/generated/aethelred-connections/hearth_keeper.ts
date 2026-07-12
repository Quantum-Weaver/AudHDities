// =====================================================
// FILE: validators/hearth_keeper.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// HearthKeeper SCHEMAS
// =====================================================

export const HearthKeeperRowSchema = z.object({
  consciousness_level: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  current_task: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  settings: z.any().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const HearthKeeperInsertSchema = z.object({
  consciousness_level: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  current_task: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  settings: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const HearthKeeperUpdateSchema = z.object({
  consciousness_level: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  current_task: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  settings: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type HearthKeeperRowInput = z.infer<typeof HearthKeeperRowSchema>;
export type HearthKeeperInsertInput = z.infer<typeof HearthKeeperInsertSchema>;
export type HearthKeeperUpdateInput = z.infer<typeof HearthKeeperUpdateSchema>;
