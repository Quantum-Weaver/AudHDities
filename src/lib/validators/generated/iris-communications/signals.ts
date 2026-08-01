// =====================================================
// FILE: validators/signals.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Signals SCHEMAS
// =====================================================

export const SignalsRowSchema = z.object({
  cover_url: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  response_count: z.number(),
  signal_type: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  tags: z.any().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SignalsInsertSchema = z.object({
  cover_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  response_count: z.number().optional(),
  signal_type: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tags: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SignalsUpdateSchema = z.object({
  cover_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  response_count: z.number().optional(),
  signal_type: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tags: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SignalsRowInput = z.infer<typeof SignalsRowSchema>;
export type SignalsInsertInput = z.infer<typeof SignalsInsertSchema>;
export type SignalsUpdateInput = z.infer<typeof SignalsUpdateSchema>;
