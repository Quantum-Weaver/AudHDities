// =====================================================
// FILE: types/generated/hephaestus-infrastructure/analytics.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T04:17:46.972Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AnalyticsCategory = Enums<'analytics_category'>;

export type AnalyticsRow = Tables<'analytics'>;
export type AnalyticsInsert = TablesInsert<'analytics'>;
export type AnalyticsUpdate = TablesUpdate<'analytics'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of analytics
 * Excludes sensitive fields: ip_address, user_agent
 */
export interface PublicAnalytics {
  analytics_id: string;
  created_at: string | null;
  created_by: string | null;
  event_category: AnalyticsCategory;
  event_name: string;
  metadata: Json | null;
  session_id: string | null;
  updated_at: string | null;
  updated_by: string | null;
  user_id: string | null;
  value: number | null;
}

/**
 * Form data for analytics
 * All fields are optional for partial updates
 */
export interface AnalyticsFormData {
  analytics_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  event_category?: AnalyticsCategory;
  event_name?: string;
  ip_address?: unknown;
  metadata?: Json | null;
  session_id?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  user_agent?: string | null;
  user_id?: string | null;
  value?: number | null;
}

/**
 * Validation result for analytics
 */
export interface AnalyticsValidationResult {
  valid: boolean;
  errors: {
    analytics_id?: string;
    created_at?: string;
    created_by?: string;
    event_category?: string;
    event_name?: string;
    ip_address?: string;
    metadata?: string;
    session_id?: string;
    updated_at?: string;
    updated_by?: string;
    user_agent?: string;
    user_id?: string;
    value?: string;
  };
}

