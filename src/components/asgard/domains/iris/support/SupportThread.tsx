// src/components/asgard/domains/iris/support/SupportThread.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { readRow } from '../rows';
import type { CardData } from '@/types/components/runes/card.types';
import type { ContactSubmissionsRow } from '@/lib/generated/types/iris-communications/contact_submissions';

export function SupportThread() {
  const params = useParams();
  const ticketId = typeof params?.id === 'string' ? params.id : '';
  const [ticket, setTicket] = useState<ContactSubmissionsRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/generated/iris-communications/contact_submissions/${ticketId}`)
      .then((r) => r.json())
      .then((result) => { if (!cancelled) setTicket(readRow<ContactSubmissionsRow>(result)); })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [ticketId]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">This thread is not open to you.</p>
          <Link href="/connect/support" className="text-neurospark hover:underline mt-4 inline-block">Return to Support</Link>
        </div>
      </main>
    );
  }

  const subject = ticket.subject || 'Support request';
  const cardData: CardData = { id: ticket.id, type: 'value', title: subject, value: ticket.status };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/connect/support" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Support
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" size="sm" className="text-[10px] capitalize">
              {ticket.is_resolved ? 'Resolved' : 'Open'}
            </Badge>
            <Badge variant="outline" size="sm" className="text-[10px] capitalize">{ticket.priority}</Badge>
            {ticket.category && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">{ticket.category}</Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-2">{subject}</h1>
          <p className="text-xs text-star-dust/40 mb-6 flex items-center gap-1">
            <Clock size={12} />{formatDate(ticket.created_at)}
          </p>

          {ticket.message && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-star-dust/70 text-sm whitespace-pre-wrap">{ticket.message}</p>
            </div>
          )}

          {ticket.response && (
            <div className="bg-neurospark/5 border border-neurospark/20 rounded-xl p-4 mb-6">
              <p className="text-xs text-star-dust/50 mb-1">Response from the Sanctuary:</p>
              <p className="text-star-dust/70 text-sm whitespace-pre-wrap">{ticket.response}</p>
            </div>
          )}

          {ticket.responded_at && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle size={14} />Answered on {formatDate(ticket.responded_at)}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
