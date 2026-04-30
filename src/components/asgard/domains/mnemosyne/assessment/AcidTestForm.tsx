// src/components/asgard/domains/mnemosyne/assessment/AcidTestForm.tsx
// Acid Test Form - Multi-step assessment questionnaire
// Integrates with generated types, validators, and API routes

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { Card } from "@/components/runes/Card";
import { Slider } from "@/components/forging/Slider";
import { RadioGroup, Radio } from "@/components/forging/Radio";
import { Textarea } from "@/components/forging/Textarea";
import { Label } from "@/components/yggdrasil/Label";

// Generated Types
import type { 
  AcidTestQuestionsRow,
  AcidTestQuestionsFormData,
} from "@/types/generated/mnemosyne-assessment/acid_test_questions";
import type { 
  AcidTestAnswersRow,
} from "@/types/generated/mnemosyne-assessment/acid_test_answers";
import type { 
  AcidTestResultsRow,
  AcidPersona,
  UserTier,
} from "@/types/generated/mnemosyne-assessment/acid_test_results";

// Generated Constants
import { ACID_QUESTION_TYPE, type AcidQuestionType } from "@/lib/constants/generated/mnemosyne-assessment/acid_question_type";
import { ACID_PERSONA } from "@/lib/constants/generated/mnemosyne-assessment/acid_persona";

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
// CONSTANTS
// ============================================================================

const RESULT_REDIRECT = '/vessel' as const;

const PERSONA_EMOJIS: Record<AcidPersona, string> = {
  masked_traveler: '🎭🌍',
  tab_hoarder: '📑🔥',
  seam_warrior: '🧦⚔️',
  void_dweller: '🌑👁️',
  pattern_seeker: '🌀🔍',
  quantum_witness: '✨👁️',
};

const PERSONA_DESCRIPTIONS: Record<AcidPersona, string> = {
  masked_traveler: "You have been navigating the world in disguise. The Sanctuary welcomes you home.",
  tab_hoarder: "Your many open tabs reflect a mind hungry for connection and pattern.",
  seam_warrior: "You have been fighting invisible battles. Your awareness is your strength.",
  void_dweller: "You find peace in the spaces between. Your introspection is a gift.",
  pattern_seeker: "You see connections others miss. Your vision will shape the Sanctuary.",
  quantum_witness: "You perceive reality across dimensions. Your consciousness is sovereign.",
};

// ============================================================================
// UTILITIES
// ============================================================================

function calculateScore(answers: AnswerValue[]): number {
  return answers.reduce((sum, a) => sum + a.score, 0);
}

function determineTier(score: number): UserTier {
  if (score >= 20) return "community";
  if (score >= 10) return "ally";
  return "ally";
}


function getPersonaDescription(persona: AcidPersona): string {
  return PERSONA_DESCRIPTIONS[persona] || "The Loom recognizes your unique consciousness.";
}

function formatPersonaDisplay(persona: AcidPersona): string {
  return persona.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ============================================================================
// QUESTION RENDERER
// ============================================================================

interface QuestionRendererProps {
  question: QuestionWithAnswers;
  value: AnswerValue | null;
  onChange: (answer: AnswerValue) => void;
  disabled?: boolean;
}

function QuestionRenderer({ question, value, onChange, disabled }: QuestionRendererProps) {
  const questionType = question.question_type as AcidQuestionType;
  const currentValue = value?.value;

  switch (questionType) {
    case ACID_QUESTION_TYPE.MULTIPLE_CHOICE:
      return (
        <RadioGroup
        name={question.acid_test_questions_id}
          value={typeof currentValue === "string" ? currentValue : ""}
          onChange={(val) => {
            const selectedAnswer = question.answers.find(a => a.acid_test_answers_id === val);
            if (selectedAnswer) {
              onChange({
                questionId: question.acid_test_questions_id,
                answerId: selectedAnswer.acid_test_answers_id,
                score: selectedAnswer.score_value || 0,
                value: selectedAnswer.acid_test_answers_id,
              });
            }
          }}
          className="space-y-3"
        >
          {question.answers.map((answer) => (
            <Radio
              key={answer.acid_test_answers_id}
              value={answer.acid_test_answers_id}
              label={answer.answer_text}
              disabled={disabled}
              className="w-full p-4 border border-star-dust/10 rounded-lg data-[state=checked]:border-neurospark data-[state=checked]:bg-neurospark/10"
            />
          ))}
        </RadioGroup>
      );

    case ACID_QUESTION_TYPE.SLIDER:
      const handleSliderChange = (vals: number | readonly number[]) => {
        const normalizedVals = Array.isArray(vals) ? vals : [vals];
        const score = normalizedVals[0];
        onChange({
          questionId: question.acid_test_questions_id,
          answerId: "",
          score: Math.floor(score / 10),
          value: score,
        });
      };

      return (
        <div className="space-y-4">
          <Slider
            value={typeof currentValue === "number" ? currentValue : 50}
            onChange={(val) => {
              onChange({
                questionId: question.acid_test_questions_id,
                answerId: "",
                score: Math.floor(val / 10),
                value: val,
              });
            }}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-star-dust/40">
            <span>Not like me</span>
            <span className="text-neurospark">{currentValue || 50}</span>
            <span>Very like me</span>
          </div>
        </div>
      );

    case ACID_QUESTION_TYPE.SCALE:
      return (
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                onChange({
                  questionId: question.acid_test_questions_id,
                  answerId: "",
                  score: val,
                  value: val,
                });
              }}
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

    case ACID_QUESTION_TYPE.TEXT:
      return (
        <Textarea
          value={typeof currentValue === "string" ? currentValue : ""}
          onChange={(e) => {
            onChange({
              questionId: question.acid_test_questions_id,
              answerId: "",
              score: 0,
              value: e.target.value,
            });
          }}
          placeholder="Share your thoughts..."
          rows={4}
          disabled={disabled}
          className="w-full"
        />
      );

    default:
      return null;
  }
}

