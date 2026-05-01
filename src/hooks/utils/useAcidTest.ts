// hooks/utils/useAcidTest.ts
'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import type { AcidTestQuestion } from '@/types/supabase/tables/acid_test_questions';
import type { AcidTestAnswer } from '@/types/supabase/tables/acid_test_answers';

interface QuestionWithAnswers extends AcidTestQuestion {
  answers: AcidTestAnswer[];
}

interface UseAcidTestReturn {
  questions: QuestionWithAnswers[];
  isLoading: boolean;
  error: string | null;
  submitTest: (answers: Record<string, any>) => Promise<{
    tier: string;
    persona: string;
    score: number;
  }>;
}

export function useAcidTest(): UseAcidTestReturn {
  const supabase = useSupabase();
  const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions and answers
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch active questions in order
        const { data: questionsData, error: questionsError } = await supabase
          .from('acid_test_questions')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (questionsError) throw questionsError;

        if (!questionsData) {
          setQuestions([]);
          return;
        }

        // Fetch answers for each question
        const { data: answersData, error: answersError } = await supabase
          .from('acid_test_answers')
          .select('*')
          .in('question_id', questionsData.map(q => q.id))
          .order('score_value', { ascending: true });

        if (answersError) throw answersError;

        // Group answers by question_id
        const answersByQuestion = new Map();
        answersData?.forEach(answer => {
          if (!answersByQuestion.has(answer.question_id)) {
            answersByQuestion.set(answer.question_id, []);
          }
          answersByQuestion.get(answer.question_id).push(answer);
        });

        // Combine questions with their answers
        const questionsWithAnswers = questionsData.map(question => ({
          ...question,
          answers: answersByQuestion.get(question.id) || [],
        }));

        setQuestions(questionsWithAnswers);
      } catch (err) {
        console.error('Error fetching acid test questions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [supabase]);

  // Submit test results
  const submitTest = async (answers: Record<string, any>) => {
    const response = await fetch('/api/acid-test/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit test');
    }

    return response.json();
  };

  return {
    questions,
    isLoading,
    error,
    submitTest,
  };
}