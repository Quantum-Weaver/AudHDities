// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_generations.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.895Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusGenerationsRow = Tables<'prometheus_generations'>;
export type PrometheusGenerationsInsert = TablesInsert<'prometheus_generations'>;
export type PrometheusGenerationsUpdate = TablesUpdate<'prometheus_generations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusGenerations = Omit<PrometheusGenerationsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusGenerationsFormData = Partial<PrometheusGenerationsInsert>;

