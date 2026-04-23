// =====================================================
// FILE: constants/generated/aethelred-connections/supabase_status.ts
// GENERATED: 2026-04-23T02:14:54.247Z
// SOURCE: Constants.public.Enums.supabase_status
// VALUES: 3 entries
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];
