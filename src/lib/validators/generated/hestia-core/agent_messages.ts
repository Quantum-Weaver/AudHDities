// =====================================================
// FILE: lib/validators/generated/hestia-core/agent_messages.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.250Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { AgentMessagesRow, AgentMessagesInsert, AgentMessagesUpdate } from '@/types/generated/hestia-core/agent_messages';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const AgentMessagesRowSchema: z.ZodType<AgentMessagesRow> = z.any();
export const AgentMessagesInsertSchema: z.ZodType<AgentMessagesInsert> = z.any();
export const AgentMessagesUpdateSchema: z.ZodType<AgentMessagesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const AgentMessagesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type AgentMessagesRuntimeInput = z.infer<typeof AgentMessagesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full agent_messages row
 */
export function validateAgentMessagesRow(data: unknown): data is AgentMessagesRow {
  try {
    AgentMessagesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a agent_messages insert
 */
export function validateAgentMessagesInsert(data: unknown): data is AgentMessagesInsert {
  try {
    AgentMessagesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a agent_messages update
 */
export function validateAgentMessagesUpdate(data: unknown): data is AgentMessagesUpdate {
  try {
    AgentMessagesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
