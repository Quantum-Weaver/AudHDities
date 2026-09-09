// src/components/asgard/domains/hephaestus/apps/AppsRegister.tsx
// The register's apps and games as a grid, with its count, its fault and its unnamed door.

import {
  DOOR_UNNAMED,
  REGISTER_REFUSED,
  REGISTER_TABLE,
} from '@/lib/nexus/gateway-contract';
import {
  countLine,
  FAULT_NEXT,
  NO_APPS,
  PART_SEPARATOR,
  type AppsView,
} from '@/lib/apps/apps-contract';
import { AppCard } from './AppCard';

/** What happened, why, the next step. */
function Fault({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-1 text-[13px]">
      <span className="text-star-dust/80">{REGISTER_REFUSED}</span>
      <span className="text-star-dust/50">
        {REGISTER_TABLE}
        {PART_SEPARATOR}
        {message}
      </span>
      <span className="text-star-dust/40">next{PART_SEPARATOR}{FAULT_NEXT}</span>
    </div>
  );
}

export function AppsRegister({ view }: { view: AppsView }) {
  if (!view.doorNamed) {
    return <p className="text-[13px] text-star-dust/50">{DOOR_UNNAMED}</p>;
  }
  if (view.fault) return <Fault message={view.fault} />;

  return (
    <section className="flex flex-col gap-6">
      {view.apps.length === 0 ? (
        <p className="text-xs text-star-dust/35">{NO_APPS}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {view.apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      )}
      <span className="text-xs text-star-dust/40">{countLine(view.apps)}</span>
    </section>
  );
}
