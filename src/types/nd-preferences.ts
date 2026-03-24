// src/types/preferences.ts
import type { Json } from './supabase/database.types';

export type NDPreferences = {
  reduced_motion: boolean;
  high_contrast: boolean;
  focus_mode: boolean;
  sound_notifications: boolean;
  visual_timers: boolean;
  tl_dr_enabled: boolean;
  dyslexia_friendly: boolean;
  adhd_friendly: boolean;
  autism_friendly: boolean;
};

export type SensoryPreferences = {
  light_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  sound_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  crowd_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  touch_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  vestibular_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  olfactory_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
};

export const DEFAULT_ND_PREFERENCES: NDPreferences = {
  reduced_motion: false,
  high_contrast: false,
  focus_mode: false,
  sound_notifications: true,
  visual_timers: true,
  tl_dr_enabled: true,
  dyslexia_friendly: false,
  adhd_friendly: false,
  autism_friendly: false,
};

export const DEFAULT_SENSORY_PREFERENCES: SensoryPreferences = {
  light_sensitivity: 'medium',
  sound_sensitivity: 'medium',
  crowd_sensitivity: 'medium',
  touch_sensitivity: 'low',
  vestibular_sensitivity: 'low',
  olfactory_sensitivity: 'low',
};