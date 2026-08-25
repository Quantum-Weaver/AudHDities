// src/components/asgard/domains/athena/bubbles/pageTheDoor.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   PAGE, NEVER SILENTLY SHORT                                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Born 2026-08-25 (refine/athena-2026-08-25).
//
// src/lib/api/auth.ts:142-149 clamps EVERY generated door's `limit` to 100:
// `Math.min(100, Math.max(1, limit))`. A request for 200 is served 100 with
// no error and no signal — the single most dangerous silent thing in this
// realm. Raising the number does nothing; the door clamps it.
//
// The chassis is NOT edited (it is generated ground and it governs the whole
// app). Instead the rooms that can exceed a hundred rows page, using the
// `pagination.total` every generated GET already returns — exactly as
// src/lib/dailies/shelf.ts:66-89 loops PostgREST's own 1000-row clamp.
//
// Thirty stars stand today, so nothing is short yet. If the ninety-three of
// docs/sql/025 land, the catalogue is 123 and an unpaged gallery would drop
// twenty-three stars with no error at all.

const DOOR_LIMIT = 100;
const MAX_PAGES = 40;

export interface PagedRead<T> {
  rows: T[];
  total: number;
  /** false when a page came back refused or threw — never confused with empty. */
  ok: boolean;
}

/**
 * Read a generated door whole. `search` carries the filters, sort and order
 * WITHOUT `page` or `limit` — this adds both.
 */
export async function pageTheDoor<T>(
  path: string,
  search = '',
  fromPage = 1,
): Promise<PagedRead<T>> {
  const rows: T[] = [];
  let total = 0;

  for (let page = fromPage; page < fromPage + MAX_PAGES; page += 1) {
    const q = `${search ? `${search}&` : ''}page=${page}&limit=${DOOR_LIMIT}`;
    let json: {
      success?: boolean;
      data?: { data?: T[]; pagination?: { total?: number } } | T[];
    };
    try {
      const res = await fetch(`${path}?${q}`);
      json = await res.json();
    } catch {
      return { rows, total, ok: false };
    }
    if (!json?.success) return { rows, total, ok: false };

    const body = json.data;
    const batch: T[] = Array.isArray(body) ? body : (body?.data ?? []);
    total = (!Array.isArray(body) && body?.pagination?.total) || total || batch.length;
    rows.push(...batch);

    if (batch.length < DOOR_LIMIT) break;
    if (rows.length + (fromPage - 1) * DOOR_LIMIT >= total) break;
  }

  return { rows, total, ok: true };
}
