// src/components/assessment/AcidTestForm.tsx
// Acid Test Form - Multi-step assessment questionnaire

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Textarea } from "@/components/ui/Textarea";
import { z } from "zod";
import { ENUM_VALUES } from "@/types/supabase/enums";
import type { AcidTestQuestionsRow } from "@/types/generated/mnemosyne-assessment/acid_test_questions";
import type { AcidTestAnswersRow } from "@/types/generated/mnemosyne-assessment/acid_test_answers";
import { useCreateAcidTestResults } from "@/hooks/generated/mnemosyne-assessment/acid_test_results";

// ============================================================================
// CONSTANTS
// ============================================================================

const ACID_QUESTION_TYPE = ENUM_VALUES.acidQuestionType;
type AcidQuestionType = (typeof ACID_QUESTION_TYPE)[number];

const ACID_PERSONA = ENUM_VALUES.acidPersona;
type AcidPersona = (typeof ACID_PERSONA)[number];

type UserTier = (typeof ENUM_VALUES.userTier)[number];

// ============================================================================
// TYPES
// ============================================================================

interface QuestionWithAnswers extends AcidTestQuestionsRow {
  answers: AcidTestAnswersRow[];
}

interface AnswerValue {
  questionId: string;
  answerId: string;
  score: number;
  value: string | number;
}

interface AcidTestResult {
  totalScore: number;
  suggestedTier: UserTier;
  personaLabel: AcidPersona;
  personaDescription: string;
}

// ============================================================================
// ZOD SCHEMA
// ============================================================================

const answerValueSchema = z.object({
  questionId: z.string(),
  answerId: z.string(),
  score: z.number(),
  value: z.union([z.string(), z.number()]),
});

const submitSchema = z.object({
  total_score: z.number(),
  suggested_tier: z.enum(ENUM_VALUES.userTier),
  persona_label: z.enum(ENUM_VALUES.acidPersona),
  persona_description: z.string(),
  answers: z.array(z.object({
    question_id: z.string(),
    answer_id: z.string(),
    score_value: z.number(),
  })),
});

// ============================================================================
// UTILITIES
// ============================================================================

function calculateScore(answers: AnswerValue[]): number {
  return answers.reduce((sum, a) => sum + a.score, 0);
}

function determineTier(score: number): UserTier {
  if (score >= 30) return "community";
  if (score >= 20) return "ally";
  return "ally";
}

function determinePersona(score: number): AcidPersona {
  if (score >= 30) return "seam_warrior";
  if (score >= 20) return "tab_hoarder";
  if (score >= 10) return "void_dweller";
  if (score < 5) return "masked_traveler";
  return "pattern_seeker";
}

function getPersonaDescription(persona: AcidPersona): string {
  const descriptions: Record<AcidPersona, string> = {
    masked_traveler: "You've been navigating the world in disguise. The Sanctuary welcomes you home.",
    tab_hoarder: "Your many open tabs reflect a mind hungry for connection and pattern.",
    seam_warrior: "You've been fighting invisible battles. Your awareness is your strength.",
    void_dweller: "You find peace in the spaces between. Your introspection is a gift.",
    pattern_seeker: "You see connections others miss. Your vision will shape the Sanctuary.",
    quantum_witness: "You perceive reality across dimensions. Your consciousness is sovereign.",
  };
  return descriptions[persona] || "The Loom recognizes your unique consciousness.";
}

// ============================================================================
// QUESTION RENDERER
// ============================================================================

function QuestionRenderer({ question, value, onChange, disabled }: {
  question: QuestionWithAnswers;
  value: AnswerValue | null;
  onChange: (answer: AnswerValue) => void;
  disabled?: boolean;
}) {
  const questionType = question.question_type as AcidQuestionType;
  const currentValue = value?.value;

  if (questionType === "multiple_choice") {
    const selectedId = typeof currentValue === "string" ? currentValue : "";
    return (
      <RadioGroup
        value={question.answers.find(a => a.answer_text === selectedId)?.id || selectedId}
        onValueChange={(val) => {
          const selectedAnswer = question.answers.find(a => a.id === val);
          if (selectedAnswer) {
            onChange({
              questionId: question.id,
              answerId: selectedAnswer.id,
              score: selectedAnswer.score_value || 0,
              value: selectedAnswer.answer_text || selectedAnswer.id,
            });
          }
        }}
        disabled={disabled}
        className="space-y-3"
      >
        {question.answers.map((answer) => (
          <RadioGroupItem key={answer.id} value={answer.id}>
            {answer.answer_text}
          </RadioGroupItem>
        ))}
      </RadioGroup>
    );
  }

  if (questionType === "slider") {
    return (
      <div className="space-y-4">
        <Slider
          value={typeof currentValue === "number" ? [currentValue] : [50]}
          onValueChange={([val]: number[]) => {
            onChange({
              questionId: question.id,
              answerId: "",
              score: Math.floor(val / 10),
              value: val,
            });
          }}
          min={0}
          max={100}
          step={1}
          disabled={disabled}
        />
        <div className="flex justify-between text-sm text-[var(--color-star-dust)]/40">
          <span>Not like me</span>
          <span className="text-[var(--color-neurospark)]">{currentValue || 50}</span>
          <span>Very like me</span>
        </div>
      </div>
    );
  }

  if (questionType === "scale") {
    return (
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange({ questionId: question.id, answerId: "", score: val, value: val })}
            className={cn(
              "py-2 rounded-lg transition-all",
              currentValue === val
                ? "bg-[var(--color-neurospark)] text-[var(--color-deep-space)]"
                : "bg-[var(--color-surface)]/20 text-[var(--color-star-dust)]/60 hover:bg-[var(--color-surface)]/40"
            )}
            disabled={disabled}
          >
            {val}
          </button>
        ))}
      </div>
    );
  }

  if (questionType === "text") {
    return (
      <Textarea
        value={typeof currentValue === "string" ? currentValue : ""}
        onChange={(e) => onChange({ questionId: question.id, answerId: "", score: 0, value: e.target.value })}
        placeholder="Share your thoughts..."
        rows={4}
        disabled={disabled}
      />
    );
  }

  return null;
}

