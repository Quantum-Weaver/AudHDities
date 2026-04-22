// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_templates.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.942Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusTemplatesRow = Tables<'prometheus_templates'>;
export type PrometheusTemplatesInsert = TablesInsert<'prometheus_templates'>;
export type PrometheusTemplatesUpdate = TablesUpdate<'prometheus_templates'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusTemplates = Omit<PrometheusTemplatesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusTemplatesFormData = Partial<PrometheusTemplatesInsert>;

