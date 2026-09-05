-- ============================================================================
-- 035 — THE ACID TEST'S READINGS WIRED
-- ============================================================================
-- This file creates public.score_acid_test, replaces public.submit_acid_test,
-- and publishes the twenty-one rows of public.assessment_readings.
-- score_acid_test is pure: it reads the published questions, matches each
-- answer to its question by question_id and falls back to the answer's
-- position in the array, takes the chosen option's score from an explicit
-- score, an option_index, a numeric value, or the option's text, and returns
-- {total_score, category_scores}. Per category it reports the sum of the
-- chosen scores, the highest possible sum for that category — the top option
-- score of each of its published questions — their ratio, and a band: low
-- below 0.34, mid below 0.67, otherwise high. Every published category is
-- reported, an unanswered one at zero. submit_acid_test calls it, writes the
-- category scores into result_data.category_scores, and joins one published
-- reading per category by band, in the display order of each category's first
-- question, into the return as readings and into recommendations as entries of
-- type 'reading'. Persona and tier are unchanged: the persona comes from
-- public.personas by total score in bands of twenty capped at the last, the
-- recommended tier is guild at fifty and dweller below it, and a dweller is
-- promoted to guild and never demoted. Rerunning is safe: both functions are
-- CREATE OR REPLACE and the publish updates only rows still in draft.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1 — the scoring function
-- ----------------------------------------------------------------------------

create or replace function public.score_acid_test(p_answers jsonb)
returns jsonb
language plpgsql
stable
set search_path to ''
as $score_acid_test$
declare
  v_total_score integer := 0;
  v_category_scores jsonb := '{}'::jsonb;
begin
  with q as (
    select aq.id,
           aq.category,
           aq.display_order,
           case when jsonb_typeof(aq.options) = 'array' then aq.options else '[]'::jsonb end as options,
           row_number() over (order by aq.display_order, aq.id) as position
      from public.assessment_questions aq
     where aq.status = 'published'
  ),
  a as (
    select e.ord, e.elem
      from jsonb_array_elements(
             case when jsonb_typeof(coalesce(p_answers, '[]'::jsonb)) = 'array'
                  then p_answers
                  else '[]'::jsonb end
           ) with ordinality as e(elem, ord)
     where jsonb_typeof(e.elem) = 'object'
  ),
  matched as (
    select a.elem,
           coalesce(
             (select q.id from q where q.id::text = a.elem->>'question_id'),
             (select q.id from q where q.position = a.ord)
           ) as question_id
      from a
  ),
  chosen as (
    select q.category,
           coalesce(
             case when m.elem->>'score' ~ '^-?[0-9]+$'
                  then (m.elem->>'score')::integer end,
             (select (o.opt->>'score')::integer
                from jsonb_array_elements(q.options) with ordinality as o(opt, idx)
               where coalesce(m.elem->>'option_index', m.elem->>'value') ~ '^[0-9]+$'
                 and idx = coalesce(m.elem->>'option_index', m.elem->>'value')::integer + 1
               limit 1),
             (select (o.opt->>'score')::integer
                from jsonb_array_elements(q.options) as o(opt)
               where o.opt->>'text' = coalesce(m.elem->>'text', m.elem->>'label', m.elem->>'value')
               limit 1),
             0
           ) as score
      from matched m
      join q on q.id = m.question_id
  ),
  maxima as (
    select q.category,
           min(q.display_order) as first_order,
           coalesce(sum(
             coalesce((select max((o.opt->>'score')::integer)
                         from jsonb_array_elements(q.options) as o(opt)), 0)
           ), 0)::integer as max_score
      from q
     group by q.category
  ),
  banded as (
    select m.category,
           m.first_order,
           m.max_score,
           coalesce((select sum(c.score) from chosen c where c.category = m.category), 0)::integer as score
      from maxima m
  ),
  rated as (
    select b.category,
           b.first_order,
           b.max_score,
           b.score,
           case when b.max_score > 0
                then round(b.score::numeric / b.max_score, 4)
                else 0::numeric end as ratio
      from banded b
  )
  select coalesce(sum(r.score), 0)::integer,
         coalesce(jsonb_object_agg(r.category, jsonb_build_object(
           'score', r.score,
           'max', r.max_score,
           'ratio', r.ratio,
           'band', case when r.ratio < 0.34 then 'low'
                        when r.ratio < 0.67 then 'mid'
                        else 'high' end
         )), '{}'::jsonb)
    into v_total_score, v_category_scores
    from rated r;

  return jsonb_build_object(
    'total_score', v_total_score,
    'category_scores', v_category_scores
  );
end;
$score_acid_test$;

-- ----------------------------------------------------------------------------
-- STEP 2 — the submit function
-- ----------------------------------------------------------------------------

