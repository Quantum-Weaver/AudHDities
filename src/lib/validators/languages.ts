// =====================================================
// FILE: validators/languages.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Languages SCHEMAS
// =====================================================

export const LanguagesRowSchema = z.object({
  code: z.string(),
  code_3: z.string().nullable(),
  created_at: z.string().nullable(),
  direction: z.any().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  is_default: z.boolean().nullable(),
  name: z.string(),
  native_name: z.string().nullable(),
  script: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const LanguagesInsertSchema = z.object({
  code: z.string().optional(),
  code_3: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  direction: z.any().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  is_default: z.boolean().nullable().optional(),
  name: z.string().optional(),
  native_name: z.string().nullable().optional(),
  script: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LanguagesRowInput = z.infer<typeof LanguagesRowSchema>;
export type LanguagesInsertInput = z.infer<typeof LanguagesInsertSchema>;
