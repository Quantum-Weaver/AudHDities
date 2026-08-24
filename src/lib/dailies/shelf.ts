// src/lib/dailies/shelf.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DAILIES SHELF — the whole shelf, fetched once, without a cookie    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Born 2026-08-24 with the Dailies.
//
// WHY THIS DOES NOT USE THE GENERATED DOOR, stated so it is not "corrected"
// back later by a hand doing the right thing for every other hall:
//
// Every generated API route reads through `createApiSupabase()`, which
// attaches the vessel's cookies (src/lib/api/supabase.ts). That is correct
// for every hall where the answer depends on who is asking — and it is
// exactly wrong here. A signed-in vessel opening puzzle #47 through that
// door writes an authenticated, row-identified request into the vendor's
// own logs. That is an attendance ledger: keyed to the person, derivable in
// an afternoon, and outside this house's power to purge. The device-local
// promise would be kept in the client and broken at the edge.
//
// So the shelf is read HERE, on the server, with the anon key and no
// cookie, and handed to the page whole. The vessel's browser never asks for
// a particular puzzle, because it already has all of them. There is no
// per-puzzle request to log, at any layer, for anyone.
//
// The read is cached (see `revalidate` on the page). The puzzles are public,
// published, identical for everyone, and change only when KP seeds more —
// so a shared cache is not a compromise here, it is the honest shape.
//
// Laws worn: read-only · anon-only · no cookie, ever · a shelf that cannot
// be read returns empty and the hall says so plainly rather than throwing.

// Imported ONLY from a server component (the dailies page). The house does
// not carry the `server-only` package, so this is a convention rather than a
// compiler guard — if this module is ever imported from a 'use client' file,
// the cookie-free promise above is still kept, but the read moves onto the
// vessel's own path and the caching stops being shared. Keep it server-side.

export interface Puzzle {
  slug: string;
  puzzle_form: string;
  display_order: number;
  solution: string;
  scrambled: string;
  clue: string;
  atom_word: string;
  source_emoji: string | null;
}

const SELECT =
  'slug,puzzle_form,display_order,solution,scrambled,clue,atom_word,source_emoji';

/**
 * The whole published shelf, in display order.
 *
 * Returns [] rather than throwing: an empty shelf is a state the hall knows
 * how to wear ("the shelf is still being written"), and a puzzle page that
 * 500s because a key is missing helps nobody.
 */
export async function readShelf(form = 'word-scramble'): Promise<Puzzle[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const out: Puzzle[] = [];
  // PostgREST clamps any single response to 1000 rows. 140 fit in one
  // breath today; the loop is here so the shelf may grow without a bug.
  for (let page = 0; page < 20; page += 1) {
    const query =
      `${url}/rest/v1/daily_puzzles` +
      `?select=${SELECT}` +
      `&puzzle_form=eq.${encodeURIComponent(form)}` +
      `&status=eq.published` +
      `&order=display_order.asc` +
      `&limit=1000&offset=${page * 1000}`;

    let batch: Puzzle[];
    try {
      const res = await fetch(query, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        // No credentials, no cookies — the whole point of this file.
        cache: 'force-cache',
      });
      if (!res.ok) return out;
      batch = (await res.json()) as Puzzle[];
    } catch {
      return out;
    }

    out.push(...batch);
    if (batch.length < 1000) return out;
  }
  return out;
}
