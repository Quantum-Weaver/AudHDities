// =====================================================
// FILE: types/generated/hermes-social/reactions.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.678Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ReactionType = Database['public']['Enums']['reaction_type'];
export type ReactionsRow = Tables<'reactions'>;
export type ReactionsInsert = TablesInsert<'reactions'>;
export type ReactionsUpdate = TablesUpdate<'reactions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of reactions
 */
export interface PublicReactions {
  comment_id: string | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  post_id: string | null;
  reaction_type: ReactionType;
  reply_id: string | null;
  user_id: string;
  weight: number | null;
}

/**
 * Form data for reactions
 * All fields are optional for partial updates
 */
export interface ReactionsFormData {
  comment_id?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  post_id?: string | null;
  reaction_type?: ReactionType;
  reply_id?: string | null;
  user_id?: string;
  weight?: number | null;
}

