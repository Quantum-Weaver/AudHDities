// src/app/(aethelred)/nexus/api/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE GATEWAY — the beacons register, grouped by privacy state           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { redirect } from 'next/navigation';
import { GitBranch } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { RepoConstellation } from '@/components/asgard/domains/aethelred/nexus/RepoConstellation';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import { readBeacons } from '@/lib/nexus/gateway-read';
import { readBeaconFacts, readUserFacts } from '@/lib/nexus/gateway-github';
import {
  faceBeacon,
  groupBeacons,
  THE_FACES,
  type GatewayView,
} from '@/lib/nexus/gateway-contract';

export const metadata = {
  title: 'The Gateway | The Nexus | Sovereign Sanctuary',
  description: 'The beacons register — open repos, private repos, and the request to collaborate',
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/api';

export default async function GatewayPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const register = await readBeacons();

  const groups = await Promise.all(
    groupBeacons(register.rows).map(async (group) => ({
      key: group.key,
      label: group.label,
      empty: group.empty,
      cards: await Promise.all(
        group.beacons.map(async (beacon) => ({
          beacon,
          github: await readBeaconFacts(beacon),
        }))
      ),
    }))
  );

  const faces = await Promise.all(
    THE_FACES.map(async (face) => ({
      login: face.login,
      url: face.url,
      beacon: faceBeacon(register.rows, face.slug),
      read: register.doorNamed ? await readUserFacts(face.login) : null,
    }))
  );

  const view: GatewayView = {
    groups,
    faces,
    fault: register.fault,
    tracksNote: register.tracksNote,
    doorNamed: register.doorNamed,
    signedIn: true,
  };

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
              <GitBranch size={14} className="text-neurospark" />
              <span className="text-sm text-neurospark">The Gateway</span>
            </div>
            <h1 className="mb-3 text-3xl font-bold text-star-dust">The work itself, listed</h1>
            <p className="mx-auto max-w-2xl leading-relaxed text-star-dust/60">
              The register the house keeps of what it ships, grouped by privacy state.
              An open repo carries its door and what GitHub holds of it. A private
              repo carries a request to collaborate.
            </p>
          </div>
          <RepoConstellation view={view} />
        </div>
      </main>
    </Page>
  );
}
