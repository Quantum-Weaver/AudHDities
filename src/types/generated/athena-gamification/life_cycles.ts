// =====================================================
// FILE: types/generated/athena-gamification/life_cycles.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.524Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type LifeCyclesRow = Tables<'life_cycles'>;
export type LifeCyclesInsert = TablesInsert<'life_cycles'>;
export type LifeCyclesUpdate = TablesUpdate<'life_cycles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicLifeCycles = Omit<LifeCyclesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type LifeCyclesFormData = Partial<LifeCyclesInsert>;

