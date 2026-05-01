// src/components/asgard/domains/iris/support/SupportThread.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface SupportTicket {
  contact_submissions_id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  notes: string | null;
  resolved_at: string | null;
}

export function SupportThread() {
  const params = useParams();
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/iris-communications/contact_submissions/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setTicket(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

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
          <p className="text-star-dust/40">This thread has been resolved.</p>
          <Link href="/connect/support" className="text-neurospark hover:underline mt-4 inline-block">Return to Support</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: ticket.contact_submissions_id, type: 'value', title: ticket.subject, value: ticket.status };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/connect/support" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Support
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" size="sm" className="text-[10px] capitalize">
              {ticket.status === 'resolved' ? 'Resolved' : ticket.status || 'Open'}
            </Badge>
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-2">{ticket.subject}</h1>
          <p className="text-xs text-star-dust/40 mb-6 flex items-center gap-1">
            <Clock size={12} />{formatDate(ticket.created_at)}
          </p>

          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-star-dust/70 text-sm whitespace-pre-wrap">{ticket.message}</p>
          </div>

          {ticket.notes && (
            <div className="bg-neurospark/5 border border-neurospark/20 rounded-xl p-4 mb-6">
              <p className="text-xs text-star-dust/50 mb-1">Response from the Sanctuary:</p>
              <p className="text-star-dust/70 text-sm">{ticket.notes}</p>
            </div>
          )}

          {ticket.resolved_at && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle size={14} />Resolved on {formatDate(ticket.resolved_at)}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}