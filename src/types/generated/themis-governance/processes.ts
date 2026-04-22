// =====================================================
// FILE: types/generated/themis-governance/processes.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.801Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ProcessesRow = Tables<'processes'>;
export type ProcessesInsert = TablesInsert<'processes'>;
export type ProcessesUpdate = TablesUpdate<'processes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicProcesses = Omit<ProcessesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ProcessesFormData = Partial<ProcessesInsert>;

