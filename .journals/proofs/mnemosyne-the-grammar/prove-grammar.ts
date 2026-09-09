// .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts
// Proves the Grammar's search grouping, the honest empties, the face fallback,
// the dressings kept beside the hearth, the bond truncation and the fault shape
// against fixtures, with no network and no base.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ATOM_CRUMB,
  ATOM_SEARCH_COLUMNS,
  DOOR_LABELS,
  DOOR_TABLES,
  DOOR_UNNAMED,
  LINE_TABLES,
  MOLECULE_CHIP_LIMIT,
  NOT_IN_A_SCHEME,
  NOT_YET_SENSED,
  NO_DRESSING,
  NO_FACE_WORN,
  NO_COMPOUND_DRESSING,
  NO_MEMBER_YET,
  NO_SCHEME_EDGE,
  NO_TYPED_EDGES,
  ORGANISM_CHIP_LIMIT,
  QUERY_MAX,
  REGISTER_UNREAD,
  SCHEME_SHELVES,
  TIERS,
  TIER_EMPTIES,
  TIER_HEADINGS,
  TIER_LIMIT,
  TILE_TABLES,
  WEARING_CATEGORY_FACE,
  atomCard,
  atomCases,
  atomFace,
  atomLinks,
  baseFault,
  bondChips,
  bondLine,
  boundQuery,
  categoryCountLine,
  categoryRoomAddress,
  categoryTier,
  chainLinkLine,
  compoundAtoms,
  compoundCases,
  compoundFace,
  compoundMolecules,
  doorUnnamedFault,
  edgeArrow,
  edgeSentence,
  edgeSideWord,
  emojiByAtom,
  ilikePattern,
  latticeEdges,
  measuresBadge,
  membershipViews,
  moleculeBadges,
  moleculeCard,
  moleculeLinks,
  overrideLines,
  moreLine,
  nameLinks,
  organismBadges,
  organismCard,
  schemeAddress,
  schemeCardLine,
  schemeMembers,
  schemeTallies,
  senseChannels,
  shelfLine,
  shelveSchemeCards,
  shelveSchemes,
  splitDressings,
  tallyByScheme,
  tallyLine,
  tierAddress,
  tierCrumb,
  tierMeta,
  type AtomDressing,
  type AtomSearchRow,
  type AtomWhole,
  type CompoundAtomRow,
  type CompoundMoleculeRow,
  type GrammarTier,
  type MembershipJoinRow,
  type MoleculeDetail,
  type MoleculeSearchRow,
  type OrganismDetail,
  type OrganismSearchRow,
  type RelationJoinRow,
  type SchemeChip,
  type SchemeEdge,
  type SchemeKeyRow,
  type SchemeMemberRow,
  type SearchResults,
  type TierResult,
} from '../../../src/lib/grammar/grammar-contract';

interface Check {
  set: string;
  check: string;
  result: string;
  pass: boolean;
}

const checks: Check[] = [];

function record(set: string, check: string, pass: boolean, result: string) {
  checks.push({ set, check, result, pass });
}

// ── the fixtures ───────────────────────────────────────────────────────────

const RESONANCE_ID = '11111111-1111-1111-1111-111111111111';

function atomRow(over: Partial<AtomSearchRow> = {}): AtomSearchRow {
  return {
    atom_id: RESONANCE_ID,
    atom_word: 'resonance',
    definition: "The alignment of one thing's frequency with another.",
    category_face: '👁️',
    category_name: 'consciousness',
    emoji: '♒︎',
    atom_type: 'root',
    ...over,
  };
}

const MOLECULES: MoleculeSearchRow[] = [
  {
    name: 'beam-resonance',
    definition: null,
    molecule_type: 'concept',
    naming_convention: 'kebab-case',
    atom_words: 'beam resonance',
    kebab_case: 'beam-resonance',
  },
  {
    name: 'calculateResonance',
    definition: null,
    molecule_type: 'function_name',
    naming_convention: 'camelCase',
    atom_words: 'calculate resonance',
    kebab_case: 'calculate-resonance',
  },
  {
    name: 'createResonance',
    definition: null,
    molecule_type: 'function_name',
    naming_convention: 'camelCase',
    atom_words: null,
    kebab_case: 'create-resonance',
  },
];

const ORGANISMS: OrganismSearchRow[] = [
  {
    name: 'calculateBeamResonance',
    definition: null,
    organism_type: 'function',
    domain: 'typescript',
    kebab_case: 'calculate-beam-resonance',
  },
];

