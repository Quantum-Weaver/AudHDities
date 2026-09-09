// src/components/asgard/domains/aethelred/nexus/EntityDetail.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import type { CardData } from '@/types/components/runes/card.types';
import {
  chairName,
  domainWords,
  sigilFill,
  NO_ROW_YET,
  NO_TASK,
  REFUSED,
  type CouncilChair,
} from '@/lib/nexus/council-contract';
import { PresenceMark, presenceField } from './Presence';
import { Register, type RegisterRow, type RegisterSection } from './Register';
import { HouseWordsFooter, withHouseWords } from './HouseWords';

export interface EntityDetailProps {
  chair: CouncilChair;
  sections: readonly RegisterSection[];
  rows: readonly RegisterRow[];
}

function chairCardData(chair: CouncilChair): CardData {
  return { id: chair.seat.table, type: 'council', title: chairName(chair) };
}

function BackToCouncil() {
  return (
    <Link
      href="/nexus/council"
      className="inline-flex items-center gap-2 text-sm text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none w-fit"
    >
      <ArrowLeft className="h-4 w-4" />
      Return to the Council
    </Link>
  );
}

export function EntityDetail({ chair, sections, rows }: EntityDetailProps) {
  const task = chair.row?.current_task?.trim();

  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-6 flex flex-col gap-6">
        <BackToCouncil />

        <Card
          data={chairCardData(chair)}
          variant="glass"
          size="full"
          radius="xl"
          shadow="sm"
          className="p-6 sm:p-8 flex flex-col gap-5 motion-reduce:transition-none"
          style={presenceField(chair.presence.word)}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{
                backgroundColor: sigilFill(chair.seat.color),
                border: `3px solid ${chair.seat.color}40`,
              }}
            >
              {chair.house?.icon_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={chair.house.icon_url} alt="" className="w-10 h-10 object-contain" />
              ) : (
                chair.seat.sigil
              )}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h1 className="text-2xl font-bold text-star-dust">
                {withHouseWords(chairName(chair))}
              </h1>
              <div className="text-sm" style={{ color: chair.seat.color }}>
                {withHouseWords(domainWords(chair.house))}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs mt-1">
                {chair.presenceFault ? (
                  <span className="text-xs text-star-dust/50">{REFUSED} · entity_states</span>
                ) : (
                  <PresenceMark presence={chair.presence} className="justify-start" />
                )}
                <span className="inline-flex items-center gap-1.5 text-[11px] text-neurospark">
                  <span className="w-1.5 h-1.5 rounded-full bg-neurospark" />
                  live · entity_states
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.06] pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.12em] uppercase text-star-dust/55">
                current task
              </span>
              <span className={task ? 'text-sm text-star-dust' : 'text-sm text-star-dust/50'}>
                {task
                  ? withHouseWords(task)
                  : chair.seatFault
                    ? `${REFUSED} · ${chair.seat.table}`
                    : NO_TASK}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.12em] uppercase text-star-dust/55">
                the chair&apos;s row
              </span>
              <span className={chair.row ? 'text-sm text-star-dust' : 'text-sm text-star-dust/50'}>
                {chair.row
                  ? `is_active · ${chair.row.is_active}`
                  : chair.seatFault
                    ? `${REFUSED} · ${chair.seat.table}`
                    : NO_ROW_YET}
              </span>
            </div>
          </div>
        </Card>

        <Register sections={sections} rows={rows} />

        <HouseWordsFooter />
      </div>
    </main>
  );
}

export interface ChairNotFoundProps {
  id: string;
}

/** The room an address outside the roster reaches. */
export function ChairNotFound({ id }: ChairNotFoundProps) {
  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-6 flex flex-col gap-6">
        <BackToCouncil />
        <h1 className="text-2xl font-bold text-star-dust">{withHouseWords(id)}</h1>
        <div className="text-[13px] text-star-dust/50">
          no chair on the roster carries this name
        </div>
        <HouseWordsFooter />
      </div>
    </main>
  );
}
