// =====================================================
// FILE: types/generated/hermes-social/replies.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.043Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type RepliesRow = Tables<'replies'>;
export type RepliesInsert = TablesInsert<'replies'>;
export type RepliesUpdate = TablesUpdate<'replies'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicReplies = Omit<RepliesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type RepliesFormData = Partial<RepliesInsert>;

