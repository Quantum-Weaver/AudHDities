// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_patterns.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.922Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusPatternsRow = Tables<'prometheus_patterns'>;
export type PrometheusPatternsInsert = TablesInsert<'prometheus_patterns'>;
export type PrometheusPatternsUpdate = TablesUpdate<'prometheus_patterns'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusPatterns = Omit<PrometheusPatternsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusPatternsFormData = Partial<PrometheusPatternsInsert>;

