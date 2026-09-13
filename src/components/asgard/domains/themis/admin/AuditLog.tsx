// src/components/asgard/domains/themis/admin/AuditLog.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminActionsRow } from '@/lib/generated/types/themis-governance/admin_actions';
import type { ModerationActionsRow } from '@/lib/generated/types/themis-governance/moderation_actions';
import type { CardData } from '@/types/components/runes/card.types';

type Book = 'administration' | 'moderation';

interface Entry {
  id: string;
  book: Book;
  action_type: string;
  description: string | null;
  taken_at: string;
  target_entity_type: string | null;
  target_entity_id: string | null;
}

const BOOK_COLORS: Record<Book, string> = {
  administration: 'bg-neurospark/15 text-neurospark border-neurospark/30',
  moderation: 'bg-hearth-gold/15 text-hearth-gold border-hearth-gold/30',
};

function entryOf(book: Book, row: AdminActionsRow | ModerationActionsRow): Entry {
  return {
    id: row.id,
    book,
    action_type: row.action_type,
    description: row.description,
    taken_at: row.taken_at,
    target_entity_type: row.target_entity_type,
    target_entity_id: row.target_entity_id,
  };
}

export function AuditLog() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const read = async () => {
      const params = new URLSearchParams({ sort: 'taken_at', order: 'desc', limit: '50' });
      try {
        const [admin, moderation] = await Promise.all([
          fetch(`/api/generated/themis-governance/admin_actions?${params.toString()}`).then((r) => r.json()),
          fetch(`/api/generated/themis-governance/moderation_actions?${params.toString()}`).then((r) => r.json()),
        ]);
        if (!alive) return;

        const adminRows: AdminActionsRow[] = admin.success ? (admin.data?.data ?? []) : [];
        const moderationRows: ModerationActionsRow[] = moderation.success ? (moderation.data?.data ?? []) : [];
        if (!admin.success && !moderation.success) setFault('The action books did not answer.');

        const merged = [
          ...adminRows.map((row) => entryOf('administration', row)),
          ...moderationRows.map((row) => entryOf('moderation', row)),
        ].sort((a, b) => b.taken_at.localeCompare(a.taken_at));

        setEntries(merged);
      } catch {
        if (alive) setFault('The action books did not answer.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
    });

  if (reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (<Skeleton key={i} variant="card" className="h-20" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council/admin" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to Administration
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Audit Logs</h1>
          <p className="text-sm text-star-dust/40 mt-1">Administrative and moderation actions, newest first</p>
        </div>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No action has been taken</p>
            <p className="text-star-dust/30 text-sm">Every administrative and moderation act lands here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => {
              const cardData: CardData = {
                id: entry.id,
                type: 'value',
                title: entry.action_type,
                value: entry.book,
                description: entry.description ?? undefined,
              };
              return (
                <Card key={`${entry.book}-${entry.id}`} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', BOOK_COLORS[entry.book])}>
                          {entry.book}
                        </Badge>
                        <span className="text-sm text-star-dust font-medium capitalize">
                          {entry.action_type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      {entry.description && <p className="text-sm text-star-dust/50">{entry.description}</p>}
                      {entry.target_entity_type && (
                        <p className="text-xs text-star-dust/40">
                          {entry.target_entity_type}
                          {entry.target_entity_id ? `: ${entry.target_entity_id}` : ''}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-star-dust/40 whitespace-nowrap">{formatDate(entry.taken_at)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
