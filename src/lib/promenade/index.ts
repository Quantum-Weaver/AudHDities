// the-promenade — the coast walk, as a pure walk-model.
//
// A promenade is a walk taken for its own sake, at the walker's own pace.
// THE READER IS THE ENGINE: there is no verb here that moves anyone, and
// nothing is ever ranked.
//
// STANDALONE BY LAW: zero imports — the shore, the moments and the acts all
// arrive as arguments, and the telling leaves in an array.

/** THE HONEST END, as one sentence, exported so a realm renders the house's
 *  own words rather than inventing a softer ending. The coast "ends honestly".
 *  It is never a spinner and never a refill. */
export const THE_END = 'the coast has an end today.';

/** How the coast is ordered. Four values and there is no fifth: chronological,
 *  and the hall's own three lenses. NEVER RANKED. */
export type Ordering = 'chronological' | 'collection' | 'form' | 'mood';

/** The four, in the order the hall walk names them. */
export const ORDERINGS: readonly Ordering[] = ['chronological', 'collection', 'form', 'mood'];

/** The three LENSES, named for reading — the hall walk's own list,
 *  "chosen by lens (collection · form · mood)". A lens is one of the
 *  orderings; it groups, and it never ranks. */
export const LENSES: readonly Ordering[] = ['collection', 'form', 'mood'];

/** Which way the coast is walked through time. Both are chronological;
 *  neither is a ranking. */
export type Bearing = 'newest' | 'oldest';

/** The two, with the hall's own default first. */
export const BEARINGS: readonly Bearing[] = ['newest', 'oldest'];

/** THE AUTOPLAY SEAM — two lawful modes:
 *    · `flow` — a consented listening flow, each swipe carrying sound to
 *      the next work
 *    · `tap`  — swipe shows, tap sounds
 *  THIS MODEL TAKES NEITHER: the seam is `null` unless a consumer declares
 *  one, and an unset seam is a lawful state reported honestly. */
export type Seam = 'flow' | 'tap';

/** The two lawful modes. Neither is a default. */
export const SEAMS: readonly Seam[] = ['flow', 'tap'];

/** What sound is doing at the stop the reader is standing at.
 *  `undecided` is not a failure — it is the honest report of an UNSET
 *  seam, and it is the state this model ships in. */
export type Sounding = 'sounding' | 'silent' | 'undecided';

/** The logging sink, and the whole logging capability: built, and default
 *  silent. Absent, nothing is emitted anywhere. */
export type Passerby = (line: string) => void;

/** ONE RELEASED WORK, AS THE REALM DECLARES IT — never re-enumerated
 *  here. `form` is an open string on purpose: Khorós's five ruled forms
 *  (single · ep · album · beats · tracks, KP's own words in his own
 *  order) are hers, and a second copy of somebody else's enum is a
 *  second thing to keep true.
 *
 *  EVERY OTHER KEY RIDES THROUGH UNTOUCHED AND IS NEVER READ — ring,
 *  cover art, provenance, the artist's snapshot, and every count a
 *  platform might have farmed. Nothing in this file reads a field it was
 *  not told to place by. */
export interface Landfall {
	id: string;
	title: string;
	/** Khorós's `releases.form`, ridden as a key. */
	form: string;
	/** the listener's own grouping — Khorós's `collections.name`. */
	collection?: string;
	/** the mood token this release wears — Khorós's own mood vocabulary. */
	mood?: string;
	/** THE RELEASE'S OWN DATE, in milliseconds, DECLARED by the realm.
	 *  This water has no clock and never will. */
	releasedAt?: number;
	/** its making date, the hall's own fallback when a release has no
	 *  date of its own (`releases.created_at`). */
	createdAt?: number;
	[k: string]: unknown; // ridden whole — ring, coverArt, provenance, counts: never read
}

/** ONE STOP ON THE COAST — one release, full-screen, as it stands in the
 *  reader's chosen order. */
export interface Vista {
	/** 0-based place along the coast. */
	place: number;
	/** how many stops the coast has, carried on every stop BECAUSE IT
	 *  HAS AN END — a reader always knows the size of what they chose. */
	of: number;
	id: string;
	title: string;
	form: string;
	/** the lens stretch this stop stands in; null under chronological,
	 *  and null when the release names no value for the chosen lens. */
	group: string | null;
	/** the declared millisecond it was placed by, or null when the realm
	 *  declared none. */
	moment: number | null;
	/** which declared date placed it — the hall's own chronon rule, told
	 *  rather than assumed. */
	momentFrom: 'released' | 'made' | 'none';
	first: boolean;
	last: boolean;
	/** the declared release, ridden whole. */
	landfall: Landfall;
}

