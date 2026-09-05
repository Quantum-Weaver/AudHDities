'use client';

import { useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  arrive,
  back,
  chart,
  onward,
  type Bearing,
  type Landfall,
  type Promenade,
  type Vista,
} from '@/lib/promenade';

/** One stop on the rail. Every other key rides through unread. */
export interface CarouselStop {
  id: string;
  title: string;
  form?: string;
  /** the stop's own declared millisecond; a stop without one keeps its given place. */
  at?: number;
}

/** What the face is told about the stop it is drawing. */
export interface CarouselFace {
  focused: boolean;
  place: number;
  of: number;
}

export interface CarouselProps<S extends CarouselStop> {
  stops: readonly S[];
  label: string;
  /** which way the declared dates are walked through time. */
  bearing?: Bearing;
  /** the rail's height in pixels; every card stands 16px inside it. */
  height?: number;
  onSelect?: (stop: S) => void;
  className?: string;
  children: (stop: S, face: CarouselFace) => ReactNode;
}

const FOCUS_W = 300;
const REST_W = 236;
const GAP = 20;
const REST_OPACITY = 0.45;

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

export function Carousel<S extends CarouselStop>({
  stops,
  label,
  bearing = 'newest',
  height = 176,
  onSelect,
  className,
  children,
}: CarouselProps<S>) {
  const coast = useMemo(() => {
    const shore: Landfall[] = stops.map((s) => ({
      id: s.id,
      title: s.title,
      form: s.form ?? 'stop',
      releasedAt: s.at,
      stop: s,
    }));
    return chart(shore, 'chronological', bearing, null);
  }, [stops, bearing]);

  const [walked, setWalked] = useState<Promenade | null>(null);
  const walk =
    walked && walked.coast === coast ? walked : arrive(coast, 'the reader opened the carousel');

  const at = walk.place;
  const stopOf = (v: Vista): S => v.landfall.stop as S;

  // The rail slides so the awake stop's centre sits on the frame's centre.
  const shift = at * (REST_W + GAP) + FOCUS_W / 2;

  const restOf = (place: number) => {
    const d = place - at < 0 ? at - place : place - at;
    return d === 0 ? 1 : d === 1 ? REST_OPACITY : REST_OPACITY * 0.5;
  };

  const step = (dir: 1 | -1, act: string) => {
    setWalked(dir === 1 ? onward(walk, act) : back(walk, act));
  };

  const press = (place: number) => {
    if (!walk.arrived) return;
    if (place === at) {
      if (walk.here && onSelect) onSelect(stopOf(walk.here));
      return;
    }
    step(place > at ? 1 : -1, 'a neighbour pressed, one step toward it');
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowLeft') step(-1, 'the left arrow, pressed');
    else if (e.key === 'ArrowRight') step(1, 'the right arrow, pressed');
    else if (e.key === 'Enter') {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button')) return;
      if (walk.here && onSelect) onSelect(stopOf(walk.here));
    } else return;
    e.preventDefault();
  };

  return (
    <div
      className={cn('flex flex-col gap-4', className)}
      role="group"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKey}
      data-testid="carousel"
    >
      {/* The rail is placed by its own transform, so the frame keeps no scroll of its own. */}
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
        style={{ height }}
        onScroll={(e) => {
          e.currentTarget.scrollLeft = 0;
        }}
      >
        <div
          className="absolute inset-y-4 left-1/2 flex items-stretch transition-transform duration-300 motion-reduce:transition-none"
          style={{ gap: `${GAP}px`, transform: `translateX(${-shift}px)` }}
        >
          {coast.vistas.map((v) => {
            const s = stopOf(v);
            const focused = v.place === at;
            return (
              <button
                key={v.id}
                type="button"
                aria-current={focused ? 'true' : undefined}
                data-place={v.place}
                data-focused={focused ? 'true' : 'false'}
                className={cn(
                  'flex-none rounded-lg border p-4! text-left text-star-dust transition-opacity duration-300 motion-reduce:transition-none',
                  focused
                    ? 'border-hearth-gold/60 bg-white/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10',
                  FOCUS_RING,
                )}
                style={{ width: focused ? FOCUS_W : REST_W, opacity: restOf(v.place) }}
                onClick={() => press(v.place)}
              >
                {children(s, { focused, place: v.place, of: v.of })}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          disabled={!walk.arrived || walk.atStart}
          onClick={() => step(-1, 'back, pressed')}
          data-testid="carousel-back"
          className={cn(
            'min-h-[44px] rounded-full border border-white/10 bg-white/5 px-5! text-sm text-star-dust',
            'hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40',
            FOCUS_RING,
          )}
        >
          back
        </button>
        <span className="text-sm text-star-dust/70" data-testid="carousel-count" aria-live="polite">
          {walk.arrived ? `${at + 1} of ${coast.length}` : `0 of ${coast.length}`}
        </span>
        <button
          type="button"
          disabled={!walk.arrived || walk.atEnd}
          onClick={() => step(1, 'onward, pressed')}
          data-testid="carousel-onward"
          className={cn(
            'min-h-[44px] rounded-full border border-white/10 bg-white/5 px-5! text-sm text-star-dust',
            'hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40',
            FOCUS_RING,
          )}
        >
          onward
        </button>
      </div>

      {walk.atEnd && (
        <p className="text-center text-xs text-star-dust/70" data-testid="carousel-ending">
          {coast.ending}
        </p>
      )}
    </div>
  );
}
