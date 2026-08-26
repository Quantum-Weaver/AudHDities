// src/components/asgard/domains/hestia/sanctum/SanctumContent.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Skeleton } from '@/components/runes/Skeleton';
import AvatarUpload from '@/components/runes/AvatarUpload';
import { Button } from '@/components/yggdrasil/Button';
import { Form } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Switch } from '@/components/forging/Switch';
import { Slider } from '@/components/forging/Slider';
import { EnvironmentSelector } from '@/components/asgard/domains/hestia/sanctum/EnvironmentSelector';
import { CovenantSpace } from '@/components/asgard/domains/hestia/sanctum/CovenantSpace';
import { ArrowLeft, Save, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

export function SanctumContent() {
  const router = useRouter();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [ceremonyArrival, setCeremonyArrival] = useState(false);
  const [ceremonyFarewell, setCeremonyFarewell] = useState(false);
  const [environmentPreference, setEnvironmentPreference] = useState<string>('home:1');
  const [bubbleDailyMax, setBubbleDailyMax] = useState(500);
  const [bubbleHourlyMax, setBubbleHourlyMax] = useState(100);
  const [bubbleVesselButton, setBubbleVesselButton] = useState(false);
  const [bubbleTouched, setBubbleTouched] = useState(false);

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    if (!bubbleTouched) return;
    const t = setTimeout(() => {
      updateConfigField('bubble_daily_max', bubbleDailyMax);
      updateConfigField('bubble_hourly_max', bubbleHourlyMax);
    }, 600);
    return () => clearTimeout(t);
  }, [bubbleTouched, bubbleDailyMax, bubbleHourlyMax]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/generated/hestia-core/vessel_config?created_by=${user.id}&limit=1`)
      .then(r => r.json())
      .then(res => {
        const rows = res.success ? (res.data?.data ?? []) : [];
        if (rows[0]) {
          setDyslexiaFont(!!rows[0].dyslexia_font);
          const raw = rows[0] as Record<string, unknown>;
          setCeremonyArrival(raw.ceremony_arrival === true);
          setCeremonyFarewell(raw.ceremony_farewell === true);
          if (typeof raw.environment_preference === 'string' && raw.environment_preference) {
            setEnvironmentPreference(raw.environment_preference);
          }
          if (typeof raw.bubble_daily_max === 'number') setBubbleDailyMax(raw.bubble_daily_max);
          if (typeof raw.bubble_hourly_max === 'number') setBubbleHourlyMax(raw.bubble_hourly_max);
          setBubbleVesselButton(raw.bubble_vessel_button === true);
        }
      })
      .catch(() => {});
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-6">
            <Skeleton variant="card" className="h-64" />
            <Skeleton variant="card" className="h-48" />
            <Skeleton variant="card" className="h-48" />
          </div>
        </div>
      </main>
    );
  }

  if (!user || !profile) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Enter the Sanctuary to see your vessel.</p>
        </div>
      </main>
    );
  }

  const identityCardData: CardData = {
    id: `${user.id}-sanctum-identity`,
    title: 'Sovereign Identity',
    type: 'value',
    value: profile.display_name || profile.slug || 'Sovereign',
  };

  const preferencesCardData: CardData = {
    id: `${user.id}-sanctum-preferences`,
    title: 'Accessibility',
    type: 'value',
    value: '',
  };

  const covenantCardData: CardData = {
    id: `${user.id}-sanctum-covenant`,
    title: 'The Covenant',
    type: 'value',
    value: '',
  };

  const updateIdentityField = async (field: string, value: unknown) => {
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      const result = await response.json();
      if (result.success) {
        await refreshProfile();
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const updateConfigField = async (field: string, value: unknown) => {
    try {
      await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { [field]: value } }),
      });
    } catch (err) {
      console.error('Failed to update vessel config:', err);
    }
  };

  const handleSave = async (data: Record<string, any>) => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const updates: Record<string, any> = {};

      if (data.display_name) updates.display_name = data.display_name;
      if (data.slug) updates.slug = data.slug;
      if (data.bio !== undefined) updates.bio = data.bio || null;

      if (Object.keys(updates).length > 0) {
        const response = await fetch('/api/auth/update-profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Save failed');
        }
      }

      await refreshProfile();
      router.push('/vessel');
    } catch (err) {
      setSaveMessage('Failed to save. Please try again.');
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">

        <Link
          href="/vessel"
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Vessel
        </Link>

        <h1 className="text-3xl font-bold text-star-dust mb-8">Your Sanctum</h1>

        <Card
          variant="interactive"
          data={identityCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <div className="flex flex-col items-center">
            <AvatarUpload
              userId={user.id}
              currentUrl={profile.avatar_url}
              fallbackInitials={profile.display_name || profile.slug || 'S'}
              size="lg"
              onUploadComplete={(url) => updateIdentityField('avatar_url', url)}
            />
            <p className="text-sm text-star-dust/40 mt-3">Tap to change your vessel image</p>
          </div>
        </Card>

        <Card
          variant="sanctuary"
          data={identityCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Sovereign Identity</h2>
          <Form onSubmit={handleSave}>
            <FormField label="Display Name" optional>
              <Input
                name="display_name"
                defaultValue={profile.display_name || ''}
                placeholder="How shall you be known?"
              />
            </FormField>
            <FormField label="Handle" optional helper="Your unique address in the Sanctuary">
              <Input
                name="slug"
                defaultValue={profile.slug || ''}
                placeholder="your-unique-name"
              />
            </FormField>
            <FormField label="Bio" optional helper="A few words about your sovereign self">
              <Input
                name="bio"
                defaultValue={profile.bio || ''}
                placeholder="Tell your story..."
              />
            </FormField>
          </Form>
        </Card>

        <Card
          variant="sanctuary"
          data={preferencesCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Accessibility</h2>
          <p className="text-sm text-star-dust/70 mb-4">
            Shape the Sanctuary to welcome your nervous system.
          </p>
          <div className="space-y-4">
            <Switch
              label="Dyslexia-friendly mode"
              size="md"
              checked={dyslexiaFont}
              onChange={(checked) => { setDyslexiaFont(checked); updateConfigField('dyslexia_font', checked); }}
            />
            <p className="text-xs text-star-dust/70">
              Off unless you turn it on. It stays on once you do.
            </p>
          </div>
        </Card>

        <Card
          variant="sanctuary"
          data={preferencesCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Your Realm</h2>
          <p className="text-sm text-star-dust/70 mb-4">
            Choose the environment the Sanctuary wears for you — previewed as
            you choose, remembered every time you return.
          </p>
          <EnvironmentSelector
            value={environmentPreference}
            onChange={(newValue) => {
              setEnvironmentPreference(newValue);
              updateConfigField('environment_preference', newValue);
            }}
          />
        </Card>

        <Card
          variant="sanctuary"
          data={preferencesCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Ceremonies</h2>
          <p className="text-sm text-star-dust/70 mb-4">
            Small rites at the thresholds — yours to invite, easy to decline.
            Nothing plays unless you choose it here.
          </p>
          <div className="space-y-4">
            <Switch
              label="A richer arrival — the welcome ceremony at your crossing"
              size="md"
              checked={ceremonyArrival}
              onChange={(checked) => { setCeremonyArrival(checked); updateConfigField('ceremony_arrival', checked); }}
            />
            <Switch
              label="A farewell at your going — Gweld ti’n fuan (see you soon)"
              size="md"
              checked={ceremonyFarewell}
              onChange={(checked) => { setCeremonyFarewell(checked); updateConfigField('ceremony_farewell', checked); }}
            />
          </div>
        </Card>

        <Card
          variant="sanctuary"
          data={covenantCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <CovenantSpace />
        </Card>

        <Card
          variant="sanctuary"
          data={preferencesCardData}
          radius="lg"
          shadow="md"
          className="p-8 mb-6 bg-surface/90"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-neurospark" />
            <h2 className="text-lg font-semibold text-star-dust">Your Daily Rhythm</h2>
          </div>
          <p className="text-sm text-star-dust/70 mb-6">
            Your own boundaries for the bubbles — a kindness to your future
            self, never a score. They follow your vessel to every device.
          </p>
          <div className="mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-star-dust/60">Daily bubble points</label>
              <span className="text-xs text-neurospark font-bold">{bubbleDailyMax}</span>
            </div>
            <Slider
              value={bubbleDailyMax}
              max={2000}
              min={100}
              step={50}
              onValueChange={([v]) => { setBubbleTouched(true); setBubbleDailyMax(v); }}
            />
          </div>
          <div className="text-left">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-star-dust/60">Hourly pops</label>
              <span className="text-xs text-neurospark font-bold">{bubbleHourlyMax}</span>
            </div>
            <Slider
              value={bubbleHourlyMax}
              max={500}
              min={20}
              step={10}
              onValueChange={([v]) => { setBubbleTouched(true); setBubbleHourlyMax(v); }}
            />
          </div>
          <div className="mt-6 border-t border-star-dust/10 pt-6 text-left">
            <Switch
              label="Show a “Play bubbles” button on my vessel"
              size="md"
              checked={bubbleVesselButton}
              onChange={(checked) => { setBubbleVesselButton(checked); updateConfigField('bubble_vessel_button', checked); }}
            />
            <p className="text-xs text-star-dust/70 mt-2">
              Off by default. Turn it on and the button waits on your vessel;
              turn it off and it is gone. The bubbles are always at the Library
              either way.
            </p>
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSaving}
            onClick={() => {
              const form = document.querySelector('form');
              if (form) form.requestSubmit();
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Shape Your Sanctum
          </Button>

          {saveMessage && (
            <span className={cn(
              'text-sm',
              saveMessage.includes('Failed') ? 'text-red-400' : 'text-neurospark'
            )}>
              {saveMessage}
            </span>
          )}
        </div>

      </div>
    </main>
  );
}