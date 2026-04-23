// =====================================================
// FILE: types/generated/hermes-social/reactions.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-04-23T02:14:53.350Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ReactionType = Enums<'reaction_type'>;

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

/**
 * Validation result for reactions
 */
export interface ReactionsValidationResult {
  valid: boolean;
  errors: {
    comment_id?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    post_id?: string;
    reaction_type?: string;
    reply_id?: string;
    user_id?: string;
    weight?: string;
  };
}

