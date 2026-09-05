'use client';

import { useId, useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { galleryOf, type GalleryCard, type GalleryConfig } from '@/lib/gallery';

export interface GalleryProps<T> {
  items: readonly T[];
  config: GalleryConfig<T>;
  label: string;
  placeholder?: string;
  className?: string;
  /** Drops the cell's own shell so the face brings its own. */
  bare?: boolean;
  children?: (card: GalleryCard) => ReactNode;
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

function DefaultFace({ card }: { card: GalleryCard }) {
  return (
    <>
      <h3 className="font-semibold text-star-dust">{card.title}</h3>
      {card.badges.length > 0 && (
        <div className="mt-2! flex flex-wrap gap-1.5">
          {card.badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-2! py-0.5! text-[10px] uppercase tracking-wide text-star-dust/70"
            >
              {b}
            </span>
          ))}
        </div>
      )}
      {card.preview && <p className="mt-3! text-sm text-star-dust/70">{card.preview}</p>}
      {card.meta && <p className="mt-3! text-xs text-star-dust/70">{card.meta}</p>}
    </>
  );
}

export function Gallery<T>({
  items,
  config,
  label,
  placeholder = 'filter',
  className,
  bare = false,
  children,
}: GalleryProps<T>) {
  const [term, setTerm] = useState('');
  const boxId = useId();
  const view = useMemo(() => galleryOf(config, items, term), [config, items, term]);

  return (
    <div className={cn('flex flex-col gap-4', className)} data-testid="gallery">
      <div>
        <label htmlFor={boxId} className="sr-only">
          {label}
        </label>
        <input
          id={boxId}
          type="search"
          value={term}
          placeholder={placeholder}
          onChange={(e) => setTerm(e.target.value)}
          data-testid="gallery-filter"
          className={cn(
            'w-full rounded-lg border border-white/10 bg-white/5 px-4! py-2! text-sm text-star-dust',
            'placeholder-white/70 focus:border-neurospark',
            FOCUS_RING,
          )}
        />
      </div>

      {view.empty ? (
        <p
          className="py-12! text-center text-sm text-star-dust/70"
          data-testid="gallery-empty"
          data-empty={view.empty.kind}
        >
          {view.empty.message}
        </p>
      ) : (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="gallery-cards"
          data-count={view.cards.length}
        >
          {view.cards.map((card) => (
            <article
              key={card.id}
              data-address={card.address}
              className={bare ? undefined : 'rounded-xl border border-white/10 bg-white/5 p-5!'}
            >
              {children ? children(card) : <DefaultFace card={card} />}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
