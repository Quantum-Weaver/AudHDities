// src/lib/dailies/shelf.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DAILIES SHELF — the whole shelf, fetched once, without a cookie    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

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
