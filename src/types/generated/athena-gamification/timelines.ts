// =====================================================
// FILE: types/generated/athena-gamification/timelines.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-04-30T15:32:13.793Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TimelineEventType = Enums<'timeline_event_type'>;

export type TimelinesRow = Tables<'timelines'>;
export type TimelinesInsert = TablesInsert<'timelines'>;
export type TimelinesUpdate = TablesUpdate<'timelines'>;

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
  occurred_at: string;
  significance_score: number | null;
  timelines_id: string;
  title: string;
  updated_by: string | null;
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
  occurred_at?: string;
  significance_score?: number | null;
  timelines_id?: string;
  title?: string;
  updated_by?: string | null;
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
    occurred_at?: string;
    significance_score?: string;
    timelines_id?: string;
    title?: string;
    updated_by?: string;
    user_id?: string;
  };
}

