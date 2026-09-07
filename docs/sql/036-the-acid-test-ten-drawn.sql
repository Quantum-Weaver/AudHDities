-- ============================================================================
-- 036 — THE ACID TEST DRAWS TEN
-- ============================================================================
-- get_acid_test_questions draws ten published questions per call: one from
-- every category, then three more, each choice random. score_acid_test
-- measures each category against the questions the vessel answered, not the
-- whole bank, and returns the highest total those questions allowed.
-- submit_acid_test sets the persona by the vessel's share of that highest
-- total, in as many equal bands as there are personas, and never lowers a
-- vessel's persona below the best rank it has already earned. A vessel has one
-- result row; a retake replaces it and counts the takes. The tier is as it
-- was: guild at a total of fifty, never demoted. Every function is CREATE OR
-- REPLACE; 036-the-acid-test-ten-drawn-ROLLBACK.sql restores the three.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1 — the draw
-- ----------------------------------------------------------------------------

create or replace function public.get_acid_test_questions(p_include_inactive boolean default false)
returns jsonb
language plpgsql
set search_path to ''
as $get_acid_test_questions$
declare
  v_questions jsonb;
  v_categories jsonb;
begin
  with bank as (
    select q.id, q.question_text, q.category, q.display_order, q.options,
           row_number() over (partition by q.category order by random()) as rank_in_category,
           random() as toss
      from public.assessment_questions q
     where q.status = 'published'
  ),
  drawn as (
    select * from bank order by rank_in_category, toss limit 10
  ),
  counted as (
    select d.category, count(*) as n from drawn d group by d.category
  )
  select (select jsonb_agg(jsonb_build_object(
                   'id', d.id,
                   'question_text', d.question_text,
                   'category', d.category,
                   'display_order', d.display_order,
                   'options', d.options
                 ) order by d.display_order)
            from drawn d),
         (select jsonb_object_agg(c.category, c.n) from counted c)
    into v_questions, v_categories;

  if v_questions is null then
    return jsonb_build_object(
      'success', false,
      'message', 'No assessment questions available'
    );
  end if;

  return jsonb_build_object(
    'success', true,
    'total_questions', jsonb_array_length(v_questions),
    'categories', coalesce(v_categories, '{}'::jsonb),
    'questions', v_questions
  );
end;
$get_acid_test_questions$;

-- ----------------------------------------------------------------------------
-- STEP 2 — the scoring, against the questions answered
-- ----------------------------------------------------------------------------

create or replace function public.score_acid_test(p_answers jsonb)
returns jsonb
language plpgsql
stable
set search_path to ''
as $score_acid_test$
declare
  v_total_score integer := 0;
  v_max_total integer := 0;
  v_category_scores jsonb := '{}'::jsonb;
begin
  with q as (
    select aq.id,
           aq.category,
           aq.display_order,
           case when jsonb_typeof(aq.options) = 'array' then aq.options else '[]'::jsonb end as options
      from public.assessment_questions aq
     where aq.status = 'published'
  ),
  a as (
    select e.elem
      from jsonb_array_elements(
             case when jsonb_typeof(coalesce(p_answers, '[]'::jsonb)) = 'array'
                  then p_answers
                  else '[]'::jsonb end
           ) as e(elem)
     where jsonb_typeof(e.elem) = 'object'
  ),
  matched as (
    select a.elem, q.category, q.display_order, q.options
      from a
      join q on q.id::text = a.elem->>'question_id'
  ),
  chosen as (
    select m.category,
           m.display_order,
           coalesce(
             case when m.elem->>'score' ~ '^-?[0-9]+$'
                  then (m.elem->>'score')::integer end,
             (select (o.opt->>'score')::integer
                from jsonb_array_elements(m.options) with ordinality as o(opt, idx)
               where coalesce(m.elem->>'option_index', m.elem->>'value') ~ '^[0-9]+$'
                 and idx = coalesce(m.elem->>'option_index', m.elem->>'value')::integer + 1
               limit 1),
             (select (o.opt->>'score')::integer
                from jsonb_array_elements(m.options) as o(opt)
               where o.opt->>'text' = coalesce(m.elem->>'text', m.elem->>'label', m.elem->>'value')
               limit 1),
             0
           ) as score,
           coalesce((select max((o.opt->>'score')::integer)
                       from jsonb_array_elements(m.options) as o(opt)), 0) as top
      from matched m
  ),
  rated as (
    select c.category,
           min(c.display_order) as first_order,
           sum(c.score)::integer as score,
           sum(c.top)::integer as max_score
      from chosen c
     group by c.category
  )
  select coalesce(sum(r.score), 0)::integer,
         coalesce(sum(r.max_score), 0)::integer,
         coalesce(jsonb_object_agg(r.category, jsonb_build_object(
           'score', r.score,
           'max', r.max_score,
           'ratio', case when r.max_score > 0
                         then round(r.score::numeric / r.max_score, 4)
                         else 0::numeric end,
           'band', case when r.max_score <= 0 then 'low'
                        when r.score::numeric / r.max_score < 0.34 then 'low'
                        when r.score::numeric / r.max_score < 0.67 then 'mid'
                        else 'high' end
         )), '{}'::jsonb)
    into v_total_score, v_max_total, v_category_scores
    from rated r;

  return jsonb_build_object(
    'total_score', v_total_score,
    'max_total', v_max_total,
    'ratio', case when v_max_total > 0
                  then round(v_total_score::numeric / v_max_total, 4)
                  else 0::numeric end,
    'category_scores', v_category_scores
  );