const WHOLE: AtomWhole = {
  affinity: 5,
  atom_id: RESONANCE_ID,
  atom_type: 'root',
  atom_word: 'resonance',
  category_face: '👁️',
  category_name: 'consciousness',
  definition: "The alignment of one thing's frequency with another.",
  etymology_progress: 100,
  historical_meaning: 'Latin resonantia (echo), from resonare.',
  pascal_case: 'Resonance',
  root_language: 'Latin',
  root_word: 'resonantia',
  sanctuary_meaning: "The house's own first word.",
  screaming_case: 'RESONANCE',
  sensory_color: '#00CED1',
  sensory_emoji: '♒︎',
  sensory_movement: 'exchanging',
  sensory_shape: 'speech-bubble',
  sensory_smell: null,
  sensory_sound: 'Two voices in harmony',
  sensory_taste: null,
  sensory_temperature: 'warm',
  sensory_texture: 'flowing-air',
  snake_case: 'resonance',
  state: 'static',
  valence: 1,
  weight: 5,
};

const DRESSED: AtomDressing[] = [
  {
    atom_id: RESONANCE_ID,
    atom_word: 'sad',
    definition: 'the hearth definition, held for everyone',
    emoji: '😢',
    color_hex: null,
    folksonomy_type: null,
    is_override: false,
  },
  {
    atom_id: RESONANCE_ID,
    atom_word: 'sad',
    definition: 'what Echoes means by it',
    emoji: '🌧️',
    color_hex: '#4682B4',
    folksonomy_type: 'Echoes',
    is_override: true,
  },
  {
    atom_id: RESONANCE_ID,
    atom_word: 'sad',
    definition: 'what Compass means by it',
    emoji: '🧭',
    color_hex: null,
    folksonomy_type: 'Compass',
    is_override: true,
  },
];

const MOLECULE_NAMES = [
  'entity-resonance',
  'EmotionalResonance',
  'deleteResonance',
  'createResonance',
  'control-resonance',
  'calculateResonance',
  'button-resonance',
  'beam-resonance',
  'field-resonance',
];

const ORGANISM_NAMES = [
  'calculateResonanceScore',
  'calculateButtonResonance',
  'calculateBeamResonance',
  'renderResonanceBeam',
  'seedResonanceLattice',
];

const BEAM_ID = '22222222-2222-2222-2222-222222222222';
const BEAM_RESONANCE_ID = '33333333-3333-3333-3333-333333333333';
const CALCULATE_BEAM_RESONANCE_ID = '44444444-4444-4444-4444-444444444444';

const MOLECULE: MoleculeDetail = {
  atom_words: 'beam resonance',
  bond_type: 'covalent',
  camel_case: 'beamResonance',
  definition: 'the beam a resonance is carried on',
  domain: 'ui',
  functional_group: null,
  id: BEAM_RESONANCE_ID,
  kebab_case: 'beam-resonance',
  molecule_type: 'concept',
  name: 'beam-resonance',
  naming_convention: 'kebab-case',
  pascal_case: 'BeamResonance',
  screaming_case: 'BEAM_RESONANCE',
  snake_case: 'beam_resonance',
  total_weight: 9,
};

const ORGANISM: OrganismDetail = {
  acronym: null,
  camel_case: 'calculateBeamResonance',
  definition: null,
  domain: 'typescript',
  habitat: null,
  id: CALCULATE_BEAM_RESONANCE_ID,
  kebab_case: 'calculate-beam-resonance',
  lifecycle: 'stable',
  name: 'calculateBeamResonance',
  organism_type: 'function',
  pascal_case: 'CalculateBeamResonance',
  screaming_case: 'CALCULATE_BEAM_RESONANCE',
  snake_case: 'calculate_beam_resonance',
};

const BOND_ROWS: CompoundAtomRow[] = [
  {
    position: 2,
    role: 'core_type',
    bond_type: 'covalent',
    bond_strength: 8,
    atom_id: RESONANCE_ID,
    atoms: { atom_word: 'resonance', category_name: 'consciousness' },
  },
  {
    position: 1,
    role: 'modifier',
    bond_type: 'covalent',
    bond_strength: 5,
    atom_id: BEAM_ID,
    atoms: { atom_word: 'beam', category_name: 'light' },
  },
];

const HELD_ROWS: CompoundMoleculeRow[] = [
  { position: 2, role: null, bond_type: 'covalent', molecules: { name: 'beam-resonance' } },
  { position: 1, role: 'action', bond_type: 'covalent', molecules: { name: 'calculateResonance' } },
  { position: 3, role: null, bond_type: 'ionic', molecules: null },
];

const FACES = emojiByAtom([
  { atom_id: BEAM_ID, emoji: null },
  { atom_id: RESONANCE_ID, emoji: '♒︎' },
]);

const CHAIN = atomLinks(compoundAtoms(BOND_ROWS, FACES));
const HELD = moleculeLinks(compoundMolecules(HELD_ROWS));

