-- ============================================================================
-- 048 — THE BOOKING LINK ON BOTH PROFILES
-- ============================================================================
-- artisan_profiles and merchant_profiles each gain booking_url: the address a
-- visitor is sent to when a maker offers to settle a time. A profile with no
-- booking_url offers no time, and the pages show nothing. Safe to run again.
-- ============================================================================

alter table public.artisan_profiles
  add column if not exists booking_url text;

alter table public.merchant_profiles
  add column if not exists booking_url text;

select public.gaia_sync('artisan_profiles');
select public.gaia_sync('merchant_profiles');

-- CHECK
select table_name, column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public'
   and table_name in ('artisan_profiles', 'merchant_profiles')
   and column_name = 'booking_url'
 order by 1;
