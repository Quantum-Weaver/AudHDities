// src/lib/grammar/grammar-read.ts
// The Grammar, read server-side through the KNOWLEDGE base's anon door.

import { createApiSupabase } from '@/lib/api/supabase';
import {
  ATOM_DRESSING_COLUMNS,
  ATOM_NAME_COLUMNS,
  ATOM_SEARCH_COLUMNS,
  ATOM_WHOLE_COLUMNS,
  BOND_READ_LIMIT,
  CATEGORY_ATOM_LIMIT,
  CATEGORY_COLUMNS,
  DOOR_LABELS,
  DOOR_TABLES,
  LATTICE_READ_LIMIT,
  MEMBERSHIP_COLUMNS,
  MOLECULE_ATOM_COLUMNS,
  MOLECULE_BOND_COLUMNS,
  MOLECULE_DETAIL_COLUMNS,
  MOLECULE_SEARCH_COLUMNS,
  NAME_COLUMNS,
  ORGANISM_ATOM_COLUMNS,
  ORGANISM_BOND_COLUMNS,
  ORGANISM_DETAIL_COLUMNS,
  ORGANISM_MOLECULE_COLUMNS,
  ORGANISM_SEARCH_COLUMNS,
  RELATION_COLUMNS,
  RELATION_SIDES_COLUMNS,
  SCHEME_COLUMNS,
  SCHEME_DETAIL_COLUMNS,
  SCHEME_KEY_COLUMNS,
  SCHEME_MEMBER_COLUMNS,
  SENSORY_FACE_COLUMNS,
  TIER_EMPTIES,
  TIER_HEADINGS,
  TIER_LIMIT,
  atomCard,
  baseFault,
  boundQuery,
  compoundAtoms,
  compoundMolecules,
  conceptEdges,
  doorUnnamedFault,
  emojiByAtom,
  ilikePattern,
  ilikeValue,
  latticeEdges,
  membershipViews,
  moleculeCard,
  organismCard,
  relationFilter,
  relationIds,
  schemeEdges,
  schemeMembers,
  schemeTallies,
  sortNames,
  tallyByScheme,
  type AtomBonds,
  type AtomDressing,
  type AtomEmojiRow,
  type AtomLattice,
  type AtomSearchRow,
  type AtomWhole,
  type BondJoinRow,
  type CategoryFace,
  type CategoryWhole,
  type CompoundAtomRow,
  type CompoundMoleculeRow,
  type DoorCount,
  type DoorCounts,
  type MembershipJoinRow,
  type MoleculeDetail,
  type MoleculeSearchRow,
  type MoleculeWhole,
  type OrganismBondJoinRow,
  type OrganismDetail,
  type OrganismSearchRow,
  type OrganismWhole,
  type Reading,
  type RelationJoinRow,
  type RelationSidesRow,
  type SchemeChip,
  type SchemeDetail,
  type SchemeIdRow,
  type SchemeKeyRow,
  type SchemeMemberRow,
  type SchemeTallies,
  type SchemeWhole,
  type SearchResults,
  type TierResult,
} from './grammar-contract';

// ── the door ───────────────────────────────────────────────────────────────

/** One answer as the knowledge door gives it. */
export interface KnowledgeAnswer {
  data: unknown[] | null;
  error: { message: string } | null;
  count: number | null;
}

/** The chainable surface every read uses, awaited for its answer. */
export interface KnowledgeQuery extends PromiseLike<KnowledgeAnswer> {
  eq(column: string, value: unknown): KnowledgeQuery;
  ilike(column: string, value: string): KnowledgeQuery;
  or(filter: string): KnowledgeQuery;
  in(column: string, values: readonly unknown[]): KnowledgeQuery;
  order(column: string, options?: { ascending?: boolean }): KnowledgeQuery;
  limit(count: number): KnowledgeQuery;
  range(from: number, to: number): KnowledgeQuery;
}

export interface KnowledgeTable {
  select(columns: string, options?: { count?: 'exact'; head?: boolean }): KnowledgeQuery;
}

export interface KnowledgeClient {
  from(table: string): KnowledgeTable;
}

/** True when both knowledge variables carry a value on this host. */
export function knowledgeDoorNamed(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE
  );
}

