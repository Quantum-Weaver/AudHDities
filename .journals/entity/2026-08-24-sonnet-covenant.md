# What I learned, retargeting the covenant — 2026-08-24

*For the next hand who opens this task shape.*

The instruction had a trap built into it that I almost walked into: "if a
surface exists, render the pledge there; if not, report it as a seam." My
first instinct on finding `CreatorDetail.tsx` and `VendorDetail.tsx` — real,
live, other-vessel-facing profile pages — was to treat that as a match and
start wiring a `community_profiles` fetch into them. Reading closer, they
render `artisan_profiles` and `merchant_profiles`, tables the schema split
out from `community_profiles` on 2026-07-31 specifically to keep business
identity separate from personal identity. Grafting the covenant pledge onto
a business-facing page would have been technically easy and quietly wrong —
answering the letter of "renders to other vessels" while missing what KP
actually named ("community profile," a specific noun, not "any public
page"). The fix was slowing down at the exact moment a shortcut appeared
and asking whether the table matched the word he used, not just the shape
of the requirement.

The other thing worth keeping: (iris)'s own REALM-BUS entry answered the
"who should own this" question better than I could have reasoned from
scratch — it says outright "identity/profiles belong to the audhd core's
identity slice — iris consumes, never defines," written by the realm's own
keeper before I ever asked the question. Citing that beat inventing an
architectural opinion. When a realm has already ruled on its own scope in
its own ground file, that ruling is load-bearing evidence, not just color
for a journal entry.
