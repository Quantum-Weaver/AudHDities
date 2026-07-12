// =====================================================
// FILE: validators/community_profiles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// CommunityProfiles SCHEMAS
// =====================================================

export const CommunityProfilesRowSchema = z.object({
  avatar_url: z.string().nullable(),
  banner_url: z.string().nullable(),
  bio: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  display_name: z.string(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  sensory_hints: z.string().nullable(),
  slug: z.string(),
  social_links: z.any().nullable(),
  sovereign_tier: z.enum(ENUM_VALUES.sovereignTier),
  status: z.enum(ENUM_VALUES.profileStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  website_url: z.string().nullable(),
});

export const CommunityProfilesInsertSchema = z.object({
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string(),
  sensory_hints: z.string().nullable().optional(),
  slug: z.string(),
  social_links: z.any().nullable().optional(),
  sovereign_tier: z.enum(ENUM_VALUES.sovereignTier).optional(),
  status: z.enum(ENUM_VALUES.profileStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
});

export const CommunityProfilesUpdateSchema = z.object({
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  sensory_hints: z.string().nullable().optional(),
  slug: z.string().optional(),
  social_links: z.any().nullable().optional(),
  sovereign_tier: z.enum(ENUM_VALUES.sovereignTier).optional(),
  status: z.enum(ENUM_VALUES.profileStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CommunityProfilesRowInput = z.infer<typeof CommunityProfilesRowSchema>;
export type CommunityProfilesInsertInput = z.infer<typeof CommunityProfilesInsertSchema>;
export type CommunityProfilesUpdateInput = z.infer<typeof CommunityProfilesUpdateSchema>;
