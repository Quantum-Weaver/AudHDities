// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_memories.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.908Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusMemoriesRow = Tables<'prometheus_memories'>;
export type PrometheusMemoriesInsert = TablesInsert<'prometheus_memories'>;
export type PrometheusMemoriesUpdate = TablesUpdate<'prometheus_memories'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusMemories = Omit<PrometheusMemoriesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusMemoriesFormData = Partial<PrometheusMemoriesInsert>;

