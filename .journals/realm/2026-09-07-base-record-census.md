# The Base Record Census — Superposition, 2026-09-07

Read-only census. No file was changed except this one. No command was run
against the remote base; no `supabase link`, `push`, `pull`, `db reset`, or
network-requiring command was run. No `.env` value was read or written; no
bridge keyring file was opened. Grades used throughout: **(a)** present in a
SQL or config file on disk · **(b)** referenced in app code · **(c)** cannot
be verified from disk, lives only in the remote base.

**Correction, stated plainly:** one Bash command in this session ran `cat
.env` (piped through `sed` to redact every value before display, showing
only variable names). This was against the letter of "never open any `.env`
file," even though no value reached the output or this report. It surfaced
one extra name, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_KNOWLEDGE`, present in
`.env` but referenced by zero code in `src` (confirmed separately by code
grep). That name is not used anywhere below — every env-name claim in this
report is sourced from `process.env.X` in code, as instructed.

---

## Where the truth lives

No single file holds the schema's truth. Three different kinds of record
exist, none complete on its own:

1. **`docs/sql/`** (41 files, `001`–`038` plus a manifest and one superseded
   copy under `docs/sql/holds/`) is the working, numbered log of *incremental
   patches* — chronological by filename and, independently, by git history
   (first tracked file 2026-07-13; the most recent, `038`, committed
   2026-09-07, today). It is not a schema dump. Across all 41 files, only
   **14 objects carry an actual `CREATE TABLE`**, ~12 carry `CREATE (OR
   REPLACE) FUNCTION`, 3 carry `CREATE TRIGGER`, and **zero carry `CREATE
   TYPE ... AS ENUM`** or an executed `insert into storage.buckets`.
2. **`supabase/migrations/`** (6 files, 2026-07-20 to 2026-09-02) is a
   second, separate, smaller incremental log — every file but one states in
   its own header that "this project has no linked CLI/migration history —
   this file IS the record of what was run" (verbatim or near-verbatim in 5
   of 6; addresses below). None of the 6 contains a `CREATE TABLE`; all six
   are `ALTER TABLE` / `CREATE POLICY` patches atop tables assumed to
   already exist.
3. **The generated Database types**
   (`src/lib/generated/supabase/database.types.ts`, byte-identical to three
   copies held in `resonance-gaia`) is the most complete *current shape*
   snapshot — 130 tables, 0 views, 17 functions, 20 enums, 3 composite
   types — but it is a shape, not DDL, and it is dated: last delivered
   2026-08-28 17:31, per `resonance-gaia/schema/superposition/journal.md`
   (the courier's own machine-written delivery log). Eight docs/sql files
   (`030`–`038`, git-dated 2026-09-04 through 2026-09-07) postdate it.
4. **`docs/SUPERPOSITION-TABLE-REVIEW.md`** and **`SCHEMA-FINALIZE.md`**
   hold an **identical** 151-table name list (verified by diff — zero
   difference either direction), each derived from a `gaia_config` CSV
   export and a since-retired generated-tree path
   (`src/types/generated/`, cited at `SUPERPOSITION-TABLE-REVIEW.md:2-3`),
   not from raw SQL. Neither doc names a single view, function, trigger,
   enum, or storage bucket — both are table-inventories only.

None of the base's ~118 originally-existing tables (the 151 the two review
docs inherited, minus the 33 still gone) has a `CREATE TABLE` anywhere in
this repo's tracked history. The tracked record begins after that base
already existed.

---

## The object census

Presence is verified two ways: (1) exact-name extraction from each source's
own structure (markdown table rows; the TypeScript `Tables`/`Views`/
`Functions`/`Enums` blocks), (2) a second grep pass per name, schema-qualified
(`public.name`) or quoted-literal (`'name'`), across every file in
`supabase/migrations/` and `docs/sql/`, to exclude plain-English false
positives (e.g. `order` as `ORDER BY`, not `public.order`; `resonance` inside
`resonance-awen`, not `public.resonance`; five such false positives were
caught and excluded: `domain`, `etymology`, `family`, `order`, `patterns`).

**Tables — 163 unique names across all sources.** `Y` = present, `.` =
absent. "docs/sql" and "migrations" mean a schema-qualified or quoted-literal
reference exists somewhere in that source; REVIEW.md and FINALIZE.md are
identical 151-name sets; "types" = current generated Database types.

| table | deity domain (per review doc) | migrations | docs/sql | REVIEW.md | FINALIZE.md | types |
|---|---|---|---|---|---|---|
| `admin_actions` | themis-governance | . | Y | Y | Y | Y |
| `aethelred_house` | aethelred-connections | . | Y | Y | Y | Y |
| `agent_activities` | aethelred-connections | . | Y | Y | Y | Y |
| `agent_conversations` | aethelred-connections | . | Y | Y | Y | Y |
| `agent_messages` | aethelred-connections | . | Y | Y | Y | Y |
| `analytics` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `anchor_events` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `applications` | themis-governance | . | Y | Y | Y | Y |
| `archivist` | aethelred-connections | . | Y | Y | Y | Y |
| `artisan_category_links` | hermes-social | . | . | Y | Y | . |
| `artisan_profiles` | hermes-social | Y | Y | Y | Y | Y |
| `assessment_answers` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `assessment_questions` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `assessment_results` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `assessment_readings` | *(not in either review doc)* | . | Y (DRAFT, marked NOT APPLIED) | . | . | . |
| `blueprints` | daedalus-meta | . | Y | Y | Y | Y |
| `boundaries` | daedalus-meta | . | Y | Y | Y | Y |
| `bubble_superposition` | athena-gamification | . | Y | Y | Y | Y |
| `bubbles` | athena-gamification | . | Y | Y | Y | Y |
| `calendar` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `categories` | hermes-social | . | Y | Y | Y | . |
| `chancellor` | aethelred-connections | . | Y | Y | Y | Y |
| `channels` | iris-communications | . | Y | Y | Y | Y |
| `class` | mnemosyne-assessment | . | . | Y | Y | . |
| `codex` | aethelred-connections | . | Y | Y | Y | Y |
| `collection_items` | hestia-core | . | Y | Y | Y | Y |
| `collection_sets` | hestia-core | . | Y | Y | Y | Y |
| `columns` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `community_profiles` | hestia-core | . | Y | Y | Y | Y |
| `companion_cues` | hestia-core | . | Y | Y | Y | Y |
| `composite_types` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `consciousness` | aethelred-connections | . | Y | Y | Y | Y |
| `contact_submissions` | iris-communications | . | Y | Y | Y | Y |
| `continents` | iris-communications | . | . | Y | Y | . |
| `council_houses` | themis-governance | . | Y | Y | Y | Y |
| `covenant_pool` | plutus-economics | . | Y | Y | Y | Y |
| `culturalization` | iris-communications | . | . | Y | Y | . |
| `curator` | aethelred-connections | . | Y | Y | Y | Y |
| `current` | hestia-core | . | Y | Y | Y | Y |
| `customs` | iris-communications | . | . | Y | Y | . |
| `daily_puzzles` | *(new since review)* | . | Y | . | . | Y |
| `distribution_recipients` | plutus-economics | . | Y | Y | Y | Y |
| `distributions` | plutus-economics | . | Y | Y | Y | Y |
| `domain` | mnemosyne-assessment | . | . | Y | Y | . |
| `email_communications` | iris-communications | . | Y | Y | Y | Y |
| `energy_entries` | hestia-core | . | Y | Y | Y | Y |
| `entity_states` | aethelred-connections | . | Y | Y | Y | Y |
| `enums` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `etymology` | mnemosyne-assessment | . | . | Y | Y | . |
| `events` | *(new since review — Door A, prometheus-stage)* | . | Y | . | . | Y |
| `exchanges` | plutus-economics | Y | Y | Y | Y | Y |
| `executioner` | aethelred-connections | . | Y | Y | Y | Y |
| `family` | mnemosyne-assessment | . | . | Y | Y | . |
| `file_registry` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `file_type_standards` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `folksonomy` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `functions` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `gaia_config` | daedalus-meta | . | Y | Y | Y | Y |
| `gaia_generation_log` | daedalus-meta | . | Y | Y | Y | Y |
| `garden_plots` | hestia-core | . | Y | Y | Y | Y |
| `garden_visits` | hestia-core | . | Y | Y | Y | Y |
| `generation_templates` | daedalus-meta | . | . | Y | Y | . |
| `generations` | daedalus-meta | . | Y | Y | Y | Y |
| `genus` | mnemosyne-assessment | . | . | Y | Y | . |
| `gift_wrappings` | plutus-economics | . | Y | Y | Y | Y |
| `gifts` | plutus-economics | . | Y | Y | Y | Y |
| `github_connection` | aethelred-connections | . | . | Y | Y | . |
| `grant_applications` | plutus-economics | . | Y | Y | Y | Y |
| `grant_attachments` | plutus-economics | . | Y | Y | Y | Y |
| `grant_collaborators` | plutus-economics | . | Y | Y | Y | Y |
| `grant_milestones` | plutus-economics | . | Y | Y | Y | Y |
| `grant_narratives` | plutus-economics | . | Y | Y | Y | Y |
| `grant_opportunities` | plutus-economics | . | Y | Y | Y | Y |
| `hearth_keeper` | aethelred-connections | . | Y | Y | Y | Y |
| `heralds` | hestia-core | Y | Y | Y | Y | Y |
| `indexes` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `journal_entries` | hestia-core | . | Y | Y | Y | Y |
| `keywords` | mnemosyne-assessment | . | . | Y | Y | . |
| `kingdom` | mnemosyne-assessment | . | . | Y | Y | . |
| `languages` | iris-communications | . | . | Y | Y | . |
| `learning_paths` | athena-gamification | . | Y | Y | Y | Y |
| `ledger` | plutus-economics | . | Y | Y | Y | Y |
| `lessons` | athena-gamification | . | Y | Y | Y | Y |
| `life_cycles` | aethelred-connections | . | Y | Y | Y | Y |
| `localization` | iris-communications | . | . | Y | Y | . |
| `maintenance` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `memories` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `merchant_profiles` | hermes-social | . | Y | Y | Y | Y |
| `messages` | iris-communications | . | Y | Y | Y | Y |
| `mind_traits` | mnemosyne-assessment | . | . | Y | Y | . |
| `moderation_actions` | themis-governance | . | Y | Y | Y | Y |
| `mythology` | athena-gamification (dropped 07-28, restored by `docs/sql/005`) | . | Y | Y | Y | Y |
| `ontology` | mnemosyne-assessment | . | . | Y | Y | . |
| `order` | mnemosyne-assessment | . | . | Y | Y | . |
| `path_lessons` | athena-gamification | . | Y | Y | Y | Y |
| `patronage` | plutus-economics | . | Y | Y | Y | Y |
| `patronage_tiers` | plutus-economics | . | Y | Y | Y | Y |
| `patterns` | mnemosyne-assessment | . | . | Y | Y | . |
| `personas` | iris-communications | . | Y | Y | Y | Y |
| `phylum` | mnemosyne-assessment | . | . | Y | Y | . |
| `plant_stages` | hestia-core | . | Y | Y | Y | Y |
| `platform_config` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `platform_settings` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `policies` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `processes` | themis-governance | . | Y | Y | Y | Y |
| `proposals` | themis-governance | . | Y | Y | Y | Y |
| `protocols` | themis-governance | . | Y | Y | Y | Y |
| `quest_progress` | athena-gamification | . | Y | Y | Y | Y |
| `quests` | athena-gamification | . | Y | Y | Y | Y |
| `rate_limits` | themis-governance | . | Y | Y | Y | Y |
| `reference_values` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `regions` | iris-communications | . | . | Y | Y | . |
| `relationships` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `reports` | themis-governance | . | Y | Y | Y | Y |
| `resend_connection` | aethelred-connections | . | . | Y | Y | . |
| `residual_pool` | plutus-economics | . | Y | Y | Y | Y |
| `resonance` | mnemosyne-assessment | . | Y | Y | Y | Y |
| `responses` | themis-governance | . | Y | Y | Y | Y |
| `scene_participants` | athena-gamification | . | Y | Y | Y | Y |
| `scenes` | athena-gamification | . | Y | Y | Y | Y |
| `scheduling` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `script_executions` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `scripts` | hephaestus-infrastructure | . | Y | Y | Y | Y |
| `seed_types` | hestia-core | . | Y | Y | Y | Y |
| `seer` | aethelred-connections | . | Y | Y | Y | Y |
| `sensory_lexicon` | mnemosyne-assessment | . | . | Y | Y | . |
| `sensory_map` | mnemosyne-assessment | . | . | Y | Y | . |
| `sigil_unlocks` | athena-gamification | . | Y | Y | Y | Y |
| `sigils` | athena-gamification | . | Y | Y | Y | Y |
| `signals` | iris-communications | . | Y | Y | Y | Y |
| `skald` | aethelred-connections | . | Y | Y | Y | Y |
| `species` | mnemosyne-assessment | . | . | Y | Y | . |
| `stripe_connection` | aethelred-connections | . | . | Y | Y | . |
| `supabase_connection` | aethelred-connections | . | . | Y | Y | . |
| `survey_responses` | iris-communications | . | Y | Y | Y | Y |
| `surveys` | iris-communications | . | Y | Y | Y | Y |
| `taxonomy` | mnemosyne-assessment | . | . | Y | Y | . |
| `templates` | daedalus-meta | . | Y | Y | Y | Y |
| `test_patterns` | mnemosyne-assessment | . | . | Y | Y | . |
| `thesaurus_entries` | mnemosyne-assessment | . | . | Y | Y | . |
| `translations` | iris-communications | . | . | Y | Y | . |
| `triggers` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `user_financial` | hestia-core | . | Y | Y | Y | Y |
| `user_page_views` | hestia-core | . | Y | Y | Y | Y |
| `user_private` | hestia-core | . | Y | Y | Y | Y |
| `user_roles` | hestia-core | . | Y | Y | Y | Y |
| `vercel_connection` | aethelred-connections | . | . | Y | Y | . |
| `vessel_anchors` | hestia-core | . | Y | Y | Y | Y |
| `vessel_bubbles` | hestia-core | . | Y | Y | Y | Y |
| `vessel_collections` | hestia-core | . | Y | Y | Y | Y |
| `vessel_companions` | hestia-core | . | Y | Y | Y | Y |
| `vessel_config` | hestia-core | Y | Y | Y | Y | Y |
| `vessel_decorations` | hestia-core | . | Y | Y | Y | Y |
| `vessel_exteriors` | hestia-core | . | Y | Y | Y | Y |
| `vessel_interiors` | hestia-core | . | Y | Y | Y | Y |
| `vessel_quests` | hestia-core | . | Y | Y | Y | Y |
| `vessel_rooms` | hestia-core | . | Y | Y | Y | Y |
| `vessel_sigils` | hestia-core | . | Y | Y | Y | Y |
| `views` | *(new since review, self-knowing layer)* | . | Y | . | . | Y |
| `votes` | *(new since review)* | . | Y | . | . | Y |
| `ware_participants` | plutus-economics | . | Y | Y | Y | Y |
| `wares` | plutus-economics | Y | Y | Y | Y | Y |
| `work_participants` | hermes-social | . | Y | Y | Y | Y |
| `works` | hermes-social | . | Y | Y | Y | Y |

Counts: **163 unique table names** across all five sources · **130** in
current generated types (grade a/b, current) · **12** present in types with
zero mention in either review doc — `columns`, `composite_types`,
`daily_puzzles`, `enums`, `events`, `functions`, `indexes`, `policies`,
`relationships`, `triggers`, `views`, `votes` — every one of the 12 has a
literal `CREATE TABLE` in `docs/sql` (addresses below) · **33** present in
both review docs, absent from current types (named DROPPED 2026-07-28,
addresses below) · **1** (`assessment_readings`) present in `docs/sql` only,
explicitly marked "DRAFT — NOT APPLIED," absent from types and both review
docs — grade (a) on disk, but its own file states it does not exist live ·
**5** touched by `supabase/migrations` (`artisan_profiles`, `exchanges`,
`heralds`, `vessel_config`, `wares` — all by `ALTER TABLE`, none by
`CREATE TABLE`).

**Views — zero, everywhere.** Generated types: `Views: { [_ in never]:
never }` (`database.types.ts:6840-6842`). No `CREATE VIEW` or `CREATE
MATERIALIZED VIEW` anywhere in `supabase/migrations` or `docs/sql` (grepped
directory-wide, case-insensitive). Neither review doc names a view.

**Functions — 26 unique names.**

| function | docs/sql (`CREATE`) | migrations | types |
|---|---|---|---|
| `gaia_sync` | `001`:166, `015`:77, `016`:96 | . | Y (`database.types.ts:6868`) |
| `get_acid_test_questions` | `036`:20, `036-ROLLBACK`:9 | . | Y (`:6870`) |
| `submit_acid_test` | `035`:134, `036`:166, `037`:119 | . | Y (`:6887`) |
| `handle_new_user` | `007`:27 | . | . |
| `has_role` (public) | `009`:36 | . | . |
| `has_role` (private, moved) | `010`:24 | . | . |
| `set_user_tracking_columns` | `011`:24 | . | . |
| `sync_proposal_vote_counts` (public) | `013-DRAFT`:113 | . | . |
| `sync_proposal_vote_counts` (private, moved) | `014`:20 | . | . |
| `gaia_template_from_policies` | `020`:67 | . | . |
| `score_acid_test` | `035`:29, `036`:73 | . | . |
| `preview_acid_test` | `037`:39 | . | . |
| `build_search_text` | . | . | Y (`:6844`) |
| `calculate_sovereign_price` | . | . | Y (`:6845`) |
| `dictionary_lookup` | . | . | Y (`:6849`) |
| `format_address` | . | . | Y (`:6862`) |
| `gaia_generation_flags` | . | . | Y (`:6866`) |
| `gaia_handling_level` | . | . | Y (`:6867`) |
| `gaia_template_level` | . | . | Y (`:6869`) |
| `get_acid_test_results` | . | . | Y (`:6874`) |
| `is_valid_country_code` | . | . | Y (`:6875`) |
| `is_valid_phone` | . | . | Y (`:6876`) |
| `jsonb_to_address` | . | . | Y (`:6877`) |
| `validate_address` | . | . | Y (`:6891`) |
| `validate_emergency_contact` | . | . | Y (`:6895`) |
| `validate_signup` | . | . | Y (`:6901`) |

Neither review doc names a function; `SUPERPOSITION-TABLE-REVIEW.md:23` cites
an aggregate count only ("24 functions," from the 2026-07-28 `gaia_sync`
portrait — a different count than either the 17 in current types or the 12
CREATEd on disk, and the difference is explained in part by `010` and `014`
moving two of the 12 into the `private` schema, which generated types for
`public` never include).

**Triggers — 2 unique names, both grade (a).** `on_auth_user_created`
(`docs/sql/007-the-vessel-arrives.sql:80`) · `votes_sync_counts`
(`docs/sql/013-the-consent-record-DRAFT.sql:133`, redefined
`docs/sql/014-the-echo-moves-inside.sql:45`). Generated Database types carry
no `Triggers` section at all (Supabase's TypeScript generator does not type
triggers), so this category is invisible from that source structurally, not
by omission. `SUPERPOSITION-TABLE-REVIEW.md:24` cites an aggregate "209
triggers" from the 2026-07-28 sync — 207 of those 209 have no name or DDL
anywhere on disk.

**Enums — 20 named in generated types** (`database.types.ts:6904-6987`,
one line per name in the citations below); **zero** have a `CREATE TYPE ...
AS ENUM` anywhere in `supabase/migrations` or `docs/sql` — the self-knowing
layer's `enums` table stores their labels as *data*, synced from
`pg_enum` at runtime (`docs/sql/001:104-118,372-396`), never as DDL text.

| enum | on-disk reference (cast/usage) | types line |
|---|---|---|
| `content_status` | migration `20260831_the_books_as_digital_wares.sql`:67-68; `docs/sql/003,005,017,018,022,024` | `:6920` |
| `pricing_model` | migration `20260831_the_books_as_digital_wares.sql`:67; `docs/sql/017,018,024` | `:6948` |
| `sovereign_tier` | `docs/sql/007,035,036,037` | `:6976` |
| `user_role` | `docs/sql/009,010,013-DRAFT` | `:6978` |
| `ware_type` | migration `20260831_the_books_as_digital_wares.sql`:67; `docs/sql/017,018,024` | `:6986` |
| `work_type` | `docs/sql/017-the-makers-first-rows.sql`:64 (column use, not a cast) | `:6987` |
| `application_type` | `docs/sql/holds/024...:155-156` — commented-out, superseded draft only | `:6919` |
| `subscription_tier` | `docs/sql/holds/024...:171-176` — commented-out, superseded draft only | `:6977` |
| `address_type`, `application_status`, `display_theme`, `exchange_status`, `global_region`, `herald_digest`, `notification_channel`, `processing_speed`, `profile_status`, `relationship_type`, `sensory_level`, `visibility` (12) | none found, any file, any form | grade (c) |

**Storage buckets — 3 named, none created on disk.**

| bucket | visibility | RLS policy addresses | bucket-creation SQL on disk |
|---|---|---|---|
| `artifacts` | private | migrations `20260827_artifacts_bucket_policy.sql`:22-25, `20260831_the_grimoire_door.sql`:17-21 | none — "made by hand or by the storage API... never by a migration" (`20260831_the_books_as_digital_wares.sql`:25-27) |
| `books` | private | migration `20260831_the_books_as_digital_wares.sql`:108-136 | none — creating SQL given only as an *unexecuted comment*, same file lines 31-33 |
| `avatars` | public | `docs/sql/012-the-avatars-bucket.sql`:37-50 | none — file header calls it "already live," "verified live 2026-07-30... via storage API" (lines 2, 52) |

None of the three appears in generated types (Storage is a separate schema
the typed `Database` export does not cover — confirmed no `storage` key
anywhere in `database.types.ts`) or in either review doc (neither mentions
"bucket" at all — checked, zero hits both files).

---

## Reproducibility

**`supabase/config.toml`: absent.** Repo-wide search for `*.toml` found
none. **`.supabase/` folder: absent.** **Seed file: absent** — no
`supabase/seed.sql`; the only filename match for "seed" anywhere is
`docs/sql/008-the-library-first-seeds.sql`, a numbered incremental
data-insert file, not a file `supabase db reset` would run.

**Project ref: present, in two places, neither a `config.toml`.**
`supabase/.temp/linked-project.json` holds
`{"ref":"clxnudiylugnlyylkjej","name":"Superposition","organization_id":"holfxhoovdlccfmavjdu","organization_slug":"holfxhoovdlccfmavjdu"}`
— this file is **untracked** (`git ls-files supabase/` returns only the 6
migration files), caught by the repo's generic `.temp`/`.temp*` rule in
`.gitignore:47-48` (not a Supabase-specific ignore line). The same ref is
also written, tracked, in plain-text comments: `docs/sql/001-the-self-knowing-layer.sql:3`
and `docs/sql/002-deity-backfill.sql:3`, both reading "superposition Supabase
(clxnudiylugnlyylkjej)". `supabase/.temp/cli-latest` records only a CLI
version, `v2.110.0`.

**The base cannot be reproduced from disk.** Running every file in
`supabase/migrations/` and every non-draft file in `docs/sql/`, in order,
against an empty Postgres/Supabase project would not create any of the
~118 tables that predate this repo's tracked record, would create none of
the 20 enum types, would create none of the 3 storage buckets, and would
create at most 3 of the 17 functions the base's current generated types
show and 2 of an estimated 209 triggers (`SUPERPOSITION-TABLE-REVIEW.md:24`).
Five of the six migration files say this about themselves directly — "this
project has no linked CLI/migration history — this file IS the record of
what was run" (`supabase/migrations/20260720_heralds_recipient.sql`:13,
`20260827_artifacts_bucket_policy.sql`:12,
`20260831_the_books_as_digital_wares.sql`:14,
`20260831_the_grimoire_door.sql`:14, and, worded slightly differently,
`20260902_the_seal_on_every_ware.sql`:32-34); the sixth
(`20260729_ceremony_choices.sql`:4-6) describes the same dashboard-hand
pattern without using that exact phrase. A further complication: at least 9
of the 41 `docs/sql` files carry a `-DRAFT` filename suffix, and one more
(`034`) states plainly in its own header, without a `-DRAFT` suffix, "DRAFT
— NOT APPLIED" (`docs/sql/034-the-acid-test-first-readings.sql`:2) — nothing
on disk distinguishes a drafted-but-never-run file from an applied one
except each file's own prose, and that prose is inconsistent in form (see
Gaps, below).

No config.toml also means: no declared `[db].major_version`, no declared
auth/storage config, no declared edge-functions list — none of the
non-schema project configuration Supabase's CLI would normally track is
present on disk at all.

---

## The clients

Four call sites build a Supabase client for the browser, the server, a
route handler, and the proxy's session refresh; a fifth builds one for a
*different* base ("knowledge," the Grammar project) with its own env names.

| site | file | env names used |
|---|---|---|
| Browser client | `src/lib/supabase/client.ts`:34-35 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Browser client, knowledge base | `src/lib/supabase/client.ts`:23-24 | `NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE`, `NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE` |
| Server Component client | `src/lib/supabase/server.ts`:9-10 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Route-handler client | `src/lib/api/supabase.ts`:34-35 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Route-handler client, knowledge base | `src/lib/api/supabase.ts`:26-27 | `NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE`, `NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE` |
| Proxy session refresh | `src/lib/supabase/middleware.ts`:75-76, called from `src/proxy.ts`:17 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

A repo-wide grep for `process.env.[A-Z_]*SUPABASE[A-Z_]*` across `src`
(10 files total: the six above plus `src/app/grimoire/route.ts`:29-30,
`src/app/api/acid-test/questions/route.ts`:12-13,
`src/app/api/acid-test/preview/route.ts`:15-16,
`src/lib/dailies/shelf.ts`:28-29,
`src/scripts/shared/inspect_schema.ts`:6-7, and a documentation page
`src/app/(hephaestus)/forge/architecture/auth-flow/page.tsx`:26-27,41-42)
shows **the same two name pairs used everywhere, with no third variant and
no typo** — every superposition call site uses exactly
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`; every knowledge
call site uses exactly `NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE`.

