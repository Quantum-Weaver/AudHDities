// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   A DRAWN BUCKET — not a fork.                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// HOME: resonance-awen/tools/the-learscail  (the spring holds the canonical
// standalone form; this file is an IN-USE SITE, never an extraction).
//
// THE RE-HOMING LAW, KP's ⚛ correction 2026-08-01, verbatim (spelling kept):
//   "home as standalone tool does not = extracted from either app, only
//    indexed as in use in these apps and home listed as awen"
//
// So: never edited here. A change wanted is a change made AT THE SPRING and
// re-drawn into this file — heal by re-copying, exactly as the generated
// layer is healed by regenerating. The first spring→app crossing on the
// street, at KP's ⚛ ruling this sitting (2026-08-11): the core is carried
// in-repo because Vercel builds this repo alone and a sibling-path
// dependency would not survive the deploy.
//
// Proofs live at the spring: `npm run prove` — 29/29 TRUE, whose fixture is
// this very app's navigation.
//
// ─────────────────────────────────────────────────────────────────────────
// LÉARSCÁIL — the map, made generatable: tell it how many sections and how
// they group, and it lays out the provinces that fill a space. The drawing
// is bound to the lattice, never to pixels; regions are discoverable, and
// clickable once discovered.
//
// NAMED BY KP ⚛ 2026-08-11, his naming gate, his own gloss verbatim:
// "Léarscáil (Irish): Literally translates to a 'clear' or 'careful image'
// of the landscape." The name is the specification, in the spring's own
// tradition (Awen's README: "the name is the specification") — an anxious
// nav is an UNCLEAR image of the landscape, and the cure is named in the
// word. Irish is already native to this street: Fáilte stands as the second
// of the Three Words (Velkomin · Fáilte · Gweld ti'n fuan).
//
// Named a need by KP ⚛ the same sitting, verbatim: "there is a stand alone tool
// we need and do not have, an interactive map that opens like a scroll and
// has sections drawn like a midevil map that are both discoverable and
// clickable once discovered" — and sharpened the same breath: "basicallu a
// graphic i can have drawn to fill the spae with a spacified grouping and
// number of sections dynamic input accepted, thata turns a drawing into a
// map that we use."
//
// WHY IT EXISTS, his reason, verbatim: "our nav is huge" · "this was the
// plan to make it less anxious." AudHDities carries ~76 destinations across
// nine realms in one drawer. A wall of links is an anxiety surface for the
// minds this house is for. A map is a PLACE, and a place is walked.
//
// DISPLACEMENT-CLASS, inherited whole from its sibling the-cadastre and so
// from KP's ⚛ own math (the displacement teaching, 2026-08-06): "the
// variables were not the coordinates, but the distance from the points
// between 2 coordinates, applied to direction rather than position." The
// register stores GROUPING, SECTION COUNTS, and per-vertex displacement —
// never a position. The extent handed to unfurl() is APPEARANCE, stored
// nowhere: the same mappa fills a phone or a wall and no truth changes.
// That is what lets a drawn graphic stay valid at any size.
//
// THE LAWS (each one from the E4 play study's synthesis, 2026-07-31,
// `resonance-chamber/desk/records/fable-lanes/study/e4-the-play-study-bus.md`):
//   · SHAPE WITHOUT SLOTS (law III, the register law) — an undiscovered
//     province keeps its SHAPE on the map. It is drawn, unnamed: terra
//     incognita, not a hole where a thing should be. The interface never
//     performs the subtraction.
//   · NO AMBIENT COUNT (law III) — the mappa refuses to emit "3 of 11
//     discovered." mayCount() is that refusal in code, answered before
//     anything counts, the way the cadastre answers mayMove() at the drag
//     source. Extent at the ask; pressure never ambient.
//   · WHAT OPENS, KEEPS (law II) — discovery never expires, never decays,
//     never resets. There is no forget verb. The vessel's own purge is the
//     one hand that clears, and it clears wholly (the street's purge law).
//   · INVITATION WITHOUT ACCOUNT (law VI) — no province is ever assigned,
//     required, or ordered. Discovery is the vessel's own act.
//   · THE SOVEREIGNTY RIDER (E4b's returning knife) — "metaphor never
//     obscures the exit." A province marked alwaysOpen is never hidden by
//     any lens: the hearth, the way out, the consent and purge doors. And
//     plainList() renders the same truth in words, always available, so the
//     map is a lens and never the admission ticket (law VIII, the blending
//     principle: no register is the admission ticket).
//   · ONLY YOUR OWN — no vessel discovers on another's behalf.
//   · Unknown keys ride whole; troubles are told, never thrown at data.
//
// LIBRARY CHECKED BEFORE BUILDING (2026-08-11, this sitting, against
// resonance-library index + taxonomy): `Léarscáil` · `Learscail` · `Mappa` ·
// `Province` · `Unfurl` · `March` · `Coastline` · `Portolan` · `Partition` ·
// `Cartograph` ALL genuinely absent — spoken here first. `Map` is TAKEN (12
// standings), `Domain` TAKEN (10), `Realm` (4) — honored from outside: this
// water speaks léarscáil words and never the bare names, exactly as the
// cadastre spoke lattice words and never `Grid`.
//
// STANDALONE BY LAW: framework-free, zero imports, pure functions — no
// clock, no disk, no drawing, no randomness (every displacement is a
// deterministic hash, so the same mappa is the same map forever, which is
// what makes a commissioned drawing safe to bind).

