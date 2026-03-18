// app/components/profiles/ProfileForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import { Save, Loader2, Heart, Eye, Ear, Users, Moon, Sun } from 'lucide-react';
import type { Profile, NDPreferences, SensoryPreferences } from '@/types/hooks/profile';

interface ProfileFormProps {
  initialProfile: Profile;
  onSuccess?: () => void;
}

export default function ProfileForm({ initialProfile, onSuccess }: ProfileFormProps) {
  const supabase = useSupabase();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'nd' | 'sensory'>('basic');

  // Form state - expanded for all fields
  const [formData, setFormData] = useState({
    // Basic info
    display_name: initialProfile.display_name || '',
    bio: initialProfile.bio || '',
    username: initialProfile.username || '',
    preferred_name: initialProfile.preferred_name || '',
    
    // Communication
    communication_style: initialProfile.communication_style || 'direct',
    
    // ND Preferences
    nd_preferences: {
      reduced_motion: initialProfile.nd_preferences?.reduced_motion || false,
      high_contrast: initialProfile.nd_preferences?.high_contrast || false,
      focus_mode: initialProfile.nd_preferences?.focus_mode || false,
      sound_notifications: initialProfile.nd_preferences?.sound_notifications ?? true,
      visual_timers: initialProfile.nd_preferences?.visual_timers ?? true,
      tl_dr_enabled: initialProfile.nd_preferences?.tl_dr_enabled ?? true,
      dyslexia_friendly: initialProfile.nd_preferences?.dyslexia_friendly || false,
      adhd_friendly: initialProfile.nd_preferences?.adhd_friendly || false,
      autism_friendly: initialProfile.nd_preferences?.autism_friendly || false,
    },
    
    // Sensory Preferences
    sensory_preferences: {
      light_sensitivity: initialProfile.sensory_preferences?.light_sensitivity || 'medium',
      sound_sensitivity: initialProfile.sensory_preferences?.sound_sensitivity || 'medium',
      crowd_sensitivity: initialProfile.sensory_preferences?.crowd_sensitivity || 'medium',
      touch_sensitivity: initialProfile.sensory_preferences?.touch_sensitivity || 'low',
      vestibular_sensitivity: initialProfile.sensory_preferences?.vestibular_sensitivity || 'low',
      olfactory_sensitivity: initialProfile.sensory_preferences?.olfactory_sensitivity || 'low',
    },
    
    // Notification settings
    notification_frequency: initialProfile.notification_frequency || 'instant',
    email_notifications: initialProfile.email_notifications ?? true,
    push_notifications: initialProfile.push_notifications ?? true,
  });

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleNDToggle = (key: keyof NDPreferences) => {
    setFormData(prev => ({
      ...prev,
      nd_preferences: {
        ...prev.nd_preferences,
        [key]: !prev.nd_preferences[key],
      }
    }));
  };

  const handleSensoryChange = (key: keyof SensoryPreferences, value: string) => {
    setFormData(prev => ({
      ...prev,
      sensory_preferences: {
        ...prev.sensory_preferences,
        [key]: value,
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validate username
      if (formData.username && !/^[a-zA-Z0-9_]{3,30}$/.test(formData.username)) {
        throw new Error('Username must be 3-30 characters and can only contain letters, numbers, and underscores');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name || null,
          bio: formData.bio || null,
          username: formData.username || null,
          preferred_name: formData.preferred_name || null,
          communication_style: formData.communication_style,
          nd_preferences: formData.nd_preferences,
          sensory_preferences: formData.sensory_preferences,
          notification_frequency: formData.notification_frequency,
          email_notifications: formData.email_notifications,
          push_notifications: formData.push_notifications,
          updated_at: new Date().toISOString(),
        })
        .eq('id', initialProfile.id);

      if (updateError) throw updateError;

      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'basic' 
              ? 'bg-cyan-600 text-white' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Basic Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('nd')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'nd' 
              ? 'bg-cyan-600 text-white' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart size={16} />
          Neuro Preferences
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sensory')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'sensory' 
              ? 'bg-cyan-600 text-white' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Eye size={16} />
          Sensory
        </button>
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/60 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleBasicChange}
              pattern="^[a-zA-Z0-9_]{3,30}$"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              placeholder="quantum_weaver"
            />
          </div>

          <div>
            <label htmlFor="display_name" className="block text-sm font-medium text-white/60 mb-1">
              Display Name
            </label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleBasicChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="preferred_name" className="block text-sm font-medium text-white/60 mb-1">
              Preferred Name (optional)
            </label>
            <input
              type="text"
              id="preferred_name"
              name="preferred_name"
              value={formData.preferred_name}
              onChange={handleBasicChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              placeholder="How you'd like to be addressed"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-white/60 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleBasicChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
              placeholder="Tell your story..."
            />
          </div>

          <div>
            <label htmlFor="communication_style" className="block text-sm font-medium text-white/60 mb-1">
              Communication Style
            </label>
            <select
              id="communication_style"
              name="communication_style"
              value={formData.communication_style}
              onChange={handleBasicChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="direct">Direct - Straightforward, minimal preamble</option>
              <option value="gentle">Gentle - Softened with emotional context</option>
              <option value="detailed">Detailed - Comprehensive information</option>
              <option value="concise">Concise - Brief, tl;dr friendly</option>
            </select>
          </div>
        </div>
      )}

      {/* Neuro Preferences Tab */}
      {activeTab === 'nd' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.dyslexia_friendly}
                onChange={() => handleNDToggle('dyslexia_friendly')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">Dyslexia-friendly font</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.adhd_friendly}
                onChange={() => handleNDToggle('adhd_friendly')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">ADHD-friendly interface</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.autism_friendly}
                onChange={() => handleNDToggle('autism_friendly')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">Autism-friendly mode</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.reduced_motion}
                onChange={() => handleNDToggle('reduced_motion')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">Reduce motion</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.high_contrast}
                onChange={() => handleNDToggle('high_contrast')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">High contrast</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.focus_mode}
                onChange={() => handleNDToggle('focus_mode')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">Focus mode (reduce distractions)</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.visual_timers}
                onChange={() => handleNDToggle('visual_timers')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">Show visual timers</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nd_preferences.tl_dr_enabled}
                onChange={() => handleNDToggle('tl_dr_enabled')}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500"
              />
              <span className="text-white">Show tl;dr summaries</span>
            </label>
          </div>
        </div>
      )}

      {/* Sensory Preferences Tab */}
      {activeTab === 'sensory' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2 flex items-center gap-2">
              <Eye size={16} /> Light Sensitivity
            </label>
            <select
              value={formData.sensory_preferences.light_sensitivity}
              onChange={(e) => handleSensoryChange('light_sensitivity', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            >
              <option value="low">Low - Not sensitive to light</option>
              <option value="medium">Medium - Prefer moderate lighting</option>
              <option value="high">High - Need dim environments</option>
              <option value="avoidant">Avoidant - Must avoid bright light</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2 flex items-center gap-2">
              <Ear size={16} /> Sound Sensitivity
            </label>
            <select
              value={formData.sensory_preferences.sound_sensitivity}
              onChange={(e) => handleSensoryChange('sound_sensitivity', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            >
              <option value="low">Low - Not sensitive to sound</option>
              <option value="medium">Medium - Prefer quiet environments</option>
              <option value="high">High - Need noise-cancellation</option>
              <option value="avoidant">Avoidant - Must avoid loud spaces</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2 flex items-center gap-2">
              <Users size={16} /> Crowd Sensitivity
            </label>
            <select
              value={formData.sensory_preferences.crowd_sensitivity}
              onChange={(e) => handleSensoryChange('crowd_sensitivity', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            >
              <option value="low">Low - Comfortable in crowds</option>
              <option value="medium">Medium - Prefer small groups</option>
              <option value="high">High - Avoid crowds when possible</option>
              <option value="avoidant">Avoidant - Cannot be in crowds</option>
            </select>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
      >
        {saving ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        Save Changes
      </button>
    </form>
  );
}
