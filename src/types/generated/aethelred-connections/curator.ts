// =====================================================
// FILE: types/generated/aethelred-connections/curator.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.267Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CuratorRow = Tables<'curator'>;
export type CuratorInsert = TablesInsert<'curator'>;
export type CuratorUpdate = TablesUpdate<'curator'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCurator = Omit<CuratorRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CuratorFormData = Partial<CuratorInsert>;

