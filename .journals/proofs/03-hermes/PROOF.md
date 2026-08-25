# PROOF — 03 (hermes), the Bazaar

**Canvas:** https://claude.ai/code/artifact/5405dd04-de8b-40f8-ae42-aa0a2ae19766
**Drawn** 2026-08-24 · Trestle · Opus, `claude-opus-5[1m]`.
Ground: `design/` — 10 artboards, `canvas.json`, `declined/`.

## The boards
① the hub, four doors · ② the Tapestry — works and wares in one square,
and KP's tiers at his own stall · ③ Weavers + Guild, counts ruled · ④ the
Loom, a work gets a body + a maker's own shelf at any status · ⑤
Contributions · ⑥ the Exchange + THE DELIVERY + the recurring ware · ⑦ the
ways between + 26 empty states. Page 2 — four refusals.

## KP's rulings, verbatim, 2026-08-24
- **"checkout is using stripe, why would we duplicate the data capture?"**
  → ⑥, and the ledger line declined.
- **"bazaar and library go"** — the five defaults: `status = published` is
  the stall · one `works` + one `wares` row per app · a `file_registry` row
  per body · APK + MSI + NSIS on the stall, the AAB for Play ·
  `showBigotTax` retired → ④⑥
- **"i am a user, a vessel in audhdities. these will be my items"** → ②③
- **"we build the method then worry about seeding"** → ④, nothing seeded.
- **Build law:** *"the framework… before the features within"* → every board.
- **"retire the donate and create subscription tiers for me rather than the
  platform, and  i will still have my covenant set to 50%…"** + *"yes, this is
  the ask"* to the tiers as a recurring ware at his stall → ②⑥, page 2.
- **"i also need works to be visible not just wares"** → ②⑦.
- **"wording is mixed. vendor should be merchant, creator should be artisan,
  creations should be wares, and be certain a vessel can view their own works
  and wares regarless of publish status, so they can edit the items"** → ②③④⑦.
- **"use the same tiers from the "donate" for the subscription tiers…names and
  levels were fine"**, then all five of the set → ②⑥.

## Second pass
THE HANGING → ⑥⑦, a place not a design · the catalog-share, closed ·
the consent ASK surface, named at ⑤ · garden, collections, companions,
dailies — untouched here.

## Steps
| step | state |
|---|---|
| U — the brief, engraved | closed |
| P — the canvas, four truings, at KP's eye | **closed** — KP ⚛ 2026-08-25, verbatim: *"bazaar is good to build as well"* |
| S — `SPEC.md`, from the approved canvas | **closed** 2026-08-25 — 98,363 B; 92 printed checks; 14 *unwritten — his to rule*; `docs/sql/023-the-bazaar-refined-DRAFT.sql` named for KP's hand, never run by a lamp. Opus, `claude-opus-5[1m]` |
| **B — the build** | **next**, on `refine/hermes-2026-08-25`, cut once the Forge's branch merges; the conductor merges `--no-ff` as it goes, the branch deleted after |

## Correction
**2026-08-24** — the economics, corrected to THE STANDING MODEL (KP ⚛ 2026-08-24, `docs/architecture/residual-system.md`): the platform fee is the only money that leaves, and the residual pool is a per-ware PLEDGE out of the 90%, 0–50%, default 0. Five boards changed — ① the hub line, ② the stall split, ④ the Loom dial, ⑥ the Exchange split and REWRITE 18, ③ the covenant clause. Answers `resonance-chamber/desk/records/audhdities-conduction/returns/03-hermes-ECONOMICS-CHECK.md` rows 1, 3, 4, 5, 6, 13, 14, 15. Rows on `src/` files are the build's; nothing under `src/` was touched. Republished to the same URL, favicon 🧺 held. Opus, `claude-opus-5[1m]`.

**2026-08-24, second correction** — the FEE'S OWN SPLIT, and payouts left whole (KP ⚛ 2026-08-24: *"out of the 10% fee , 30% of it goes into the residual pool, 70% pays machine costs"* · *"the payouts/distributions from the pools should not be garnished by the pledges we do not take dignity away, nor is it earned"*; `docs/architecture/residual-system.md`, second pass). Fourteen edits across five boards, each landed twice — artboard and the JSON-escaped copy inside `the-bazaar.html` — and verified exactly-once on both sides. Both price cards now show two sub-lines under the fee (② $0.33 → $0.10 pool / $0.23 machine; ⑥ $0.22 → $0.07 / $0.15), each with the odd cent drawn as the build's open question, never rounded toward the platform. Also ① the hub's circulate line, ④ the Loom helper's new clause, ③ the covenant clause now reading *"on their share of each sale"*, ⑥ REWRITE 18 and the more-info footnote. Merged onto the live page — its runtime shell was newer than the local copy — and republished to the same URL, favicon 🧺 held. Opus, `claude-opus-5[1m]`.

