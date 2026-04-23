// =====================================================
// FILE: validators/entity_state_log.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// EntityStateLog SCHEMAS
// =====================================================

export const EntityStateLogRowSchema = z.object({
  created_at: z.string(),
  current_task: z.string().nullable(),
  energy_level: z.number().nullable(),
  entity_name: z.enum(ENUM_VALUES.agentName),
  id: z.string(),
  metadata: z.any().nullable(),
  state: z.enum(ENUM_VALUES.entityState),
});

export const EntityStateLogInsertSchema = z.object({
  created_at: z.string().optional(),
  current_task: z.string().nullable().optional(),
  energy_level: z.number().nullable().optional(),
  entity_name: z.enum(ENUM_VALUES.agentName).optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  state: z.enum(ENUM_VALUES.entityState).optional(),
});

export const EntityStateLogUpdateSchema = z.object({
  created_at: z.string().optional(),
  current_task: z.string().nullable().optional(),
  energy_level: z.number().nullable().optional(),
  entity_name: z.enum(ENUM_VALUES.agentName).optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  state: z.enum(ENUM_VALUES.entityState).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EntityStateLogRowInput = z.infer<typeof EntityStateLogRowSchema>;
export type EntityStateLogInsertInput = z.infer<typeof EntityStateLogInsertSchema>;
export type EntityStateLogUpdateInput = z.infer<typeof EntityStateLogUpdateSchema>;
