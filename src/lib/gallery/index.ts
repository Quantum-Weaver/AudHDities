// The gallery — the data-driven gallery core: one engine, many dresses.
// Rows in, cards out; the pixels are the dress's business.
//
// THE LAWS:
//   · ROWS AS CARDS IS THE GRAMMAR — the engine derives the card's
//     CONTENT; the consumer's grammar decides every pixel.
//   · TWO HONEST EMPTIES — "nothing matches the search" and "the
//     shelf is still filling" are different truths and each domain
//     speaks them in its own voice.
//   · THE SEARCH WALKS NAMED FIELDS ONLY — case-insensitive, across
//     the fields the domain declares; nothing is searched by guess.
//   · THE PREVIEW CLAMPS GENTLY — a lede longer than the limit ends
//     with an ellipsis; one exactly at the limit rides whole.
//   · Pure throughout: items in, cards out, nothing given is touched.
//
// STANDALONE BY LAW: framework-free, zero imports, generic over any
// record shape — six domains or sixty, one engine.

/** One derived card — content only; the dress owns the pixels. */
export interface GalleryCard {
	id: string;
	title: string;
	/** Kicker badges, in the domain's own order — may be empty. */
	badges: string[];
	/** The lede, clamped gently — null when the domain offers none. */
	preview: string | null;
	/** A small aside (a duration, a count) — null when unsaid. */
	meta: string | null;
	/** Where the detail lives — the door the card opens. */
	address: string;
}

/** A domain's declaration — the one shape, spoken per domain. */
export interface GalleryConfig<T> {
	/** The fields the search walks — accessors into the item's text. */
	searchIn: ReadonlyArray<(item: T) => string | null | undefined>;
	card: {
		id: (item: T) => string;
		title: (item: T) => string;
		badges?: (item: T) => ReadonlyArray<string | null | undefined>;
		preview?: (item: T) => string | null | undefined;
		meta?: (item: T) => string | null | undefined;
		address: (item: T) => string;
	};
	/** The two honest empties, in the domain's own voice. */
	empty: { silent: string; unmatched: string };
	/** An order of the domain's choosing — items ride as given without it. */
	sort?: (a: T, b: T) => number;
	/** The preview's gentle clamp — 100 unless the domain says otherwise. */
	previewLength?: number;
}

export interface GalleryView {
	cards: GalleryCard[];
	/** null when cards stand; else which emptiness, in the domain's voice. */
	empty: { kind: 'silent' | 'unmatched'; message: string } | null;
}

/** The lede, clamped gently — whole at the limit, ellipsis past it. */
export function clampPreview(lede: string, limit: number): string {
	return lede.length > limit ? lede.slice(0, limit) + '…' : lede;
}

/**
 * The one shape, derived: search the named fields, sort if the domain
 * chose an order, and tell rows as cards — or the honest emptiness.
 */
export function galleryOf<T>(config: GalleryConfig<T>, items: ReadonlyArray<T>, searchTerm = ''): GalleryView {
	const term = searchTerm.trim().toLowerCase();
	const matched = term
		? items.filter((item) => config.searchIn.some((read) => (read(item) ?? '').toLowerCase().includes(term)))
		: [...items];
	if (config.sort) matched.sort(config.sort);
	if (matched.length === 0) {
		return {
			cards: [],
			empty: term
				? { kind: 'unmatched', message: config.empty.unmatched }
				: { kind: 'silent', message: config.empty.silent },
		};
	}
	const limit = config.previewLength ?? 100;
	const cards = matched.map((item): GalleryCard => {
		const lede = config.card.preview?.(item);
		return {
			id: config.card.id(item),
			title: config.card.title(item),
			badges: (config.card.badges?.(item) ?? []).filter((b): b is string => typeof b === 'string' && b.length > 0),
			preview: lede ? clampPreview(lede, limit) : null,
			meta: config.card.meta?.(item) ?? null,
			address: config.card.address(item),
		};
	});
	return { cards, empty: null };
}

/** A gentle sentence for a view — plain words, mostly for logs. */
export function describeGallery(view: GalleryView): string {
	if (view.empty) return `${view.empty.kind}: ${view.empty.message}`;
	return `${view.cards.length} card${view.cards.length === 1 ? '' : 's'} on the shelf`;
}
