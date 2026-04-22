// =====================================================
// FILE: types/generated/themis-governance/rate_limits.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.003Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type RateLimitsRow = Tables<'rate_limits'>;
export type RateLimitsInsert = TablesInsert<'rate_limits'>;
export type RateLimitsUpdate = TablesUpdate<'rate_limits'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicRateLimits = Omit<RateLimitsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type RateLimitsFormData = Partial<RateLimitsInsert>;

