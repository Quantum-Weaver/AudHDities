// =====================================================
// FILE: constants/generated/aethelred-connections/supabase_status.ts
// GENERATED: 2026-04-13T21:47:20.915Z
// SOURCE: Constants.public.Enums.supabase_status
// =====================================================

export const SUPABASE_STATUS = {
  CONNECTED: 'connected',
  DEGRADED: 'degraded',
  DISCONNECTED: 'disconnected',
} as const;

export type SupabaseStatus = typeof SUPABASE_STATUS[keyof typeof SUPABASE_STATUS];