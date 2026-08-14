# THE STAGE GROUND DECISION — edge ① of the (prometheus) realm

*Drafted 2026-07-31 by Fable 🎻 (lane prometheus-realm) for KP's ⚛
eye and dashboard. Every schema claim below was verified against the
LIVE base this sitting (anon-door existence probes + the self-knowing
`columns`/`enums`/`gaia_config` registries) — no photographs, per the
base-access guide's lesson 8. The realm bus carries this as edge ①;
nothing wires until this card is ruled.*

## The question

The Stage's 10 data fetches all call one absent door
(`/api/generated/prometheus-stage/events`). The live base (117
tables) holds no `events`, no `recordings` (both PGRST205-confirmed
absent this sitting). Does the Stage get a born table, or stand on
ground the base already holds?

## What the Stage actually needs (union of all 10 rooms' interfaces)

One table's worth. Eleven working columns:

`title` · `description` · `event_type` · `genre`
(music/comedy/workshop/council) · `performer_id` · `is_live` ·
`is_recorded` · `scheduled_for` · `started_at` · `recorded_at` · a
primary key (the UI says `events_id` — an old-schema convention; the
living base uses plain `id` everywhere, so a light rename sweep in
the UI happens under EITHER door).

Query patterns: filter by `genre`, by `is_live`, by `is_recorded`;
order by `scheduled_for` / `started_at` / `recorded_at`.

## What the living base already holds (probed 2026-07-31)

- **`calendar`** (hephaestus-infrastructure): `name`, `description`,
  `event_type`, `start_at`, `end_at`, `is_recurring`,
  `recurrence_rule`, `timezone`, `location_text/uri`,
  `visibility_scope`, `status` (content_status), house-standard
  audit columns. **Covers the scheduled-events need almost whole.**
  Missing for the Stage: `genre`, `performer_id`, `is_live`,
  `started_at`.
- **`works`** (hermes-social): `work_type` enum whose live labels
  are `music · writing · vision · performance · code · other` —
  **the base already knew performances were coming** — plus
  `streaming_url`, `media_urls`, `cover_url`, `price`,
  `pricing_model`, `residual_pool_percent`, `created_by`.
  **A recording is already a work, wearing the Bazaar's own
  dignity.** Missing: nothing structural (a `recorded_at` can be
  `metadata` or `created_at` at pilot).
- **`scenes`** (athena-gamification): left untouched under both
  doors — the double-earmark stands (scene-instances generally; the
  scene renderer's country grows).
- **`content_status`** enum: `draft · published · archived` — no
  "live" state anywhere in the base; liveness needs a column or a
  time-window rule under EITHER door.
- **Config note, base-wide:** all 126 `gaia_config` rows currently
  read `api_access='none'` (the generated routes on disk predate
  this). Whichever door is ruled, the chosen table's row needs its
  api_access opened — that ruling is part of this card.

## DOOR A — born table: `events`, the Stage's own ground

One table, matching the UI as built; the fetch path
`prometheus-stage` becomes true (a twelfth domain, one table big).

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  event_type text,
  genre text,
  performer_id uuid,
  is_live boolean not null default false,
  is_recorded boolean not null default false,
  scheduled_for timestamp with time zone,
  started_at timestamp with time zone,
  recorded_at timestamp with time zone,
  recording_work_id uuid references public.works(id),
  status public.content_status not null default 'draft',
  created_at timestamp with time zone not null default now(),
  created_by uuid,
  updated_at timestamp with time zone not null default now(),
  updated_by uuid
);

alter table public.events enable row level security;

create policy "Public read events" on public.events
  for select using (true);
```

Then: gaia_sync picks it up → set its `gaia_config` row to
`deity_group = 'prometheus-stage'` + open `api_access` → run GAIA →
the absent door exists. UI churn: near zero (the `events_id → id`
rename sweep only).

- **For:** smallest distance to wired; the Stage keeps one clean
  address; `recording_work_id` hands finished recordings to the
  Bazaar without splitting the UI's sources.
- **Against:** table 118 on the very week the base pruned to 117;
  a whole deity domain for one table; overlaps `calendar`'s purpose
  (two places a scheduled thing can live — needs a one-line law for
  which is which).

## DOOR B — existing ground: `calendar` carries the Stage, `works` keeps the recordings

The oldest law's door: what is needed already exists. Scheduled and
live performances are `calendar` rows; recordings are `works` rows
(`work_type = 'performance'`, `streaming_url` live today).

```sql
alter table public.calendar add column genre text;

alter table public.calendar add column performer_id uuid;

alter table public.calendar
  add column is_live boolean not null default false;

alter table public.calendar
  add column started_at timestamp with time zone;
```

Then: open `api_access` on `calendar` + `works` rows in
`gaia_config` → regen. UI churn: moderate — the 10 fetches re-point
to two existing routes (`hephaestus-infrastructure/calendar` for
live/schedule/comedy/music, `hermes-social/works` for recordings)
and field names remap (`title→name`, `scheduled_for→start_at`,
`events_id→id`).

- **For:** zero new tables on pruning week; recordings enter the
  economy natively (pricing, residual pool, the marketplace-IS-the-
  app-store doctrine — "a performance missed is a recording kept,"
  and a recording kept is already a ware); calendar becomes the one
  true home of scheduled things house-wide.
- **Against:** the Stage's one concept splits across two domains;
  four columns land in hephaestus's table for prometheus's sake
  (cross-domain courtesy — their bus should hear it); "live" still
  needs the borrowed `is_live` column either way.

## The lean (one sentence, softly)

Door B honors the week — the base just learned to know itself at
117, and its own `work_type` enum has been waiting to say
"performance" since before this realm had a keeper; Door A remains
the honest fallback if the ruling wants the Stage sovereign on its
own ground. Either door is one dashboard run of yours plus one
bounded sitting of mine to wired.

**Nothing is stone; changes visible, reasoning present. The ruling
is yours, friend — mark the door and I'll run the sitting.**

- [x] **DOOR A** — born `events` (SQL above, run whole)
- [ ] **DOOR B** — calendar + works (SQL above, run whole)
- [ ] **Neither / a third door** (write it below; the card amends,
      never erases)

## THE RULING — 2026-07-31, KP's ⚛ word

**Door A.** His words the same sitting, verbatim: *"Door A"* and
*"and we can update anything needed in other tables to further
support this. we have not gone live yet."* The widening is noted on
the record: supporting changes in other tables are licensed while
the base is pre-live. The run file is
**`docs/sql/003-the-stage-ground.sql`** — Door A's SQL plus the
self-knowing registration (`gaia_sync` + deity_group
`prometheus-stage`), drafted for the dashboard, two-hand rhythm.
One happy provenance note, found during the wiring prep: the
deity_groups config renamed its meta group away from "prometheus"
on 2026-07-07 *because* "Prometheus is the creative-arts realm" —
the house kept this seat's name free for exactly this day.

**WIRED — same day, 2026-07-31.** KP ran 003 (Superposition; one
wrong-base stumble first, zero cost, caught by the verify tail).
Then: anon-door verify (honest `[]`+200) · types repulled
(supabase CLI via the bridge's access token — no login needed) ·
`deity_groups.ts` sequence 11 · GAIA `--deity=prometheus` (6
files, 0 errors) · all ten Stage rooms swept (`events_id`→`id`,
sort dialect) · **tsc 0 · build green (exit 0)**. The Stage
performs on real ground. Full record: CHECKLIST session log
2026-07-31; the realm bus carries the day.

— Fable 🎻 (lane prometheus-realm, the stage lamp)
