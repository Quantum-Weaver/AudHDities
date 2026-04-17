// =====================================================
// FILE: validators/generated/hestia-core/agent_messages.ts
// GENERATED: 2026-04-17T20:52:30.897Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { AGENT_NAME } from '@/lib/constants/generated/hestia-core/agent_name';
import { MESSAGE_DIRECTION } from '@/lib/constants/generated/hestia-core/message_direction';

// =====================================================
// AgentMessages SCHEMAS
// =====================================================

export const AgentMessagesRowSchema = z.object({
  conversation_id: z.string(),
  created_at: z.string(),
  direction: z.enum(Object.values(MESSAGE_DIRECTION)),
  from_agent: z.enum(Object.values(AGENT_NAME)),
  id: z.string(),
  is_processed: z.boolean().nullable(),
  message: z.string(),
  message_type: z.string().nullable(),
  metadata: z.any().nullable(),
  processed_at: z.string().nullable(),
  to_agent: z.enum(Object.values(AGENT_NAME)).nullable(),
});

export const AgentMessagesInsertSchema = z.object({
  conversation_id: z.string(),
  created_at: z.string().optional(),
  direction: z.enum(Object.values(MESSAGE_DIRECTION)).optional(),
  from_agent: z.enum(Object.values(AGENT_NAME)),
  id: z.string().optional(),
  is_processed: z.boolean().nullable().optional(),
  message: z.string(),
  message_type: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  to_agent: z.enum(Object.values(AGENT_NAME)).nullable().optional(),
});

export const AgentMessagesUpdateSchema = z.object({
  conversation_id: z.string().optional(),
  created_at: z.string().optional(),
  direction: z.enum(Object.values(MESSAGE_DIRECTION)).optional(),
  from_agent: z.enum(Object.values(AGENT_NAME)).optional(),
  id: z.string().optional(),
  is_processed: z.boolean().nullable().optional(),
  message: z.string().optional(),
  message_type: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  to_agent: z.enum(Object.values(AGENT_NAME)).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AgentMessagesRowInput = z.infer<typeof AgentMessagesRowSchema>;
export type AgentMessagesInsertInput = z.infer<typeof AgentMessagesInsertSchema>;
export type AgentMessagesUpdateInput = z.infer<typeof AgentMessagesUpdateSchema>;
