// src/app/(aethelred)/nexus/council/[id]/page.tsx
import { redirect } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import {
  ChairNotFound,
  EntityDetail,
} from '@/components/asgard/domains/aethelred/nexus/EntityDetail';
import type {
  RegisterRow,
  RegisterSection,
} from '@/components/asgard/domains/aethelred/nexus/Register';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import {
  readAgentTables,
  readBoundaries,
  readChairStates,
  readCouncilHouses,
  readProtocols,
  readSeatTable,
  PRESENCE_ROWS_ROOM,
} from '@/lib/nexus/council-read';
import {
  chairFrom,
  chairName,
  chairNames,
  houseFor,
  matchesEntity,
  matchesNames,
  presenceRowsFor,
  responsibilitiesOf,
  seatForSlug,
  NOT_RECORDED,
  NO_AGENT_ROW,
  NO_BOUNDARY_ROW,
  NO_CATALOG_ROW,
  NO_PRESENCE_ROW,
  NO_PROTOCOL_ROW,
} from '@/lib/nexus/council-contract';

export const metadata = {
  title: 'A chair | The Council | Sovereign Sanctuary',
  description: 'A chair as the base holds it',
};

export const dynamic = 'force-dynamic';

const SEAT = 'The seat as carved';
const RECORD = 'The presence record';
const AGENTS = 'The agent rows';
const BOUNDS = 'The boundaries that bind';
const PROTOCOLS = 'The protocols';

export default async function EntityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, `/nexus/council/${id}`));

  const seat = seatForSlug(id);
  if (!seat) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <ChairNotFound id={decodeURIComponent(id)} />
      </Page>
    );
  }

  const [houses, seatRead, agents, boundaries, protocols] = await Promise.all([
    readCouncilHouses(),
    readSeatTable(seat.table),
    readAgentTables(),
    readBoundaries(),
    readProtocols(),
  ]);

  const house = houseFor(houses.rows, seat);
  const names = chairNames(seat, house);
  const related = house?.related_protocols ?? [];

  const states = await readChairStates(names, PRESENCE_ROWS_ROOM);

  const chair = chairFrom(
    seat,
    house,
    seatRead.rows,
    seatRead.fault,
    states.rows,
    states.fault
  );

  const rows: RegisterRow[] = [];

  if (house) {
    const responsibilities = responsibilitiesOf(house);
    rows.push(
      { section: SEAT, ord: 1, key: 'duty', value: house.description ?? NOT_RECORDED },
      {
        section: SEAT,
        ord: 2,
        key: 'responsibilities',
        value: responsibilities.length ? responsibilities.join(' · ') : NOT_RECORDED,
      },
      {
        section: SEAT,
        ord: 3,
        key: 'seats',
        value:
          house.seat_limit === null
            ? `${house.member_count} held`
            : `${house.member_count} of ${house.seat_limit} held`,
      },
      { section: SEAT, ord: 4, key: 'status', value: house.status, at: house.updated_at }
    );
  }

  presenceRowsFor(states.rows, names).forEach((state, index) => {
    rows.push({
      section: RECORD,
      ord: index + 1,
      key: state.state_type,
      value: `${state.previous_value ?? 'unrecorded'} → ${state.new_value ?? 'unrecorded'}`,
      note: state.changed_by ? `changed by ${state.changed_by}` : null,
      at: state.occurred_at,
    });
  });

  let agentOrd = 0;
  const agentFaults = agents.filter((agent) => agent.result.fault);
  agents.forEach((agent) => {
    agent.result.rows
      .filter((row) => matchesNames(row.name, names))
      .forEach((row) => {
        agentOrd += 1;
        rows.push({
          section: AGENTS,
          ord: agentOrd,
          key: row.name,
          value: row.description ?? NOT_RECORDED,
          note: row.current_task,
          mark: row.is_active ? 'active' : null,
          seat: agent.table,
          at: row.updated_at,
        });
      });
  });

  boundaries.rows
    .filter((boundary) => matchesNames(boundary.applies_to, names))
    .forEach((boundary, index) => {
      rows.push({
        section: BOUNDS,
        ord: index + 1,
        key: boundary.name,
        value: boundary.description ?? NOT_RECORDED,
        mark: boundary.is_blocking ? 'blocking' : null,
        at: `severity · ${boundary.severity}`,
      });
    });

  protocols.rows
    .filter((protocol) =>
      related.some(
        (name) => matchesEntity(protocol.slug, name) || matchesEntity(protocol.name, name)
      )
    )
    .forEach((protocol, index) => {
      rows.push({
        section: PROTOCOLS,
        ord: index + 1,
        key: protocol.name,
        value: protocol.description ?? NOT_RECORDED,
        note: `v${protocol.version}`,
        at: `priority · ${protocol.priority}`,
      });
    });

  const sections: RegisterSection[] = [
    {
      section: SEAT,
      source: 'live · council_houses',
      empty: NO_CATALOG_ROW,
      fault: houses.fault,
      faultTable: houses.table,
    },
    {
      section: RECORD,
      source: 'live · entity_states, this chair, newest first',
      empty: NO_PRESENCE_ROW,
      fault: states.fault,
      faultTable: states.table,
      tally: "the chair's whole record, nothing summarised",
    },
    {
      section: AGENTS,
      source: `live · ${agents.map((agent) => agent.table).join(' · ')}`,
      empty: NO_AGENT_ROW,
      fault: agentFaults.length
        ? agentFaults.map((agent) => agent.result.fault).join(' · ')
        : null,
      faultTable: agentFaults.map((agent) => agent.table).join(' · '),
    },
    {
      section: BOUNDS,
      source: `live · boundaries where applies_to names ${chairName(chair)}`,
      empty: NO_BOUNDARY_ROW,
      fault: boundaries.fault,
      faultTable: boundaries.table,
    },
    {
      section: PROTOCOLS,
      source: 'live · protocols, from related_protocols',
      empty: NO_PROTOCOL_ROW,
      fault: related.length ? protocols.fault : null,
      faultTable: protocols.table,
    },
  ];

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EntityDetail chair={chair} sections={sections} rows={rows} />
    </Page>
  );
}
