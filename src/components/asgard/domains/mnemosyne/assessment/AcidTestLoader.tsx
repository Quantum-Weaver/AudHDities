// src/components/asgard/domains/mnemosyne/assessment/AcidTestLoader.tsx
// Wired 2026-07-18: the questionnaire page had passed questions={[]} since
// birth — a permanent loading skeleton. This loader fetches the live
// questions via the get_acid_test_questions function route and hands the
// signed-in vessel's id to the form. The generated function routes require
// auth, so the unsigned see a gentle invitation instead of a spinner.
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AcidTestForm, type AssessmentQuestion } from './AcidTestForm';

export function AcidTestLoader() {
  const { user, loading: authLoading } = useAuth();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch('/api/generated/hestia-core/get_acid_test_questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          const rows = result.data?.data ?? result.data ?? [];
          const list: AssessmentQuestion[] = (Array.isArray(rows) ? rows : [])
            .filter((q: { question_text?: unknown }) => typeof q?.question_text === 'string')
            .sort((a: { display_order?: number }, b: { display_order?: number }) =>
              (a.display_order ?? 0) - (b.display_order ?? 0));
          setQuestions(list);
        } else {
          setError(result.error || 'The questions could not be gathered.');
        }
      })
      .catch(() => setError('The questions could not be gathered.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!authLoading && !user) {
    return (
      <div className="text-center py-16">
        <p className="text-star-dust/60 mb-4">
          The Acid Test knows you by your vessel — sign in and it begins.
        </p>
        <Link href="/login?redirect=%2Fquestionaire" className="text-neurospark hover:underline">
          Enter the Sanctuary
        </Link>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-16 text-star-dust/60">{error}</p>;
  }

  return (
    <AcidTestForm
      questions={loading ? [] : questions}
      userId={user?.id}
    />
  );
}
