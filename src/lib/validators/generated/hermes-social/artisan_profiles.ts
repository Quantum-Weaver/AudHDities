// =====================================================
// FILE: validators/artisan_profiles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// ArtisanProfiles SCHEMAS
// =====================================================

export const ArtisanProfilesRowSchema = z.object({
  application_id: z.string().nullable(),
  artisan_name: z.string(),
  avatar_url: z.string().nullable(),
  banner_url: z.string().nullable(),
  bio: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  portfolio_url: z.string().nullable(),
  primary_category: z.string().nullable(),
  secondary_categories: z.any().nullable(),
  sensory_hints: z.string().nullable(),
  slug: z.string(),
  social_links: z.any().nullable(),
  status: z.enum(ENUM_VALUES.profileStatus),
  tagline: z.string().nullable(),
  total_creations: z.number().nullable(),
  total_followers: z.number().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  verified_at: z.string().nullable(),
  verified_by: z.string().nullable(),
  website_url: z.string().nullable(),
});

export const ArtisanProfilesInsertSchema = z.object({
  application_id: z.string().nullable().optional(),
  artisan_name: z.string(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  portfolio_url: z.string().nullable().optional(),
  primary_category: z.string().nullable().optional(),
  secondary_categories: z.any().nullable().optional(),
  sensory_hints: z.string().nullable().optional(),
  slug: z.string(),
  social_links: z.any().nullable().optional(),
  status: z.enum(ENUM_VALUES.profileStatus).optional(),
  tagline: z.string().nullable().optional(),
  total_creations: z.number().nullable().optional(),
  total_followers: z.number().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_by: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
});

export const ArtisanProfilesUpdateSchema = z.object({
  application_id: z.string().nullable().optional(),
  artisan_name: z.string().optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  portfolio_url: z.string().nullable().optional(),
  primary_category: z.string().nullable().optional(),
  secondary_categories: z.any().nullable().optional(),
  sensory_hints: z.string().nullable().optional(),
  slug: z.string().optional(),
  social_links: z.any().nullable().optional(),
  status: z.enum(ENUM_VALUES.profileStatus).optional(),
  tagline: z.string().nullable().optional(),
  total_creations: z.number().nullable().optional(),
  total_followers: z.number().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_by: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ArtisanProfilesRowInput = z.infer<typeof ArtisanProfilesRowSchema>;
export type ArtisanProfilesInsertInput = z.infer<typeof ArtisanProfilesInsertSchema>;
export type ArtisanProfilesUpdateInput = z.infer<typeof ArtisanProfilesUpdateSchema>;
