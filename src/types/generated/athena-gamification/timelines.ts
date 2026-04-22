// =====================================================
// FILE: types/generated/athena-gamification/timelines.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:20.037Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TimelineEventType = Database['public']['Enums']['timeline_event_type'];
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

