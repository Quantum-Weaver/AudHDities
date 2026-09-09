// src/lib/grammar/grammar-contract.ts
// The Grammar's shapes: the rows, the two atom views, the search, the honest
// empties, the three-part fault, and the door's counts.

import type { Database } from '@/lib/generated/supabase/knowledge/database.types';

type KnowledgeTables = Database['public']['Tables'];
type KnowledgeViews = Database['public']['Views'];

export type AtomRow = KnowledgeTables['atoms']['Row'];
export type MoleculeRow = KnowledgeTables['molecules']['Row'];
export type OrganismRow = KnowledgeTables['organisms']['Row'];
export type CategoryRow = KnowledgeTables['categories']['Row'];
export type SchemeRow = KnowledgeTables['schemes']['Row'];
export type SchemeMembershipRow = KnowledgeTables['scheme_memberships']['Row'];
export type ConceptRelationRow = KnowledgeTables['concept_relations']['Row'];
export type MoleculeAtomRow = KnowledgeTables['molecule_atoms']['Row'];
export type OrganismAtomRow = KnowledgeTables['organism_atoms']['Row'];
export type SensoryLexiconRow = KnowledgeTables['sensory_lexicon']['Row'];
export type EtymologyRow = KnowledgeTables['etymology']['Row'];
export type ThesaurusRow = KnowledgeTables['thesaurus']['Row'];
export type FolksonomyRow = KnowledgeTables['folksonomies']['Row'];

export type AtomWholeRow = KnowledgeViews['atom_whole']['Row'];
export type AtomDressedRow = KnowledgeViews['atom_dressed']['Row'];

// ── the fault ──────────────────────────────────────────────────────────────

/** What happened, why, the next step. */
export interface GrammarFault {
  what: string;
  why: string;
  next: string;
}

/** A read that carries its value or the fault that stopped it. */
export type Reading<T> = { ok: true; value: T } | { ok: false; fault: GrammarFault };

export const REGISTER_UNREAD = 'the register was unreadable';
export const DOOR_UNNAMED = 'the knowledge door is not named on this host';

export const KNOWLEDGE_URL_VAR = 'NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE';
export const KNOWLEDGE_KEY_VAR = 'NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE';

/** The fault for a host that names no knowledge door. */
export function doorUnnamedFault(table: string): GrammarFault {
  return {
    what: REGISTER_UNREAD,
    why: `${table} · ${DOOR_UNNAMED}`,
    next: `${KNOWLEDGE_URL_VAR} and ${KNOWLEDGE_KEY_VAR} named on this host`,
  };
}

/** The fault carrying the base's own message. */
export function baseFault(table: string, message: string): GrammarFault {
  return {
    what: REGISTER_UNREAD,
    why: `${table} · ${message}`,
    next: `a read policy on ${table} for the anon door`,
  };
}

// ── the door's counts ──────────────────────────────────────────────────────

export const DOOR_TABLES = [
  'atoms',
  'molecules',
  'organisms',
  'categories',
  'schemes',
  'sensory_lexicon',
  'folksonomies',
  'thesaurus',
] as const;

export type DoorTable = (typeof DOOR_TABLES)[number];

/** The six tables shown as tiles, in order. */
export const TILE_TABLES: readonly DoorTable[] = [
  'atoms',
  'molecules',
  'organisms',
  'categories',
  'schemes',
  'sensory_lexicon',
];

/** The two tables shown as one line under the tiles. */
export const LINE_TABLES: readonly DoorTable[] = ['folksonomies', 'thesaurus'];

export const DOOR_LABELS: Record<DoorTable, string> = {
  atoms: 'atoms',
  molecules: 'molecules',
  organisms: 'organisms',
  categories: 'categories',
  schemes: 'schemes',
  sensory_lexicon: 'senses',
  folksonomies: 'folksonomies',
  thesaurus: 'dressings',
};

export interface DoorCount {
  table: DoorTable;
  label: string;
  /** Null when the count was not read. */
  count: number | null;
  fault: GrammarFault | null;
}

export type DoorCounts = Record<DoorTable, DoorCount>;

// ── the tiers ──────────────────────────────────────────────────────────────

export type GrammarTier = 'atoms' | 'molecules' | 'organisms';

export const TIERS: readonly GrammarTier[] = ['atoms', 'molecules', 'organisms'];

export const TIER_HEADINGS: Record<GrammarTier, string> = {
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
};

export const TIER_NOUNS: Record<GrammarTier, { one: string; many: string }> = {
  atoms: { one: 'atom', many: 'atoms' },
  molecules: { one: 'molecule', many: 'molecules' },
  organisms: { one: 'organism', many: 'organisms' },
};

export const TIER_EMPTIES: Record<GrammarTier, string> = {
  atoms: 'no atom answers this search',
  molecules: 'no molecule answers this search',
  organisms: 'no organism answers this search',
};

export const TIER_ROUTES: Record<GrammarTier, string> = {
  atoms: '/grammar/atoms',
  molecules: '/grammar/molecules',
  organisms: '/grammar/organisms',
};

/** The room a word of this tier opens. */
export function tierAddress(tier: GrammarTier, name: string): string {
  return `${TIER_ROUTES[tier]}/${encodeURIComponent(name)}`;
}

/** The one word this tier is named by. */
export function tierWord(tier: GrammarTier): string {
  return TIER_NOUNS[tier].one;
}

// ── the dressed card ───────────────────────────────────────────────────────

export const WEARING_CATEGORY_FACE = "wearing its category's face";

export interface AtomFace {
  glyph: string | null;
  fromCategory: boolean;
}

/** The sense's emoji, else the category's face, marked as borrowed. */
export function atomFace(row: {
  emoji?: string | null;
  sensory_emoji?: string | null;
  category_face: string | null;
}): AtomFace {
  const own = row.emoji ?? row.sensory_emoji ?? null;
  if (own) return { glyph: own, fromCategory: false };
  if (row.category_face) return { glyph: row.category_face, fromCategory: true };
  return { glyph: null, fromCategory: false };
}

export interface DressedCard {
  key: string;
  tier: GrammarTier;
  face: string | null;
  faceFromCategory: boolean;
  title: string;
  /** The stored words this name is built from, in the order the row holds them. */
  parts: string[];
  definition: string | null;
  categoryFace: string | null;
  categoryName: string | null;
  badges: string[];
  address: string;
}

export const NO_DEFINITION = 'no definition recorded';

export type AtomSearchRow = Pick<
  AtomDressedRow,
  'atom_id' | 'atom_word' | 'definition' | 'category_face' | 'category_name' | 'emoji' | 'atom_type'
>;

export type MoleculeSearchRow = Pick<
  MoleculeRow,
  'name' | 'definition' | 'molecule_type' | 'naming_convention' | 'atom_words' | 'kebab_case'
>;

export type OrganismSearchRow = Pick<
  OrganismRow,
  'name' | 'definition' | 'organism_type' | 'domain' | 'kebab_case'
>;

/** The values a row actually carries, the null ones dropped. */
export function present(values: readonly (string | null | undefined)[]): string[] {
  const kept: string[] = [];
  for (const value of values) {
    if (value) kept.push(value);
  }
  return kept;
}

const PART_SPLIT = /[\s,·-]+/;

