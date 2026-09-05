// src/components/asgard/domains/mnemosyne/assessment/AcidTestForm.tsx

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { Card } from "@/components/runes/Card";
import { Slider } from "@/components/forging/Slider";
import { RadioGroup, Radio } from "@/components/forging/Radio";
import { Textarea } from "@/components/forging/Textarea";

export interface AssessmentOption {
  value: string;
  label: string;
  score: number;
}

export interface AssessmentQuestion {
  id: string;
  question_text: string;
  question_type: string | null;
  description: string | null;
  labels_low: string | null;
  labels_high: string | null;
  options: unknown; // Json in the schema — parsed defensively below
  display_order: number;
  is_required: boolean;
}

interface AnswerValue {
  questionId: string;
  value: string | number;
}

export interface AcidTestReading {
  category: string;
  band: string;
  summaryText: string;
  recommendations: string[];
}

export interface AcidTestResult {
  persona: string | null;
  personaDescription: string | null;
  summary: string | null;
  category: string | null;
  readings: AcidTestReading[];
  raw: unknown;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const RESULT_REDIRECT = '/vessel' as const;

const BAND_WORDS: Record<string, string> = {
  low: 'Low',
  mid: 'Mid',
  high: 'High',
};

// ============================================================================
// UTILITIES
// ============================================================================

function parseOptions(raw: unknown): AssessmentOption[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((o, i): AssessmentOption | null => {
      if (typeof o === 'string') return { value: o, label: o, score: 0 };
      if (o && typeof o === 'object') {
        const r = o as Record<string, unknown>;
        const value = String(r.value ?? r.id ?? r.slug ?? i);
        const label = String(r.label ?? r.text ?? r.answer_text ?? r.value ?? value);
        const score = Number(r.score);
        return { value, label, score: Number.isFinite(score) ? score : 0 };
      }
      return null;
    })
    .filter((o): o is AssessmentOption => !!o);
}

/** submit_acid_test returns one entry per category, in the question order. */
function parseReadings(raw: unknown): AcidTestReading[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): AcidTestReading | null => {
      if (!entry || typeof entry !== 'object') return null;
      const r = entry as Record<string, unknown>;
      const category = typeof r.category === 'string' ? r.category : '';
      if (!category) return null;
      return {
        category,
        band: typeof r.band === 'string' ? r.band : '',
        summaryText: typeof r.summary_text === 'string' ? r.summary_text : '',
        recommendations: Array.isArray(r.recommendations)
          ? r.recommendations.filter((m): m is string => typeof m === 'string')
          : [],
      };
    })
    .filter((r): r is AcidTestReading => !!r);
}

/** submit_acid_test returns Json whose exact shape the server owns — read it kindly. */
function parseResult(raw: unknown): AcidTestResult {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const inner = (r.result_data && typeof r.result_data === 'object' ? r.result_data : {}) as Record<string, unknown>;
  const persona =
    (typeof r.persona === 'string' && r.persona) ||
    (typeof inner.persona_name === 'string' && inner.persona_name) ||
    (typeof r.category === 'string' && r.category) || null;
  return {
    persona,
    personaDescription:
      (typeof r.persona_description === 'string' && r.persona_description) ||
      (typeof inner.persona_description === 'string' && inner.persona_description) || null,
    summary:
      (typeof r.summary_text === 'string' && r.summary_text) ||
      (typeof r.summary === 'string' && r.summary) || null,
    category: (typeof r.category === 'string' && r.category) || null,
    readings: parseReadings(r.readings),
    raw,
  };
}

// ============================================================================
// QUESTION RENDERER
// ============================================================================

interface QuestionRendererProps {
  question: AssessmentQuestion;
  value: AnswerValue | null;
  onChange: (answer: AnswerValue) => void;
  disabled?: boolean;
}

function QuestionRenderer({ question, value, onChange, disabled }: QuestionRendererProps) {
  const questionType = (question.question_type || '').toLowerCase();
  const currentValue = value?.value;
  const options = parseOptions(question.options);

  if (questionType === 'multiple_choice' || (options.length > 0 && questionType !== 'slider' && questionType !== 'scale' && questionType !== 'text')) {
    return (
      <RadioGroup
        name={question.id}
        value={typeof currentValue === "string" ? currentValue : ""}
        onChange={(val) => onChange({ questionId: question.id, value: val })}
        className="space-y-3"
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={disabled}
            className="w-full p-4 border border-star-dust/10 rounded-lg data-[state=checked]:border-neurospark data-[state=checked]:bg-neurospark/10"
          />
        ))}
      </RadioGroup>
    );
  }

  if (questionType === 'slider') {
    return (
      <div className="space-y-4">
        <Slider
          value={typeof currentValue === "number" ? currentValue : 50}
          onChange={(val) => onChange({ questionId: question.id, value: val })}
          min={0}
          max={100}
          step={1}
          disabled={disabled}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-star-dust/40">
          <span>{question.labels_low || 'Not like me'}</span>
          <span className="text-neurospark">{currentValue ?? 50}</span>
          <span>{question.labels_high || 'Very like me'}</span>
        </div>
      </div>
    );
  }

  if (questionType === 'scale') {
    return (
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange({ questionId: question.id, value: val })}
            className={cn(
              "py-2 rounded-lg transition-all",
              currentValue === val
                ? "bg-neurospark text-star-dust"
                : "bg-star-dust/5 text-star-dust/60 hover:bg-star-dust/10"
            )}
            disabled={disabled}
          >
            {val}
          </button>
        ))}
      </div>
    );
  }

  // text (and the honest default)
  return (
    <Textarea
      value={typeof currentValue === "string" ? currentValue : ""}
      onChange={(e) => onChange({ questionId: question.id, value: e.target.value })}
      placeholder="Share your thoughts..."
      rows={4}
      disabled={disabled}
      className="w-full"
    />
  );
}

