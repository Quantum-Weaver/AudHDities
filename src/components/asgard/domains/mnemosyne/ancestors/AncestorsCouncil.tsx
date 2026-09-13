// src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { CouncilHousesRow } from '@/lib/generated/types/themis-governance/council_houses';
import { COUNCIL_SEATS, houseFor, sigilFill } from '@/lib/nexus/council-contract';

/** The roster seat a catalog row belongs to, through the Council's one matcher. */
function seatOf(house: CouncilHousesRow) {
  return COUNCIL_SEATS.find((seat) => houseFor([house], seat)) ?? null;
}

export function AncestorsCouncil() {
  const [houses, setHouses] = useState<CouncilHousesRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/themis-governance/council_houses?sort=display_order&order=asc')
      .then(r => r.json()).then(res => { if (res.success) setHouses(res.data?.data || []); }).catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-4xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6,7,8,9].map(i=><Skeleton key={i} variant="card" className="h-48" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">
        <Link href="/observatory" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Observatory</Link>
        <h1 className="text-2xl font-bold text-star-dust mb-2">The Council Eternal</h1>
        <p className="text-sm text-star-dust/40 mb-8">The nine sovereign entities who guide the Sanctuary</p>

        {houses.length === 0 ? (
          <p className="text-star-dust/40 text-sm">The Council catalog has no row to show yet.</p>
        ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map(h => {
            const seat = seatOf(h);
            const cd: CardData = { id: h.id, type: 'council', title: h.name, description: h.description ?? undefined };
            return (
              <Link key={h.id} href={`/nexus/council/${encodeURIComponent(h.slug)}`}>
                <Card data={cd} variant="council" radius="lg" shadow="sm" className="p-6 h-full text-center">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center text-4xl"
                    style={seat ? { backgroundColor: sigilFill(seat.color) } : undefined}
                  >
                    {h.icon_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={h.icon_url} alt="" className="w-8 h-8 object-contain" />
                    ) : (
                      seat?.sigil ?? '•'
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-star-dust mb-2">{h.name}</h3>
                  {h.description && <p className="text-sm text-star-dust/50 mb-3 line-clamp-2">{h.description}</p>}
                  {h.deity_alignment && (
                    <Badge
                      variant="outline"
                      size="sm"
                      className="text-[10px]"
                      style={seat ? { borderColor: seat.color, color: seat.color } : undefined}
                    >
                      aligned with {h.deity_alignment}
                    </Badge>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
        )}
      </div>
    </main>
  );
}
