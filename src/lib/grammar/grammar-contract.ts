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
export type SchemeChip = Pick<SchemeRow, 'name' | 'scheme_type' | 'sort_order'>;

export const FACES_HEADING = 'The faces';
export const FACES_META = 'each a filter';
export const LATTICE_HEADING = 'The lattice';
export const LATTICE_META = 'not a hierarchy';
export const NO_CATEGORY = 'no category stands in the register yet';
export const NO_SCHEME = 'no scheme stands in the lattice yet';

/** The four kinds of scheme, in the order the lattice shelves them. */
export const SCHEME_SHELVES: readonly string[] = ['rank', 'axis', 'facet', 'dimension'];

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
  { title: 'Senses', line: NOT_YET_WIRED, href: null },
  { title: 'Folksonomies', line: NOT_YET_WIRED, href: null },
  { title: 'Carry', line: NOT_YET_WIRED, href: null },
];

/** The house words a Grammar room footnotes, each told once on /about. */
export const GRAMMAR_HOUSE_WORDS: readonly string[] = [
  'the hearth',
  'the heart',
  'a folksonomy',
  'a seed',
];

export const ATOM_HOUSE_WORDS: readonly string[] = ['the hearth', 'the heart', 'a folksonomy'];

export const HOUSE_WORDS_TAIL = 'house words, each told once on /about';

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

export const SCHEME_COLUMNS = ['name', 'scheme_type', 'sort_order'].join(', ');

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

export const MOLECULE_BOND_COLUMNS = 'molecules(name)';
export const ORGANISM_BOND_COLUMNS = 'organisms(name)';
export const MEMBERSHIP_COLUMNS = 'is_primary, schemes(name, scheme_type)';
export const RELATION_COLUMNS = 'relation_type, subject_atom_id, object_atom_id';

/** The bond read's ceiling: every name is counted, this many are carried back. */
export const BOND_READ_LIMIT = 200;
