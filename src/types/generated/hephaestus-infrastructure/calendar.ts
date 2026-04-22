// =====================================================
// FILE: types/generated/hephaestus-infrastructure/calendar.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.634Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type CalendarEventType = Database['public']['Enums']['calendar_event_type'];
export type CalendarVisibility = Database['public']['Enums']['calendar_visibility'];
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

