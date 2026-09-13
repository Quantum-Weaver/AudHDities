// src/components/asgard/domains/themis/applications/ApplicationDetail.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { Textarea } from '@/components/forging/Textarea';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, CheckCircle, XCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  APPLICATION_TYPE_LABELS,
  isOpen,
  statusColor,
  statusLabel,
} from '@/components/asgard/domains/themis/status';
import { reviewApplication, type ReviewDecision } from '@/components/asgard/domains/themis/applications/review';
import type { ApplicationsRow } from '@/lib/generated/types/themis-governance/applications';
import type { CardData } from '@/types/components/runes/card.types';

interface ApplicationDetailProps {
  id: string;
}

const FIELD_LABELS: Record<string, string> = {
  artisan_name: 'Artisan name',
  business_name: 'Business name',
  business_type: 'Business type',
  business_description: 'Description',
  creative_description: 'Description',
  creative_categories: 'Categories',
  product_categories: 'Categories',
  service_regions: 'Regions',
  portfolio_url: 'Portfolio',
  website_url: 'Website',
  experience: 'Experience',
  motivation: 'Motivation',
  goals: 'Motivation',
  additional_info: 'Anything else',
};

function entries(form: ApplicationsRow['form_data']): [string, string][] {
  if (!form || typeof form !== 'object' || Array.isArray(form)) return [];
  return Object.entries(form as Record<string, unknown>).map(([key, value]) => [
    FIELD_LABELS[key] ?? key.replace(/_/g, ' '),
    Array.isArray(value) ? value.join(', ') : String(value ?? ''),
  ]);
}

export function ApplicationDetail({ id }: ApplicationDetailProps) {
  const { user, roles, isLoading } = useUser();
  const [application, setApplication] = useState<ApplicationsRow | null>(null);
  const [reading, setReading] = useState(true);
  const [notes, setNotes] = useState('');
  const [fault, setFault] = useState<string | null>(null);
  const [deciding, setDeciding] = useState(false);

  const isReviewer = roles.includes('admin');

  useEffect(() => {
    let alive = true;

    const read = async () => {
      try {
        const response = await fetch(`/api/generated/themis-governance/applications/${id}`);
        const result = await response.json();
        if (!alive) return;
        if (result.success) setApplication(result.data);
        else setFault(result.error || 'This application could not be read.');
      } catch {
        if (alive) setFault('This application could not be read.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, [id]);

  const decide = useCallback(async (decision: ReviewDecision) => {
    if (!application || !user) return;
    setDeciding(true);
    setFault(null);
    const result = await reviewApplication(application, decision, notes, user.id);
    const settled = result.status;
    if (settled) {
      setApplication((prev) =>
        prev ? { ...prev, status: settled, review_notes: notes.trim() || null } : prev
      );
    }
    if (result.error) setFault(result.error);
    setDeciding(false);
  }, [application, notes, user]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (isLoading || reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">{fault ?? 'This application is not yours to read.'}</p>
          <Link href="/council/applications" className="text-neurospark hover:underline mt-4 inline-block">
            Return to Applications
          </Link>
        </div>
      </main>
    );
  }

  const appType = APPLICATION_TYPE_LABELS[application.application_type] ?? application.application_type;
  const cardData: CardData = {
    id: application.id,
    type: 'value',
    title: `${appType} Application`,
    value: application.status,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/council/applications" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Applications
        </Link>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" size="sm" className={cn('text-[10px]', statusColor(application.status))}>
              {statusLabel(application.status)}
            </Badge>
            <span className="text-xs text-star-dust/40">Submitted {formatDate(application.created_at)}</span>
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-6">{appType} Application</h1>

          <dl className="space-y-4 mb-8">
            {entries(application.form_data).map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-star-dust/40">{label}</dt>
                <dd className="text-sm text-star-dust/80 whitespace-pre-line">{value || '—'}</dd>
              </div>
            ))}
          </dl>

          {application.review_notes && (
            <div className="bg-white/5 rounded-xl p-4 mb-8">
              <p className="text-xs uppercase tracking-wide text-star-dust/40 mb-1">Review notes</p>
              <p className="text-sm text-star-dust/80">{application.review_notes}</p>
            </div>
          )}

          {isReviewer && isOpen(application.status) && (
            <div className="space-y-4">
              <Textarea
                name="review_notes"
                label="Review notes"
                optional
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What the applicant should know about this decision"
              />
              <div className="flex gap-3">
                <Button variant="primary" size="md" loading={deciding} onClick={() => decide('approve')}>
                  <CheckCircle className="h-4 w-4 mr-2" />Approve
                </Button>
                <Button variant="ghost" size="md" loading={deciding} onClick={() => decide('reject')}>
                  <XCircle className="h-4 w-4 mr-2" />Reject
                </Button>
              </div>
            </div>
          )}

          {!isReviewer && isOpen(application.status) && (
            <div className="flex items-center gap-2 text-sm text-hearth-gold bg-hearth-gold/10 rounded-xl px-4 py-3">
              <Shield size={14} />
              <span>The Council is reading this application.</span>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
