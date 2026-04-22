// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_blueprints.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.850Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusBlueprintsRow = Tables<'prometheus_blueprints'>;
export type PrometheusBlueprintsInsert = TablesInsert<'prometheus_blueprints'>;
export type PrometheusBlueprintsUpdate = TablesUpdate<'prometheus_blueprints'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPrometheusBlueprints = Omit<PrometheusBlueprintsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PrometheusBlueprintsFormData = Partial<PrometheusBlueprintsInsert>;