/** THE CHOSEN COAST — ordered, finite, counted, and ended. It is the
 *  map, never the screen: a reader sees one stop at a time. */
export interface Coast {
	ordering: Ordering;
	bearing: Bearing;
	/** the declared seam, or null — UNSET, which is lawful and his. */
	seam: Seam | null;
	vistas: Vista[];
	/** known at charting. There is no unknown length here to not know. */
	length: number;
	/** the house's own words for the ending. */
	ending: string;
	flagged: string[];
}

/** THE READER'S OWN PASSAGE — where they stand, and how they came. */
export interface Promenade {
	coast: Coast;
	/** true once the reader has arrived by their own act. */
	arrived: boolean;
	/** where the reader stands; −1 before arriving and on an empty coast. */
	place: number;
	/** exactly one stop, full-screen, or null. */
	here: Vista | null;
	/** every place the reader's own acts have taken them, in order —
	 *  forward and back. THE READER'S OWN RECORD, and never read by
	 *  `chart`: the coast cannot see the reader. */
	passage: number[];
	/** the declared act behind each of those movements, in step. */
	acts: string[];
	atStart: boolean;
	atEnd: boolean;
	/** seam `flow` only: play was pressed once, by the arriving act. */
	consented: boolean;
	sounding: Sounding;
	flagged: string[];
}

// ── the small honest helpers ─────────────────────────────────────────

function isMoment(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value);
}

function declaredAct(act: unknown): string | null {
	if (typeof act !== 'string') return null;
	const held = act.trim();
	return held.length === 0 ? null : held;
}

function groupValue(landfall: Landfall, ordering: Ordering): string | null {
	if (ordering === 'chronological') return null;
	const raw = landfall[ordering];
	return typeof raw === 'string' && raw.trim().length > 0 ? raw : null;
}

// ── charting ─────────────────────────────────────────────────────────

/** CHART — the whole ordering, one pure act.
 *
 *  IT TAKES NO READER. There is no promenade, no passage, no history and
 *  no profile in this signature, and that absence is the "navigated,
 *  never pushed" law written as a type rather than promised in prose:
 *  the coast physically cannot bend toward anyone.
 *
 *  @param shore     the released work the realm hands in, in its own order
 *  @param ordering  chronological, or one of the hall's three lenses
 *  @param bearing   newest or oldest first — the only two orders there are
 *  @param seam      null (unset) is lawful, and is the default
 *  @param passerby  optional: hears each told line. Absent = silent. */