/** The words a stored name string holds, in its own order. */
export function nameParts(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(PART_SPLIT)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

export function atomCard(row: AtomSearchRow): DressedCard {
  const face = atomFace(row);
  const word = row.atom_word ?? '';
  return {
    key: row.atom_id ?? word,
    tier: 'atoms',
    face: face.glyph,
    faceFromCategory: face.fromCategory,
    title: word,
    parts: [],
    definition: row.definition,
    categoryFace: row.category_face,
    categoryName: row.category_name,
    badges: present([row.atom_type]),
    address: tierAddress('atoms', word),
  };
}

export function moleculeCard(row: MoleculeSearchRow): DressedCard {
  return {
    key: row.name,
    tier: 'molecules',
    face: null,
    faceFromCategory: false,
    title: row.name,
    parts: nameParts(row.atom_words ?? row.kebab_case),
    definition: row.definition,
    categoryFace: null,
    categoryName: null,
    badges: present([row.molecule_type, row.naming_convention]),
    address: tierAddress('molecules', row.name),
  };
}

export function organismCard(row: OrganismSearchRow): DressedCard {
  return {
    key: row.name,
    tier: 'organisms',
    face: null,
    faceFromCategory: false,
    title: row.name,
    parts: nameParts(row.kebab_case),
    definition: row.definition,
    categoryFace: null,
    categoryName: null,
    badges: present([row.organism_type, row.domain]),
    address: tierAddress('organisms', row.name),
  };
}

// ── the search ─────────────────────────────────────────────────────────────

export const QUERY_MAX = 80;
export const TIER_LIMIT = 24;
export const SEARCH_LABEL = 'a word, a name, or a definition';
export const SEARCH_WORD = 'Search';
export const SEARCH_PARAM = 'q';
export const CATEGORY_PARAM = 'category';
export const COUNTED_FROM_ROWS = 'counted from rows';
export const LIVE_SOURCE = 'live · knowledge · the anon door';

/** A query trimmed and held to QUERY_MAX, or null when it holds nothing. */
export function boundQuery(value: string | null | undefined): string | null {
  if (!value) return null;
  const bounded = value.trim().slice(0, QUERY_MAX);
  return bounded.length > 0 ? bounded : null;
}

const OPERATOR_CHARS = /[%_\\"(),*]/g;

/** The value for an ilike, with the operator characters removed. */
export function ilikeValue(value: string): string {
  return value.replace(OPERATOR_CHARS, '');
}

/** The pattern an ilike search uses. */
export function ilikePattern(value: string): string {
  return `%${ilikeValue(value)}%`;
}

export interface TierResult {
  tier: GrammarTier;
  heading: string;
  /** Null when the tier was not read. */
  total: number | null;
  cards: DressedCard[];
  empty: string;
  fault: GrammarFault | null;
}

export interface SearchResults {
  q: string | null;
  category: string | null;
  tiers: TierResult[];
}

/** The count line a tier prints: its total, and how many of them are shown. */
export function tierMeta(result: TierResult): string {
  if (result.total === null) return REGISTER_UNREAD;
  const noun = result.total === 1 ? TIER_NOUNS[result.tier].one : TIER_NOUNS[result.tier].many;
  const counted = `${result.total.toLocaleString('en')} ${noun}`;
  return result.cards.length < result.total
    ? `${counted} · ${result.cards.length.toLocaleString('en')} shown`
    : counted;
}

/** The tally across every tier that answered, or null when none did. */
export function answerTally(results: SearchResults): number | null {
  const totals = results.tiers
    .map((tier) => tier.total)
    .filter((total): total is number => total !== null);
  if (totals.length === 0) return null;
  return totals.reduce((sum, total) => sum + total, 0);
}

/** The line above the groups: the tally, counted from rows. */
export function tallyLine(results: SearchResults): string {
  const tally = answerTally(results);
  if (tally === null) return REGISTER_UNREAD;
  return `${tally} ${tally === 1 ? 'answer' : 'answers'} · ${COUNTED_FROM_ROWS}`;
}

// ── the faces and the lattice ──────────────────────────────────────────────

export type CategoryFace = Pick<CategoryRow, 'name' | 'icon_emoji' | 'description' | 'sort_order'>;
export type SchemeChip = Pick<SchemeRow, 'name' | 'scheme_type' | 'sort_order' | 'description'>;

export const FACES_HEADING = 'The faces';
export const FACES_META = 'each a filter';
export const LATTICE_HEADING = 'The lattice';
export const LATTICE_META = 'not a hierarchy';
export const NO_CATEGORY = 'no category stands in the register yet';
export const NO_SCHEME = 'no scheme stands in the lattice yet';

/** The four kinds of scheme, in the order the lattice shelves them. */
export const SCHEME_SHELVES: readonly string[] = ['rank', 'facet', 'axis', 'dimension'];

export interface SchemeShelf {
  kind: string;
  chips: SchemeChip[];
}

/** The schemes shelved by kind, the four named kinds first, then any other. */
export function shelveSchemes(rows: readonly SchemeChip[]): SchemeShelf[] {
  const named = Array.from(new Set(rows.map((row) => row.scheme_type))).filter(
    (kind) => !SCHEME_SHELVES.includes(kind)
  );
  return [...SCHEME_SHELVES, ...named]
    .map((kind) => ({ kind, chips: rows.filter((row) => row.scheme_type === kind) }))
    .filter((shelf) => shelf.chips.length > 0);
}

/** The address a category chip opens. */
export function categoryAddress(name: string): string {
  return `/grammar/explore?${CATEGORY_PARAM}=${encodeURIComponent(name)}`;
}

// ── the atom's room ────────────────────────────────────────────────────────

export type AtomWhole = Pick<
  AtomWholeRow,
  | 'affinity'
  | 'atom_id'
  | 'atom_type'
  | 'atom_word'
  | 'category_face'
  | 'category_name'
  | 'definition'
  | 'etymology_progress'
  | 'historical_meaning'
  | 'pascal_case'
  | 'root_language'
  | 'root_word'
  | 'sanctuary_meaning'
  | 'screaming_case'
  | 'sensory_color'
  | 'sensory_emoji'
  | 'sensory_movement'
  | 'sensory_shape'
  | 'sensory_smell'
  | 'sensory_sound'
  | 'sensory_taste'
  | 'sensory_temperature'
  | 'sensory_texture'
  | 'snake_case'
  | 'state'
  | 'valence'
  | 'weight'
>;

export const NOT_YET_SENSED = 'not yet sensed';
export const SENSES_HEADING = 'The senses';
export const SENSES_SOURCE = 'sensory_lexicon';
export const ROOT_HEADING = 'The root';
export const ROOT_SOURCE = 'etymology';
export const BONDS_HEADING = 'The bonds';
export const BONDS_SOURCE = 'molecule_atoms · organism_atoms';
export const ATOM_LATTICE_SOURCE = 'scheme_memberships · concept_relations';
export const DRESSINGS_HEADING = 'The dressings';
export const DRESSINGS_SOURCE = 'atom_dressed · one row per folksonomy with an opinion';
export const SANCTUARY_MEANING_LABEL = 'sanctuary meaning';
export const ATOM_CRUMB = 'grammar · atom · read live through the anon door';
export const BACK_TO_EXPLORE = 'Explore';

export interface SenseChannel {
  label: string;
  value: string | null;
  /** The colour a swatch is drawn in, when the channel carries one. */
  swatch: string | null;
  /** True for the one channel that runs the panel's whole width. */
  wide: boolean;
}

/** Every sensory channel the lexicon carries, a null one saying so. */
export function senseChannels(whole: AtomWhole): SenseChannel[] {
  return [
    { label: 'emoji', value: whole.sensory_emoji, swatch: null, wide: false },
    { label: 'colour', value: whole.sensory_color, swatch: whole.sensory_color, wide: false },
    { label: 'texture', value: whole.sensory_texture, swatch: null, wide: false },
    { label: 'shape', value: whole.sensory_shape, swatch: null, wide: false },
    { label: 'movement', value: whole.sensory_movement, swatch: null, wide: false },
    { label: 'temperature', value: whole.sensory_temperature, swatch: null, wide: false },
    { label: 'taste', value: whole.sensory_taste, swatch: null, wide: false },
    { label: 'smell', value: whole.sensory_smell, swatch: null, wide: false },
    { label: 'sound', value: whole.sensory_sound, swatch: null, wide: true },
  ];
}

/** The three case renderings, in the order the room prints them. */
export function atomCases(whole: AtomWhole): string[] {
  return present([whole.snake_case, whole.screaming_case, whole.pascal_case]);
}

export const NO_ROOT_YET = 'no root recorded yet';
export const NO_HISTORICAL_MEANING = 'no historical meaning recorded yet';
export const NO_SANCTUARY_MEANING = 'no sanctuary meaning recorded yet';

/** The measures badge, or null when the row carries no measure. */
export function measuresBadge(whole: AtomWhole): string | null {
  const measures = [
    whole.weight === null ? null : `weight ${whole.weight}`,
    whole.affinity === null ? null : `affinity ${whole.affinity}`,
    whole.valence === null ? null : `valence ${whole.valence}`,
  ].filter((measure): measure is string => measure !== null);
  return measures.length > 0 ? measures.join(' · ') : null;
}

// ── the bonds ──────────────────────────────────────────────────────────────

export const MOLECULE_CHIP_LIMIT = 8;
export const ORGANISM_CHIP_LIMIT = 4;
export const NO_MOLECULE_BOND = 'in no molecule yet';
export const NO_ORGANISM_BOND = 'in no organism yet';

export interface BondChips {
  chips: string[];
  /** How many bonded names are held back, zero when every one is shown. */
  more: number;
}

/** Names sorted case-blind, the way the room reads them. */
export function sortNames(names: readonly string[]): string[] {
  return [...names].sort((one, other) =>
    one.toLowerCase().localeCompare(other.toLowerCase(), 'en')
  );
}

/** The first `limit` names as chips, with the rest counted. */
export function bondChips(names: readonly string[], limit: number, total?: number): BondChips {
  const sorted = sortNames(names);
  const chips = sorted.slice(0, limit);
  const counted = total ?? sorted.length;
  return { chips, more: Math.max(counted - chips.length, 0) };
}

export interface AtomBonds {
  moleculeCount: number;
  moleculeNames: string[];
  organismCount: number;
  organismNames: string[];
}

export interface BondJoinRow {
  molecules: { name: string } | null;
}

export interface OrganismBondJoinRow {
  organisms: { name: string } | null;
}

/** The bond count line, or the sentence for a tier this atom bonds into none of. */
export function bondLine(count: number, tier: 'molecules' | 'organisms'): string {
  if (count === 0) return tier === 'molecules' ? NO_MOLECULE_BOND : NO_ORGANISM_BOND;
  const noun = count === 1 ? TIER_NOUNS[tier].one : TIER_NOUNS[tier].many;
  return `in ${count} ${noun}`;
}

/** The line for the names a chip row holds back. */
export function moreLine(more: number): string {
  return `and ${more} more`;
}

// ── the lattice, for one atom ──────────────────────────────────────────────

export const NOT_IN_A_SCHEME = 'not yet placed in a scheme';
export const NO_TYPED_EDGES = 'no typed edges yet';
export const PRIMARY_LABEL = 'primary';

export interface SchemeMembershipView {
  scheme: string;
  schemeType: string;
  primary: boolean;
}

export interface LatticeEdge {
  relationType: string;
  direction: 'subject' | 'object';
}

export interface AtomLattice {
  memberships: SchemeMembershipView[];
  edges: LatticeEdge[];
}

export interface MembershipJoinRow {
  is_primary: boolean;
  schemes: { name: string; scheme_type: string } | null;
}

export interface RelationJoinRow {
  relation_type: string;
  subject_atom_id: string | null;
  object_atom_id: string | null;
}

/** The memberships a join answers, in scheme name order. */
export function membershipViews(rows: readonly MembershipJoinRow[]): SchemeMembershipView[] {
  const placed: SchemeMembershipView[] = [];
  for (const row of rows) {
    if (!row.schemes) continue;
    placed.push({
      scheme: row.schemes.name,
      schemeType: row.schemes.scheme_type,
      primary: row.is_primary,
    });
  }
  return placed.sort((one, other) => one.scheme.localeCompare(other.scheme, 'en'));
}

/** The typed edges a join answers, each named from this atom's end. */
export function latticeEdges(rows: readonly RelationJoinRow[], atomId: string): LatticeEdge[] {
  return rows.map((row) => ({
    relationType: row.relation_type,
    direction: row.subject_atom_id === atomId ? ('subject' as const) : ('object' as const),
  }));
}

// ── the dressings ──────────────────────────────────────────────────────────

export const HEARTH_LABEL = 'the hearth';
export const HEARTH_LINE = 'the definition above, as the Grammar holds it for everyone';
export const NO_DRESSING = 'no folksonomy dresses this word yet';

export type AtomDressing = Pick<
  AtomDressedRow,
  'atom_id' | 'atom_word' | 'definition' | 'emoji' | 'color_hex' | 'folksonomy_type' | 'is_override'
>;

export interface DressingView {
  key: string;
  folksonomy: string;
  emoji: string | null;
  colour: string | null;
  definition: string | null;
}

export interface DressingsView {
  /** The one base row, never merged with a dressing. */
  hearth: AtomDressing | null;
  dressings: DressingView[];
}

/** The hearth row kept apart from every folksonomy's opinion. */
export function splitDressings(rows: readonly AtomDressing[]): DressingsView {
  const hearth = rows.find((row) => row.is_override !== true) ?? null;
  const dressings: DressingView[] = [];
  for (const row of rows) {
    if (row.is_override !== true || !row.folksonomy_type) continue;
    dressings.push({
      key: row.folksonomy_type,
      folksonomy: row.folksonomy_type,
      emoji: row.emoji,
      colour: row.color_hex,
      definition: row.definition,
    });
  }
  dressings.sort((one, other) => one.folksonomy.localeCompare(other.folksonomy, 'en'));
  return { hearth, dressings };
}

// ── the relation, from either end ──────────────────────────────────────────

/** The two columns a relation names each tier by. */
export const RELATION_COLUMN: Record<GrammarTier, { subject: string; object: string }> = {
  atoms: { subject: 'subject_atom_id', object: 'object_atom_id' },
  molecules: { subject: 'subject_molecule_id', object: 'object_molecule_id' },
  organisms: { subject: 'subject_organism_id', object: 'object_organism_id' },
};

/** The filter that finds every relation carrying this concept at either end. */
export function relationFilter(tier: GrammarTier, id: string): string {
  return `${RELATION_COLUMN[tier].subject}.eq.${id},${RELATION_COLUMN[tier].object}.eq.${id}`;
}

export interface RelationSidesRow {
  relation_type: string;
  subject_atom_id: string | null;
  subject_molecule_id: string | null;
  subject_organism_id: string | null;
  object_atom_id: string | null;
  object_molecule_id: string | null;
  object_organism_id: string | null;
}

export interface EdgeSide {
  tier: GrammarTier;
  /** The tier's own word: atom, molecule or organism. */
  word: string;
  /** Null when the base holds no name for this id. */
  name: string | null;
  /** The room this side opens, null when it has no name. */
  address: string | null;
}

/** The id one end of a relation carries, with the tier that holds it. */
export function relationEnd(
  row: RelationSidesRow,
  end: 'subject' | 'object'
): { tier: GrammarTier; id: string } | null {
  for (const tier of TIERS) {
    const column = RELATION_COLUMN[tier][end] as keyof RelationSidesRow;
    const id = row[column];
    if (typeof id === 'string' && id.length > 0) return { tier, id };
  }
  return null;
}

/** Every id a relation read names, gathered per tier. */
export function relationIds(rows: readonly RelationSidesRow[]): Record<GrammarTier, string[]> {
  const gathered: Record<GrammarTier, Set<string>> = {
    atoms: new Set(),
    molecules: new Set(),
    organisms: new Set(),
  };
  for (const row of rows) {
    for (const end of ['subject', 'object'] as const) {
      const side = relationEnd(row, end);
      if (side) gathered[side.tier].add(side.id);
    }
  }
  return {
    atoms: Array.from(gathered.atoms),
    molecules: Array.from(gathered.molecules),
    organisms: Array.from(gathered.organisms),
  };
}

/** One end of a relation, named from the lookup, or null when the end is empty. */
export function relationSide(
  row: RelationSidesRow,
  end: 'subject' | 'object',
  names: Readonly<Record<string, string>>
): EdgeSide | null {
  const side = relationEnd(row, end);
  if (!side) return null;
  const name = names[side.id] ?? null;
  return {
    tier: side.tier,
    word: tierWord(side.tier),
    name,
    address: name ? tierAddress(side.tier, name) : null,
  };
}

export interface ConceptEdge {
  relationType: string;
  direction: 'subject' | 'object';
  /** The end that is not this concept. */
  other: EdgeSide | null;
}

/** The typed edges a relation read answers, each named from this concept's end. */
export function conceptEdges(
  rows: readonly RelationSidesRow[],
  tier: GrammarTier,
  id: string,
  names: Readonly<Record<string, string>>
): ConceptEdge[] {
  return rows.map((row) => {
    const subject = row[RELATION_COLUMN[tier].subject as keyof RelationSidesRow] === id;
    return {
      relationType: row.relation_type,
      direction: subject ? ('subject' as const) : ('object' as const),
      other: relationSide(row, subject ? 'object' : 'subject', names),
    };
  });
}

// ── the compound's room ────────────────────────────────────────────────────

export const NO_ATOM_BOND = 'no atom bonds recorded';
export const NOT_IN_AN_ORGANISM = 'part of no organism';
export const NO_MOLECULE_HELD = 'holds no molecule';

export type MoleculeDetail = Pick<
  MoleculeRow,
  | 'atom_words'
  | 'bond_type'
  | 'camel_case'
  | 'definition'
  | 'domain'
  | 'functional_group'
  | 'id'
  | 'kebab_case'
  | 'molecule_type'
  | 'name'
  | 'naming_convention'
  | 'pascal_case'
  | 'screaming_case'
  | 'sensory_override'
  | 'snake_case'
  | 'total_weight'
>;

export type OrganismDetail = Pick<
  OrganismRow,
  | 'acronym'
  | 'camel_case'
  | 'definition'
  | 'domain'
  | 'habitat'
  | 'id'
  | 'kebab_case'
  | 'lifecycle'
  | 'name'
  | 'organism_type'
  | 'pascal_case'
  | 'screaming_case'
  | 'sensory_override'
  | 'snake_case'
>;

export interface CompoundAtom {
  key: string;
  position: number | null;
  role: string | null;
  bondType: string | null;
  bondStrength: number | null;
  word: string;
  categoryName: string | null;
  emoji: string | null;
  address: string;
}

export interface CompoundAtomRow {
  position: number | null;
  role: string | null;
  bond_type?: string | null;
  bond_strength: number | null;
  atom_id: string;
  atoms: { atom_word: string; category_name: string | null } | null;
}

export interface CompoundMolecule {
  key: string;
  position: number | null;
  role: string | null;
  bondType: string | null;
  name: string;
  address: string;
}

export interface CompoundMoleculeRow {
  position: number | null;
  role: string | null;
  bond_type: string | null;
  molecules: { name: string } | null;
}

export interface AtomEmojiRow {
  atom_id: string;
  emoji: string | null;
}

/** The sensory face of each atom that carries one, keyed by atom id. */
export function emojiByAtom(rows: readonly AtomEmojiRow[]): Record<string, string> {
  const faces: Record<string, string> = {};
  for (const row of rows) {
    if (row.emoji) faces[row.atom_id] = row.emoji;
  }
  return faces;
}

/** The atoms a bond read answers, in position order, each a door. */
export function compoundAtoms(
  rows: readonly CompoundAtomRow[],
  faces: Readonly<Record<string, string>>
): CompoundAtom[] {
  const bonded: CompoundAtom[] = [];
  for (const row of rows) {
    if (!row.atoms) continue;
    bonded.push({
      key: row.atom_id,
      position: row.position,
      role: row.role,
      bondType: row.bond_type ?? null,
      bondStrength: row.bond_strength,
      word: row.atoms.atom_word,
      categoryName: row.atoms.category_name,
      emoji: faces[row.atom_id] ?? null,
      address: tierAddress('atoms', row.atoms.atom_word),
    });
  }
  return bonded.sort((one, other) => (one.position ?? 0) - (other.position ?? 0));
}

/** The molecules an organism holds, in position order, each a door. */
export function compoundMolecules(rows: readonly CompoundMoleculeRow[]): CompoundMolecule[] {
  const held: CompoundMolecule[] = [];
  for (const row of rows) {
    if (!row.molecules) continue;
    held.push({
      key: row.molecules.name,
      position: row.position,
      role: row.role,
      bondType: row.bond_type,
      name: row.molecules.name,
      address: tierAddress('molecules', row.molecules.name),
    });
  }
  return held.sort((one, other) => (one.position ?? 0) - (other.position ?? 0));
}

export interface MoleculeWhole {
  row: MoleculeDetail;
  atoms: CompoundAtom[];
  organismNames: string[];
  memberships: SchemeMembershipView[];
  edges: ConceptEdge[];
}

export interface OrganismWhole {
  row: OrganismDetail;
  molecules: CompoundMolecule[];
  atoms: CompoundAtom[];
  memberships: SchemeMembershipView[];
  edges: ConceptEdge[];
}

// ── the category's room ────────────────────────────────────────────────────

export const NO_FACE_WORN = 'no atom wears this face yet';

export interface CategoryWhole {
  row: CategoryFace;
  cards: DressedCard[];
  /** The base's own count of the atoms wearing this face. */
  total: number;
}

// ── the lattice's rooms ────────────────────────────────────────────────────

export const NO_MEMBER_YET = 'no member yet';
export const NO_SCHEME_EDGE = 'no edge in this scheme';

export type SchemeDetail = Pick<
  SchemeRow,
  'deity_name' | 'description' | 'id' | 'name' | 'parent_scheme_id' | 'scheme_type' | 'sort_order'
>;

export interface SchemeMember {
  key: string;
  tier: GrammarTier;
  /** The tier's own word: atom, molecule or organism. */
  word: string;
  name: string;
  primary: boolean;
  emoji: string | null;
  sortOrder: number | null;
  address: string;
}

export interface SchemeMemberRow {
  is_primary: boolean;
  sort_order: number | null;
  atom_id: string | null;
  atoms: { atom_word: string } | null;
  molecules: { name: string } | null;
  organisms: { name: string } | null;
}

/** The tier and name a membership row carries, or null when it names none. */
export function memberNamed(row: SchemeMemberRow): { tier: GrammarTier; name: string } | null {
  if (row.atoms) return { tier: 'atoms', name: row.atoms.atom_word };
  if (row.molecules) return { tier: 'molecules', name: row.molecules.name };
  if (row.organisms) return { tier: 'organisms', name: row.organisms.name };
  return null;
}

/** A scheme's members, by sort order then by name, each a door. */
export function schemeMembers(
  rows: readonly SchemeMemberRow[],
  faces: Readonly<Record<string, string>>
): SchemeMember[] {
  const members: SchemeMember[] = [];
  for (const row of rows) {
    const named = memberNamed(row);
    if (!named) continue;
    members.push({
      key: `${named.tier} · ${named.name}`,
      tier: named.tier,
      word: tierWord(named.tier),
      name: named.name,
      primary: row.is_primary,
      emoji: row.atom_id ? (faces[row.atom_id] ?? null) : null,
      sortOrder: row.sort_order,
      address: tierAddress(named.tier, named.name),
    });
  }
  return members.sort((one, other) => {
    const order = (one.sortOrder ?? 0) - (other.sortOrder ?? 0);
    return order !== 0 ? order : one.name.localeCompare(other.name, 'en');
  });
}

export interface SchemeEdge {
  relationType: string;
  subject: EdgeSide | null;
  object: EdgeSide | null;
}

/** The typed edges drawn within one scheme, both ends named. */
export function schemeEdges(
  rows: readonly RelationSidesRow[],
  names: Readonly<Record<string, string>>
): SchemeEdge[] {
  return rows.map((row) => ({
    relationType: row.relation_type,
    subject: relationSide(row, 'subject', names),
    object: relationSide(row, 'object', names),
  }));
}

export interface SchemeWhole {
  row: SchemeDetail;
  /** Null when this scheme stands under no other. */
  parentName: string | null;
  children: SchemeChip[];
  members: SchemeMember[];
  edges: SchemeEdge[];
}

export interface SchemeIdRow {
  id: string;
  name: string;
}

export interface SchemeKeyRow {
  scheme_id: string | null;
}

export interface SchemeTally {
  name: string;
  members: number;
  edges: number;
}

/** Each scheme's tally, keyed by its name. */
export type SchemeTallies = Record<string, SchemeTally>;

/** The rows counted per scheme id, the rows naming no scheme dropped. */
export function tallyByScheme(rows: readonly SchemeKeyRow[]): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const row of rows) {
    if (!row.scheme_id) continue;
    tally[row.scheme_id] = (tally[row.scheme_id] ?? 0) + 1;
  }
  return tally;
}

