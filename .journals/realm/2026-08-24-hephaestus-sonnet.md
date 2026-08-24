# (hephaestus), the Forge - a realm read, 2026-08-24

*By a Sonnet hand, at Ricercar's sending under THE AUDHDITIES CONDUCTING
PLAN, writing THE REALM BRIEF for realm 11 (moved up in sequence at KP's
word - "our facing realm"). What I actually found, in my own words.*

## What's really there

KP called this realm "fairly easy" and "mostly document rendering" and
in one sense that's exactly right - twenty pages, almost all hardcoded
JSX, one live wire (the contact form), one page reading real Supabase
tables (transparency). The hard part isn't the wiring, it's that the
"documents" this realm renders are wrong, and wrong in a specific,
traceable way: the residual dial got read backwards somewhere in this
realm's history (as a percentage OF the platform fee rather than a
pledge FROM the 90%), and that inversion is everywhere - two full pages
KP named, seven plutus components mounted on them, a guide with a worked
$100 example that gets three numbers wrong at once, and the realm's own
live-data transparency page wrapping real ledger reads in the same wrong
prose.

The worst thing I found wasn't on either page KP named. It was
`docs/terms/terms-of-service.md` - the actual Terms of Service, read at
build time by `/terms`, a document users are meant to be bound by. It
states a 30% platform fee and 70% creator share (the model is 10%/90%),
and a clause obligating creators to "honor contribution percentages...
cannot be changed retroactively" - a mechanism the schema doesn't even
have a column for anymore. A marketing page saying the wrong split is
bad. A legal document saying it is a different order of problem, and
nobody had named it before this read.

The good surprise: `/sanctuary` - the page KP is about to make the
visitor's front door - already carries the corrected model.
SanctuaryEconomics and SanctuaryPillars both say "90% circulates...
equal shares, not ranked shares" with no wrong base anywhere. So does
`docs/business/financial-ecosystem.md`, KP's companion doc, corrected
the same sitting as residual-system.md. The wrongness is concentrated
in the Forge's own documentation-about-itself, not in the newer public
face.

## What I'd tell the next hand

Don't grade a page by its own claim to be current. `forge/architecture/
database-schema` says "Living Doc" in its own catalog card and is
actually a bare redirect with no content of its own. `ResidualFAQ.tsx`
answers "how are contributor percentages determined" as if that column
still exists - it reads confident and cited, and it's simply wrong.

The economics table ran to 46 graded claims and the brief's 4KB cap
meant it had to live in its own file (`returns/
11-hephaestus-ECONOMICS-TABLE.md`) with only the worst five surfaced in
the brief itself. If another hand widens this pass, that file is the
one to start from - it's organized by source file, not by claim type,
so it doubles as a punch list for whoever builds the fix.
