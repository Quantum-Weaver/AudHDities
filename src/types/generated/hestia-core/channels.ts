// =====================================================
// FILE: types/generated/hestia-core/channels.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.103Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ChannelsRow = Tables<'channels'>;
export type ChannelsInsert = TablesInsert<'channels'>;
export type ChannelsUpdate = TablesUpdate<'channels'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicChannels = Omit<ChannelsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ChannelsFormData = Partial<ChannelsInsert>;

