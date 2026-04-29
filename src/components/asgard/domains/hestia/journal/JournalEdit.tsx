// src/components/asgard/domains/hestia/journal/JournalEdit.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { ArrowLeft, Save } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string | null;
  tags?: string[] | null;
  created_at: string;
}

const MOOD_OPTIONS = [
  { value: 'contemplative', label: 'Contemplative' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'peaceful', label: 'Peaceful' },
  { value: 'stormy', label: 'Stormy' },
  { value: 'hopeful', label: 'Hopeful' },
  { value: 'grateful', label: 'Grateful' },
  { value: 'melancholy', label: 'Melancholy' },
  { value: 'curious', label: 'Curious' },
];

export function JournalEdit() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const entryId = params.id as string;

  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/generated/hestia-core/journal_entries/${entryId}`);
        const result = await response.json();
        if (result.success) {
          setEntry(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch entry:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleSave = async (data: Record<string, any>) => {
    if (!entry || !user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const updates: Record<string, any> = {};
      if (data.title && data.title !== entry.title) updates.title = data.title;
      if (data.content && data.content !== entry.content) updates.content = data.content;
      if (data.mood !== undefined && data.mood !== entry.mood) updates.mood = data.mood || null;
      if (data.tags !== undefined) {
        const newTags = data.tags
          ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : null;
        updates.tags = newTags;
      }

      if (Object.keys(updates).length === 0) {
        setSaveMessage('Nothing changed.');
        setTimeout(() => setSaveMessage(null), 3000);
        return;
      }

      const response = await fetch(`/api/generated/hestia-core/journal_entries/${entry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const result = await response.json();

      if (result.success) {
        setSaveMessage('Thread rewoven.');
        setTimeout(() => {
          router.push(`/vessel/journal/${entry.id}`);
        }, 800);
      } else {
        setSaveMessage('Failed to save. Please try again.');
      }
    } catch (err) {
      setSaveMessage('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
      if (saveMessage) {
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="text" className="h-10 w-64 mb-6" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  // ─── Not Found ────────────────────────────────────────────────────────
  if (!entry) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">This thread has unraveled.</p>
          <Link href="/vessel/journal" className="text-neurospark hover:underline mt-4 inline-block">
            Return to the Scroll
          </Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = {
    id: entry.id,
    type: 'value',
    title: entry.title,
    value: entry.mood || 'entry',
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <Link
          href={`/vessel/journal/${entry.id}`}
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to entry
        </Link>

        <h1 className="text-2xl font-bold text-star-dust mb-8">Reweave the Thread</h1>

        <Card
          data={cardData}
          variant="sanctuary"
          radius="lg"
          shadow="md"
          className="p-6"
        >
          <Form onSubmit={handleSave}>
            <FormField label="Title" required>
              <Input
                name="title"
                defaultValue={entry.title}
                placeholder="What truth wants to be told?"
              />
            </FormField>

            <FormField label="Your Words" required>
              <Input
                name="content"
                defaultValue={entry.content}
                placeholder="Let the words flow..."
              />
            </FormField>

            <FormField label="Mood" optional>
              <Select
                name="mood"
                options={MOOD_OPTIONS}
                placeholder="How are you feeling?"
                defaultValue={entry.mood || ''}
              />
            </FormField>

            <FormField label="Tags" optional helper="Comma-separated">
              <Input
                name="tags"
                defaultValue={entry.tags?.join(', ') || ''}
                placeholder="reflection, growth, sanctuary"
              />
            </FormField>

            <FormActions>
              <div className="flex items-center gap-4">
                <Button type="submit" variant="primary" loading={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Reweave Thread
                </Button>
                {saveMessage && (
                  <span className={saveMessage.includes('Failed') ? 'text-error text-sm' : 'text-sanctuary-green text-sm'}>
                    {saveMessage}
                  </span>
                )}
              </div>
            </FormActions>
          </Form>
        </Card>
      </div>
    </main>
  );
}