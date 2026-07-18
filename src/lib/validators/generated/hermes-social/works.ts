// =====================================================
// FILE: validators/works.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Works SCHEMAS
// =====================================================

export const WorksRowSchema = z.object({
  cover_url: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  currency: z.string(),
  description: z.string().nullable(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  media_urls: z.any().nullable(),
  metadata: z.any().nullable(),
  name: z.string(),
  price: z.number().nullable(),
  pricing_model: z.enum(ENUM_VALUES.pricingModel),
  residual_pool_percent: z.number().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  streaming_url: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  work_type: z.enum(ENUM_VALUES.workType),
});

export const WorksInsertSchema = z.object({
  cover_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  currency: z.string().optional(),
  description: z.string().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  media_urls: z.any().nullable().optional(),
  metadata: z.any().nullable().optional(),
  name: z.string(),
  price: z.number().nullable().optional(),
  pricing_model: z.enum(ENUM_VALUES.pricingModel).optional(),
  residual_pool_percent: z.number().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  streaming_url: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  work_type: z.enum(ENUM_VALUES.workType).optional(),
});

export const WorksUpdateSchema = z.object({
  cover_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  currency: z.string().optional(),
  description: z.string().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  media_urls: z.any().nullable().optional(),
  metadata: z.any().nullable().optional(),
  name: z.string().optional(),
  price: z.number().nullable().optional(),
  pricing_model: z.enum(ENUM_VALUES.pricingModel).optional(),
  residual_pool_percent: z.number().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  streaming_url: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  work_type: z.enum(ENUM_VALUES.workType).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type WorksRowInput = z.infer<typeof WorksRowSchema>;
export type WorksInsertInput = z.infer<typeof WorksInsertSchema>;
export type WorksUpdateInput = z.infer<typeof WorksUpdateSchema>;
