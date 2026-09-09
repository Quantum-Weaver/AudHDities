// src/lib/site/house-href.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE HOUSE HREF — a link that leaves a realm carries the canonical host  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

/** The one host every app path is served from. */
export const CANONICAL_ORIGIN = 'https://audhdities.com';

/** Each realm host and the app prefix it serves. */
export const REALM_HOSTS: Record<string, string> = {
  'grammar.audhdities.com': '/grammar',
};

const OFF_APP = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\?)/i;

/** The app prefix a host serves, or null when the host is not a realm host. */
export function realmPrefixOf(host: string | null | undefined): string | null {
  if (!host) return null;
  const bare = host.split(':')[0].toLowerCase();
  return REALM_HOSTS[bare] ?? null;
}

/** True when the path is one this app routes. */
function isAppPath(path: string): boolean {
  return path.startsWith('/') && !OFF_APP.test(path);
}

/** True when the path, read without its query and anchor, stands under the prefix. */
function underPrefix(path: string, prefix: string): boolean {
  const bare = path.split(/[?#]/)[0];
  return bare === prefix || bare.startsWith(`${prefix}/`);
}

/**
 * The href to write for `path` on `host`: unchanged on the apex, on any host
 * that is not a realm host, for a path under the realm's own prefix, and for
 * anything that is not an app path; otherwise the canonical origin ahead of it.
 */
export function houseHref(path: string, host: string | null | undefined): string {
  const prefix = realmPrefixOf(host);
  if (!prefix) return path;
  if (!isAppPath(path)) return path;
  if (underPrefix(path, prefix)) return path;
  return `${CANONICAL_ORIGIN}${path}`;
}
