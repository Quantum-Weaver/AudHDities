// =====================================================
// FILE: constants/generated/athena-gamification/badge_type.ts
// GENERATED: 2026-04-15T19:30:34.770Z
// SOURCE: Constants.public.Enums.badge_type
// VALUES: 49 entries
// =====================================================

export const BADGE_TYPE = {
  QUANTUM_WEAVER: 'quantum_weaver',
  FOUNDING_COUNCIL: 'founding_council',
  GENESIS_BLOCK: 'genesis_block',
  SANCTUARY_GUARDIAN: 'sanctuary_guardian',
  VERIFIED_CREATOR: 'verified_creator',
  VERIFIED_VENDOR: 'verified_vendor',
  COMMUNITY_LEADER: 'community_leader',
  FIRST_SALE: 'first_sale',
  FIRST_PURCHASE: 'first_purchase',
  FIRST_QUEST: 'first_quest',
  QUEST_MASTER: 'quest_master',
  SOVEREIGN_SEEKER: 'sovereign_seeker',
  SOVEREIGN_ADEPT: 'sovereign_adept',
  SOVEREIGN_MASTER: 'sovereign_master',
  CONTRIBUTOR_CONCEPT: 'contributor_concept',
  CONTRIBUTOR_CODE: 'contributor_code',
  CONTRIBUTOR_DESIGN: 'contributor_design',
  CONTRIBUTOR_CONTENT: 'contributor_content',
  CONTRIBUTOR_TESTING: 'contributor_testing',
  HEARTH_KEEPER_INITIATE: 'hearth_keeper_initiate',
  HEARTH_KEEPER_ADEPT: 'hearth_keeper_adept',
  HEARTH_KEEPER_MASTER: 'hearth_keeper_master',
  CHANCELLOR_INITIATE: 'chancellor_initiate',
  CHANCELLOR_ADEPT: 'chancellor_adept',
  CHANCELLOR_MASTER: 'chancellor_master',
  SEER_INITIATE: 'seer_initiate',
  SEER_ADEPT: 'seer_adept',
  SEER_MASTER: 'seer_master',
  AETHELRED_INITIATE: 'aethelred_initiate',
  AETHELRED_ADEPT: 'aethelred_adept',
  AETHELRED_MASTER: 'aethelred_master',
  CURATOR_INITIATE: 'curator_initiate',
  CURATOR_ADEPT: 'curator_adept',
  CURATOR_MASTER: 'curator_master',
  ARCHIVIST_INITIATE: 'archivist_initiate',
  ARCHIVIST_ADEPT: 'archivist_adept',
  ARCHIVIST_MASTER: 'archivist_master',
  SKALD_INITIATE: 'skald_initiate',
  SKALD_ADEPT: 'skald_adept',
  SKALD_MASTER: 'skald_master',
  CODEX_INITIATE: 'codex_initiate',
  CODEX_ADEPT: 'codex_adept',
  CODEX_MASTER: 'codex_master',
  EXECUTIONER_INITIATE: 'executioner_initiate',
  EXECUTIONER_ADEPT: 'executioner_adept',
  EXECUTIONER_MASTER: 'executioner_master',
  BIGOT_TAX_EXEMPT: 'bigot_tax_exempt',
  DATA_SOVEREIGN: 'data_sovereign',
  PRIVACY_PIONEER: 'privacy_pioneer',
} as const;

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

export type BadgeType = typeof BADGE_TYPE[keyof typeof BADGE_TYPE];

// Helper to get badge display name
export function getBadgeDisplayName(badge: BadgeType | string): string {
  return badgeInfo[badge as BadgeType]?.name || badge.replace(/_/g, ' ');
}

// Helper to get badge description
export function getBadgeDescription(badge: BadgeType | string): string {
  return badgeInfo[badge as BadgeType]?.description || '';
}