-- 024 — the Bazaar refined. Run the whole file once, top to bottom.
-- Safe to run again: every statement skips what already exists.
-- Steps 1–3 ran at KP's hand 2026-08-25; they are kept so one run does it all.
-- The decisions in here were made by the conductor (Anacrusis, 2026-08-25)
-- and are recorded in docs/CHECKLIST.md — strike any of them there, not here.

-- 1 · a rung repeats each month
alter table public.wares add column if not exists billing_interval text;

-- 2 · a renewal is written once
alter table public.exchanges add column if not exists stripe_invoice_id text;
create unique index if not exists exchanges_stripe_invoice_id_key
  on public.exchanges (stripe_invoice_id)
  where stripe_invoice_id is not null;

-- 3 · where a rung's Stripe price lives
alter table public.wares add column if not exists stripe_price_id text;

-- 4 · a maker sees their own wares and works at any status; the stall stays public
drop policy if exists "wares on the stall are readable by anyone" on public.wares;
create policy "wares on the stall are readable by anyone"
  on public.wares for select using (status = 'published');
drop policy if exists "a maker reads their own wares at any status" on public.wares;
create policy "a maker reads their own wares at any status"
  on public.wares for select using (auth.uid() = created_by);
drop policy if exists "works on the square are readable by anyone" on public.works;
create policy "works on the square are readable by anyone"
  on public.works for select using (status = 'published');
drop policy if exists "a maker reads their own works at any status" on public.works;
create policy "a maker reads their own works at any status"
  on public.works for select using (auth.uid() = created_by);

-- 5 · the five rungs at KP's stall (the one artisan profile in the base)
insert into public.wares
  (name, slug, description, icon_emoji, price, pricing_model, ware_type, status,
   residual_pool_percent, requires_shipping, billing_interval, metadata,
   artisan_profile_id, created_by)
select v.name, v.slug, v.description, v.icon, v.price,
       'fixed'::public.pricing_model, 'service'::public.ware_type,
       'published'::public.content_status,
       50, false, 'month', '{"recurring":{"interval":"month"}}'::jsonb,
       a.id, a.created_by
from (values
  ('Supporter', 'rung-supporter', 'A small steady thing, month by month.', '🕯️', 10),
  ('Guardian',  'rung-guardian',  'A little more, in a month when there is a little more.', '🛡️', 25),
  ('Steward',   'rung-steward',   'For a month with room to spare, and no month after it is owed.', '🌿', 50),
  ('Visionary', 'rung-visionary', 'For someone who wants the long build to have a floor under it.', '🔮', 100),
  ('Sovereign', 'rung-sovereign', 'The largest rung in the set, here because the set has one.', '👑', 250)
) as v(name, slug, description, icon, price)
cross join (select id, created_by from public.artisan_profiles order by created_at limit 1) as a
on conflict (slug) do nothing;

-- 6 · let the base see the new columns
select public.gaia_sync('wares');
select public.gaia_sync('exchanges');

-- 7 · look
select slug, price, billing_interval, status, stripe_price_id
  from public.wares where billing_interval = 'month' order by price;