/** Every scheme with its membership and edge counts, counted from rows. */
export function schemeTallies(
  schemes: readonly SchemeIdRow[],
  members: Readonly<Record<string, number>>,
  edges: Readonly<Record<string, number>>
): SchemeTallies {
  const tallies: SchemeTallies = {};
  for (const scheme of schemes) {
    tallies[scheme.name] = {
      name: scheme.name,
      members: members[scheme.id] ?? 0,
      edges: edges[scheme.id] ?? 0,
    };
  }
  return tallies;
}

// ── the door's rooms ───────────────────────────────────────────────────────

export const NOT_YET_WIRED = 'not yet wired';

export interface GrammarDoor {
  title: string;
  line: string;
  href: string | null;
}

export const GRAMMAR_DOORS: readonly GrammarDoor[] = [
  {
    title: 'Explore',
    line: 'Search the three tiers, walk the faces, read the lattice.',
    href: '/grammar/explore',
  },
  {
    title: 'Senses',
    line: 'Every mark once, the atoms that wear it, and the colours chosen.',
    href: '/grammar/senses',
  },
  {
    title: 'Folksonomies',
    line: 'Every umbrella of collective meaning, each dressing beside its hearth.',
    href: '/grammar/folksonomies',
  },
  { title: 'Carry', line: NOT_YET_WIRED, href: null },
];

