// =====================================================
// FILE: types/generated/themis-governance/reports.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.055Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ReportsRow = Tables<'reports'>;
export type ReportsInsert = TablesInsert<'reports'>;
export type ReportsUpdate = TablesUpdate<'reports'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicReports = Omit<ReportsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ReportsFormData = Partial<ReportsInsert>;

