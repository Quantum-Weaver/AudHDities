// =====================================================
// FILE: validators/rate_limits.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// RateLimits SCHEMAS
// =====================================================

export const RateLimitsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  endpoint: z.string(),
  id: z.string(),
  identifier: z.string(),
  request_count: z.number().nullable(),
  window_start: z.string().nullable(),
});

export const RateLimitsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  endpoint: z.string().optional(),
  id: z.string().optional(),
  identifier: z.string().optional(),
  request_count: z.number().nullable().optional(),
  window_start: z.string().nullable().optional(),
});

export const RateLimitsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  endpoint: z.string().optional(),
  id: z.string().optional(),
  identifier: z.string().optional(),
  request_count: z.number().nullable().optional(),
  window_start: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type RateLimitsRowInput = z.infer<typeof RateLimitsRowSchema>;
export type RateLimitsInsertInput = z.infer<typeof RateLimitsInsertSchema>;
export type RateLimitsUpdateInput = z.infer<typeof RateLimitsUpdateSchema>;
