// =====================================================
// FILE: types/generated/hestia-core/system_timeline_events.ts
// HANDLING: full_crud
// GENERATED: 2026-04-19T20:39:34.681Z
// SOURCE: database.types.ts lines 6349-6381
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SystemTimelineEventsRow = Database['public']['Tables']['system_timeline_events']['Row'];
export type SystemTimelineEventsInsert = Database['public']['Tables']['system_timeline_events']['Insert'];
export type SystemTimelineEventsUpdate = Database['public']['Tables']['system_timeline_events']['Update'];

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

