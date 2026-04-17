// =====================================================
// FILE: validators/generated/hestia-core/agent_conversations.ts
// GENERATED: 2026-04-17T09:51:12.557Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { CONVERSATION_STATUS } from '@/lib/constants/generated/hestia-core/conversation_status';

// =====================================================
// AgentConversations SCHEMAS
// =====================================================

export const AgentConversationsRowSchema = z.object({
  context_id: z.string().nullable(),
  context_type: z.string().nullable(),
  created_at: z.string(),
  id: z.string(),
  last_message_at: z.string().nullable(),
  message_count: z.number().nullable(),
  metadata: z.any().nullable(),
  participants: z.any(),
  resolved_at: z.string().nullable(),
  started_at: z.string(),
  status: z.enum(Object.values(CONVERSATION_STATUS)),
  summary: z.string().nullable(),
  title: z.string().nullable(),
  updated_at: z.string(),
  user_id: z.string().nullable(),
});

export const AgentConversationsInsertSchema = z.object({
  context_id: z.string().nullable().optional(),
  context_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  last_message_at: z.string().nullable().optional(),
  message_count: z.number().nullable().optional(),
  metadata: z.any().nullable().optional(),
  participants: z.any(),
  resolved_at: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.enum(Object.values(CONVERSATION_STATUS)).optional(),
  summary: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().nullable().optional(),
});

export const AgentConversationsUpdateSchema = z.object({
  context_id: z.string().nullable().optional(),
  context_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  last_message_at: z.string().nullable().optional(),
  message_count: z.number().nullable().optional(),
  metadata: z.any().nullable().optional(),
  participants: z.any().optional(),
  resolved_at: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.enum(Object.values(CONVERSATION_STATUS)).optional(),
  summary: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AgentConversationsRowInput = z.infer<typeof AgentConversationsRowSchema>;
export type AgentConversationsInsertInput = z.infer<typeof AgentConversationsInsertSchema>;
export type AgentConversationsUpdateInput = z.infer<typeof AgentConversationsUpdateSchema>;
