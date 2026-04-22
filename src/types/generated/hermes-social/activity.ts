// =====================================================
// FILE: types/generated/hermes-social/activity.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:04.917Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ActivityRow = Tables<'activity'>;
export type ActivityInsert = TablesInsert<'activity'>;
export type ActivityUpdate = TablesUpdate<'activity'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicActivity = Omit<ActivityRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ActivityFormData = Partial<ActivityInsert>;

