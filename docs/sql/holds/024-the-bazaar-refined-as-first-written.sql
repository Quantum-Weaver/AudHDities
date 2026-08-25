-- 024-the-bazaar-refined-DRAFT.sql - the Bazaar's refinement, 2026-08-25
-- Drawn to SPEC §8 (.journals/proofs/03-hermes/SPEC.md).
--
-- RUN THIS BY YOUR OWN HAND, one step at a time. NO LAMP RUNS IT.
-- Nothing in this file was executed by the hand that wrote it, and the live
-- base was not written to at any point in the pass that produced it.
--
-- It follows the new-table ritual (resonance-grammar/docs/sql/000-NEW-TABLE-RITUAL.md):
--   plain statements, NEVER `do $$ ... $$` blocks - a DO-block policy silently
--     failed to take effect once and the plain two-liner worked first try;
--   GRANT before RLS;
--   A POLICY TAKES NO `to` CLAUSE - the false-empty that seed 009 healed
--     across seven tables came from a policy whose role list said
--     {authenticated};
--   verify through the PUBLIC door, not the service key - an anon read is what
--     the app actually sees, and a count of zero right after a successful write
--     means CHECK THE POLICY BEFORE DOUBTING THE WRITE;
--   enums bite at insert time - one unlawful value 400s the whole batch.
--
-- WHAT THE BUILD ALREADY SHIPS WITHOUT THIS FILE:
--   the recurrence flag and the Stripe Price id, in wares.metadata (untyped,
--     tolerable for a POINTER TO STRIPE, which Stripe is the authority on);
--   every room, every empty state, the split, the ledger rows for one-time
--     exchanges, and the delivery road.
-- WHAT WAITS ON IT:
--   renewal idempotency (step 2). Until it runs, the invoice.paid handler
--     REFUSES TO INSERT and logs plainly rather than write an unprovable row.
--     A renewal that can be written twice is a payment counted twice.


-- ---------------------------------------------------------------
-- STEP 1 - the recurrence. ONE of two readings; this file picks the
--          first and prints the second unrun.
-- ---------------------------------------------------------------
-- PICKED: an interval column on wares.
alter table public.wares add column if not exists billing_interval text;

comment on column public.wares.billing_interval is
  'NULL = a one-time ware (every ware today). ''month'' = a recurring ware:
   the Exchange opens Stripe in subscription mode and each renewal writes one
   more exchanges row. Deliberately NOT a new pricing_model value - a rung is
   a fixed price that repeats, not a fifth way of pricing.';

-- WHY NOT A RECURRING pricing_model VALUE:
--   pricing_model is free | fixed | pay_what_you_want | patronage_only - four
--   WAYS OF SETTING A PRICE. A rung is priced `fixed`; what differs is that it
--   repeats. Adding `recurring` to that enum would make the four values answer
--   two different questions - and, the practical half, adding a value to a
--   Postgres enum touches every switch that reads it, including the generated
--   validators and enum maps, which ONLY A GAIA REGEN MAY CHANGE. A nullable
--   text column adds a fact without moving an enum.
--
-- PRINTED, NOT PICKED - the other reading:
-- alter type public.pricing_model add value if not exists 'recurring';
-- Then: every switch above gains a branch, the validators and enum maps are
-- REGENERATED (never hand-edited), and enum values cannot be dropped once
-- added - the rollback is a new type and a table rewrite.


-- ---------------------------------------------------------------
-- STEP 2 - the invoice id, unique. THE RENEWAL'S IDEMPOTENCY.
--          This is the one step the shipped build is actually waiting on.
-- ---------------------------------------------------------------
alter table public.exchanges add column if not exists stripe_invoice_id text;

create unique index if not exists exchanges_stripe_invoice_id_key
  on public.exchanges (stripe_invoice_id)
  where stripe_invoice_id is not null;

comment on column public.exchanges.stripe_invoice_id is
  'One renewal, one row. The unique index is what makes a re-fired invoice.paid
   webhook write nothing twice. NULL for every one-time exchange.';

-- A PARTIAL unique index rather than a unique constraint, so every existing
-- one-time row and every future one keeps a NULL here without colliding.


-- ---------------------------------------------------------------
-- STEP 3 - the Stripe Price id, typed. OPTIONAL; the build ships without it.
-- ---------------------------------------------------------------
-- alter table public.wares add column if not exists stripe_price_id text;
-- Ships without this: the id lives at wares.metadata.stripe_price_id, and
-- src/lib/economics/recurrence.ts reads a typed column first if one appears.
-- With it, the pointer is typed and the metadata copy is dropped.


