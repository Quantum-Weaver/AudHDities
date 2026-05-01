// src/lib/validators/quest.ts
import { z } from 'zod';
import { idSchema } from './base';

// Council house validation
export const councilHouseSchema = z.enum([
  'hearth_keeper', 'chancellor', 'seer', 'aethelred',
  'curator', 'archivist', 'skald', 'codex', 'executioner'
]);

// Quest status validation
export const questStatusSchema = z.enum(['locked', 'available', 'in_progress', 'completed', 'mastered']);

// Quest submission validation
export const questSubmissionSchema = z.object({
  quest_id: idSchema,
  submission_type: z.enum(['text', 'image', 'file', 'audio', 'video', 'link', 'auto']),
  submitted_content: z.string().optional(),
});

// User quest update validation
export const userQuestUpdateSchema = z.object({
  status: questStatusSchema,
  submitted_content: z.string().optional(),
});

// Badge award validation (admin only)
export const badgeAwardSchema = z.object({
  user_id: idSchema,
  badge: z.enum([
    'quantum_weaver', 'founding_council', 'genesis_block', 'sanctuary_guardian',
    'verified_creator', 'verified_vendor', 'community_leader',
    'first_sale', 'first_purchase', 'first_quest', 'quest_master',
    'sovereign_seeker', 'sovereign_adept', 'sovereign_master',
    'contributor_concept', 'contributor_code', 'contributor_design',
    'contributor_content', 'contributor_testing',
    // Council badges
    'hearth_keeper_initiate', 'hearth_keeper_adept', 'hearth_keeper_master',
    'chancellor_initiate', 'chancellor_adept', 'chancellor_master',
    'seer_initiate', 'seer_adept', 'seer_master',
    'aethelred_initiate', 'aethelred_adept', 'aethelred_master',
    'curator_initiate', 'curator_adept', 'curator_master',
    'archivist_initiate', 'archivist_adept', 'archivist_master',
    'skald_initiate', 'skald_adept', 'skald_master',
    'codex_initiate', 'codex_adept', 'codex_master',
    'executioner_initiate', 'executioner_adept', 'executioner_master',
    'bigot_tax_exempt', 'data_sovereign', 'privacy_pioneer',
  ]),
  earned_reason: z.string().max(500).optional(),
});