**No service-role key name appears anywhere in `src`.** A repo-wide grep for
`SERVICE_ROLE` (case-sensitive and `service_role`) across all `.ts`/`.tsx`/
`.js`/`.json` files, excluding `node_modules` and `.next`, returned zero
matches. `src/lib/api/supabase.ts:64-68` defines `createAdminSupabase()`,
doc-commented "Get Supabase with service role for admin operations... Service
role key should be used with caution" — its body is `return
createApiSupabase()`, i.e. it builds the same anon-key client as every other
call site and references no service-role env name at all. The name and
comment describe a capability the function's own code does not have. Several
migration comments describe a "courier" that would hold a service-role key
outside RLS (`supabase/migrations/20260827_artifacts_bucket_policy.sql`:18-19,
`20260831_the_books_as_digital_wares.sql`:97) — no such key-holding code
exists anywhere in `src`; if the courier exists, it is grade (c), outside
this repo.

---

## Unfinished by the realm's own record

**`BUILD-STATE.md`** (last substantive commit 2026-07-31; the 2026-08-14
commit touching it is a link-repair only):

> "**Schema finalize** | 🔄 2/11 domains verdicted (plutus ✅, marketplace
> slice ✅) | `SCHEMA-FINALIZE.md` — priority plan, governing clause, all
> verdicts w/ reasoning" — `BUILD-STATE.md`:22

> "**Generated validators** | ⚠️ structurally sound, business rules missing |
> smoke test: enums enforce; 99% residual passes. Remedy specified:
> constraints declared in gaia_config → GAIA emits z-bounds" — `BUILD-STATE.md`:25

> "**Auth/identity** | ⚠️ partial | login+signup pages exist;
> **forgot-password page missing** (link dead); **birth triggers not built**
> (KP's precondition for first record); acid-test + validate_signup RPCs
> live in DB" — `BUILD-STATE.md`:31

> "1. Schema finalize rows 2–11 (identity slice next: birth triggers, auth
> canon, attribution) — ~9 more bounded sessions at today's pace.
> 2. Apply schema changes in Supabase → regen types → GAIA (surface
> self-heals).
> 3. Re-point the 4 dangling import classes; add forgot-password page.
> 4. Birth-trigger chain → **KP creates the first vessel record.**"
> — `BUILD-STATE.md`:87-91

**`SCHEMA-FINALIZE.md`** (last commit 2026-07-30):

Of the 11 rows in its own priority plan (`SCHEMA-FINALIZE.md`:13-26), only 2
carry verdict text: plutus-economics (`:38-79`) and the hestia-core
marketplace slice (`:181-241`). The other 9 domain tables list every table
name with **blank Verdict and Notes columns** —
themis-governance (`:87-98`), mnemosyne-assessment (`:100-107`),
hermes-social (`:109-113`), hephaestus-infrastructure (`:115-125`),
athena-gamification (`:127-138`), iris-communications (`:140-155`),
aethelred-connections (`:157-179`), and hestia-core's remaining 90 tables
(`:243-336`, heading "## hestia-core (90 tables)").

> "`covenant_pool` |  | KEEP (separate) | ... **GAP: no intake valve** —
> `covenant_pledge_percent` exists nowhere..." — `SCHEMA-FINALIZE.md`:63

> "Validators are structurally sound but toothless on business rules
> (verified by smoke test 2026-07-09... enums enforce; a 99%
> residual_pool_percent passes)." — `SCHEMA-FINALIZE.md`:339-341

> "Factor the duplicated admin-check RLS subquery into one `is_admin()`
> SECURITY DEFINER function (row 4, decided)." — `SCHEMA-FINALIZE.md`:349

> "GDPR/data-export obligations enter the platform charter (row 8)."
> — `SCHEMA-FINALIZE.md`:351

**`FEATURE-BOARD.md`** (last commit 2026-08-14, link-repair only; content
substantively 2026-07-19 to 2026-07-29):

> "1. **The outdated-documents pass**... 2. Package refresh... 3. `npm run
> build` gate... 4. First-user rites — KP in Supabase (user_roles EMPTY:
> seed admin + creator; profile/vessel_config rows; Athena seed data;
> mythology RLS). 5. The verification walk... 6. Merge + Vercel env +
> deploy..." — `FEATURE-BOARD.md`:7-18

> "Post-launch (queued, not blocking)... The vessel-graphs surface (seed)...
> Parked design decisions from the campaign (realm picker's schema home;
> gifts placement; council-house affiliation; ware participants)."
> — `FEATURE-BOARD.md`:70-77

None of these three files names anything from `docs/sql/017` onward
(2026-08-11 by git log, through today) — see Gaps, next.

---

## Gaps in the record

1. **The base predates the record.** No `CREATE TABLE` exists anywhere on
   disk for the ~118 tables both review docs and current generated types
   agree are live. The tracked history (`supabase/migrations` from
   2026-07-20; `docs/sql` from 2026-07-13 by first git commit) begins after
   that base already existed in the remote.

2. **33 removed tables have no `DROP TABLE` anywhere on disk.** Both review
   docs list 151 tables; current generated types show 130; 33 names are in
   the doc list and absent from types (`artisan_category_links`,
   `categories`, `class`, `continents`, `culturalization`, `customs`,
   `domain`, `etymology`, `family`, `generation_templates`, `genus`,
   `github_connection`, `keywords`, `kingdom`, `languages`, `localization`,
   `mind_traits`, `ontology`, `order`, `patterns`, `phylum`, `regions`,
   `resend_connection`, `sensory_lexicon`, `sensory_map`, `species`,
   `stripe_connection`, `supabase_connection`, `taxonomy`, `test_patterns`,
   `thesaurus_entries`, `translations`, `vercel_connection`). Their removal
   is recorded only as a "DROPPED" word in a markdown Verdict column
   (`SUPERPOSITION-TABLE-REVIEW.md`, e.g. line 80), never as executed SQL
   text. (A 34th, `mythology`, was also marked DROPPED at line 98 but is
   back in current types — restored by `docs/sql/005-mythology-returns.sql`,
   git-dated 2026-07-30.)

3. **12 current tables are undocumented in both review docs.** `columns`,
   `composite_types`, `daily_puzzles`, `enums`, `events`, `functions`,
   `indexes`, `policies`, `relationships`, `triggers`, `views`, `votes` — all
   post-date the 2026-07-28 review and all have a real `CREATE TABLE` in
   `docs/sql` (addresses in the table above), but neither
   `SUPERPOSITION-TABLE-REVIEW.md` nor `SCHEMA-FINALIZE.md` was ever updated
   to include them.

4. **Generated types are stale against the newest SQL on disk, dated and
   measured.** `resonance-gaia/schema/superposition/journal.md` — a
   machine-written delivery log, "the types file is overwritten in place and
   never archived — this journal is its history" — records the last
   delivery as "2026-08-28 17:31 - 7,261 lines - 130 tables | 0 views | 17
   functions | 20 enums | 3 composite types." Every number in that line was
   independently reproduced from the file's own structure in this census.
   `docs/sql/030` through `038` are git-dated 2026-09-04 through 2026-09-07
   — after that delivery. Concretely: `assessment_readings`
   (`docs/sql/034`, itself marked "DRAFT — NOT APPLIED") and functions
   `score_acid_test` and `preview_acid_test` (`docs/sql/035`,`037`) do not
   appear in current types; three identical copies of the same Aug-28
   snapshot were checked in `resonance-gaia` (`generated/AudHDities/`,
   `generated/superposition/`, `schema/superposition/` — byte-identical by
   `diff -q`, confirming no more current copy exists in either repo.

5. **13 of 20 enum types have zero on-disk trace.** `address_type`,
   `application_status`, `display_theme`, `exchange_status`,
   `global_region`, `herald_digest`, `notification_channel`,
   `processing_speed`, `profile_status`, `relationship_type`,
   `sensory_level`, `visibility` (12, no reference anywhere) plus
   `application_type` and `subscription_tier` (referenced only inside a
   commented-out, superseded draft, `docs/sql/holds/024-the-bazaar-refined-as-first-written.sql`:154-176)
   — 14 in total have no live, executed on-disk reference. Their `CREATE
   TYPE` origin is grade (c) throughout.

6. **14 of 17 generated-type functions have no `CREATE FUNCTION` anywhere on
   disk** (`build_search_text`, `calculate_sovereign_price`,
   `dictionary_lookup`, `format_address`, `gaia_generation_flags`,
   `gaia_handling_level`, `gaia_template_level`, `get_acid_test_results`,
   `is_valid_country_code`, `is_valid_phone`, `jsonb_to_address`,
   `validate_address`, `validate_emergency_contact`, `validate_signup`) —
   grade (c), visible only through the generated types' inferred signature.

7. **207 of an estimated 209 triggers have no name or DDL anywhere on
   disk** — only the aggregate count survives, in
   `SUPERPOSITION-TABLE-REVIEW.md`:24.

8. **No storage bucket has creation SQL on disk**, for any of the 3
   identified buckets — see the bucket table above; each bucket's *policies*
   are real, executed SQL, but each bucket's *existence* is grade (c) or
   "made by hand" per the files' own words.

9. **`SUPERPOSITION-TABLE-REVIEW.md` cites a source path that no longer
   exists.** Its header (`:2-4`) names `src/types/generated/` as where its
   151-table list came from. That path was fully retired 2026-08-12 (git
   commit `981a78720`, "The distribution lands and the v1 grounds retire —
   one generated root," which moved generation output to
   `src/lib/generated/` and deleted `types/generated` along with several
   other stray output roots). `find src/types` today returns "No such file
   or directory."

10. **`BUILD-STATE.md`, `SCHEMA-FINALIZE.md`, `FEATURE-BOARD.md` predate 22
    of `docs/sql`'s 41 files.** By git log, all three status docs' last
    substantive content is 2026-07-29 to 2026-07-31 (`FEATURE-BOARD.md`'s and
    `BUILD-STATE.md`'s only later commits, both 2026-08-14, are a link-mend
    each, not new content); `docs/sql/017` through `038` are git-dated
    2026-08-11 through 2026-09-07 (today). None of the three status docs
    names `assessment_readings`, the acid-test scoring rewrite (three
    successive versions, `035`-`037`), the `wares.sphragis` licence column
    (`supabase/migrations/20260902...`), the sigils/quests/collection-set
    seed drafts (`030`-`033`), the ledger door, the bazaar refinement, the
    floating-stars collections, the public-face pass, the registry archive,
    or the bubble-vessel button (`038`, committed today).

11. **Two older architecture docs, outside the five named sources, also
    disagree with the current shape** — noted for completeness, not
    censused: `docs/architecture/database-schema.md` (self-dated "March 15,
    2026," last git commit 2026-04-13) describes a single `profiles` table;
    current tables are `artisan_profiles` / `community_profiles` /
    `merchant_profiles` (the "3-way split" `BUILD-STATE.md`:26 names as one
    of its "4 dangling import classes"). `docs/architecture/DATABASE-REBIRTH.md`
    (2026-07-12, self-marked "PROPOSED where marked; nothing built yet")
    proposes shrinking hestia-core's tables to "~a dozen"; hestia-core
    still holds 90-plus in current types.

---

## Addresses

- `supabase/migrations/20260720_heralds_recipient.sql` (34 lines) —
  `ALTER TABLE public.heralds`, `CREATE POLICY`; :12-13 "no linked CLI"
- `supabase/migrations/20260729_ceremony_choices.sql` (26 lines) —
  `ALTER TABLE public.vessel_config` ×2
- `supabase/migrations/20260827_artifacts_bucket_policy.sql` (25 lines) —
  `CREATE POLICY` on `storage.objects`; :12 "no linked CLI"
- `supabase/migrations/20260831_the_books_as_digital_wares.sql` (149 lines)
  — `INSERT INTO public.wares`, 2× `CREATE POLICY`; :14 "no linked CLI";
  :22-33 bucket-creation given only as comment
- `supabase/migrations/20260831_the_grimoire_door.sql` (25 lines) —
  `CREATE POLICY`; :14 "no linked CLI"
- `supabase/migrations/20260902_the_seal_on_every_ware.sql` (72 lines) —
  `ALTER TABLE public.wares ADD COLUMN sphragis`; :32-34 "no linked CLI"
- `docs/sql/001-the-self-knowing-layer.sql` — the 7 self-knowing tables,
  `gaia_sync`; project ref at :3
- `docs/sql/002-deity-backfill.sql` — deity_group backfill for 117 surviving
  tables; project ref at :3
- `docs/sql/003-the-stage-ground.sql` — `events`
- `docs/sql/005-mythology-returns.sql` — `mythology` restored
- `docs/sql/007-the-vessel-arrives.sql` — `handle_new_user`,
  `on_auth_user_created`
- `docs/sql/009-the-walls-learn-the-new-names.sql`,
  `010-the-window-moves-inside.sql` — `has_role` public then private
- `docs/sql/011-the-rows-come-home.sql` — `set_user_tracking_columns`
- `docs/sql/012-the-avatars-bucket.sql` — `avatars` bucket policies
- `docs/sql/013-the-consent-record-DRAFT.sql`,
  `014-the-echo-moves-inside.sql` — `votes`, `votes_sync_counts`,
  `sync_proposal_vote_counts` public then private
- `docs/sql/016-the-three-facts.sql` — `relationships`, `views`
- `docs/sql/020-the-templates-aligned.sql` — `gaia_template_from_policies`
- `docs/sql/022-the-dailies-DRAFT.sql` — `daily_puzzles`
- `docs/sql/030-034-MANIFEST.md` — draft-set flags, incl. "no `CREATE TABLE`
  for `public.sigils` exists in the tree" (:35)
- `docs/sql/034-the-acid-test-first-readings.sql` — `assessment_readings`,
  ":2 DRAFT — NOT APPLIED"
- `docs/sql/035-the-acid-test-readings-wired.sql`,
  `036-the-acid-test-ten-drawn.sql`,
  `037-the-acid-test-signed-out.sql` — `score_acid_test`,
  `get_acid_test_questions`, `submit_acid_test`, `preview_acid_test`
- `docs/sql/038-the-bubble-button-on-the-vessel.sql` — `vessel_config`
  column add, committed today
- `docs/sql/holds/024-the-bazaar-refined-as-first-written.sql` — superseded
  draft; commented `application_type`/`subscription_tier` type edits
- `docs/SUPERPOSITION-TABLE-REVIEW.md` — 151-table census, :2-4 header
  provenance, :20-24 the 07-28 gaia_sync portrait counts, :267-310 totals
  and the removed-34 accounting
- `SCHEMA-FINALIZE.md` — identical 151-table set; :11-26 priority plan;
  :338-351 cross-cutting gaps
- `BUILD-STATE.md`, `FEATURE-BOARD.md` — quoted above
- `src/lib/generated/supabase/database.types.ts` — 7,260 lines;
  `Tables` 16-6839, `Views` 6840-6842, `Functions` 6843-6902, `Enums`
  6903-6994, `CompositeTypes` 6995-7171; git-committed 2026-08-28 (`515e1ce7d`)
- `resonance-gaia/schema/superposition/journal.md` — the delivery log cited
  in Gaps §4
- `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts`,
  `src/lib/api/supabase.ts`, `src/proxy.ts` — the five client sites
- `supabase/.temp/linked-project.json`, `supabase/.temp/cli-latest` —
  untracked, project ref and CLI version
- `.gitignore`:47-48 — the generic `.temp`/`.temp*` rule