export function chart(
	shore: Landfall[],
	ordering: Ordering = 'chronological',
	bearing: Bearing = 'newest',
	seam: Seam | null = null,
	passerby?: Passerby
): Coast {
	const flagged: string[] = [];
	const say = (line: string): void => {
		flagged.push(line);
		if (passerby) passerby(line);
	};

	let by: Ordering = ordering;
	if (ORDERINGS.indexOf(by) === -1) {
		say(`"${String(ordering)}" is not an ordering this coast knows — the four are ${ORDERINGS.join(' · ')}; the coast runs chronological, and there is no ranked order here to fall back to`);
		by = 'chronological';
	}

	let facing: Bearing = bearing;
	if (BEARINGS.indexOf(facing) === -1) {
		say(`"${String(bearing)}" is not a bearing — the only two orders are forward and back through time (${BEARINGS.join(' · ')}); taken as newest`);
		facing = 'newest';
	}

	let held: Seam | null = seam ?? null;
	if (held !== null && SEAMS.indexOf(held) === -1) {
		say(`"${String(seam)}" is not one of the two lawful seams (${SEAMS.join(' · ')}) — the seam stands UNSET, which is a lawful state, and the stroke stays KP's`);
		held = null;
	}
	if (held === null) {
		say("the autoplay seam is UNSET — KP's ⚛ stroke stands open (flow, or swipe-shows-tap-sounds), and this model reports it rather than deciding it");
	} else if (held === 'flow') {
		say('the autoplay seam is declared "flow" — entering the Promenade is pressing play once, a consented listening flow, each advance carrying sound to the next work');
	} else {
		say('the autoplay seam is declared "tap" — swipe shows, tap sounds; every arrival is silent until the reader\'s own tap');
	}

	const declared = shore ?? [];
	if (declared.length === 0) {
		say('no released work was handed in — the coast is empty, and it says so rather than filling itself with something');
	}

	// EVERY STOP IS PLACED BY A DECLARED MOMENT — the hall's own chronon.
	const placed = declared.map((landfall, index) => {
		const group = groupValue(landfall, by);
		if (by !== 'chronological' && group === null) {
			say(`"${landfall.title}" names no ${by} — it is told and STILL STANDS, in the unnamed stretch of the coast; nothing is dropped from a reader's coast for being untidy`);
		}
		let moment: number | null = null;
		let momentFrom: 'released' | 'made' | 'none' = 'none';
		if (isMoment(landfall.releasedAt)) {
			moment = landfall.releasedAt;
			momentFrom = 'released';
		} else if (isMoment(landfall.createdAt)) {
			moment = landfall.createdAt;
			momentFrom = 'made';
			say(`"${landfall.title}" declares no released date — it is placed by its making date, the hall's own rule, and the fallback is told rather than silent`);
		} else {
			say(`"${landfall.title}" declares no moment at all — it is told and STILL STANDS, in the order the realm declared it`);
		}
		return { landfall, index, group, moment, momentFrom };
	});

	const seen: Record<string, number> = {};
	for (const one of placed) {
		const count = Object.prototype.hasOwnProperty.call(seen, one.landfall.id) ? seen[one.landfall.id] + 1 : 1;
		seen[one.landfall.id] = count;
		if (count === 2) say(`release id "${one.landfall.id}" stands on this coast more than once — told, and both still stand; a coast is never quietly deduplicated`);
	}

	// A LENS GROUPS AND NEVER RANKS: stretches stand in the realm's own
	// declared order of first appearance. Nothing is scored, and no
	// stretch is promoted for being larger, newer, or better attended.
	const stretchRank: Record<string, number> = {};
	let stretches = 0;
	for (const one of placed) {
		const key = one.group ?? ' unnamed';
		if (!Object.prototype.hasOwnProperty.call(stretchRank, key)) {
			stretchRank[key] = stretches;
			stretches += 1;
		}
	}
	if (by !== 'chronological') {
		say(`the ${by} lens groups this coast into ${stretches} stretch${stretches === 1 ? '' : 'es'}, standing in the realm's own declared order — A LENS GROUPS AND NEVER RANKS, and inside every stretch the order is time`);
	}

	// THE ORDER IS TIME, THE TIEBREAK IS DECLARATION. The index is
	// unique, so this comparator is a TOTAL ORDER and no engine, key
	// order, or sort stability can disturb it.
	const ordered = [...placed].sort((a, b) => {
		const ra = stretchRank[a.group ?? ' unnamed'];
		const rb = stretchRank[b.group ?? ' unnamed'];
		if (ra !== rb) return ra - rb;
		if (a.moment === null && b.moment !== null) return 1;
		if (a.moment !== null && b.moment === null) return -1;
		if (a.moment !== null && b.moment !== null && a.moment !== b.moment) {
			return facing === 'newest' ? b.moment - a.moment : a.moment - b.moment;
		}
		return a.index - b.index;
	});

	const length = ordered.length;
	const vistas: Vista[] = ordered.map((one, place) => ({
		place,
		of: length,
		id: one.landfall.id,
		title: one.landfall.title,
		form: one.landfall.form,
		group: one.group,
		moment: one.moment,
		momentFrom: one.momentFrom,
		first: place === 0,
		last: place === length - 1,
		landfall: one.landfall,
	}));

	say(`the coast is charted at ${length} stop${length === 1 ? '' : 's'}, ${by} · ${facing} first — AND IT HAS AN END: ${THE_END} The length is known before the first step, nothing here refills, and no stop is ever fetched`);

	return { ordering: by, bearing: facing, seam: held, vistas, length, ending: THE_END, flagged };
}

// ── the walk ─────────────────────────────────────────────────────────

function soundingOnArrival(seam: Seam | null, consented: boolean): Sounding {
	if (seam === null) return 'undecided';
	if (seam === 'flow') return consented ? 'sounding' : 'silent';
	return 'silent'; // tap: an arrival SHOWS, and waits for the reader's own tap
}

