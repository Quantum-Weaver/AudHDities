// =====================================================
// FILE: types/generated/hephaestus-infrastructure/maintenance.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.562Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type MaintenanceRow = Tables<'maintenance'>;
export type MaintenanceInsert = TablesInsert<'maintenance'>;
export type MaintenanceUpdate = TablesUpdate<'maintenance'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicMaintenance = Omit<MaintenanceRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type MaintenanceFormData = Partial<MaintenanceInsert>;