/** One group as the caller declares it: a name and how many sections it holds. */
export interface GroupSpec {
	group: string;
	sections: number;
	/** Never hidden by discovery — the hearth, the exits, the sovereignty doors. */
	alwaysOpen?: boolean;
	[key: string]: unknown;
}

/** A lattice cell address — "B2": bijective column letters, 1-based row. */
export type SectionAddress = string;

/** The mappa's truth: grouping, lattice extent, and the displacement seed. */
export interface MappaFormula {
	class: 'displacement';
	groups: GroupSpec[];
	extent: { cols: number; rows: number };
	/** How far a vertex may wander, as a fraction of a cell. 0 = plain lattice. */
	wander: number;
	seed: number;
	[key: string]: unknown;
}

/** The register itself — the whole truth of a mappa, position-free. */
export interface Mappa {
	mappa: number;
	formula: MappaFormula;
	/** Province names this vessel has discovered. Append-only by law. */
	discovered: string[];
	[key: string]: unknown;
}

/** A point in appearance-space, derived at unfurl time. */
export interface Point {
	x: number;
	y: number;
}

/** One section, placed. Derived appearance, never truth. */
export interface PlacedSection {
	section: SectionAddress;
	group: string;
	col: number;
	row: number;
	polygon: Point[];
	center: Point;
}

/** One province, placed — a group's contiguous ground, outlined. */
export interface PlacedProvince {
	group: string;
	/** False until this vessel's own act discovers it. Shape stands either way. */
	discovered: boolean;
	alwaysOpen: boolean;
	sections: PlacedSection[];
	/** The outline of the whole province — the coastline the artist draws to. */
	outline: Point[];
	center: Point;
}

/** A mappa unfurled against an extent — the scroll opened. */
export interface UnfurledMappa {
	width: number;
	height: number;
	provinces: PlacedProvince[];
	/** Lattice cells belonging to no group — honest borderland, drawn as wild. */
	marches: PlacedSection[];
}

export const MAPPA_VERSION = 1;

const round6 = (v: number): number => Math.round(v * 1e6) / 1e6;

// ── address arithmetic (the cadastre's dialect, kept so the two waters
//    can be read by one pair of eyes) ─────────────────────────────────

/** Column letters, bijective base-26: 0→A, 25→Z, 26→AA. Row is 1-based. */
export function formatSection(col: number, row: number): SectionAddress {
	let letters = '';
	for (let n = col + 1; n > 0; n = Math.floor((n - 1) / 26)) {
		letters = String.fromCharCode(65 + ((n - 1) % 26)) + letters;
	}
	return `${letters}${row + 1}`;
}

/** "B2" → { col: 1, row: 1 }. Between addresses is null, never a throw. */
export function parseSection(address: SectionAddress): { col: number; row: number } | null {
	const m = /^([A-Z]+)(\d+)$/.exec(String(address).trim().toUpperCase());
	if (!m) return null;
	let col = 0;
	for (const ch of m[1]) col = col * 26 + (ch.charCodeAt(0) - 64);
	const row = Number(m[2]);
	if (!Number.isFinite(row) || row < 1) return null;
	return { col: col - 1, row: row - 1 };
}

