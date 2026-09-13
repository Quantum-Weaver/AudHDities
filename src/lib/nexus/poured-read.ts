// src/lib/nexus/poured-read.ts
// The poured reader: one artifact page fetched through the artifacts proxy
// under the visitor's own cookies, and the long-format block lifted out of it.

import { headers } from 'next/headers';
import { currentHost } from '@/lib/site/house-href-server';

/** The door every poured page is fetched through. */
export const ARTIFACTS_PROXY = '/artifacts-proxy';

/** The script element every poured page carries its own rows in. */
export const BLOCK_ID = 'progenatrix-data';

export type PouredCell = string | number | boolean | null;
export type PouredRow = Record<string, PouredCell>;

export interface PouredBlock {
  slug: string;
  artifact: string | null;
  table: string | null;
  view: string | null;
  published: string | null;
  columns: string[];
  rows: PouredRow[];
  fault: string | null;
}

export const POURED_UNREAD = 'the poured page did not answer';
export const POURED_NEXT = 'next · pour this artifact and carry it to the bucket';

function empty(slug: string, fault: string | null): PouredBlock {
  return {
    slug,
    artifact: null,
    table: null,
    view: null,
    published: null,
    columns: [],
    rows: [],
    fault,
  };
}

/** The JSON text between the block's own script tags, or null when there is none. */
export function liftBlock(html: string): string | null {
  const at = html.indexOf(`id="${BLOCK_ID}"`);
  if (at === -1) return null;
  const open = html.indexOf('>', at);
  if (open === -1) return null;
  const close = html.indexOf('</script>', open);
  if (close === -1) return null;
  return html.slice(open + 1, close);
}

function stringOrNull(held: unknown): string | null {
  return typeof held === 'string' && held.length > 0 ? held : null;
}

function cellsOf(held: unknown): PouredRow {
  const row: PouredRow = {};
  if (!held || typeof held !== 'object') return row;
  for (const [column, value] of Object.entries(held as Record<string, unknown>)) {
    if (value === null || value === undefined) row[column] = null;
    else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      row[column] = value;
    } else row[column] = JSON.stringify(value);
  }
  return row;
}

/** The block as the page holds it, or a fault when its shape is not the long one. */
export function parseBlock(slug: string, text: string): PouredBlock {
  let held: unknown;
  try {
    held = JSON.parse(text);
  } catch (thrown) {
    return empty(slug, `the block is not JSON · ${(thrown as Error).message}`);
  }
  if (!held || typeof held !== 'object' || !Array.isArray((held as { rows?: unknown }).rows)) {
    return empty(slug, 'the block carries no rows');
  }
  const block = held as Record<string, unknown>;
  const columns = Array.isArray(block.columns)
    ? (block.columns as unknown[]).filter((c): c is string => typeof c === 'string')
    : [];
  return {
    slug,
    artifact: stringOrNull(block.artifact),
    table: stringOrNull(block.table),
    view: stringOrNull(block.view),
    published: stringOrNull(block.published),
    columns,
    rows: (block.rows as unknown[]).map(cellsOf),
    fault: null,
  };
}

/** The address of a poured page on the host this request arrived on. */
export async function pouredUrl(slug: string): Promise<string> {
  const head = await headers();
  const host = (await currentHost()) ?? 'localhost:3000';
  const forwarded = head.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const local = host.startsWith('localhost') || host.startsWith('127.');
  const protocol = forwarded || (local ? 'http' : 'https');
  return `${protocol}://${host}${ARTIFACTS_PROXY}/${slug}`;
}

/** One poured page, through the proxy, with the visitor's own session on it. */
export async function readPoured(slug: string): Promise<PouredBlock> {
  const head = await headers();
  const cookie = head.get('cookie') ?? '';
  let response: Response;
  try {
    response = await fetch(await pouredUrl(slug), {
      headers: { cookie },
      cache: 'no-store',
      redirect: 'manual',
    });
  } catch (thrown) {
    return empty(slug, `the proxy did not answer · ${(thrown as Error).message}`);
  }
  if (response.status >= 300 && response.status < 400) {
    return empty(slug, 'the proxy asked this visitor to sign in again');
  }
  if (!response.ok) {
    return empty(slug, `the proxy answered ${response.status}`);
  }
  const text = liftBlock(await response.text());
  if (text === null) return empty(slug, 'the page carries no register block');
  return parseBlock(slug, text);
}
