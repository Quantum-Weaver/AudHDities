// =====================================================
// FILE: constants/supabase_status.ts
// GENERATED: 2026-04-05T19:46:33.387Z
// SOURCE: Constants.public.Enums.supabase_status
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];
