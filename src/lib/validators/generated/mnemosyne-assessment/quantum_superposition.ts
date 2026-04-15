// =====================================================
// FILE: validators/generated/mnemosyne-assessment/quantum_superposition.ts
// GENERATED: 2026-04-15T01:18:39.414Z
// SOURCE: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// QuantumSuperposition SCHEMAS
// =====================================================

export const QuantumSuperpositionRowSchema = z.object({
  chosen_meaning: z.string(),
  collapse_reason: z.string().nullable(),
  confidence: z.number(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  superposition_id: z.string(),
  user_id: z.string(),
});

export const QuantumSuperpositionInsertSchema = z.object({
  chosen_meaning: z.string().optional(),
  collapse_reason: z.string().nullable().optional(),
  confidence: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  superposition_id: z.string().optional(),
  user_id: z.string().optional(),
});

export const QuantumSuperpositionUpdateSchema = z.object({
  chosen_meaning: z.string().optional(),
  collapse_reason: z.string().nullable().optional(),
  confidence: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  superposition_id: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type QuantumSuperpositionRowInput = z.infer<typeof QuantumSuperpositionRowSchema>;
export type QuantumSuperpositionInsertInput = z.infer<typeof QuantumSuperpositionInsertSchema>;
export type QuantumSuperpositionUpdateInput = z.infer<typeof QuantumSuperpositionUpdateSchema>;
