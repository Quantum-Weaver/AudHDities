// =====================================================
// FILE: types/generated/prometheus-stage/events.ts
// HANDLING: full_crud
// DEITY: prometheus-stage
// GENERATED: 2026-08-01T16:03:06.484Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type EventsRow = Tables<'events'>;
export type EventsInsert = TablesInsert<'events'>;
export type EventsUpdate = TablesUpdate<'events'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of events
 */
export interface PublicEvents {
  created_at: string;
  created_by: string | null;
  description: string | null;
  event_type: string | null;
  genre: string | null;
  id: string;
  is_live: boolean;
  is_recorded: boolean;
  performer_id: string | null;
  recorded_at: string | null;
  recording_work_id: string | null;
  scheduled_for: string | null;
  slug: string;
  started_at: string | null;
  status: ContentStatus;
  title: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for events
 * All fields are optional for partial updates
 */
export interface EventsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  event_type?: string | null;
  genre?: string | null;
  id?: string;
  is_live?: boolean;
  is_recorded?: boolean;
  performer_id?: string | null;
  recorded_at?: string | null;
  recording_work_id?: string | null;
  scheduled_for?: string | null;
  slug?: string;
  started_at?: string | null;
  status?: ContentStatus;
  title?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for events
 */
export interface EventsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    event_type?: string;
    genre?: string;
    id?: string;
    is_live?: string;
    is_recorded?: string;
    performer_id?: string;
    recorded_at?: string;
    recording_work_id?: string;
    scheduled_for?: string;
    slug?: string;
    started_at?: string;
    status?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

