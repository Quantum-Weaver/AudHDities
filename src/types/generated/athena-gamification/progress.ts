// =====================================================
// FILE: types/generated/athena-gamification/progress.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.835Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ProgressRow = Tables<'progress'>;
export type ProgressInsert = TablesInsert<'progress'>;
export type ProgressUpdate = TablesUpdate<'progress'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicProgress = Omit<ProgressRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ProgressFormData = Partial<ProgressInsert>;

