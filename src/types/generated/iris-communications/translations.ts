// =====================================================
// FILE: types/generated/iris-communications/translations.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.514Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type TranslationsRow = Tables<'translations'>;
export type TranslationsInsert = TablesInsert<'translations'>;
export type TranslationsUpdate = TablesUpdate<'translations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicTranslations = Omit<TranslationsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type TranslationsFormData = Partial<TranslationsInsert>;

