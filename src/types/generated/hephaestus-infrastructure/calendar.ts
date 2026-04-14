// =====================================================
// FILE: types/generated/hephaestus-infrastructure/calendar.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:29.997Z
// SOURCE: database.types.ts lines 798-859
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type CalendarEventType = Database['public']['Enums']['calendar_event_type'];
export type CalendarVisibility = Database['public']['Enums']['calendar_visibility'];

// =====================================================
// CORE TYPES
// =====================================================

export type CalendarRow = Database['public']['Tables']['calendar']['Row'];
export type CalendarInsert = Database['public']['Tables']['calendar']['Insert'];
export type CalendarUpdate = Database['public']['Tables']['calendar']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of calendar
 */
export interface PublicCalendar {
  all_day: boolean | null;
  "created_at": "string | null";
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
  "updated_at": "string | null";
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

