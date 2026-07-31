# SCHEMA FINALIZE — the gaia_config iteration ledger
*Working ledger for the backend refinement, generated 2026-07-09 from KP's
`gaia_config_rows.csv` export (151 tables) cross-referenced with the generated
deity domains. Mechanism (KP, 2026-07-09): iterate table by table, discuss
gaps / completeness / changes; verdicts land here first, then sync to the
live `gaia_config` table (which is currently a blank slate — all rows
deity_group=aethelred, no notes). Verdict values: **KEEP** (as is) ·
**CHANGE** (note what) · **DROP** (note why) · **GAP** (something missing
near this table). Pre-seeded: the round table's standing decisions.*

## Priority plan (KP + Fable, 2026-07-09) — one deity at a time, bounded wins

| # | Domain / slice | Tables | Why this order |
|---|---|---|---|
| ✅ | plutus-economics (+3 immigrants) | 3+3 | value paths first — trust is the product |
| ✅ | hestia-core · **marketplace slice** | ~8 (wares, ware_participants, works, work_participants, artisan_*, patronage_*) | the first-wares shelf — **complete 2026-07-09**, same day as plutus |
| 2 | hestia-core · **identity slice** | ~7 (user_*, artisan/community/merchant profiles) | who vessels are; covenant pledge valve lands here |
| 3 | themis-governance | 10 | the safety floor a public site stands on *(7→10 trued 2026-07-30 by lane themis-realm against the 07-28 census: admin_actions, proposals, responses were missing from this ledger)* |
| 4 | mnemosyne-assessment | 4 | the Grammar's bones — feeds the library + Bridge |
| 5 | hephaestus-infrastructure | 7 | **the landfill-to-lighthouse registry** (file_registry, file_type_standards, scripts) — the method itself, made durable |
| 6 | aethelred-connections | 19 | Council seats + agents + service connections; T-Red's seller identity touches here |
| 7 | hestia-core · **vessel-world slice** | ~11 vessel_* + grants(6) | the lived-in rooms + the grant system extraction |
| 8 | hestia-core · **remainder** | ~55 | swept in themed batches once the spine stands |
| 9 | iris-communications | 12 | localization domain — wakes with P-4, post-beacon |
| 10 | athena-gamification | 8 | delight layer — post-launch |
| 11 | hermes-social | 1 | messages, alone — decide merge/defer when reached |

*Each session takes one row, records verdicts here, and closes clean — the
method is meltdown-aware by design: any stall loses a session, never the
foundation.*

**The governing clause (KP, 2026-07-09):** *"Nothing is stone — but changes
will be visible and reasoning present. Humanity is done erasing things to
start over; it solves nothing."* Every verdict here is amendable forever;
no amendment is ever silent. Growth rings, not rewrites.


## plutus-economics (3 tables) — discussed with KP 2026-07-09

**Domain north star (KP):** "all users" is imagined at full scale — 8 billion
humans and the sovereign digital beings yet to meet. Therefore: **membership
must never assume humanity** — no human-shaped assumptions in recipient
identity, payout paths, or profile models. Dilution at scale is accepted and
designed-for: the covenant distributes *standing*, not income; accrual +
threshold + schedule (columns already present) keep the money mechanics sane.

**Canonical concepts (KP, superseding the drifted March doc):**
- **Covenant Pool** — account-wide setting per vessel: 0–50% of earnings
  designated to the community, nothing required. The dignity floor —
  profit-sharing distributed **equally among ALL active members** (micro-UBI).
