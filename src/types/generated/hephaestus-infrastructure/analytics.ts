// =====================================================
// FILE: types/generated/hephaestus-infrastructure/analytics.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.575Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AnalyticsCategory = Database['public']['Enums']['analytics_category'];
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
  created_at: string | null;
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