-- ---------------------------------------------------------------
-- STEP 4 - the doors on wares and works.
--          RUN THE READ FIRST (CHECK RLS-1, below) - only run this step if a
--          signed-in maker cannot read their own draft row through the app's
--          own door.
-- ---------------------------------------------------------------
-- WHAT WAS MEASURED 2026-08-25, and what was not:
--   MEASURED, through the PUBLIC (anon) door: an anon read of wares returns
--     all four published rows, and an anon read of works returns the one
--     published row. So a visitor's read is open and needs nothing here.
--   NOT MEASURED: whether a SIGNED-IN maker can read their own DRAFT row.
--     There are no draft rows in either table today, and no vessel
--     credentials were available to the hand, so the read could not be
--     walked. The shelf therefore ships with its could-not-be-read state and
--     these policies stay here, unrun, for your hand.
--   NOT READ, ever, by any lamp: pg_policies. Whether a select policy exists
--     live is unknown to the build.

-- grant BEFORE rls.
-- grant select on public.wares to anon, authenticated;
-- grant select on public.works to anon, authenticated;

-- alter table public.wares enable row level security;
-- alter table public.works enable row level security;

-- drop policy if exists "wares on the stall are readable by anyone" on public.wares;
-- create policy "wares on the stall are readable by anyone"
--   on public.wares for select
--   using (status = 'published');

-- drop policy if exists "a maker reads their own wares at any status" on public.wares;
-- create policy "a maker reads their own wares at any status"
--   on public.wares for select
--   using (auth.uid() = created_by);

-- drop policy if exists "works on the square are readable by anyone" on public.works;
-- create policy "works on the square are readable by anyone"
--   on public.works for select
--   using (status = 'published');

-- drop policy if exists "a maker reads their own works at any status" on public.works;
-- create policy "a maker reads their own works at any status"
--   on public.works for select
--   using (auth.uid() = created_by);

-- TWO SELECT POLICIES ON ONE TABLE ARE OR'D: a visitor gets published rows, a
-- maker gets published rows PLUS their own at any status. NO `to` CLAUSE ON
-- ANY OF THEM - that is the false-empty seed 009 healed.
--
-- A PROFILE-HELD ROW - one whose created_by is not the vessel but whose
-- artisan_profile_id is the vessel's own seat - is UNWRITTEN, YOURS TO RULE.
-- A second `using` clause joining artisan_profiles would cover it. It is
-- printed here and not written, because every seeded row carries created_by.