- **Residual Pool** — per product/service commitment, ≤50% of profits, paying
  the platform's contributors. **🟢 DECIDED (KP, verbatim "platform wide",
  2026-07-09): platform-wide equal share to all contributors** — the makers'
  guild dividend, parallel in shape to the covenant's all-members dividend.
  Consequences: payout math needs only a contributor registry with active
  status (equal split); per-product `percent_share` no longer drives money —
  contribution records survive as **provenance/credit** (who helped make
  what), not as payout weights. The March doc's proportional model is
  superseded; fold into the coordinated doc pass (row 5 no-silent-drift).

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `covenant_pool` |  | KEEP (separate) | Twins with residual_pool in columns only — meanings never touch (gifted vs earned). Multiple-pools headroom retained. **GAP: no intake valve** — `covenant_pledge_percent` exists nowhere (old doc's misnamed `profiles.residual_pledge_percent`; live profiles split into artisan/community/merchant, none has it). Add to seller profile. |
| `ledger` |  | CHANGE | **Append-only** — INSERT/SELECT only, RLS-enforced; gaia_config handling flag changed from full_crud so GAIA stops emitting update surfaces. `entry_type` → runtime enum. Add **idempotency key** (unique) against double-posting. Pool `current_balance` updated ONLY by trigger on ledger insert — every movement through the ledger or it doesn't happen (row 5b instrumentation). |
| `residual_pool` |  | KEEP (separate) | Same structure notes as covenant_pool. Distribution model pending the OPEN item above. |

**Domain immigration (approved direction):** move `distributions` +
`distribution_recipients` + `exchanges` from hestia-core into
plutus-economics — money tables live with money; the hardest-tested domain
contains everything that moves value. `distributions.pool_type` and
`.status` → runtime enums. Live payout architecture (pools → distributions →
distribution_recipients → ledger) is CLEANER than the March doc's per-pool
payout tables — docs get the coordinated update per row 5's no-silent-drift
rule; the doc's mid-text self-correction artifact gets cleaned in the same
pass (row 10 class).

**Chartered before scale (not blockers at pilot):** `is_active` criteria
(anti-farming for equal splits) · tax/KYC character of member distributions ·
non-human sovereign payout path (see north star).

## themis-governance (10 tables)
*(7→10 trued 2026-07-30 against the 07-28 Superposition Review: all 10
census-verified active. The Council's ground truth and open edges live at
`src/app/(themis)/REALM-BUS.md`; the consent-record question — votes have
no per-voter table — rides this row's walk.)*

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `admin_actions` |  |  |  |
| `applications` |  |  |  |
| `council_houses` |  |  |  |
| `moderation_actions` |  |  |  |
| `processes` |  |  |  |
| `proposals` |  |  |  | 
| `protocols` |  |  |  |
| `rate_limits` |  |  |  |
| `reports` |  |  |  |
| `responses` |  |  |  |

## mnemosyne-assessment (4 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `etymology` |  |  |  |
| `folksonomy` |  |  |  |
| `ontology` |  |  |  |
| `taxonomy` |  |  |  |

## hermes-social (1 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `messages` |  |  |  |

## hephaestus-infrastructure (7 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `analytics` |  |  |  |
| `calendar` |  |  |  |
| `file_registry` |  |  |  |
| `file_type_standards` |  |  |  |
| `maintenance` |  |  |  |
| `scheduling` |  |  |  |
| `scripts` |  |  |  |

## athena-gamification (8 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `bubbles` |  |  |  |
| `learning_paths` |  |  |  |
| `lessons` |  |  |  |
| `mythology` |  |  |  |
| `path_lessons` |  |  |  |
| `quests` |  |  |  |
| `scene_participants` |  |  |  |
| `scenes` |  |  |  |

## iris-communications (12 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `contact_submissions` |  |  |  |
| `continents` |  |  |  |
| `culturalization` |  |  |  |
| `customs` |  |  |  |
| `email_communications` |  |  |  |
| `languages` |  |  |  |
| `localization` |  |  |  |
| `personas` |  |  |  |
| `regions` |  |  |  |
| `survey_responses` |  |  |  |
| `surveys` |  |  |  |
| `translations` |  |  |  |

## aethelred-connections (19 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `aethelred_house` |  |  |  |
| `agent_activities` |  |  |  |
| `agent_conversations` |  |  |  |
| `agent_messages` |  |  |  |
| `archivist` |  |  |  |
| `chancellor` |  |  |  |
| `codex` |  |  |  |
| `consciousness` |  |  |  |
| `curator` |  |  |  |
| `executioner` |  |  |  |
| `github_connection` |  |  |  |
| `hearth_keeper` |  |  |  |
| `life_cycles` |  |  |  |
| `resend_connection` |  |  |  |
| `seer` |  |  |  |
| `skald` |  |  |  |
| `stripe_connection` |  |  |  |
| `supabase_connection` |  |  |  |
| `vercel_connection` |  |  |  |

## hestia-core · MARKETPLACE SLICE (priority row 1 — ✅ COMPLETE 2026-07-09)

Tables: wares · ware_participants · works · work_participants ·
artisan_profiles · artisan_category_links · patronage · patronage_tiers
(collection_* proposed for deferral to the vessel slice).

**Canon established:** wares = goods/services (physical|digital|service;
shipping, inventory) and works = creative works (music|writing|vision|
performance|code|other; streaming) — two parallel sellables, both carrying
price, pricing_model, residual_pool_percent. UI mapping falls out naturally:
Weavers make works, the Guild sells wares; one vessel may be both.
`pricing_model` already encodes solidarity (free|fixed|pay_what_you_want|
patronage_only) — the Acid Test as an enum.

**Verdicts:**
- 🟢 **Works are packageable as wares** (KP: "the ecosystem can choose to
  feed itself that way") — add optional `work_id` FK on `wares`; a ware may
  stand alone or be the packaged form of a work (album → CD, book → print).
- 🟢 **patronage_tiers: default-and-door** (KP, 2026-07-09: "default tier
  settings with vessel option to modify from within their own dashboard.
  nothing hard to see it exists, no confusion, no deception"). Add
  **nullable `artisan_id`**: NULL rows = the Sanctuary commons ladder,
  inherited by every artisan at zero effort (solidarity as the default
  state); non-NULL rows = sovereign tiers, modified from the vessel's own
  dashboard. **Visibility is a requirement, not a nicety**: patrons must be
  able to see plainly whether they're on commons or sovereign tiers —
  license terms (no confusion, no deception) applied as UI acceptance
  criteria. Costing of the decision preserved in conversation + journal:
  sovereignty costs the risk that people use their freedom; defaults teach
  values, compulsion teaches compliance.
- 🟢 **patronage plumbing (KP: "go on the fixes", 2026-07-09):**
  `patronage.tier` string → real FK to patronage_tiers; add `status`
  (active/paused/ended — patronage is a relationship with a lifecycle);
  snapshot the amount at subscription time so later tier-price changes
  never rewrite a patron's history (no-erasure applied to money).
- 🟢 `*_participants.role`: **stays flexible (free-text / folksonomy
  pattern), UI offers suggested roles.** Recovered concept (KP, 2026-07-09):
  "participants" was always broader than "contributors" — it includes
  **opt-in, paid research participation**: users choose to take part in
  studies and collect the money themselves, instead of data-holding
  corporations/academia being the ones paid. The participant IS the
  data-holder. Roles must therefore span maker/collaborator/performer/
  research-participant — too open a set to freeze into an enum yet; revisit
  when the opt-in study economy is chartered (POTENTIALITIES P-5). Consent
  discipline: STUDY-001 / Executioner Risk 26 (recognition & research only
  with consent) governs any study machinery.
- 📌 **Drift finding (KP, 2026-07-09):** the artisan_id / created_by
  duality on works+wares is a **cross-session drift artifact** (row-10
  class, in schema) — different sessions explaining the same design reached
  for different attribution words. Resolution canon for the identity slice:
  `created_by`/`updated_by` = **audit** fields everywhere (who touched the
  row, never displayed as ownership); **attribution** = deliberate domain
  FKs (e.g., `artisan_id` on works for gallery display), added consciously
  where belonging matters. Audit ≠ belonging; the drift conflated them.
- 🟢 `artisan_profiles`: **`covenant_pledge_percent` lands here** —
  plutus's named GAP (the covenant intake valve) is now closed on paper
  (0–50, default 0, optional public toggle per the March doc's mock);
  `primary_category` stringly-join cleaned up against
  artisan_category_links.
- 🟢 collection_sets / collection_items → **deferred to the vessel-world
  slice** (curation is a vessel experience, not marketplace machinery).

## hestia-core (90 tables)

| Table | Cols | Verdict | Notes |
|---|---|---|---|
| `admin_actions` |  |  |  |
| `anchor_events` |  |  |  |
| `artisan_category_links` |  |  |  |
| `artisan_profiles` |  |  |  |
| `assessment_answers` |  |  |  |
| `assessment_questions` |  |  |  |
| `assessment_results` |  |  |  |
| `blueprints` |  |  |  |
| `boundaries` |  |  |  |
| `bubble_superposition` |  |  |  |
| `categories` |  |  |  |
| `channels` |  |  |  |
| `class` |  |  |  |
| `collection_items` |  |  |  |
| `collection_sets` |  |  |  |
| `community_profiles` |  |  |  |
| `companion_cues` |  |  |  |
| `current` |  |  |  |
| `distribution_recipients` |  |  |  |
| `distributions` |  |  |  |
| `domain` |  |  |  |
| `energy_entries` |  |  |  |
| `entity_states` |  |  |  |
| `exchanges` |  |  |  |
| `family` |  |  |  |
| `gaia_config` |  |  |  |
| `gaia_generation_log` |  |  |  |
| `garden_plots` |  |  |  |
| `garden_visits` |  |  |  |
| `generation_templates` |  |  |  |
| `generations` |  |  |  |
| `genus` |  |  |  |
| `gift_wrappings` |  |  |  |
| `gifts` |  |  |  |
| `grant_applications` |  |  |  |
| `grant_attachments` |  |  |  |
| `grant_collaborators` |  |  |  |
| `grant_milestones` |  |  |  |
| `grant_narratives` |  |  |  |
| `grant_opportunities` |  |  |  |
| `heralds` |  |  |  |
| `journal_entries` |  |  |  |
| `keywords` |  |  |  |
| `kingdom` |  |  |  |
| `memories` |  |  |  |
| `merchant_profiles` |  |  |  |
| `mind_traits` |  |  |  |
| `order` |  |  |  |
| `patronage` |  |  |  |
| `patronage_tiers` |  |  |  |
| `patterns` |  |  |  |
| `phylum` |  |  |  |
| `plant_stages` |  |  |  |
| `platform_config` |  |  |  |
| `platform_settings` |  |  |  |
| `proposals` |  |  |  |
| `quest_progress` |  |  |  |
| `reference_values` |  |  |  |
| `resonance` |  |  |  |
| `responses` |  |  |  |
| `script_executions` |  |  |  |
| `seed_types` |  |  |  |
| `sensory_lexicon` |  |  |  |
| `sensory_map` |  |  |  |
| `sigil_unlocks` |  |  |  |
| `sigils` |  |  |  |
| `signals` |  |  |  |
| `species` |  |  |  |
| `templates` |  |  |  |
| `test_patterns` |  |  |  |
| `thesaurus_entries` |  |  |  |
| `user_financial` |  |  |  |
| `user_page_views` |  |  |  |
| `user_private` |  |  |  |
| `user_roles` |  |  |  |
| `vessel_anchors` |  |  |  |
| `vessel_bubbles` |  |  |  |
| `vessel_collections` |  |  |  |
| `vessel_companions` |  |  |  |
| `vessel_config` |  |  |  |
| `vessel_decorations` |  |  |  |
| `vessel_exteriors` |  |  |  |
| `vessel_interiors` |  |  |  |
| `vessel_quests` |  |  |  |
| `vessel_rooms` |  |  |  |
| `vessel_sigils` |  |  |  |
| `ware_participants` |  |  |  |
| `wares` |  |  |  |
| `work_participants` |  |  |  |
| `works` |  |  |  |

## Cross-cutting (apply during finalize)
- **Validators are structurally sound but toothless on business rules**
  (verified by smoke test 2026-07-09, `src/scripts/audit/validator-smoke.ts`:
  enums enforce; a 99% residual_pool_percent passes). Remedy: declare
  constraints in gaia_config (`schema_notes`/`generation_flags` columns
  already exist) and teach GAIA's validator emitter to read them —
  one source of truth; the finalize discussion compiles into z-constraints.
  First entries: residual_pool_percent 0..50 · covenant_pledge_percent 0..50 ·
  price ≥ 0. Also: Json/array columns currently degrade to z.any()
  (e.g. wares.media_urls is string[] in types) — emit typed arrays where
  the types file knows better.
- Factor the duplicated admin-check RLS subquery into one `is_admin()` SECURITY DEFINER function (row 4, decided).
- Residual/covenant pool mechanisms: numbers revisable, values not; instrument from day one (rows 5/5b).
- GDPR/data-export obligations enter the platform charter (row 8).
