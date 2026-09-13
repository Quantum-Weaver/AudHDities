-- ============================================================================
-- 053 — THE STANDING SUPPORT ENDS
-- ============================================================================
-- wares carries billing_interval and stripe_price_id (the recurring road). It
-- gains support_ends_at: the moment standing support stops. Null means it does
-- not stop. The Loom writes it from the Standing support section
-- (src/components/asgard/domains/hermes/studio/StudioForm.tsx,
-- StudioEdit.tsx); src/lib/economics/recurrence.ts reads it; the checkout
-- route carries it on subscription_data.metadata as supportEndsAt and cancelAt
-- (src/app/api/auth/checkout/route.ts), and the webhook sets the
-- subscription's cancel_at from it. A one-time ware holds null in both
-- columns. Safe to run again.
-- ============================================================================

alter table public.wares
  add column if not exists support_ends_at timestamptz null;

comment on column public.wares.support_ends_at is
  'The moment standing support stops. Null means it does not stop.';

alter table public.wares
  drop constraint if exists wares_support_ends_at_needs_interval;
alter table public.wares
  add constraint wares_support_ends_at_needs_interval
  check (support_ends_at is null or billing_interval is not null);

-- CHECK
select column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public' and table_name = 'wares'
   and column_name in ('billing_interval', 'stripe_price_id', 'support_ends_at')
 order by column_name;

select conname, pg_get_constraintdef(oid)
  from pg_constraint
 where conrelid = 'public.wares'::regclass
   and conname = 'wares_support_ends_at_needs_interval';