-- ---------------------------------------------------------------
-- STEP 5 - the three identifier renames. SEPARATE, OPTIONAL, and each one a
--          real migration.
-- ---------------------------------------------------------------
-- Renaming an enum value is supported but is NOT reversible by a lamp, and it
-- moves every place the value is read: the generated validators and enum maps
-- (src/lib/generated/**) - REGENERATED BY GAIA, YOUR TOOL, never hand-edited -
-- and, for user_role, the Loom's own gate.
-- THE RENAME AND THE GATE MOVE IN THE SAME MOTION OR THE LOOM SHUTS.
-- The gate today: roles.includes('creator') in StudioForm.tsx and
-- StudioShelf.tsx (two places since the shelf was built, 2026-08-25).

-- 5a - application_type. Read at themis's application gate - another realm's door.
-- alter type public.application_type rename value 'creator' to 'artisan';
-- alter type public.application_type rename value 'vendor'  to 'merchant';

-- 5b - user_role. MOVES TOGETHER WITH the Loom's gate, both places.
-- alter type public.user_role rename value 'creator' to 'artisan';
-- alter type public.user_role rename value 'vendor'  to 'merchant';

-- 5c - artisan_profiles.total_creations. Rendered NOWHERE after this pass -
--      its tile was retired 2026-08-25 - but the name outlives the tile.
-- alter table public.artisan_profiles rename column total_creations to total_wares;

-- ALSO PRINTED, NOT DECIDED: merchant_profiles.vendor_name is still an old
-- word in the base. Whether it joins the rename is UNWRITTEN, YOURS TO RULE.


-- ---------------------------------------------------------------
-- STEP 6 - subscription_tier: UNWRITTEN, YOURS TO RULE.
-- ---------------------------------------------------------------
-- subscription_tier = community | ally | council | corporate. No column
-- anywhere uses it. It is NOT the ruled set (Supporter / Guardian / Steward /
-- Visionary / Sovereign). Two ladders should not stand in one base.
-- drop type if exists public.subscription_tier;
-- PRINTED, NOT DECIDED.


-- ---------------------------------------------------------------
-- STEP 7 - the bucket is NOT here.
-- ---------------------------------------------------------------
-- A storage bucket is created through the storage API, not SQL - the house's
-- own precedent says so (docs/sql/012-the-avatars-bucket.sql, a record of
-- applied work). THE WARES BUCKET IS YOUR HAND, NOT YET CREATED, and this
-- DRAFT neither creates nor assumes it.
--
-- The build's delivery route reads file_registry.bucket_name off the row and
-- mints a signed URL from whatever bucket the row names, so nothing in the app
-- has to change when the bucket appears. The Loom writes its body rows with
-- bucket_name 'wares' and status 'draft', so nothing is offered to anyone
-- until you publish them.


-- ---------------------------------------------------------------
-- STEP 8 - THE FIVE RUNGS. A DRAFT BLOCK, NEVER RUN BY A LAMP.
-- ---------------------------------------------------------------
-- SEEDING IS YOUR HAND, AFTER THE MIGRATION. Replace <artisan_profile_id> and
-- <kp_user_id> with the real ids, and each <price_...> with the Stripe Price
-- you created by your own hand in the dashboard. A LAMP CREATES NO STRIPE
-- OBJECT: the app reads a Price id and never mints one.
--
-- THE ENUM BITE, NAMED BEFORE THE INSERT (ritual lesson 3):
--   ware_type      must be physical | digital | service        -> service here
--   pricing_model  must be free | fixed | pay_what_you_want
--                       | patronage_only                       -> fixed here
--   content_status must be draft | published | archived        -> published here
-- ONE UNLAWFUL VALUE 400s THE WHOLE BATCH. The member listing, when in doubt:
--   select t.typname, e.enumlabel from pg_type t
--     join pg_enum e on e.enumtypid = t.oid order by t.typname, e.enumsortorder;
--
-- EQUAL WEIGHT, ALWAYS. No rung is marked popular, recommended or best value.
-- The only difference between the five is the amount.

-- insert into public.wares
--   (name, slug, description, ware_type, pricing_model, price, currency,
--    residual_pool_percent, billing_interval, status, created_by,
--    artisan_profile_id, icon_emoji, metadata)
-- values
--   ('Supporter','supporter','A small steady thing, month by month.',
--    'service','fixed',10.00,'usd',50,'month','published',
--    '<kp_user_id>','<artisan_profile_id>','🕯️',
--    '{"stripe_price_id":"<price_supporter>"}'::jsonb),
--   ('Guardian','guardian','A little more, in a month when there is a little more.',
--    'service','fixed',25.00,'usd',50,'month','published',
--    '<kp_user_id>','<artisan_profile_id>','🛡️',
--    '{"stripe_price_id":"<price_guardian>"}'::jsonb),
--   ('Steward','steward','For a month with room to spare, and no month after it is owed.',
--    'service','fixed',50.00,'usd',50,'month','published',
--    '<kp_user_id>','<artisan_profile_id>','🌿',
--    '{"stripe_price_id":"<price_steward>"}'::jsonb),
--   ('Visionary','visionary','For someone who wants the long build to have a floor under it.',
--    'service','fixed',100.00,'usd',50,'month','published',
--    '<kp_user_id>','<artisan_profile_id>','🔮',
--    '{"stripe_price_id":"<price_visionary>"}'::jsonb),
--   ('Sovereign','sovereign','The largest rung in the set, here because the set has one.',
--    'service','fixed',250.00,'usd',50,'month','published',
--    '<kp_user_id>','<artisan_profile_id>','👑',
--    '{"stripe_price_id":"<price_sovereign>"}'::jsonb);

-- The five rungs' split, to the cent, computed by src/lib/economics/split.ts
-- and proved by src/lib/economics/split.test.ts (48/48 assertions, 2026-08-25):
--   Supporter $10.00  fee $1.00  -> pool $0.30 · machine $0.70   profit $9.00   -> pledged $4.50   · to you $4.50
--   Guardian  $25.00  fee $2.50  -> pool $0.75 · machine $1.75   profit $22.50  -> pledged $11.25  · to you $11.25
--   Steward   $50.00  fee $5.00  -> pool $1.50 · machine $3.50   profit $45.00  -> pledged $22.50  · to you $22.50
--   Visionary $100.00 fee $10.00 -> pool $3.00 · machine $7.00   profit $90.00  -> pledged $45.00  · to you $45.00
--   Sovereign $250.00 fee $25.00 -> pool $7.50 · machine $17.50  profit $225.00 -> pledged $112.50 · to you $112.50
-- Not one of the five leaves an odd cent at the price. The set's one half-cent
-- is Guardian's COVENANT step, $11.25 -> $5.625, which floors to $5.62 with the
-- half cent staying with you.


-- ---------------------------------------------------------------
-- STEP 9 - VERIFY THROUGH THE PUBLIC DOOR, not the service key.
-- ---------------------------------------------------------------
-- An anon read of wares returns the published rows:
--   select id, name, status, billing_interval from public.wares
--     where status = 'published' order by created_at desc;
--
-- A signed-in maker's read returns their drafts too - CHECK RLS-1, the read
-- this pass could not walk:
--   GET /api/generated/plutus-economics/wares?created_by=<self>
--   GET /api/generated/hermes-social/works?created_by=<self>
-- with at least one draft row present, in a signed-in browser session.
--   If the draft row comes back, step 4 is not needed at all.
--   If it does not, run step 4.
--
-- A COUNT OF ZERO RIGHT AFTER A SUCCESSFUL WRITE MEANS CHECK THE POLICY
-- BEFORE DOUBTING THE WRITE (ritual lesson 1).
