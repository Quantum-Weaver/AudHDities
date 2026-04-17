// =====================================================
// FILE: validators/generated/hestia-core/agent_activities.ts
// GENERATED: 2026-04-17T09:51:12.555Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { AGENT_ACTION_TYPE } from '@/lib/constants/generated/hestia-core/agent_action_type';
import { AGENT_ACTIVITY_STATUS } from '@/lib/constants/generated/hestia-core/agent_activity_status';
import { AGENT_NAME } from '@/lib/constants/generated/hestia-core/agent_name';

// =====================================================
// AgentActivities SCHEMAS
// =====================================================

export const AgentActivitiesRowSchema = z.object({
  action: z.enum(Object.values(AGENT_ACTION_TYPE)),
  agent_name: z.enum(Object.values(AGENT_NAME)),
  completed_at: z.string().nullable(),
  conversation_id: z.string().nullable(),
  created_at: z.string(),
  description: z.string().nullable(),
  duration_ms: z.number().nullable(),
  error_message: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  parent_activity_id: z.string().nullable(),
  retry_count: z.number().nullable(),
  started_at: z.string().nullable(),
  status: z.enum(Object.values(AGENT_ACTIVITY_STATUS)),
  title: z.string(),
  updated_at: z.string(),
  user_id: z.string().nullable(),
});

export const AgentActivitiesInsertSchema = z.object({
  action: z.enum(Object.values(AGENT_ACTION_TYPE)),
  agent_name: z.enum(Object.values(AGENT_NAME)),
  completed_at: z.string().nullable().optional(),
  conversation_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  duration_ms: z.number().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  parent_activity_id: z.string().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(Object.values(AGENT_ACTIVITY_STATUS)).optional(),
  title: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string().nullable().optional(),
});

export const AgentActivitiesUpdateSchema = z.object({
  action: z.enum(Object.values(AGENT_ACTION_TYPE)).optional(),
  agent_name: z.enum(Object.values(AGENT_NAME)).optional(),
  completed_at: z.string().nullable().optional(),
  conversation_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  duration_ms: z.number().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  parent_activity_id: z.string().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(Object.values(AGENT_ACTIVITY_STATUS)).optional(),
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
