// =====================================================
// FILE: validators/generated/hestia-core/community_profiles.ts
// GENERATED: 2026-04-15T01:18:39.311Z
// SOURCE: database.types.ts
// =====================================================

import type { CouncilHouse } from '@/lib/constants/generated/hestia-core/council_house';
import z from 'zod';

// =====================================================
// CommunityProfiles SCHEMAS
// =====================================================

export const CommunityProfilesRowSchema = z.object({
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
  id: z.string(),
  is_mentor: z.boolean().nullable(),
  joined_house: z.enum(Object.values('CouncilHouse')).nullable(),
  mentee_count: z.number().nullable(),
  mentor_since: z.string().nullable(),
  nd_identity: z.any().nullable(),
  peer_endorsements: z.number().nullable(),
  sensory_accommodations: z.any().nullable(),
  support_needs: z.any().nullable(),
  updated_at: z.string().nullable(),
  username: z.string().nullable(),
});

export const CommunityProfilesInsertSchema = z.object({
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
  id: z.string().optional(),
  is_mentor: z.boolean().nullable().optional(),
  joined_house: z.enum(Object.values('CouncilHouse')).nullable().optional(),
  mentee_count: z.number().nullable().optional(),
  mentor_since: z.string().nullable().optional(),
  nd_identity: z.any().nullable().optional(),
  peer_endorsements: z.number().nullable().optional(),
  sensory_accommodations: z.any().nullable().optional(),
  support_needs: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
});

export const CommunityProfilesUpdateSchema = z.object({
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
  id: z.string().optional(),
  is_mentor: z.boolean().nullable().optional(),
  joined_house: z.enum(Object.values('CouncilHouse')).nullable().optional(),
  mentee_count: z.number().nullable().optional(),
  mentor_since: z.string().nullable().optional(),
  nd_identity: z.any().nullable().optional(),
  peer_endorsements: z.number().nullable().optional(),
  sensory_accommodations: z.any().nullable().optional(),
  support_needs: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CommunityProfilesRowInput = z.infer<typeof CommunityProfilesRowSchema>;
export type CommunityProfilesInsertInput = z.infer<typeof CommunityProfilesInsertSchema>;
export type CommunityProfilesUpdateInput = z.infer<typeof CommunityProfilesUpdateSchema>;
