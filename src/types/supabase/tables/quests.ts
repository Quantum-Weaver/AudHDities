// types/supabase/tables/quests.ts
import type { Database } from '../database.types';

export type Quest = Database['public']['Tables']['quests']['Row'];
export type QuestInsert = Database['public']['Tables']['quests']['Insert'];
export type QuestUpdate = Database['public']['Tables']['quests']['Update'];

export type QuestStatus = Database['public']['Enums']['quest_status'];
export type CouncilHouse = Database['public']['Enums']['council_house'];

export interface QuestWithRelations extends Quest {
  prerequisite?: Database['public']['Tables']['quests']['Row'];
  userProgress?: Database['public']['Tables']['user_quests']['Row'][];
}

export const questDefaults = {
  is_active: true,
  required_sovereignty_score: 0,
  sovereignty_reward: 10,
  residual_multiplier_bonus: 1.0,
  submission_type: 'text' as const,
} as const;