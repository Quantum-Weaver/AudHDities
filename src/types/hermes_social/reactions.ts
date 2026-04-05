// =====================================================
// FILE: types/hermes_social/reactions.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T19:46:33.083Z
// SOURCE: database.types.ts lines 3729-3797
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ReactionType = Database['public']['Enums']['reaction_type'];

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
  comment_id: string | null
  created_at: string | null
  id: string
  post_id: string | null
  reaction_type: ReactionType
  reply_id: string | null
  user_id: string
  weight: number | null
}

/**
 * Form data for reactions
 * All fields are optional for partial updates
 */
export interface ReactionsFormData {
  comment_id?: string | null;
  created_at?: string | null;
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
    id?: string;
    post_id?: string;
    reaction_type?: string;
    reply_id?: string;
    user_id?: string;
    weight?: string;
  };
}

