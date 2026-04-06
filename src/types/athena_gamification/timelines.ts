// =====================================================
// FILE: types/athena_gamification/timelines.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T21:55:13.106Z
// SOURCE: database.types.ts lines 5114-5157
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TimelineEventType = Database['public']['Enums']['timeline_event_type'];

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