create or replace function public.submit_acid_test(p_user_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
set search_path to ''
as $submit_acid_test$
declare
  v_total_score INTEGER := 0;
  v_persona_name TEXT;
  v_persona_description TEXT;
  v_recommended_tier public.sovereign_tier;
  v_current_tier public.sovereign_tier;
  v_promoted BOOLEAN := false;
  v_result_id UUID;
  v_scoring JSONB;
  v_category_scores JSONB := '{}'::jsonb;
  v_readings JSONB := '[]'::jsonb;
  v_recommendations JSONB := '[]'::jsonb;
BEGIN
  -- Verify the caller matches the user
  IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Not authorized to submit assessment for this sovereign'
    );
  END IF;

  -- Score the answers by category
  v_scoring := public.score_acid_test(p_answers);
  v_total_score := COALESCE((v_scoring->>'total_score')::INTEGER, 0);
  v_category_scores := COALESCE(v_scoring->'category_scores', '{}'::jsonb);

  -- Determine persona based on total score (simplified mapping)
  SELECT name, description INTO v_persona_name, v_persona_description
  FROM public.personas
  WHERE persona_type = 'acid_test'
    AND display_order = LEAST(
      (SELECT MAX(display_order) FROM public.personas WHERE persona_type = 'acid_test'),
      GREATEST(1, FLOOR(v_total_score::NUMERIC / 20)::INTEGER + 1)
    );

  -- Determine recommended tier
  IF v_total_score >= 50 THEN
    v_recommended_tier := 'guild';
  ELSE
    v_recommended_tier := 'dweller';
  END IF;

  -- Get current tier for promotion check
  SELECT sovereign_tier INTO v_current_tier
  FROM public.community_profiles
  WHERE id = p_user_id;

  -- Promote only if the new tier is higher
  IF v_current_tier IS NULL OR v_current_tier = 'dweller' THEN
    IF v_recommended_tier = 'guild' THEN
      UPDATE public.community_profiles
      SET sovereign_tier = 'guild'
      WHERE id = p_user_id;
      v_promoted := true;
      v_current_tier := 'guild';
    ELSE
      v_current_tier := COALESCE(v_current_tier, 'dweller');
    END IF;
  END IF;

  -- One published reading per category, in the question order of the categories
  SELECT COALESCE(jsonb_agg(
           jsonb_build_object(
             'category', r.category,
             'band', r.band,
             'summary_text', r.summary_text,
             'recommendations', r.recommendations
           ) ORDER BY o.first_order
         ), '[]'::jsonb)
    INTO v_readings
    FROM jsonb_each(v_category_scores) AS cs(category, entry)
    JOIN public.assessment_readings r
      ON r.category = cs.category
     AND r.band = cs.entry->>'band'
     AND r.status = 'published'
    JOIN (
      SELECT category, MIN(display_order) AS first_order
        FROM public.assessment_questions
       WHERE status = 'published'
       GROUP BY category
    ) o ON o.category = cs.category;

  -- Build recommendations
  v_recommendations := jsonb_build_array(
    jsonb_build_object(
      'type', 'tier',
      'message', CASE WHEN v_promoted
        THEN 'You have been recognized as guild. Community pricing is now available to you.'
        ELSE 'Your tier remains ' || v_current_tier || '.'
      END
    ),
    jsonb_build_object(
      'type', 'persona',
      'message', 'Your persona is ' || v_persona_name || '. ' || v_persona_description
    ),
    jsonb_build_object(
      'type', 'next_steps',
      'message', 'Explore the Sanctuary. Your vessel has been updated.'
    )
  ) || COALESCE(
    (SELECT jsonb_agg(
       jsonb_build_object(
         'type', 'reading',
         'category', rd->>'category',
         'band', rd->>'band',
         'message', rd->>'summary_text',
         'recommendations', rd->'recommendations'
       )
     )
     FROM jsonb_array_elements(v_readings) AS rd),
    '[]'::jsonb
  );

  -- Insert the result
  INSERT INTO public.assessment_results (
    created_by,
    category,
    result_data,
    summary_text,
    recommendations,
    status,
    completed_at
  ) VALUES (
    p_user_id,
    'acid_test',
    jsonb_build_object(
      'total_score', v_total_score,
      'persona_name', v_persona_name,
      'persona_description', v_persona_description,
      'recommended_tier', v_recommended_tier,
      'answers', p_answers,
      'category_scores', v_category_scores,
      'promoted', v_promoted
    ),
    'Acid Test completed. Persona: ' || v_persona_name || '. Tier: ' || v_current_tier || '.',
    v_recommendations,
    'completed',
    now()
  )
  RETURNING id INTO v_result_id;

  RETURN jsonb_build_object(
    'success', true,
    'result_id', v_result_id,
    'total_score', v_total_score,
    'persona', v_persona_name,
    'persona_description', v_persona_description,
    'tier', v_current_tier,
    'recommended_tier', v_recommended_tier,
    'promoted', v_promoted,
    'category_scores', v_category_scores,
    'readings', v_readings,
    'recommendations', v_recommendations,
    'message', CASE WHEN v_promoted
      THEN 'Welcome to the guild. Your pricing has been updated.'
      ELSE 'Assessment complete. Your results have been recorded.'
    END
  );
END;
$submit_acid_test$;

-- ----------------------------------------------------------------------------
-- STEP 3 — publish the readings
-- ----------------------------------------------------------------------------

update public.assessment_readings
   set status = 'published'
 where status = 'draft';

-- ----------------------------------------------------------------------------
-- STEP 4 — VERIFY (expect 21 published readings and both functions present)
-- ----------------------------------------------------------------------------

select count(*) as published_readings
  from public.assessment_readings
 where status = 'published';

select p.proname, pg_get_function_identity_arguments(p.oid) as arguments
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname in ('score_acid_test', 'submit_acid_test')
 order by p.proname;
-- ============================================================================
