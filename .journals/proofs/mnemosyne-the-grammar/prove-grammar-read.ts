// .journals/proofs/mnemosyne-the-grammar/prove-grammar-read.ts
// Proves the Grammar's reads against a fake knowledge client: the door gate,
// the three-part fault carrying the base's message, the case-blind lookups,
// the category's base rows, the scheme's tiers, the bond order and the counts.
// No network and no base.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  DOOR_UNNAMED,
  KNOWLEDGE_KEY_VAR,
  KNOWLEDGE_URL_VAR,
  NO_HEARTH_WORD,
  NO_MARK_WORN,
  REGISTER_UNREAD,
  overrideLines,
  senseTier,
} from '../../../src/lib/grammar/grammar-contract';
import {
  knowledgeDoorNamed,
  readAtomWhole,
  readCategory,
  readFolksonomies,
  readFolksonomy,
  readMolecule,
  readOrganism,
  readScheme,
  readSchemeCounts,
  readSense,
  readSenses,
  type KnowledgeAnswer,
  type KnowledgeClient,
  type KnowledgeQuery,
} from '../../../src/lib/grammar/grammar-read';

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

// ── the fake knowledge client ──────────────────────────────────────────────

type Row = Record<string, unknown>;

interface Step {
  op: 'eq' | 'ilike' | 'or' | 'in' | 'order' | 'limit' | 'range';
  column: string;
  value: unknown;
}

interface Call {
  table: string;
  columns: string;
  counted: boolean;
  head: boolean;
  steps: Step[];
}

interface FakeBase {
  rows: Record<string, Row[]>;
  errors?: Record<string, string>;
}

function likeMatch(value: unknown, pattern: string): boolean {
  if (typeof value !== 'string') return false;
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*');
  return new RegExp(`^${escaped}$`, 'i').test(value);
}

function orMatch(row: Row, filter: string): boolean {
  return filter.split(',').some((one) => {
    const [column, op, ...rest] = one.split('.');
    const value = rest.join('.');
    if (op === 'eq') return String(row[column] ?? '') === value;
    if (op === 'ilike') return likeMatch(row[column], value);
    return false;
  });
}

function sorted(rows: Row[], column: string, ascending: boolean): Row[] {
  return [...rows].sort((one, other) => {
    const left = one[column];
    const right = other[column];
    if (typeof left === 'number' && typeof right === 'number') {
      return ascending ? left - right : right - left;
    }
    const order = String(left ?? '').localeCompare(String(right ?? ''), 'en');
    return ascending ? order : -order;
  });
}

function answerOf(base: FakeBase, call: Call): KnowledgeAnswer {
  const message = base.errors?.[call.table];
  if (message) return { data: null, error: { message }, count: null };

  let rows = [...(base.rows[call.table] ?? [])];
  for (const step of call.steps) {
    if (step.op === 'eq') rows = rows.filter((row) => row[step.column] === step.value);
    if (step.op === 'ilike') rows = rows.filter((row) => likeMatch(row[step.column], String(step.value)));
    if (step.op === 'in') {
      const wanted = step.value as readonly unknown[];
      rows = rows.filter((row) => wanted.includes(row[step.column]));
    }
    if (step.op === 'or') rows = rows.filter((row) => orMatch(row, String(step.value)));
    if (step.op === 'order') rows = sorted(rows, step.column, step.value !== false);
  }

  const count = call.counted ? rows.length : null;
  for (const step of call.steps) {
    if (step.op === 'limit') rows = rows.slice(0, Number(step.value));
    if (step.op === 'range') {
      const [from, to] = step.value as [number, number];
      rows = rows.slice(from, to + 1);
    }
  }
  return { data: call.head ? null : rows, error: null, count };
}

function fakeClient(base: FakeBase): { client: KnowledgeClient; calls: Call[] } {
  const calls: Call[] = [];
  const client: KnowledgeClient = {
    from(table: string) {
      return {
        select(columns: string, options?: { count?: 'exact'; head?: boolean }): KnowledgeQuery {
          const call: Call = {
            table,
            columns,
            counted: options?.count === 'exact',
            head: options?.head === true,
            steps: [],
          };
          calls.push(call);
          const query: KnowledgeQuery = {
            eq(column: string, value: unknown) {
              call.steps.push({ op: 'eq', column, value });
              return query;
            },
            ilike(column: string, value: string) {
              call.steps.push({ op: 'ilike', column, value });
              return query;
            },
            or(filter: string) {
              call.steps.push({ op: 'or', column: '', value: filter });
              return query;
            },
            in(column: string, values: readonly unknown[]) {
              call.steps.push({ op: 'in', column, value: values });
              return query;
            },
            order(column: string, options?: { ascending?: boolean }) {
              call.steps.push({ op: 'order', column, value: options?.ascending !== false });
              return query;
            },
            limit(count: number) {
              call.steps.push({ op: 'limit', column: '', value: count });
              return query;
            },
            range(from: number, to: number) {
              call.steps.push({ op: 'range', column: '', value: [from, to] });
              return query;
            },
            then<TResult1 = KnowledgeAnswer, TResult2 = never>(
              onfulfilled?: ((value: KnowledgeAnswer) => TResult1 | PromiseLike<TResult1>) | null,
              onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
            ): PromiseLike<TResult1 | TResult2> {
              return Promise.resolve(answerOf(base, call)).then(onfulfilled, onrejected);
            },
          };
          return query;
        },
      };
    },
  };
  return { client, calls };
}

