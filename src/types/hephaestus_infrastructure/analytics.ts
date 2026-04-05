// =====================================================
// FILE: types/hephaestus_infrastructure/analytics.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T19:46:32.915Z
// SOURCE: database.types.ts lines 417-463
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AnalyticsCategory = Database['public']['Enums']['analytics_category'];

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
  created_at: string | null
  event_category: AnalyticsCategory
  event_name: string
  id: string
  metadata: Json | null
  session_id: string | null
  user_id: string | null
  value: number | null
}

/**
 * Form data for analytics
 * All fields are optional for partial updates
 */
export interface AnalyticsFormData {
  created_at?: string | null;
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

