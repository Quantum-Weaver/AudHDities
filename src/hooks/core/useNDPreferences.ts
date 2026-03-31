// hooks/core/useNDPreferences.ts
'use client';

import { useCallback, useMemo } from 'react';
import { useProfile } from './useProfile';
import type { NDPreferences, SensoryPreferences } from '@/types/preferences';
import { DEFAULT_ND_PREFERENCES, DEFAULT_SENSORY_PREFERENCES } from '@/types/preferences';

interface UseNDPreferencesReturn {
  ndPreferences: NDPreferences;
  sensoryPreferences: SensoryPreferences;
  loading: boolean;
  updateNDPreferences: (preferences: Partial<NDPreferences>) => Promise<void>;
  updateSensoryPreferences: (preferences: Partial<SensoryPreferences>) => Promise<void>;
  toggleReducedMotion: () => Promise<void>;
  toggleHighContrast: () => Promise<void>;
  toggleFocusMode: () => Promise<void>;
  toggleSoundNotifications: () => Promise<void>;
  toggleVisualTimers: () => Promise<void>;
  toggleTlDr: () => Promise<void>;
  toggleDyslexiaFriendly: () => Promise<void>;
  toggleAdhdFriendly: () => Promise<void>;
  toggleAutismFriendly: () => Promise<void>;
}

// Helper to safely parse ND preferences from Json
function parseNDPreferences(prefs: unknown): NDPreferences {
  if (!prefs || typeof prefs !== 'object') {
    return { ...DEFAULT_ND_PREFERENCES };
  }
  
  const p = prefs as Record<string, unknown>;
  
  return {
    reduced_motion: typeof p.reduced_motion === 'boolean' ? p.reduced_motion : DEFAULT_ND_PREFERENCES.reduced_motion,
    high_contrast: typeof p.high_contrast === 'boolean' ? p.high_contrast : DEFAULT_ND_PREFERENCES.high_contrast,
    focus_mode: typeof p.focus_mode === 'boolean' ? p.focus_mode : DEFAULT_ND_PREFERENCES.focus_mode,
    sound_notifications: typeof p.sound_notifications === 'boolean' ? p.sound_notifications : DEFAULT_ND_PREFERENCES.sound_notifications,
    visual_timers: typeof p.visual_timers === 'boolean' ? p.visual_timers : DEFAULT_ND_PREFERENCES.visual_timers,
    tl_dr_enabled: typeof p.tl_dr_enabled === 'boolean' ? p.tl_dr_enabled : DEFAULT_ND_PREFERENCES.tl_dr_enabled,
    dyslexia_friendly: typeof p.dyslexia_friendly === 'boolean' ? p.dyslexia_friendly : DEFAULT_ND_PREFERENCES.dyslexia_friendly,
    adhd_friendly: typeof p.adhd_friendly === 'boolean' ? p.adhd_friendly : DEFAULT_ND_PREFERENCES.adhd_friendly,
    autism_friendly: typeof p.autism_friendly === 'boolean' ? p.autism_friendly : DEFAULT_ND_PREFERENCES.autism_friendly,
  };
}

// Helper to safely parse sensory preferences from Json
function parseSensoryPreferences(prefs: unknown): SensoryPreferences {
  if (!prefs || typeof prefs !== 'object') {
    return { ...DEFAULT_SENSORY_PREFERENCES };
  }
  
  const p = prefs as Record<string, unknown>;
  
  return {
    light_sensitivity: typeof p.light_sensitivity === 'string' && 
      ['low', 'medium', 'high', 'avoidant'].includes(p.light_sensitivity) 
      ? p.light_sensitivity as SensoryPreferences['light_sensitivity'] 
      : DEFAULT_SENSORY_PREFERENCES.light_sensitivity,
    sound_sensitivity: typeof p.sound_sensitivity === 'string' && 
      ['low', 'medium', 'high', 'avoidant'].includes(p.sound_sensitivity) 
      ? p.sound_sensitivity as SensoryPreferences['sound_sensitivity'] 
      : DEFAULT_SENSORY_PREFERENCES.sound_sensitivity,
    crowd_sensitivity: typeof p.crowd_sensitivity === 'string' && 
      ['low', 'medium', 'high', 'avoidant'].includes(p.crowd_sensitivity) 
      ? p.crowd_sensitivity as SensoryPreferences['crowd_sensitivity'] 
      : DEFAULT_SENSORY_PREFERENCES.crowd_sensitivity,
    touch_sensitivity: typeof p.touch_sensitivity === 'string' && 
      ['low', 'medium', 'high', 'avoidant'].includes(p.touch_sensitivity) 
      ? p.touch_sensitivity as SensoryPreferences['touch_sensitivity'] 
      : DEFAULT_SENSORY_PREFERENCES.touch_sensitivity,
    vestibular_sensitivity: typeof p.vestibular_sensitivity === 'string' && 
      ['low', 'medium', 'high', 'avoidant'].includes(p.vestibular_sensitivity) 
      ? p.vestibular_sensitivity as SensoryPreferences['vestibular_sensitivity'] 
      : DEFAULT_SENSORY_PREFERENCES.vestibular_sensitivity,
    olfactory_sensitivity: typeof p.olfactory_sensitivity === 'string' && 
      ['low', 'medium', 'high', 'avoidant'].includes(p.olfactory_sensitivity) 
      ? p.olfactory_sensitivity as SensoryPreferences['olfactory_sensitivity'] 
      : DEFAULT_SENSORY_PREFERENCES.olfactory_sensitivity,
  };
}