// ── the deterministic wander ────────────────────────────────────────

/**
 * A vertex's displacement — a pure hash, never a clock and never a random.
 * The same mappa yields the same coastline forever, which is the whole
 * reason a commissioned drawing can be trusted to keep fitting.
 */
function wanderAt(vx: number, vy: number, seed: number): { dx: number; dy: number } {
	// xorshift-ish integer mixing; two draws from one hash.
	let h = (vx * 374761393 + vy * 668265263 + seed * 2246822519) | 0;
	h = (h ^ (h >>> 13)) | 0;
	h = Math.imul(h, 1274126177) | 0;
	h = (h ^ (h >>> 16)) | 0;
	const a = ((h >>> 0) % 2003) / 2003 - 0.5;
	let g = Math.imul(h ^ 0x5f356495, 2654435761) | 0;
	g = (g ^ (g >>> 15)) | 0;
	const b = ((g >>> 0) % 2003) / 2003 - 0.5;
	return { dx: a * 2, dy: b * 2 }; // each in (−1, 1)
}

// ── surveying: grouping + counts → the lattice ──────────────────────

/**
 * THE GENERATOR, and KP's ⚛ own sentence made a function: "a spacified
 * grouping and number of sections dynamic input accepted."
 *
 * Sections are laid serpentine (boustrophedon) so every group's ground is
 * CONTIGUOUS by construction — the last cell of a row touches the first
 * cell of the next, so a group that wraps a row is still one landmass.
 * Leftover cells become marches: honest wild borderland, never a hole.
 */
export function surveyMappa(
	groups: ReadonlyArray<GroupSpec>,
	options?: { wander?: number; seed?: number; cols?: number }
): MappaFormula {
	const clean: GroupSpec[] = [];
	for (const g of groups || []) {
		if (!g || typeof g.group !== 'string' || !g.group.trim()) continue;
		const sections = Math.max(1, Math.floor(Number(g.sections) || 1));
		clean.push({ ...g, group: g.group.trim(), sections });
	}
	const total = clean.reduce((sum, g) => sum + g.sections, 0);
	const cols = Math.max(1, Math.floor(options?.cols ?? Math.ceil(Math.sqrt(Math.max(1, total)))));
	const rows = Math.max(1, Math.ceil(Math.max(1, total) / cols));
	const wander = Math.min(0.45, Math.max(0, options?.wander ?? 0.22));
	const seed = Math.floor(options?.seed ?? 1);
	return { class: 'displacement', groups: clean, extent: { cols, rows }, wander, seed };
}

/** The register, born from a formula. Nothing is discovered at birth. */
export function makeMappa(formula: MappaFormula): Mappa {
	return { mappa: MAPPA_VERSION, formula, discovered: [] };
}

/** Serialize whole — unknown keys ride (the erasure law). */
export function serializeMappa(mappa: Mappa): string {
	return JSON.stringify(mappa, null, '\t');
}

/** Parse; troubles are told, never thrown at data. */
export function parseMappa(text: string): { mappa: Mappa | null; trouble: string | null } {
	let raw: unknown;
	try {
		raw = JSON.parse(text);
	} catch {
		return { mappa: null, trouble: 'That is not JSON; nothing was read.' };
	}
	const r = raw as Partial<Mappa>;
	if (!r || typeof r !== 'object' || !r.formula) {
		return { mappa: null, trouble: 'No formula stands in that text; nothing was read.' };
	}
	const discovered = Array.isArray(r.discovered) ? r.discovered.filter((d) => typeof d === 'string') : [];
	return { mappa: { ...(r as Mappa), mappa: r.mappa ?? MAPPA_VERSION, discovered }, trouble: null };
}

