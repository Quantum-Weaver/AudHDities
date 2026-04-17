// =====================================================
// FILE: validators/generated/hestia-core/profiles.ts
// GENERATED: 2026-04-17T20:52:30.940Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { COUNCIL_HOUSE } from '@/lib/constants/generated/hestia-core/council_house';
import { SENSORY_MODE } from '@/lib/constants/generated/hestia-core/sensory_mode';
import { USER_STATUS } from '@/lib/constants/generated/hestia-core/user_status';
import { USER_TIER } from '@/lib/constants/generated/hestia-core/user_tier';

// =====================================================
// Profiles SCHEMAS
// =====================================================

export const ProfilesRowSchema = z.object({
  algorithm_preferences: z.any().nullable(),
  avatar_url: z.string().nullable(),
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
  is_quantum_weaver: z.boolean().nullable(),
  is_vendor: z.boolean().nullable(),
  last_active: z.string().nullable(),
  nd_preferences: z.any().nullable(),
  preferred_environment: z.string().nullable(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  sensory_mode: z.enum(Object.values(SENSORY_MODE)).nullable(),
  sensory_preferences: z.any().nullable(),
  sovereignty_score: z.number().nullable(),
  status: z.enum(Object.values(USER_STATUS)).nullable(),
  updated_at: z.string().nullable(),
  user_tier: z.enum(Object.values(USER_TIER)).nullable(),
  username: z.string().nullable(),
});

export const ProfilesInsertSchema = z.object({
  algorithm_preferences: z.any().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  dyslexia_mode: z.boolean().nullable().optional(),
  email: z.string(),
  full_name: z.string().nullable().optional(),
  id: z.string(),
  is_admin: z.boolean().nullable().optional(),
  is_creator: z.boolean().nullable().optional(),
  is_quantum_weaver: z.boolean().nullable().optional(),
  is_vendor: z.boolean().nullable().optional(),
  last_active: z.string().nullable().optional(),
  nd_preferences: z.any().nullable().optional(),
  preferred_environment: z.string().nullable().optional(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  sensory_mode: z.enum(Object.values(SENSORY_MODE)).nullable().optional(),
  sensory_preferences: z.any().nullable().optional(),
  sovereignty_score: z.number().nullable().optional(),
  status: z.enum(Object.values(USER_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_tier: z.enum(Object.values(USER_TIER)).nullable().optional(),
  username: z.string().nullable().optional(),
});

export const ProfilesUpdateSchema = z.object({
  algorithm_preferences: z.any().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
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
  is_quantum_weaver: z.boolean().nullable().optional(),
  is_vendor: z.boolean().nullable().optional(),
  last_active: z.string().nullable().optional(),
  nd_preferences: z.any().nullable().optional(),
  preferred_environment: z.string().nullable().optional(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  sensory_mode: z.enum(Object.values(SENSORY_MODE)).nullable().optional(),
  sensory_preferences: z.any().nullable().optional(),
  sovereignty_score: z.number().nullable().optional(),
  status: z.enum(Object.values(USER_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_tier: z.enum(Object.values(USER_TIER)).nullable().optional(),
  username: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProfilesRowInput = z.infer<typeof ProfilesRowSchema>;
export type ProfilesInsertInput = z.infer<typeof ProfilesInsertSchema>;
export type ProfilesUpdateInput = z.infer<typeof ProfilesUpdateSchema>;
