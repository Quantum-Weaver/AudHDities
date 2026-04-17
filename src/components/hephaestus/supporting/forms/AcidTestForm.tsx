// src/components/forms/validators/AcidTestForm.tsx
// components/forms/AcidTestForm.tsx
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Import validators
import { 
  acidTestFormSchema, 
  acidTestSubmissionSchema,
  acidTestResponseSchema,
  type acidTestResponseSchema as AcidTestResponseType 
} from '@/lib/validators/acid-test';

// Import types
import type { AcidTestQuestion } from '@/types/supabase/tables/acid_test_questions';
import type { AcidTestAnswer } from '@/types/supabase/tables/acid_test_answers';

// Infer types from schemas
type AcidTestFormData = z.infer<typeof acidTestFormSchema>;
type AcidTestResponse = z.infer<typeof acidTestResponseSchema>;

interface AcidTestFormProps {
  questions: (AcidTestQuestion & { answers: AcidTestAnswer[] })[];
  onComplete?: (result: { tier: string; persona: string; score: number }) => void;
  redirectTo?: string;
}

// Scoring thresholds
const SCORE_THRESHOLDS = {
  COMMUNITY: 20,
  ALLY_MIN: 10,
  ALLY_MAX: 19,
};

export default function AcidTestForm({ 
  questions, 
  onComplete, 
  redirectTo = '/sanctuary' 
}: AcidTestFormProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ tier: string; persona: string; score: number } | null>(null);

  // Initialize form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<AcidTestFormData>({
    resolver: zodResolver(acidTestFormSchema),
    defaultValues: {
      responses: questions.map((q, index) => ({
        questionId: q.id,
        answer: '',
        score: 0,
      })),
    },
    mode: 'onChange',
  });

  // Get current response
  const currentResponse = watch(`responses.${currentQuestion}`);
  const allResponses = watch('responses');

  // Handle answer selection
  const handleAnswer = (answer: AcidTestAnswer, score: number) => {
    setValue(`responses.${currentQuestion}`, {
      questionId: questions[currentQuestion].id,
      answer: answer.id,
      score: score,
    });

    // Auto-advance after selection for multiple choice
    if (questions[currentQuestion].question_type === 'multiple_choice') {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  // Handle slider/scale input
  const handleSliderChange = (value: number) => {
    setValue(`responses.${currentQuestion}`, {
      questionId: questions[currentQuestion].id,
      answer: value.toString(),
      score: value,
    });
  };

  // Handle text input (with debounce)
  const handleTextChange = (value: string) => {
    // Text answers typically don't have scores
    setValue(`responses.${currentQuestion}`, {
      questionId: questions[currentQuestion].id,
      answer: value,
      score: 0,
    });
  };

  // Calculate final score and tier
  const calculateResult = (responses: AcidTestResponse[]) => {
    let totalScore = 0;
    
    responses.forEach(response => {
      totalScore += response.score || 0;
    });

    let tier: 'community' | 'ally' | 'corporate' = 'ally';
    if (totalScore >= SCORE_THRESHOLDS.COMMUNITY) {
      tier = 'community';
    }

    // Persona based on score and response patterns
    let persona = 'pattern_seeker';
    if (totalScore >= 30) persona = 'seam_warrior';
    else if (totalScore >= 20) persona = 'tab_hoarder';
    else if (totalScore >= 10) persona = 'void_dweller';
    else if (totalScore < 5) persona = 'masked_traveler';

    return { totalScore, tier, persona };
  };

  // Handle form submission
  const onSubmit = async (data: AcidTestFormData) => {
    setIsSubmitting(true);

    try {
      const { totalScore, tier, persona } = calculateResult(data.responses);

      // Prepare submission data
      const submissionData = {
        answers: data.responses.map(r => ({
          question_id: r.questionId,
          answer_value: r.answer,
        })),
      };

      // Validate against server schema
      const validated = acidTestSubmissionSchema.parse(submissionData);

      // Submit to API
      const response = await fetch('/api/acid-test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        throw new Error('Failed to submit test');
      }

      const result = await response.json();

      setResult({ tier, persona, score: totalScore });
      
      if (onComplete) {
        onComplete({ tier, persona, score: totalScore });
      }

      // Redirect after short delay
      setTimeout(() => {
        router.push(redirectTo);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting acid test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render result view
  if (result) {
    return (
      <div className="text-center space-y-6 p-8 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
        <div className="text-5xl mb-4">
          {result.persona === 'seam_warrior' && '🧦⚔️'}
          {result.persona === 'tab_hoarder' && '📑🔥'}
          {result.persona === 'void_dweller' && '🌑👁️'}
          {result.persona === 'masked_traveler' && '🎭🌍'}
          {result.persona === 'pattern_seeker' && '🌀🔍'}
          {result.persona === 'quantum_witness' && '✨👁️'}
        </div>
        <h3 className="text-2xl font-bold text-white">
          The Loom Recognizes You
        </h3>
        <div className="text-xl text-cyan-400 capitalize">
          {result.persona.replace('_', ' ')}
        </div>
        <div className="text-white/60">
          Score: {result.score} | Tier: <span className="text-yellow-400 capitalize">{result.tier}</span>
        </div>
        {result.tier === 'community' && (
          <p className="text-green-400">
            Welcome home. Your access is subsidized by the Sanctuary.
          </p>
        )}
        {result.tier === 'ally' && (
          <p className="text-blue-400">
            Thank you for your support. Your contributions help sustain the community.
          </p>
        )}
        <div className="animate-pulse text-white/40 text-sm">
          Entering the Sanctuary...
        </div>
      </div>
    );
  }

  // Render current question
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question counter */}
      <div className="text-center text-white/50 text-sm">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      {/* Current question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-2xl text-white font-medium text-center">
            {currentQ.question_text}
          </h3>

          <Controller
            name={`responses.${currentQuestion}`}
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                {currentQ.question_type === 'multiple_choice' && currentQ.answers?.map((answer) => (
                  <button
                    key={answer.id}
                    type="button"
                    onClick={() => handleAnswer(answer, answer.score_value || 0)}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      field.value?.answer === answer.id
                        ? 'bg-cyan-600/40 border-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white'
                    }`}
                  >
                    {answer.answer_text}
                  </button>
                ))}

                {currentQ.question_type === 'slider' && (
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={field.value?.answer ? parseInt(field.value.answer as string) : 50}
                      onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="text-center text-white/60">
                      Value: {field.value?.answer || 50}
                    </div>
                  </div>
                )}

                {currentQ.question_type === 'scale' && (
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleSliderChange(val)}
                        className={`w-12 h-12 rounded-full transition-all ${
                          field.value?.answer === val.toString()
                            ? 'bg-cyan-600 text-white scale-110'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                )}

                {currentQ.question_type === 'text' && (
                  <textarea
                    rows={4}
                    value={field.value?.answer as string || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/40 focus:border-cyan-500 focus:outline-none"
                  />
                )}
              </div>
            )}
          />

          {errors.responses?.[currentQuestion] && (
            <p className="text-red-400 text-sm text-center">
              {errors.responses[currentQuestion]?.message}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4 pt-6">
        {currentQuestion > 0 && (
          <button
            type="button"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            Previous
          </button>
        )}

        {currentQuestion < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={!currentResponse?.answer}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/10 disabled:text-white/40 text-white rounded-lg transition-all ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:bg-white/10 disabled:text-white/40 text-white rounded-lg transition-all ml-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Complete Test'}
          </button>
        )}
      </div>

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">
            Please answer all questions before submitting.
          </p>
        </div>
      )}
    </form>
  );
}