// ── the door ───────────────────────────────────────────────────────────────

function nameTheDoor() {
  process.env[KNOWLEDGE_URL_VAR] = 'https://knowledge.example';
  process.env[KNOWLEDGE_KEY_VAR] = 'anon-key';
}

function unnameTheDoor() {
  delete process.env[KNOWLEDGE_URL_VAR];
  delete process.env[KNOWLEDGE_KEY_VAR];
}

// ── the fixtures ───────────────────────────────────────────────────────────

const ATOM_BEAM = '11111111-1111-1111-1111-111111111111';
const ATOM_RESONANCE = '22222222-2222-2222-2222-222222222222';
const MOLECULE_ID = '33333333-3333-3333-3333-333333333333';
const ORGANISM_ID = '44444444-4444-4444-4444-444444444444';
const SCHEME_BEING = '55555555-5555-5555-5555-555555555555';
const SCHEME_LAYOUT = '66666666-6666-6666-6666-666666666666';
const OTHER_MOLECULE = '77777777-7777-7777-7777-777777777777';
const ATOM_ARIA = '88888888-8888-8888-8888-888888888888';
const ATOM_BLAZE = '99999999-9999-9999-9999-999999999999';
const ATOM_CINDER = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const ATOM_DUSK = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

const BASE: FakeBase = {
  rows: {
    atom_whole: [{ atom_id: ATOM_RESONANCE, atom_word: 'Resonance', definition: 'a shared ring' }],
    atoms: [
      { id: ATOM_BEAM, atom_word: 'beam', category_name: 'Structure' },
      { id: ATOM_RESONANCE, atom_word: 'resonance', category_name: 'Being' },
    ],
    sensory_lexicon: [
      { atom_id: ATOM_RESONANCE, atom_word: 'resonance', emoji: '♒︎', color_hex: '#00CED1' },
      { atom_id: ATOM_BEAM, atom_word: 'beam', emoji: null, color_hex: null },
      { atom_id: ATOM_ARIA, atom_word: 'aria', emoji: '💭', color_hex: '#00CED1' },
      { atom_id: ATOM_BLAZE, atom_word: 'blaze', emoji: '💭', color_hex: '#4682B4' },
      { atom_id: ATOM_CINDER, atom_word: 'cinder', emoji: '💭', color_hex: null },
      { atom_id: ATOM_DUSK, atom_word: 'dusk', emoji: '♒︎', color_hex: null },
    ],
    folksonomies: [
      {
        name: 'Echoes',
        purpose: 'the app\'s mood lexicon, shipped',
        status: 'complete',
        notes: 'origin of the twelve',
        created_by: 'KP',
      },
      {
        name: 'Hearth',
        purpose: 'the family app\'s lexicon, awaiting its season',
        status: 'growing',
        notes: null,
        created_by: null,
      },
    ],
    thesaurus: [
      {
        word: 'Resonance',
        emoji: '♒︎',
        definition: 'the ring an app answers with',
        color_hex: '#4682B4',
        folksonomy_type: 'Echoes',
        notes: null,
      },
      {
        word: 'Calm',
        emoji: '💭',
        definition: 'a settled stillness',
        color_hex: '#6C5CE7',
        folksonomy_type: 'Echoes',
        notes: null,
      },
      {
        word: 'Beam',
        emoji: '💭',
        definition: 'a line of light held',
        color_hex: null,
        folksonomy_type: 'Compass',
        notes: null,
      },
    ],
    molecules: [
      {
        id: MOLECULE_ID,
        name: 'beam-resonance',
        definition: 'a beam that rings',
        molecule_type: 'compound',
        naming_convention: 'kebab',
        atom_words: 'beam resonance',
        kebab_case: 'beam-resonance',
        sensory_override: { emoji: '♒︎', color_hex: '#00CED1' },
      },
      { id: OTHER_MOLECULE, name: 'create-resonance', definition: null },
    ],
    molecule_atoms: [
      {
        molecule_id: MOLECULE_ID,
        atom_id: ATOM_RESONANCE,
        position: 2,
        role: 'head',
        bond_type: 'covalent',
        bond_strength: 3,
        atoms: { atom_word: 'resonance', category_name: 'Being' },
      },
      {
        molecule_id: MOLECULE_ID,
        atom_id: ATOM_BEAM,
        position: 1,
        role: 'modifier',
        bond_type: 'covalent',
        bond_strength: 2,
        atoms: { atom_word: 'beam', category_name: 'Structure' },
      },
    ],
    organisms: [
      {
        id: ORGANISM_ID,
        name: 'calculate-beam-resonance',
        definition: 'a function that rings',
        organism_type: 'function',
        domain: 'typescript',
        kebab_case: 'calculate-beam-resonance',
      },
    ],
    organism_molecules: [
      {
        organism_id: ORGANISM_ID,
        molecule_id: MOLECULE_ID,
        position: 1,
        role: 'core',
        bond_type: 'ionic',
        molecules: { name: 'beam-resonance' },
        organisms: { name: 'calculate-beam-resonance' },
      },
    ],
    organism_atoms: [
      {
        organism_id: ORGANISM_ID,
        atom_id: ATOM_BEAM,
        position: 1,
        role: 'verb',
        bond_strength: 4,
        atoms: { atom_word: 'beam', category_name: 'Structure' },
      },
    ],
    scheme_memberships: [
      {
        scheme_id: SCHEME_BEING,
        atom_id: ATOM_RESONANCE,
        molecule_id: null,
        organism_id: null,
        is_primary: true,
        sort_order: 2,
        atoms: { atom_word: 'resonance' },
        molecules: null,
        organisms: null,
        schemes: { name: 'Being', scheme_type: 'axis' },
      },
      {
        scheme_id: SCHEME_BEING,
        atom_id: null,
        molecule_id: MOLECULE_ID,
        organism_id: null,
        is_primary: false,
        sort_order: 1,
        atoms: null,
        molecules: { name: 'beam-resonance' },
        organisms: null,
        schemes: { name: 'Being', scheme_type: 'axis' },
      },
      {
        scheme_id: SCHEME_BEING,
        atom_id: null,
        molecule_id: null,
        organism_id: ORGANISM_ID,
        is_primary: false,
        sort_order: 3,
        atoms: null,
        molecules: null,
        organisms: { name: 'calculate-beam-resonance' },
        schemes: { name: 'Being', scheme_type: 'axis' },
      },
      {
        scheme_id: SCHEME_LAYOUT,
        atom_id: ATOM_BEAM,
        molecule_id: null,
        organism_id: null,
        is_primary: false,
        sort_order: 1,
        atoms: { atom_word: 'beam' },
        molecules: null,
        organisms: null,
        schemes: { name: 'Layout', scheme_type: 'facet' },
      },
    ],
    concept_relations: [
      {
        scheme_id: SCHEME_BEING,
        relation_type: 'broader',
        subject_molecule_id: MOLECULE_ID,
        subject_atom_id: null,
        subject_organism_id: null,
        object_atom_id: ATOM_RESONANCE,
        object_molecule_id: null,
        object_organism_id: null,
      },
      {
        scheme_id: SCHEME_LAYOUT,
        relation_type: 'related',
        subject_atom_id: ATOM_BEAM,
        subject_molecule_id: null,
        subject_organism_id: null,
        object_molecule_id: MOLECULE_ID,
        object_atom_id: null,
        object_organism_id: null,
      },
      {
        scheme_id: null,
        relation_type: 'narrower',
        subject_organism_id: ORGANISM_ID,
        subject_atom_id: null,
        subject_molecule_id: null,
        object_molecule_id: OTHER_MOLECULE,
        object_atom_id: null,
        object_organism_id: null,
      },
    ],
    schemes: [
      {
        id: SCHEME_BEING,
        name: 'Being',
        scheme_type: 'axis',
        description: 'what a thing is',
        sort_order: 1,
        parent_scheme_id: null,
      },
      {
        id: SCHEME_LAYOUT,
        name: 'Layout',
        scheme_type: 'facet',
        description: null,
        sort_order: 2,
        parent_scheme_id: SCHEME_BEING,
      },
    ],
    categories: [
      { name: 'Being', icon_emoji: '👁️', description: 'what a thing is', sort_order: 1 },
      { name: 'Empty', icon_emoji: '🫙', description: null, sort_order: 9 },
    ],
    atom_dressed: [
      {
        atom_id: ATOM_RESONANCE,
        atom_word: 'resonance',
        definition: 'a shared ring',
        category_face: '👁️',
        category_name: 'Being',
        emoji: '♒︎',
        atom_type: 'noun',
        is_override: false,
      },
      {
        atom_id: ATOM_BEAM,
        atom_word: 'anchor',
        definition: 'a held point',
        category_face: '👁️',
        category_name: 'Being',
        emoji: null,
        atom_type: 'noun',
        is_override: false,
      },
      {
        atom_id: ATOM_RESONANCE,
        atom_word: 'resonance',
        definition: 'the compass reading',
        category_face: '👁️',
        category_name: 'Being',
        emoji: '🧭',
        atom_type: 'noun',
        is_override: true,
      },
      {
        atom_id: ATOM_BEAM,
        atom_word: 'beam',
        definition: 'a spanning member',
        category_face: '🧱',
        category_name: 'Structure',
        emoji: null,
        atom_type: 'noun',
        is_override: false,
      },
    ],
  },
};

