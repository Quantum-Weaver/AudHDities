// =====================================================
// FILE: validators/profiles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Profiles SCHEMAS
// =====================================================

export const ProfilesRowSchema = z.object({
  algorithm_preferences: z.any().nullable(),
  avatar_url: z.string().nullable(),
  badges: z.enum(ENUM_VALUES.badgeType).nullable(),
  banner_url: z.string().nullable(),
  bio: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  display_name: z.string().nullable(),
  dyslexia_mode: z.boolean().nullable(),
  email: z.string(),
  full_name: z.string().nullable(),
  id: z.string(),
  is_admin: z.boolean().nullable(),
  is_creator: z.boolean().nullable(),
  is_moderator: z.boolean().nullable(),
  is_quantum_weaver: z.boolean().nullable(),
  is_vendor: z.boolean().nullable(),
  last_active: z.string().nullable(),
  nd_preferences: z.any().nullable(),
  preferred_environment: z.string().nullable(),
  primary_house: z.enum(ENUM_VALUES.councilHouse).nullable(),
  pronouns: z.string().nullable(),
  sensory_mode: z.enum(ENUM_VALUES.sensoryMode).nullable(),
  sensory_preferences: z.any().nullable(),
  sovereignty_score: z.number().nullable(),
  status: z.enum(ENUM_VALUES.userStatus).nullable(),
  updated_at: z.string().nullable(),
  user_tier: z.enum(ENUM_VALUES.userTier).nullable(),
  username: z.string().nullable(),
});

export const ProfilesInsertSchema = z.object({
  algorithm_preferences: z.any().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  badges: z.enum(ENUM_VALUES.badgeType).nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  dyslexia_mode: z.boolean().nullable().optional(),
  email: z.string().optional(),
  full_name: z.string().nullable().optional(),
  id: z.string().optional(),
  is_admin: z.boolean().nullable().optional(),
  is_creator: z.boolean().nullable().optional(),
  is_moderator: z.boolean().nullable().optional(),
  is_quantum_weaver: z.boolean().nullable().optional(),
  is_vendor: z.boolean().nullable().optional(),
  last_active: z.string().nullable().optional(),
  nd_preferences: z.any().nullable().optional(),
  preferred_environment: z.string().nullable().optional(),
  primary_house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  pronouns: z.string().nullable().optional(),
  sensory_mode: z.enum(ENUM_VALUES.sensoryMode).nullable().optional(),
  sensory_preferences: z.any().nullable().optional(),
  sovereignty_score: z.number().nullable().optional(),
  status: z.enum(ENUM_VALUES.userStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_tier: z.enum(ENUM_VALUES.userTier).nullable().optional(),
  username: z.string().nullable().optional(),
});

export const ProfilesUpdateSchema = z.object({
  algorithm_preferences: z.any().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  badges: z.enum(ENUM_VALUES.badgeType).nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  dyslexia_mode: z.boolean().nullable().optional(),
  email: z.string().optional(),
  full_name: z.string().nullable().optional(),
  id: z.string().optional(),
  is_admin: z.boolean().nullable().optional(),
  is_creator: z.boolean().nullable().optional(),
  is_moderator: z.boolean().nullable().optional(),
  is_quantum_weaver: z.boolean().nullable().optional(),
  is_vendor: z.boolean().nullable().optional(),
  last_active: z.string().nullable().optional(),
  nd_preferences: z.any().nullable().optional(),
  preferred_environment: z.string().nullable().optional(),
  primary_house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  pronouns: z.string().nullable().optional(),
  sensory_mode: z.enum(ENUM_VALUES.sensoryMode).nullable().optional(),
  sensory_preferences: z.any().nullable().optional(),
  sovereignty_score: z.number().nullable().optional(),
  status: z.enum(ENUM_VALUES.userStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_tier: z.enum(ENUM_VALUES.userTier).nullable().optional(),
  username: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProfilesRowInput = z.infer<typeof ProfilesRowSchema>;
export type ProfilesInsertInput = z.infer<typeof ProfilesInsertSchema>;
export type ProfilesUpdateInput = z.infer<typeof ProfilesUpdateSchema>;
