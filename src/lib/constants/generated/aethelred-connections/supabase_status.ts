// =====================================================
// FILE: constants/generated/aethelred-connections/supabase_status.ts
// GENERATED: 2026-04-22T05:48:51.352Z
// SOURCE: Constants.public.Enums.supabase_status
// VALUES: 3 entries
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];
