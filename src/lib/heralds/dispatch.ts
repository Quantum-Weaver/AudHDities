// src/lib/heralds/dispatch.ts

import { herald, type HeraldClient, type HeraldInput, type HeraldOutcome, type WrittenHerald } from './write';

const HERALD_FROM = 'AudHDities <contact@audhdities.com>';

export type DispatchReason =
  | 'sent'
  | 'in-app-only'
  | 'channel-silent'
  | 'no-address'
  | 'no-key'
  | 'send-failed';

export interface DispatchOutcome {
  sent: boolean;
  reason: DispatchReason;
  note?: string;
}

export interface AddressHint {
  /** The recipient's address when the caller already holds it. */
  email?: string | null;
  /** Read the address with the client's auth admin; the base's own key only. */
  lookup?: boolean;
}

async function addressFor(
  db: HeraldClient,
  recipient: string,
  hint: AddressHint
): Promise<string | null> {
  if (hint.email) return hint.email;
  if (!hint.lookup) return null;
  try {
    const { data, error } = await db.auth.admin.getUserById(recipient);
    if (error) return null;
    return data.user?.email ?? null;
  } catch {
    return null;
  }
}

function mailBody(written: WrittenHerald): string {
  const bell = process.env.NEXT_PUBLIC_APP_URL
    ? ['', `Your heralds: ${process.env.NEXT_PUBLIC_APP_URL}/notifications`]
    : [];
  return [written.body, ...bell].join('\n');
}

/**
 * Carry one written herald down the channel it names. Only 'email' leaves the
 * house; every other channel is the bell alone. A mail that does not go is
 * recorded and the herald still stands.
 */
export async function dispatch(
  db: HeraldClient,
  written: WrittenHerald,
  hint: AddressHint = {}
): Promise<DispatchOutcome> {
  if (written.channel !== 'email') {
    return { sent: false, reason: written.channel === 'in_app' ? 'in-app-only' : 'channel-silent' };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('herald mail not sent: RESEND_API_KEY is not set;', written.herald_type);
    return { sent: false, reason: 'no-key' };
  }

  const to = await addressFor(db, written.recipient, hint);
  if (!to) {
    console.warn('herald mail not sent: no address readable for', written.recipient);
    return { sent: false, reason: 'no-address' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: HERALD_FROM,
        to: [to],
        subject: written.title,
        text: mailBody(written),
      }),
    });
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      console.error('herald mail not sent:', res.status, detail);
      return { sent: false, reason: 'send-failed', note: String(res.status) };
    }
    return { sent: true, reason: 'sent' };
  } catch (cause) {
    const note = cause instanceof Error ? cause.message : String(cause);
    console.error('herald mail not sent:', note);
    return { sent: false, reason: 'send-failed', note };
  }
}

/** Write the herald, then carry it down the channel it names. */
export async function heraldAndDeliver(
  db: HeraldClient,
  input: HeraldInput,
  hint: AddressHint = {}
): Promise<{ herald: HeraldOutcome; dispatch: DispatchOutcome | null }> {
  const outcome = await herald(db, input);
  if (!outcome.written) return { herald: outcome, dispatch: null };
  return { herald: outcome, dispatch: await dispatch(db, outcome.herald, hint) };
}