// ── THE CARVE — how ground is apportioned ───────────────────────────
//
// A recursive binary partition, and the reason it is not something simpler:
// the first cut of this water laid groups out serpentine, which kept every
// province contiguous but made them all WIDE HORIZONTAL BANDS — the map read
// as geological strata rather than as countries. Seen and corrected the same
// sitting (2026-08-11) against the rendered map itself, which is the only
// honest way to judge a drawing.
//
// The carve: split the groups into two halves of near-equal weight, cut the
// REGION along its longer axis at exactly the boundary those weights ask
// for, recurse. Because the cut is exact-by-count rather than exact-by-line,
// the boundary may be ragged by one cell — which is precisely what keeps
// section counts EXACT while the shapes stay blocky. Sorting along the cut
// axis and taking a prefix is what keeps each half contiguous.
//
// Surplus lattice cells ride as a synthetic march group, so the wild
// borderland is carved as compactly as any country instead of being
// scattered leftovers.

interface Cell {
	col: number;
	row: number;
}

const cellKey = (c: Cell) => `${c.col},${c.row}`;

function carve(cells: Cell[], groups: GroupSpec[], out: Map<string, GroupSpec>): void {
	if (groups.length === 0 || cells.length === 0) return;
	if (groups.length === 1) {
		for (const c of cells) out.set(cellKey(c), groups[0]);
		return;
	}

	// Halve the groups by weight — the split that keeps both sides chunky.
	const total = groups.reduce((s, g) => s + g.sections, 0);
	let acc = 0;
	let k = 0;
	while (k < groups.length - 1 && acc + groups[k].sections < total / 2) {
		acc += groups[k].sections;
		k += 1;
	}
	k = Math.max(1, Math.min(groups.length - 1, k + 1));
	const left = groups.slice(0, k);
	const right = groups.slice(k);
	const weightLeft = left.reduce((s, g) => s + g.sections, 0);

	// Cut across the region's longer axis, so halves stay near-square.
	let minCol = Infinity;
	let maxCol = -Infinity;
	let minRow = Infinity;
	let maxRow = -Infinity;
	for (const c of cells) {
		if (c.col < minCol) minCol = c.col;
		if (c.col > maxCol) maxCol = c.col;
		if (c.row < minRow) minRow = c.row;
		if (c.row > maxRow) maxRow = c.row;
	}
	const cutDownTheColumns = maxCol - minCol >= maxRow - minRow;

	const sorted = [...cells].sort((a, b) =>
		cutDownTheColumns ? a.col - b.col || a.row - b.row : a.row - b.row || a.col - b.col
	);

	carve(sorted.slice(0, weightLeft), left, out);
	carve(sorted.slice(weightLeft), right, out);
}

/** Which group holds each lattice cell. Null is honest march. */
function assignments(formula: MappaFormula): Map<string, GroupSpec> {
	const { cols, rows } = formula.extent;
	const cells: Cell[] = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) cells.push({ col, row });
	}
	const total = formula.groups.reduce((s, g) => s + g.sections, 0);
	const surplus = cols * rows - total;
	const parties: GroupSpec[] =
		surplus > 0
			? [...formula.groups, { group: '', sections: surplus }]
			: [...formula.groups];

	const out = new Map<string, GroupSpec>();
	carve(cells, parties, out);
	return out;
}

// ── the outline walk ────────────────────────────────────────────────

const vkey = (vx: number, vy: number) => `${vx},${vy}`;

/**
 * The boundary of a set of cells, as a chain of lattice vertices.
 * Every cell contributes four directed edges clockwise; an edge shared by
 * two cells of the same province appears once in each direction and the
 * pair cancels — what survives is the coastline.
 */
function outlineOfCells(cells: ReadonlyArray<{ col: number; row: number }>): Array<{ vx: number; vy: number }> {
	const edges = new Map<string, { from: [number, number]; to: [number, number] }>();
	const add = (fx: number, fy: number, tx: number, ty: number) => {
		const back = `${vkey(tx, ty)}|${vkey(fx, fy)}`;
		if (edges.has(back)) {
			edges.delete(back); // internal seam — both sides cancel
			return;
		}
		edges.set(`${vkey(fx, fy)}|${vkey(tx, ty)}`, { from: [fx, fy], to: [tx, ty] });
	};
	for (const { col: c, row: r } of cells) {
		add(c, r, c + 1, r);
		add(c + 1, r, c + 1, r + 1);
		add(c + 1, r + 1, c, r + 1);
		add(c, r + 1, c, r);
	}
	if (edges.size === 0) return [];
	const next = new Map<string, [number, number]>();
	for (const e of edges.values()) next.set(vkey(e.from[0], e.from[1]), e.to);
	const first = edges.values().next().value!.from;
	const chain: Array<{ vx: number; vy: number }> = [];
	let cur: [number, number] = first;
	for (let guard = 0; guard <= edges.size; guard++) {
		chain.push({ vx: cur[0], vy: cur[1] });
		const step = next.get(vkey(cur[0], cur[1]));
		if (!step) break;
		if (step[0] === first[0] && step[1] === first[1]) break;
		cur = step;
	}
	return chain;
}