/** The client a read was handed, else the knowledge door itself. */
async function knowledgeClient(given?: KnowledgeClient): Promise<KnowledgeClient> {
  if (given) return given;
  return (await createApiSupabase('knowledge')) as unknown as KnowledgeClient;
}

/** One exact count per table, each carrying its own fault. */
export async function readDoorCounts(client?: KnowledgeClient): Promise<DoorCounts> {
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

  const supabase = await knowledgeClient(client);
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
  category?: string | null,
  client?: KnowledgeClient
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

  const supabase = await knowledgeClient(client);
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
export async function readCategories(client?: KnowledgeClient): Promise<Reading<CategoryFace[]>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('categories') };
  const supabase = await knowledgeClient(client);
  const { data, error } = await supabase
    .from('categories')
    .select(CATEGORY_COLUMNS)
    .order('sort_order', { ascending: true });
  if (error) return { ok: false, fault: baseFault('categories', error.message) };
  return { ok: true, value: (data ?? []) as unknown as CategoryFace[] };
}

/** Every scheme, by kind then by name. */
export async function readSchemes(client?: KnowledgeClient): Promise<Reading<SchemeChip[]>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('schemes') };
  const supabase = await knowledgeClient(client);
  const { data, error } = await supabase
    .from('schemes')
    .select(SCHEME_COLUMNS)
    .order('scheme_type', { ascending: true })
    .order('name', { ascending: true });
  if (error) return { ok: false, fault: baseFault('schemes', error.message) };
  return { ok: true, value: (data ?? []) as unknown as SchemeChip[] };
}

/** The atom read whole by its word, case-blind; null when the base holds none. */
export async function readAtomWhole(
  word: string,
  client?: KnowledgeClient
): Promise<Reading<AtomWhole | null>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('atom_whole') };
  const named = ilikeValue(word.trim());
  if (!named) return { ok: true, value: null };
  const supabase = await knowledgeClient(client);
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
export async function readAtomDressings(
  atomId: string,
  client?: KnowledgeClient
): Promise<Reading<AtomDressing[]>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('atom_dressed') };
  const supabase = await knowledgeClient(client);
  const { data, error } = await supabase
    .from('atom_dressed')
    .select(ATOM_DRESSING_COLUMNS)
    .eq('atom_id', atomId)
    .eq('is_override', true);
  if (error) return { ok: false, fault: baseFault('atom_dressed', error.message) };
  return { ok: true, value: (data ?? []) as unknown as AtomDressing[] };
}

