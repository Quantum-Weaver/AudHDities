// src/components/assessment/AcidTestForm.tsx
// Acid Test Form - Multi-step assessment questionnaire
// Integrates with generated types, validators, and API routes

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { RadioGroup, RadioItem } from "@/components/ui/RadioGroup";
import { TextArea } from "@/components/ui/TextArea";
import { Label } from "@/components/ui/Label";

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

// Shared Utils
import { required, composeValidators } from "@/utils/components/ui/unified_form";

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

function determinePersona(score: number, answers: AnswerValue[]): AcidPersona {
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
// QUESTION COMPONENTS
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
          value={typeof currentValue === "string" ? currentValue : ""}
          onValueChange={(val) => {
            const selectedAnswer = question.answers.find(a => a.id === val);
            if (selectedAnswer) {
              onChange({
                questionId: question.id,
                answerId: selectedAnswer.id,
                score: selectedAnswer.score_value || 0,
                value: selectedAnswer.id,
              });
            }
          }}
          disabled={disabled}
          className="space-y-3"
        >
          {question.answers.map((answer) => (
            <RadioItem
              key={answer.id}
              value={answer.id}
              label={answer.answer_text}
              className="w-full p-4 border border-white/10 rounded-lg data-[state=checked]:border-cyan-500 data-[state=checked]:bg-cyan-500/10"
            />
          ))}
        </RadioGroup>
      );

    case ACID_QUESTION_TYPE.SLIDER:
      // Handle both single number and array values from Slider
      const handleSliderChange = (vals: number | readonly number[]) => {
        // Normalize to array if needed, then get first value
        const normalizedVals = Array.isArray(vals) ? vals : [vals];
        const score = normalizedVals[0];
        onChange({
          questionId: question.id,
          answerId: "",
          score: Math.floor(score / 10),
          value: score,
        });
      };

      return (
        <div className="space-y-4">
          <Slider
            value={typeof currentValue === "number" ? [currentValue] : [50]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-white/40">
            <span>Not like me</span>
            <span className="text-cyan-400">{currentValue || 50}</span>
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
                  questionId: question.id,
                  answerId: "",
                  score: val,
                  value: val,
                });
              }}
              className={cn(
                "py-2 rounded-lg transition-all",
                currentValue === val
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
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
        <TextArea
          value={typeof currentValue === "string" ? currentValue : ""}
          onChange={(e) => {
            onChange({
              questionId: question.id,
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
      <div className="flex justify-between text-sm text-white/60">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const totalScore = calculateScore(answers);
    const suggestedTier = determineTier(totalScore);
    const personaLabel = determinePersona(totalScore, answers);
    const personaDescription = getPersonaDescription(personaLabel);

    const resultData: AcidTestResult = {
      totalScore,
      suggestedTier,
      personaLabel,
      personaDescription,
    };

    try {
      // Submit to API
      const response = await fetch("/api/generated/mnemosyne-assessment/acid_test_results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          total_score: totalScore,
          suggested_tier: suggestedTier,
          persona_label: personaLabel,
          persona_description: personaDescription,
          answers: answers.map(a => ({
            question_id: a.questionId,
            answer_id: a.answerId,
            score_value: a.score,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit assessment");
      }

      setResult(resultData);
      onComplete?.(resultData);

      // Redirect after short delay
      setTimeout(() => {
        router.push("/sanctuary");
      }, 2000);
      
    } catch (err) {
      console.error("Error submitting acid test:", err);
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Result View
  if (result) {
    const personaDisplay = result.personaLabel.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    
    return (
      <Card className={cn("p-8 text-center space-y-6", className)}>
        <div className="text-6xl mb-4">
          {result.personaLabel === "seam_warrior" && "🧦⚔️"}
          {result.personaLabel === "tab_hoarder" && "📑🔥"}
          {result.personaLabel === "void_dweller" && "🌑👁️"}
          {result.personaLabel === "masked_traveler" && "🎭🌍"}
          {result.personaLabel === "pattern_seeker" && "🌀🔍"}
          {result.personaLabel === "quantum_witness" && "✨👁️"}
        </div>
        
        <h2 className="text-2xl font-bold text-white">
          The Loom Recognizes You
        </h2>
        
        <div className="text-xl text-cyan-400">
          {personaDisplay}
        </div>
        
        <p className="text-white/60 max-w-md mx-auto">
          {result.personaDescription}
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <div className="px-4 py-2 bg-white/10 rounded-lg">
            <span className="text-sm text-white/60">Score</span>
            <div className="text-2xl font-bold text-white">{result.totalScore}</div>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-lg">
            <span className="text-sm text-white/60">Tier</span>
            <div className="text-2xl font-bold text-yellow-400 capitalize">{result.suggestedTier}</div>
          </div>
        </div>
        
        {result.suggestedTier === "community" && (
          <p className="text-green-400 text-sm">
            Welcome home. Your access is subsidized by the Sanctuary.
          </p>
        )}
        
        <div className="animate-pulse text-white/40 text-sm">
          Entering the Sanctuary...
        </div>
      </Card>
    );
  }

  // Loading State
  if (!questions.length) {
    return (
      <Card className={cn("p-8 text-center", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-white/10 rounded w-1/2 mx-auto" />
          <div className="h-32 bg-white/10 rounded" />
        </div>
      </Card>
    );
  }

  // Question View
  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <ProgressIndicator current={currentIndex} total={questions.length} />
      
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {currentQuestion.question_text}
          </h3>
          {currentQuestion.explanation && (
            <p className="text-white/40 text-sm">{currentQuestion.explanation}</p>
          )}
        </div>

        <QuestionRenderer
          question={currentQuestion}
          value={currentAnswer || null}
          onChange={handleAnswer}
          disabled={isSubmitting}
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
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