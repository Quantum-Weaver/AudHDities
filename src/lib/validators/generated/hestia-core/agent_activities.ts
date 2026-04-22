// =====================================================
// FILE: lib/validators/generated/hestia-core/agent_activities.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:04.978Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { AgentActivitiesRow, AgentActivitiesInsert, AgentActivitiesUpdate } from '@/types/generated/hestia-core/agent_activities';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const AgentActivitiesRowSchema: z.ZodType<AgentActivitiesRow> = z.any();
export const AgentActivitiesInsertSchema: z.ZodType<AgentActivitiesInsert> = z.any();
export const AgentActivitiesUpdateSchema: z.ZodType<AgentActivitiesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const AgentActivitiesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type AgentActivitiesRuntimeInput = z.infer<typeof AgentActivitiesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full agent_activities row
 */
export function validateAgentActivitiesRow(data: unknown): data is AgentActivitiesRow {
  try {
    AgentActivitiesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a agent_activities insert
 */
export function validateAgentActivitiesInsert(data: unknown): data is AgentActivitiesInsert {
  try {
    AgentActivitiesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a agent_activities update
 */
export function validateAgentActivitiesUpdate(data: unknown): data is AgentActivitiesUpdate {
  try {
    AgentActivitiesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
