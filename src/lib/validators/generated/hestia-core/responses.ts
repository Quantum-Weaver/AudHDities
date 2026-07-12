// =====================================================
// FILE: validators/responses.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Responses SCHEMAS
// =====================================================

export const ResponsesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string(),
  description: z.string().nullable(),
  id: z.string(),
  parent_response_id: z.string().nullable(),
  signal_id: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ResponsesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  parent_response_id: z.string().nullable().optional(),
  signal_id: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ResponsesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  parent_response_id: z.string().nullable().optional(),
  signal_id: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResponsesRowInput = z.infer<typeof ResponsesRowSchema>;
export type ResponsesInsertInput = z.infer<typeof ResponsesInsertSchema>;
export type ResponsesUpdateInput = z.infer<typeof ResponsesUpdateSchema>;
