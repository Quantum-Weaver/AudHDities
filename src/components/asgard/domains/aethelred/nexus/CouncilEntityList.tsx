// src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import type { CardData } from '@/types/components/runes/card.types';
import {
  chairHref,
  chairName,
  domainWords,
  sigilFill,
  NO_TASK,
  REFUSED,
  type CouncilChair,
} from '@/lib/nexus/council-contract';
import { PresenceMark, presenceField } from './Presence';
import { HouseWordsFooter, withHouseWords } from './HouseWords';

export interface CouncilEntityListProps {
  chairs: readonly CouncilChair[];
  /** Catalog rows no chair on the roster claims. */
  unclaimedHouses?: readonly string[];
  /** The base's own message when council_houses refused the read. */
  catalogFault?: string | null;
}

function chairCardData(chair: CouncilChair): CardData {
  return { id: chair.seat.table, type: 'council', title: chairName(chair) };
}

function Tile({ chair }: { chair: CouncilChair }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
      style={{ backgroundColor: sigilFill(chair.seat.color) }}
    >
      {chair.house?.icon_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={chair.house.icon_url} alt="" className="w-7 h-7 object-contain" />
      ) : (
        chair.seat.sigil
      )}
    </div>
  );
}

/** The catalog's domain words, or the sentence for a catalog that refused the read. */
function DomainLine({ chair, catalogFault }: { chair: CouncilChair; catalogFault?: string | null }) {
  return (
    <div className="text-xs text-star-dust/40">
      {catalogFault ? `${REFUSED} · council_houses` : withHouseWords(domainWords(chair.house))}
    </div>
  );
}

/** The presence, or the sentence for a table that refused the read. */
function PresenceLine({ chair }: { chair: CouncilChair }) {
  if (chair.presenceFault) {
    return <span className="text-xs text-star-dust/50">{REFUSED} · entity_states</span>;
  }
  return <PresenceMark presence={chair.presence} />;
}

function TaskLine({ chair }: { chair: CouncilChair }) {
  if (chair.seatFault) {
    return (
      <div className="text-xs text-star-dust/50 border-t border-white/[0.06] pt-3">
        {REFUSED} · {chair.seat.table}
      </div>
    );
  }
  const task = chair.row?.current_task?.trim();
  if (task) {
    return (
      <div className="text-xs text-star-dust/60 border-t border-white/[0.06] pt-3">
        current task · {withHouseWords(task)}
      </div>
    );
  }
  return (
    <div className="text-xs text-star-dust/40 border-t border-white/[0.06] pt-3">{NO_TASK}</div>
  );
}

export function CouncilEntityList({
  chairs,
  unclaimedHouses,
  catalogFault,
}: CouncilEntityListProps) {
  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-[1152px] px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/nexus"
            className="inline-flex items-center gap-2 text-sm text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to the Nexus
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Council</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-star-dust/40">
            <span>
              {chairs.length} {chairs.length === 1 ? 'chair' : 'chairs'} · presence read from the
              record, never assumed
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-neurospark/25 text-[11px] text-neurospark">
              <span className="w-1.5 h-1.5 rounded-full bg-neurospark" />
              live · council_houses · entity_states
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chairs.map((chair) => (
            <Link key={chair.seat.table} href={chairHref(chair)} className="h-full">
              <Card
                data={chairCardData(chair)}
                variant="glass"
                size="full"
                radius="lg"
                shadow="sm"
                className="p-5 h-full flex flex-col gap-4 hover:border-star-dust/20 motion-reduce:transition-none"
                style={presenceField(chair.presence.word)}
              >
                <div className="flex items-center gap-3">
                  <Tile chair={chair} />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="text-lg font-semibold text-star-dust truncate">
                      {withHouseWords(chairName(chair))}
                    </div>
                    <DomainLine chair={chair} catalogFault={catalogFault} />
                  </div>
                </div>
                <PresenceLine chair={chair} />
                <TaskLine chair={chair} />
              </Card>
            </Link>
          ))}
        </div>

        {unclaimedHouses && unclaimedHouses.length > 0 ? (
          <div className="text-xs text-star-dust/35">
            catalog rows no chair on the roster claims · {unclaimedHouses.join(' · ')}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-star-dust/35 border-t border-white/[0.06] pt-4">
          <span>
            present · a row within the hour &nbsp;·&nbsp; resting · an older row &nbsp;·&nbsp; not
            present · no row
          </span>
          <span>every timestamp is the row&apos;s own occurred_at</span>
        </div>

        <HouseWordsFooter />
      </div>
    </main>
  );
}
