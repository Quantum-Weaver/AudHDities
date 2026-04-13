// =====================================================
// FILE: constants/aethelred-connections/supabase_status.ts
// GENERATED: 2026-04-13T01:15:57.367Z
// SOURCE: Constants.public.Enums.supabase_status
// VALUES: 3 entries
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];
