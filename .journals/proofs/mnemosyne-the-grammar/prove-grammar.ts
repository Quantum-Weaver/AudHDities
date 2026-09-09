// .journals/proofs/mnemosyne-the-grammar/prove-grammar.ts
// Proves the Grammar's search grouping, the honest empties, the face fallback,
// the dressings kept beside the hearth, the bond truncation and the fault shape
// against fixtures, with no network and no base.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ATOM_SEARCH_COLUMNS,
  DOOR_LABELS,
  DOOR_TABLES,
  DOOR_UNNAMED,
  LINE_TABLES,
  MOLECULE_CHIP_LIMIT,
  NOT_IN_A_SCHEME,
  NOT_YET_SENSED,
  NO_DRESSING,
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
  baseFault,
  bondChips,
  bondLine,
  boundQuery,
  doorUnnamedFault,
  ilikePattern,
  latticeEdges,
  measuresBadge,
  membershipViews,
  moleculeCard,
  moreLine,
  organismCard,
  senseChannels,
  shelveSchemes,
  splitDressings,
  tallyLine,
  tierAddress,
  tierMeta,
  type AtomDressing,
  type AtomSearchRow,
  type AtomWhole,
  type GrammarTier,
  type MembershipJoinRow,
  type MoleculeSearchRow,
  type OrganismSearchRow,
  type RelationJoinRow,
  type SchemeChip,
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

const SCHEMES: SchemeChip[] = [
  { name: 'Species', scheme_type: 'rank', sort_order: 8 },
  { name: 'Domain', scheme_type: 'rank', sort_order: 1 },
  { name: 'Being', scheme_type: 'axis', sort_order: 2 },
  { name: 'Layout', scheme_type: 'facet', sort_order: 10 },
  { name: 'form', scheme_type: 'dimension', sort_order: 5 },
  { name: 'Weave', scheme_type: 'kindred', sort_order: 1 },
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
