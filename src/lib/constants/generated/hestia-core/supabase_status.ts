// =====================================================
// FILE: constants/generated/hestia-core/supabase_status.ts
// GENERATED: 2026-04-14T20:18:57.671Z
// SOURCE: Constants.public.Enums.supabase_status
// VALUES: 3 entries
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];
