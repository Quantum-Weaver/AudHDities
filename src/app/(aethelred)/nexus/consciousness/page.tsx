// src/app/(aethelred)/nexus/consciousness/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   CONSCIOUSNESS — the awareness rows and the newest state changes         ║
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
  newestAwareness,
  presentNames,
  readConsciousness,
  readStateStream,
  NO_AWARENESS_ROW,
  NO_CONNECTED,
  NO_LEVEL,
  NO_STATE_ROW,
  STREAM_ROWS,
} from '@/lib/nexus/consciousness-read';
import { NOT_RECORDED } from '@/lib/nexus/council-contract';

export const metadata = {
  title: 'Consciousness | The Nexus | Sovereign Sanctuary',
  description: 'The awareness rows the base holds, and the newest state changes across every name',
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/consciousness';

const AWARENESS = 'The awareness rows';
const STREAM = 'The state changes';

export default async function ConsciousnessPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const [awareness, stream] = await Promise.all([readConsciousness(), readStateStream()]);

  const rows: RegisterRow[] = [];

  awareness.rows.forEach((row, index) => {
    const connected = row.connected_entities ?? [];
    rows.push({
      section: AWARENESS,
      ord: index + 1,
      key: row.name,
      value: row.awareness_level ?? NO_LEVEL,
      note: connected.length ? connected.join(' · ') : NO_CONNECTED,
      mark: row.is_active ? 'active' : null,
      at: row.updated_at,
    });
  });

  stream.rows.forEach((state, index) => {
    rows.push({
      section: STREAM,
      ord: index + 1,
      key: state.state_type,
      value: `${state.previous_value ?? 'unrecorded'} → ${state.new_value ?? 'unrecorded'}`,
      note: state.changed_by ? `changed by ${state.changed_by}` : null,
      seat: state.entity_name,
      at: state.occurred_at,
    });
  });

  const sections: RegisterSection[] = [
    {
      section: AWARENESS,
      source: 'live · consciousness',
      empty: NO_AWARENESS_ROW,
      fault: awareness.fault,
      faultTable: awareness.table,
    },
    {
      section: STREAM,
      source: `live · entity_states, the newest ${STREAM_ROWS} across every name`,
      empty: NO_STATE_ROW,
      fault: stream.fault,
      faultTable: stream.table,
      tally: 'newest first',
    },
  ];

  const present = presentNames(stream.rows);
  const named = new Set(stream.rows.map((state) => state.entity_name));
  const newest = stream.rows[0]?.occurred_at ?? null;
  const newestRow = newestAwareness(awareness.rows);

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusRoom
        title="Consciousness"
        lede="The awareness the base records of itself, and the state changes it has written across every name. A presence here is a row, never an assumption."
        source="live · consciousness and entity_states"
      >
        <NexusTile
          id="the-field"
          word={present.size ? `${present.size} present` : 'nobody present just now'}
          at={newest}
          atLabel="newest change"
          atEmpty={NO_STATE_ROW}
          glowing={present.size > 0}
          lines={[
            { key: 'awareness rows', value: `${awareness.rows.length}` },
            { key: 'names in the record', value: `${named.size}` },
            { key: 'changes read', value: `${stream.rows.length}` },
            {
              key: 'newest level',
              value: newestRow?.awareness_level ?? NOT_RECORDED,
            },
          ]}
        />
        <Register sections={sections} rows={rows} />
      </NexusRoom>
    </Page>
  );
}