export function useNDPreferences(): UseNDPreferencesReturn {
  const { profile, loading, updatePreferences, updateSensory } = useProfile();
  
  // Parse preferences safely
  const ndPreferences = useMemo(() => 
    parseNDPreferences(profile?.nd_preferences), 
    [profile?.nd_preferences]
  );
  
  const sensoryPreferences = useMemo(() => 
    parseSensoryPreferences(profile?.sensory_preferences), 
    [profile?.sensory_preferences]
  );
  
  // Update ND preferences
  const updateNDPreferences = useCallback(async (preferences: Partial<NDPreferences>) => {
    const current = ndPreferences;
    const updated = { ...current, ...preferences };
    await updatePreferences(updated);
  }, [ndPreferences, updatePreferences]);
  
  // Update sensory preferences
  const updateSensoryPreferences = useCallback(async (preferences: Partial<SensoryPreferences>) => {
    const current = sensoryPreferences;
    const updated = { ...current, ...preferences };
    await updateSensory(updated);
  }, [sensoryPreferences, updateSensory]);
  
  // Toggle helpers
  const toggleReducedMotion = useCallback(async () => {
    await updateNDPreferences({ reduced_motion: !ndPreferences.reduced_motion });
  }, [updateNDPreferences, ndPreferences.reduced_motion]);
  
  const toggleHighContrast = useCallback(async () => {
    await updateNDPreferences({ high_contrast: !ndPreferences.high_contrast });
  }, [updateNDPreferences, ndPreferences.high_contrast]);
  
  const toggleFocusMode = useCallback(async () => {
    await updateNDPreferences({ focus_mode: !ndPreferences.focus_mode });
  }, [updateNDPreferences, ndPreferences.focus_mode]);
  
  const toggleSoundNotifications = useCallback(async () => {
    await updateNDPreferences({ sound_notifications: !ndPreferences.sound_notifications });
  }, [updateNDPreferences, ndPreferences.sound_notifications]);
  
  const toggleVisualTimers = useCallback(async () => {
    await updateNDPreferences({ visual_timers: !ndPreferences.visual_timers });
  }, [updateNDPreferences, ndPreferences.visual_timers]);
  
  const toggleTlDr = useCallback(async () => {
    await updateNDPreferences({ tl_dr_enabled: !ndPreferences.tl_dr_enabled });
  }, [updateNDPreferences, ndPreferences.tl_dr_enabled]);
  
  const toggleDyslexiaFriendly = useCallback(async () => {
    await updateNDPreferences({ dyslexia_friendly: !ndPreferences.dyslexia_friendly });
  }, [updateNDPreferences, ndPreferences.dyslexia_friendly]);
  
  const toggleAdhdFriendly = useCallback(async () => {
    await updateNDPreferences({ adhd_friendly: !ndPreferences.adhd_friendly });
  }, [updateNDPreferences, ndPreferences.adhd_friendly]);
  
  const toggleAutismFriendly = useCallback(async () => {
    await updateNDPreferences({ autism_friendly: !ndPreferences.autism_friendly });
  }, [updateNDPreferences, ndPreferences.autism_friendly]);
  
  return {
    ndPreferences,
    sensoryPreferences,
    loading,
    updateNDPreferences,
    updateSensoryPreferences,
    toggleReducedMotion,
    toggleHighContrast,
    toggleFocusMode,
    toggleSoundNotifications,
    toggleVisualTimers,
    toggleTlDr,
    toggleDyslexiaFriendly,
    toggleAdhdFriendly,
    toggleAutismFriendly,
  };
}