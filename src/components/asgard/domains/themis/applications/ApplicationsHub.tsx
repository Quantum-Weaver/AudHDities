// src/components/asgard/domains/themis/applications/ApplicationsHub.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, UserCheck, FileText, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface Application {
  applications_id: string;
  user_id: string;
  application_type: string;
  status: string;
  form_data: any;
  created_at: string;
  review_notes: string | null;
}

const APPLICATION_TYPE_LABELS: Record<string, string> = {
  creator: 'Artisan',
  vendor: 'Merchant',
  curator: 'Curator',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  verified: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  suspended: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export function ApplicationsHub() {
  const { profile, roles } = useUser();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/themis-governance/applications?order=created_at.desc&limit=30')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setApplications(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const isReviewer = roles.includes('admin') || roles.includes('council');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1,2,3,4].map((i) => (<Skeleton key={i} variant="card" className="h-28" />))}
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

        {!isReviewer && (
          <div className="mb-8 flex gap-4">
            <Link href="/council/applications/apply?type=creator">
              <Button variant="primary" size="sm"><FileText className="h-4 w-4 mr-2" />Apply as Artisan</Button>
            </Link>
            <Link href="/council/applications/apply?type=vendor">
              <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2" />Apply as Merchant</Button>
            </Link>
          </div>
        )}

        {applications.length === 0 ? (
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
              const cardData: CardData = { id: app.applications_id, type: 'value', title: app.application_type, value: app.status };
              const appType = APPLICATION_TYPE_LABELS[app.application_type] || app.application_type?.replace(/_/g, ' ') || 'Unknown';
              return (
                <Card key={app.applications_id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', STATUS_COLORS[app.status] || '')}>
                        {app.status}
                      </Badge>
                      <div>
                        <p className="text-sm text-star-dust font-medium capitalize">{appType} Application</p>
                        <p className="text-xs text-star-dust/40">Submitted {formatDate(app.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === 'pending' && isReviewer && (
                        <>
                          <Button variant="primary" size="sm"><CheckCircle className="h-3 w-3 mr-1" />Approve</Button>
                          <Button variant="ghost" size="sm"><XCircle className="h-3 w-3 mr-1" />Reject</Button>
                        </>
                      )}
                      {app.status === 'pending' && !isReviewer && (
                        <span className="flex items-center gap-1 text-xs text-amber-400"><Clock size={12} />Under Review</span>
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
          <Shield className="h-5 w-5 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every application is reviewed with care. The Sanctuary welcomes artisans and merchants who share our values of sovereignty, transparency, and non-exploitation.
          </p>
        </Card>
      </div>
    </main>
  );
}