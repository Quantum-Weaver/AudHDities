// =====================================================
// FILE: types/generated/aethelred-connections/hearth_keeper.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.444Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type HearthKeeperRow = Tables<'hearth_keeper'>;
export type HearthKeeperInsert = TablesInsert<'hearth_keeper'>;
export type HearthKeeperUpdate = TablesUpdate<'hearth_keeper'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicHearthKeeper = Omit<HearthKeeperRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type HearthKeeperFormData = Partial<HearthKeeperInsert>;

