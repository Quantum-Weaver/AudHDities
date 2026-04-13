// =====================================================
// FILE: types/generated/hermes-social/reactions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.900Z
// SOURCE: database.types.ts lines 4631-4709
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ReactionType = Database['public']['Enums']['reaction_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type ReactionsRow = Database['public']['Tables']['reactions']['Row'];
export type ReactionsInsert = Database['public']['Tables']['reactions']['Insert'];
export type ReactionsUpdate = Database['public']['Tables']['reactions']['Update'];

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

