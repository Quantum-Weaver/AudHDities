// =====================================================
// FILE: types/generated/hermes-social/posts.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.789Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PostsRow = Tables<'posts'>;
export type PostsInsert = TablesInsert<'posts'>;
export type PostsUpdate = TablesUpdate<'posts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPosts = Omit<PostsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PostsFormData = Partial<PostsInsert>;