/** The molecules and organisms this atom bonds into, counted and named. */
export async function readAtomBonds(
  atomId: string,
  client?: KnowledgeClient
): Promise<Reading<AtomBonds>> {
  if (!knowledgeDoorNamed()) {
    return { ok: false, fault: doorUnnamedFault('molecule_atoms · organism_atoms') };
  }
  const supabase = await knowledgeClient(client);

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
export async function readAtomLattice(
  atomId: string,
  client?: KnowledgeClient
): Promise<Reading<AtomLattice>> {
  if (!knowledgeDoorNamed()) {
    return { ok: false, fault: doorUnnamedFault('scheme_memberships · concept_relations') };
  }
  const supabase = await knowledgeClient(client);

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
    .or(relationFilter('atoms', atomId));
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

// ── the reads a compound and a scheme share ────────────────────────────────

/** The sensory face of each atom named, keyed by atom id. */
async function readAtomFaces(
  supabase: KnowledgeClient,
  atomIds: readonly (string | null)[]
): Promise<Reading<Record<string, string>>> {
  const ids = Array.from(new Set(atomIds.filter((id): id is string => Boolean(id))));
  if (ids.length === 0) return { ok: true, value: {} };
  const { data, error } = await supabase
    .from('sensory_lexicon')
    .select(SENSORY_FACE_COLUMNS)
    .in('atom_id', ids)
    .limit(BOND_READ_LIMIT);
  if (error) return { ok: false, fault: baseFault('sensory_lexicon', error.message) };
  return { ok: true, value: emojiByAtom((data ?? []) as unknown as AtomEmojiRow[]) };
}

/** The name each end of a relation carries, keyed by row id. */
async function readRelationNames(
  supabase: KnowledgeClient,
  rows: readonly RelationSidesRow[]
): Promise<Reading<Record<string, string>>> {
  const ids = relationIds(rows);
  const names: Record<string, string> = {};

  if (ids.atoms.length > 0) {
    const { data, error } = await supabase
      .from('atoms')
      .select(ATOM_NAME_COLUMNS)
      .in('id', ids.atoms)
      .limit(BOND_READ_LIMIT);
    if (error) return { ok: false, fault: baseFault('atoms', error.message) };
    for (const row of (data ?? []) as unknown as { id: string; atom_word: string }[]) {
      names[row.id] = row.atom_word;
    }
  }

  if (ids.molecules.length > 0) {
    const { data, error } = await supabase
      .from('molecules')
      .select(NAME_COLUMNS)
      .in('id', ids.molecules)
      .limit(BOND_READ_LIMIT);
    if (error) return { ok: false, fault: baseFault('molecules', error.message) };
    for (const row of (data ?? []) as unknown as SchemeIdRow[]) {
      names[row.id] = row.name;
    }
  }

  if (ids.organisms.length > 0) {
    const { data, error } = await supabase
      .from('organisms')
      .select(NAME_COLUMNS)
      .in('id', ids.organisms)
      .limit(BOND_READ_LIMIT);
    if (error) return { ok: false, fault: baseFault('organisms', error.message) };
    for (const row of (data ?? []) as unknown as SchemeIdRow[]) {
      names[row.id] = row.name;
    }
  }

  return { ok: true, value: names };
}

// ── the compound's room ────────────────────────────────────────────────────

/** The molecule read whole by its name, case-blind; null when the base holds none. */
export async function readMolecule(
  name: string,
  client?: KnowledgeClient
): Promise<Reading<MoleculeWhole | null>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('molecules') };
  const named = ilikeValue(name.trim());
  if (!named) return { ok: true, value: null };
  const supabase = await knowledgeClient(client);

  const molecule = await supabase
    .from('molecules')
    .select(MOLECULE_DETAIL_COLUMNS)
    .ilike('name', named)
    .limit(1);
  if (molecule.error) return { ok: false, fault: baseFault('molecules', molecule.error.message) };
  const row = ((molecule.data ?? []) as unknown as MoleculeDetail[])[0] ?? null;
  if (!row) return { ok: true, value: null };

  const bonds = await supabase
    .from('molecule_atoms')
    .select(MOLECULE_ATOM_COLUMNS)
    .eq('molecule_id', row.id)
    .order('position', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (bonds.error) return { ok: false, fault: baseFault('molecule_atoms', bonds.error.message) };
  const bondRows = (bonds.data ?? []) as unknown as CompoundAtomRow[];

  const faces = await readAtomFaces(supabase, bondRows.map((one) => one.atom_id));
  if (!faces.ok) return faces;

  const organisms = await supabase
    .from('organism_molecules')
    .select(ORGANISM_BOND_COLUMNS)
    .eq('molecule_id', row.id)
    .limit(BOND_READ_LIMIT);
  if (organisms.error) {
    return { ok: false, fault: baseFault('organism_molecules', organisms.error.message) };
  }

  const memberships = await supabase
    .from('scheme_memberships')
    .select(MEMBERSHIP_COLUMNS)
    .eq('molecule_id', row.id);
  if (memberships.error) {
    return { ok: false, fault: baseFault('scheme_memberships', memberships.error.message) };
  }

  const relations = await supabase
    .from('concept_relations')
    .select(RELATION_SIDES_COLUMNS)
    .or(relationFilter('molecules', row.id));
  if (relations.error) {
    return { ok: false, fault: baseFault('concept_relations', relations.error.message) };
  }
  const relationRows = (relations.data ?? []) as unknown as RelationSidesRow[];

  const names = await readRelationNames(supabase, relationRows);
  if (!names.ok) return names;

  return {
    ok: true,
    value: {
      row,
      atoms: compoundAtoms(bondRows, faces.value),
      organismNames: sortNames(
        ((organisms.data ?? []) as unknown as OrganismBondJoinRow[])
          .map((one) => one.organisms?.name)
          .filter((one): one is string => Boolean(one))
      ),
      memberships: membershipViews((memberships.data ?? []) as unknown as MembershipJoinRow[]),
      edges: conceptEdges(relationRows, 'molecules', row.id, names.value),
    },
  };
}

/** The organism read whole by its name, case-blind; null when the base holds none. */
export async function readOrganism(
  name: string,
  client?: KnowledgeClient
): Promise<Reading<OrganismWhole | null>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('organisms') };
  const named = ilikeValue(name.trim());
  if (!named) return { ok: true, value: null };
  const supabase = await knowledgeClient(client);

  const organism = await supabase
    .from('organisms')
    .select(ORGANISM_DETAIL_COLUMNS)
    .ilike('name', named)
    .limit(1);
  if (organism.error) return { ok: false, fault: baseFault('organisms', organism.error.message) };
  const row = ((organism.data ?? []) as unknown as OrganismDetail[])[0] ?? null;
  if (!row) return { ok: true, value: null };

  const held = await supabase
    .from('organism_molecules')
    .select(ORGANISM_MOLECULE_COLUMNS)
    .eq('organism_id', row.id)
    .order('position', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (held.error) return { ok: false, fault: baseFault('organism_molecules', held.error.message) };

  const bonds = await supabase
    .from('organism_atoms')
    .select(ORGANISM_ATOM_COLUMNS)
    .eq('organism_id', row.id)
    .order('position', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (bonds.error) return { ok: false, fault: baseFault('organism_atoms', bonds.error.message) };
  const bondRows = (bonds.data ?? []) as unknown as CompoundAtomRow[];

  const faces = await readAtomFaces(supabase, bondRows.map((one) => one.atom_id));
  if (!faces.ok) return faces;

  const memberships = await supabase
    .from('scheme_memberships')
    .select(MEMBERSHIP_COLUMNS)
    .eq('organism_id', row.id);
  if (memberships.error) {
    return { ok: false, fault: baseFault('scheme_memberships', memberships.error.message) };
  }

  const relations = await supabase
    .from('concept_relations')
    .select(RELATION_SIDES_COLUMNS)
    .or(relationFilter('organisms', row.id));
  if (relations.error) {
    return { ok: false, fault: baseFault('concept_relations', relations.error.message) };
  }
  const relationRows = (relations.data ?? []) as unknown as RelationSidesRow[];

  const names = await readRelationNames(supabase, relationRows);
  if (!names.ok) return names;

  return {
    ok: true,
    value: {
      row,
      molecules: compoundMolecules((held.data ?? []) as unknown as CompoundMoleculeRow[]),
      atoms: compoundAtoms(bondRows, faces.value),
      memberships: membershipViews((memberships.data ?? []) as unknown as MembershipJoinRow[]),
      edges: conceptEdges(relationRows, 'organisms', row.id, names.value),
    },
  };
}

// ── the category's room ────────────────────────────────────────────────────

/** The category by its name, case-blind, with the atoms that wear its face. */
export async function readCategory(
  name: string,
  client?: KnowledgeClient
): Promise<Reading<CategoryWhole | null>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('categories') };
  const named = ilikeValue(name.trim());
  if (!named) return { ok: true, value: null };
  const supabase = await knowledgeClient(client);

  const category = await supabase
    .from('categories')
    .select(CATEGORY_COLUMNS)
    .ilike('name', named)
    .limit(1);
  if (category.error) return { ok: false, fault: baseFault('categories', category.error.message) };
  const row = ((category.data ?? []) as unknown as CategoryFace[])[0] ?? null;
  if (!row) return { ok: true, value: null };

  const atoms = await supabase
    .from('atom_dressed')
    .select(ATOM_SEARCH_COLUMNS, { count: 'exact' })
    .eq('is_override', false)
    .eq('category_name', row.name)
    .order('atom_word', { ascending: true })
    .limit(CATEGORY_ATOM_LIMIT);
  if (atoms.error) return { ok: false, fault: baseFault('atom_dressed', atoms.error.message) };
  const cards = ((atoms.data ?? []) as unknown as AtomSearchRow[]).map(atomCard);

  return { ok: true, value: { row, cards, total: atoms.count ?? cards.length } };
}