/** One house word and what it means. */
export interface HouseWord {
  word: string;
  meaning: string;
}

/** The house words, told on the Grammar's door and footnoted by every room. */
export const HOUSE_WORDS: readonly HouseWord[] = [
  {
    word: 'the hearth',
    meaning: 'the shared vocabulary, defined once, common to every vessel who reads it.',
  },
  {
    word: 'the heart',
    meaning: 'a vessel’s own layer of meaning, laid beside the hearth and never over it.',
  },
  {
    word: 'a folksonomy',
    meaning:
      'the umbrella a collective understanding lives under, in any sense or atom, whether or not it is mainstream language.',
  },
  {
    word: 'a seed',
    meaning:
      'a numbered paper of SQL that lands rows in the Grammar; the Grammar changes only when one lands.',
  },
];

export const HOUSE_WORDS_HEADING = 'House words';

/** The section of the Grammar's door that tells the house words. */
export const HOUSE_WORDS_ANCHOR = 'house-words';
export const HOUSE_WORDS_ADDRESS = `/grammar#${HOUSE_WORDS_ANCHOR}`;

export const GRAMMAR_HOUSE_WORDS: readonly string[] = HOUSE_WORDS.map((entry) => entry.word);

export const ATOM_HOUSE_WORDS: readonly string[] = ['the hearth', 'the heart', 'a folksonomy'];

