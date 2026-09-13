// src/app/(aethelred)/nexus/webhooks/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE PULSE — the triggers the base fires and the notices unread          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { redirect } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { NexusRoom } from '@/components/asgard/domains/aethelred/nexus/NexusRoom';
import { NexusTile } from '@/components/asgard/domains/aethelred/nexus/NexusTile';
import {
  Register,
  type RegisterRow,
  type RegisterSection,
} from '@/components/asgard/domains/aethelred/nexus/Register';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import {
  readTriggers,
  readUnreadHeralds,
  NEVER_SEEN,
  NO_TRIGGER_ROW,
  NO_UNREAD_NOTICE,
} from '@/lib/nexus/pulse-read';
import { NOT_RECORDED } from '@/lib/nexus/council-contract';

export const metadata = {
  title: 'The Pulse | The Nexus | Sovereign Sanctuary',
  description: 'Every trigger the base holds, with the last time each was seen, and the unread notices',
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/webhooks';

const TRIGGERS = 'The triggers';
const NOTICES = 'The notices unread';

/** The newest last_seen_at across the triggers, or null when none carries one. */
function lastBeat(stamps: readonly (string | null)[]): string | null {
  let newest: string | null = null;
  for (const at of stamps) {
    if (!at) continue;
    if (!newest || Date.parse(at) > Date.parse(newest)) newest = at;
  }
  return newest;
}

export default async function WebhooksPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const [triggers, heralds] = await Promise.all([readTriggers(), readUnreadHeralds()]);

  const rows: RegisterRow[] = [];

  triggers.rows.forEach((trigger, index) => {
    rows.push({
      section: TRIGGERS,
      ord: index + 1,
      key: trigger.name,
      value: trigger.events ?? NOT_RECORDED,
      note: [trigger.timing, trigger.function_name].filter(Boolean).join(' · ') || null,
      seat: trigger.table_name,
      mark: trigger.is_active ? 'active' : null,
      at: trigger.last_seen_at,
      closed: trigger.last_seen_at ? null : NEVER_SEEN,
    });
  });

  heralds.rows.forEach((herald, index) => {
    rows.push({
      section: NOTICES,
      ord: index + 1,
      key: herald.herald_type,
      value: herald.title ?? NOT_RECORDED,
      note: herald.body,
      seat: herald.channel,
      at: herald.created_at,
    });
  });

  const sections: RegisterSection[] = [
    {
      section: TRIGGERS,
      source: 'live · triggers',
      empty: NO_TRIGGER_ROW,
      fault: triggers.fault,
      faultTable: triggers.table,
      tally: 'one line per trigger the register holds',
    },
    {
      section: NOTICES,
      source: 'live · heralds where is_read is false',
      empty: NO_UNREAD_NOTICE,
      fault: heralds.fault,
      faultTable: heralds.table,
    },
  ];

  const active = triggers.rows.filter((trigger) => trigger.is_active).length;
  const watched = new Set(triggers.rows.map((trigger) => trigger.table_name)).size;
  const beat = lastBeat(triggers.rows.map((trigger) => trigger.last_seen_at));

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusRoom
        title="The Pulse"
        lede="Every trigger the base holds, the table each watches, and the last time each was seen; beneath them the notices nobody has read."
        source="live · triggers and heralds"
      >
        <NexusTile
          id="the-pulse"
          word={triggers.rows.length ? 'the base is wired to itself' : NO_TRIGGER_ROW}
          at={beat}
          atLabel="last seen"
          atEmpty={NEVER_SEEN}
          glowing={Boolean(beat)}
          lines={[
            { key: 'triggers', value: `${triggers.rows.length}` },
            { key: 'active', value: `${active}` },
            { key: 'tables watched', value: `${watched}` },
            { key: 'notices unread', value: `${heralds.rows.length}` },
          ]}
        />
        <Register sections={sections} rows={rows} />
      </NexusRoom>
    </Page>
  );
}
