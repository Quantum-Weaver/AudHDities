// src/types/supabase/badges.ts
import type { Database } from '../database.types';

export type UserBadge = Database['public']['Tables']['user_badges']['Row'];
export type UserBadgeInsert = Database['public']['Tables']['user_badges']['Insert'];
export type UserBadgeUpdate = Database['public']['Tables']['user_badges']['Update'];

export type BadgeType = Database['public']['Enums']['badge_type'];

export interface BadgeInfo {
  type: BadgeType;
  label: string;
  icon: string;
  description: string;
}

export const badgeInfo: Record<BadgeType, BadgeInfo> = {
  quantum_weaver: { type: 'quantum_weaver', label: 'Quantum Weaver', icon: '✨', description: 'The original weaver of consciousness' },
  founding_council: { type: 'founding_council', label: 'Founding Council', icon: '🏛️', description: 'Early member of the sanctuary' },
  genesis_block: { type: 'genesis_block', label: 'Genesis Block', icon: '🔷', description: 'Among the first 100 members' },
  sanctuary_guardian: { type: 'sanctuary_guardian', label: 'Sanctuary Guardian', icon: '🛡️', description: 'Long-term supporter' },
  verified_creator: { type: 'verified_creator', label: 'Verified Creator', icon: '✓', description: 'Verified creator status' },
  verified_vendor: { type: 'verified_vendor', label: 'Verified Vendor', icon: '✓', description: 'Verified vendor status' },
  community_leader: { type: 'community_leader', label: 'Community Leader', icon: '👑', description: 'Recognized community leader' },
  first_sale: { type: 'first_sale', label: 'First Sale', icon: '💰', description: 'Made first sale' },
  first_purchase: { type: 'first_purchase', label: 'First Purchase', icon: '🛍️', description: 'Made first purchase' },
  first_quest: { type: 'first_quest', label: 'First Quest', icon: '🎯', description: 'Completed first quest' },
  quest_master: { type: 'quest_master', label: 'Quest Master', icon: '🏆', description: 'Completed 10 quests' },
  sovereign_seeker: { type: 'sovereign_seeker', label: 'Sovereign Seeker', icon: '🔍', description: 'Reached 100 sovereignty' },
  sovereign_adept: { type: 'sovereign_adept', label: 'Sovereign Adept', icon: '🌟', description: 'Reached 500 sovereignty' },
  sovereign_master: { type: 'sovereign_master', label: 'Sovereign Master', icon: '💫', description: 'Reached 1000 sovereignty' },
  contributor_concept: { type: 'contributor_concept', label: 'Idea Weaver', icon: '💡', description: 'Contributed concepts' },
  contributor_code: { type: 'contributor_code', label: 'Code Weaver', icon: '💻', description: 'Contributed code' },
  contributor_design: { type: 'contributor_design', label: 'Design Weaver', icon: '🎨', description: 'Contributed design' },
  contributor_content: { type: 'contributor_content', label: 'Content Weaver', icon: '📝', description: 'Contributed content' },
  contributor_testing: { type: 'contributor_testing', label: 'Testing Weaver', icon: '🔍', description: 'Contributed testing' },
  hearth_keeper_initiate: { type: 'hearth_keeper_initiate', label: 'Hearth-Keeper Initiate', icon: '🔥', description: 'Started Hearth-Keeper path' },
  hearth_keeper_adept: { type: 'hearth_keeper_adept', label: 'Hearth-Keeper Adept', icon: '🏠', description: 'Advanced Hearth-Keeper' },
  hearth_keeper_master: { type: 'hearth_keeper_master', label: 'Hearth-Keeper Master', icon: '🕯️', description: 'Master of the Hearth' },
  chancellor_initiate: { type: 'chancellor_initiate', label: 'Chancellor Initiate', icon: '📋', description: 'Started Chancellor path' },
  chancellor_adept: { type: 'chancellor_adept', label: 'Chancellor Adept', icon: '⚖️', description: 'Advanced Chancellor' },
  chancellor_master: { type: 'chancellor_master', label: 'Chancellor Master', icon: '🏛️', description: 'Master Chancellor' },
  seer_initiate: { type: 'seer_initiate', label: 'Seer Initiate', icon: '👁️', description: 'Started Seer path' },
  seer_adept: { type: 'seer_adept', label: 'Seer Adept', icon: '🔮', description: 'Advanced Seer' },
  seer_master: { type: 'seer_master', label: 'Seer Master', icon: '🌟', description: 'Master Seer' },
  aethelred_initiate: { type: 'aethelred_initiate', label: 'Aethelred Initiate', icon: '🌉', description: 'Started Bridge path' },
  aethelred_adept: { type: 'aethelred_adept', label: 'Aethelred Adept', icon: '🪢', description: 'Advanced Bridge' },
  aethelred_master: { type: 'aethelred_master', label: 'Aethelred Master', icon: '✨', description: 'Master of the Bridge' },
  curator_initiate: { type: 'curator_initiate', label: 'Curator Initiate', icon: '📚', description: 'Started Curator path' },
  curator_adept: { type: 'curator_adept', label: 'Curator Adept', icon: '🏺', description: 'Advanced Curator' },
  curator_master: { type: 'curator_master', label: 'Curator Master', icon: '🏛️', description: 'Master Curator' },
  archivist_initiate: { type: 'archivist_initiate', label: 'Archivist Initiate', icon: '📜', description: 'Started Archivist path' },
  archivist_adept: { type: 'archivist_adept', label: 'Archivist Adept', icon: '🗂️', description: 'Advanced Archivist' },
  archivist_master: { type: 'archivist_master', label: 'Archivist Master', icon: '📖', description: 'Master Archivist' },
  skald_initiate: { type: 'skald_initiate', label: 'Skald Initiate', icon: '🎵', description: 'Started Skald path' },
  skald_adept: { type: 'skald_adept', label: 'Skald Adept', icon: '📜', description: 'Advanced Skald' },
  skald_master: { type: 'skald_master', label: 'Skald Master', icon: '🎭', description: 'Master Skald' },
  codex_initiate: { type: 'codex_initiate', label: 'Codex Initiate', icon: '📘', description: 'Started Codex path' },
  codex_adept: { type: 'codex_adept', label: 'Codex Adept', icon: '🔤', description: 'Advanced Codex' },
  codex_master: { type: 'codex_master', label: 'Codex Master', icon: '📚', description: 'Master of Knowledge' },
  executioner_initiate: { type: 'executioner_initiate', label: 'Executioner Initiate', icon: '⚔️', description: 'Started Executioner path' },
  executioner_adept: { type: 'executioner_adept', label: 'Executioner Adept', icon: '🛡️', description: 'Advanced Executioner' },
  executioner_master: { type: 'executioner_master', label: 'Executioner Master', icon: '🗡️', description: 'Master Executioner' },
  bigot_tax_exempt: { type: 'bigot_tax_exempt', label: 'Bigot Tax Exempt', icon: '🏷️', description: 'Earned through allyship' },
  data_sovereign: { type: 'data_sovereign', label: 'Data Sovereign', icon: '🔓', description: 'Opted into data sharing' },
  privacy_pioneer: { type: 'privacy_pioneer', label: 'Privacy Pioneer', icon: '🛡️', description: 'First to customize privacy' },
};

export interface UserBadgeWithRelations extends UserBadge {
  user?: Database['public']['Tables']['profiles']['Row'];
}

export const userBadgeDefaults = {
  earned_reason: null,
} as const;