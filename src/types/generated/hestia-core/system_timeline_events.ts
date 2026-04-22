// =====================================================
// FILE: types/generated/hestia-core/system_timeline_events.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.430Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SystemTimelineEventsRow = Tables<'system_timeline_events'>;
export type SystemTimelineEventsInsert = TablesInsert<'system_timeline_events'>;
export type SystemTimelineEventsUpdate = TablesUpdate<'system_timeline_events'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSystemTimelineEvents = Omit<SystemTimelineEventsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SystemTimelineEventsFormData = Partial<SystemTimelineEventsInsert>;

