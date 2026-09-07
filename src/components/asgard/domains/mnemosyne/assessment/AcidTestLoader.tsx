// src/components/asgard/domains/mnemosyne/assessment/AcidTestLoader.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  AcidTestForm,
  parseResult,
  PENDING_KEY,
  type AcidTestResult,
  type AssessmentQuestion,
} from './AcidTestForm';

/** The answers a visitor asked to keep, if any wait in this browser. */
function readPending(): unknown[] | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function AcidTestLoader() {
  const { user, loading: authLoading } = useAuth();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [keeping, setKeeping] = useState(false);
  const [kept, setKept] = useState<AcidTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The draw, for anyone
  useEffect(() => {
    let cancelled = false;
    fetch('/api/acid-test/questions', { method: 'POST' })
      .then(r => r.json())
      .then(result => {
        if (cancelled) return;
        if (result.success) {
          const rows = result.data?.questions ?? result.data?.data ?? result.data ?? [];
          const list: AssessmentQuestion[] = (Array.isArray(rows) ? rows : [])
            .filter((q: { question_text?: unknown }) => typeof q?.question_text === 'string')
            .sort((a: { display_order?: number }, b: { display_order?: number }) =>
              (a.display_order ?? 0) - (b.display_order ?? 0));
          setQuestions(list);
        } else {
          setError(result.error || 'The questions could not be gathered.');
        }
      })
      .catch(() => { if (!cancelled) setError('The questions could not be gathered.'); });
    return () => { cancelled = true; };
  }, []);

  // A result taken signed out is kept once the vessel signs in
  useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;
    Promise.resolve()
      .then(() => readPending())
      .then(pending => {
        if (!pending || cancelled) return;
        setKeeping(true);
        return fetch('/api/generated/mnemosyne-assessment/submit_acid_test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ p_user_id: user.id, p_answers: pending }),
        })
          .then(r => r.json())
          .then(payload => {
            if (payload.success === false) {
              throw new Error(payload.error || payload.message || 'The result could not be kept.');
            }
            try { sessionStorage.removeItem(PENDING_KEY); } catch { /* nothing to clear */ }
            if (!cancelled) setKept(parseResult(payload.data ?? payload));
          })
          .catch(() => { if (!cancelled) setError('The result could not be kept. Take the test again and it will be.'); })
          .finally(() => { if (!cancelled) setKeeping(false); });
      });
    return () => { cancelled = true; };
  }, [authLoading, user]);

  if (error) {
    return <p className="text-center py-16 text-star-dust/60">{error}</p>;
  }

  return (
    <AcidTestForm
      questions={keeping ? [] : questions}
      userId={user?.id}
      initialResult={kept}
    />
  );
}
