// src/components/asgard/domains/hestia/sanctum/SanctumContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { Card } from '@/components/runes/Card';
import { Skeleton } from '@/components/runes/Skeleton';
import AvatarUpload from '@/components/runes/AvatarUpload';
import { Button } from '@/components/yggdrasil/Button';
import { Form } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { Switch } from '@/components/forging/Switch';
import { ArrowLeft, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import { EnvironmentSelector } from '@/components/asgard/domains/hestia/sanctum/EnvironmentSelector';

export function SanctumContent() {
  const router = useRouter();
  const { user, profile, loading, refreshProfile } = useAuth();
  const { setEnvironment } = useContinuityBeam();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    refreshProfile();
  }, []);

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
          <p className="text-star-dust/60">Sign in to access your Sanctum.</p>
        </div>
      </main>
    );
  }

  const identityCardData: CardData = {
    id: `${user.id}-sanctum-identity`,
    title: 'Sovereign Identity',
    type: 'value',
    value: profile.display_name || profile.username || 'Sovereign',
  };

  const preferencesCardData: CardData = {
    id: `${user.id}-sanctum-preferences`,
    title: 'Accessibility',
    type: 'value',
    value: '',
  };

  const environmentCardData: CardData = {
    id: `${user.id}-sanctum-environment`,
    title: 'Environment',
    type: 'value',
    value: profile.preferred_environment || 'home',
  };

  const updateProfileField = async (field: string, value: any) => {
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${user.id}`, {
        method: 'PUT',
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

  const handleSave = async (data: Record<string, any>) => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const updates: Record<string, any> = {};

      if (data.display_name) updates.display_name = data.display_name;
      if (data.username) updates.username = data.username;
      if (data.bio !== undefined) updates.bio = data.bio || null;
      if (data.pronouns !== undefined) updates.pronouns = data.pronouns || null;
      if (data.preferred_environment) updates.preferred_environment = data.preferred_environment;

      if (Object.keys(updates).length > 0) {
        const response = await fetch(`/api/generated/hestia-core/profiles/${user.id}`, {
          method: 'PUT',
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
      <div className="container text-center flex-col items-center max-w-auto mx-auto px-6 bg-black/85">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Vessel
        </button>

        <h1 className="text-3xl font-bold text-star-dust mb-8">Your Sanctum</h1>

        <Card
          variant="interactive"
          data={identityCardData}
          radius="lg"
          shadow="md"
          className="p-6 mb-6"
        >
          <div className="flex flex-col items-center">
            <AvatarUpload
              userId={user.id}
              currentUrl={profile.avatar_url}
              fallbackInitials={profile.display_name || profile.username || 'S'}
              size="lg"
              onUploadComplete={(url) => updateProfileField('avatar_url', url)}
            />
            <p className="text-sm text-star-dust/40 mt-3">Tap to change your vessel image</p>
          </div>
        </Card>

        <Card
          variant="sanctuary"
          data={identityCardData}
          radius="lg"
          shadow="md"
          className="p-6 mb-6"
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
            <FormField label="Username" optional>
              <Input
                name="username"
                defaultValue={profile.username || ''}
                placeholder="your_unique_name"
              />
            </FormField>
            <FormField label="Bio" optional helper="A few words about your sovereign self">
              <Input
                name="bio"
                defaultValue={profile.bio || ''}
                placeholder="Tell your story..."
              />
            </FormField>
            <FormField label="Pronouns" optional>
              <Input
                name="pronouns"
                defaultValue={profile.pronouns || ''}
                placeholder="they/them, she/her, he/him..."
              />
            </FormField>
          </Form>
        </Card>

        <Card
          variant="sanctuary"
          data={preferencesCardData}
          radius="lg"
          shadow="md"
          className="p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Accessibility</h2>
          <p className="text-sm text-star-dust/40 mb-4">
            Shape the Sanctuary to welcome your nervous system.
          </p>
          <div className="space-y-4">
            <Switch
              label="Dyslexia-friendly mode"
              size="md"
              defaultChecked={profile.dyslexia_mode || false}
              onChange={(checked) => updateProfileField('dyslexia_mode', checked)}
            />
          </div>
        </Card>

        <Card
          variant="sanctuary"
          data={environmentCardData}
          radius="lg"
          shadow="md"
          className="p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Preferred Realm</h2>
          <p className="text-sm text-star-dust/40 mb-4">
            Choose which environment welcomes you and how it appears.
          </p>

          <EnvironmentSelector
            value={profile.preferred_environment}
            onChange={(value) => {
              updateProfileField('preferred_environment', value);
            }}
          />
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
              saveMessage.includes('Failed') ? 'text-error' : 'text-sanctuary-green'
            )}>
              {saveMessage}
            </span>
          )}
        </div>

      </div>
    </main>
  );
}