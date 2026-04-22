// =====================================================
// FILE: types/generated/hermes-social/reactions.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.016Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ReactionsRow = Tables<'reactions'>;
export type ReactionsInsert = TablesInsert<'reactions'>;
export type ReactionsUpdate = TablesUpdate<'reactions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicReactions = Omit<ReactionsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ReactionsFormData = Partial<ReactionsInsert>;