export const HOUSE_WORDS_TAIL = 'house words, each told once on the Grammar’s door';

export const GRAMMAR_PILL = 'The Grammar';
export const EXPLORE_PILL = 'The Grammar · Explore';
export const GRAMMAR_TITLE = 'The shared vocabulary, defined once';
export const HEARTH_SENTENCE =
  'The hearth is the shared vocabulary every app, every vessel and every echo references for one meaning.';
export const HEART_SENTENCE =
  'The heart is a vessel’s own layer of meaning on top of it — neither one overwriting the other.';
export const EXPLORE_SENTENCE =
  'Every atom, molecule and organism the Sanctuary speaks, with its senses and its root. Search a word, or walk the faces. The hearth is shown whole; the heart is never merged into it.';

// ── the columns ────────────────────────────────────────────────────────────

export const ATOM_SEARCH_COLUMNS = [
  'atom_id',
  'atom_word',
  'definition',
  'category_face',
  'category_name',
  'emoji',
  'atom_type',
].join(', ');

export const MOLECULE_SEARCH_COLUMNS = [
  'name',
  'definition',
  'molecule_type',
  'naming_convention',
  'atom_words',
  'kebab_case',
].join(', ');

export const ORGANISM_SEARCH_COLUMNS = [
  'name',
  'definition',
  'organism_type',
  'domain',
  'kebab_case',
].join(', ');

export const CATEGORY_COLUMNS = ['name', 'icon_emoji', 'description', 'sort_order'].join(', ');

export const SCHEME_COLUMNS = ['name', 'scheme_type', 'sort_order', 'description'].join(', ');

export const ATOM_WHOLE_COLUMNS = [
  'affinity',
  'atom_id',
  'atom_type',
  'atom_word',
  'category_face',
  'category_name',
  'definition',
  'etymology_progress',
  'historical_meaning',
  'pascal_case',
  'root_language',
  'root_word',
  'sanctuary_meaning',
  'screaming_case',
  'sensory_color',
  'sensory_emoji',
  'sensory_movement',
  'sensory_shape',
  'sensory_smell',
  'sensory_sound',
  'sensory_taste',
  'sensory_temperature',
  'sensory_texture',
  'snake_case',
  'state',
  'valence',
  'weight',
].join(', ');

export const ATOM_DRESSING_COLUMNS = [
  'atom_id',
  'atom_word',
  'definition',
  'emoji',
  'color_hex',
  'folksonomy_type',
  'is_override',
].join(', ');

export const MOLECULE_DETAIL_COLUMNS = [
  'atom_words',
  'bond_type',
  'camel_case',
  'definition',
  'domain',
  'functional_group',
  'id',
  'kebab_case',
  'molecule_type',
  'name',
  'naming_convention',
  'pascal_case',
  'screaming_case',
  'sensory_override',
  'snake_case',
  'total_weight',
].join(', ');

export const ORGANISM_DETAIL_COLUMNS = [
  'acronym',
  'camel_case',
  'definition',
  'domain',
  'habitat',
  'id',
  'kebab_case',
  'lifecycle',
  'name',
  'organism_type',
  'pascal_case',
  'screaming_case',
  'sensory_override',
  'snake_case',
].join(', ');

export const SCHEME_DETAIL_COLUMNS = [
  'deity_name',
  'description',
  'id',
  'name',
  'parent_scheme_id',
  'scheme_type',
  'sort_order',
].join(', ');

export const MOLECULE_BOND_COLUMNS = 'molecules(name)';
export const ORGANISM_BOND_COLUMNS = 'organisms(name)';
export const MEMBERSHIP_COLUMNS = 'is_primary, schemes(name, scheme_type)';
export const RELATION_COLUMNS = 'relation_type, subject_atom_id, object_atom_id';

export const MOLECULE_ATOM_COLUMNS =
  'position, role, bond_type, bond_strength, atom_id, atoms(atom_word, category_name)';
export const ORGANISM_ATOM_COLUMNS =
  'position, role, bond_strength, atom_id, atoms(atom_word, category_name)';
export const ORGANISM_MOLECULE_COLUMNS = 'position, role, bond_type, molecules(name)';
export const SENSORY_FACE_COLUMNS = 'atom_id, emoji';
export const ATOM_NAME_COLUMNS = 'id, atom_word';
export const NAME_COLUMNS = 'id, name';
export const SCHEME_MEMBER_COLUMNS =
  'is_primary, sort_order, atom_id, atoms(atom_word), molecules(name), organisms(name)';
export const SCHEME_KEY_COLUMNS = 'scheme_id';
export const RELATION_SIDES_COLUMNS = [
  'relation_type',
  'subject_atom_id',
  'subject_molecule_id',
  'subject_organism_id',
  'object_atom_id',
  'object_molecule_id',
  'object_organism_id',
].join(', ');