function calmly(promenade: Promenade, line: string, passerby?: Passerby): Promenade {
	if (passerby) passerby(line);
	return { ...promenade, flagged: [...promenade.flagged, line] };
}

/** ARRIVE — the reader opens the coast, by their own act.
 *
 *  Under the `flow` seam this act IS the consent: entering the Promenade
 *  is pressing play once. Under `tap` it shows and waits. Under an UNSET
 *  seam the reader stands and sound is `undecided`, which is the honest
 *  report.
 *
 *  @param act  the reader's own declared act. Blank is a calm no. */
export function arrive(coast: Coast, act: string, passerby?: Passerby): Promenade {
	const flagged: string[] = [];
	const say = (line: string): void => {
		flagged.push(line);
		if (passerby) passerby(line);
	};

	const nowhere: Promenade = {
		coast,
		arrived: false,
		place: -1,
		here: null,
		passage: [],
		acts: [],
		atStart: false,
		atEnd: false,
		consented: false,
		sounding: soundingOnArrival(coast.seam, false),
		flagged,
	};

	const declared = declaredAct(act);
	if (declared === null) {
		say('no act was declared — nobody is carried onto this coast, so the reader stands outside it until their own hand opens it');
		return nowhere;
	}
	if (coast.length === 0) {
		say(`the coast is empty, so there is nowhere to stand — told rather than filled. ${THE_END}`);
		return nowhere;
	}

	const consented = coast.seam === 'flow';
	if (consented) {
		say(`the reader arrived by their own act "${declared}" — and under the flow seam entering IS pressing play once, so sound is consented here and carried to every stop after`);
	} else if (coast.seam === 'tap') {
		say(`the reader arrived by their own act "${declared}" — swipe shows and tap sounds, so this stop is shown in silence until their own tap`);
	} else {
		say(`the reader arrived by their own act "${declared}" — the autoplay seam is unset, so whether sound rides along is UNDECIDED here, and that stroke is KP's ⚛ alone`);
	}

	const here = coast.vistas[0];
	say(`the reader stands at stop 1 of ${coast.length} — "${here.title}", full-screen, one release at a time`);

	return {
		coast,
		arrived: true,
		place: 0,
		here,
		passage: [0],
		acts: [declared],
		atStart: true,
		atEnd: coast.length === 1,
		consented,
		sounding: soundingOnArrival(coast.seam, consented),
		flagged,
	};
}

function move(promenade: Promenade, act: string, step: 1 | -1, passerby?: Passerby): Promenade {
	const declared = declaredAct(act);
	if (declared === null) {
		return calmly(promenade, "no act was declared — NOTHING ADVANCES HERE WITHOUT THE READER'S OWN HAND, and no pulse is faster than theirs", passerby);
	}
	if (!promenade.arrived || promenade.here === null) {
		return calmly(promenade, 'the reader has not arrived on this coast — there is nothing to walk on from, and nothing was thrown', passerby);
	}
	if (step === 1 && promenade.place >= promenade.coast.length - 1) {
		return calmly(
			promenade,
			`${THE_END} The reader stands at the last stop and stays there — nothing refills, nothing wraps around, and no next coast is being fetched behind their back`,
			passerby
		);
	}
	if (step === -1 && promenade.place <= 0) {
		return calmly(promenade, 'the coast begins here — the reader stands at the first stop and stays there; it does not wrap around to the end', passerby);
	}

	const place = promenade.place + step;
	const here = promenade.coast.vistas[place];
	const sounding = soundingOnArrival(promenade.coast.seam, promenade.consented);
	const lines: string[] = [];
	lines.push(
		`the reader's own act "${declared}" carried them ${step === 1 ? 'on to' : 'back to'} stop ${place + 1} of ${promenade.coast.length} — "${here.title}"`
	);
	if (promenade.coast.seam === 'flow') lines.push(`the flow carries sound to "${here.title}" — the consent was given once, at entering, by the reader's own hand`);
	else if (promenade.coast.seam === 'tap') lines.push(`"${here.title}" is shown in silence — swipe shows, tap sounds`);
	else lines.push(`whether "${here.title}" sounds is UNDECIDED — the autoplay seam is unset, and this model will not decide it`);
	if (place === promenade.coast.length - 1) lines.push(`this is the last stop on the coast — ${THE_END}`);

	if (passerby) for (const line of lines) passerby(line);

	return {
		...promenade,
		place,
		here,
		passage: [...promenade.passage, place],
		acts: [...promenade.acts, declared],
		atStart: place === 0,
		atEnd: place === promenade.coast.length - 1,
		sounding,
		flagged: [...promenade.flagged, ...lines],
	};
}

