// =====================================================
// FILE: types/generated/hestia-core/vessel_config.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:08:02.251Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type NotificationChannel = Enums<'notification_channel'>;
export type HeraldDigest = Enums<'herald_digest'>;
export type DisplayTheme = Enums<'display_theme'>;

export type VesselConfigRow = Tables<'vessel_config'>;
export type VesselConfigInsert = TablesInsert<'vessel_config'>;
export type VesselConfigUpdate = TablesUpdate<'vessel_config'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vessel_config
 */
export interface PublicVesselConfig {
  autoplay_audio: boolean;
  autoplay_video: boolean;
  bubble_daily_max: number;
  bubble_hourly_max: number;
  ceremony_arrival: boolean;
  ceremony_farewell: boolean;
  content_warnings: string;
  created_at: string;
  created_by: string | null;
  default_ware_view: string;
  default_work_view: string;
  density: string;
  discovery_hints: boolean;
  discovery_map_style: string;
  discovery_show_undiscovered: boolean;
  dyslexia_font: boolean;
  environment_preference: string;
  font_scale: number;
  herald_channel: NotificationChannel;
  herald_digest: HeraldDigest;
  herald_sounds: boolean;
  heralds_enabled: boolean;
  high_contrast: boolean;
  icon_emoji: string | null;
  id: string;
  language: string;
  reduce_motion: boolean;
  reduce_transparency: boolean;
  theme: DisplayTheme;
  timezone: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for vessel_config
 * All fields are optional for partial updates
 */
export interface VesselConfigFormData {
  autoplay_audio?: boolean;
  autoplay_video?: boolean;
  bubble_daily_max?: number;
  bubble_hourly_max?: number;
  ceremony_arrival?: boolean;
  ceremony_farewell?: boolean;
  content_warnings?: string;
  created_at?: string;
  created_by?: string | null;
  default_ware_view?: string;
  default_work_view?: string;
  density?: string;
  discovery_hints?: boolean;
  discovery_map_style?: string;
  discovery_show_undiscovered?: boolean;
  dyslexia_font?: boolean;
  environment_preference?: string;
  font_scale?: number;
  herald_channel?: NotificationChannel;
  herald_digest?: HeraldDigest;
  herald_sounds?: boolean;
  heralds_enabled?: boolean;
  high_contrast?: boolean;
  icon_emoji?: string | null;
  id?: string;
  language?: string;
  reduce_motion?: boolean;
  reduce_transparency?: boolean;
  theme?: DisplayTheme;
  timezone?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for vessel_config
 */
export interface VesselConfigValidationResult {
  valid: boolean;
  errors: {
    autoplay_audio?: string;
    autoplay_video?: string;
    bubble_daily_max?: string;
    bubble_hourly_max?: string;
    ceremony_arrival?: string;
    ceremony_farewell?: string;
    content_warnings?: string;
    created_at?: string;
    created_by?: string;
    default_ware_view?: string;
    default_work_view?: string;
    density?: string;
    discovery_hints?: string;
    discovery_map_style?: string;
    discovery_show_undiscovered?: string;
    dyslexia_font?: string;
    environment_preference?: string;
    font_scale?: string;
    herald_channel?: string;
    herald_digest?: string;
    herald_sounds?: string;
    heralds_enabled?: string;
    high_contrast?: string;
    icon_emoji?: string;
    id?: string;
    language?: string;
    reduce_motion?: string;
    reduce_transparency?: string;
    theme?: string;
    timezone?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