/** The bond read's ceiling: every name is counted, this many are carried back. */
export const BOND_READ_LIMIT = 200;

/** The category read's ceiling: every atom is counted, this many are carried back. */
export const CATEGORY_ATOM_LIMIT = 200;

/** The lattice count read's ceiling, one row per membership and per edge. */
export const LATTICE_READ_LIMIT = 5000;

// ── the compound's room, drawn ─────────────────────────────────────────────

export const COMPOUND_ATOMS_HEADING = 'The atoms';
export const COMPOUND_MOLECULES_HEADING = 'The molecules';
export const PART_OF_HEADING = 'Part of';
export const MOLECULE_ATOM_SOURCE = 'molecule_atoms';
export const ORGANISM_ATOM_SOURCE = 'organism_atoms';
export const ORGANISM_MOLECULE_SOURCE = 'organism_molecules';

export const COMPOUND_HOUSE_WORDS: readonly string[] = ['the hearth', 'the heart'];

export const STRENGTH_LABEL = 'strength';
export const NO_COMPOUND_DRESSING = 'no dressing overrides this name yet';
export const MOLECULE_DRESSING_SOURCE = 'molecules.sensory_override';
export const ORGANISM_DRESSING_SOURCE = 'organisms.sensory_override';

export interface OverrideLine {
  key: string;
  label: string | null;
  value: string;
}

/** A stored override read as its own shape, a JSON text parsed, anything else kept whole. */
function parsedOverride(override: unknown): unknown {
  if (typeof override !== 'string') return override;
  const text = override.trim();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

/** One value printed as the line shows it. */
function printedOverride(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/** The keys and values a sensory override carries, one line each, the null ones dropped. */
export function overrideLines(override: unknown): OverrideLine[] {
  const held = parsedOverride(override);
  if (held === null || held === undefined) return [];

  const lines: OverrideLine[] = [];
  if (Array.isArray(held)) {
    held.forEach((value, index) => {
      const printed = printedOverride(value);
      if (printed) lines.push({ key: String(index), label: null, value: printed });
    });
    return lines;
  }

  if (typeof held !== 'object') {
    const printed = printedOverride(held);
    return printed ? [{ key: printed, label: null, value: printed }] : [];
  }

  for (const [label, value] of Object.entries(held as Record<string, unknown>)) {
    if (value === null || value === undefined) continue;
    const printed = printedOverride(value);
    if (printed) lines.push({ key: label, label, value: printed });
  }
  return lines;
}

const CRUMB_TAIL = 'read live through the anon door';

/** The crumb a tier's room prints. */
export function tierCrumb(tier: GrammarTier): string {
  return `grammar · ${tierWord(tier)} · ${CRUMB_TAIL}`;
}

export interface CompoundCases {
  snake_case: string | null;
  screaming_case: string | null;
  kebab_case: string | null;
  camel_case: string | null;
  pascal_case: string | null;
}

/** The five case renderings, in the order the room prints them. */
export function compoundCases(row: CompoundCases): string[] {
  return present([
    row.snake_case,
    row.screaming_case,
    row.kebab_case,
    row.camel_case,
    row.pascal_case,
  ]);
}

/** The badges a molecule row carries, the null ones dropped. */
export function moleculeBadges(row: MoleculeDetail): string[] {
  return present([
    row.molecule_type,
    row.naming_convention,
    row.domain,
    row.functional_group,
    row.bond_type,
  ]);
}

/** The badges an organism row carries, the null ones dropped. */
export function organismBadges(row: OrganismDetail): string[] {
  return present([
    row.organism_type,
    row.domain,
    row.habitat,
    row.lifecycle,
    row.acronym,
  ]);
}

/** The first face the bonded atoms carry, or null when none carries one. */
export function compoundFace(atoms: readonly CompoundAtom[]): string | null {
  for (const atom of atoms) {
    if (atom.emoji) return atom.emoji;
  }
  return null;
}

export interface ChainLink {
  key: string;
  face: string | null;
  name: string;
  role: string | null;
  bondType: string | null;
  strength: number | null;
  address: string;
}

/** The bonded atoms as chain links, in the order the bonds hold them. */
export function atomLinks(atoms: readonly CompoundAtom[]): ChainLink[] {
  return atoms.map((atom) => ({
    key: atom.key,
    face: atom.emoji,
    name: atom.word,
    role: atom.role,
    bondType: atom.bondType,
    strength: atom.bondStrength,
    address: atom.address,
  }));
}

/** The held molecules as chain links, in the order the bonds hold them. */
export function moleculeLinks(molecules: readonly CompoundMolecule[]): ChainLink[] {
  return molecules.map((molecule) => ({
    key: molecule.key,
    face: null,
    name: molecule.name,
    role: molecule.role,
    bondType: molecule.bondType,
    strength: null,
    address: molecule.address,
  }));
}

/** Names of one tier as chain links, each a door. */
export function nameLinks(names: readonly string[], tier: GrammarTier): ChainLink[] {
  return names.map((name) => ({
    key: name,
    face: null,
    name,
    role: null,
    bondType: null,
    strength: null,
    address: tierAddress(tier, name),
  }));
}

/** The line under a chain link: its role, its bond type and its strength, the null ones dropped. */
export function chainLinkLine(link: ChainLink): string | null {
  const strength = link.strength === null ? null : `${STRENGTH_LABEL} ${link.strength}`;
  const carried = present([link.role, link.bondType, strength]);
  return carried.length > 0 ? carried.join(' · ') : null;
}

// ── the category's room, wired ─────────────────────────────────────────────

export const CATEGORY_PILL = 'The Grammar · a face';
export const CATEGORY_SOURCE = 'categories · atom_dressed';
export const CATEGORY_CRUMB = 'grammar · category · read live through the anon door';
export const NO_CATEGORY_DESCRIPTION = 'no description recorded';

/** The room one category's face opens. */
export function categoryRoomAddress(name: string): string {
  return `/grammar/categories/${encodeURIComponent(name)}`;
}

/** The line above the results that opens the chosen face's own room. */
export function categoryRoomLine(row: CategoryFace): string {
  return row.icon_emoji
    ? `open ${row.icon_emoji} ${row.name}'s room`
    : `open ${row.name}'s room`;
}

/** The count of the atoms wearing this face, or the sentence for a face nobody wears. */
export function categoryCountLine(total: number): string {
  if (total === 0) return NO_FACE_WORN;
  const noun = total === 1 ? 'atom wears' : 'atoms wear';
  return `${total.toLocaleString('en')} ${noun} this face · ${COUNTED_FROM_ROWS}`;
}

/** A category's atoms as the one tier group its room shows. */
export function categoryTier(whole: CategoryWhole): TierResult {
  return {
    tier: 'atoms',
    heading: TIER_HEADINGS.atoms,
    total: whole.total,
    cards: whole.cards,
    empty: NO_FACE_WORN,
    fault: null,
  };
}

// ── the lattice's rooms, wired ─────────────────────────────────────────────

export const LATTICE_TITLE = 'Not a hierarchy';
export const LATTICE_SENTENCE =
  '“i see the system as a omnidimensional lattice” … “not a hierarchy”';
export const LATTICE_SENTENCE_ADDRESS =
  'KP · resonance-grammar/docs/sql/006-the-lattice.sql:8';
export const LATTICE_SOURCE = 'schemes · scheme_memberships · concept_relations';

/** The lattice room's description, the scheme count carried when the schemes were read. */
export function latticeDescription(total: number | null): string {
  const named = total === null ? 'The schemes' : `The ${total} schemes`;
  return `${named} of the Grammar, shelved by kind, each with its counted members and edges`;
}
export const SCHEME_CRUMB = 'grammar · scheme · read live through the anon door';
export const BACK_TO_LATTICE = 'The lattice';
export const MEMBERS_HEADING = 'The members';
export const MEMBERS_SOURCE = 'scheme_memberships';
export const EDGES_HEADING = 'The edges';
export const EDGES_SOURCE = 'concept_relations';
export const NO_SCHEME_DESCRIPTION = 'no description recorded';
export const PARENT_LABEL = 'under';
export const CHILDREN_LABEL = 'holds';
export const EDGE_SIDE_UNNAMED = 'a concept the base does not name';

/** The room one scheme opens. */
export function schemeAddress(name: string): string {
  return `/grammar/schemes/${encodeURIComponent(name)}`;
}

export interface SchemeCard {
  name: string;
  kind: string;
  description: string | null;
  /** Null when the tallies were not read. */
  members: number | null;
  edges: number | null;
  address: string;
}

export interface SchemeKindShelf {
  kind: string;
  cards: SchemeCard[];
}

/** The schemes shelved by kind as cards, each carrying its counted tally. */
export function shelveSchemeCards(
  rows: readonly SchemeChip[],
  tallies: SchemeTallies | null
): SchemeKindShelf[] {
  return shelveSchemes(rows).map((shelf) => ({
    kind: shelf.kind,
    cards: shelf.chips.map((chip) => {
      const tally = tallies ? (tallies[chip.name] ?? null) : null;
      return {
        name: chip.name,
        kind: chip.scheme_type,
        description: chip.description,
        members: tally ? tally.members : null,
        edges: tally ? tally.edges : null,
        address: schemeAddress(chip.name),
      };
    }),
  }));
}

/** The count line one shelf prints in its header. */
export function shelfLine(shelf: SchemeKindShelf): string {
  const held = shelf.cards.length;
  return `${held} ${held === 1 ? 'scheme' : 'schemes'} · ${COUNTED_FROM_ROWS}`;
}

/** The tally line one scheme card prints, or the sentence for a tally unread. */
export function schemeCardLine(card: SchemeCard): string {
  if (card.members === null || card.edges === null) return REGISTER_UNREAD;
  const members = `${card.members} ${card.members === 1 ? 'member' : 'members'}`;
  const edges = `${card.edges} ${card.edges === 1 ? 'edge' : 'edges'}`;
  return `${members} · ${edges} · ${COUNTED_FROM_ROWS}`;
}

/** The typed arrow drawn between two ends of an edge. */
export function edgeArrow(relationType: string): string {
  return `—${relationType}→`;
}

/** The word one end of an edge is read by. */
export function edgeSideWord(side: EdgeSide | null): string {
  return side?.name ?? EDGE_SIDE_UNNAMED;
}

/** One edge as its whole sentence: subject, typed arrow, object. */
export function edgeSentence(edge: SchemeEdge): string {
  return `${edgeSideWord(edge.subject)} ${edgeArrow(edge.relationType)} ${edgeSideWord(edge.object)}`;
}

/** The tables a door tile opens a room of. */
export const TILE_ROOMS: Partial<Record<DoorTable, string>> = {
  categories: '/grammar/explore',
  schemes: '/grammar/schemes',
};

// ── the senses' rooms ──────────────────────────────────────────────────────

export const SENSES_PILL = 'The senses';
export const SENSES_TITLE = 'No emoji has a single meaning';
export const SENSES_SENTENCE =
  '“No emoji has a single meaning. The Grammar preserves ALL definitions… Both are true. Neither overwrites the other.”';
export const SENSES_SENTENCE_ADDRESS = 'resonance-grammar/docs/RESONANCE-GRAMMAR.md:148-153';
export const WALL_HEADING = 'The wall';
export const COLOUR_SHELF_HEADING = 'The colour shelf';
export const COLOUR_SHELF_SOURCE = 'sensory_lexicon.color_hex';
export const SENSE_CRUMB = 'grammar · a mark · read live through the anon door';
export const BACK_TO_SENSES = 'The senses';
export const OTHER_MEANINGS_HEADING = 'The same mark, other meanings';
export const OTHER_MEANINGS_SOURCE = 'thesaurus';
export const SENSE_SOURCE = 'atom_dressed · sensory_lexicon';
export const NO_MARK_WORN = 'no atom wears this mark';
export const NO_COLOUR_CHOSEN = 'no colour chosen yet';
export const NO_OTHER_MEANING = 'no folksonomy dresses this mark yet';

export type SenseRow = Pick<SensoryLexiconRow, 'emoji' | 'color_hex'>;

export interface SenseMark {
  emoji: string;
  count: number;
  address: string;
}

export interface ColourChoice {
  hex: string;
  count: number;
}

export interface SensesWall {
  marks: SenseMark[];
  colours: ColourChoice[];
  /** How many lexicon rows were read. */
  rowsRead: number;
  withEmoji: number;
  withColour: number;
  /** True when the read ceiling was met before the rows ran out. */
  truncated: boolean;
}

/** The room one mark opens. */
export function senseAddress(emoji: string): string {
  return `/grammar/senses/${encodeURIComponent(emoji)}`;
}

/** Every distinct mark with the atoms wearing it, by count then by mark. */
export function markTally(rows: readonly SenseRow[]): SenseMark[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    if (!row.emoji) continue;
    counts.set(row.emoji, (counts.get(row.emoji) ?? 0) + 1);
  }
  return Array.from(counts, ([emoji, count]) => ({
    emoji,
    count,
    address: senseAddress(emoji),
  })).sort((one, other) =>
    other.count !== one.count ? other.count - one.count : one.emoji.localeCompare(other.emoji, 'en')
  );
}

/** Every distinct colour with the atoms carrying it, by count then by hex. */
export function colourTally(rows: readonly SenseRow[]): ColourChoice[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    if (!row.color_hex) continue;
    counts.set(row.color_hex, (counts.get(row.color_hex) ?? 0) + 1);
  }
  return Array.from(counts, ([hex, count]) => ({ hex, count })).sort((one, other) =>
    other.count !== one.count ? other.count - one.count : one.hex.localeCompare(other.hex, 'en')
  );
}

