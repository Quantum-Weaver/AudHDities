// =====================================================
// FILE: types/generated/iris-communications/localization.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.540Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type LocalizationRow = Tables<'localization'>;
export type LocalizationInsert = TablesInsert<'localization'>;
export type LocalizationUpdate = TablesUpdate<'localization'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicLocalization = Omit<LocalizationRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type LocalizationFormData = Partial<LocalizationInsert>;

