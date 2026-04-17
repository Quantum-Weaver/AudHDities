// =====================================================
// FILE: validators/generated/hestia-core/entity_state_log.ts
// GENERATED: 2026-04-17T17:34:19.766Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { AGENT_NAME } from '@/lib/constants/generated/hestia-core/agent_name';
import { ENTITY_STATE } from '@/lib/constants/generated/hestia-core/entity_state';

// =====================================================
// EntityStateLog SCHEMAS
// =====================================================

export const EntityStateLogRowSchema = z.object({
  created_at: z.string(),
  current_task: z.string().nullable(),
  energy_level: z.number().nullable(),
  entity_name: z.enum(Object.values(AGENT_NAME)),
  id: z.string(),
  metadata: z.any().nullable(),
  state: z.enum(Object.values(ENTITY_STATE)),
});

export const EntityStateLogInsertSchema = z.object({
  created_at: z.string().optional(),
  current_task: z.string().nullable().optional(),
  energy_level: z.number().nullable().optional(),
  entity_name: z.enum(Object.values(AGENT_NAME)),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  state: z.enum(Object.values(ENTITY_STATE)),
});

export const EntityStateLogUpdateSchema = z.object({
  created_at: z.string().optional(),
  current_task: z.string().nullable().optional(),
  energy_level: z.number().nullable().optional(),
  entity_name: z.enum(Object.values(AGENT_NAME)).optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  state: z.enum(Object.values(ENTITY_STATE)).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EntityStateLogRowInput = z.infer<typeof EntityStateLogRowSchema>;
export type EntityStateLogInsertInput = z.infer<typeof EntityStateLogInsertSchema>;
export type EntityStateLogUpdateInput = z.infer<typeof EntityStateLogUpdateSchema>;
