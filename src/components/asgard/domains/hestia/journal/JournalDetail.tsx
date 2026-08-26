// src/components/asgard/domains/hestia/journal/JournalDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, Trash2, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface JournalEntry {
  journal_entries_id: string;
  title: string;
  content: string;
  mood?: string | null;
  tags?: string[] | null;
  created_at: string;
}

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

export function JournalDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const entryId = params.id as string;

  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleDelete = async () => {
    if (!entry) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/generated/hestia-core/journal_entries/${entry.journal_entries_id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        router.push('/vessel/journal');
      }
    } catch (err) {
      console.error('Failed to delete entry:', err);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="text" className="h-10 w-64 mb-6" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  // ─── Not Found ────────────────────────────────────────────────────────
  if (!entry) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/70">This thread has unraveled.</p>
          <Link href="/vessel/journal" className="text-neurospark hover:underline mt-4 inline-block">
            Return to the Scroll
          </Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = {
    id: entry.journal_entries_id,
    type: 'value',
    title: entry.title,
    value: entry.mood || 'entry',
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Back Link */}
        <Link
          href="/vessel/journal"
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to the Scroll
        </Link>

        {/* Entry Card */}
        <Card
          data={cardData}
          variant="sanctuary"
          radius="xl"
          shadow="md"
          className="p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-star-dust mb-2">
                {entry.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-star-dust/70">
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

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href={`/vessel/journal/${entry.journal_entries_id}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />Edit
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2 text-error" />Delete
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-star-dust/80 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>

          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-star-dust/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Card>

        {showConfirm && (
          <div className="mt-6 p-4 border border-error/30 rounded-xl bg-error/5 text-center">
            <p className="text-sm text-star-dust/70 mb-4">
              Deleting this entry removes it for good. There is no undo.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>
                Keep it
              </Button>
              <Button variant="primary" size="sm" loading={isDeleting} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}