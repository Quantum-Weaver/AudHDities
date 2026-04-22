// =====================================================
// FILE: types/generated/athena-gamification/scenes.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.181Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ScenesRow = Tables<'scenes'>;
export type ScenesInsert = TablesInsert<'scenes'>;
export type ScenesUpdate = TablesUpdate<'scenes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicScenes = Omit<ScenesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ScenesFormData = Partial<ScenesInsert>;

