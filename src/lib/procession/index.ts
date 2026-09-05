// THE PROCESSION — the corridor of rooms, pure.
//
// A procession is rooms walked one after another at the walker's own pace.
// Not a grid ("choose quickly"), not a carousel ("keep moving"): a
// procession says "dwell here." Sections become decks; within a deck the
// room in view comes to rest at the CENTRE of the view, and the rooms
// already walked lift UPWARD above it — smaller, dimmer, still there, a
// pile that peeks over the shoulder of the room you are reading — until
// the deck is complete and the corridor holds a breath before the next.
//
// THE NAME IS KP's ⚛ OWN — "procession is a better name" (2026-09-03,
// Heron's sitting) — and it lives in exactly two places: TOOL_NAME below,
// and the folder. A rename is one edit and one `git mv`.
//
// This water owns the SHAPE and the NUMBERS: which room stands where, what
// numeral it wears, where the one anchor sits, how high a settled card
// lifts, how much it shrinks and dims, when a deck is complete. The DRESS —
// pixels, sticky positioning, scroll listeners, images, colour — is the
// consumer's, every time. No DOM, no CSS, no framework, no clock, no disk,
// no network, zero imports. Nothing throws.

// ── THE LAWS, AS DATA ───────────────────────────────────────────────────

/** One law of this water, and the reason beside it. */
export interface Law {
	law: string;
	because: string;
}

export const TOOL_NAME = 'the-procession';

/** KP's ⚛ words this water answers, verbatim, with their addresses. */
export const THE_WORD =
	'once it is a standalone tool in awen, resonance-awen will become its first consumer and we will use the awen table from the knowledge base to map the cards to live data';
export const THE_WORD_AT = 'KP ⚛ 2026-09-03 · Heron’s sitting (Fable, claude-fable-5-1)';
export const THE_NAME_WORD = 'procession is a better name';
export const THE_NAME_WORD_AT = 'KP ⚛ 2026-09-03 · the same sitting, on the working name the-gallery-deck';

/** The pattern this water carries, and where it was written down. */
export const THE_PATTERN_AT =
	'resonance-chamber/desk/DESIGN-PATTERN-Sanctuary-Gallery.md — "THE PROCESSION OF ROOMS", translated by Kimi 2026-09-01 from the Weaver’s amazement';

/** What the house held before this water, checked 2026-09-03: nothing of
 *  this shape. Kept as data so the claim carries its own reason. */
export const NOTHING_STOOD =
	'Swept 2026-09-03: the-gallery derives cards from rows and searches them; the-promenade walks one vista at a time by the reader’s explicit act; the-epagoge leads a walker in. No water modelled a corridor of pinned decks with a dwell. The Sovereign Library, by title: procession, deck (bare), sticky, pin, corridor, dwell — absent.';

export const THE_LAWS: readonly Law[] = [
	{
		law: 'No pagination, no filtering, no ranking. The corridor is continuous and the order is the consumer’s declaration.',
		because: 'A grid says "choose quickly." A carousel says "keep moving." A procession says "dwell here." Rooms ride in the order they were handed in; a rank, a play count or a score riding on a room is never read.',
	},
	{
		law: 'The corridor cannot see the reader.',
		because: 'procession() takes rooms and geometry and nothing else — no reader, no passage, no history, no profile. The same rooms come back byte-identical every time, and the rooms handed in are never touched.',
	},
	{
		law: 'Every advance is the reader’s own scroll. Nothing here moves by itself.',
		because: 'There is no timer, no autoplay and no auto-advance verb in this water. It answers questions about where things stand; it never moves anything.',
	},
	{
		law: 'An absence is honest: a room without a window keeps its sigil.',
		because: 'A missing image is not an error and not a placeholder to apologise for — the sigil is the room’s own face until a window is hung.',
	},
	{
		law: 'Motion is derived, never imposed. Under reduced motion the pile is identity.',
		because: 'The lift, the shrink and the dim are numbers this water derives from coverage; when the reader has asked for less motion, pile() returns lift 0, scale 1 and brightness 1 and the corridor is the same corridor, still.',
	},
	{
		law: 'The room in view comes to rest at the centre of the view; the settled rooms peek above it, never push it down.',
		because: 'KP ⚛ 2026-09-03: "we should push the ’stacked’ part upward instead of live data downwards" — and "so the card in view always comes to rest at center of screen." One anchor is shared by every card in a deck; the pile grows upward from it, capped at pileMax, so a deck of twenty reads exactly like a deck of three and no card is ever pushed off the bottom.',
	},
	{
		law: 'Every room is a landmark.',
		because: 'Each card carries role "region" and an accessible name built from its label and its room’s name, so a keyboard and a screen reader walk the corridor room by room.',
	},
	{
		law: 'The dress owns every pixel.',
		because: 'This water emits numbers and words — the anchor, coverage, lift, scale, brightness, numerals, labels. No CSS, no DOM, no framework, no colour of its own.',
	},
	{
		law: 'No clock, no randomness, no disk, no network, no host global, zero imports. Nothing throws.',
		because: 'The same corridor derives the same way forever, and a shape model has no business touching anything of yours.',
	},
];