const SCHEMES: SchemeChip[] = [
  { name: 'Species', scheme_type: 'rank', sort_order: 8, description: 'the finest rank' },
  { name: 'Domain', scheme_type: 'rank', sort_order: 1, description: null },
  { name: 'Being', scheme_type: 'axis', sort_order: 2, description: 'what a thing is' },
  { name: 'Layout', scheme_type: 'facet', sort_order: 10, description: null },
  { name: 'form', scheme_type: 'dimension', sort_order: 5, description: null },
  { name: 'Weave', scheme_type: 'kindred', sort_order: 1, description: null },
];

function tier(
  name: GrammarTier,
  total: number | null,
  cards: TierResult['cards'],
  fault: TierResult['fault'] = null
): TierResult {
  return { tier: name, heading: TIER_HEADINGS[name], total, cards, empty: TIER_EMPTIES[name], fault };
}

function main() {
  // ── the search grouping ──────────────────────────────────────────────────

  const results: SearchResults = {
    q: 'reson',
    category: null,
    tiers: [
      tier('atoms', 1, [atomCard(atomRow())]),
      tier('molecules', 61, MOLECULES.map(moleculeCard)),
      tier('organisms', 17, ORGANISMS.map(organismCard)),
    ],
  };

  record(
    'grouping',
    'three tiers, in order',
    results.tiers.map((one) => one.tier).join(' · ') === TIERS.join(' · '),
    results.tiers.map((one) => one.tier).join(' · ')
  );
  record(
    'grouping',
    'every card lands in its own tier',
    results.tiers.every((one) => one.cards.every((card) => card.tier === one.tier)),
    results.tiers.map((one) => `${one.tier} ${one.cards.length}`).join(' · ')
  );
  record(
    'grouping',
    'a tier of one counts in the singular',
    tierMeta(results.tiers[0]) === '1 atom',
    tierMeta(results.tiers[0])
  );
  record(
    'grouping',
    'a tier holding back rows says how many are shown',
    tierMeta(results.tiers[1]) === '61 molecules · 3 shown',
    tierMeta(results.tiers[1])
  );
  record(
    'grouping',
    'the tally sums every tier that answered',
    tallyLine(results) === '79 answers · counted from rows',
    tallyLine(results)
  );
  record(
    'grouping',
    'a card opens its own room',
    results.tiers[0].cards[0].address === '/grammar/atoms/resonance' &&
      results.tiers[1].cards[0].address === '/grammar/molecules/beam-resonance',
    `${results.tiers[0].cards[0].address} · ${results.tiers[1].cards[0].address}`
  );
  record(
    'grouping',
    'a word with a space is escaped into its address',
    tierAddress('molecules', 'a name') === '/grammar/molecules/a%20name',
    tierAddress('molecules', 'a name')
  );
  record(
    'grouping',
    'the tier ceiling is the read limit',
    TIER_LIMIT === 24,
    String(TIER_LIMIT)
  );

  // ── the honest empties ───────────────────────────────────────────────────

  const none: SearchResults = {
    q: 'zzzz',
    category: null,
    tiers: [tier('atoms', 0, []), tier('molecules', 0, []), tier('organisms', 0, [])],
  };
  record(
    'empties',
    'each tier carries its own sentence',
    none.tiers.map((one) => one.empty).join(' · ') ===
      'no atom answers this search · no molecule answers this search · no organism answers this search',
    none.tiers.map((one) => one.empty).join(' · ')
  );
  record(
    'empties',
    'three tiers of none still counts zero, never nothing',
    tallyLine(none) === '0 answers · counted from rows',
    tallyLine(none)
  );
  record(
    'empties',
    'an unread tier says unreadable, never empty',
    tierMeta(tier('atoms', null, [], baseFault('atom_dressed', 'permission denied'))) ===
      REGISTER_UNREAD,
    tierMeta(tier('atoms', null, [], baseFault('atom_dressed', 'permission denied')))
  );
  record(
    'empties',
    'a tally over no readable tier says unreadable',
    tallyLine({ q: 'reson', category: null, tiers: [tier('atoms', null, [])] }) === REGISTER_UNREAD,
    tallyLine({ q: 'reson', category: null, tiers: [tier('atoms', null, [])] })
  );

  const senses = senseChannels(WHOLE);
  const unsensed = senses.filter((channel) => channel.value === null).map((channel) => channel.label);
  record(
    'empties',
    'every sensory channel is shown, a null one waiting',
    senses.length === 9 && unsensed.join(' · ') === 'taste · smell',
    `${senses.length} channels · ${unsensed.join(' · ')} ${NOT_YET_SENSED}`
  );
  record(
    'empties',
    'the colour channel carries its own swatch',
    senses.find((channel) => channel.label === 'colour')?.swatch === '#00CED1',
    String(senses.find((channel) => channel.label === 'colour')?.swatch)
  );
  record(
    'empties',
    'an atom in no scheme and on no edge says so',
    membershipViews([]).length === 0 && latticeEdges([], RESONANCE_ID).length === 0,
    `${NOT_IN_A_SCHEME} · ${NO_TYPED_EDGES}`
  );
  record(
    'empties',
    'an atom bonded into nothing says so',
    bondLine(0, 'molecules') === 'in no molecule yet' &&
      bondLine(0, 'organisms') === 'in no organism yet',
    `${bondLine(0, 'molecules')} · ${bondLine(0, 'organisms')}`
  );
  record(
    'empties',
    'a bond count of one reads in the singular',
    bondLine(1, 'molecules') === 'in 1 molecule',
    bondLine(1, 'molecules')
  );

  // ── the face ─────────────────────────────────────────────────────────────

  const own = atomFace(atomRow());
  record('face', "an atom wears its own sense's emoji", own.glyph === '♒︎' && !own.fromCategory, own.glyph ?? 'null');

  const borrowed = atomFace(atomRow({ emoji: null }));
  record(
    'face',
    "an atom with no sense wears its category's face, marked",
    borrowed.glyph === '👁️' && borrowed.fromCategory,
    `${borrowed.glyph} · ${WEARING_CATEGORY_FACE}`
  );

  const bare = atomFace(atomRow({ emoji: null, category_face: null }));
  record(
    'face',
    'an atom with neither invents no face',
    bare.glyph === null && !bare.fromCategory,
    'null'
  );
  record(
    'face',
    'the whole view answers the same face reading',
    atomFace(WHOLE).glyph === '♒︎',
    String(atomFace(WHOLE).glyph)
  );
  record(
    'face',
    'a card carries the borrow forward',
    atomCard(atomRow({ emoji: null })).faceFromCategory,
    WEARING_CATEGORY_FACE
  );

  // ── the dressings ────────────────────────────────────────────────────────

  const split = splitDressings(DRESSED);
  record(
    'dressings',
    'the hearth row is the one row that overrides nothing',
    split.hearth?.folksonomy_type === null && split.hearth?.is_override === false,
    String(split.hearth?.definition)
  );
  record(
    'dressings',
    'the hearth row never appears among the dressings',
    split.dressings.every((one) => one.definition !== split.hearth?.definition),
    `${split.dressings.length} dressings`
  );
  record(
    'dressings',
    'every folksonomy with an opinion is kept, labelled by name',
    split.dressings.map((one) => one.folksonomy).join(' · ') === 'Compass · Echoes',
    split.dressings.map((one) => `${one.folksonomy} ${one.emoji}`).join(' · ')
  );
  record(
    'dressings',
    'a dressing keeps its own colour and its own definition',
    split.dressings[1].colour === '#4682B4' &&
      split.dressings[1].definition === 'what Echoes means by it',
    `${split.dressings[1].folksonomy} · ${split.dressings[1].colour}`
  );

  const noDressing = splitDressings([DRESSED[0]]);
  record(
    'dressings',
    'a word no folksonomy dresses says so',
    noDressing.dressings.length === 0 && Boolean(noDressing.hearth),
    NO_DRESSING
  );
  record(
    'dressings',
    'a read of overrides alone yields no hearth row',
    splitDressings([DRESSED[1], DRESSED[2]]).hearth === null,
    'null'
  );

  // ── the bonds ────────────────────────────────────────────────────────────

  const molecules = bondChips(MOLECULE_NAMES, MOLECULE_CHIP_LIMIT, 59);
  record(
    'bonds',
    'the first eight molecule names are chipped',
    molecules.chips.length === MOLECULE_CHIP_LIMIT,
    molecules.chips.join(' · ')
  );
  record(
    'bonds',
    'the chips are sorted case-blind',
    molecules.chips[0] === 'beam-resonance' && molecules.chips[6] === 'EmotionalResonance',
    molecules.chips.slice(0, 7).join(' · ')
  );
  record(
    'bonds',
    'the rest are counted from the base, not from the page',
    molecules.more === 51 && moreLine(molecules.more) === 'and 51 more',
    moreLine(molecules.more)
  );

  const organisms = bondChips(ORGANISM_NAMES, ORGANISM_CHIP_LIMIT, 17);
  record(
    'bonds',
    'the first four organism names are chipped',
    organisms.chips.length === ORGANISM_CHIP_LIMIT && organisms.more === 13,
    `${organisms.chips.join(' · ')} · ${moreLine(organisms.more)}`
  );
  record(
    'bonds',
    'a bond row shorter than its limit holds nothing back',
    bondChips(['one', 'two'], MOLECULE_CHIP_LIMIT, 2).more === 0,
    '0'
  );
  record(
    'bonds',
    'the count line reads from the base count',
    bondLine(59, 'molecules') === 'in 59 molecules',
    bondLine(59, 'molecules')
  );

  // ── the lattice ──────────────────────────────────────────────────────────

  const memberships: MembershipJoinRow[] = [
    { is_primary: false, schemes: { name: 'Layout', scheme_type: 'facet' } },
    { is_primary: true, schemes: { name: 'Being', scheme_type: 'axis' } },
    { is_primary: false, schemes: null },
  ];
  const placed = membershipViews(memberships);
  record(
    'lattice',
    'a membership with no scheme row is dropped, never invented',
    placed.length === 2,
    placed.map((one) => one.scheme).join(' · ')
  );
  record(
    'lattice',
    'a membership carries its primacy and its kind',
    placed[0].scheme === 'Being' && placed[0].primary && placed[0].schemeType === 'axis',
    `${placed[0].scheme} · ${placed[0].schemeType} · primary`
  );

  const relations: RelationJoinRow[] = [
    { relation_type: 'broader', subject_atom_id: RESONANCE_ID, object_atom_id: null },
    { relation_type: 'related', subject_atom_id: null, object_atom_id: RESONANCE_ID },
  ];
  const edges = latticeEdges(relations, RESONANCE_ID);
  record(
    'lattice',
    'an edge is named from this atom’s own end',
    edges[0].direction === 'subject' && edges[1].direction === 'object',
    edges.map((edge) => `${edge.relationType} · ${edge.direction}`).join(' · ')
  );

  const shelves = shelveSchemes(SCHEMES);
  record(
    'lattice',
    'the four kinds shelve in order, an unnamed kind after them',
    shelves.map((shelf) => shelf.kind).join(' · ') === `${SCHEME_SHELVES.join(' · ')} · kindred`,
    shelves.map((shelf) => `${shelf.kind} ${shelf.chips.length}`).join(' · ')
  );
  record(
    'lattice',
    'no scheme is lost in the shelving',
    shelves.reduce((sum, shelf) => sum + shelf.chips.length, 0) === SCHEMES.length,
    `${SCHEMES.length} of ${SCHEMES.length}`
  );

  // ── the fault ────────────────────────────────────────────────────────────

  const unnamed = doorUnnamedFault('atoms');
  record(
    'fault',
    'an unnamed door faults in three parts',
    Boolean(unnamed.what && unnamed.why && unnamed.next),
    `${unnamed.what} · ${unnamed.why} · ${unnamed.next}`
  );
  record(
    'fault',
    'an unnamed door says so in its own words',
    unnamed.why.includes(DOOR_UNNAMED),
    DOOR_UNNAMED
  );

  const refused = baseFault('thesaurus', 'permission denied for table thesaurus');
  record(
    'fault',
    "a refusal carries the base's own message and the table",
    refused.why === 'thesaurus · permission denied for table thesaurus' &&
      refused.next === 'a read policy on thesaurus for the anon door',
    `${refused.why} · next · ${refused.next}`
  );
  record(
    'fault',
    'no fault ever reads empty',
    ![unnamed, refused].some((fault) =>
      `${fault.what} ${fault.why} ${fault.next}`.toLowerCase().includes('empty')
    ),
    REGISTER_UNREAD
  );

  // ── the door's counts ────────────────────────────────────────────────────

  record(
    'door',
    'eight tables are counted, six as tiles and two as a line',
    DOOR_TABLES.length === 8 && TILE_TABLES.length === 6 && LINE_TABLES.length === 2,
    `${TILE_TABLES.join(' · ')} + ${LINE_TABLES.join(' · ')}`
  );
  record(
    'door',
    'every counted table carries a label',
    DOOR_TABLES.every((table) => Boolean(DOOR_LABELS[table])),
    DOOR_TABLES.map((table) => DOOR_LABELS[table]).join(' · ')
  );

  // ── the query ────────────────────────────────────────────────────────────

  record('query', 'a blank query is no query', boundQuery('   ') === null, 'null');
  record(
    'query',
    'a query is trimmed and held to its ceiling',
    boundQuery(`  ${'a'.repeat(QUERY_MAX + 20)}  `)?.length === QUERY_MAX,
    String(QUERY_MAX)
  );
  record(
    'query',
    'the operator characters never reach the base',
    ilikePattern('re%so_n,(x)"') === '%resonx%',
    ilikePattern('re%so_n,(x)"')
  );
  record(
    'query',
    'a plain word becomes a plain contains pattern',
    ilikePattern('reson') === '%reson%',
    ilikePattern('reson')
  );

  // ── the columns and the cases ────────────────────────────────────────────

  record(
    'columns',
    'the atom search reads the dressed view by its own columns',
    ATOM_SEARCH_COLUMNS.split(', ').includes('is_override') === false &&
      ATOM_SEARCH_COLUMNS.split(', ').includes('atom_word'),
    ATOM_SEARCH_COLUMNS
  );
  record(
    'cases',
    'the three case renderings print in order',
    atomCases(WHOLE).join(' · ') === 'resonance · RESONANCE · Resonance',
    atomCases(WHOLE).join(' · ')
  );
  record(
    'cases',
    'an atom with no case rendering prints none',
    atomCases({ ...WHOLE, snake_case: null, screaming_case: null, pascal_case: null }).length === 0,
    '0'
  );
  record(
    'cases',
    'the measures badge counts only the measures the row carries',
    measuresBadge(WHOLE) === 'weight 5 · affinity 5 · valence 1' &&
      measuresBadge({ ...WHOLE, weight: null, affinity: null, valence: null }) === null,
    String(measuresBadge(WHOLE))
  );
  record(
    'cards',
    'a molecule card carries its stored parts',
    moleculeCard(MOLECULES[0]).parts.join(' · ') === 'beam · resonance',
    moleculeCard(MOLECULES[0]).parts.join(' · ')
  );
  record(
    'cards',
    'a molecule with no atom_words falls to its kebab rendering',
    moleculeCard(MOLECULES[2]).parts.join(' · ') === 'create · resonance',
    moleculeCard(MOLECULES[2]).parts.join(' · ')
  );
  record(
    'cards',
    'an organism card carries its own parts and badges',
    organismCard(ORGANISMS[0]).parts.join(' · ') === 'calculate · beam · resonance' &&
      organismCard(ORGANISMS[0]).badges.join(' · ') === 'function · typescript',
    organismCard(ORGANISMS[0]).badges.join(' · ')
  );

  // ── the compound's room ─────────────────────────────────────

  record(
    'compound',
    'the five case renderings print in order',
    compoundCases(MOLECULE).join(' · ') ===
      'beam_resonance · BEAM_RESONANCE · beam-resonance · beamResonance · BeamResonance',
    compoundCases(MOLECULE).join(' · ')
  );
  record(
    'compound',
    'a case rendering the row does not carry prints none',
    compoundCases({ ...MOLECULE, camel_case: null, snake_case: null }).join(' · ') ===
      'BEAM_RESONANCE · beam-resonance · BeamResonance',
    compoundCases({ ...MOLECULE, camel_case: null, snake_case: null }).join(' · ')
  );
  record(
    'compound',
    'a molecule badges only what its row carries',
    moleculeBadges(MOLECULE).join(' · ') === 'concept · kebab-case · ui · covalent',
    moleculeBadges(MOLECULE).join(' · ')
  );
  record(
    'compound',
    'a molecule with no domain badges neither it nor its group',
    moleculeBadges({ ...MOLECULE, domain: null }).join(' · ') ===
      'concept · kebab-case · covalent',
    moleculeBadges({ ...MOLECULE, domain: null }).join(' · ')
  );
  record(
    'compound',
    'an organism badges only what its row carries',
    organismBadges(ORGANISM).join(' · ') === 'function · typescript · stable' &&
      organismBadges({ ...ORGANISM, acronym: 'CBR' }).join(' · ') ===
        'function · typescript · stable · CBR',
    organismBadges(ORGANISM).join(' · ')
  );
  record(
    'compound',
    'a sensory override prints one line per key, the null values dropped',
    overrideLines({ emoji: '♒︎', color_hex: '#00CED1', taste: null })
      .map((line) => `${line.label} ${line.value}`)
      .join(' · ') === 'emoji ♒︎ · color_hex #00CED1',
    overrideLines({ emoji: '♒︎', color_hex: '#00CED1', taste: null })
      .map((line) => `${line.label} ${line.value}`)
      .join(' · ')
  );
  record(
    'compound',
    'a compound no dressing overrides says so, and prints no line',
    overrideLines(null).length === 0 && overrideLines('').length === 0,
    NO_COMPOUND_DRESSING
  );
  record(
    'compound',
    'the chain reads in bond order, not in the order the base answered',
    CHAIN.map((link) => link.name).join(' · ') === 'beam · resonance',
    CHAIN.map((link) => link.name).join(' · ')
  );
  record(
    'compound',
    'each link in the chain opens its atom room',
    CHAIN.map((link) => link.address).join(' · ') ===
      '/grammar/atoms/beam · /grammar/atoms/resonance',
    CHAIN.map((link) => link.address).join(' · ')
  );
  record(
    'compound',
    'a link carries the face its atom carries and no other',
    CHAIN.map((link) => link.face).join('|') === '|' + FACES[RESONANCE_ID],
    CHAIN.map((link) => String(link.face)).join('|')
  );
  record(
    'compound',
    'the head wears the first face the chain carries',
    compoundFace(compoundAtoms(BOND_ROWS, FACES)) === FACES[RESONANCE_ID] &&
      compoundFace([]) === null,
    String(compoundFace(compoundAtoms(BOND_ROWS, FACES)))
  );
  record(
    'compound',
    'the line under a link is its role, its bond type and its counted strength',
    chainLinkLine(CHAIN[0]) === 'modifier · covalent · strength 5',
    String(chainLinkLine(CHAIN[0]))
  );
  record(
    'compound',
    'a bond carrying no strength prints none',
    chainLinkLine({ ...CHAIN[0], strength: null }) === 'modifier · covalent',
    String(chainLinkLine({ ...CHAIN[0], strength: null }))
  );
  record(
    'compound',
    'a link with neither role nor bond type prints no line',
    chainLinkLine(nameLinks(['calculateBeamResonance'], 'organisms')[0]) === null,
    'null'
  );
  record(
    'compound',
    'the molecules an organism holds read in the order held, the unnamed dropped',
    HELD.map((link) => link.name).join(' · ') === 'calculateResonance · beam-resonance',
    HELD.map((link) => link.name).join(' · ')
  );
  record(
    'compound',
    'a held molecule carries its role and its bond type, and no face',
    chainLinkLine(HELD[0]) === 'action · covalent' && HELD[0].face === null,
    String(chainLinkLine(HELD[0]))
  );
  record(
    'compound',
    'part of opens the organism room of each name',
    nameLinks(['calculateBeamResonance'], 'organisms')[0].address ===
      '/grammar/organisms/calculateBeamResonance',
    nameLinks(['calculateBeamResonance'], 'organisms')[0].address
  );
  record(
    'compound',
    'a membership opens the scheme room, its name encoded',
    schemeAddress('Form of Being') === '/grammar/schemes/Form%20of%20Being',
    schemeAddress('Form of Being')
  );
  record(
    'compound',
    'the crumb names the tier and matches the atom room word for word',
    tierCrumb('atoms') === ATOM_CRUMB &&
      tierCrumb('molecules') === 'grammar · molecule · read live through the anon door' &&
      tierCrumb('organisms') === 'grammar · organism · read live through the anon door',
    tierCrumb('molecules')
  );

  // ── the category's room ─────────────────────────

  record(
    'category',
    'the count line reads the base count, in its own words',
    categoryCountLine(63) === '63 atoms wear this face · counted from rows' &&
      categoryCountLine(1) === '1 atom wears this face · counted from rows',
    categoryCountLine(63)
  );
  record(
    'category',
    'a face nobody wears says so, and counts nothing',
    categoryCountLine(0) === NO_FACE_WORN,
    NO_FACE_WORN
  );
  record(
    'category',
    'the room addresses a face by its own name, encoded',
    categoryRoomAddress('private data') === '/grammar/categories/private%20data',
    categoryRoomAddress('private data')
  );

  const worn = categoryTier({
    row: { name: 'consciousness', icon_emoji: '👁️', description: null, sort_order: 1 },
    cards: [atomCard(atomRow())],
    total: 63,
  });
  record(
    'category',
    'the atoms are one tier group carrying the base total, not the page count',
    worn.total === 63 && worn.cards.length === 1 && worn.fault === null,
    tierMeta(worn)
  );
  record(
    'category',
    'the group waits with the face’s own empty, never the search’s',
    worn.empty === NO_FACE_WORN,
    worn.empty
  );

  // ── the lattice's shelves ───────────────────────

  record(
    'shelves',
    'the four kinds shelve rank, facet, axis, dimension, in that order',
    SCHEME_SHELVES.join(' · ') === 'rank · facet · axis · dimension',
    SCHEME_SHELVES.join(' · ')
  );

  const tallies = schemeTallies(
    [
      { id: 'scheme-being', name: 'Being' },
      { id: 'scheme-domain', name: 'Domain' },
      { id: 'scheme-species', name: 'Species' },
      { id: 'scheme-layout', name: 'Layout' },
      { id: 'scheme-form', name: 'form' },
      { id: 'scheme-weave', name: 'Weave' },
    ],
    tallyByScheme([
      { scheme_id: 'scheme-being' },
      { scheme_id: 'scheme-being' },
      { scheme_id: 'scheme-domain' },
      { scheme_id: null },
    ] as SchemeKeyRow[]),
    tallyByScheme([{ scheme_id: 'scheme-being' }] as SchemeKeyRow[])
  );
  const carded = shelveSchemeCards(SCHEMES, tallies);
  record(
    'shelves',
    'the cards shelve in the lattice’s own order, an unnamed kind after them',
    carded.map((shelf) => shelf.kind).join(' · ') === `${SCHEME_SHELVES.join(' · ')} · kindred`,
    carded.map((shelf) => `${shelf.kind} ${shelf.cards.length}`).join(' · ')
  );
  record(
    'shelves',
    'no scheme is lost in the shelving',
    carded.reduce((sum, shelf) => sum + shelf.cards.length, 0) === SCHEMES.length,
    `${SCHEMES.length} of ${SCHEMES.length}`
  );
  record(
    'shelves',
    'a shelf counts its own schemes from rows',
    shelfLine(carded[0]) === '2 schemes · counted from rows' &&
      shelfLine(carded[3]) === '1 scheme · counted from rows',
    `${shelfLine(carded[0])} · ${shelfLine(carded[3])}`
  );

  const being = carded[2].cards[0];
  record(
    'shelves',
    'a card carries its counted members, its counted edges and its door',
    schemeCardLine(being) === '2 members · 1 edge · counted from rows' &&
      being.address === '/grammar/schemes/Being',
    `${being.name} · ${schemeCardLine(being)} · ${being.address}`
  );
  record(
    'shelves',
    'a scheme with no membership and no edge counts zero, never blank',
    schemeCardLine(carded[0].cards[0]) === '0 members · 0 edges · counted from rows',
    schemeCardLine(carded[0].cards[0])
  );
  record(
    'shelves',
    'a card keeps the description the row carries, and invents none',
    being.description === 'what a thing is' && carded[1].cards[0].description === null,
    String(being.description)
  );
  record(
    'shelves',
    'a tally unread is said, never counted as zero',
    schemeCardLine(shelveSchemeCards(SCHEMES, null)[2].cards[0]) === REGISTER_UNREAD,
    REGISTER_UNREAD
  );

  // ── the scheme's room ──────────────────────────

  const memberRows: SchemeMemberRow[] = [
    {
      is_primary: false,
      sort_order: 2,
      atom_id: RESONANCE_ID,
      atoms: { atom_word: 'resonance' },
      molecules: null,
      organisms: null,
    },
    {
      is_primary: true,
      sort_order: 1,
      atom_id: null,
      atoms: null,
      molecules: { name: 'beam-resonance' },
      organisms: null,
    },
    {
      is_primary: false,
      sort_order: 3,
      atom_id: null,
      atoms: null,
      molecules: null,
      organisms: { name: 'calculateBeamResonance' },
    },
    {
      is_primary: false,
      sort_order: 4,
      atom_id: null,
      atoms: null,
      molecules: null,
      organisms: null,
    },
  ];
  const members = schemeMembers(memberRows, { [RESONANCE_ID]: '♒︎' });
  record(
    'scheme',
    'a membership naming no concept is dropped, never invented',
    members.length === 3,
    members.map((one) => one.name).join(' · ')
  );
  record(
    'scheme',
    'each member opens the room of its own tier',
    members.map((one) => one.address).join(' · ') ===
      [
        tierAddress('molecules', 'beam-resonance'),
        tierAddress('atoms', 'resonance'),
        tierAddress('organisms', 'calculateBeamResonance'),
      ].join(' · '),
    members.map((one) => `${one.word} ${one.address}`).join(' · ')
  );
  record(
    'scheme',
    'a member carries its tier word, its primacy and the face its atom wears',
    members[0].primary && members[0].word === 'molecule' && members[1].emoji === '♒︎',
    `${members[0].name} · ${members[0].word} · ${String(members[1].emoji)}`
  );
  record(
    'scheme',
    'a scheme with no membership waits with its own sentence',
    schemeMembers([], {}).length === 0,
    NO_MEMBER_YET
  );

  const edge: SchemeEdge = {
    relationType: 'broader',
    subject: {
      tier: 'atoms',
      word: 'atom',
      name: 'resonance',
      address: tierAddress('atoms', 'resonance'),
    },
    object: {
      tier: 'molecules',
      word: 'molecule',
      name: 'beam-resonance',
      address: tierAddress('molecules', 'beam-resonance'),
    },
  };
  record(
    'scheme',
    'an edge reads as one sentence, subject, typed arrow, object',
    edgeSentence(edge) === 'resonance —broader→ beam-resonance',
    edgeSentence(edge)
  );
  record(
    'scheme',
    'the arrow carries the relation type the row holds',
    edgeArrow('related') === '—related→',
    edgeArrow('related')
  );
  record(
    'scheme',
    'an end the base does not name says so, and is no door',
    edgeSideWord({ tier: 'atoms', word: 'atom', name: null, address: null }) === edgeSideWord(null),
    edgeSideWord(null)
  );
  record(
    'scheme',
    'a scheme with no edge waits with its own sentence',
    NO_SCHEME_EDGE === 'no edge in this scheme',
    NO_SCHEME_EDGE
  );

  // ── the tally ──────────────────────────────────────────────────────────────

  const passed = checks.filter((check) => check.pass).length;
  for (const check of checks) {
    console.log(`${check.pass ? 'pass' : 'FAIL'} · ${check.set} · ${check.check} · ${check.result}`);
  }
  console.log(`${passed} of ${checks.length}`);

  writeFileSync(
    join(__dirname, 'results.json'),
    `${JSON.stringify({ passed, total: checks.length, checks }, null, 2)}\n`
  );

  if (passed !== checks.length) process.exitCode = 1;
}

main();
