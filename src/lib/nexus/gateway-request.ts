'use server';
// src/lib/nexus/gateway-request.ts
// One collaboration request, landed under the visitor's own session.

import { createServerSupabase } from '@/lib/supabase/server';
import { readBeacons } from './gateway-read';
import {
  admitRequest,
  baseRefusal,
  NOTE_MAX,
  REQUEST_CATEGORY,
  REQUEST_STATUS,
  registerUnreadRefusal,
  requestMessage,
  requestSubject,
  unsignedRefusal,
  type RequestOutcome,
} from './gateway-contract';

/** The visitor's own name, or the address they signed in with. */
function visitorName(metadata: Record<string, unknown>, email: string | undefined, id: string): string {
  for (const key of ['full_name', 'display_name', 'name', 'username']) {
    const held = metadata[key];
    if (typeof held === 'string' && held.trim()) return held.trim().slice(0, 120);
  }
  return (email ?? id).slice(0, 120);
}

/** Lands one contact_submissions row for a private beacon the register names. */
export async function requestCollaboration(slug: string, note: string): Promise<RequestOutcome> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, ...unsignedRefusal() };

  const register = await readBeacons();
  if (!register.doorNamed || register.fault) {
    return { ok: false, ...registerUnreadRefusal(register.fault) };
  }

  const admission = admitRequest(register.rows, slug);
  if (!admission.admitted) return { ok: false, ...admission.refusal };

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: visitorName(user.user_metadata ?? {}, user.email, user.id),
      email: user.email ?? null,
      subject: requestSubject(admission.slug),
      message: requestMessage(admission.slug, admission.beaconName, note.slice(0, NOTE_MAX)),
      category: REQUEST_CATEGORY,
      status: REQUEST_STATUS,
      created_by: user.id,
    })
    .select('created_at')
    .single();

  if (error || !data) {
    return { ok: false, ...baseRefusal(error?.message ?? 'no row came back') };
  }
  return { ok: true, at: data.created_at };
}
