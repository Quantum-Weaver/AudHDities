-- ============================================================================
-- 037 ROLLBACK — the reads and the submit as they stood before 037
-- ============================================================================
-- Run STEP 3 of 036-the-acid-test-ten-drawn.sql first, which restores
-- submit_acid_test to a body that does not call preview_acid_test; then run
-- this file whole. The two policies return to signed-in readers only and the
-- preview function is dropped.
-- ============================================================================

drop policy if exists "Anyone can view published questions" on public.assessment_questions;
create policy "Anyone can view published questions"
  on public.assessment_questions
  for select
  to authenticated
  using (status = 'published');

drop policy if exists "Anyone can view personas" on public.personas;
create policy "Anyone can view personas"
  on public.personas
  for select
  to authenticated
  using (true);

drop function if exists public.preview_acid_test(jsonb);