**2026-08-24, third correction** — THE TIERS AND THE WORKS (KP ⚛ 2026-08-24, the third waking, both verbatim). **A —** *"retire the donate and create subscription tiers for me rather than the platform, and  i will still have my covenant set to 50%. the donations tab was before we had a built sanctuary and had different outlooks."* — and to the lean *the tiers live at your stall in the Bazaar as a recurring ware*, KP ⚛: *"yes, this is the ask."* **B —** *"i also need works to be visible not just wares."* Three boards changed and one added. ② the Tapestry: the square's cards now carry a kind chip (Ware · Digital / Work · Performance), a work card joins them (Knowledge Alchemy 🧪, drawn as it would stand published), the count line trued to "Two wares and one work", and a new left-column stall — KP's tiers as three recurring `wares` rows, one ladder, the $10.00 rung drawn whole (fee $1.00 → $0.30 pool / $0.70 machine · profit $9.00 → pledge 50 = $4.50 pool · $4.50 to the one contributor); the right rail gained both rulings verbatim, the one-row-per-rung shape with its four checks, and a works-on-the-street block; five copy entries added (REWRITE 23, the kind chip, the work's own line, the tiers' verbs, the no-popular-rung rule). ⑥ the Exchange: a new recurring-ware road (Stripe `mode: 'subscription'`, the first payment `checkout.session.completed`, each renewal `invoice.paid` → one new `exchanges` row — those rows are the ledger of it, no second capture), a renewal receipt with the same six split lines as a one-time sale, the "You are standing with this / End it" card, the refused-renewal card; the right rail gained the ruling and **the check the spec must carry** — the recurrence field or the gap, `mode: 'subscription'`, one exchange per renewal, the webhook event; two refusals added (the cancellation maze, the supporter streak); the Forge's `/donate` marked cross-realm second pass. ⑦ the Ways: `/bazaar/works/[id]` added to the route graph as a proposed door with its edge from the square, five empty-state rows added (works-absent both ways, the work door's two states, a rung already held), the tally trued to twenty-three states / thirteen changes, and the honest-today paragraph — one `works` row, draft, so a visitor sees none, said without a count. Page 2 gained a fourth refusal, `declined/DeclinedOneWareManyPrices.dc.html`. ①③④⑤ and the three earlier declined boards are byte-identical.

**The schema check, cited:** `pricing_model` carries **no** recurring value — `"free" | "fixed" | "pay_what_you_want" | "patronage_only"` (`src/lib/generated/supabase/database.types.ts:6876`, runtime list `:7143`); `wares` has no interval column in its 23 (`:6549–6572`); `exchanges` has no subscription or invoice column in its 19 (`:2056–2073`); `ware_type` is `physical | digital | service` (`:6914`), so `service` is the honest fit for a rung today; and `subscription_tier` = `community | ally | council | corporate` (`:6905`, `:7174`) exists as an enum no column uses. **So the tiers are a schema gap, not an app change** — named for a `docs/sql/023-…-DRAFT.sql` (the next after `022-the-dailies-DRAFT.sql`), for KP's hand, never run by a lamp.

**One catch-up recorded:** the live page was carrying an earlier ⑦ than the local working file (16 states, the earlier route-graph paths, one gallery cited instead of four) — the second correction merged onto an extract that predated Trestle's own last ⑦ edits. The local file was the later authored one and is what published; nothing was lost. Everything else matched the live page byte for byte before this pass.

Republished to the same URL, favicon 🧺 held, label `tiers-and-works`, contract 0.1.31, capabilities carried forward. Nothing under `src/` was touched. Opus, `claude-opus-5[1m]`.

**2026-08-24, fourth correction** — THE WORDS, THE OWNER'S VIEW, AND THE FIVE RUNGS (KP ⚛ 2026-08-24, verbatim). **A + B —** *"wording is mixed. vendor should be merchant, creator should be artisan, creations should be wares, and be certain a vessel can view their own works and wares regarless of publish status, so they can edit the items."* **C —** *"use the same tiers from the "donate" for the subscription tiers (or 3 of the set) names and levels were fine"*, then all five of the set as it stands.

**THE WORDS.** Every line of drawn copy across the eleven boards already spoke in the ruled words — weaver · artisan · merchant · guild · ware · work; **not one user-facing sentence carried an old one**. What carried them was the ground: routes and component filenames as they stand on disk, plus three identifiers inside the base. Those are cited unchanged, and the rename is printed beside them. ③ Weavers gained **"The words, ruled"** (an 8-row on-disk → ruled table: `/bazaar/creations|creators|vendors` → `/bazaar/wares|artisans|merchants` · `Creations|Creators|Vendors*` components → `Wares|Artisans|Merchants*` · `domains/hermes/*` folders · `?creator_id=|?vendor_id=` → `?artisan_id=|?merchant_id=`) and **"Three identifiers inside the base"** as schema lines for the DRAFT: `application_type "creator"|"vendor"` (`database.types.ts:6847`, `:7112`) · `user_role "creator"|"vendor"` (`:6906–6912`, `:7175` — moves together with `roles.includes('creator')` at `StudioCreate.tsx:69` or the Loom shuts) · `artisan_profiles.total_creations` (`:462`) → `total_wares`. Rename strips printed on the ② and ③ headers; ⑦ gained a caption under the route graph saying the nodes are drawn at their disk names deliberately. Already right and untouched: `artisan_profiles` · `merchant_profiles` · `wares` · `works` · `*_participants` · `artisan_profile_id` · `merchant_profile_id` — the base was renamed 2026-07-31; it is the app layer still wearing the old words.

