-- 20260831_the_books_as_digital_wares.sql
-- ============================================================================
-- THE BOOKS AS DIGITAL WARES (2026-08-31)
-- Three books by KP, the Quantum Weaver — The Poems, The Lyrics, The
-- Philosophies — go on the stall as digital wares. The EPUB (and DOCX) bodies
-- live in a PRIVATE Storage bucket `books`, keyed `<slug>.epub` /
-- `<slug>.docx`, and are handed to a buyer by
-- src/app/api/books/[slug]/download/route.ts, which mints a signed URL
-- through the buyer's own Supabase client. The entitlement is the row the
-- Stripe webhook already writes: public.exchanges with status 'completed'
-- for that buyer and that ware. Storage RLS below is the real gate.
-- ============================================================================
-- RUN, by KP's hand, in the Supabase dashboard SQL editor (this project has
-- no linked CLI/migration history — this file IS the record of what was run).
-- Safe to run again: every statement skips what already exists.
--
-- NOTHING IS ON SALE WHEN THIS RUNS. Every row lands `status = 'draft'`;
-- the stall's own policy ("wares on the stall are readable by anyone",
-- 024 step 4) shows only 'published'. A draft staying dark through the anon
-- door is the gate working, never a false-empty.

-- ============================================================================
-- 1 · THE BUCKET — KP's hand, not this file
-- ============================================================================
-- Buckets in this base have been made by hand or by the storage API (012 —
-- the avatars bucket; 2026-08-27 — the artifacts bucket flipped private), never
-- by a migration, so this file does not insert into storage.buckets. Make it
-- either way at your word: the courier's ENSURE-BUCKET duty, or this exact
-- SQL in the dashboard editor:
--
--   insert into storage.buckets (id, name, public)
--     values ('books', 'books', false)
--     on conflict (id) do nothing;
--
-- PRIVATE. Nobody's public URL reaches it; only a signed URL minted under a
-- session that the policies in step 3 let through.

-- ============================================================================
-- 2 · THE THREE WARES
-- ============================================================================
-- Same shape as 024 step 5: the artisan is the one artisan profile in the base
-- (KP's stall), `created_by` is that profile's own maker. If no artisan profile
-- exists yet, the cross join yields no rows and nothing is inserted — look at
-- step 4 and you will know.
--
--   ware_type      'digital'  (enum ware_type: physical · digital · service)
--   pricing_model  'fixed'    (enum pricing_model: free · fixed ·
--                              pay_what_you_want · patronage_only)
--   status         'draft'    (enum content_status: draft · published · archived)
--
-- KP: set price — `price` is NULL here on purpose; the checkout refuses a
--   ware with no price ("Ware has no valid price"), so set each book's price
--   before flipping it to 'published'.
-- KP: set stripe_price_id — NULL here; the id comes from your own Stripe
--   dashboard. A LAMP CREATES NO STRIPE OBJECT. (One-time wares check out on
--   `price` via price_data today; the column is kept for the day the Stripe
--   Price is the record.)
-- cover_url and media_urls are left NULL — the covers are yours to place.

insert into public.wares
  (name, slug, description, icon_emoji,
   price, currency, pricing_model, ware_type, status,
   residual_pool_percent, requires_shipping, quantity_available,
   stripe_price_id, cover_url, media_urls, metadata,
   artisan_profile_id, created_by)
select v.name, v.slug, v.description, v.icon,
       null, 'USD', 'fixed'::public.pricing_model, 'digital'::public.ware_type,
       'draft'::public.content_status,
       50, false, null,
       null, null, null,
       jsonb_build_object(
         'author', 'KP, the Quantum Weaver',
         'formats', jsonb_build_array('epub', 'docx'),
         'bucket', 'books',
         'delivery', '/api/books/' || v.slug || '/download'
       ),
       a.id, a.created_by
from (values
  ('The Poems',        'the-poems',
   'The Poems, by KP, the Quantum Weaver. Delivered as EPUB, with DOCX beside it.',
   '📜'),
  ('The Lyrics',       'the-lyrics',
   'The Lyrics, by KP, the Quantum Weaver. Delivered as EPUB, with DOCX beside it.',
   '🎼'),
  ('The Philosophies', 'the-philosophies',
   'The Philosophies, by KP, the Quantum Weaver. Delivered as EPUB, with DOCX beside it.',
   '🕯️')
) as v(name, slug, description, icon)
cross join (
  select id, created_by from public.artisan_profiles order by created_at limit 1
) as a
on conflict (slug) do nothing;

-- ============================================================================
-- 3 · THE WALLS ON THE BUCKET
-- ============================================================================
-- Reads only. Writes stay the courier's (service key, outside RLS) — no
-- policy here grants insert/update/delete, and none should.
--
-- An object's slug is its name with the extension struck: `the-poems.epub`
-- -> `the-poems`. A buyer reads the objects of a ware they hold a completed
-- exchange for; the maker reads their own. The sub-selects run under the
-- reader's own RLS: exchanges (a buyer sees their own rows) and wares (the
-- stall shows 'published'; a maker sees their own at any status). If a book
-- is ever moved to 'archived', its buyers lose this read until it is
-- published again — name that day if it comes.

drop policy if exists "books: a buyer reads the book they hold" on storage.objects;
create policy "books: a buyer reads the book they hold"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'books'
    and exists (
      select 1
      from public.exchanges e
      join public.wares w on w.id = e.ware_id
      where e.buyer_id = auth.uid()
        and e.status = 'completed'
        and w.slug = regexp_replace(name, '\.[^.]*$', '')
    )
  );

drop policy if exists "books: the maker reads their own" on storage.objects;
create policy "books: the maker reads their own"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'books'
    and exists (
      select 1
      from public.wares w
      where w.created_by = auth.uid()
        and w.slug = regexp_replace(name, '\.[^.]*$', '')
    )
  );

-- ============================================================================
-- 4 · LOOK
-- ============================================================================
-- select slug, name, ware_type, pricing_model, price, status, stripe_price_id
--   from public.wares
--   where slug in ('the-poems', 'the-lyrics', 'the-philosophies')
--   order by slug;
--
-- THE SHELF AFTER THIS RUNS — three, all dark until your hand:
--    fixed   The Poems          📜   draft   (price: yours · epub/docx: upload)
--    fixed   The Lyrics         🎼   draft
--    fixed   The Philosophies   🕯️   draft
