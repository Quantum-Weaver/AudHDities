// =====================================================
// FILE: types/generated/hephaestus-infrastructure/system_timeline_events.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-05-01T03:24:42.233Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type SystemTimelineEventsRow = Tables<'system_timeline_events'>;
export type SystemTimelineEventsInsert = TablesInsert<'system_timeline_events'>;
export type SystemTimelineEventsUpdate = TablesUpdate<'system_timeline_events'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of system_timeline_events
 */
export interface PublicSystemTimelineEvents {
  created_at: string;
  created_by: string | null;
  description: string | null;
  event_type: string;
  metadata: Json | null;
  severity: string | null;
  source: string | null;
  system_timeline_events_id: string;
  title: string;
  updated_at: string | null;
}

/**
 * Form data for system_timeline_events
 * All fields are optional for partial updates
 */
export interface SystemTimelineEventsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  event_type?: string;
  metadata?: Json | null;
  severity?: string | null;
  source?: string | null;
  system_timeline_events_id?: string;
  title?: string;
  updated_at?: string | null;
}

/**
 * Validation result for system_timeline_events
 */
export interface SystemTimelineEventsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    event_type?: string;
    metadata?: string;
    severity?: string;
    source?: string;
    system_timeline_events_id?: string;
    title?: string;
    updated_at?: string;
  };
}

