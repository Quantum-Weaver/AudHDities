// =====================================================
// FILE: validators/creator_profiles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

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
  creator_profiles_id: z.string(),
  default_residual_pool: z.number().nullable(),
  portfolio_url: z.string().nullable(),
  products_linked: z.any().nullable(),
  profile_id: z.string(),
  stripe_account_id: z.string().nullable(),
  total_earnings: z.number().nullable(),
  total_products: z.number().nullable(),
  total_sales: z.number().nullable(),
  updated_at: z.string().nullable(),
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
  creator_profiles_id: z.string(),
  default_residual_pool: z.number().nullable().optional(),
  portfolio_url: z.string().nullable().optional(),
  products_linked: z.any().nullable().optional(),
  profile_id: z.string(),
  stripe_account_id: z.string().nullable().optional(),
  total_earnings: z.number().nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
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
  creator_profiles_id: z.string().optional(),
  default_residual_pool: z.number().nullable().optional(),
  portfolio_url: z.string().nullable().optional(),
  products_linked: z.any().nullable().optional(),
  profile_id: z.string().optional(),
  stripe_account_id: z.string().nullable().optional(),
  total_earnings: z.number().nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
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
