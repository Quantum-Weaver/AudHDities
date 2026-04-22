// =====================================================
// FILE: types/generated/themis-governance/applications.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.030Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ApplicationsRow = Tables<'applications'>;
export type ApplicationsInsert = TablesInsert<'applications'>;
export type ApplicationsUpdate = TablesUpdate<'applications'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicApplications = Omit<ApplicationsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ApplicationsFormData = Partial<ApplicationsInsert>;

