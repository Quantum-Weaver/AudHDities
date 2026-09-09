// src/components/asgard/domains/mnemosyne/grammar/AtomPanels.tsx

import Link from 'next/link';
import { Progress } from '@/components/runes/Progress';
import {
  ATOM_LATTICE_SOURCE,
  BONDS_HEADING,
  BONDS_SOURCE,
  LATTICE_HEADING,
  MOLECULE_CHIP_LIMIT,
  NOT_IN_A_SCHEME,
  NOT_YET_SENSED,
  NO_HISTORICAL_MEANING,
  NO_ROOT_YET,
  NO_SANCTUARY_MEANING,
  NO_TYPED_EDGES,
  ORGANISM_CHIP_LIMIT,
  PRIMARY_LABEL,
  ROOT_HEADING,
  ROOT_SOURCE,
  SANCTUARY_MEANING_LABEL,
  SENSES_HEADING,
  SENSES_SOURCE,
  bondChips,
  bondLine,
  moreLine,
  present,
  schemeAddress,
  senseChannels,
  tierAddress,
  type AtomBonds,
  type AtomLattice,
  type AtomWhole,
  type GrammarFault,
} from '@/lib/grammar/grammar-contract';
import { GrammarFaultBlock } from './GrammarFault';
import { Panel } from './Panel';

/** Every sensory channel, a channel the lexicon has not filled saying so. */
export function SensesPanel({ whole }: { whole: AtomWhole }) {
  const channels = senseChannels(whole);
  const grid = channels.filter((channel) => !channel.wide);
  const wide = channels.filter((channel) => channel.wide);

  return (
    <Panel heading={SENSES_HEADING} source={SENSES_SOURCE}>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-[13px] sm:grid-cols-2">
        {grid.map((channel) => (
          <div key={channel.label} className="flex items-center gap-2">
            <span className="w-24 shrink-0 text-star-dust/40">{channel.label}</span>
            {channel.value && channel.swatch ? (
              <span
                className="inline-block h-3.5 w-3.5 rounded"
                style={{ backgroundColor: channel.swatch }}
              />
            ) : null}
            <span className={channel.value ? 'text-star-dust' : 'text-star-dust/35'}>
              {channel.value ?? NOT_YET_SENSED}
            </span>
          </div>
        ))}
      </div>
      {wide.map((channel) => (
        <div key={channel.label} className="flex gap-2 text-[13px]">
          <span className="w-24 shrink-0 text-star-dust/40">{channel.label}</span>
          <span className={channel.value ? 'text-star-dust' : 'text-star-dust/35'}>
            {channel.value ?? NOT_YET_SENSED}
          </span>
        </div>
      ))}
    </Panel>
  );
}

/** The word's root, its historical meaning, its sanctuary meaning and its progress. */
export function RootPanel({ whole }: { whole: AtomWhole }) {
  const progress = whole.etymology_progress;
  const root = present([whole.root_language, whole.root_word]);

  return (
    <Panel
      heading={ROOT_HEADING}
      source={progress === null ? ROOT_SOURCE : `${ROOT_SOURCE} · ${progress}%`}
    >
      <div className="flex gap-2 text-[13px]">
        <span className="w-24 shrink-0 text-star-dust/40">root</span>
        <span className={root.length > 0 ? 'text-star-dust' : 'text-star-dust/35'}>
          {root.length > 0 ? root.join(' · ') : NO_ROOT_YET}
        </span>
      </div>
      <p
        className={
          whole.historical_meaning
            ? 'text-[13px] leading-relaxed text-star-dust/60'
            : 'text-[13px] text-star-dust/35'
        }
      >
        {whole.historical_meaning ?? NO_HISTORICAL_MEANING}
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wider text-star-dust/35">
          {SANCTUARY_MEANING_LABEL}
        </span>
        <p
          className={
            whole.sanctuary_meaning
              ? 'text-[13px] leading-relaxed text-star-dust/60'
              : 'text-[13px] text-star-dust/35'
          }
        >
          {whole.sanctuary_meaning ?? NO_SANCTUARY_MEANING}
        </p>
      </div>
      {progress === null ? null : (
        <Progress value={progress} variant="quantum" size="sm" className="mt-auto" />
      )}
    </Panel>
  );
}

