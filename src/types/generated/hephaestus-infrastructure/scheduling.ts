// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scheduling.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.201Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SchedulingRow = Tables<'scheduling'>;
export type SchedulingInsert = TablesInsert<'scheduling'>;
export type SchedulingUpdate = TablesUpdate<'scheduling'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicScheduling = Omit<SchedulingRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SchedulingFormData = Partial<SchedulingInsert>;

