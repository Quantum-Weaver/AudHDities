// =====================================================
// FILE: types/generated/athena-gamification/timelines.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.756Z
// SOURCE: database.types.ts lines 6218-6271
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TimelineEventType = Database['public']['Enums']['timeline_event_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type TimelinesRow = Database['public']['Tables']['timelines']['Row'];
export type TimelinesInsert = Database['public']['Tables']['timelines']['Insert'];
export type TimelinesUpdate = Database['public']['Tables']['timelines']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of timelines
 */
export interface PublicTimelines {
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  event_id: string | null;
  event_type: TimelineEventType;
  id: string;
  occurred_at: string;
  significance_score: number | null;
  title: string;
  user_id: string;
}

/**
 * Form data for timelines
 * All fields are optional for partial updates
 */
export interface TimelinesFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  event_id?: string | null;
  event_type?: TimelineEventType;
  id?: string;
  occurred_at?: string;
  significance_score?: number | null;
  title?: string;
  user_id?: string;
}

/**
 * Validation result for timelines
 */
export interface TimelinesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    event_id?: string;
    event_type?: string;
    id?: string;
    occurred_at?: string;
    significance_score?: string;
    title?: string;
    user_id?: string;
  };
}