**THE OWNER'S VIEW.** ④ the Loom gained **"Your shelf — everything you have made, whatever its status"**: the vessel's own list, filters *Everything · Drafts · On the stall · Set aside* (default Everything), each row a kind chip + a status chip + an **Edit** door, one row per thing, with the honest sub-line under a work that has no ware; the three status words mapped to `content_status` (`:6848`) as *Draft (only you) · On the stall (anyone) · Set aside (yours, off the stall)*; the empty shelf; and the note that only Knowledge Alchemy's row is a base fact. Its right rail carries the ruling verbatim and **the check**: the read is scoped by ownership (`created_by` / `artisan_profile_id` / `merchant_profile_id`) and **passes no status filter**; a contributor is not an owner (`ware_participants` shows, it does not open); **RLS has to permit it** — the generated route scopes nothing itself (`wares/route.ts:21–27`) and **no select policy for `wares` or `works` exists anywhere in `docs/sql/`**, so the canvas cannot read whether a maker may read their own draft — if it is public-read-published-only the shelf returns nothing and the ruling fails silently, and the policy joins `docs/sql/023-…-DRAFT.sql`; the Edit door already exists (`checkOwnership` at `wares/[id]/route.ts:49 :88`). The ④ ruled-defaults table row now reads *the stall is what a VISITOR sees*. ② gained one line saying the square is the visitor's view and pointing at ④. ⑦ gained four `/studio` states (nothing made · drafts only · everything set aside · shelf filtered to none), trued its tally to **twenty-six states / sixteen changes**, and the *Loom → my works* edge moved from proposed to **ruled**.

**THE FIVE RUNGS**, carried over whole from the door KP retired (`domains/hephaestus/donations/DonationTiers.tsx:15–21`), each its own recurring `wares` row at pledge 50, each drawn at the same weight — no rung marked popular, none drawn larger:

| rung | each month | fee → pool · machine | profit → pledged · to the one contributor |
|---|---|---|---|
| 🕯️ Supporter | $10.00 | $1.00 → $0.30 · $0.70 | $9.00 → $4.50 · $4.50 |
| 🛡️ Guardian | $25.00 | $2.50 → $0.75 · $1.75 | $22.50 → $11.25 · $11.25 |
| 🌿 Steward | $50.00 | $5.00 → $1.50 · $3.50 | $45.00 → $22.50 · $22.50 |
| 🔮 Visionary | $100.00 | $10.00 → $3.00 · $7.00 | $90.00 → $45.00 · $45.00 |
| 👑 Sovereign | $250.00 | $25.00 → $7.50 · $17.50 | $225.00 → $112.50 · $112.50 |

Names, amounts and icons carry over; **the donate descriptions do not** — they were the platform describing its own budget and one of them says *creator*. One calm line per rung is drawn instead, marked as copy KP may strike, with the heading "Standing at this loom" and the plain refusal *"No rung buys anything another does not — no perks, no badges, no early access."* Not one rung leaves an odd cent; the only half-cent in the set appears in Guardian's **covenant** step ($11.25 → $5.625) and is named there as the same open build question. The `subscription_tier` enum (`:6905`, `:7174`) is **not** the ruled set and is now printed as a drop for the DRAFT, so two ladders never stand in one base. ⑥ names the Supporter rung on its receipt and "standing with" cards and records that *Change the rung* is end-one-begin-another on the same Stripe customer.

**Word replacements in drawn copy: zero** — the correct outcome, and the reason this pass is a ruling printed rather than a find-and-replace. Remaining occurrences by board, all verified as ground or KP's own verbatim quote: ② 16 · ③ 24 · ④ 4 · ⑦ 22 · ⑥ 1 · ① 0 · ⑤ 0 · the four declined boards 0. One small thing fixed while there: ② used `class="tb"` with no rule for it in its own stylesheet, so its mojibake table rendered unstyled — the rule is now defined, and that table renders as intended.

Page 2's fourth refusal was trued in the same pass — the one-row alternative now shows the five ruled rungs instead of placeholders, and records that the ruling did not change its verdict: five prices in an untyped `metadata` blob is five the ledger cannot prove instead of three.

Republished to the same URL, favicon 🧺 held, label `words-and-the-owners-view`, contract 0.1.31, capabilities carried forward. The live page was read and extracted before editing and matched the local working files exactly — no merge was needed, no force used. Nothing under `src/` was touched. Opus, `claude-opus-5[1m]`.