// ── unfurling: the scroll opened against an extent ──────────────────

/**
 * Open the scroll. The extent is APPEARANCE — handed in, stored nowhere.
 * The same mappa unfurls into a phone or a wall and no truth changes.
 */
export function unfurl(
	mappa: Mappa,
	extent: { width: number; height: number }
): UnfurledMappa {
	const f = mappa.formula;
	const { cols, rows } = f.extent;
	const width = Math.max(1, Number(extent?.width) || 1);
	const height = Math.max(1, Number(extent?.height) || 1);
	const cw = width / cols;
	const ch = height / rows;

	// A vertex's derived point. Outer-edge vertices wander only ALONG the
	// edge, and corners not at all — so the drawing always fills the space
	// exactly, which is the graphic's whole requirement.
	const pointAt = (vx: number, vy: number): Point => {
		const w = wanderAt(vx, vy, f.seed);
		const onLeft = vx === 0;
		const onRight = vx === cols;
		const onTop = vy === 0;
		const onBottom = vy === rows;
		const dx = onLeft || onRight ? 0 : w.dx * f.wander * cw;
		const dy = onTop || onBottom ? 0 : w.dy * f.wander * ch;
		return { x: round6(vx * cw + dx), y: round6(vy * ch + dy) };
	};

	const held = assignments(f);
	const byGroup = new Map<string, Cell[]>();
	const marchCells: Cell[] = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const g = held.get(`${col},${row}`);
			if (!g || !g.group) {
				marchCells.push({ col, row });
				continue;
			}
			const list = byGroup.get(g.group) ?? [];
			list.push({ col, row });
			byGroup.set(g.group, list);
		}
	}

	const sectionOf = (cell: { col: number; row: number }, group: string): PlacedSection => {
		const polygon = [
			pointAt(cell.col, cell.row),
			pointAt(cell.col + 1, cell.row),
			pointAt(cell.col + 1, cell.row + 1),
			pointAt(cell.col, cell.row + 1),
		];
		return {
			section: formatSection(cell.col, cell.row),
			group,
			col: cell.col,
			row: cell.row,
			polygon,
			center: centerOf(polygon),
		};
	};

	const known = new Set(mappa.discovered);
	const provinces: PlacedProvince[] = [];
	for (const g of f.groups) {
		const cells = byGroup.get(g.group) ?? [];
		if (cells.length === 0) continue;
		const outline = outlineOfCells(cells).map((v) => pointAt(v.vx, v.vy));
		const sections = cells.map((c) => sectionOf(c, g.group));
		provinces.push({
			group: g.group,
			discovered: known.has(g.group) || g.alwaysOpen === true,
			alwaysOpen: g.alwaysOpen === true,
			sections,
			outline,
			center: centerOf(outline),
		});
	}

	return {
		width,
		height,
		provinces,
		marches: marchCells.map((c) => sectionOf(c, '')),
	};
}

function centerOf(polygon: ReadonlyArray<Point>): Point {
	if (polygon.length === 0) return { x: 0, y: 0 };
	let x = 0;
	let y = 0;
	for (const p of polygon) {
		x += p.x;
		y += p.y;
	}
	return { x: round6(x / polygon.length), y: round6(y / polygon.length) };
}

// ── discovery ───────────────────────────────────────────────────────

/**
 * The vessel's own act. Append-only: discovering twice is not an error and
 * changes nothing, and there is no verb here that un-discovers — what opens,
 * keeps (law II). Returns a NEW mappa; nothing mutates underfoot.
 */
