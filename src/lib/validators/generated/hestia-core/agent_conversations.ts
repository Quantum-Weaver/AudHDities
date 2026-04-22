// =====================================================
// FILE: lib/validators/generated/hestia-core/agent_conversations.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.236Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { AgentConversationsRow, AgentConversationsInsert, AgentConversationsUpdate } from '@/types/generated/hestia-core/agent_conversations';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const AgentConversationsRowSchema: z.ZodType<AgentConversationsRow> = z.any();
export const AgentConversationsInsertSchema: z.ZodType<AgentConversationsInsert> = z.any();
export const AgentConversationsUpdateSchema: z.ZodType<AgentConversationsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const AgentConversationsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type AgentConversationsRuntimeInput = z.infer<typeof AgentConversationsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full agent_conversations row
 */
export function validateAgentConversationsRow(data: unknown): data is AgentConversationsRow {
  try {
    AgentConversationsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a agent_conversations insert
 */
export function validateAgentConversationsInsert(data: unknown): data is AgentConversationsInsert {
  try {
    AgentConversationsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a agent_conversations update
 */
export function validateAgentConversationsUpdate(data: unknown): data is AgentConversationsUpdate {
  try {
    AgentConversationsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
