# The Bazaar as I Found It

The Bazaar holds 59 files, 5,662 lines. Thirteen entry points (page.tsx), each wrapped by the same vessel — bifrost/Page.tsx — which breathes EnvironmentLayer beneath them. The environments map cleanly: community for browsing, music for making, library for records, home for the exchange itself. No ambiguity.

Five generated surfaces feed the Bazaar: wares and works from the databases (each ware tracked with its cover image, media list, and residual pool percent), participants who shaped those wares/works (roles, notes, publication flags), and the ledger underneath — every transaction's memory. Thirteen separate API calls reach these surfaces; the code knows which. No dead imports.

The checkout speaks plainly. It posts to /api/auth/checkout, takes the URL back, and moves the browser there. No Stripe names appear in the code I scanned — the payment hand is elsewhere, maybe sealed. Three form inputs hold publication checkboxes (is_public, isDraft, isPublished). The ceiling logic belongs to the server (calculate_sovereign_price runs there).

Percent shows up seven times: residual_pool_percent rendered to the user in two creations components, available in form fields in studio create/edit, displayed as flow diagrams. No countdown. No scarcity language (stock/left/only/hurry). One "sold out" check but no button change. The wording stays steady around "patronage" — patrons, not customers; offerings, not products.

Three Suspense boundaries guard useSearchParams. Two search components (creations, creators galleries). Thirty-six components claim the client side. No contradictions.

Three columns suggest files elsewhere: cover_url (images), media_urls (arrays of media), streaming_url (for works). The wares table knows about shipping_info (Json, unread). The ledger stays abstract — references point to rows elsewhere, not to assets.

The realm is tight. The data flows to where it's named. Nothing breaks its own contract.