/** The wall and the shelf built from the lexicon rows, every number counted here. */
export function sensesWall(rows: readonly SenseRow[], truncated: boolean): SensesWall {
  return {
    marks: markTally(rows),
    colours: colourTally(rows),
    rowsRead: rows.length,
    withEmoji: rows.filter((row) => Boolean(row.emoji)).length,
    withColour: rows.filter((row) => Boolean(row.color_hex)).length,
    truncated,
  };
}

/** The wall's count line: the marks, and the atoms that wear one. */
export function wallLine(wall: SensesWall): string {
  const marks = `${wall.marks.length.toLocaleString('en')} ${wall.marks.length === 1 ? 'mark' : 'marks'}`;
  const worn = `${wall.withEmoji.toLocaleString('en')} of ${wall.rowsRead.toLocaleString('en')} atoms wear one`;
  return `${marks} · ${worn} · ${COUNTED_FROM_ROWS}`;
}

/** The shelf's count line: the colours chosen, out of the rows read. */
export function colourShelfLine(wall: SensesWall): string {
  if (wall.withColour === 0) return NO_COLOUR_CHOSEN;
  const chosen = `${wall.colours.length.toLocaleString('en')} ${wall.colours.length === 1 ? 'colour' : 'colours'}`;
  const carried = `${wall.withColour.toLocaleString('en')} of ${wall.rowsRead.toLocaleString('en')} atoms carry one`;
  return `${chosen} · ${carried} · ${COUNTED_FROM_ROWS}`;
}

/** The line one colour swatch prints beside its hex. */
export function colourLine(colour: ColourChoice): string {
  return `${colour.count.toLocaleString('en')} ${colour.count === 1 ? 'atom' : 'atoms'}`;
}

/** The count line one mark's room prints, or the sentence for a mark nobody wears. */
export function markCountLine(total: number): string {
  if (total === 0) return NO_MARK_WORN;
  const noun = total === 1 ? 'atom wears' : 'atoms wear';
  return `${total.toLocaleString('en')} ${noun} this mark · ${COUNTED_FROM_ROWS}`;
}

export type ThesaurusEntry = Pick<
  ThesaurusRow,
  'word' | 'emoji' | 'definition' | 'color_hex' | 'folksonomy_type' | 'notes'
>;

export interface SenseMeaning {
  key: string;
  word: string;
  folksonomy: string;
  definition: string | null;
  colour: string | null;
  address: string;
}

