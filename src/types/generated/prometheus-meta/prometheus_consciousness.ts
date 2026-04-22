// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_consciousness.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.879Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusConsciousnessRow = Tables<'prometheus_consciousness'>;
export type PrometheusConsciousnessInsert = TablesInsert<'prometheus_consciousness'>;
export type PrometheusConsciousnessUpdate = TablesUpdate<'prometheus_consciousness'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusConsciousness = Omit<PrometheusConsciousnessRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusConsciousnessFormData = Partial<PrometheusConsciousnessInsert>;

