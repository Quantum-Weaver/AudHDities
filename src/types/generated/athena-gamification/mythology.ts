// =====================================================
// FILE: types/generated/athena-gamification/mythology.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.617Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type MythologyRow = Tables<'mythology'>;
export type MythologyInsert = TablesInsert<'mythology'>;
export type MythologyUpdate = TablesUpdate<'mythology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicMythology = Omit<MythologyRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type MythologyFormData = Partial<MythologyInsert>;

