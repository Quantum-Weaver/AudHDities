// =====================================================
// FILE: validators/agent_conversations.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AgentConversations SCHEMAS
// =====================================================

export const AgentConversationsRowSchema = z.object({
  agent_conversations_id: z.string(),
  context_id: z.string().nullable(),
  context_type: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  last_message_at: z.string().nullable(),
  message_count: z.number().nullable(),
  metadata: z.any().nullable(),
  participants: z.any(),
  resolved_at: z.string().nullable(),
  started_at: z.string(),
  status: z.enum(ENUM_VALUES.conversationStatus),
  summary: z.string().nullable(),
  title: z.string().nullable(),
  updated_at: z.string(),
  user_id: z.string().nullable(),
});

export const AgentConversationsInsertSchema = z.object({
  agent_conversations_id: z.string().optional(),
  context_id: z.string().nullable().optional(),
  context_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  last_message_at: z.string().nullable().optional(),
  message_count: z.number().nullable().optional(),
  metadata: z.any().nullable().optional(),
  participants: z.any(),
  resolved_at: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.enum(ENUM_VALUES.conversationStatus).optional(),
  summary: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().nullable().optional(),
});

export const AgentConversationsUpdateSchema = z.object({
  agent_conversations_id: z.string().optional(),
  context_id: z.string().nullable().optional(),
  context_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  last_message_at: z.string().nullable().optional(),
  message_count: z.number().nullable().optional(),
  metadata: z.any().nullable().optional(),
  participants: z.any().optional(),
  resolved_at: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.enum(ENUM_VALUES.conversationStatus).optional(),
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