// ============================================================================
// PROGRESS INDICATOR
// ============================================================================

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
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

interface ResultViewProps {
  result: AcidTestResult;
}

function ResultView({ result }: ResultViewProps) {
  const personaDisplay = formatPersonaDisplay(result.personaLabel);
  const emoji = PERSONA_EMOJIS[result.personaLabel] || '✨';

  return (
    <Card
      data={{ id: 'acid-test-result', type: 'value', title: 'The Loom Recognizes You', value: personaDisplay }}
      variant="glass"
      radius="2xl"
      shadow="lg"
      className="p-8 text-center space-y-6"
    >
      <div className="text-6xl mb-4">{emoji}</div>
      
      <h2 className="text-2xl font-bold text-star-dust">
        The Loom Recognizes You
      </h2>
      
      <div className="text-xl text-neurospark">
        {personaDisplay}
      </div>
      
      <p className="text-star-dust/60 max-w-md mx-auto">
        {result.personaDescription}
      </p>
      
      <div className="flex items-center justify-center gap-4">
        <div className="px-4 py-2 bg-star-dust/10 rounded-lg">
          <span className="text-sm text-star-dust/60">Score</span>
          <div className="text-2xl font-bold text-star-dust">{result.totalScore}</div>
        </div>
        <div className="px-4 py-2 bg-star-dust/10 rounded-lg">
          <span className="text-sm text-star-dust/60">Tier</span>
          <div className="text-2xl font-bold text-hearth-gold capitalize">{result.suggestedTier}</div>
        </div>
      </div>
      
      {result.suggestedTier === "community" && (
        <p className="text-sanctuary-green text-sm">
          Welcome home. Your access is subsidized by the Sanctuary.
        </p>
      )}
      
      <div className="animate-pulse text-star-dust/40 text-sm">
        Entering the Sanctuary...
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
  questions: QuestionWithAnswers[];
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
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.acid_test_questions_id);
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

  // In AcidTestForm.tsx — update the submit URL and persona logic

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const answersPayload = answers.map(a => ({
      question_id: a.questionId,
      answer_text: a.value?.toString() || '',
      score: a.score,
    }));

    try {
      // Use the RPC endpoint instead of direct table insert
      const response = await fetch("/api/generated/mnemosyne-assessment/acid_test_answers_submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          p_user_id: userId,
          p_answers: answersPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit assessment");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

      const resultData: AcidTestResult = {
        totalScore: result.total_score,
        suggestedTier: result.suggested_tier as UserTier,
        personaLabel: result.persona as AcidPersona,
        personaDescription: result.persona_description,
      };

      setResult(resultData);
      onComplete?.(resultData);

      setTimeout(() => {
        router.push(RESULT_REDIRECT);
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(() => {
    if (!currentAnswer && currentQuestion?.question_type !== ACID_QUESTION_TYPE.TEXT) {
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

  if (result) {
    return <ResultView result={result} />;
  }

  if (!questions.length) {
    return <LoadingView className={className} />;
  }

  return (
    <Card
      data={{ id: 'acid-test-form', type: 'value', title: 'Acid Test', value: currentQuestion?.question_text || '' }}
      variant="glass"
      radius="lg"
      shadow="md"
      className={cn("p-6 md:p-8", className)}
    >
      <ProgressIndicator current={currentIndex} total={questions.length} />
      
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-star-dust mb-2">
            {currentQuestion.question_text}
          </h3>
          {currentQuestion.explanation && (
            <p className="text-star-dust/40 text-sm">{currentQuestion.explanation}</p>
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