// =====================================================
// FILE: types/generated/aethelred-connections/executioner.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.369Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ExecutionerRow = Tables<'executioner'>;
export type ExecutionerInsert = TablesInsert<'executioner'>;
export type ExecutionerUpdate = TablesUpdate<'executioner'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicExecutioner = Omit<ExecutionerRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ExecutionerFormData = Partial<ExecutionerInsert>;

