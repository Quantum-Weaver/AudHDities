// =====================================================
// FILE: validators/agent_activities.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AgentActivities SCHEMAS
// =====================================================

export const AgentActivitiesRowSchema = z.object({
  action: z.enum(ENUM_VALUES.agentActionType),
  agent_name: z.enum(ENUM_VALUES.agentName),
  completed_at: z.string().nullable(),
  conversation_id: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  duration_ms: z.number().nullable(),
  error_message: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  parent_activity_id: z.string().nullable(),
  retry_count: z.number().nullable(),
  started_at: z.string().nullable(),
  status: z.enum(ENUM_VALUES.agentActivityStatus),
  title: z.string(),
  updated_at: z.string(),
  user_id: z.string().nullable(),
});

export const AgentActivitiesInsertSchema = z.object({
  action: z.enum(ENUM_VALUES.agentActionType),
  agent_name: z.enum(ENUM_VALUES.agentName),
  completed_at: z.string().nullable().optional(),
  conversation_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  duration_ms: z.number().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  parent_activity_id: z.string().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.agentActivityStatus).optional(),
  title: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string().nullable().optional(),
});

export const AgentActivitiesUpdateSchema = z.object({
  action: z.enum(ENUM_VALUES.agentActionType).optional(),
  agent_name: z.enum(ENUM_VALUES.agentName).optional(),
  completed_at: z.string().nullable().optional(),
  conversation_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  duration_ms: z.number().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  parent_activity_id: z.string().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.agentActivityStatus).optional(),
  title: z.string().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AgentActivitiesRowInput = z.infer<typeof AgentActivitiesRowSchema>;
export type AgentActivitiesInsertInput = z.infer<typeof AgentActivitiesInsertSchema>;
export type AgentActivitiesUpdateInput = z.infer<typeof AgentActivitiesUpdateSchema>;
