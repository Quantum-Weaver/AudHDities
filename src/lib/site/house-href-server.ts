// src/lib/site/house-href-server.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE HOST, SERVER SIDE — the request's own host, read once              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { headers } from 'next/headers';
import { houseHref } from './house-href';

/** The host the request arrived on, the forwarded one first. */
export async function currentHost(): Promise<string | null> {
  const bag = await headers();
  return bag.get('x-forwarded-host') ?? bag.get('host');
}

/** `houseHref` for the host this request arrived on. */
export async function siteHref(path: string): Promise<string> {
  return houseHref(path, await currentHost());
}
