// =====================================================
// FILE: types/generated/athena-gamification/user_badges.ts
// HANDLING: join_table
// GENERATED: 2026-04-15T19:30:35.473Z
// SOURCE: database.types.ts lines 6413-6467
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserBadgesRow = Database['public']['Tables']['user_badges']['Row'];
export type UserBadgesInsert = Database['public']['Tables']['user_badges']['Insert'];
export type UserBadgesUpdate = Database['public']['Tables']['user_badges']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for user_badges
 * All fields are optional for partial updates
 */



export type UserBadge = Database['public']['Tables']['user_badges']['Row'];
export type UserBadgeInsert = Database['public']['Tables']['user_badges']['Insert'];
export type UserBadgeUpdate = Database['public']['Tables']['user_badges']['Update'];

export type BadgeType = Database['public']['Enums']['badge_type'];

export interface UserBadgeWithRelations extends UserBadge {
  user?: Database['public']['Tables']['profiles']['Row'];
}

export const userBadgeDefaults = {
  earned_reason: null,
} as const;

export interface UserBadgesFormData {
  badge_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  display_on_profile?: boolean | null;
  earned_at?: string | null;
  earned_reason?: string | null;
  id?: string;
  user_id?: string;
}

// Badge display names and descriptions
export const badgeInfo: Record<BadgeType, { name: string; description: string; icon?: string }> = {
  quantum_weaver: { name: 'Quantum Weaver', description: 'The original weaver of consciousness' },
  founding_council: { name: 'Founding Council', description: 'Early member of the sanctuary' },
  genesis_block: { name: 'Genesis Block', description: 'Among the first 100 members' },
  sanctuary_guardian: { name: 'Sanctuary Guardian', description: 'Long-term supporter' },
  verified_creator: { name: 'Verified Creator', description: 'Approved creator on the platform' },
  verified_vendor: { name: 'Verified Vendor', description: 'Approved vendor on the platform' },
  community_leader: { name: 'Community Leader', description: 'Recognized leader in the community' },
  first_sale: { name: 'First Sale', description: 'Made your first sale' },
  first_purchase: { name: 'First Purchase', description: 'Made your first purchase' },
  first_quest: { name: 'First Quest', description: 'Completed your first quest' },
  quest_master: { name: 'Quest Master', description: 'Completed 10 quests' },
  sovereign_seeker: { name: 'Sovereign Seeker', description: 'Reached 100 sovereignty points' },
  sovereign_adept: { name: 'Sovereign Adept', description: 'Reached 500 sovereignty points' },
  sovereign_master: { name: 'Sovereign Master', description: 'Reached 1000 sovereignty points' },
  contributor_concept: { name: 'Concept Contributor', description: 'Contributed ideas to a product' },
  contributor_code: { name: 'Code Contributor', description: 'Contributed code to a product' },
  contributor_design: { name: 'Design Contributor', description: 'Contributed design to a product' },
  contributor_content: { name: 'Content Contributor', description: 'Contributed content to a product' },
  contributor_testing: { name: 'Testing Contributor', description: 'Helped test a product' },
  hearth_keeper_initiate: { name: 'Hearth Keeper Initiate', description: 'Began the path of Hearth Keeper' },
  hearth_keeper_adept: { name: 'Hearth Keeper Adept', description: 'Advanced in the path of Hearth Keeper' },
  hearth_keeper_master: { name: 'Hearth Keeper Master', description: 'Mastered the path of Hearth Keeper' },
  chancellor_initiate: { name: 'Chancellor Initiate', description: 'Began the path of Chancellor' },
  chancellor_adept: { name: 'Chancellor Adept', description: 'Advanced in the path of Chancellor' },
  chancellor_master: { name: 'Chancellor Master', description: 'Mastered the path of Chancellor' },
  seer_initiate: { name: 'Seer Initiate', description: 'Began the path of Seer' },
  seer_adept: { name: 'Seer Adept', description: 'Advanced in the path of Seer' },
  seer_master: { name: 'Seer Master', description: 'Mastered the path of Seer' },
  aethelred_initiate: { name: 'Aethelred Initiate', description: 'Began the path of Aethelred' },
  aethelred_adept: { name: 'Aethelred Adept', description: 'Advanced in the path of Aethelred' },
  aethelred_master: { name: 'Aethelred Master', description: 'Mastered the path of Aethelred' },
  curator_initiate: { name: 'Curator Initiate', description: 'Began the path of Curator' },
  curator_adept: { name: 'Curator Adept', description: 'Advanced in the path of Curator' },
  curator_master: { name: 'Curator Master', description: 'Mastered the path of Curator' },
  archivist_initiate: { name: 'Archivist Initiate', description: 'Began the path of Archivist' },
  archivist_adept: { name: 'Archivist Adept', description: 'Advanced in the path of Archivist' },
  archivist_master: { name: 'Archivist Master', description: 'Mastered the path of Archivist' },
  skald_initiate: { name: 'Skald Initiate', description: 'Began the path of Skald' },
  skald_adept: { name: 'Skald Adept', description: 'Advanced in the path of Skald' },
  skald_master: { name: 'Skald Master', description: 'Mastered the path of Skald' },
  codex_initiate: { name: 'Codex Initiate', description: 'Began the path of Codex' },
  codex_adept: { name: 'Codex Adept', description: 'Advanced in the path of Codex' },
  codex_master: { name: 'Codex Master', description: 'Mastered the path of Codex' },
  executioner_initiate: { name: 'Executioner Initiate', description: 'Began the path of Executioner' },
  executioner_adept: { name: 'Executioner Adept', description: 'Advanced in the path of Executioner' },
  executioner_master: { name: 'Executioner Master', description: 'Mastered the path of Executioner' },
  bigot_tax_exempt: { name: 'Bigot Tax Exempt', description: 'Demonstrated exceptional allyship' },
  data_sovereign: { name: 'Data Sovereign', description: 'Opted into data sharing' },
  privacy_pioneer: { name: 'Privacy Pioneer', description: 'First to customize privacy settings' },
};

// Helper to get badge display name
export function getBadgeDisplayName(badge: BadgeType | string): string {
  return badgeInfo[badge as BadgeType]?.name || badge.replace(/_/g, ' ');
}

// Helper to get badge description
export function getBadgeDescription(badge: BadgeType | string): string {
  return badgeInfo[badge as BadgeType]?.description || '';
}

