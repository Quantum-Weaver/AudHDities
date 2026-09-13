// src/components/asgard/domains/themis/reports/ReportsHub.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, Shield, AlertTriangle, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isOpen, statusColor, statusLabel } from '@/components/asgard/domains/themis/status';
import type { ReportsRow } from '@/lib/generated/types/themis-governance/reports';
import type { CardData } from '@/types/components/runes/card.types';

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-void-light/15 text-void-light border-void-light/30',
  normal: 'bg-neurospark/15 text-neurospark border-neurospark/30',
  high: 'bg-hearth-gold/15 text-hearth-gold border-hearth-gold/30',
  urgent: 'bg-fire-base/15 text-fire-base border-fire-base/30',
};

export function ReportsHub() {
  const { roles, isLoading } = useUser();
  const [reports, setReports] = useState<ReportsRow[]>([]);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);

  const isModerator = roles.includes('admin') || roles.includes('council');

  useEffect(() => {
    if (isLoading) return;
    let alive = true;

    const read = async () => {
      if (!isModerator) {
        if (alive) setReading(false);
        return;
      }
      const params = new URLSearchParams({ sort: 'created_at', order: 'desc', limit: '30' });
      try {
        const response = await fetch(`/api/generated/themis-governance/reports?${params.toString()}`);
        const result = await response.json();
        if (!alive) return;
        if (result.success) setReports(result.data?.data ?? []);
        else setFault(result.error || 'The reports did not answer.');
      } catch {
        if (alive) setFault('The reports did not answer.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, [isLoading, isModerator]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (isLoading || reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (<Skeleton key={i} variant="card" className="h-24" />))}
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
            <Shield className="h-8 w-8 text-hearth-gold mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">Report management is held by the Council and admin roles.</p>
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

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        {reports.length === 0 ? (
          <div className="text-center py-20">
            <Flag className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No reports to review</p>
            <p className="text-star-dust/30 text-sm">The community is at peace.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {reports.map((report) => {
              const cardData: CardData = {
                id: report.id,
                type: 'value',
                title: report.name,
                value: report.status,
                description: report.description ?? undefined,
              };
              return (
                <Card key={report.id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" size="sm" className={cn('text-[10px]', statusColor(report.status))}>
                        {statusLabel(report.status)}
                      </Badge>
                      <div>
                        <p className="text-sm text-star-dust font-medium">{report.name}</p>
                        <p className="text-xs text-star-dust/40">
                          {report.reported_entity_type ?? 'unnamed'}
                          {report.reported_entity_id ? `: ${report.reported_entity_id}` : ''}
                          {' · Reported '}{formatDate(report.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', PRIORITY_COLORS[report.priority] ?? PRIORITY_COLORS.normal)}>
                        {report.priority}
                      </Badge>
                      {report.resolution && (
                        <span className="text-xs text-star-dust/40 max-w-[200px] truncate">{report.resolution}</span>
                      )}
                      {isOpen(report.status) && (
                        <Badge variant="outline" size="sm" className="text-[10px] bg-hearth-gold/15 text-hearth-gold border-hearth-gold/30">Action Needed</Badge>
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
          <AlertTriangle className="h-5 w-5 text-hearth-gold mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every report is reviewed. Every action is logged. Moderation is transparent, not hidden behind closed doors.
          </p>
        </Card>
      </div>
    </main>
  );
}