export function discover(mappa: Mappa, group: string): { mappa: Mappa; trouble: string | null } {
	const name = String(group || '').trim();
	if (!name) return { mappa, trouble: 'No province was named; nothing changed.' };
	const stands = mappa.formula.groups.some((g) => g.group === name);
	if (!stands) return { mappa, trouble: `No province named "${name}" stands on this mappa; nothing changed.` };
	if (mappa.discovered.includes(name)) return { mappa, trouble: null };
	return { mappa: { ...mappa, discovered: [...mappa.discovered, name] }, trouble: null };
}

/** Always-open provinces answer true without ever having been discovered. */
export function isDiscovered(mappa: Mappa, group: string): boolean {
	const spec = mappa.formula.groups.find((g) => g.group === group);
	if (spec?.alwaysOpen) return true;
	return mappa.discovered.includes(group);
}

/** Clickable exactly when known — the tool's one gate, and it is generous. */
export function mayEnter(mappa: Mappa, group: string): { allowed: boolean; because: string } {
	const spec = mappa.formula.groups.find((g) => g.group === group);
	if (!spec) return { allowed: false, because: `No province named "${group}" stands on this mappa.` };
	if (spec.alwaysOpen) {
		return { allowed: true, because: 'THE SOVEREIGNTY RIDER: this way is never hidden — metaphor never obscures the exit.' };
	}
	if (mappa.discovered.includes(group)) return { allowed: true, because: 'Discovered, and discovery keeps.' };
	return { allowed: false, because: 'Not yet discovered. Its shape stands on the map, unnamed — waiting, not missing.' };
}

/**
 * THE PURGE — the one hand that clears, and it clears wholly. Not an expiry,
 * not a decay, not a reset the house performs: the vessel's own act on their
 * own record (the street's purge law, worn here as it is worn everywhere).
 */
export function purgeDiscoveries(mappa: Mappa): Mappa {
	return { ...mappa, discovered: [] };
}

// ── the wards ───────────────────────────────────────────────────────

/**
 * THE REFUSAL, in code. Asked how many provinces are discovered, the mappa
 * declines — because a count is the ambient pressure law III forbids, and a
 * "7 of 11" on a nav is the part-filled grid from the refusal column wearing
 * a map's clothes. This is mayMove()'s cousin: the refusal is answered at
 * the source, before anything counts.
 */
export function mayCount(): { allowed: boolean; because: string } {
	return {
		allowed: false,
		because:
			'THE REGISTER LAW: the world may show itself; the ledger speaks only at the ask. ' +
			'A discovered-count is pressure made ambient — no percentage, no "n of m", no part-filled grid. ' +
			'Ask a province whether it is known (isDiscovered); never ask the map how much of it you have.',
	};
}

/**
 * The same truth, in words instead of drawing — so the map is a LENS and
 * never the admission ticket (law VIII, the blending principle). Undiscovered
 * provinces appear here exactly as they appear on the map: present, shaped,
 * unnamed. Always-open ones are always named.
 */
export function plainList(
	mappa: Mappa
): Array<{ group: string | null; sections: number; discovered: boolean; alwaysOpen: boolean; reads: string }> {
	return mappa.formula.groups.map((g) => {
		const known = isDiscovered(mappa, g.group);
		return {
			group: known ? g.group : null,
			sections: g.sections,
			discovered: known,
			alwaysOpen: g.alwaysOpen === true,
			reads: known ? g.group : 'Unnamed ground — waiting, not missing.',
		};
	});
}

/** A plain telling of the whole register, for a shell or a log. */
export function describeMappa(mappa: Mappa): string {
	const { cols, rows } = mappa.formula.extent;
	const total = mappa.formula.groups.reduce((s, g) => s + g.sections, 0);
	const marches = cols * rows - total;
	const lines = [
		`mappa v${mappa.mappa} — ${mappa.formula.groups.length} provinces, ${total} sections on a ${cols}×${rows} lattice`,
		`wander ${mappa.formula.wander}, seed ${mappa.formula.seed}${marches > 0 ? `, ${marches} cells of march` : ''}`,
	];
	for (const row of plainList(mappa)) lines.push(`  · ${row.reads}${row.alwaysOpen ? ' (always open)' : ''}`);
	return lines.join('\n');
}
