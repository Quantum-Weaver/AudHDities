// src/components/asgard/domains/hestia/energy/EnergyEntryDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Zap, Clock, Trash2 } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface EnergyEntry {
  id: string;
  energy_level: number;
  notes?: string | null;
  mood_tags?: string[] | null;
  logged_at: string;
}

const ENERGY_LABELS: Record<number, string> = {
  1: 'Drained', 2: 'Low', 3: 'Tired', 4: 'Dim', 5: 'Steady',
  6: 'Alright', 7: 'Good', 8: 'Bright', 9: 'Glowing', 10: 'Radiant',
};

function getEnergyColor(level: number): string {
  if (level <= 2) return '#636E72';
  if (level <= 4) return '#74B9FF';
  if (level <= 6) return '#00CEC9';
  if (level <= 8) return '#FDCB6E';
  return '#00B894';
}

export function EnergyEntryDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [entry, setEntry] = useState<EnergyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/generated/hestia-core/energy_entries/${params.id}`)
      .then(r => r.json())
      .then(result => { if (result.success) setEntry(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleDelete = async () => {
    if (!entry) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/generated/hestia-core/energy_entries/${entry.id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) router.push('/vessel/energy');
    } catch (err) { console.error('Failed to delete:', err); }
    finally { setIsDeleting(false); setShowConfirm(false); }
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const formatTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!entry) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><Zap className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/70">This moment has faded.</p><Link href="/vessel/energy" className="text-neurospark hover:underline mt-4 inline-block">Return to Energy Log</Link></div></main>);

  const cd: CardData = { id: entry.id, type: 'stat', title: ENERGY_LABELS[entry.energy_level] || 'Energy Entry', value: entry.energy_level };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/vessel/energy" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to Energy Log</Link>
        <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
            style={{ backgroundColor: `${getEnergyColor(entry.energy_level)}20`, color: getEnergyColor(entry.energy_level), border: `3px solid ${getEnergyColor(entry.energy_level)}40` }}>
            {entry.energy_level}
          </div>
          <h1 className="text-2xl font-bold text-star-dust mb-2">{ENERGY_LABELS[entry.energy_level]}</h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-sm text-star-dust/70"><Clock size={14} />{formatDate(entry.logged_at)} at {formatTime(entry.logged_at)}</span>
            {entry.mood_tags?.[0] && <Badge variant="outline" size="sm" className="text-[10px]">{entry.mood_tags[0]}</Badge>}
          </div>
          {entry.notes && <p className="text-star-dust/70 max-w-md mx-auto mb-6">{entry.notes}</p>}
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
            <Button variant="ghost" size="md" onClick={() => setShowConfirm(true)}><Trash2 className="h-4 w-4 mr-2 text-error" />Delete</Button>
          </div>
          {showConfirm && (
            <div className="mt-6 p-4 border border-error/30 rounded-xl bg-error/5">
              <p className="text-sm text-star-dust/70 mb-4">Deleting this entry removes it for good. There is no undo.</p>
              <div className="flex gap-3 justify-center">
                <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>Keep it</Button>
                <Button variant="primary" size="sm" loading={isDeleting} onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}