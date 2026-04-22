// =====================================================
// FILE: types/generated/athena-gamification/timelines.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.479Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type TimelinesRow = Tables<'timelines'>;
export type TimelinesInsert = TablesInsert<'timelines'>;
export type TimelinesUpdate = TablesUpdate<'timelines'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicTimelines = Omit<TimelinesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type TimelinesFormData = Partial<TimelinesInsert>;