function base(): FakeBase {
  return { rows: BASE.rows };
}

// ── the proof ──────────────────────────────────────────────────────────────

async function main() {
  // ── the door gate ────────────────────────────────────────────────────────

  unnameTheDoor();
  record('door', 'an unnamed door is seen as unnamed', !knowledgeDoorNamed(), String(knowledgeDoorNamed()));

  const shut = fakeClient(base());
  const shutMolecule = await readMolecule('beam-resonance', shut.client);
  const shutOrganism = await readOrganism('calculate-beam-resonance', shut.client);
  const shutCategory = await readCategory('Being', shut.client);
  const shutScheme = await readScheme('Being', shut.client);
  const shutCounts = await readSchemeCounts(shut.client);
  const shutReads = [shutMolecule, shutOrganism, shutCategory, shutScheme, shutCounts];

  record(
    'door',
    'every read faults when the door is unnamed',
    shutReads.every((read) => read.ok === false),
    `${shutReads.filter((read) => read.ok === false).length} of ${shutReads.length}`
  );
  record(
    'door',
    'the unnamed door is never asked of the client',
    shut.calls.length === 0,
    String(shut.calls.length)
  );
  record(
    'door',
    'the unnamed door faults in three parts, in its own words',
    !shutMolecule.ok &&
      shutMolecule.fault.what === REGISTER_UNREAD &&
      shutMolecule.fault.why.includes(DOOR_UNNAMED) &&
      shutMolecule.fault.next.includes(KNOWLEDGE_URL_VAR),
    shutMolecule.ok ? 'read' : shutMolecule.fault.why
  );

  nameTheDoor();
  record('door', 'a named door is seen as named', knowledgeDoorNamed(), String(knowledgeDoorNamed()));

  // ── the fault ────────────────────────────────────────────────────────────

  const refused = fakeClient({
    rows: BASE.rows,
    errors: { molecules: 'permission denied for table molecules' },
  });
  const refusedRead = await readMolecule('beam-resonance', refused.client);
  record(
    'fault',
    "a refusal carries the base's own message and the table",
    !refusedRead.ok && refusedRead.fault.why === 'molecules · permission denied for table molecules',
    refusedRead.ok ? 'read' : refusedRead.fault.why
  );
  record(
    'fault',
    'a refusal faults in three parts, never empty',
    !refusedRead.ok &&
      refusedRead.fault.what.length > 0 &&
      refusedRead.fault.why.length > 0 &&
      refusedRead.fault.next.length > 0,
    refusedRead.ok ? 'read' : refusedRead.fault.next
  );

  const refusedDeep = fakeClient({
    rows: BASE.rows,
    errors: { sensory_lexicon: 'permission denied for table sensory_lexicon' },
  });
  const refusedFaces = await readMolecule('beam-resonance', refusedDeep.client);
  record(
    'fault',
    'a refusal on a second read faults the whole reading',
    !refusedFaces.ok && refusedFaces.fault.why.startsWith('sensory_lexicon · '),
    refusedFaces.ok ? 'read' : refusedFaces.fault.why
  );

  // ── the case-blind lookups ───────────────────────────────────────────────

  const whole = fakeClient(base());
  const wholeRead = await readAtomWhole('  resonance  ', whole.client);
  record(
    'case',
    'the atom is read whole by an ilike, never an eq',
    whole.calls[0]?.steps.some((step) => step.op === 'ilike' && step.column === 'atom_word'),
    whole.calls[0]?.steps.map((step) => step.op).join(' · ') ?? 'none'
  );
  record(
    'case',
    'a word typed in one case finds the row stored in another',
    wholeRead.ok && wholeRead.value?.atom_word === 'Resonance',
    wholeRead.ok ? String(wholeRead.value?.atom_word) : wholeRead.fault.why
  );

  const cased = fakeClient(base());
  const casedMolecule = await readMolecule('BEAM-RESONANCE', cased.client);
  record(
    'case',
    'a molecule is found case-blind by its name',
    casedMolecule.ok && casedMolecule.value?.row.name === 'beam-resonance',
    casedMolecule.ok ? String(casedMolecule.value?.row.name) : casedMolecule.fault.why
  );

  const unknown = fakeClient(base());
  const unknownRead = await readMolecule('no-such-molecule', unknown.client);
  record(
    'case',
    'an unknown name answers no row, never a fault',
    unknownRead.ok && unknownRead.value === null,
    unknownRead.ok ? String(unknownRead.value) : unknownRead.fault.why
  );

  // ── the molecule ─────────────────────────────────────────────────────────

  const molecule = fakeClient(base());
  const moleculeRead = await readMolecule('beam-resonance', molecule.client);
  const moleculeWhole = moleculeRead.ok ? moleculeRead.value : null;
  record(
    'molecule',
    'the atoms are carried in bond order',
    moleculeWhole?.atoms.map((one) => one.word).join(' · ') === 'beam · resonance',
    moleculeWhole?.atoms.map((one) => `${one.position} ${one.word}`).join(' · ') ?? 'none'
  );
  record(
    'molecule',
    'each bond carries its role, its type and its strength',
    moleculeWhole?.atoms[0]?.role === 'modifier' &&
      moleculeWhole?.atoms[0]?.bondType === 'covalent' &&
      moleculeWhole?.atoms[0]?.bondStrength === 2,
    `${moleculeWhole?.atoms[0]?.role} · ${moleculeWhole?.atoms[0]?.bondType} · ${moleculeWhole?.atoms[0]?.bondStrength}`
  );
  record(
    'molecule',
    'an atom wears its own sense, an atom with none wears nothing',
    moleculeWhole?.atoms[1]?.emoji === '♒︎' && moleculeWhole?.atoms[0]?.emoji === null,
    `${String(moleculeWhole?.atoms[0]?.emoji)} · ${String(moleculeWhole?.atoms[1]?.emoji)}`
  );
  record(
    'molecule',
    'each bonded atom opens its own room',
    moleculeWhole?.atoms[0]?.address === '/grammar/atoms/beam',
    moleculeWhole?.atoms[0]?.address ?? 'none'
  );
  record(
    'molecule',
    'the sensory override rides through the read, one line per key',
    overrideLines(moleculeWhole?.row.sensory_override)
      .map((line) => `${line.label} ${line.value}`)
      .join(' · ') === 'emoji ♒︎ · color_hex #00CED1',
    overrideLines(moleculeWhole?.row.sensory_override)
      .map((line) => `${line.label} ${line.value}`)
      .join(' · ')
  );
  record(
    'molecule',
    'the organisms it belongs to are named',
    moleculeWhole?.organismNames.join(' · ') === 'calculate-beam-resonance',
    moleculeWhole?.organismNames.join(' · ') ?? 'none'
  );
  record(
    'molecule',
    'its membership carries the scheme, its kind and its primacy',
    moleculeWhole?.memberships[0]?.scheme === 'Being' &&
      moleculeWhole?.memberships[0]?.schemeType === 'axis' &&
      moleculeWhole?.memberships[0]?.primary === false,
    `${moleculeWhole?.memberships[0]?.scheme} · ${moleculeWhole?.memberships[0]?.schemeType}`
  );
  record(
    'molecule',
    "an edge is named from this molecule's end, the other side named and tiered",
    moleculeWhole?.edges.length === 2 &&
      moleculeWhole.edges[0]?.direction === 'subject' &&
      moleculeWhole.edges[0]?.other?.name === 'resonance' &&
      moleculeWhole.edges[0]?.other?.word === 'atom' &&
      moleculeWhole.edges[1]?.direction === 'object' &&
      moleculeWhole.edges[1]?.other?.name === 'beam',
    moleculeWhole?.edges
      .map((one) => `${one.relationType} · ${one.direction} · ${one.other?.word} ${one.other?.name}`)
      .join(' · ') ?? 'none'
  );

  // ── the organism ─────────────────────────────────────────────────────────

  const organism = fakeClient(base());
  const organismRead = await readOrganism('calculate-beam-resonance', organism.client);
  const organismWhole = organismRead.ok ? organismRead.value : null;
  record(
    'organism',
    'the molecules it holds are named in order, each a door',
    organismWhole?.molecules[0]?.name === 'beam-resonance' &&
      organismWhole?.molecules[0]?.address === '/grammar/molecules/beam-resonance',
    organismWhole?.molecules.map((one) => one.name).join(' · ') ?? 'none'
  );
  record(
    'organism',
    'its direct atoms carry position, role and strength',
    organismWhole?.atoms[0]?.word === 'beam' &&
      organismWhole?.atoms[0]?.role === 'verb' &&
      organismWhole?.atoms[0]?.bondStrength === 4,
    `${organismWhole?.atoms[0]?.word} · ${organismWhole?.atoms[0]?.role} · ${organismWhole?.atoms[0]?.bondStrength}`
  );
  record(
    'organism',
    "an edge from the organism's end names the other side",
    organismWhole?.edges[0]?.direction === 'subject' &&
      organismWhole?.edges[0]?.other?.name === 'create-resonance' &&
      organismWhole?.edges[0]?.other?.word === 'molecule',
    organismWhole?.edges
      .map((one) => `${one.relationType} · ${one.other?.word} ${one.other?.name}`)
      .join(' · ') ?? 'none'
  );

  // ── the category ─────────────────────────────────────────────────────────

  const category = fakeClient(base());
  const categoryRead = await readCategory('being', category.client);
  const categoryWhole = categoryRead.ok ? categoryRead.value : null;
  record(
    'category',
    'the face is read case-blind, with its own emoji',
    categoryWhole?.row.name === 'Being' && categoryWhole?.row.icon_emoji === '👁️',
    `${categoryWhole?.row.name} · ${String(categoryWhole?.row.icon_emoji)}`
  );
  record(
    'category',
    'a dressed row that overrides is never counted among the face',
    categoryWhole?.cards.length === 2 &&
      categoryWhole.cards.every((card) => card.title !== undefined) &&
      categoryWhole.cards.map((card) => card.title).join(' · ') === 'anchor · resonance',
    categoryWhole?.cards.map((card) => card.title).join(' · ') ?? 'none'
  );
  record(
    'category',
    'the count is the base count of the face, not the page',
    categoryWhole?.total === 2,
    String(categoryWhole?.total)
  );
  record(
    'category',
    'the atoms are read in word order and each opens its room',
    categoryWhole?.cards[0]?.address === '/grammar/atoms/anchor',
    categoryWhole?.cards[0]?.address ?? 'none'
  );

  const emptyFace = fakeClient(base());
  const emptyRead = await readCategory('Empty', emptyFace.client);
  record(
    'category',
    'a face no atom wears counts zero, never nothing',
    emptyRead.ok && emptyRead.value?.total === 0 && emptyRead.value.cards.length === 0,
    emptyRead.ok ? String(emptyRead.value?.total) : emptyRead.fault.why
  );

  // ── the scheme ───────────────────────────────────────────────────────────

  const scheme = fakeClient(base());
  const schemeRead = await readScheme('being', scheme.client);
  const schemeWhole = schemeRead.ok ? schemeRead.value : null;
  record(
    'scheme',
    'every member carries the tier it belongs to',
    schemeWhole?.members.map((one) => one.word).join(' · ') === 'molecule · atom · organism',
    schemeWhole?.members.map((one) => `${one.word} ${one.name}`).join(' · ') ?? 'none'
  );
  record(
    'scheme',
    'the members are ordered by the sort order the lattice holds',
    schemeWhole?.members.map((one) => one.name).join(' · ') ===
      'beam-resonance · resonance · calculate-beam-resonance',
    schemeWhole?.members.map((one) => String(one.sortOrder)).join(' · ') ?? 'none'
  );
  record(
    'scheme',
    'a member carries its primacy, and an atom member its face',
    schemeWhole?.members[1]?.primary === true && schemeWhole?.members[1]?.emoji === '♒︎',
    `${String(schemeWhole?.members[1]?.primary)} · ${String(schemeWhole?.members[1]?.emoji)}`
  );
  record(
    'scheme',
    'each member opens the room of its own tier',
    schemeWhole?.members[0]?.address === '/grammar/molecules/beam-resonance' &&
      schemeWhole?.members[2]?.address === '/grammar/organisms/calculate-beam-resonance',
    schemeWhole?.members[2]?.address ?? 'none'
  );
  record(
    'scheme',
    'only the edges drawn within this scheme are carried, both ends named',
    schemeWhole?.edges.length === 1 &&
      schemeWhole.edges[0]?.subject?.name === 'beam-resonance' &&
      schemeWhole.edges[0]?.object?.name === 'resonance',
    schemeWhole?.edges
      .map((one) => `${one.subject?.name} ${one.relationType} ${one.object?.name}`)
      .join(' · ') ?? 'none'
  );
  record(
    'scheme',
    'a scheme carries the schemes standing under it',
    schemeWhole?.children.map((one) => one.name).join(' · ') === 'Layout',
    schemeWhole?.children.map((one) => one.name).join(' · ') ?? 'none'
  );
  record(
    'scheme',
    'a scheme under no other names no parent',
    schemeWhole?.parentName === null,
    String(schemeWhole?.parentName)
  );

  const child = fakeClient(base());
  const childRead = await readScheme('Layout', child.client);
  record(
    'scheme',
    'a scheme standing under another names its parent',
    childRead.ok && childRead.value?.parentName === 'Being',
    childRead.ok ? String(childRead.value?.parentName) : childRead.fault.why
  );
  record(
    'scheme',
    'a scheme carries only the edges keyed to it',
    childRead.ok &&
      childRead.value?.edges.length === 1 &&
      childRead.value.edges[0]?.relationType === 'related',
    childRead.ok
      ? (childRead.value?.edges.map((one) => one.relationType).join(' · ') ?? 'none')
      : childRead.fault.why
  );

  // ── the counts ───────────────────────────────────────────────────────────

  const counts = fakeClient(base());
  const countsRead = await readSchemeCounts(counts.client);
  const tallies = countsRead.ok ? countsRead.value : null;
  record(
    'counts',
    'every scheme is tallied, counted from rows',
    tallies?.Being?.members === 3 && tallies?.Layout?.members === 1,
    `Being ${String(tallies?.Being?.members)} · Layout ${String(tallies?.Layout?.members)}`
  );
  record(
    'counts',
    'the edges are tallied per scheme, a scheme-less edge dropped',
    tallies?.Being?.edges === 1 && tallies?.Layout?.edges === 1,
    `Being ${String(tallies?.Being?.edges)} · Layout ${String(tallies?.Layout?.edges)}`
  );
  record(
    'counts',
    'the tally is read from rows, never from a head count',
    counts.calls.every((call) => !call.counted && !call.head),
    counts.calls.map((call) => call.table).join(' · ')
  );


  // ── the senses ───────────────────────────────────────────────────────────

  const wall = fakeClient(base());
  const wallRead = await readSenses(wall.client);
  const shelf = wallRead.ok ? wallRead.value : null;
  record(
    'senses',
    'every distinct mark is grouped from the rows, by count then by mark',
    shelf?.marks[0]?.emoji === '💭' &&
      shelf?.marks[0]?.count === 3 &&
      shelf?.marks[1]?.emoji === '♒︎' &&
      shelf?.marks[1]?.count === 2,
    shelf?.marks.map((mark) => `${mark.emoji} ${mark.count}`).join(' · ') ?? 'none'
  );
  record(
    'senses',
    'each mark opens its own room, escaped into the address',
    shelf?.marks[1]?.address === '/grammar/senses/%E2%99%92%EF%B8%8E',
    shelf?.marks[1]?.address ?? 'none'
  );
  record(
    'senses',
    'a row wearing no mark is counted in the rows read, never on the wall',
    shelf?.rowsRead === 6 && shelf?.withEmoji === 5,
    `${String(shelf?.withEmoji)} of ${String(shelf?.rowsRead)}`
  );
  record(
    'senses',
    'the colours are tallied from the same rows, by count then by hex',
    shelf?.colours[0]?.hex === '#00CED1' &&
      shelf?.colours[0]?.count === 2 &&
      shelf?.withColour === 3,
    shelf?.colours.map((colour) => `${colour.hex} ${colour.count}`).join(' · ') ?? 'none'
  );
  record(
    'senses',
    'the lexicon is read in one bounded pass, never head-counted',
    wall.calls.filter((call) => call.table === 'sensory_lexicon').length === 1 &&
      wall.calls.every((call) => !call.counted && !call.head) &&
      shelf?.truncated === false,
    wall.calls.map((call) => call.table).join(' · ')
  );

  const mark = fakeClient(base());
  const markRead = await readSense('♒︎', mark.client);
  const marked = markRead.ok ? markRead.value : null;
  record(
    'senses',
    'a mark carries every hearth atom wearing it, counted by the base',
    marked?.total === 1 && marked?.cards[0]?.title === 'resonance',
    `${String(marked?.total)} · ${marked?.cards.map((card) => card.title).join(' · ') ?? 'none'}`
  );
  record(
    'senses',
    'a mark carries the thesaurus rows that also wear it, each a door to its room',
    marked?.meanings.length === 1 &&
      marked?.meanings[0]?.folksonomy === 'Echoes' &&
      marked?.meanings[0]?.address === '/grammar/folksonomies/Echoes',
    marked?.meanings.map((one) => `${one.folksonomy} ${one.word}`).join(' · ') ?? 'none'
  );

  const shared = fakeClient(base());
  const sharedRead = await readSense('💭', shared.client);
  record(
    'senses',
    'one mark carries the meanings of more than one folksonomy, by folksonomy then word',
    sharedRead.ok &&
      sharedRead.value.meanings.map((one) => `${one.folksonomy}:${one.word}`).join(' · ') ===
        'Compass:Beam · Echoes:Calm',
    sharedRead.ok
      ? sharedRead.value.meanings.map((one) => `${one.folksonomy}:${one.word}`).join(' · ')
      : sharedRead.fault.why
  );

  const bare = fakeClient(base());
  const bareRead = await readSense('🪁', bare.client);
  record(
    'senses',
    'a mark no atom wears counts zero and waits with its own sentence',
    bareRead.ok &&
      bareRead.value.total === 0 &&
      senseTier(bareRead.value).empty === NO_MARK_WORN,
    bareRead.ok ? `${bareRead.value.total} · ${senseTier(bareRead.value).empty}` : bareRead.fault.why
  );

  // ── the folksonomies ─────────────────────────────────────────────────────

  const umbrellas = fakeClient(base());
  const umbrellasRead = await readFolksonomies(umbrellas.client);
  const cards = umbrellasRead.ok ? umbrellasRead.value : null;
  record(
    'folksonomy',
    'every folksonomy is carried with its dressings counted from rows',
    cards?.length === 2 && cards?.[0]?.dressings === 2 && cards?.[1]?.dressings === 0,
    cards?.map((card) => `${card.name} ${card.dressings}`).join(' · ') ?? 'none'
  );
  record(
    'folksonomy',
    'a folksonomy the register holds complete is marked a starter',
    cards?.[0]?.starter === true && cards?.[1]?.starter === false,
    cards?.map((card) => `${card.name} ${String(card.starter)}`).join(' · ') ?? 'none'
  );
  record(
    'folksonomy',
    'the dressings are counted from rows, never from a head count',
    umbrellas.calls.every((call) => !call.counted && !call.head),
    umbrellas.calls.map((call) => call.table).join(' · ')
  );

  const room = fakeClient(base());
  const roomRead = await readFolksonomy('echoes', room.client);
  const umbrellaWhole = roomRead.ok ? roomRead.value : null;
  record(
    'folksonomy',
    'a folksonomy is found by its name, whatever its case',
    umbrellaWhole?.row.name === 'Echoes',
    umbrellaWhole?.row.name ?? 'none'
  );
  record(
    'folksonomy',
    'each dressing is joined to the hearth atom of its word, case-blind',
    umbrellaWhole?.dressings[1]?.word === 'Resonance' &&
      umbrellaWhole?.dressings[1]?.hearth?.word === 'resonance' &&
      umbrellaWhole?.dressings[1]?.hearth?.address === '/grammar/atoms/resonance',
    umbrellaWhole?.dressings
      .map((one) => `${one.word} → ${one.hearth?.word ?? NO_HEARTH_WORD}`)
      .join(' · ') ?? 'none'
  );
  record(
    'folksonomy',
    'the hearth beside a dressing is the base row, never an override',
    umbrellaWhole?.dressings[1]?.hearth?.definition === 'a shared ring' &&
      umbrellaWhole?.dressings[1]?.definition === 'the ring an app answers with',
    `${String(umbrellaWhole?.dressings[1]?.hearth?.definition)} · ${String(umbrellaWhole?.dressings[1]?.definition)}`
  );
  record(
    'folksonomy',
    'a dressing whose word the hearth does not carry stands alone',
    umbrellaWhole?.dressings[0]?.word === 'Calm' && umbrellaWhole?.dressings[0]?.hearth === null,
    `${String(umbrellaWhole?.dressings[0]?.word)} · ${String(umbrellaWhole?.dressings[0]?.hearth)}`
  );

  const waiting = fakeClient(base());
  const waitingRead = await readFolksonomy('Hearth', waiting.client);
  record(
    'folksonomy',
    'a folksonomy holding no dressing asks the hearth nothing',
    waitingRead.ok &&
      waitingRead.value?.dressings.length === 0 &&
      waiting.calls.every((call) => call.table !== 'atom_dressed'),
    waiting.calls.map((call) => call.table).join(' · ')
  );

  const missing = fakeClient(base());
  const missingRead = await readFolksonomy('Nowhere', missing.client);
  record(
    'folksonomy',
    'a name the register does not hold reads null, never invented',
    missingRead.ok && missingRead.value === null,
    missingRead.ok ? String(missingRead.value) : missingRead.fault.why
  );

  // ── the tally ──────────────────────────────────────────────────────────────

  const passed = checks.filter((check) => check.pass).length;
  for (const check of checks) {
    console.log(`${check.pass ? 'pass' : 'FAIL'} · ${check.set} · ${check.check} · ${check.result}`);
  }
  console.log(`${passed} of ${checks.length}`);

  writeFileSync(
    join(__dirname, 'results-read.json'),
    `${JSON.stringify({ passed, total: checks.length, checks }, null, 2)}\n`
  );

  if (passed !== checks.length) process.exitCode = 1;
}

main();
