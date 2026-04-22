// =====================================================
// FILE: types/generated/iris-communications/languages.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.462Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type LanguagesRow = Tables<'languages'>;
export type LanguagesInsert = TablesInsert<'languages'>;
export type LanguagesUpdate = TablesUpdate<'languages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicLanguages = Omit<LanguagesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type LanguagesFormData = Partial<LanguagesInsert>;

