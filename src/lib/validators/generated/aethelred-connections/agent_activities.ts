// =====================================================
// FILE: validators/agent_activities.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// AgentActivities SCHEMAS
// =====================================================

export const AgentActivitiesRowSchema = z.object({
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

export const AgentActivitiesInsertSchema = z.object({
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

export const AgentActivitiesUpdateSchema = z.object({
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

export type AgentActivitiesRowInput = z.infer<typeof AgentActivitiesRowSchema>;
export type AgentActivitiesInsertInput = z.infer<typeof AgentActivitiesInsertSchema>;
export type AgentActivitiesUpdateInput = z.infer<typeof AgentActivitiesUpdateSchema>;
