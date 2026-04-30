// src/components/asgard/domains/hestia/journal/JournalList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { CardHeader, CardContent } from '@/components/runes/cards';
import { Button } from '@/components/yggdrasil/Button';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { ArrowLeft, Plus, Feather, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface JournalEntry {
  journal_entries_id: string;
  title: string;
  content: string;
  mood?: string | null;
  tags?: string[] | null;
  created_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

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

const MOOD_COLORS: Record<string, string> = {
  contemplative: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  energetic: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  peaceful: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  stormy: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  hopeful: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  grateful: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  melancholy: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  curious: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function JournalList() {
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchEntries = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/generated/hestia-core/journal_entries?user_id=${user.id}&order=created_at.desc`
      );
      const result = await response.json();
      if (result.success) {
        setEntries(result.data?.data || result.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch journal entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const handleCreate = async (data: Record<string, any>) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/generated/hestia-core/journal_entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          title: data.title,
          content: data.content,
          mood: data.mood || null,
          tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : null,
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now(),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setShowForm(false);
        fetchEntries();
      }
    } catch (err) {
      console.error('Failed to create entry:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const previewContent = (content: string) => {
    return content.length > 120 ? content.slice(0, 120) + '...' : content;
  };

  // ─── Loading State ───────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" className="h-32" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ─── Unauthenticated ─────────────────────────────────────────────────
  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Sign in to view your Scroll.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/vessel"
              className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Vessel
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">The Scroll</h1>
            <p className="text-sm text-star-dust/40 mt-1">Your words, your story, your truth</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <X className="h-4 w-4 mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {showForm ? 'Cancel' : 'Weave a Thread'}
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card
            data={{ id: 'new-entry', type: 'value', title: 'New Entry', value: '' }}
            variant="sanctuary"
            radius="lg"
            shadow="md"
            className="p-6 mb-8"
          >
            <Form onSubmit={handleCreate}>
              <FormField label="Title" required>
                <Input
                  name="title"
                  placeholder="What truth wants to be told?"
                />
              </FormField>
              <FormField label="Your Words" required>
                <Input
                  name="content"
                  placeholder="Let the words flow..."
                />
              </FormField>
              <FormField label="Mood" optional>
                <Select
                  name="mood"
                  options={MOOD_OPTIONS}
                  placeholder="How are you feeling?"
                />
              </FormField>
              <FormField label="Tags" optional helper="Comma-separated">
                <Input
                  name="tags"
                  placeholder="reflection, growth, sanctuary"
                />
              </FormField>
              <FormActions>
                <Button type="submit" variant="primary" loading={isSaving}>
                  <Feather className="h-4 w-4 mr-2" />
                  Add to Scroll
                </Button>
              </FormActions>
            </Form>
          </Card>
        )}

        {/* Entries List */}
        {entries.length === 0 ? (
          <div className="text-center py-20">
            <Feather className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">Your scroll awaits your first words</p>
            <p className="text-star-dust/30 text-sm">Tap &ldquo;Weave a Thread&rdquo; to begin</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const cardData: CardData = {
                id: entry.journal_entries_id,
                type: 'value',
                title: entry.title,
                value: entry.mood || 'entry',
              };

              return (
                <Link key={entry.journal_entries_id} href={`/vessel/journal/${entry.journal_entries_id}`}>
                  <Card
                    data={cardData}
                    variant="glass"
                    radius="lg"
                    shadow="sm"
                    interactive
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-star-dust mb-1">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-star-dust/50 line-clamp-2">
                          {previewContent(entry.content)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="flex items-center gap-1 text-xs text-star-dust/40">
                            <Clock size={12} />
                            {formatDate(entry.created_at)}
                          </span>
                          {entry.mood && (
                            <Badge
                              variant="outline"
                              size="sm"
                              className={cn('text-[10px]', MOOD_COLORS[entry.mood] || '')}
                            >
                              {entry.mood}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}