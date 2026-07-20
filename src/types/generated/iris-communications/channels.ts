// =====================================================
// FILE: types/generated/iris-communications/channels.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-20T04:39:10.397Z
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

export type ChannelsRow = Tables<'channels'>;
export type ChannelsInsert = TablesInsert<'channels'>;
export type ChannelsUpdate = TablesUpdate<'channels'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of channels
 */
export interface PublicChannels {
  channel_type: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  is_public: boolean;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for channels
 * All fields are optional for partial updates
 */
export interface ChannelsFormData {
  channel_type?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  is_public?: boolean;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for channels
 */
export interface ChannelsValidationResult {
  valid: boolean;
  errors: {
    channel_type?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    is_public?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

