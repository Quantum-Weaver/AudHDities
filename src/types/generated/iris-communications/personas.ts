// =====================================================
// FILE: types/generated/iris-communications/personas.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.774Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PersonasRow = Tables<'personas'>;
export type PersonasInsert = TablesInsert<'personas'>;
export type PersonasUpdate = TablesUpdate<'personas'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPersonas = Omit<PersonasRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PersonasFormData = Partial<PersonasInsert>;

