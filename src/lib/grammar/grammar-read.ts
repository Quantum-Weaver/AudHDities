// src/lib/grammar/grammar-read.ts
// The Grammar, read server-side through the KNOWLEDGE base's anon door.

import { createApiSupabase } from '@/lib/api/supabase';
import {
  ATOM_DRESSING_COLUMNS,
  ATOM_SEARCH_COLUMNS,
  ATOM_WHOLE_COLUMNS,
  BOND_READ_LIMIT,
  CATEGORY_COLUMNS,
  DOOR_LABELS,
  DOOR_TABLES,
  MEMBERSHIP_COLUMNS,
  MOLECULE_BOND_COLUMNS,
  MOLECULE_SEARCH_COLUMNS,
  ORGANISM_BOND_COLUMNS,
  ORGANISM_SEARCH_COLUMNS,
  RELATION_COLUMNS,
  SCHEME_COLUMNS,
  TIER_EMPTIES,
  TIER_HEADINGS,
  TIER_LIMIT,
  atomCard,
  baseFault,
  boundQuery,
  doorUnnamedFault,
  ilikePattern,
  ilikeValue,
  latticeEdges,
  membershipViews,
  moleculeCard,
  organismCard,
  type AtomBonds,
  type AtomDressing,
  type AtomLattice,
  type AtomSearchRow,
  type AtomWhole,
  type BondJoinRow,
  type CategoryFace,
  type DoorCount,
  type DoorCounts,
  type MembershipJoinRow,
  type MoleculeSearchRow,
  type OrganismBondJoinRow,
  type OrganismSearchRow,
  type Reading,
  type RelationJoinRow,
  type SchemeChip,
  type SearchResults,
  type TierResult,
} from './grammar-contract';

/** True when both knowledge variables carry a value on this host. */
export function knowledgeDoorNamed(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE
  );
}

/** One exact count per table, each carrying its own fault. */
export async function readDoorCounts(): Promise<DoorCounts> {
  const counts = {} as DoorCounts;
  if (!knowledgeDoorNamed()) {
    for (const table of DOOR_TABLES) {
      counts[table] = {
        table,
        label: DOOR_LABELS[table],
        count: null,
        fault: doorUnnamedFault(table),
      };
    }
    return counts;
  }

  const supabase = await createApiSupabase('knowledge');
  const read = await Promise.all(
    DOOR_TABLES.map(async (table): Promise<DoorCount> => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      if (error) {
        return { table, label: DOOR_LABELS[table], count: null, fault: baseFault(table, error.message) };
      }
      return { table, label: DOOR_LABELS[table], count: count ?? 0, fault: null };
    })
  );
  for (const one of read) counts[one.table] = one;
  return counts;
}

/** The three tiers searched one read each, grouped with an exact count per tier. */
export async function searchGrammar(
  q: string | null | undefined,
  category?: string | null
): Promise<SearchResults> {
  const bounded = boundQuery(q);
  const face = boundQuery(category);
  const blank = (tier: TierResult['tier'], fault: TierResult['fault']): TierResult => ({
    tier,
    heading: TIER_HEADINGS[tier],
    total: null,
    cards: [],
    empty: TIER_EMPTIES[tier],
    fault,
  });

  if (!knowledgeDoorNamed()) {
    return {
      q: bounded,
      category: face,
      tiers: [
        blank('atoms', doorUnnamedFault('atom_dressed')),
        blank('molecules', doorUnnamedFault('molecules')),
        blank('organisms', doorUnnamedFault('organisms')),
      ],
    };
  }

  const supabase = await createApiSupabase('knowledge');
  const pattern = bounded ? ilikePattern(bounded) : null;

  let atomQuery = supabase
    .from('atom_dressed')
    .select(ATOM_SEARCH_COLUMNS, { count: 'exact' })
    .eq('is_override', false);
  if (pattern) atomQuery = atomQuery.or(`atom_word.ilike.${pattern},definition.ilike.${pattern}`);
  if (face) atomQuery = atomQuery.eq('category_name', face);
  const atoms = await atomQuery.order('atom_word', { ascending: true }).limit(TIER_LIMIT);

  let moleculeQuery = supabase.from('molecules').select(MOLECULE_SEARCH_COLUMNS, { count: 'exact' });
  if (pattern) {
    moleculeQuery = moleculeQuery.or(`name.ilike.${pattern},definition.ilike.${pattern}`);
  }
  const molecules = await moleculeQuery.order('name', { ascending: true }).limit(TIER_LIMIT);

  let organismQuery = supabase.from('organisms').select(ORGANISM_SEARCH_COLUMNS, { count: 'exact' });
  if (pattern) {
    organismQuery = organismQuery.or(`name.ilike.${pattern},definition.ilike.${pattern}`);
  }
  const organisms = await organismQuery.order('name', { ascending: true }).limit(TIER_LIMIT);

  const atomTier: TierResult = atoms.error
    ? blank('atoms', baseFault('atom_dressed', atoms.error.message))
    : {
        tier: 'atoms',
        heading: TIER_HEADINGS.atoms,
        total: atoms.count ?? 0,
        cards: ((atoms.data ?? []) as unknown as AtomSearchRow[]).map(atomCard),
        empty: TIER_EMPTIES.atoms,
        fault: null,
      };

  const moleculeTier: TierResult = molecules.error
    ? blank('molecules', baseFault('molecules', molecules.error.message))
    : {
        tier: 'molecules',
        heading: TIER_HEADINGS.molecules,
        total: molecules.count ?? 0,
        cards: ((molecules.data ?? []) as unknown as MoleculeSearchRow[]).map(moleculeCard),
        empty: TIER_EMPTIES.molecules,
        fault: null,
      };

  const organismTier: TierResult = organisms.error
    ? blank('organisms', baseFault('organisms', organisms.error.message))
    : {
        tier: 'organisms',
        heading: TIER_HEADINGS.organisms,
        total: organisms.count ?? 0,
        cards: ((organisms.data ?? []) as unknown as OrganismSearchRow[]).map(organismCard),
        empty: TIER_EMPTIES.organisms,
        fault: null,
      };

  return { q: bounded, category: face, tiers: [atomTier, moleculeTier, organismTier] };
}

