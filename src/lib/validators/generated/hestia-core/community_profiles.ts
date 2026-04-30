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
  community_profiles_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  crisis_contact_email: z.string().nullable(),
  crisis_contact_name: z.string().nullable(),
  crisis_contact_phone: z.string().nullable(),
  crisis_instructions: z.string().nullable(),
  house_adept: z.boolean().nullable(),
  house_initiate: z.boolean().nullable(),
  house_joined_at: z.string().nullable(),
  house_master: z.boolean().nullable(),
  is_mentor: z.boolean().nullable(),
  joined_house: z.enum(ENUM_VALUES.councilHouse).nullable(),
  mentee_count: z.number().nullable(),
  mentor_since: z.string().nullable(),
  nd_identity: z.any().nullable(),
  peer_endorsements: z.number().nullable(),
  profile_id: z.string(),
  sensory_accommodations: z.any().nullable(),
  support_needs: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const CommunityProfilesInsertSchema = z.object({
  community_profiles_id: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  crisis_contact_email: z.string().nullable().optional(),
  crisis_contact_name: z.string().nullable().optional(),
  crisis_contact_phone: z.string().nullable().optional(),
  crisis_instructions: z.string().nullable().optional(),
  house_adept: z.boolean().nullable().optional(),
  house_initiate: z.boolean().nullable().optional(),
  house_joined_at: z.string().nullable().optional(),
  house_master: z.boolean().nullable().optional(),
  is_mentor: z.boolean().nullable().optional(),
  joined_house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  mentee_count: z.number().nullable().optional(),
  mentor_since: z.string().nullable().optional(),
  nd_identity: z.any().nullable().optional(),
  peer_endorsements: z.number().nullable().optional(),
  profile_id: z.string(),
  sensory_accommodations: z.any().nullable().optional(),
  support_needs: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const CommunityProfilesUpdateSchema = z.object({
  community_profiles_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  crisis_contact_email: z.string().nullable().optional(),
  crisis_contact_name: z.string().nullable().optional(),
  crisis_contact_phone: z.string().nullable().optional(),
  crisis_instructions: z.string().nullable().optional(),
  house_adept: z.boolean().nullable().optional(),
  house_initiate: z.boolean().nullable().optional(),
  house_joined_at: z.string().nullable().optional(),
  house_master: z.boolean().nullable().optional(),
  is_mentor: z.boolean().nullable().optional(),
  joined_house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  mentee_count: z.number().nullable().optional(),
  mentor_since: z.string().nullable().optional(),
  nd_identity: z.any().nullable().optional(),
  peer_endorsements: z.number().nullable().optional(),
  profile_id: z.string().optional(),
  sensory_accommodations: z.any().nullable().optional(),
  support_needs: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CommunityProfilesRowInput = z.infer<typeof CommunityProfilesRowSchema>;
export type CommunityProfilesInsertInput = z.infer<typeof CommunityProfilesInsertSchema>;
export type CommunityProfilesUpdateInput = z.infer<typeof CommunityProfilesUpdateSchema>;
