// =====================================================
// FILE: types/generated/hephaestus-infrastructure/systems.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.447Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SystemsRow = Tables<'systems'>;
export type SystemsInsert = TablesInsert<'systems'>;
export type SystemsUpdate = TablesUpdate<'systems'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSystems = Omit<SystemsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SystemsFormData = Partial<SystemsInsert>;

