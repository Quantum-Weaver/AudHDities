// =====================================================
// FILE: types/generated/themis-governance/admin_logs.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:04.937Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AdminLogsRow = Tables<'admin_logs'>;
export type AdminLogsInsert = TablesInsert<'admin_logs'>;
export type AdminLogsUpdate = TablesUpdate<'admin_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAdminLogs = Omit<AdminLogsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AdminLogsFormData = Partial<AdminLogsInsert>;

