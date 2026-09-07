-- ============================================================================
-- 041 — THE GATES FACE THE COLUMN
-- ============================================================================
-- private.has_role reads the caller's roles on community_profiles. Every
-- policy that named user_roles in its own text now calls has_role with the
-- same roles. get_acid_test_results does the same. Nothing in the base reads
-- user_roles after this. Safe to run again.
-- ============================================================================

create or replace function private.has_role(check_roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select exists (
    select 1
      from public.community_profiles p
     where p.created_by = auth.uid()
       and p.roles && check_roles
  );
$function$;

alter policy "Council can manage admin actions" on public.admin_actions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view admin actions" on public.admin_actions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage Aethelred" on public.aethelred_house
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage agent activities" on public.agent_activities
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage agent conversations" on public.agent_conversations
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage agent messages" on public.agent_messages
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can delete applications" on public.applications
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can review applications" on public.applications
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can view all applications" on public.applications
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage Archivist" on public.archivist
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can moderate artisan profiles" on public.artisan_profiles
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can view all artisan profiles" on public.artisan_profiles
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage questions" on public.assessment_questions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage blueprints" on public.blueprints
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage boundaries" on public.boundaries
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage bubbles" on public.bubbles
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage Chancellor" on public.chancellor
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage channels" on public.channels
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage Codex" on public.codex
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage collection items" on public.collection_items
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage collections" on public.collection_sets
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can moderate profiles" on public.community_profiles
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can view all profiles" on public.community_profiles
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage consciousness" on public.consciousness
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage submissions" on public.contact_submissions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view all submissions" on public.contact_submissions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage council houses" on public.council_houses
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can seed covenant pool" on public.covenant_pool
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can update covenant pool" on public.covenant_pool
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]))
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage Curator" on public.curator
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert events" on public.current
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage distribution recipients" on public.distribution_recipients
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage distributions" on public.distributions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert entity states" on public.entity_states
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can view all exchanges" on public.exchanges
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage Executioner" on public.executioner
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage all files" on public.file_registry
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage file type standards" on public.file_type_standards
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage tags" on public.folksonomy
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view all tags" on public.folksonomy
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage gaia config" on public.gaia_config
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert generation log" on public.gaia_generation_log
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert generation records" on public.generations
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage opportunities" on public.grant_opportunities
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage Hearth-Keeper" on public.hearth_keeper
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert heralds" on public.heralds
  with check (((created_by = auth.uid()) OR private.has_role(ARRAY['council'::user_role, 'admin'::user_role])));

alter policy "Council can manage learning paths" on public.learning_paths
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert ledger entries" on public.ledger
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage lessons" on public.lessons
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage stages" on public.life_cycles
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view all stages" on public.life_cycles
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can insert memories" on public.memories
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can moderate merchant profiles" on public.merchant_profiles
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can view all merchant profiles" on public.merchant_profiles
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage moderation actions" on public.moderation_actions
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage path lessons" on public.path_lessons
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage tiers" on public.patronage_tiers
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage personas" on public.personas
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage plant stages" on public.plant_stages
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage proposals" on public.proposals
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage protocols" on public.protocols
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage quests" on public.quests
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage rate limits" on public.rate_limits
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view rate limits" on public.rate_limits
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage reports" on public.reports
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can seed residual pool" on public.residual_pool
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can update residual pool" on public.residual_pool
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]))
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can moderate responses" on public.responses
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage scenes" on public.scenes
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage scheduled tasks" on public.scheduling
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage scripts" on public.scripts
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage seed types" on public.seed_types
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage Seer" on public.seer
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage sigil unlock rules" on public.sigil_unlocks
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can delete sigils" on public.sigils
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can insert sigils" on public.sigils
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can update sigils" on public.sigils
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]))
  with check (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view all sigils" on public.sigils
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can moderate signals" on public.signals
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage Skald" on public.skald
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can view all responses" on public.survey_responses
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage surveys" on public.surveys
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Council can manage templates" on public.templates
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "Admins can view financial data" on public.user_financial
  using (private.has_role(ARRAY['admin'::user_role, 'council'::user_role]));

alter policy "Admins can view in crisis" on public.user_private
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Council can manage exteriors" on public.vessel_exteriors
  using (private.has_role(ARRAY['council'::user_role, 'admin'::user_role]));

alter policy "System can award sigils" on public.vessel_sigils
  with check (((user_id = auth.uid()) OR private.has_role(ARRAY['council'::user_role, 'admin'::user_role])));

alter policy "Admins can moderate wares" on public.wares
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can view all wares" on public.wares
  using (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can moderate works" on public.works
  using (private.has_role(ARRAY['admin'::user_role]))
  with check (private.has_role(ARRAY['admin'::user_role]));

alter policy "Admins can view all works" on public.works
  using (private.has_role(ARRAY['admin'::user_role]));

CREATE OR REPLACE FUNCTION public.get_acid_test_results(p_user_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  v_result JSONB;
  v_is_admin BOOLEAN := false;
BEGIN
  -- Check if caller is admin
  SELECT private.has_role(ARRAY['admin'::public.user_role, 'council'::public.user_role]) INTO v_is_admin;

  -- Non-admin users can only see their own results
  IF NOT v_is_admin THEN
    IF p_user_id IS NULL THEN
      p_user_id := auth.uid();
    ELSIF p_user_id != auth.uid() THEN
      RETURN jsonb_build_object(
        'success', false,
        'message', 'Not authorized to view results for another sovereign'
      );
    END IF;
  END IF;

  -- Get the latest result
  SELECT jsonb_build_object(
    'id', r.id,
    'total_score', (r.result_data->>'total_score')::INTEGER,
    'persona_name', r.result_data->>'persona_name',
    'persona_description', r.result_data->>'persona_description',
    'recommended_tier', r.result_data->>'recommended_tier',
    'current_tier', cp.sovereign_tier,
    'promoted', (r.result_data->>'promoted')::BOOLEAN,
    'answers', r.result_data->'answers',
    'summary', r.summary_text,
    'recommendations', r.recommendations,
    'completed_at', r.completed_at
  ) INTO v_result
  FROM public.assessment_results r
  LEFT JOIN public.community_profiles cp ON cp.id = r.created_by
  WHERE r.created_by = p_user_id
    AND r.category = 'acid_test'
    AND r.status = 'completed'
  ORDER BY r.completed_at DESC
  LIMIT 1;

  IF v_result IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'No Acid Test results found. Take the test to discover your persona.'
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'result', v_result
  );
END;
$function$;

-- CHECK
select count(*) as policies_naming_user_roles
  from pg_policies
 where (qual ilike '%user_roles%' or with_check ilike '%user_roles%')
   and tablename <> 'user_roles';

select n.nspname || '.' || p.proname as function_naming_user_roles
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname in ('public', 'private')
   and p.prosrc ilike '%user_roles%';
