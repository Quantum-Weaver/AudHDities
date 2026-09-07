-- ============================================================================
-- 036 ROLLBACK — the three functions as they stood before 036
-- ============================================================================
-- Running this file whole restores get_acid_test_questions to every
-- published question, and score_acid_test and submit_acid_test to the
-- bodies of 035-the-acid-test-readings-wired.sql, which holds them.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_acid_test_questions(p_include_inactive boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  v_questions JSONB;
  v_category_count JSONB;
BEGIN
  -- Get all questions with their options
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', q.id,
      'question_text', q.question_text,
      'category', q.category,
      'display_order', q.display_order,
      'options', q.options
    ) ORDER BY q.display_order
  ) INTO v_questions
  FROM public.assessment_questions q
  WHERE q.status = 'published'
    AND (p_include_inactive OR q.status = 'published');

  -- Get category counts
  SELECT jsonb_object_agg(category, count) INTO v_category_count
  FROM (
    SELECT category, COUNT(*) AS count
    FROM public.assessment_questions
    WHERE status = 'published'
    GROUP BY category
    ORDER BY MIN(display_order)
  ) cats;

  IF v_questions IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'No assessment questions available'
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'total_questions', jsonb_array_length(v_questions),
    'categories', v_category_count,
    'questions', v_questions
  );
END;
$function$;

-- score_acid_test and submit_acid_test: run STEP 1 and STEP 2 of
-- 035-the-acid-test-readings-wired.sql.
