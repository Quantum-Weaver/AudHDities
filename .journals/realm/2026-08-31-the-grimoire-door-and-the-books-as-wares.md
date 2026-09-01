# The Grimoire Door and the Books as Wares · 2026-08-31

KP's word: kp.audhdities.com/grimoire is the home of the grimoire. Two host-conditioned
`beforeFiles` rewrites in `next.config.ts` land the kp.* root and `/grimoire` on a new
`src/app/grimoire/route.ts`, which reads `grimoire.html` from the PRIVATE `artifacts` bucket
through a bare anon client and answers text/html, `public, max-age=300, stale-while-revalidate=3600`.
No gate; `src/proxy.ts` exempts the exact path so a shared, cacheable response never carries a
Set-Cookie. The bucket stays private: `20260831_the_grimoire_door.sql` opens exactly one object to anon.
The three books — The Poems, The Lyrics, The Philosophies — land as digital · fixed · draft wares in
`20260831_the_books_as_digital_wares.sql`, shaped like 024's rungs (artisan = KP's one profile).
Bodies live in a private `books` bucket as `<slug>.epub`/`.docx`; `src/app/api/books/[slug]/download`
checks the webhook's own entitlement (a completed exchange for buyer + ware, the wares-bodies test)
and 302s to a five-minute signed URL minted with `download` set. Storage RLS on `books` is the wall.
Nothing sells until KP sets price and flips status; bucket, Vercel domain, CNAME, Stripe price ids and
the EPUB uploads are his hands. tsc: 0 errors before and after. ESLint 10.8.1 crashes on every file in
this repo (eslint-config-next's bundled eslint-plugin-react, `getFilename is not a function`) —
pre-existing, not touched here; `next lint` itself is gone in Next 16.
