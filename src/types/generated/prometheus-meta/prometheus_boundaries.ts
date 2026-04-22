// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_boundaries.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.864Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusBoundariesRow = Tables<'prometheus_boundaries'>;
export type PrometheusBoundariesInsert = TablesInsert<'prometheus_boundaries'>;
export type PrometheusBoundariesUpdate = TablesUpdate<'prometheus_boundaries'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusBoundaries = Omit<PrometheusBoundariesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusBoundariesFormData = Partial<PrometheusBoundariesInsert>;

