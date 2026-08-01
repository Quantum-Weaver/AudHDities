// lib/auth/pwned.ts — leaked-password protection, the house's own hand
// ─────────────────────────────────────────────────────────────────────────
// Run 08, Movement III (2026-07-20). Supabase's built-in HaveIBeenPwned
// check is a paid-plan toggle; the protection itself is free: HIBP's range
// API is keyless and k-anonymous — we hash the password (SHA-1, in the
// browser via WebCrypto), send ONLY the first five hex characters, and
// compare the returned suffix list locally. The password never leaves the
// vessel's device. The dashboard advisor line will remain (it watches the
// platform toggle, not the door) — this file is why it may rest unheeded.
// Fails OPEN by design: if HIBP is unreachable, signup proceeds — the
// Sanctuary never locks its door because a third party is napping.

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

// The calm register (the threshold's law): no shame, no alarm — the breach
// is the wide world's, never the vessel's.
export const PWNED_MESSAGE =
  'This password appears in publicly known breach lists from across the ' +
  'internet. Choose a different one so your vessel stays only yours.';
