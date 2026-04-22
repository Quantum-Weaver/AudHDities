// =====================================================
// FILE: types/generated/iris-communications/customs.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.280Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CustomsRow = Tables<'customs'>;
export type CustomsInsert = TablesInsert<'customs'>;
export type CustomsUpdate = TablesUpdate<'customs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCustoms = Omit<CustomsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CustomsFormData = Partial<CustomsInsert>;

