// =====================================================
// FILE: constants/supabase_status.ts
// GENERATED: 2026-04-05T21:55:13.287Z
// SOURCE: Constants.public.Enums.supabase_status
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];
