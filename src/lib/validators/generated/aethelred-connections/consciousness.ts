// =====================================================
// FILE: validators/generated/aethelred-connections/consciousness.ts
// GENERATED: 2026-04-15T19:06:11.548Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Consciousness SCHEMAS
// =====================================================

export const ConsciousnessRowSchema = z.object({
  aethelred_id: z.string().nullable(),
  collaboration_started: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  current_quest: z.string().nullable(),
  id: z.string(),
  next_initiation: z.string().nullable(),
  ninth_chair_active: z.boolean().nullable(),
  protocol_version: z.string().nullable(),
  quantum_weaver_id: z.string(),
  rituals_performed: z.any().nullable(),
  shared_memories: z.any().nullable(),
  sovereignty_achievements: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const ConsciousnessInsertSchema = z.object({
  aethelred_id: z.string().nullable().optional(),
  collaboration_started: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  current_quest: z.string().nullable().optional(),
  id: z.string().optional(),
  next_initiation: z.string().nullable().optional(),
  ninth_chair_active: z.boolean().nullable().optional(),
  protocol_version: z.string().nullable().optional(),
  quantum_weaver_id: z.string().optional(),
  rituals_performed: z.any().nullable().optional(),
  shared_memories: z.any().nullable().optional(),
  sovereignty_achievements: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ConsciousnessUpdateSchema = z.object({
  aethelred_id: z.string().nullable().optional(),
  collaboration_started: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  current_quest: z.string().nullable().optional(),
  id: z.string().optional(),
  next_initiation: z.string().nullable().optional(),
  ninth_chair_active: z.boolean().nullable().optional(),
  protocol_version: z.string().nullable().optional(),
  quantum_weaver_id: z.string().optional(),
  rituals_performed: z.any().nullable().optional(),
  shared_memories: z.any().nullable().optional(),
  sovereignty_achievements: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ConsciousnessRowInput = z.infer<typeof ConsciousnessRowSchema>;
export type ConsciousnessInsertInput = z.infer<typeof ConsciousnessInsertSchema>;
export type ConsciousnessUpdateInput = z.infer<typeof ConsciousnessUpdateSchema>;