/** Every category, in the register's own sort order. */
export async function readCategories(): Promise<Reading<CategoryFace[]>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('categories') };
  const supabase = await createApiSupabase('knowledge');
  const { data, error } = await supabase
    .from('categories')
    .select(CATEGORY_COLUMNS)
    .order('sort_order', { ascending: true });
  if (error) return { ok: false, fault: baseFault('categories', error.message) };
  return { ok: true, value: (data ?? []) as unknown as CategoryFace[] };
}

/** Every scheme, by kind then by name. */
export async function readSchemes(): Promise<Reading<SchemeChip[]>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('schemes') };
  const supabase = await createApiSupabase('knowledge');
  const { data, error } = await supabase
    .from('schemes')
    .select(SCHEME_COLUMNS)
    .order('scheme_type', { ascending: true })
    .order('name', { ascending: true });
  if (error) return { ok: false, fault: baseFault('schemes', error.message) };
  return { ok: true, value: (data ?? []) as unknown as SchemeChip[] };
}

/** The atom read whole by its word, case-blind; null when the base holds none. */
export async function readAtomWhole(word: string): Promise<Reading<AtomWhole | null>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('atom_whole') };
  const named = ilikeValue(word.trim());
  if (!named) return { ok: true, value: null };
  const supabase = await createApiSupabase('knowledge');
  const { data, error } = await supabase
    .from('atom_whole')
    .select(ATOM_WHOLE_COLUMNS)
    .ilike('atom_word', named)
    .limit(1);
  if (error) return { ok: false, fault: baseFault('atom_whole', error.message) };
  const rows = (data ?? []) as unknown as AtomWhole[];
  return { ok: true, value: rows[0] ?? null };
}

/** Every folksonomy's own opinion of this atom, the hearth row left out. */
export async function readAtomDressings(atomId: string): Promise<Reading<AtomDressing[]>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('atom_dressed') };
  const supabase = await createApiSupabase('knowledge');
  const { data, error } = await supabase
    .from('atom_dressed')
    .select(ATOM_DRESSING_COLUMNS)
    .eq('atom_id', atomId)
    .eq('is_override', true);
  if (error) return { ok: false, fault: baseFault('atom_dressed', error.message) };
  return { ok: true, value: (data ?? []) as unknown as AtomDressing[] };
}

/** The molecules and organisms this atom bonds into, counted and named. */
export async function readAtomBonds(atomId: string): Promise<Reading<AtomBonds>> {
  if (!knowledgeDoorNamed()) {
    return { ok: false, fault: doorUnnamedFault('molecule_atoms · organism_atoms') };
  }
  const supabase = await createApiSupabase('knowledge');

  const molecules = await supabase
    .from('molecule_atoms')
    .select(MOLECULE_BOND_COLUMNS, { count: 'exact' })
    .eq('atom_id', atomId)
    .order('position', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (molecules.error) return { ok: false, fault: baseFault('molecule_atoms', molecules.error.message) };

  const organisms = await supabase
    .from('organism_atoms')
    .select(ORGANISM_BOND_COLUMNS, { count: 'exact' })
    .eq('atom_id', atomId)
    .order('position', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (organisms.error) return { ok: false, fault: baseFault('organism_atoms', organisms.error.message) };

  const moleculeNames = ((molecules.data ?? []) as unknown as BondJoinRow[])
    .map((row) => row.molecules?.name)
    .filter((name): name is string => Boolean(name));
  const organismNames = ((organisms.data ?? []) as unknown as OrganismBondJoinRow[])
    .map((row) => row.organisms?.name)
    .filter((name): name is string => Boolean(name));

  return {
    ok: true,
    value: {
      moleculeCount: molecules.count ?? moleculeNames.length,
      moleculeNames,
      organismCount: organisms.count ?? organismNames.length,
      organismNames,
    },
  };
}

/** Where this atom sits in the lattice: its memberships and its typed edges. */
export async function readAtomLattice(atomId: string): Promise<Reading<AtomLattice>> {
  if (!knowledgeDoorNamed()) {
    return { ok: false, fault: doorUnnamedFault('scheme_memberships · concept_relations') };
  }
  const supabase = await createApiSupabase('knowledge');

  const memberships = await supabase
    .from('scheme_memberships')
    .select(MEMBERSHIP_COLUMNS)
    .eq('atom_id', atomId);
  if (memberships.error) {
    return { ok: false, fault: baseFault('scheme_memberships', memberships.error.message) };
  }

  const relations = await supabase
    .from('concept_relations')
    .select(RELATION_COLUMNS)
    .or(`subject_atom_id.eq.${atomId},object_atom_id.eq.${atomId}`);
  if (relations.error) {
    return { ok: false, fault: baseFault('concept_relations', relations.error.message) };
  }

  return {
    ok: true,
    value: {
      memberships: membershipViews((memberships.data ?? []) as unknown as MembershipJoinRow[]),
      edges: latticeEdges((relations.data ?? []) as unknown as RelationJoinRow[], atomId),
    },
  };
}
