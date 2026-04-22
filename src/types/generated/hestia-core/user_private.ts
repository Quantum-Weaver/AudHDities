// =====================================================
// FILE: types/generated/hestia-core/user_private.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.566Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type UserPrivateRow = Tables<'user_private'>;
export type UserPrivateInsert = TablesInsert<'user_private'>;
export type UserPrivateUpdate = TablesUpdate<'user_private'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicUserPrivate = Omit<UserPrivateRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type UserPrivateFormData = Partial<UserPrivateInsert>;

