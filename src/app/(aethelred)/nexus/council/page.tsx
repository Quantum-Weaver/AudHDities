// src/app/(aethelred)/nexus/council/page.tsx
import { redirect } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { CouncilEntityList } from '@/components/asgard/domains/aethelred/nexus/CouncilEntityList';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import { readChairStates, readCouncilHouses, readSeatTables } from '@/lib/nexus/council-read';
import {
  chairFrom,
  chairNames,
  chairOrder,
  houseFor,
  COUNCIL_SEATS,
  type CouncilChair,
  type CouncilSeatRow,
  type CouncilSeatTable,
} from '@/lib/nexus/council-contract';

export const metadata = {
  title: 'The Council | The Nexus | Sovereign Sanctuary',
  description: 'The nine chairs, with the presence the record shows',
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/council';

export default async function CouncilEntitiesPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const [houses, seats] = await Promise.all([readCouncilHouses(), readSeatTables()]);

  const seatRows = new Map<CouncilSeatTable, CouncilSeatRow[]>(
    seats.map((seat) => [seat.table, seat.result.rows])
  );
  const seatFaults = new Map<CouncilSeatTable, string | null>(
    seats.map((seat) => [seat.table, seat.result.fault])
  );

  const enriched = COUNCIL_SEATS.map((seat) => ({ seat, house: houseFor(houses.rows, seat) }));
  const states = await Promise.all(
    enriched.map(({ seat, house }) => readChairStates(chairNames(seat, house)))
  );

  const chairs: CouncilChair[] = enriched
    .map(({ seat, house }, index) =>
      chairFrom(
        seat,
        house,
        seatRows.get(seat.table) ?? [],
        seatFaults.get(seat.table) ?? null,
        states[index].rows,
        states[index].fault
      )
    )
    .map((chair, index) => ({ chair, order: chairOrder(chair, index), index }))
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map((held) => held.chair);

  const claimed = new Set(chairs.map((chair) => chair.house?.id).filter(Boolean));
  const unclaimedHouses = houses.rows
    .filter((house) => !claimed.has(house.id))
    .map((house) => house.name);

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CouncilEntityList
        chairs={chairs}
        unclaimedHouses={unclaimedHouses}
        catalogFault={houses.fault}
      />
    </Page>
  );
}
