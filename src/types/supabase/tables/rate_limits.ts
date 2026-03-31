// src/types/supabase/tables/rate_limits.ts
import type { Database } from '../database.types';

export type RateLimit = Database['public']['Tables']['rate_limits']['Row'];
export type RateLimitInsert = Database['public']['Tables']['rate_limits']['Insert'];
export type RateLimitUpdate = Database['public']['Tables']['rate_limits']['Update'];

export interface RateLimitWithRelations extends RateLimit {
  // No foreign keys - standalone table
}

export const rateLimitDefaults = {
  request_count: 0,
  window_start: null,
} as const;