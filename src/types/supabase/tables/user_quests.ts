// types/supabase/tables/user_quests.ts
import type { Database } from '../database.types';

export type UserQuest = Database['public']['Tables']['user_quests']['Row'];
export type UserQuestInsert = Database['public']['Tables']['user_quests']['Insert'];
export type UserQuestUpdate = Database['public']['Tables']['user_quests']['Update'];

export interface UserQuestWithRelations extends UserQuest {
  user?: Database['public']['Tables']['profiles']['Row'];
  quest?: Database['public']['Tables']['quests']['Row'];
}

export const userQuestDefaults = {
  status: 'locked' as const,
  submitted_content: null,
} as const;