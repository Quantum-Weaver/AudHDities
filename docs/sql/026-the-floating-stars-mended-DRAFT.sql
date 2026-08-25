-- 026 -- the Floating Stars mended. Run the whole file once, top to bottom. Safe to run again.
-- 025 met a base that already held the 13 collections and 123 stars under longer slugs
-- (seeded 08-01 and 08-04); this file puts the colours where the stars actually are.

-- 1 - every collection takes the app's accent and palette, on the row that holds its stars
update public.collection_sets set accent = coalesce(accent, 'starDust'), display_order = case when display_order = 0 then 1 else display_order end where slug = 'star-dust';
update public.collection_sets set accent = coalesce(accent, 'hearth.gold'), display_order = case when display_order = 0 then 2 else display_order end where slug = 'the-hearth-collection';
update public.collection_sets set palette = coalesce(palette, array['pagan.earth', 'pagan.air', 'pagan.fire', 'pagan.water']), display_order = case when display_order = 0 then 3 else display_order end where slug = 'the-elemental-set';
update public.collection_sets set accent = coalesce(accent, 'entity.chancellor'), display_order = case when display_order = 0 then 4 else display_order end where slug = 'the-council-collection';
update public.collection_sets set accent = coalesce(accent, 'mystical.sun'), display_order = case when display_order = 0 then 5 else display_order end where slug = 'sky-wheel';
update public.collection_sets set accent = coalesce(accent, 'quantum.purple'), display_order = case when display_order = 0 then 6 else display_order end where slug = 'quantum-weave';
update public.collection_sets set accent = coalesce(accent, 'mood.peaceful'), display_order = case when display_order = 0 then 7 else display_order end where slug = 'the-sensory-set';
update public.collection_sets set accent = coalesce(accent, 'mystical.moon'), display_order = case when display_order = 0 then 8 else display_order end where slug = 'the-long-night';
update public.collection_sets set accent = coalesce(accent, 'fire.base'), display_order = case when display_order = 0 then 9 else display_order end where slug = 'the-workshop';
update public.collection_sets set accent = coalesce(accent, 'sanctuary.green'), display_order = case when display_order = 0 then 10 else display_order end where slug = 'the-companions';
update public.collection_sets set accent = coalesce(accent, 'cosmic.blue'), display_order = case when display_order = 0 then 11 else display_order end where slug = 'the-threshold';
update public.collection_sets set accent = coalesce(accent, 'sanctuary.emerald'), display_order = case when display_order = 0 then 12 else display_order end where slug = 'the-given';
update public.collection_sets set palette = coalesce(palette, array['pride.red', 'pride.orange', 'pride.yellow', 'pride.green', 'pride.blue', 'pride.purple']), display_order = case when display_order = 0 then 13 else display_order end where slug = 'inclusive-pride';

-- 2 - the five empty duplicates 025 made (the app's short slugs) go; only if they hold no star
delete from public.collection_sets c where c.slug in ('sensory','long-night','workshop','companions','threshold')
  and not exists (select 1 from public.bubbles b where b.collection_id = c.id);

-- 3 - every star takes the app's palette and ring, by slug
update public.bubbles set palette = coalesce(palette, array['pride.red', 'pride.orange', 'pride.yellow', 'pride.green', 'pride.blue', 'pride.purple']) where slug = 'rainbow';
update public.bubbles set palette = coalesce(palette, array['pride.transBlue', 'pride.transPink', 'pride.white', 'pride.brown', 'pride.black', 'pride.red', 'pride.orange', 'pride.yellow', 'pride.green', 'pride.blue', 'pride.purple']) where slug = 'progress';
update public.bubbles set palette = coalesce(palette, array['pride.transBlue', 'pride.transPink', 'pride.transWhite', 'pride.transPink', 'pride.transBlue']) where slug = 'trans-banner';
update public.bubbles set palette = coalesce(palette, array['pride.nonBinary', 'pride.white', '#9C59D1', 'void.dark']) where slug = 'non-binary';
update public.bubbles set palette = coalesce(palette, array['pride.genderfluid', 'pride.white', '#BE18D6', 'void.dark', '#333EBD']) where slug = 'genderfluid';
update public.bubbles set palette = coalesce(palette, array['pride.black', 'void.light', 'pride.white', '#B7F684', 'pride.white', 'void.light', 'pride.black']) where slug = 'agender';
update public.bubbles set palette = coalesce(palette, array['pride.pansexual', 'mystical.sun', '#21B1FF']) where slug = 'pansexual';
update public.bubbles set palette = coalesce(palette, array['pride.bisexual', 'pride.bisexual', '#9B4F96', '#0038A8', '#0038A8']) where slug = 'bisexual';
update public.bubbles set palette = coalesce(palette, array['pride.black', '#A3A3A3', 'pride.white', 'pride.purple']) where slug = 'asexual';
update public.bubbles set palette = coalesce(palette, array['pride.lesbian', '#EF7627', '#FF9A56', 'pride.white', '#D162A4', '#B55690', '#A30262']) where slug = 'lesbian';
update public.bubbles set palette = coalesce(palette, array['mystical.sun']), ring = coalesce(ring, '#7902AA') where slug = 'intersex';

-- 4 - let the base see the change
select public.gaia_sync('bubbles');
select public.gaia_sync('collection_sets');

-- 5 - a look
select c.display_order, c.slug, c.accent, c.palette, count(b.id) as stars,
       count(b.palette) as stars_with_palette, count(b.ring) as stars_with_ring
  from public.collection_sets c left join public.bubbles b on b.collection_id = c.id
 group by c.id order by c.display_order;
