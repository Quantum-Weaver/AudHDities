-- ============================================================================
-- 037 — THE ACID TEST, SIGNED OUT
-- ============================================================================
-- A visitor may take the test: the published questions and the personas are
-- readable signed out, and preview_acid_test scores a set of answers, names
-- the persona by share, and gathers the readings without writing anything.
-- submit_acid_test does the same through preview_acid_test, then keeps the
-- best rank the vessel has earned, sets the tier, and stores the one result
-- row. Every statement is safe to run again;
-- 037-the-acid-test-signed-out-ROLLBACK.sql restores what stood before.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1 — visitors read the published questions and the personas
-- ----------------------------------------------------------------------------

drop policy if exists "Anyone can view published questions" on public.assessment_questions;
create policy "Anyone can view published questions"
  on public.assessment_questions
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Anyone can view personas" on public.personas;
create policy "Anyone can view personas"
  on public.personas
  for select
  to anon, authenticated
  using (true);

grant select on public.assessment_questions to anon;
grant select on public.personas to anon;
grant select on public.assessment_readings to anon;

-- ----------------------------------------------------------------------------
-- STEP 2 — the preview: scored, named, read, nothing written
-- ----------------------------------------------------------------------------

create or replace function public.preview_acid_test(p_answers jsonb)
returns jsonb
language plpgsql
stable
set search_path to ''
as $preview_acid_test$
declare
  v_scoring jsonb;
  v_total_score integer := 0;
  v_max_total integer := 0;
  v_top_rank integer;
  v_rank integer := 1;
  v_persona_name text;
  v_persona_description text;
  v_category_scores jsonb := '{}'::jsonb;
  v_readings jsonb := '[]'::jsonb;
begin
  v_scoring := public.score_acid_test(p_answers);
  v_total_score := coalesce((v_scoring->>'total_score')::integer, 0);
  v_max_total := coalesce((v_scoring->>'max_total')::integer, 0);
  v_category_scores := coalesce(v_scoring->'category_scores', '{}'::jsonb);

  -- Persona: the share of the highest total these questions allowed, in as
  -- many equal bands as there are personas
  select max(display_order) into v_top_rank
    from public.personas
   where persona_type = 'acid_test';

  v_rank := case when v_max_total > 0 and v_top_rank is not null
                 then least(v_top_rank, greatest(1, ceil(v_total_score::numeric * v_top_rank / v_max_total)::integer))
                 else 1 end;

  select name, description into v_persona_name, v_persona_description
    from public.personas
   where persona_type = 'acid_test'
     and display_order = v_rank;

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

  return jsonb_build_object(
    'success', true,
    'stored', false,
    'total_score', v_total_score,
    'max_total', v_max_total,
    'ratio', coalesce(v_scoring->'ratio', '0'::jsonb),
    'persona_rank', v_rank,
    'persona', v_persona_name,
    'persona_description', v_persona_description,
    'category_scores', v_category_scores,
    'readings', v_readings
  );
end;
$preview_acid_test$;

grant execute on function public.preview_acid_test(jsonb) to anon, authenticated;

-- ----------------------------------------------------------------------------
-- STEP 3 — the submit: the preview, then never down, the tier, the one row
-- ----------------------------------------------------------------------------

create or replace function public.submit_acid_test(p_user_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
set search_path to ''
as $submit_acid_test$
declare
  v_preview jsonb;
  v_total_score integer := 0;
  v_max_total integer := 0;
  v_rank integer := 1;
  v_best_rank integer := 0;
  v_takes integer;
  v_persona_name text;
  v_persona_description text;
  v_recommended_tier public.sovereign_tier;
  v_current_tier public.sovereign_tier;
  v_promoted boolean := false;
  v_result_id uuid;
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

  v_preview := public.preview_acid_test(p_answers);
  v_total_score := coalesce((v_preview->>'total_score')::integer, 0);
  v_max_total := coalesce((v_preview->>'max_total')::integer, 0);
  v_category_scores := coalesce(v_preview->'category_scores', '{}'::jsonb);
  v_readings := coalesce(v_preview->'readings', '[]'::jsonb);
  v_rank := coalesce((v_preview->>'persona_rank')::integer, 1);
  v_persona_name := v_preview->>'persona';
  v_persona_description := v_preview->>'persona_description';

  -- Never below the best rank already earned
  select coalesce(max((r.result_data->>'persona_rank')::integer), 0) into v_best_rank
    from public.assessment_results r
   where r.created_by = p_user_id
     and r.category = 'acid_test'
     and r.status = 'completed'
     and r.result_data->>'persona_rank' ~ '^[0-9]+$';

  if v_best_rank > v_rank then
    v_rank := v_best_rank;
    select name, description into v_persona_name, v_persona_description
      from public.personas
     where persona_type = 'acid_test'
       and display_order = v_rank;
  end if;

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
    'stored', true,
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
-- CHECK — a visitor's draw is ten, and an empty preview names the first persona
-- ----------------------------------------------------------------------------

select (public.get_acid_test_questions())->>'total_questions' as drawn,
       (public.preview_acid_test('[]'::jsonb))->>'persona' as persona_at_zero;
