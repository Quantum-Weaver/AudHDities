// =====================================================
// FILE: types/generated/hestia-core/system_timeline_events.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.860Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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

