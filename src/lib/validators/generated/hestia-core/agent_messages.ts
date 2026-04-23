// =====================================================
// FILE: validators/agent_messages.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AgentMessages SCHEMAS
// =====================================================

export const AgentMessagesRowSchema = z.object({
  conversation_id: z.string(),
  created_at: z.string(),
  direction: z.enum(ENUM_VALUES.messageDirection),
  from_agent: z.enum(ENUM_VALUES.agentName),
  id: z.string(),
  is_processed: z.boolean().nullable(),
  message: z.string(),
  message_type: z.string().nullable(),
  metadata: z.any().nullable(),
  processed_at: z.string().nullable(),
  to_agent: z.enum(ENUM_VALUES.agentName).nullable(),
});

export const AgentMessagesInsertSchema = z.object({
  conversation_id: z.string().optional(),
  created_at: z.string().optional(),
  direction: z.enum(ENUM_VALUES.messageDirection).optional(),
  from_agent: z.enum(ENUM_VALUES.agentName).optional(),
  id: z.string().optional(),
  is_processed: z.boolean().nullable().optional(),
  message: z.string().optional(),
  message_type: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  to_agent: z.enum(ENUM_VALUES.agentName).nullable().optional(),
});

export const AgentMessagesUpdateSchema = z.object({
  conversation_id: z.string().optional(),
  created_at: z.string().optional(),
  direction: z.enum(ENUM_VALUES.messageDirection).optional(),
  from_agent: z.enum(ENUM_VALUES.agentName).optional(),
  id: z.string().optional(),
  is_processed: z.boolean().nullable().optional(),
  message: z.string().optional(),
  message_type: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  to_agent: z.enum(ENUM_VALUES.agentName).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AgentMessagesRowInput = z.infer<typeof AgentMessagesRowSchema>;
export type AgentMessagesInsertInput = z.infer<typeof AgentMessagesInsertSchema>;
export type AgentMessagesUpdateInput = z.infer<typeof AgentMessagesUpdateSchema>;
