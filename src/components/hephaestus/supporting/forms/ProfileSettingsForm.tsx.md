// components/forms/ProfileSettingsForm.tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

// Import validators
import { profileSettingsSchema } from '@/lib/validators/profile';
import type { profileSettingsSchema as ProfileSettingsSchemaType } from '@/lib/validators/profile';

// Import hooks
import { useProfile } from '@/hooks/core/useProfile';

// Infer types from schema
type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>;

// Tabs for settings organization
type SettingsTab = 'general' | 'preferences' | 'sensory' | 'notifications';

interface ProfileSettingsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProfileSettingsForm({ onSuccess, onCancel }: ProfileSettingsFormProps) {
  const router = useRouter();
  const { profile, loading: profileLoading, updateProfile, updatePreferences, updateSensory } = useProfile();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);

  // Initialize form with current profile data
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      display_name: profile?.display_name || '',
      bio: profile?.bio || '',
      email_notifications: profile?.email_notifications ?? true,
      push_notifications: profile?.push_notifications ?? true,
      notification_frequency: profile?.notification_frequency as any || 'instant',
      communication_style: profile?.communication_style as any || 'direct',
      nd_preferences: profile?.nd_preferences_typed || {
        reduced_motion: false,
        high_contrast: false,
        focus_mode: false,
        sound_notifications: true,
        visual_timers: true,
        tl_dr_enabled: true,
        dyslexia_friendly: false,
        adhd_friendly: false,
        autism_friendly: false,
      },
      sensory_preferences: profile?.sensory_preferences_typed || {
        light_sensitivity: 'medium',
        sound_sensitivity: 'medium',
        crowd_sensitivity: 'medium',
        touch_sensitivity: 'low',
        vestibular_sensitivity: 'low',
        olfactory_sensitivity: 'low',
      },
    },
  });

  // Reset form when profile loads
  const ndPrefs = watch('nd_preferences');
  const sensoryPrefs = watch('sensory_preferences');

  // Handle form submission
  const onSubmit = async (data: ProfileSettingsFormData) => {
    setSaveStatus('saving');
    setSaveError(null);

    try {
      // Update profile fields
      const profileUpdates: any = {};
      if (data.display_name !== profile?.display_name) profileUpdates.display_name = data.display_name;
      if (data.bio !== profile?.bio) profileUpdates.bio = data.bio;
      if (data.communication_style !== profile?.communication_style) profileUpdates.communication_style = data.communication_style;
      if (data.email_notifications !== profile?.email_notifications) profileUpdates.email_notifications = data.email_notifications;
      if (data.push_notifications !== profile?.push_notifications) profileUpdates.push_notifications = data.push_notifications;
      if (data.notification_frequency !== profile?.notification_frequency) profileUpdates.notification_frequency = data.notification_frequency;

      if (Object.keys(profileUpdates).length > 0) {
        await updateProfile(profileUpdates);
      }

      // Update ND preferences if changed
      if (data.nd_preferences) {
        await updatePreferences(data.nd_preferences);
      }

      // Update sensory preferences if changed
      if (data.sensory_preferences) {
        await updateSensory(data.sensory_preferences);
      }

      setSaveStatus('success');
      
      // Reset form with new values
      reset(data);
      
      // Call onSuccess callback after short delay
      setTimeout(() => {
        setSaveStatus('idle');
        if (onSuccess) onSuccess();
      }, 2000);
      
    } catch (err) {
      console.error('Error saving profile settings:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to save settings');
      setSaveStatus('error');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSaveStatus('idle');
        setSaveError(null);
      }, 5000);
    }
  };

  // Cancel handler
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  // Tabs configuration
  const tabs: { id: SettingsTab; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'preferences', label: 'ND Preferences' },
    { id: 'sensory', label: 'Sensory' },
    { id: 'notifications', label: 'Notifications' },
  ];

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-white/60">Loading settings...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-600/40 text-cyan-400 border border-cyan-500/30'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              {/* Display Name */}
              <Controller
                name="display_name"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Display Name
                    </label>
                    <input
                      {...field}
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="How others see you"
                    />
                    {errors.display_name && (
                      <p className="text-red-400 text-sm mt-1">{errors.display_name.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Bio */}
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Bio
                    </label>
                    <Textarea
                      {...field}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Tell the community about yourself..."
                    />
                    {errors.bio && (
                      <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Communication Style */}
              <Controller
                name="communication_style"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Communication Style
                    </label>
                    <select
                      {...field}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="direct">Direct - Prefer straightforward communication</option>
                      <option value="gentle">Gentle - Prefer softer, considerate language</option>
                      <option value="detailed">Detailed - Want thorough explanations</option>
                      <option value="concise">Concise - Prefer short, to-the-point messages</option>
                    </select>
                    {errors.communication_style && (
                      <p className="text-red-400 text-sm mt-1">{errors.communication_style.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          )}

          {/* ND Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                Customize how the platform adapts to your neurotype.
              </p>

              <Controller
                name="nd_preferences"
                control={control}
                render={({ field }) => (
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">Reduced Motion</span>
                      <input
                        type="checkbox"
                        checked={field.value?.reduced_motion || false}
                        onChange={(e) => field.onChange({ ...field.value, reduced_motion: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">High Contrast Mode</span>
                      <input
                        type="checkbox"
                        checked={field.value?.high_contrast || false}
                        onChange={(e) => field.onChange({ ...field.value, high_contrast: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">Focus Mode (Hide Distractions)</span>
                      <input
                        type="checkbox"
                        checked={field.value?.focus_mode || false}
                        onChange={(e) => field.onChange({ ...field.value, focus_mode: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">TL;DR Mode (Summarize Long Content)</span>
                      <input
                        type="checkbox"
                        checked={field.value?.tl_dr_enabled || false}
                        onChange={(e) => field.onChange({ ...field.value, tl_dr_enabled: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">Dyslexia-Friendly Font</span>
                      <input
                        type="checkbox"
                        checked={field.value?.dyslexia_friendly || false}
                        onChange={(e) => field.onChange({ ...field.value, dyslexia_friendly: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">Sound Notifications</span>
                      <input
                        type="checkbox"
                        checked={field.value?.sound_notifications !== false}
                        onChange={(e) => field.onChange({ ...field.value, sound_notifications: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                      <span className="text-white">Visual Timers</span>
                      <input
                        type="checkbox"
                        checked={field.value?.visual_timers !== false}
                        onChange={(e) => field.onChange({ ...field.value, visual_timers: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                      />
                    </label>
                  </div>
                )}
              />
            </div>
          )}

          {/* Sensory Preferences Tab */}
          {activeTab === 'sensory' && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                Tell us about your sensory sensitivities so we can adapt the experience.
              </p>

              <Controller
                name="sensory_preferences"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4">
                    {[
                      { key: 'light_sensitivity', label: 'Light Sensitivity' },
                      { key: 'sound_sensitivity', label: 'Sound Sensitivity' },
                      { key: 'crowd_sensitivity', label: 'Crowd Sensitivity' },
                      { key: 'touch_sensitivity', label: 'Touch Sensitivity' },
                      { key: 'vestibular_sensitivity', label: 'Movement Sensitivity' },
                      { key: 'olfactory_sensitivity', label: 'Smell Sensitivity' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm text-white/60 mb-2">
                          {label}
                        </label>
                        <div className="flex gap-2">
                          {(['low', 'medium', 'high', 'avoidant'] as const).map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => field.onChange({ ...field.value, [key]: level })}
                              className={`flex-1 py-2 rounded-lg capitalize transition-all ${
                                field.value?.[key as keyof typeof field.value] === level
                                  ? 'bg-cyan-600 text-white'
                                  : 'bg-white/10 text-white/60 hover:bg-white/20'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <Controller
                name="email_notifications"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                    <span className="text-white">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                    />
                  </label>
                )}
              />

              <Controller
                name="push_notifications"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                    <span className="text-white">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                    />
                  </label>
                )}
              />

              <Controller
                name="notification_frequency"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Notification Frequency
                    </label>
                    <select
                      {...field}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="instant">Instant - Get notifications immediately</option>
                      <option value="daily">Daily Digest - One summary per day</option>
                      <option value="weekly">Weekly Digest - One summary per week</option>
                      <option value="never">Never - No notifications</option>
                    </select>
                  </div>
                )}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Form Errors */}
      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400 text-sm">{saveError}</p>
        </div>
      )}

      {/* Success Message */}
      {saveStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-green-400 text-sm">Settings saved successfully!</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isDirty || saveStatus === 'saving' || isSubmitting}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/10 disabled:text-white/40 text-white rounded-lg transition-all flex items-center gap-2"
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}