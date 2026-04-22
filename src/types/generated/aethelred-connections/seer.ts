// =====================================================
// FILE: types/generated/aethelred-connections/seer.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.253Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SeerRow = Tables<'seer'>;
export type SeerInsert = TablesInsert<'seer'>;
export type SeerUpdate = TablesUpdate<'seer'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSeer = Omit<SeerRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SeerFormData = Partial<SeerInsert>;