// ── THE ROOMS, AS HANDED IN ─────────────────────────────────────────────

/** One room of the procession. Every field but `id` and `name` is optional;
 *  unknown keys ride whole and are never read. */
export interface Room {
	id: string;
	/** The room’s moniker — the large name. */
	name: string;
	/** The line — its family, its type. Shown under the name. */
	line?: string | null;
	/** The story — what it is, why it matters. */
	story?: string | null;
	/** More, behind a fold the dress may offer. */
	more?: string | null;
	/** The sigil that brings the face when no window hangs. */
	sigil?: string | null;
	/** An accent the dress may lean on. Not read here. */
	hue?: string | null;
	/** An explicit window — always wins over a matched one. */
	image?: string | null;
	/** Lit or asleep. */
	lamp?: 'lit' | 'asleep' | null;
	/** Who built it. */
	builder?: string | null;
	/** Where it lives — the door the room opens, if the dress opens doors. */
	address?: string | null;
	/** What built it, never what defines it. */
	tools?: readonly string[] | null;
	/** A catalogue number, for artifacts. */
	catalog?: string | null;
	[k: string]: unknown;
}

/** One section of the corridor — it becomes one deck. */
export interface Section {
	id: string;
	title: string;
	/** The breath between sections, spoken under the title. */
	pause?: string | null;
	rooms: readonly Room[];
}

// ── THE GEOMETRY, AS NUMBERS ────────────────────────────────────────────

/** The corridor’s measures. Pixels where named px; viewport-heights where
 *  named vh; ratios where a fraction. All of it the consumer’s to override. */
export interface Geometry {
	/** px each settled card peeks above the card on top of it — the pile’s step, upward. */
	step: number;
	/** how many settled cards stay visible above; deeper ones stand behind at the same lift. */
	pileMax: number;
	/** px kept clear above the pile so its top card is never cut by the scroller’s edge. */
	pileMargin: number;
	/** vh a card stands tall at; the anchor centres it. */
	cardVh: number;
	/** vh of scroll room between one card and the next. */
	spacerVh: number;
	/** vh of scroll room after the last card — the dwell. */
	dwellVh: number;
	/** a settled card’s scale drops by this per level of the pile (levels capped at pileMax). */
	shrink: number;
	/** a settled card’s brightness drops by this per level (capped). */
	dim: number;
	/** px of slack when asking whether the last card has settled. */
	settleTolerance: number;
}

export const GEOMETRY_DEFAULT: Readonly<Geometry> = {
	step: 18,
	pileMax: 4,
	pileMargin: 16,
	cardVh: 62,
	spacerVh: 52,
	dwellVh: 70,
	shrink: 0.05,
	dim: 0.15,
	settleTolerance: 2,
};

function isFiniteNumber(x: unknown): x is number {
	return typeof x === 'number' && x === x && x !== Infinity && x !== -Infinity;
}

function finiteAtLeastZero(x: unknown): x is number {
	return isFiniteNumber(x) && x >= 0;
}

// No Math here by law; the greater and the lesser are one comparison each,
// written so a value that is not a number falls back to the first argument
// rather than poisoning the answer.
function greater(a: number, b: number): number {
	return b > a ? b : a;
}
function lesser(a: number, b: number): number {
	return b < a ? b : a;
}

