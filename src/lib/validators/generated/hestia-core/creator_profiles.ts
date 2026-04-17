// =====================================================
// FILE: validators/generated/hestia-core/creator_profiles.ts
// GENERATED: 2026-04-17T01:35:45.229Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// CreatorProfiles SCHEMAS
// =====================================================

export const CreatorProfilesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creative_categories: z.any().nullable(),
  creative_description: z.string().nullable(),
  creator_logo_url: z.string().nullable(),
  creator_moniker: z.string(),
  default_residual_pool: z.number().nullable(),
  id: z.string(),
  portfolio_url: z.string().nullable(),
  stripe_account_id: z.string().nullable(),
  total_earnings: z.number().nullable(),
  total_products: z.number().nullable(),
  total_sales: z.number().nullable(),
  updated_at: z.string().nullable(),
  username: z.string().nullable(),
  verified_at: z.string().nullable(),
  verified_badge: z.boolean().nullable(),
  verified_by: z.string().nullable(),
});

export const CreatorProfilesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creative_categories: z.any().nullable().optional(),
  creative_description: z.string().nullable().optional(),
  creator_logo_url: z.string().nullable().optional(),
  creator_moniker: z.string(),
  default_residual_pool: z.number().nullable().optional(),
  id: z.string(),
  portfolio_url: z.string().nullable().optional(),
  stripe_account_id: z.string().nullable().optional(),
  total_earnings: z.number().nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_badge: z.boolean().nullable().optional(),
  verified_by: z.string().nullable().optional(),
});

export const CreatorProfilesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creative_categories: z.any().nullable().optional(),
  creative_description: z.string().nullable().optional(),
  creator_logo_url: z.string().nullable().optional(),
  creator_moniker: z.string().optional(),
  default_residual_pool: z.number().nullable().optional(),
  id: z.string().optional(),
  portfolio_url: z.string().nullable().optional(),
  stripe_account_id: z.string().nullable().optional(),
  total_earnings: z.number().nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_badge: z.boolean().nullable().optional(),
  verified_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CreatorProfilesRowInput = z.infer<typeof CreatorProfilesRowSchema>;
export type CreatorProfilesInsertInput = z.infer<typeof CreatorProfilesInsertSchema>;
export type CreatorProfilesUpdateInput = z.infer<typeof CreatorProfilesUpdateSchema>;
