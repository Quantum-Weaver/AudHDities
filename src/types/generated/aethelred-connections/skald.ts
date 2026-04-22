// =====================================================
// FILE: types/generated/aethelred-connections/skald.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.285Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SkaldRow = Tables<'skald'>;
export type SkaldInsert = TablesInsert<'skald'>;
export type SkaldUpdate = TablesUpdate<'skald'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSkald = Omit<SkaldRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SkaldFormData = Partial<SkaldInsert>;

