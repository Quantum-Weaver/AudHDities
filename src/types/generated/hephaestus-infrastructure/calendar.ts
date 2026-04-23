// =====================================================
// FILE: types/generated/hephaestus-infrastructure/calendar.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-23T02:14:52.630Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Enums<'council_house'>;
export type CalendarEventType = Enums<'calendar_event_type'>;
export type CalendarVisibility = Enums<'calendar_visibility'>;

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
  all_day: boolean | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  end_date: string | null;
  house: CouncilHouse | null;
  id: string;
  is_active: boolean | null;
  primary_house: CouncilHouse | null;
  recurrence: Json | null;
  start_date: string;
  title: string;
  type: CalendarEventType;
  updated_at: string | null;
  visibility: CalendarVisibility | null;
}

/**
 * Form data for calendar
 * All fields are optional for partial updates
 */
export interface CalendarFormData {
  all_day?: boolean | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  end_date?: string | null;
  house?: CouncilHouse | null;
  id?: string;
  is_active?: boolean | null;
  primary_house?: CouncilHouse | null;
  recurrence?: Json | null;
  start_date?: string;
  title?: string;
  type?: CalendarEventType;
  updated_at?: string | null;
  visibility?: CalendarVisibility | null;
}

/**
 * Validation result for calendar
 */
export interface CalendarValidationResult {
  valid: boolean;
  errors: {
    all_day?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    end_date?: string;
    house?: string;
    id?: string;
    is_active?: string;
    primary_house?: string;
    recurrence?: string;
    start_date?: string;
    title?: string;
    type?: string;
    updated_at?: string;
    visibility?: string;
  };
}

