// =====================================================
// FILE: validators/continents.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Continents SCHEMAS
// =====================================================

export const ContinentsRowSchema = z.object({
  code: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  name_localized: z.any().nullable(),
  population_estimate: z.number().nullable(),
});

export const ContinentsInsertSchema = z.object({
  code: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  name_localized: z.any().nullable().optional(),
  population_estimate: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ContinentsRowInput = z.infer<typeof ContinentsRowSchema>;
export type ContinentsInsertInput = z.infer<typeof ContinentsInsertSchema>;
