// src/components/asgard/domains/themis/applications/ApplicationsHub.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, UserCheck, FileText, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
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

export function ApplicationsHub() {
  const { user, roles, isLoading } = useUser();
  const [applications, setApplications] = useState<ApplicationsRow[]>([]);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);
  const [deciding, setDeciding] = useState<string | null>(null);

  const isReviewer = roles.includes('admin');

  useEffect(() => {
    if (isLoading) return;
    let alive = true;

    const read = async () => {
      if (!isReviewer && !user) {
        if (alive) setReading(false);
        return;
      }
      const params = new URLSearchParams({ sort: 'created_at', order: 'desc', limit: '30' });
      if (!isReviewer && user) params.set('user_id', user.id);
      try {
        const response = await fetch(`/api/generated/themis-governance/applications?${params.toString()}`);
        const result = await response.json();
        if (!alive) return;
        if (result.success) setApplications(result.data?.data ?? []);
        else setFault(result.error || 'The applications did not answer.');
      } catch {
        if (alive) setFault('The applications did not answer.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, [isLoading, isReviewer, user]);

  const decide = useCallback(async (application: ApplicationsRow, decision: ReviewDecision) => {
    if (!user) return;
    setDeciding(application.id);
    setFault(null);
    const result = await reviewApplication(application, decision, '', user.id);
    const settled = result.status;
    if (settled) {
      setApplications((prev) =>
        prev.map((row) => (row.id === application.id ? { ...row, status: settled } : row))
      );
    }
    if (result.error) setFault(result.error);
    setDeciding(null);
  }, [user]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (isLoading || reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (<Skeleton key={i} variant="card" className="h-28" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Applications</h1>
          <p className="text-sm text-star-dust/40 mt-1">
            {isReviewer ? 'Review artisan, merchant, and curator applications' : 'Your applications to the Sanctuary'}
          </p>
        </div>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        {!isReviewer && (
          <div className="mb-8 flex gap-4">
            <Link href="/council/applications/artisan">
              <Button variant="primary" size="sm"><FileText className="h-4 w-4 mr-2" />Apply as Artisan</Button>
            </Link>
            <Link href="/council/applications/merchant">
              <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2" />Apply as Merchant</Button>
            </Link>
          </div>
        )}

        {!isReviewer && !user ? (
          <div className="text-center py-20">
            <UserCheck className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">Sign in to see your applications</p>
            <Link href="/login" className="text-neurospark hover:underline text-sm">Sign in</Link>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20">
            <UserCheck className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No applications yet</p>
            <p className="text-star-dust/30 text-sm">
              {isReviewer ? 'Applications will appear here when submitted.' : 'Apply to become an artisan or merchant.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const cardData: CardData = { id: app.id, type: 'value', title: app.application_type, value: app.status };
              const appType = APPLICATION_TYPE_LABELS[app.application_type] ?? app.application_type;
              const open = isOpen(app.status);
              return (
                <Card key={app.id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" size="sm" className={cn('text-[10px]', statusColor(app.status))}>
                        {statusLabel(app.status)}
                      </Badge>
                      <div>
                        <Link href={`/council/applications/${app.id}`} className="text-sm text-star-dust font-medium hover:text-neurospark transition-colors">
                          {appType} Application
                        </Link>
                        <p className="text-xs text-star-dust/40">Submitted {formatDate(app.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {open && isReviewer && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            loading={deciding === app.id}
                            onClick={() => decide(app, 'approve')}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            loading={deciding === app.id}
                            onClick={() => decide(app, 'reject')}
                          >
                            <XCircle className="h-3 w-3 mr-1" />Reject
                          </Button>
                        </>
                      )}
                      {open && !isReviewer && (
                        <span className="flex items-center gap-1 text-xs text-hearth-gold"><Clock size={12} />Under review</span>
                      )}
                      {app.review_notes && (
                        <span className="text-xs text-star-dust/40 max-w-[200px] truncate">{app.review_notes}</span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <Card data={{ id: 'applications-covenant', type: 'value', title: 'Application Covenant', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="mt-8 p-6 text-center">
          <Shield className="h-5 w-5 text-mood-creative mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every application is reviewed with care. The Sanctuary welcomes artisans and merchants who share our values of sovereignty, transparency, and non-exploitation.
          </p>
        </Card>
      </div>
    </main>
  );
}