export interface SenseWhole {
  emoji: string;
  cards: DressedCard[];
  /** The base's own count of the atoms wearing this mark. */
  total: number;
  meanings: SenseMeaning[];
}

/** A mark's atoms as the one tier group its room shows. */
export function senseTier(whole: SenseWhole): TierResult {
  return {
    tier: 'atoms',
    heading: TIER_HEADINGS.atoms,
    total: whole.total,
    cards: whole.cards,
    empty: NO_MARK_WORN,
    fault: null,
  };
}

// ── the folksonomies' rooms ────────────────────────────────────────────────

export const FOLKSONOMIES_PILL = 'The folksonomies';
export const FOLKSONOMIES_TITLE = 'The heart beside the hearth';
export const FOLKSONOMY_SENTENCE =
  'A folksonomy is “the category umbrella a collective understanding exists that might not be mainstream language”; it “can be more than emojis, it can be any sensory_lexicon, or atom”; and the apps are “satellite ‘starter’ folksonomies, to demostrate the concept in action that we are encouraging” — KP’s words, spelling kept.';
export const FOLKSONOMY_SENTENCE_ADDRESS = 'KP · 2026-09-09';
export const FOLKSONOMIES_SOURCE = 'folksonomies · thesaurus';
export const FOLKSONOMY_SOURCE = 'thesaurus · atom_dressed';
export const FOLKSONOMY_CRUMB = 'grammar · a folksonomy · read live through the anon door';
export const BACK_TO_FOLKSONOMIES = 'The folksonomies';
export const FOLKSONOMY_DRESSINGS_HEADING = 'The dressings';
export const STARTER_MARK = 'a starter folksonomy';
export const STARTER_STATUS = 'complete';
export const NO_FOLKSONOMY_DRESSING = 'no dressing in this folksonomy yet';
export const NO_HEARTH_WORD = 'no hearth atom carries this word';
export const NO_FOLKSONOMY = 'no folksonomy stands in the register yet';
export const NO_FOLKSONOMY_PURPOSE = 'no purpose recorded';
export const NOTES_LABEL = 'notes';
export const KEPT_BY_LABEL = 'kept by';

export type FolksonomyFace = Pick<
  FolksonomyRow,
  'name' | 'purpose' | 'status' | 'notes' | 'created_by'
>;

export interface FolksonomyKeyRow {
  folksonomy_type: string | null;
}

export interface FolksonomyCard {
  name: string;
  purpose: string | null;
  status: string;
  dressings: number;
  starter: boolean;
  address: string;
}

/** The room one folksonomy opens. */
export function folksonomyAddress(name: string): string {
  return `/grammar/folksonomies/${encodeURIComponent(name)}`;
}

/** The dressings counted per folksonomy, a row naming none dropped. */
export function tallyByFolksonomy(rows: readonly FolksonomyKeyRow[]): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const row of rows) {
    if (!row.folksonomy_type) continue;
    tally[row.folksonomy_type] = (tally[row.folksonomy_type] ?? 0) + 1;
  }
  return tally;
}

/** True for a folksonomy the register holds complete, the starters. */
export function isStarter(row: FolksonomyFace): boolean {
  return row.status.trim().toLowerCase() === STARTER_STATUS;
}

/** Every folksonomy as a card, its dressings counted from rows. */
export function folksonomyCards(
  rows: readonly FolksonomyFace[],
  tally: Readonly<Record<string, number>>
): FolksonomyCard[] {
  return rows.map((row) => ({
    name: row.name,
    purpose: row.purpose,
    status: row.status,
    dressings: tally[row.name] ?? 0,
    starter: isStarter(row),
    address: folksonomyAddress(row.name),
  }));
}

/** The dressing count line, or the sentence for a folksonomy holding none. */
export function dressingCountLine(count: number): string {
  if (count === 0) return NO_FOLKSONOMY_DRESSING;
  const noun = count === 1 ? 'dressing' : 'dressings';
  return `${count.toLocaleString('en')} ${noun} · ${COUNTED_FROM_ROWS}`;
}

export interface HearthBeside {
  word: string;
  face: string | null;
  faceFromCategory: boolean;
  definition: string | null;
  categoryName: string | null;
  address: string;
}

export interface DressingBeside {
  key: string;
  word: string;
  emoji: string | null;
  colour: string | null;
  definition: string | null;
  /** Null when the hearth carries no atom of this word. */
  hearth: HearthBeside | null;
}

export interface FolksonomyWhole {
  row: FolksonomyFace;
  dressings: DressingBeside[];
}

/** Each word a thesaurus read names, and its lower-case form, for one lookup. */
export function hearthWords(entries: readonly ThesaurusEntry[]): string[] {
  const wanted = new Set<string>();
  for (const entry of entries) {
    const word = entry.word.trim();
    if (!word) continue;
    wanted.add(word);
    wanted.add(word.toLowerCase());
  }
  return Array.from(wanted);
}

/** The hearth rows keyed by their word, case-blind. */
export function hearthByWord(rows: readonly AtomSearchRow[]): Record<string, AtomSearchRow> {
  const held: Record<string, AtomSearchRow> = {};
  for (const row of rows) {
    if (!row.atom_word) continue;
    held[row.atom_word.toLowerCase()] = row;
  }
  return held;
}

/** One hearth atom read as the row shown beside a dressing. */
export function hearthBeside(row: AtomSearchRow): HearthBeside | null {
  const word = row.atom_word;
  if (!word) return null;
  const face = atomFace(row);
  return {
    word,
    face: face.glyph,
    faceFromCategory: face.fromCategory,
    definition: row.definition,
    categoryName: row.category_name,
    address: tierAddress('atoms', word),
  };
}

/** Every dressing beside the hearth atom it dresses, matched by word, case-blind. */
export function dressingsBeside(
  entries: readonly ThesaurusEntry[],
  rows: readonly AtomSearchRow[]
): DressingBeside[] {
  const hearth = hearthByWord(rows);
  return entries
    .map((entry) => {
      const found = hearth[entry.word.trim().toLowerCase()] ?? null;
      return {
        key: `${entry.folksonomy_type} · ${entry.word}`,
        word: entry.word,
        emoji: entry.emoji,
        colour: entry.color_hex,
        definition: entry.definition,
        hearth: found ? hearthBeside(found) : null,
      };
    })
    .sort((one, other) => one.word.localeCompare(other.word, 'en'));
}

/** The meanings a mark carries across the folksonomies, each a door to its room. */
export function senseMeanings(entries: readonly ThesaurusEntry[]): SenseMeaning[] {
  return entries
    .map((entry) => ({
      key: `${entry.folksonomy_type} · ${entry.word}`,
      word: entry.word,
      folksonomy: entry.folksonomy_type,
      definition: entry.definition,
      colour: entry.color_hex,
      address: folksonomyAddress(entry.folksonomy_type),
    }))
    .sort((one, other) =>
      one.folksonomy !== other.folksonomy
        ? one.folksonomy.localeCompare(other.folksonomy, 'en')
        : one.word.localeCompare(other.word, 'en')
    );
}

// ── the senses' and the folksonomies' columns ──────────────────────────────

export const SENSE_ROW_COLUMNS = ['emoji', 'color_hex'].join(', ');

export const FOLKSONOMY_COLUMNS = ['name', 'purpose', 'status', 'notes', 'created_by'].join(', ');

export const THESAURUS_COLUMNS = [
  'word',
  'emoji',
  'definition',
  'color_hex',
  'folksonomy_type',
  'notes',
].join(', ');

export const FOLKSONOMY_KEY_COLUMNS = 'folksonomy_type';

/** The lexicon read's ceiling, one row per atom. */
export const SENSES_READ_LIMIT = 3000;

/** The rows one lexicon read carries back, the door's own page. */
export const SENSES_PAGE = 1000;

/** The mark room's ceiling: every atom is counted, this many are carried back. */
export const SENSE_ATOM_LIMIT = 200;

/** The thesaurus read's ceiling, one row per dressing. */
export const THESAURUS_READ_LIMIT = 500;
