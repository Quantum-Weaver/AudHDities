// =====================================================
// FILE: types/generated/hephaestus-infrastructure/calendar.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T16:03:06.307Z
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

export type CalendarRow = Tables<'calendar'>;
export type CalendarInsert = TablesInsert<'calendar'>;
export type CalendarUpdate = TablesUpdate<'calendar'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of calendar
 */
export interface PublicCalendar {
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  end_at: string | null;
  event_type: string | null;
  icon_url: string | null;
  id: string;
  is_recurring: boolean;
  location_text: string | null;
  location_uri: string | null;
  name: string;
  recurrence_rule: string | null;
  slug: string;
  start_at: string;
  status: ContentStatus;
  timezone: string;
  updated_at: string;
  updated_by: string | null;
  visibility_scope: string;
}

/**
 * Form data for calendar
 * All fields are optional for partial updates
 */
export interface CalendarFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  end_at?: string | null;
  event_type?: string | null;
  icon_url?: string | null;
  id?: string;
  is_recurring?: boolean;
  location_text?: string | null;
  location_uri?: string | null;
  name?: string;
  recurrence_rule?: string | null;
  slug?: string;
  start_at?: string;
  status?: ContentStatus;
  timezone?: string;
  updated_at?: string;
  updated_by?: string | null;
  visibility_scope?: string;
}

/**
 * Validation result for calendar
 */
export interface CalendarValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    end_at?: string;
    event_type?: string;
    icon_url?: string;
    id?: string;
    is_recurring?: string;
    location_text?: string;
    location_uri?: string;
    name?: string;
    recurrence_rule?: string;
    slug?: string;
    start_at?: string;
    status?: string;
    timezone?: string;
    updated_at?: string;
    updated_by?: string;
    visibility_scope?: string;
  };
}

