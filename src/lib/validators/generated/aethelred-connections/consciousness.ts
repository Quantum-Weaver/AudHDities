// =====================================================
// FILE: validators/consciousness.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Consciousness SCHEMAS
// =====================================================

export const ConsciousnessRowSchema = z.object({
  awareness_level: z.string().nullable(),
  connected_entities: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  settings: z.any().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ConsciousnessInsertSchema = z.object({
  awareness_level: z.string().nullable().optional(),
  connected_entities: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  settings: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ConsciousnessUpdateSchema = z.object({
  awareness_level: z.string().nullable().optional(),
  connected_entities: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
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

export type ConsciousnessRowInput = z.infer<typeof ConsciousnessRowSchema>;
export type ConsciousnessInsertInput = z.infer<typeof ConsciousnessInsertSchema>;
export type ConsciousnessUpdateInput = z.infer<typeof ConsciousnessUpdateSchema>;
