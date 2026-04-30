// =====================================================
// FILE: validators/quantum_superposition.ts
// GENERATED FROM: database.types.ts
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
  quantum_superposition_id: z.string(),
  superposition_id: z.string(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const QuantumSuperpositionInsertSchema = z.object({
  chosen_meaning: z.string(),
  collapse_reason: z.string().nullable().optional(),
  confidence: z.number(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  quantum_superposition_id: z.string().optional(),
  superposition_id: z.string(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string(),
});

export const QuantumSuperpositionUpdateSchema = z.object({
  chosen_meaning: z.string().optional(),
  collapse_reason: z.string().nullable().optional(),
  confidence: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  quantum_superposition_id: z.string().optional(),
  superposition_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type QuantumSuperpositionRowInput = z.infer<typeof QuantumSuperpositionRowSchema>;
export type QuantumSuperpositionInsertInput = z.infer<typeof QuantumSuperpositionInsertSchema>;
export type QuantumSuperpositionUpdateInput = z.infer<typeof QuantumSuperpositionUpdateSchema>;
