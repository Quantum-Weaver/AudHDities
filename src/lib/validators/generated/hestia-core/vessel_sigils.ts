// =====================================================
// FILE: validators/vessel_sigils.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// VesselSigils SCHEMAS
// =====================================================

export const VesselSigilsRowSchema = z.object({
  award_context: z.any().nullable(),
  awarded_at: z.string(),
  awarded_by: z.string().nullable(),
  created_at: z.string(),
  id: z.string(),
  is_displayed: z.boolean(),
  sigil_id: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
});

export const VesselSigilsInsertSchema = z.object({
  award_context: z.any().nullable().optional(),
  awarded_at: z.string().optional(),
  awarded_by: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_displayed: z.boolean().optional(),
  sigil_id: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string(),
});

export const VesselSigilsUpdateSchema = z.object({
  award_context: z.any().nullable().optional(),
  awarded_at: z.string().optional(),
  awarded_by: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_displayed: z.boolean().optional(),
  sigil_id: z.string().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VesselSigilsRowInput = z.infer<typeof VesselSigilsRowSchema>;
export type VesselSigilsInsertInput = z.infer<typeof VesselSigilsInsertSchema>;
export type VesselSigilsUpdateInput = z.infer<typeof VesselSigilsUpdateSchema>;
