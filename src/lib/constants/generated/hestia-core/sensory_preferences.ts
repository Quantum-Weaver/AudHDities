// =====================================================
// FILE: constants/generated/hestia-core/sensory_preferences.ts
// GENERATED: 2026-04-30T15:32:14.038Z
// SOURCE: Constants.public.Enums.sensory_preferences
// VALUES: 6 entries
// =====================================================

export const SENSORY_PREFERENCES = {
  REDUCED_MOTION: 'reduced_motion',
  HIGH_CONTRAST: 'high_contrast',
  FOCUS_MODE: 'focus_mode',
  SOUND_NOTIFICATIONS: 'sound_notifications',
  VISUAL_TIMERS: 'visual_timers',
  TL_DR_ENABLED: 'tl_dr_enabled',
} as const;

export type SensoryPreferences = typeof SENSORY_PREFERENCES[keyof typeof SENSORY_PREFERENCES];
