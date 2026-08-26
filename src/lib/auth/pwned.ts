const HIBP_RANGE_URL = 'https://api.pwnedpasswords.com/range/';

async function sha1Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

/**
 * Returns the number of known breaches the password appears in (0 = clean).
 * Returns null when the check could not run (offline / HIBP down) — callers
 * treat null as "proceed" (fail-open), never as "breached".
 */
export async function pwnedCount(password: string): Promise<number | null> {
  try {
    const hash = await sha1Hex(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);
    const res = await fetch(HIBP_RANGE_URL + prefix, {
      headers: { 'Add-Padding': 'true' },
    });
    if (!res.ok) return null;
    const body = await res.text();
    for (const line of body.split('\n')) {
      const [candidate, count] = line.trim().split(':');
      if (candidate === suffix) return parseInt(count, 10) || 1;
    }
    return 0;
  } catch {
    return null;
  }
}

export const PWNED_MESSAGE =
  'This password appears in publicly known breach lists from across the ' +
  'internet. Choose a different one so your vessel stays only yours.';
