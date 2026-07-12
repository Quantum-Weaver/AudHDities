// =====================================================
// FILE: validators/vessel_config.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// VesselConfig SCHEMAS
// =====================================================

export const VesselConfigRowSchema = z.object({
  autoplay_audio: z.boolean(),
  autoplay_video: z.boolean(),
  content_warnings: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  default_ware_view: z.string(),
  default_work_view: z.string(),
  density: z.string(),
  discovery_hints: z.boolean(),
  discovery_map_style: z.string(),
  discovery_show_undiscovered: z.boolean(),
  dyslexia_font: z.boolean(),
  font_scale: z.number(),
  herald_channel: z.enum(ENUM_VALUES.notificationChannel),
  herald_digest: z.enum(ENUM_VALUES.heraldDigest),
  herald_sounds: z.boolean(),
  heralds_enabled: z.boolean(),
  high_contrast: z.boolean(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  language: z.string(),
  reduce_motion: z.boolean(),
  reduce_transparency: z.boolean(),
  theme: z.enum(ENUM_VALUES.displayTheme),
  timezone: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const VesselConfigInsertSchema = z.object({
  autoplay_audio: z.boolean().optional(),
  autoplay_video: z.boolean().optional(),
  content_warnings: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_ware_view: z.string().optional(),
  default_work_view: z.string().optional(),
  density: z.string().optional(),
  discovery_hints: z.boolean().optional(),
  discovery_map_style: z.string().optional(),
  discovery_show_undiscovered: z.boolean().optional(),
  dyslexia_font: z.boolean().optional(),
  font_scale: z.number().optional(),
  herald_channel: z.enum(ENUM_VALUES.notificationChannel).optional(),
  herald_digest: z.enum(ENUM_VALUES.heraldDigest).optional(),
  herald_sounds: z.boolean().optional(),
  heralds_enabled: z.boolean().optional(),
  high_contrast: z.boolean().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string(),
  language: z.string().optional(),
  reduce_motion: z.boolean().optional(),
  reduce_transparency: z.boolean().optional(),
  theme: z.enum(ENUM_VALUES.displayTheme).optional(),
  timezone: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const VesselConfigUpdateSchema = z.object({
  autoplay_audio: z.boolean().optional(),
  autoplay_video: z.boolean().optional(),
  content_warnings: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_ware_view: z.string().optional(),
  default_work_view: z.string().optional(),
  density: z.string().optional(),
  discovery_hints: z.boolean().optional(),
  discovery_map_style: z.string().optional(),
  discovery_show_undiscovered: z.boolean().optional(),
  dyslexia_font: z.boolean().optional(),
  font_scale: z.number().optional(),
  herald_channel: z.enum(ENUM_VALUES.notificationChannel).optional(),
  herald_digest: z.enum(ENUM_VALUES.heraldDigest).optional(),
  herald_sounds: z.boolean().optional(),
  heralds_enabled: z.boolean().optional(),
  high_contrast: z.boolean().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  language: z.string().optional(),
  reduce_motion: z.boolean().optional(),
  reduce_transparency: z.boolean().optional(),
  theme: z.enum(ENUM_VALUES.displayTheme).optional(),
  timezone: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VesselConfigRowInput = z.infer<typeof VesselConfigRowSchema>;
export type VesselConfigInsertInput = z.infer<typeof VesselConfigInsertSchema>;
export type VesselConfigUpdateInput = z.infer<typeof VesselConfigUpdateSchema>;