/** ONWARD — one stop further along the coast, BY THE READER'S OWN
 *  DECLARED ACT and by nothing else. An act nobody declared does not
 *  happen; the last stop is the last stop, and saying so is the whole
 *  refusal of the endless feed. */
export function onward(promenade: Promenade, act: string, passerby?: Passerby): Promenade {
	return move(promenade, act, 1, passerby);
}

/** BACK — one stop the way they came, likewise by their own act. A
 *  promenade is walked in both directions; it never wraps. */
export function back(promenade: Promenade, act: string, passerby?: Passerby): Promenade {
	return move(promenade, act, -1, passerby);
}

/** TAP — the seam's own verb, under the `tap` mode: swipe shows, tap
 *  sounds.
 *
 *  Under `flow` the consent was already given once, at entering, and a
 *  tap changes nothing — said plainly rather than silently ignored.
 *  UNDER AN UNSET SEAM THIS IS A CALM NO: the model will not decide
 *  whether a tap sounds.
 *
 *  It plays nothing. It cannot: there is no DOM here, no audio, no
 *  device. It reports what the reader's act MEANS for sound, and the
 *  realm does the rest. */
export function tap(promenade: Promenade, act: string, passerby?: Passerby): Promenade {
	const declared = declaredAct(act);
	if (declared === null) {
		return calmly(promenade, 'no act was declared — a tap is an act too, and this model sounds nothing on its own', passerby);
	}
	if (!promenade.arrived || promenade.here === null) {
		return calmly(promenade, 'the reader has not arrived on this coast — there is nothing standing here to sound', passerby);
	}
	if (promenade.coast.seam === null) {
		return calmly(
			promenade,
			"the autoplay seam is UNSET, so this model will not decide whether a tap sounds — the stroke is KP's ⚛ alone (flow, or swipe-shows-tap-sounds), and an unset seam is a lawful state, not a fault",
			passerby
		);
	}
	if (promenade.coast.seam === 'flow') {
		return calmly(promenade, `the flow already carries sound to "${promenade.here.title}" — the consent was given once at entering, so this tap changes nothing`, passerby);
	}
	const line = `the reader's own tap sounds "${promenade.here.title}" — swipe shows, tap sounds, and the sounding is theirs to start`;
	if (passerby) passerby(line);
	return { ...promenade, sounding: 'sounding', flagged: [...promenade.flagged, line] };
}

/** RECOUNT — the whole passage read aloud in plain words: the coast and its
 *  end, where the reader stands, the passage their own acts made, what sound
 *  is doing, and every told truth. Returned as lines; printing them is the
 *  consumer's act, never this water's. */
export function recount(promenade: Promenade): string[] {
	const lines: string[] = [];
	const coast = promenade.coast;
	lines.push(`a coast of ${coast.length} stop${coast.length === 1 ? '' : 's'}, ${coast.ordering} · ${coast.bearing} first, seam ${coast.seam ?? "unset — KP's ⚛ stroke"}`);
	for (const vista of coast.vistas) {
		const standing = promenade.place === vista.place ? '▸' : ' ';
		const stretch = vista.group === null ? '' : `  [${vista.group}]`;
		const moment = vista.moment === null ? 'no declared moment' : `${vista.moment} (${vista.momentFrom})`;
		lines.push(`  ${standing} ${vista.place + 1} of ${vista.of}  ${vista.title} — ${vista.form}${stretch}  ·  ${moment}`);
	}
	lines.push(`  the ending: ${coast.ending}`);
	if (!promenade.arrived) lines.push('  the reader has not arrived — nobody is carried onto a promenade');
	else {
		lines.push(`  the reader stands at stop ${promenade.place + 1} of ${coast.length}${promenade.atEnd ? ' — the last' : ''}, and sound is ${promenade.sounding}`);
		lines.push(`  the passage, all their own: ${promenade.passage.map((p) => p + 1).join(' → ')}`);
		lines.push(`  the acts that made it: ${promenade.acts.join(' · ')}`);
	}
	for (const told of promenade.flagged) lines.push(`  told: ${told}`);
	return lines;
}