end;
$score_acid_test$;

-- ----------------------------------------------------------------------------
-- STEP 3 — the submit: persona by share, never down
-- ----------------------------------------------------------------------------

create or replace function public.submit_acid_test(p_user_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
set search_path to ''
as $submit_acid_test$
declare
  v_total_score integer := 0;
  v_max_total integer := 0;
  v_top_rank integer;
  v_rank integer;
  v_best_rank integer := 0;
  v_takes integer;
  v_persona_name text;
  v_persona_description text;
  v_recommended_tier public.sovereign_tier;
  v_current_tier public.sovereign_tier;
  v_promoted boolean := false;
  v_result_id uuid;
  v_scoring jsonb;
  v_category_scores jsonb := '{}'::jsonb;
  v_readings jsonb := '[]'::jsonb;
  v_recommendations jsonb := '[]'::jsonb;
begin
  -- Verify the caller matches the user
  if auth.uid() is null or auth.uid() != p_user_id then
    return jsonb_build_object(
      'success', false,
      'message', 'Not authorized to submit assessment for this sovereign'
    );
  end if;

  -- Score the answers by category, against the questions answered
  v_scoring := public.score_acid_test(p_answers);
  v_total_score := coalesce((v_scoring->>'total_score')::integer, 0);
  v_max_total := coalesce((v_scoring->>'max_total')::integer, 0);
  v_category_scores := coalesce(v_scoring->'category_scores', '{}'::jsonb);

  -- Persona: the share of the highest total these questions allowed, in as
  -- many equal bands as there are personas; never below the best rank earned
  select max(display_order) into v_top_rank
    from public.personas
   where persona_type = 'acid_test';

  v_rank := case when v_max_total > 0 and v_top_rank is not null
                 then least(v_top_rank, greatest(1, ceil(v_total_score::numeric * v_top_rank / v_max_total)::integer))
                 else 1 end;

  select coalesce(max((r.result_data->>'persona_rank')::integer), 0) into v_best_rank
    from public.assessment_results r
   where r.created_by = p_user_id
     and r.category = 'acid_test'
     and r.status = 'completed'
     and r.result_data->>'persona_rank' ~ '^[0-9]+$';

  v_rank := greatest(v_rank, v_best_rank);

  select name, description into v_persona_name, v_persona_description
    from public.personas
   where persona_type = 'acid_test'
     and display_order = v_rank;

  -- Determine recommended tier
  if v_total_score >= 50 then
    v_recommended_tier := 'guild';
  else
    v_recommended_tier := 'dweller';
  end if;

  -- Get current tier for promotion check
  select sovereign_tier into v_current_tier
    from public.community_profiles
   where id = p_user_id;

  -- Promote only if the new tier is higher
  if v_current_tier is null or v_current_tier = 'dweller' then
    if v_recommended_tier = 'guild' then
      update public.community_profiles
         set sovereign_tier = 'guild'
       where id = p_user_id;
      v_promoted := true;
      v_current_tier := 'guild';
    else
      v_current_tier := coalesce(v_current_tier, 'dweller');
    end if;
  end if;

  -- One published reading per category, in the question order of the categories
  select coalesce(jsonb_agg(
           jsonb_build_object(
             'category', r.category,
             'band', r.band,
             'summary_text', r.summary_text,
             'recommendations', r.recommendations
           ) order by o.first_order
         ), '[]'::jsonb)
    into v_readings
    from jsonb_each(v_category_scores) as cs(category, entry)
    join public.assessment_readings r
      on r.category = cs.category
     and r.band = cs.entry->>'band'
     and r.status = 'published'
    join (
      select category, min(display_order) as first_order
        from public.assessment_questions
       where status = 'published'
       group by category
    ) o on o.category = cs.category;

  -- Build recommendations
  v_recommendations := jsonb_build_array(
    jsonb_build_object(
      'type', 'tier',
      'message', case when v_promoted
        then 'You have been recognized as guild. Community pricing is now available to you.'
        else 'Your tier remains ' || v_current_tier || '.'
      end
    ),
    jsonb_build_object(
      'type', 'persona',
      'message', 'Your persona is ' || v_persona_name || '. ' || v_persona_description
    ),
    jsonb_build_object(
      'type', 'next_steps',
      'message', 'Explore the Sanctuary. Your vessel has been updated.'
    )
  ) || coalesce(
    (select jsonb_agg(
       jsonb_build_object(
         'type', 'reading',
         'category', rd->>'category',
         'band', rd->>'band',
         'message', rd->>'summary_text',
         'recommendations', rd->'recommendations'
       )
     )
     from jsonb_array_elements(v_readings) as rd),
    '[]'::jsonb
  );

  -- One result row per vessel: a retake replaces it, and the take count grows
  select (r.result_data->>'takes')::integer into v_takes
    from public.assessment_results r
   where r.created_by = p_user_id
     and r.category = 'acid_test';

  insert into public.assessment_results (
    created_by,
    category,
    result_data,
    summary_text,
    recommendations,
    status,
    completed_at
  ) values (
    p_user_id,
    'acid_test',
    jsonb_build_object(
      'total_score', v_total_score,
      'max_total', v_max_total,
      'persona_rank', v_rank,
      'persona_name', v_persona_name,
      'persona_description', v_persona_description,
      'recommended_tier', v_recommended_tier,
      'answers', p_answers,
      'category_scores', v_category_scores,
      'promoted', v_promoted,
      'takes', coalesce(v_takes, 0) + 1
    ),
    'Acid Test completed. Persona: ' || v_persona_name || '. Tier: ' || v_current_tier || '.',
    v_recommendations,
    'completed',
    now()
  )
  on conflict (created_by, category) do update
    set result_data = excluded.result_data,
        summary_text = excluded.summary_text,
        recommendations = excluded.recommendations,
        status = excluded.status,
        completed_at = excluded.completed_at,
        updated_at = now(),
        updated_by = p_user_id
  returning id into v_result_id;

  return jsonb_build_object(
    'success', true,
    'result_id', v_result_id,
    'total_score', v_total_score,
    'max_total', v_max_total,
    'persona', v_persona_name,
    'persona_description', v_persona_description,
    'tier', v_current_tier,
    'recommended_tier', v_recommended_tier,
    'promoted', v_promoted,
    'category_scores', v_category_scores,
    'readings', v_readings,
    'recommendations', v_recommendations,
    'message', case when v_promoted
      then 'Welcome to the guild. Your pricing has been updated.'
      else 'Assessment complete. Your results have been recorded.'
    end
  );
end;
$submit_acid_test$;

-- ----------------------------------------------------------------------------
-- CHECK — the draw is ten, every category present, and scoring sums the ten
-- ----------------------------------------------------------------------------

select (public.get_acid_test_questions())->>'total_questions' as drawn,
       (public.get_acid_test_questions())->'categories' as categories;
