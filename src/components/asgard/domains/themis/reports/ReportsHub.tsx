// src/components/asgard/domains/themis/reports/ReportsHub.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Shield, AlertTriangle, Flag, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface Report {
  reports_id: string;
  reason: string;
  report_type: string;
  status: string;
  target_type: string;
  target_id: string;
  reporter_id: string;
  created_at: string;
  resolution: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  reviewed: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  dismissed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export function ReportsHub() {
  const { profile } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/themis-governance/reports?order=created_at.desc&limit=30')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setReports(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const isModerator = profile?.is_admin === true || profile?.is_moderator === true;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1,2,3,4,5].map((i) => (<Skeleton key={i} variant="card" className="h-24" />))}
          </div>
        </div>
      </main>
    );
  }

  if (!isModerator) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Council
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Reports</h1>
          </div>
          <Card data={{ id: 'reports-restricted', type: 'value', title: 'Moderator Access Only', value: '' }}
            variant="glass" radius="lg" shadow="sm" className="p-6 text-center">
            <Shield className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">Report management is restricted to moderators and administrators.</p>
          </Card>
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
          <h1 className="text-2xl font-bold text-star-dust">Reports</h1>
          <p className="text-sm text-star-dust/40 mt-1">Community-driven moderation, fully transparent</p>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-20">
            <Flag className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No reports to review</p>
            <p className="text-star-dust/30 text-sm">The community is at peace.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {reports.map((report) => {
              const cardData: CardData = { id: report.reports_id, type: 'value', title: report.reason, value: report.status };
              return (
                <Card key={report.reports_id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', STATUS_COLORS[report.status] || '')}>
                        {report.status}
                      </Badge>
                      <div>
                        <p className="text-sm text-star-dust font-medium">{report.reason}</p>
                        <p className="text-xs text-star-dust/40">
                          {report.target_type}: {report.target_id} · Reported {formatDate(report.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.resolution && (
                        <span className="text-xs text-star-dust/40 max-w-[200px] truncate">{report.resolution}</span>
                      )}
                      {report.status === 'pending' && (
                        <Badge variant="outline" size="sm" className="text-[10px] bg-amber-500/20 text-amber-400">Action Needed</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <Card data={{ id: 'reports-covenant', type: 'value', title: 'Moderation Covenant', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="mt-8 p-6 text-center">
          <AlertTriangle className="h-5 w-5 text-amber-400 mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every report is reviewed. Every action is logged. Moderation is transparent, not hidden behind closed doors.
          </p>
        </Card>
      </div>
    </main>
  );
}