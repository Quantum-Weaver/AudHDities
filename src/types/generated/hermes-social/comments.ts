// =====================================================
// FILE: types/generated/hermes-social/comments.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.127Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CommentsRow = Tables<'comments'>;
export type CommentsInsert = TablesInsert<'comments'>;
export type CommentsUpdate = TablesUpdate<'comments'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicComments = Omit<CommentsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CommentsFormData = Partial<CommentsInsert>;

