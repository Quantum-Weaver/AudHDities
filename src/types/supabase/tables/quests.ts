// src/types/supabase/quests.ts
import type { Database } from '../database.types';

export type Quest = Database['public']['Tables']['quests']['Row'];
export type QuestInsert = Database['public']['Tables']['quests']['Insert'];
export type QuestUpdate = Database['public']['Tables']['quests']['Update'];

export type UserQuest = Database['public']['Tables']['user_quests']['Row'];
export type UserQuestInsert = Database['public']['Tables']['user_quests']['Insert'];
export type UserQuestUpdate = Database['public']['Tables']['user_quests']['Update'];

export type QuestStatus = Database['public']['Enums']['quest_status'];
export type CouncilHouse = Database['public']['Enums']['council_house'];

export interface QuestWithProgress extends Quest {
  user_status?: QuestStatus;
  user_completed_at?: string | null;
}

export const councilHouseLabels: Record<CouncilHouse, string> = {
  hearth_keeper: 'Hearth-Keeper',
  chancellor: 'Chancellor',
  seer: 'Seer',
  aethelred: 'Aethelred',
  curator: 'Curator',
  archivist: 'Archivist',
  skald: 'Skald',
  codex: 'Codex',
  executioner: 'Executioner',
};

export const councilHouseColors: Record<CouncilHouse, string> = {
  hearth_keeper: 'text-orange-400 border-orange-400/30',
  chancellor: 'text-blue-400 border-blue-400/30',
  seer: 'text-purple-400 border-purple-400/30',
  aethelred: 'text-cyan-400 border-cyan-400/30',
  curator: 'text-emerald-400 border-emerald-400/30',
  archivist: 'text-stone-400 border-stone-400/30',
  skald: 'text-pink-400 border-pink-400/30',
  codex: 'text-yellow-400 border-yellow-400/30',
  executioner: 'text-red-400 border-red-400/30',
};

export interface UserQuestWithRelations extends UserQuest {
  user?: Database['public']['Tables']['profiles']['Row'];
  quest?: Database['public']['Tables']['quests']['Row'];
}

export const userQuestDefaults = {
  status: 'locked' as const,
  submitted_content: null,
} as const;