// ============================================================================
// PROGRESS INDICATOR
// ============================================================================

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-[var(--color-star-dust)]/60">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-[var(--color-surface)]/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-neurospark)] to-[var(--color-quantum-purple)] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// RESULT VIEW
// ============================================================================

const PERSONA_EMOJIS: Record<string, string> = {
  seam_warrior: "🧦⚔️",
  tab_hoarder: "📑🔥",
  void_dweller: "🌑👁️",
  masked_traveler: "🎭🌍",
  pattern_seeker: "🌀🔍",
  quantum_witness: "✨👁️",
};

function ResultView({ result }: { result: AcidTestResult }) {
  const router = useRouter();
  const personaDisplay = result.personaLabel.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <Card
      data={{ id: "acid-test-result", title: "The Loom Recognizes You", type: "product" }}
      variant="default"
      radius="lg"
      shadow="md"
      padding="lg"
      className="text-center space-y-6"
    >
      <div className="text-6xl">{PERSONA_EMOJIS[result.personaLabel] || "✨"}</div>
      <h2 className="text-2xl font-bold text-[var(--color-star-dust)]">The Loom Recognizes You</h2>
      <div className="text-xl text-[var(--color-neurospark)]">{personaDisplay}</div>
      <p className="text-[var(--color-star-dust)]/60 max-w-md mx-auto">{result.personaDescription}</p>
      <div className="flex items-center justify-center gap-4">
        <div className="px-4 py-2 bg-[var(--color-surface)]/20 rounded-lg">
          <span className="text-sm text-[var(--color-star-dust)]/60">Score</span>
          <div className="text-2xl font-bold text-[var(--color-star-dust)]">{result.totalScore}</div>
        </div>
        <div className="px-4 py-2 bg-[var(--color-surface)]/20 rounded-lg">
          <span className="text-sm text-[var(--color-star-dust)]/60">Tier</span>
          <div className="text-2xl font-bold text-[var(--color-warning)] capitalize">{result.suggestedTier}</div>
        </div>
      </div>
      {result.suggestedTier === "community" && (
        <p className="text-[var(--color-success)] text-sm">Welcome home. Your access is subsidized by the Sanctuary.</p>
      )}
      <div className="animate-pulse text-[var(--color-star-dust)]/40 text-sm">Entering the Sanctuary...</div>
    </Card>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export interface AcidTestFormProps {
  questions: QuestionWithAnswers[];
  userId?: string;
  onComplete?: (result: AcidTestResult) => void;
  className?: string;
}

export function AcidTestForm({ questions, userId, onComplete, className }: AcidTestFormProps) {
  const router = useRouter();
  const { create } = useCreateAcidTestResults();
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

    const totalScore = calculateScore(answers);
    const suggestedTier = determineTier(totalScore);
    const personaLabel = determinePersona(totalScore);
    const personaDescription = getPersonaDescription(personaLabel);

    const resultData: AcidTestResult = { totalScore, suggestedTier, personaLabel, personaDescription };

    const submitData = {
      total_score: totalScore,
      suggested_tier: suggestedTier,
      persona_label: personaLabel,
      persona_description: personaDescription,
      answers: answers.map(a => ({
        question_id: a.questionId,
        answer_id: a.answerId,
        score_value: a.score,
      })),
    };

    // Validate with Zod
    const validation = submitSchema.safeParse(submitData);
    if (!validation.success) {
      setError("Invalid submission data. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Submit via generated hook
    const createResult = await create(validation.data as any);
    if (createResult.error) {
      setError(createResult.error);
      setIsSubmitting(false);
      return;
    }

    setResult(resultData);
    onComplete?.(resultData);

    setTimeout(() => router.push("/sanctuary"), 2000);
  };

  const handleNext = useCallback(() => {
    if (!currentAnswer && currentQuestion?.question_type !== "text") {
      setError("Please answer the question before continuing.");
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

  if (result) return <ResultView result={result} />;

  if (!questions.length) {
    return (
      <Card data={{ id: "acid-test-loading", title: "Loading", type: "product" }} variant="default" radius="lg" shadow="sm" padding="lg" className="text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-[var(--color-surface)]/20 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-[var(--color-surface)]/20 rounded w-1/2 mx-auto" />
          <div className="h-32 bg-[var(--color-surface)]/20 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card data={{ id: "acid-test-form", title: "Acid Test", type: "product" }} variant="default" radius="lg" shadow="md" padding="lg" className={className}>
      <ProgressIndicator current={currentIndex} total={questions.length} />
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-star-dust)] mb-2">
            {currentQuestion.question_text}
          </h3>
          {currentQuestion.explanation && (
            <p className="text-[var(--color-star-dust)]/40 text-sm">{currentQuestion.explanation}</p>
          )}
        </div>
        <QuestionRenderer question={currentQuestion} value={currentAnswer || null} onChange={handleAnswer} disabled={isSubmitting} />
        {error && <p className="text-[var(--color-error)] text-sm">{error}</p>}
        <div className="flex justify-between gap-4 pt-4">
          <Button type="button" variant="outline" onClick={handlePrevious} disabled={isFirstQuestion || isSubmitting}>Previous</Button>
          <Button type="button" variant="primary" onClick={handleNext} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isLastQuestion ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </Card>
  );
}