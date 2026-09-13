// src/components/asgard/domains/prometheus/stage/StreamSetup.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { Switch } from '@/components/forging/Switch';
import { ArrowLeft, Radio, Sparkles, Calendar } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { TablesInsert } from '@/lib/generated/supabase/database.helpers.js';

const GENRES = [
  { value: 'music', label: 'Music' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'storytelling', label: 'Storytelling' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'other', label: 'Something else' },
];

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const WRITE_FAILED = 'The event was not put up this time. It is safe to try again.';
const WRITE_CLOSED = 'The Stage is not yet open for writing.';

function validateEvent(data: Record<string, unknown>): Record<string, string> {
  const title = String(data.title ?? '').trim();
  if (!title) return { title: 'A title is needed before this goes up.' };
  if (!slugify(title)) return { title: 'The title needs a letter or a number.' };
  return {};
}

export function StreamSetup() {
  const router = useRouter();
  const { user, isLoading: authLoading, roles } = useUser();

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const canPerform = roles.includes('artisan') || roles.includes('merchant');

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);

    const title = String(data.title ?? '').trim();
    const scheduledFor = data.scheduled_for ? String(data.scheduled_for) : '';
    const now = new Date();
    const scheduledAt = scheduledFor ? new Date(scheduledFor) : null;
    const startsLater = scheduledAt !== null && scheduledAt.getTime() > now.getTime();
    const goesLive = isLive && !startsLater;

    const body: TablesInsert<'events'> = {
      title,
      slug: slugify(title),
      description: data.description ? String(data.description) : null,
      event_type: data.event_type ? String(data.event_type).trim() : null,
      genre: data.genre ? String(data.genre) : null,
      scheduled_for: goesLive ? now.toISOString() : scheduledAt ? scheduledAt.toISOString() : null,
      is_live: goesLive,
      started_at: goesLive ? now.toISOString() : null,
      status: isDraft ? 'draft' : 'published',
    };

    try {
      const response = await fetch('/api/generated/prometheus-stage/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (!result.success) {
        setSaveMessage(response.status === 401 || response.status === 403 ? WRITE_CLOSED : WRITE_FAILED);
        return;
      }

      const rowId: string | undefined = result.data?.id;
      if (!rowId) {
        setSaveMessage('The event was put up, and it stands on the Calendar.');
        return;
      }

      router.push(goesLive ? `/stage/live/${rowId}` : `/stage/schedule/${rowId}`);
    } catch {
      setSaveMessage(WRITE_FAILED);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Radio className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          <p className="text-star-dust/60 text-lg mb-2">Sign in to reach the Studio.</p>
          <p className="text-star-dust/40 text-sm mb-6">The Stage stays open either way.</p>
          <Link href="/login?redirect=/stage/studio">
            <Button variant="primary">Sign in</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!canPerform) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Sparkles className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          <p className="text-star-dust/40 text-lg mb-2">The Studio awaits your application</p>
          <p className="text-star-dust/30 text-sm mb-6">
            Apply as an artisan or a merchant to put a performance on the Stage.
          </p>
          <Link href="/council/applications">
            <Button variant="primary">Apply to Create</Button>
          </Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: 'new-event', type: 'value', title: 'Put it on the Stage', value: '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/stage" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Return to the Stage
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Studio</h1>
          <p className="text-sm text-star-dust/40 mt-1 max-w-2xl">
            Put a performance on the Stage. A title is enough; nothing goes up until you put it up,
            and a performance missed is a recording kept.
          </p>
        </div>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <Form onSubmit={handleSubmit} validate={validateEvent}>
            <FormField label="Title" required>
              <Input name="title" placeholder="What are you performing?" disabled={isSaving} />
            </FormField>

            <FormField label="Description" optional helper="Tell vessels what this is">
              <Input name="description" placeholder="Describe the performance..." disabled={isSaving} />
            </FormField>

            <FormField label="Genre" optional helper="The Comedy Hearth and the Music Realm gather by this">
              <Select name="genre" options={GENRES} placeholder="Select a genre..." disabled={isSaving} />
            </FormField>

            <FormField label="Kind" optional helper="One word, shown on the card">
              <Input name="event_type" placeholder="performance" disabled={isSaving} />
            </FormField>

            <FormField label="When" optional helper="Leave it empty and the Calendar reads TBA">
              <Input name="scheduled_for" type="datetime-local" disabled={isSaving} />
            </FormField>

            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <FormField label="On now" optional>
                <div className="flex items-center gap-4">
                  <Switch
                    label={isLive ? 'On now' : 'Not on yet'}
                    size="md"
                    checked={isLive}
                    onChange={setIsLive}
                    disabled={isSaving}
                  />
                  {isLive && (
                    <Badge variant="outline" size="sm" className="text-[10px] bg-red-500/20 text-red-400 border-red-500/30">
                      LIVE
                    </Badge>
                  )}
                </div>
              </FormField>
              <p className="text-xs text-star-dust/40 mt-2">
                On now starts it now. A time still to come keeps it on the Calendar until then.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-2 mb-4">
              <FormField label="Publish status" optional>
                <div className="flex items-center gap-4">
                  <Switch
                    label={isDraft ? 'Save as draft' : 'Publish immediately'}
                    size="md"
                    checked={!isDraft}
                    onChange={(checked) => setIsDraft(!checked)}
                    disabled={isSaving}
                  />
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    {isDraft ? 'Draft' : 'On the Stage'}
                  </Badge>
                </div>
              </FormField>
              <p className="text-xs text-star-dust/40 mt-2">
                Published means it stands on the Stage. A draft is kept off the Stage&apos;s rooms
                until you publish it.
              </p>
            </div>

            <FormActions>
              <div className="flex items-center gap-4">
                <Button type="submit" variant="primary" size="md" loading={isSaving}>
                  {isLive ? 'Go live' : 'Put it up'}
                </Button>
                <Link href="/stage/schedule" className="text-sm text-star-dust/60 hover:text-star-dust">
                  Not now
                </Link>
              </div>
            </FormActions>
          </Form>

          {saveMessage && (
            <p className="text-sm text-amber-400 mt-6" role="status">{saveMessage}</p>
          )}
        </Card>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
          <Link href="/stage/schedule" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            The Calendar
          </Link>
          <Link href="/stage/live" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust">
            <Radio className="h-4 w-4" aria-hidden="true" />
            Now Playing
          </Link>
        </div>
      </div>
    </main>
  );
}
