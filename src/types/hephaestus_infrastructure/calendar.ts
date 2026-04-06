// =====================================================
// FILE: types/hephaestus_infrastructure/calendar.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T21:55:12.931Z
// SOURCE: database.types.ts lines 687-748
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type CouncilHouse = Database['public']['Enums']['council_house'];
export type CalendarEventType = Database['public']['Enums']['calendar_event_type'];
export type CalendarVisibility = Database['public']['Enums']['calendar_visibility'];

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

