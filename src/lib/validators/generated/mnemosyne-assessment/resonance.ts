// =====================================================
// FILE: validators/resonance.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Resonance SCHEMAS
// =====================================================

export const ResonanceRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  notes: z.string().nullable(),
  resonance_type: z.string(),
  signal_id: z.string().nullable(),
  updated_at: z.string(),
  user_id: z.string(),
  work_id: z.string().nullable(),
});

export const ResonanceInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  resonance_type: z.string().optional(),
  signal_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string(),
  work_id: z.string().nullable().optional(),
});

export const ResonanceUpdateSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  resonance_type: z.string().optional(),
  signal_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
  work_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResonanceRowInput = z.infer<typeof ResonanceRowSchema>;
export type ResonanceInsertInput = z.infer<typeof ResonanceInsertSchema>;
export type ResonanceUpdateInput = z.infer<typeof ResonanceUpdateSchema>;