/** Anything folded into 0..1; what is not a number at all is 0. */
function clamp01(x: unknown): number {
	if (!isFiniteNumber(x)) return 0;
	return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** A geometry merged over the default. A value that is not a finite number
 *  at or above zero is told and the default stands in its place. */
export function geometryOf(partial?: Partial<Geometry> | null, told?: string[]): Geometry {
	const g: Geometry = { ...GEOMETRY_DEFAULT };
	if (!partial || typeof partial !== 'object') return g;
	for (const key of Object.keys(GEOMETRY_DEFAULT) as (keyof Geometry)[]) {
		const v = (partial as Record<string, unknown>)[key];
		if (v === undefined) continue;
		if (finiteAtLeastZero(v)) g[key] = v;
		else told?.push('geometry.' + key + ' was not a finite number at or above zero; the default ' + GEOMETRY_DEFAULT[key] + ' stands.');
	}
	return g;
}

// ── THE NUMBERS ─────────────────────────────────────────────────────────

const ROMAN: readonly [number, string][] = [
	[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
	[50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** The room’s numeral in its deck — Roman for 1..3999, its own digits
 *  otherwise. Birth order, not rank. */
export function numeral(n: number): string {
	if (!(typeof n === 'number' && n === n) || n < 1 || n > 3999 || n !== Math_floor(n)) return String(n);
	let out = '';
	let rest = n;
	for (const [value, glyph] of ROMAN) {
		while (rest >= value) {
			out += glyph;
			rest -= value;
		}
	}
	return out;
}

// No Math here by law; the floor a numeral needs is one line of arithmetic.
function Math_floor(x: number): number {
	return x - (x % 1);
}

/** How tall a card stands, in px, for a viewport of this height. */
export function cardHeight(viewportHeight: number, g: Geometry = GEOMETRY_DEFAULT): number {
	if (!isFiniteNumber(viewportHeight)) return 0;
	return (viewportHeight * g.cardVh) / 100;
}

/** THE ONE ANCHOR every card of a deck shares, in px from the scroller’s
 *  top: the card in view comes to rest at the CENTRE of the view — but
 *  never so high that the pile lifting above it would be cut by the edge. */
export function anchorTop(viewportHeight: number, g: Geometry = GEOMETRY_DEFAULT): number {
	const floor = g.pileMax * g.step + g.pileMargin;
	const centred = (viewportHeight - cardHeight(viewportHeight, g)) / 2;
	return greater(floor, centred);
}

/** How far the NEXT card has covered this one: 0 while the next card’s top
 *  is still at or below the bottom of the view, 1 once it has reached the
 *  anchor. Clamped; a number that is not a number gives 0. */
export function coverage(nextTop: number, viewportHeight: number, anchor: number): number {
	if (!isFiniteNumber(nextTop) || !isFiniteNumber(viewportHeight) || !isFiniteNumber(anchor)) return 0;
	const room = viewportHeight - anchor;
	if (!(room > 0)) return 1;
	const cov = (viewportHeight - nextTop) / room;
	return cov < 0 ? 0 : cov > 1 ? 1 : cov;
}

/** How many cards have settled on top of the i-th card — fractionally, so
 *  the pile grows as the reader scrolls rather than jumping. `covs[m]` is
 *  the coverage of card m by card m+1, so a deck of n cards has n−1 of
 *  them. An i past the end is 0; an i below zero counts the whole deck. */
export function level(covs: readonly number[], i: number): number {
	if (!Array.isArray(covs)) return 0;
	const from = isFiniteNumber(i) && i > 0 ? Math_floor(i) : 0;
	let sum = 0;
	for (let m = from; m < covs.length; m += 1) sum += clamp01(covs[m]);
	return sum;
}

/** What a settled card does: it LIFTS upward off the anchor, one step per
 *  level, and shrinks and dims with it — capped at pileMax so a deck of
 *  twenty reads like a deck of three. Under reduced motion: identity. */
export function pile(
	level: number,
	g: Geometry = GEOMETRY_DEFAULT,
	reducedMotion = false
): { lift: number; scale: number; brightness: number } {
	if (reducedMotion) return { lift: 0, scale: 1, brightness: 1 };
	const L = lesser(greater(0, level), g.pileMax);
	return { lift: -g.step * L, scale: 1 - g.shrink * L, brightness: 1 - g.dim * L };
}

/** Whether a deck’s last card has settled onto the anchor — the deck is
 *  complete, and the dwell may show. */
export function isSettled(lastTop: number, anchor: number, g: Geometry = GEOMETRY_DEFAULT): boolean {
	return lastTop <= anchor + g.settleTolerance;
}

/** Where the dwell marker sits, in px from the scroller’s top: just under
 *  the foot of a card resting at the anchor. */
export function dwellMarkerTop(viewportHeight: number, g: Geometry = GEOMETRY_DEFAULT): number {
	return anchorTop(viewportHeight, g) + cardHeight(viewportHeight, g) + 20;
}

// ── THE WINDOWS ─────────────────────────────────────────────────────────

/** A name folded to a slug: lower-case, the extension dropped, runs of
 *  anything else collapsed to one hyphen. */
export function slug(s: string): string {
	return String(s)
		.toLowerCase()
		.replace(/\.[a-z0-9]+$/, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/** The window a room shows, or null. An explicit `image` always wins.
 *  Otherwise the first of the given file names whose slug equals the
 *  room’s, or is a prefix of it, or has it as a prefix (three letters or
 *  more, so “a” matches nothing). No match is null — the sigil stands.
 *  A room that is not a room, or a list that is not a list, is null. */
export function windowFor(
	room: Pick<Room, 'name' | 'image'> | null | undefined,
	windows: readonly string[] = []
): string | null {
	if (!room || typeof room !== 'object') return null;
	const image = (room as { image?: unknown }).image;
	if (typeof image === 'string' && image.length > 0) return image;
	const name = (room as { name?: unknown }).name;
	const want = typeof name === 'string' ? slug(name) : '';
	if (!want) return null;
	if (!Array.isArray(windows)) return null;
	for (const path of windows) {
		const file = slug(String(path).split('/').pop() ?? '');
		if (
			file === want ||
			(file.length > 2 && want.startsWith(file)) ||
			(want.length > 2 && file.startsWith(want))
		) {
			return path;
		}
	}
	return null;
}

// ── THE CORRIDOR, DERIVED ───────────────────────────────────────────────

/** One room, placed. */
export interface Card {
	room: Room;
	/** 0-based place in its deck. */
	index: number;
	/** Its numeral in the deck: I, II, III … */
	numeral: string;
	/** “Room III” — the kind label and the numeral. */
	label: string;
	/** The landmark a dress must make of it. */
	landmark: { role: 'region'; name: string };
	/** Stacking order — later cards over earlier. */
	zIndex: number;
	/** The window it shows, or null. */
	window: string | null;
	/** True when no window hangs and the sigil is the face. */
	sigilStands: boolean;
}

/** One section, become a deck. Every card shares the deck’s one anchor —
 *  ask anchorTop(viewportHeight) for it; the water knows no per-card top. */
export interface Deck {
	section: Section;
	/** 1-based place in the corridor. */
	ordinal: number;
	cards: Card[];
	length: number;
}

export interface Corridor {
	decks: Deck[];
	geometry: Geometry;
	/** Rooms in the whole corridor. */
	length: number;
	/** Every absence and every fallback, said out loud. Empty when clean. */
	told: string[];
}

export interface ProcessionOptions {
	geometry?: Partial<Geometry> | null;
	/** File names (or paths) the dress can hang as windows; matched by slug. */
	windows?: readonly string[];
	/** The word before the numeral. “Room” unless the consumer says. */
	kindLabel?: (room: Room) => string;
}

const UNNAMED = '(unnamed)';

/**
 * The corridor, derived: sections into decks, rooms into cards, every card
 * numbered, labelled and made a landmark. Order in is order out. The
 * corridor cannot see the reader: rooms and geometry in, numbers and words
 * out, and the rooms handed in are never touched. Nothing throws: a thing
 * that is not a room is skipped and told, and the walk goes on.
 */
export function procession(sections: readonly Section[] | null | undefined, opts?: ProcessionOptions): Corridor {
	const told: string[] = [];
	const geometry = geometryOf(opts?.geometry, told);

	const rawWindows: unknown = opts ? (opts as { windows?: unknown }).windows : undefined;
	let windows: readonly string[] = [];
	if (rawWindows === undefined || rawWindows === null) {
		windows = [];
	} else if (Array.isArray(rawWindows)) {
		windows = rawWindows as readonly string[];
	} else {
		told.push('windows was not a list of file names; no window is hung from it.');
	}

	const rawKind: unknown = opts ? (opts as { kindLabel?: unknown }).kindLabel : undefined;
	let kindOf: (room: Room) => string = () => 'Room';
	if (rawKind !== undefined && rawKind !== null) {
		if (typeof rawKind === 'function') kindOf = rawKind as (room: Room) => string;
		else told.push('kindLabel was not a function; the word “Room” stands.');
	}

	if (!Array.isArray(sections)) {
		told.push('no sections were handed in; the corridor stands empty.');
		return { decks: [], geometry, length: 0, told };
	}

	const decks: Deck[] = [];
	let length = 0;
	sections.forEach((section, si) => {
		if (!section || typeof section !== 'object') {
			told.push('section ' + (si + 1) + ' was not a section; skipped.');
			return;
		}
		const s = section as { title?: unknown; id?: unknown; rooms?: unknown };
		const named = String(s.title ?? s.id ?? si + 1);

		let handed: readonly unknown[] = [];
		if (s.rooms === undefined || s.rooms === null) {
			told.push('the deck “' + named + '” stands empty.');
		} else if (Array.isArray(s.rooms)) {
			handed = s.rooms as readonly unknown[];
			if (handed.length === 0) told.push('the deck “' + named + '” stands empty.');
		} else {
			told.push('rooms of ' + named + ' was not a list; the deck stands empty.');
		}

		const kept: Room[] = [];
		handed.forEach((entry, ri) => {
			if (!entry || typeof entry !== 'object') {
				told.push('room ' + (ri + 1) + ' of deck ' + named + ' was not a room; skipped.');
				return;
			}
			kept.push(entry as Room);
		});

		const cards: Card[] = kept.map((room, i) => {
			const rawName = (room as { name?: unknown }).name;
			const hasName = typeof rawName === 'string' && rawName.length > 0;
			if (!hasName) {
				told.push('room ' + (i + 1) + ' of deck ' + named + ' has no name; it is shown as “' + UNNAMED + '”.');
			}
			const shown = hasName ? rawName : UNNAMED;
			const kind = kindOf(room);
			const word = typeof kind === 'string' && kind.length > 0 ? kind : 'Room';
			const label = word + ' ' + numeral(i + 1);
			const window = windowFor(room, windows);
			if (!window && !room.sigil) told.push('“' + shown + '” has neither a window nor a sigil; the dress will show its name alone.');
			return {
				room,
				index: i,
				numeral: numeral(i + 1),
				label,
				landmark: { role: 'region' as const, name: label + ' — ' + shown },
				zIndex: i + 1,
				window,
				sigilStands: window === null,
			};
		});
		length += cards.length;
		decks.push({
			section: section as Section,
			ordinal: si + 1,
			cards,
			length: cards.length,
		});
	});

	return { decks, geometry, length, told };
}

/** The corridor read aloud, in plain words. Nothing handed in reads as
 *  nothing at all — never as a throw. */
export function recount(c: Corridor | null | undefined): string {
	const ok = !!c && typeof c === 'object';
	const decks = ok && Array.isArray(c.decks) ? c.decks.length : 0;
	const rooms = ok && isFiniteNumber(c.length) ? c.length : 0;
	const toldCount = ok && Array.isArray(c.told) ? c.told.length : 0;
	return (
		decks + (decks === 1 ? ' deck' : ' decks') + ' · ' +
		rooms + (rooms === 1 ? ' room' : ' rooms') +
		' · walked at the reader’s own pace, in the order they were given' +
		(toldCount ? ' · ' + toldCount + ' told' : '') + '.'
	);
}
