// types/supabase/tables/moderation_actions.ts
import type { Database } from '../database.types';

export type ModerationAction = Database['public']['Tables']['moderation_actions']['Row'];
export type ModerationActionInsert = Database['public']['Tables']['moderation_actions']['Insert'];
export type ModerationActionUpdate = Database['public']['Tables']['moderation_actions']['Update'];

export interface ModerationActionWithRelations extends ModerationAction {
  moderator?: Database['public']['Tables']['profiles']['Row'];
  reverted_by_user?: Database['public']['Tables']['profiles']['Row'];
}

export const moderationActionDefaults = {
  is_reverted: false,
  metadata: {},
} as const;