// =====================================================
// FILE: types/generated/hestia-core/system_timeline_events.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-23T02:14:53.669Z
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
  description: string | null;
  event_type: string;
  id: string;
  metadata: Json | null;
  severity: string | null;
  source: string | null;
  title: string;
}

/**
 * Form data for system_timeline_events
 * All fields are optional for partial updates
 */
export interface SystemTimelineEventsFormData {
  created_at?: string;
  description?: string | null;
  event_type?: string;
  id?: string;
  metadata?: Json | null;
  severity?: string | null;
  source?: string | null;
  title?: string;
}

/**
 * Validation result for system_timeline_events
 */
export interface SystemTimelineEventsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    description?: string;
    event_type?: string;
    id?: string;
    metadata?: string;
    severity?: string;
    source?: string;
    title?: string;
  };
}