// ============================================================================
// PROGRESS INDICATOR
// ============================================================================

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-star-dust/60">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-star-dust/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neurospark to-quantum-purple rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// RESULT VIEW
// ============================================================================

function ResultView({ result, onContinue }: { result: AcidTestResult; onContinue: () => void }) {
  const personaDisplay = result.persona || 'Sovereign';

  return (
    <Card
      data={{ id: 'acid-test-result', type: 'value', title: 'The Loom Recognizes You', value: personaDisplay }}
      variant="glass"
      radius="2xl"
      shadow="lg"
      className="p-8 space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-star-dust">
          The Loom Recognizes You
        </h2>

        <div className="text-xl text-neurospark">
          {personaDisplay}
        </div>

        {(result.personaDescription || result.summary) && (
          <p className="text-star-dust/60 max-w-md mx-auto">
            {result.personaDescription || result.summary}
          </p>
        )}
      </div>

      {result.readings.length > 0 && (
        <div className="space-y-6">
          {result.readings.map((reading) => (
            <div key={reading.category} className="border-t border-star-dust/10 pt-6 space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-bold text-star-dust">{reading.category}</h3>
                <span className="text-sm text-neurospark">
                  {BAND_WORDS[reading.band] || reading.band}
                </span>
              </div>

              {reading.summaryText && (
                <p className="text-star-dust/60 text-sm leading-relaxed">{reading.summaryText}</p>
              )}

              {reading.recommendations.length > 0 && (
                <ul className="space-y-2">
                  {reading.recommendations.map((message, i) => (
                    <li key={i} className="text-star-dust/40 text-sm pl-4 border-l border-star-dust/10">
                      {message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button type="button" variant="primary" onClick={onContinue}>
          Continue ✨
        </Button>
      </div>
    </Card>
  );
}

// ============================================================================
// LOADING VIEW
// ============================================================================

function LoadingView({ className }: { className?: string }) {
  return (
    <Card
      data={{ id: 'acid-test-loading', type: 'value', title: 'Loading', value: '' }}
      variant="ghost"
      radius="lg"
      shadow="none"
      className={cn("p-8 text-center", className)}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-star-dust/10 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-star-dust/10 rounded w-1/2 mx-auto" />
        <div className="h-32 bg-star-dust/10 rounded" />
      </div>
    </Card>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface AcidTestFormProps {
  questions: AssessmentQuestion[];
  userId?: string;
  onComplete?: (result: AcidTestResult) => void;
  className?: string;
}

export function AcidTestForm({ questions, userId, onComplete, className }: AcidTestFormProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerValue[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AcidTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;

  const handleAnswer = useCallback((answer: AnswerValue) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === answer.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = answer;
        return updated;
      }
      return [...prev, answer];
    });
    setError(null);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const answersPayload = answers.map(a => {
      const question = questions.find(q => q.id === a.questionId);
      const options = parseOptions(question?.options);
      const index = options.findIndex(o => o.value === String(a.value));
      return {
        question_id: a.questionId,
        value: a.value,
        option_index: index >= 0 ? index : null,
        score: index >= 0 ? options[index].score : (typeof a.value === 'number' ? a.value : 0),
      };
    });

    try {
      const response = await fetch("/api/generated/mnemosyne-assessment/submit_acid_test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          p_user_id: userId,
          p_answers: answersPayload,
        }),
      });

      const payload = await response.json();
      if (!response.ok || payload.success === false) {
        throw new Error(payload.error || payload.message || "Failed to submit assessment");
      }

      const parsed = parseResult(payload.data ?? payload);
      setResult(parsed);
      onComplete?.(parsed);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(() => {
    const questionType = (currentQuestion?.question_type || '').toLowerCase();
    if (!currentAnswer && questionType !== 'text' && currentQuestion?.is_required !== false) {
      setError("This one is waiting for an answer before we continue.");
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentIndex(prev => prev + 1);
      setError(null);
    }
  }, [currentAnswer, currentQuestion, isLastQuestion]);

  const handlePrevious = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentIndex(prev => prev - 1);
      setError(null);
    }
  }, [isFirstQuestion]);

  if (result) {
    return <ResultView result={result} onContinue={() => router.push(RESULT_REDIRECT)} />;
  }

  if (!questions.length) {
    return <LoadingView className={className} />;
  }

  const welcomeFraming =
    "These questions are mirrors. They ask how you experience thought, sensation, time, and connection. Your answers belong only to you.";

  return (
    <Card
      data={{ id: 'acid-test-form', type: 'value', title: 'The Acid Test', value: currentQuestion?.question_text || '' }}
      variant="glass"
      radius="lg"
      shadow="md"
      className={cn("p-6 md:p-8", className)}
    >
      {isFirstQuestion && (
        <p className="text-star-dust/60 text-sm mb-6">{welcomeFraming}</p>
      )}
      <ProgressIndicator current={currentIndex} total={questions.length} />

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-star-dust mb-2">
            {currentQuestion.question_text}
          </h3>
          {currentQuestion.description && (
            <p className="text-star-dust/40 text-sm">{currentQuestion.description}</p>
          )}
        </div>

        <QuestionRenderer
          question={currentQuestion}
          value={currentAnswer || null}
          onChange={handleAnswer}
          disabled={isSubmitting}
        />

        {error && (
          <p className="text-fire-base text-sm">{error}</p>
        )}

        <div className="flex justify-between gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstQuestion || isSubmitting}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : isLastQuestion ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
