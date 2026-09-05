'use client';

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import {
  anchorTop,
  cardHeight,
  coverage,
  dwellMarkerTop,
  isSettled,
  level,
  pile,
  procession,
  type Card,
  type Deck,
  type Geometry,
  type Room,
  type Section,
} from '@/lib/procession';

export interface ProcessionProps {
  sections: readonly Section[];
  label: string;
  geometry?: Partial<Geometry> | null;
  className?: string;
  children: (room: Room, card: Card, deck: Deck) => ReactNode;
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

const CONTROL =
  'min-h-[44px] rounded-full border border-white/10 bg-white/5 px-5! text-sm text-star-dust ' +
  'hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40';

function sameTops(a: readonly number[], b: readonly number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
  return true;
}

const STILLNESS = '(prefers-reduced-motion: reduce)';

function watchStillness(onChange: () => void): () => void {
  const mq = window.matchMedia(STILLNESS);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function readStillness(): boolean {
  return window.matchMedia(STILLNESS).matches;
}

function stillnessOnTheServer(): boolean {
  return false;
}

export function Procession({ sections, label, geometry, className, children }: ProcessionProps) {
  const corridor = useMemo(() => procession(sections, { geometry }), [sections, geometry]);
  const g: Geometry = corridor.geometry;
  const deckCount = corridor.decks.length;

  const [shown, setShown] = useState(1);
  const depth = shown > deckCount ? deckCount : shown;

  const entries = useMemo(
    () =>
      corridor.decks
        .slice(0, depth)
        .flatMap((deck) => deck.cards.map((card) => ({ deck, card, room: card.room }))),
    [corridor, depth],
  );

  /** the head of the deck last brought into view */
  const firstOfLast = useMemo(() => {
    const lastId = entries[entries.length - 1]?.deck.section.id;
    const i = entries.findIndex((e) => e.deck.section.id === lastId);
    return i < 0 ? entries.length - 1 : i;
  }, [entries]);

  const scroller = useRef<HTMLDivElement | null>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const answering = useRef(false);
  const answerAt = useRef<'head' | 'foot'>('head');
  const [vh, setVh] = useState(0);
  const [tops, setTops] = useState<number[]>([]);
  const stillness = useSyncExternalStore(watchStillness, readStillness, stillnessOnTheServer);

  const anchor = anchorTop(vh, g);
  const cardH = cardHeight(vh, g);
  const spacerPx = (vh * g.spacerVh) / 100;
  const dwellPx = (vh * g.dwellVh) / 100;
  const markerTop = dwellMarkerTop(vh, g);

  const measure = useCallback(() => {
    const box = scroller.current;
    if (!box) return;
    const top = box.getBoundingClientRect().top;
    const next: number[] = [];
    for (let i = 0; i < els.current.length; i += 1) {
      const el = els.current[i];
      next.push(el ? el.getBoundingClientRect().top - top : box.clientHeight);
    }
    setVh(box.clientHeight);
    setTops((prev) => (sameTops(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    els.current.length = entries.length;
    const frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [entries, measure, vh]);

  /** A press answers in view: the deck it brings is carried to the anchor. */
  useEffect(() => {
    if (!answering.current) return;
    answering.current = false;
    const box = scroller.current;
    const el = els.current[answerAt.current === 'head' ? firstOfLast : entries.length - 1];
    if (!box || !el) return;
    const frame = requestAnimationFrame(() => {
      const seat = anchorTop(box.clientHeight, g);
      const delta = el.getBoundingClientRect().top - box.getBoundingClientRect().top - seat;
      if (delta > 1 || delta < -1) {
        box.scrollTo({ top: box.scrollTop + delta, behavior: stillness ? 'auto' : 'smooth' });
      }
      measure();
    });
    return () => cancelAnimationFrame(frame);
  });

  const walk = (to: number) => {
    answering.current = true;
    answerAt.current = to > depth ? 'head' : 'foot';
    setShown(to);
  };

  const covs: number[] = [];
  for (let m = 0; m + 1 < tops.length; m += 1) covs.push(coverage(tops[m + 1], vh, anchor));
  const settled = tops.length > 0 && isSettled(tops[tops.length - 1], anchor, g);

  const last = entries.length - 1;

  /** the card resting on the anchor — the deepest one that has settled */
  let seated = 0;
  for (let i = 0; i < tops.length && i <= last; i += 1) {
    if (isSettled(tops[i], anchor, g)) seated = i;
  }

  return (
    <div
      className={cn('flex flex-col', className)}
      data-testid="procession"
      data-decks-shown={depth}
      data-decks={deckCount}
    >
      <div
        ref={scroller}
        onScroll={measure}
        role="group"
        aria-label={label}
        data-testid="procession-scroller"
        className="h-[70vh] overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-white/5 px-6!"
      >
        <div className="relative">
          {entries.map((e, i) => {
            const p = pile(level(covs, i), g, stillness);
            const inView = i === seated;
            return (
              <Fragment key={`${e.deck.section.id}:${e.card.room.id}`}>
                <div
                  ref={(node) => {
                    els.current[i] = node;
                  }}
                  role={e.card.landmark.role}
                  aria-label={e.room.name}
                  data-testid={inView ? 'procession-card-in-view' : undefined}
                  data-room={e.room.id}
                  className={cn(
                    'sticky flex flex-col overflow-hidden rounded-xl border bg-deep-space',
                    inView ? 'border-hearth-gold/60' : 'border-white/10',
                  )}
                  style={{
                    top: anchor,
                    height: cardH,
                    zIndex: i + 1,
                    transformOrigin: 'center top',
                    transform: `translateY(${p.lift}px) scale(${p.scale})`,
                    filter: `brightness(${p.brightness})`,
                  }}
                >
                  <div className="min-h-0 flex-1 overflow-y-auto p-5! text-star-dust">
                    {children(e.room, e.card, e.deck)}
                  </div>

                  {inView && (
                    <div className="flex flex-none items-center gap-3 border-t border-white/10 px-5! py-3!">
                      <button
                        type="button"
                        disabled={depth <= 1}
                        onClick={() => walk(depth - 1)}
                        data-testid="procession-back"
                        className={cn(CONTROL, FOCUS_RING)}
                      >
                        back
                      </button>
                      <button
                        type="button"
                        disabled={depth >= deckCount}
                        onClick={() => walk(depth + 1)}
                        data-testid="procession-onward"
                        className={cn(CONTROL, FOCUS_RING)}
                      >
                        onward
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ height: i === last ? 0 : spacerPx }} aria-hidden="true" />
              </Fragment>
            );
          })}

          <div style={{ height: dwellPx }} aria-hidden="true" className="relative">
            <div
              className={cn(
                'absolute left-0 right-0 flex flex-col gap-1 transition-opacity duration-500 motion-reduce:transition-none',
                settled ? 'opacity-60' : 'opacity-0',
              )}
              style={{ top: markerTop }}
            >
              <span className="h-px w-full bg-white/20" />
              <span className="h-px w-2/3 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