// ── the lattice's rooms ────────────────────────────────────────────────────

/** The scheme by its name, case-blind, with its members, its edges and its kin. */
export async function readScheme(
  name: string,
  client?: KnowledgeClient
): Promise<Reading<SchemeWhole | null>> {
  if (!knowledgeDoorNamed()) return { ok: false, fault: doorUnnamedFault('schemes') };
  const named = ilikeValue(name.trim());
  if (!named) return { ok: true, value: null };
  const supabase = await knowledgeClient(client);

  const scheme = await supabase
    .from('schemes')
    .select(SCHEME_DETAIL_COLUMNS)
    .ilike('name', named)
    .limit(1);
  if (scheme.error) return { ok: false, fault: baseFault('schemes', scheme.error.message) };
  const row = ((scheme.data ?? []) as unknown as SchemeDetail[])[0] ?? null;
  if (!row) return { ok: true, value: null };

  const members = await supabase
    .from('scheme_memberships')
    .select(SCHEME_MEMBER_COLUMNS)
    .eq('scheme_id', row.id)
    .order('sort_order', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (members.error) {
    return { ok: false, fault: baseFault('scheme_memberships', members.error.message) };
  }
  const memberRows = (members.data ?? []) as unknown as SchemeMemberRow[];

  const faces = await readAtomFaces(supabase, memberRows.map((one) => one.atom_id));
  if (!faces.ok) return faces;

  const relations = await supabase
    .from('concept_relations')
    .select(RELATION_SIDES_COLUMNS)
    .eq('scheme_id', row.id)
    .limit(BOND_READ_LIMIT);
  if (relations.error) {
    return { ok: false, fault: baseFault('concept_relations', relations.error.message) };
  }
  const relationRows = (relations.data ?? []) as unknown as RelationSidesRow[];

  const names = await readRelationNames(supabase, relationRows);
  if (!names.ok) return names;

  const children = await supabase
    .from('schemes')
    .select(SCHEME_COLUMNS)
    .eq('parent_scheme_id', row.id)
    .order('name', { ascending: true })
    .limit(BOND_READ_LIMIT);
  if (children.error) return { ok: false, fault: baseFault('schemes', children.error.message) };

  let parentName: string | null = null;
  if (row.parent_scheme_id) {
    const parent = await supabase
      .from('schemes')
      .select(NAME_COLUMNS)
      .eq('id', row.parent_scheme_id)
      .limit(1);
    if (parent.error) return { ok: false, fault: baseFault('schemes', parent.error.message) };
    parentName = ((parent.data ?? []) as unknown as SchemeIdRow[])[0]?.name ?? null;
  }

  return {
    ok: true,
    value: {
      row,
      parentName,
      children: (children.data ?? []) as unknown as SchemeChip[],
      members: schemeMembers(memberRows, faces.value),
      edges: schemeEdges(relationRows, names.value),
    },
  };
}

/** Every scheme's membership and edge counts, counted from rows. */
export async function readSchemeCounts(
  client?: KnowledgeClient
): Promise<Reading<SchemeTallies>> {
  if (!knowledgeDoorNamed()) {
    return { ok: false, fault: doorUnnamedFault('scheme_memberships · concept_relations') };
  }
  const supabase = await knowledgeClient(client);

  const schemes = await supabase.from('schemes').select(NAME_COLUMNS).limit(LATTICE_READ_LIMIT);
  if (schemes.error) return { ok: false, fault: baseFault('schemes', schemes.error.message) };

  const members = await supabase
    .from('scheme_memberships')
    .select(SCHEME_KEY_COLUMNS)
    .limit(LATTICE_READ_LIMIT);
  if (members.error) {
    return { ok: false, fault: baseFault('scheme_memberships', members.error.message) };
  }

  const edges = await supabase
    .from('concept_relations')
    .select(SCHEME_KEY_COLUMNS)
    .limit(LATTICE_READ_LIMIT);
  if (edges.error) {
    return { ok: false, fault: baseFault('concept_relations', edges.error.message) };
  }

  return {
    ok: true,
    value: schemeTallies(
      (schemes.data ?? []) as unknown as SchemeIdRow[],
      tallyByScheme((members.data ?? []) as unknown as SchemeKeyRow[]),
      tallyByScheme((edges.data ?? []) as unknown as SchemeKeyRow[])
    ),
  };
}
