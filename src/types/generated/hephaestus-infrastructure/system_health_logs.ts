// =====================================================
// FILE: types/generated/hephaestus-infrastructure/system_health_logs.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.413Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SystemHealthLogsRow = Tables<'system_health_logs'>;
export type SystemHealthLogsInsert = TablesInsert<'system_health_logs'>;
export type SystemHealthLogsUpdate = TablesUpdate<'system_health_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSystemHealthLogs = Omit<SystemHealthLogsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SystemHealthLogsFormData = Partial<SystemHealthLogsInsert>;

