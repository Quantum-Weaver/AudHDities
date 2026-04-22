// =====================================================
// FILE: types/generated/iris-communications/regions.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.029Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type RegionsRow = Tables<'regions'>;
export type RegionsInsert = TablesInsert<'regions'>;
export type RegionsUpdate = TablesUpdate<'regions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicRegions = Omit<RegionsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type RegionsFormData = Partial<RegionsInsert>;

