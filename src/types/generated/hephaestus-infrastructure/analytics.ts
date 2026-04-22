// =====================================================
// FILE: types/generated/hephaestus-infrastructure/analytics.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.018Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AnalyticsRow = Tables<'analytics'>;
export type AnalyticsInsert = TablesInsert<'analytics'>;
export type AnalyticsUpdate = TablesUpdate<'analytics'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAnalytics = Omit<AnalyticsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AnalyticsFormData = Partial<AnalyticsInsert>;

