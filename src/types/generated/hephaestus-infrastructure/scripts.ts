// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scripts.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.231Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptsRow = Tables<'scripts'>;
export type ScriptsInsert = TablesInsert<'scripts'>;
export type ScriptsUpdate = TablesUpdate<'scripts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicScripts = Omit<ScriptsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ScriptsFormData = Partial<ScriptsInsert>;

