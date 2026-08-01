// =====================================================
// FILE: validators/rate_limits.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// RateLimits SCHEMAS
// =====================================================

export const RateLimitsRowSchema = z.object({
  action_on_exceed: z.string(),
  cooldown_seconds: z.number(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  endpoint_type: z.string(),
  id: z.string(),
  is_enabled: z.boolean(),
  max_requests: z.number(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  window_seconds: z.number(),
});

export const RateLimitsInsertSchema = z.object({
  action_on_exceed: z.string().optional(),
  cooldown_seconds: z.number().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  endpoint_type: z.string(),
  id: z.string().optional(),
  is_enabled: z.boolean().optional(),
  max_requests: z.number(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  window_seconds: z.number().optional(),
});

export const RateLimitsUpdateSchema = z.object({
  action_on_exceed: z.string().optional(),
  cooldown_seconds: z.number().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  endpoint_type: z.string().optional(),
  id: z.string().optional(),
  is_enabled: z.boolean().optional(),
  max_requests: z.number().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  window_seconds: z.number().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type RateLimitsRowInput = z.infer<typeof RateLimitsRowSchema>;
export type RateLimitsInsertInput = z.infer<typeof RateLimitsInsertSchema>;
export type RateLimitsUpdateInput = z.infer<typeof RateLimitsUpdateSchema>;
