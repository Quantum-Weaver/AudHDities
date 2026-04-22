// =====================================================
// FILE: types/generated/hephaestus-infrastructure/calendar.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.080Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CalendarRow = Tables<'calendar'>;
export type CalendarInsert = TablesInsert<'calendar'>;
export type CalendarUpdate = TablesUpdate<'calendar'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCalendar = Omit<CalendarRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CalendarFormData = Partial<CalendarInsert>;

