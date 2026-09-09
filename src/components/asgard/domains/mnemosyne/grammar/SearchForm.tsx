// src/components/asgard/domains/mnemosyne/grammar/SearchForm.tsx

import { Search } from 'lucide-react';
import {
  CATEGORY_PARAM,
  COUNTED_FROM_ROWS,
  LIVE_SOURCE,
  QUERY_MAX,
  REGISTER_UNREAD,
  SEARCH_LABEL,
  SEARCH_PARAM,
  SEARCH_WORD,
  tallyLine,
  type SearchResults,
} from '@/lib/grammar/grammar-contract';

/** The search box, submitted as a GET query on the room's own address. */
export function SearchForm({
  q,
  category,
  action,
}: {
  q: string | null;
  category: string | null;
  action: string;
}) {
  return (
    <form method="get" action={action} className="flex flex-col gap-2">
      <div className="flex h-[52px] items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4">
        <Search size={18} className="shrink-0 text-neurospark" aria-hidden="true" />
        <label htmlFor="grammar-search" className="sr-only">
          {SEARCH_LABEL}
        </label>
        <input
          id="grammar-search"
          name={SEARCH_PARAM}
          type="search"
          defaultValue={q ?? ''}
          maxLength={QUERY_MAX}
          placeholder={SEARCH_LABEL}
          className="grow bg-transparent text-base text-star-dust placeholder-star-dust/40 outline-none"
        />
        {category ? <input type="hidden" name={CATEGORY_PARAM} value={category} /> : null}
        <button
          type="submit"
          className="shrink-0 rounded-full border border-neurospark/30 px-3 py-1 text-xs text-neurospark hover:text-star-dust"
        >
          {SEARCH_WORD}
        </button>
      </div>
    </form>
  );
}

/** The tally under the box, counted from rows, beside the door it was read through. */
export function SearchNote({ results }: { results: SearchResults }) {
  const tally = tallyLine(results);
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-star-dust/40">
      <span>{tally === REGISTER_UNREAD ? `${REGISTER_UNREAD} · ${COUNTED_FROM_ROWS}` : tally}</span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-neurospark/25 px-2 py-0.5 text-[11px] text-neurospark">
        <span className="h-1.5 w-1.5 rounded-full bg-neurospark" />
        {LIVE_SOURCE}
      </span>
    </div>
  );
}
