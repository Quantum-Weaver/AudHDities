// =====================================================
// FILE: types/generated/mnemosyne-assessment/anchor_events.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-08-01T18:15:38.570Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type AnchorEventsRow = Tables<'anchor_events'>;
export type AnchorEventsInsert = TablesInsert<'anchor_events'>;
export type AnchorEventsUpdate = TablesUpdate<'anchor_events'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of anchor_events
 */
export interface PublicAnchorEvents {
  anchor_id: string | null;
  completed_at: string | null;
  created_at: string;
  created_by: string;
  event_date: string;
  event_name: string;
  event_time: string | null;
  event_type: string | null;
  gentle_reminder: boolean;
  id: string;
  is_completed: boolean;
  notes: string | null;
  recurrence: string;
  recurrence_rule: string | null;
  reminder_days_before: number;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for anchor_events
 * All fields are optional for partial updates
 */
export interface AnchorEventsFormData {
  anchor_id?: string | null;
  completed_at?: string | null;
  created_at?: string;
  created_by?: string;
  event_date?: string;
  event_name?: string;
  event_time?: string | null;
  event_type?: string | null;
  gentle_reminder?: boolean;
  id?: string;
  is_completed?: boolean;
  notes?: string | null;
  recurrence?: string;
  recurrence_rule?: string | null;
  reminder_days_before?: number;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for anchor_events
 */
export interface AnchorEventsValidationResult {
  valid: boolean;
  errors: {
    anchor_id?: string;
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    event_date?: string;
    event_name?: string;
    event_time?: string;
    event_type?: string;
    gentle_reminder?: string;
    id?: string;
    is_completed?: string;
    notes?: string;
    recurrence?: string;
    recurrence_rule?: string;
    reminder_days_before?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

