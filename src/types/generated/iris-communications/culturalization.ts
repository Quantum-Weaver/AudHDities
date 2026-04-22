// =====================================================
// FILE: types/generated/iris-communications/culturalization.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.253Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CulturalizationRow = Tables<'culturalization'>;
export type CulturalizationInsert = TablesInsert<'culturalization'>;
export type CulturalizationUpdate = TablesUpdate<'culturalization'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCulturalization = Omit<CulturalizationRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CulturalizationFormData = Partial<CulturalizationInsert>;

