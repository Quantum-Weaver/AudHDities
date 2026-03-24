// src/app/(dashboard)/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { usePermissions } from '@/hooks/usePermissions';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import Tab from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import {
  User,
  Bell,
  Brain,
  Eye,
  Volume2,
  LogOut,
  Save,
  Shield,
  Mail,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { DEFAULT_ND_PREFERENCES, DEFAULT_SENSORY_PREFERENCES } from '@/types/nd-preferences';

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile, updatePreferences, updateSensory } = useProfile();
  const { isAdmin } = usePermissions();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [communicationStyle, setCommunicationStyle] = useState('direct');
  const [notificationFrequency, setNotificationFrequency] = useState('instant');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // ND Preferences (using the typed preferences from profile)
  const [ndPrefs, setNdPrefs] = useState(DEFAULT_ND_PREFERENCES);
  
  // Sensory Preferences
  const [sensoryPrefs, setSensoryPrefs] = useState(DEFAULT_SENSORY_PREFERENCES);

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setCommunicationStyle(profile.communication_style || 'direct');
      setNotificationFrequency(profile.notification_frequency || 'instant');
      setEmailNotifications(profile.email_notifications ?? true);
      setPushNotifications(profile.push_notifications ?? true);
      
      if (profile.nd_preferences_typed) {
        setNdPrefs(profile.nd_preferences_typed);
      }
      if (profile.sensory_preferences_typed) {
        setSensoryPrefs(profile.sensory_preferences_typed);
      }
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateProfile({
        display_name: displayName,
        bio,
        communication_style: communicationStyle,
        notification_frequency: notificationFrequency,
        email_notifications: emailNotifications,
        push_notifications: pushNotifications
      });
      setSuccess('Profile settings saved');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNDPreferences = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updatePreferences(ndPrefs);
      setSuccess('Neurodivergent preferences saved');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSensoryPreferences = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateSensory(sensoryPrefs);
      setSuccess('Sensory preferences saved');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <Page environment="origin" showContinuityBeam={true}>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
        </div>
      </Page>
    );
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
      content: (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-medium text-white mb-1">Profile Information</h3>
            <p className="text-sm text-white/40">How you appear to the sanctuary</p>
          </div>
          
          <Input
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your public name"
          />
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:border-cyan-500 focus:outline-none"
              placeholder="Tell the community about yourself..."
            />
            <p className="text-xs text-white/40 mt-1">Markdown supported</p>
          </div>
          
          <Select
            label="Communication Style"
            value={communicationStyle}
            onChange={(e) => setCommunicationStyle(e.target.value)}
            options={[
              { value: 'direct', label: 'Direct — Clear, straightforward, no fluff' },
              { value: 'gentle', label: 'Gentle — Softened, with emotional context' },
              { value: 'detailed', label: 'Detailed — Comprehensive, all information included' },
              { value: 'concise', label: 'Concise — Brief, tl;dr friendly' }
            ]}
          />
          
          <div className="pt-4 border-t border-white/10">
            <Button onClick={handleSaveProfile} disabled={saving} className="w-full flex items-center justify-center gap-2">
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={16} />,
      content: (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-medium text-white mb-1">How We Reach You</h3>
            <p className="text-sm text-white/40">Control your notification experience</p>
          </div>
          
          <Select
            label="Digest Frequency"
            value={notificationFrequency}
            onChange={(e) => setNotificationFrequency(e.target.value)}
            options={[
              { value: 'instant', label: 'Instant — Real-time notifications' },
              { value: 'daily', label: 'Daily — Once per day summary' },
              { value: 'weekly', label: 'Weekly — Once per week summary' },
              { value: 'never', label: 'Never — No notifications' }
            ]}
          />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-xs text-white/40">Receive updates via email</p>
              </div>
              <Toggle
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-xs text-white/40">Receive notifications in browser</p>
              </div>
              <Toggle
                checked={pushNotifications}
                onChange={setPushNotifications}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <Button onClick={handleSaveProfile} disabled={saving} className="w-full flex items-center justify-center gap-2">
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Notification Settings'}
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'neurodivergent',
      label: 'ND Preferences',
      icon: <Brain size={16} />,
      content: (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-medium text-white mb-1">Neurodivergent-Friendly Settings</h3>
            <p className="text-sm text-white/40">Optimize the sanctuary for your mind</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Reduced Motion</p>
                <p className="text-xs text-white/40">Minimize animations and movement</p>
              </div>
              <Toggle
                checked={ndPrefs.reduced_motion}
                onChange={(checked) => setNdPrefs({ ...ndPrefs, reduced_motion: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">High Contrast</p>
                <p className="text-xs text-white/40">Enhanced visual clarity</p>
              </div>
              <Toggle
                checked={ndPrefs.high_contrast}
                onChange={(checked) => setNdPrefs({ ...ndPrefs, high_contrast: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Focus Mode</p>
                <p className="text-xs text-white/40">Reduce distractions, emphasize content</p>
              </div>
              <Toggle
                checked={ndPrefs.focus_mode}
                onChange={(checked) => setNdPrefs({ ...ndPrefs, focus_mode: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Visual Timers</p>
                <p className="text-xs text-white/40">Show time estimates for tasks</p>
              </div>
              <Toggle
                checked={ndPrefs.visual_timers}
                onChange={(checked) => setNdPrefs({ ...ndPrefs, visual_timers: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">TL;DR Mode</p>
                <p className="text-xs text-white/40">Summarize long content</p>
              </div>
              <Toggle
                checked={ndPrefs.tl_dr_enabled}
                onChange={(checked) => setNdPrefs({ ...ndPrefs, tl_dr_enabled: checked })}
              />
            </div>
            
            <div className="border-t border-white/10 my-4 pt-4">
              <p className="text-white font-medium mb-3">Identity Preferences</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/70">Sound Notifications</span>
                  <Toggle
                    checked={ndPrefs.sound_notifications}
                    onChange={(checked) => setNdPrefs({ ...ndPrefs, sound_notifications: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/70">Dyslexia-Friendly Font</span>
                  <Toggle
                    checked={ndPrefs.dyslexia_friendly}
                    onChange={(checked) => setNdPrefs({ ...ndPrefs, dyslexia_friendly: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/70">ADHD-Friendly Interface</span>
                  <Toggle
                    checked={ndPrefs.adhd_friendly}
                    onChange={(checked) => setNdPrefs({ ...ndPrefs, adhd_friendly: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/70">Autism-Friendly Design</span>
                  <Toggle
                    checked={ndPrefs.autism_friendly}
                    onChange={(checked) => setNdPrefs({ ...ndPrefs, autism_friendly: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <Button onClick={handleSaveNDPreferences} disabled={saving} className="w-full flex items-center justify-center gap-2">
              <Save size={18} />
              {saving ? 'Saving...' : 'Save ND Preferences'}
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'sensory',
      label: 'Sensory',
      icon: <Eye size={16} />,
      content: (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-medium text-white mb-1">Sensory Accommodations</h3>
            <p className="text-sm text-white/40">Adjust the sanctuary to your sensory needs</p>
          </div>
          
          <Select
            label="Light Sensitivity"
            value={sensoryPrefs.light_sensitivity}
            onChange={(e) => setSensoryPrefs({ ...sensoryPrefs, light_sensitivity: e.target.value as any })}
            options={[
              { value: 'low', label: 'Low — No issues with light' },
              { value: 'medium', label: 'Medium — Some sensitivity' },
              { value: 'high', label: 'High — Prefer dim lighting' },
              { value: 'avoidant', label: 'Avoidant — Need darkness' }
            ]}
          />
          
          <Select
            label="Sound Sensitivity"
            value={sensoryPrefs.sound_sensitivity}
            onChange={(e) => setSensoryPrefs({ ...sensoryPrefs, sound_sensitivity: e.target.value as any })}
            options={[
              { value: 'low', label: 'Low — No issues with sound' },
              { value: 'medium', label: 'Medium — Some sensitivity' },
              { value: 'high', label: 'High — Need quiet spaces' },
              { value: 'avoidant', label: 'Avoidant — Need silence' }
            ]}
          />
          
          <Select
            label="Crowd Sensitivity"
            value={sensoryPrefs.crowd_sensitivity}
            onChange={(e) => setSensoryPrefs({ ...sensoryPrefs, crowd_sensitivity: e.target.value as any })}
            options={[
              { value: 'low', label: 'Low — Comfortable with groups' },
              { value: 'medium', label: 'Medium — Prefer small groups' },
              { value: 'high', label: 'High — Need 1:1 interaction' },
              { value: 'avoidant', label: 'Avoidant — Prefer solitude' }
            ]}
          />
          
          <div className="pt-4 border-t border-white/10">
            <Button onClick={handleSaveSensoryPreferences} disabled={saving} className="w-full flex items-center justify-center gap-2">
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Sensory Preferences'}
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'account',
      label: 'Account',
      icon: <Shield size={16} />,
      content: (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-medium text-white mb-1">Account Settings</h3>
            <p className="text-sm text-white/40">Manage your sanctuary membership</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-cyan-400" />
              <span className="text-white">Email</span>
            </div>
            <p className="text-white/60 font-mono text-sm">{user?.email}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <User size={18} className="text-purple-400" />
              <span className="text-white">Username</span>
            </div>
            <p className="text-white/60 font-mono">{profile?.username || 'Not set'}</p>
          </div>
          
          {isAdmin && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={18} className="text-cyan-400" />
                <span className="text-cyan-400">Administrator</span>
              </div>
              <p className="text-white/60 text-sm">You have administrative privileges</p>
              <Link href="/admin" className="text-cyan-400 text-sm hover:underline mt-2 inline-block">
                Go to Admin Dashboard →
              </Link>
            </div>
          )}
          
          <div className="border-t border-white/10 pt-4">
            <Button
              variant="danger"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm font-medium mb-2">Danger Zone</p>
            <p className="text-white/60 text-xs mb-3">
              Deleting your account is permanent. All your data will be removed.
            </p>
            <Button variant="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <Page environment="origin" showContinuityBeam={true}>
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-white/60">Customize your sanctuary experience</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <Card className="p-6">
            <Tab
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Card>
        </div>
      </main>
    </Page>
  );
}