// =====================================================
// FILE: types/generated/hephaestus-infrastructure/analytics.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.806Z
// SOURCE: database.types.ts lines 477-533
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AnalyticsCategory = Database['public']['Enums']['analytics_category'];

// =====================================================
// CORE TYPES
// =====================================================

export type AnalyticsRow = Database['public']['Tables']['analytics']['Row'];
export type AnalyticsInsert = Database['public']['Tables']['analytics']['Insert'];
export type AnalyticsUpdate = Database['public']['Tables']['analytics']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of analytics
 * Excludes sensitive fields: ip_address, user_agent
 */
export interface PublicAnalytics {
  "created_at": "string | null";
  created_by: string | null;
  event_category: AnalyticsCategory;
  event_name: string;
  id: string;
  metadata: Json | null;
  session_id: string | null;
  user_id: string | null;
  value: number | null;
}

/**
 * Form data for analytics
 * All fields are optional for partial updates
 */
export interface AnalyticsFormData {
  created_at?: string | null;
  created_by?: string | null;
  event_category?: AnalyticsCategory;
  event_name?: string;
  id?: string;
  ip_address?: unknown;
  metadata?: Json | null;
  session_id?: string | null;
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
    created_at?: string;
    created_by?: string;
    event_category?: string;
    event_name?: string;
    id?: string;
    ip_address?: string;
    metadata?: string;
    session_id?: string;
    user_agent?: string;
    user_id?: string;
    value?: string;
  };
}