function ChipRow({
  names,
  more,
  tier,
}: {
  names: readonly string[];
  more: number;
  tier: 'molecules' | 'organisms';
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {names.map((name) => (
        <Link
          key={name}
          href={tierAddress(tier, name)}
          className="rounded-full border border-neurospark/30 px-2 py-0.5 text-xs text-neurospark hover:text-star-dust"
        >
          {name}
        </Link>
      ))}
      {more > 0 ? <span className="px-2 py-0.5 text-xs text-star-dust/40">{moreLine(more)}</span> : null}
    </div>
  );
}

/** What this atom is bonded into, counted, with the first names as doors. */
export function BondsPanel({
  bonds,
  fault,
}: {
  bonds: AtomBonds | null;
  fault: GrammarFault | null;
}) {
  if (!bonds) {
    return (
      <Panel heading={BONDS_HEADING} source={BONDS_SOURCE}>
        {fault ? <GrammarFaultBlock fault={fault} /> : null}
      </Panel>
    );
  }

  const molecules = bondChips(bonds.moleculeNames, MOLECULE_CHIP_LIMIT, bonds.moleculeCount);
  const organisms = bondChips(bonds.organismNames, ORGANISM_CHIP_LIMIT, bonds.organismCount);

  return (
    <Panel heading={BONDS_HEADING} source={BONDS_SOURCE}>
      <span className="text-[13px] text-star-dust/60">
        {bondLine(bonds.moleculeCount, 'molecules')}
      </span>
      {molecules.chips.length > 0 ? (
        <ChipRow names={molecules.chips} more={molecules.more} tier="molecules" />
      ) : null}
      <span className="text-[13px] text-star-dust/60">
        {bondLine(bonds.organismCount, 'organisms')}
      </span>
      {organisms.chips.length > 0 ? (
        <ChipRow names={organisms.chips} more={organisms.more} tier="organisms" />
      ) : null}
    </Panel>
  );
}

/** Where this atom sits in the lattice: its schemes, with primacy, and its edges. */
export function LatticePanel({
  lattice,
  fault,
}: {
  lattice: AtomLattice | null;
  fault: GrammarFault | null;
}) {
  if (!lattice) {
    return (
      <Panel heading={LATTICE_HEADING} source={ATOM_LATTICE_SOURCE}>
        {fault ? <GrammarFaultBlock fault={fault} /> : null}
      </Panel>
    );
  }

  return (
    <Panel heading={LATTICE_HEADING} source={ATOM_LATTICE_SOURCE}>
      {lattice.memberships.length === 0 ? (
        <span className="text-[13px] text-star-dust/35">{NOT_IN_A_SCHEME}</span>
      ) : (
        <div className="flex flex-col gap-1.5 text-[13px]">
          {lattice.memberships.map((membership) => (
            <span key={`${membership.scheme}-${membership.schemeType}`} className="text-star-dust/70">
              <Link
                href={schemeAddress(membership.scheme)}
                className="text-star-dust/70 hover:text-neurospark"
              >
                {membership.scheme}
              </Link>
              <span className="text-star-dust/35"> · {membership.schemeType}</span>
              {membership.primary ? (
                <span className="text-neurospark"> · {PRIMARY_LABEL}</span>
              ) : null}
            </span>
          ))}
        </div>
      )}

      {lattice.edges.length === 0 ? (
        <span className="text-[13px] text-star-dust/35">{NO_TYPED_EDGES}</span>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {lattice.edges.map((edge, index) => (
            <span
              key={`${edge.relationType}-${edge.direction}-${index}`}
              className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-star-dust"
            >
              {edge.relationType} · {edge.direction}
            </span>
          ))}
        </div>
      )}
    </Panel>
  );
}
