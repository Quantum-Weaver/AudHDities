// src/components/guild/AcidTest.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Sparkles } from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  options: AnswerOption[];
}

interface AnswerOption {
  id: string;
  answer_text: string;
  score_value: number;
  indicates_nd: boolean;
}

interface AcidTestResult {
  score: number;
  tier: 'community' | 'ally' | 'corporate';
  persona: string;
  description: string;
}

const PERSONAS = [
  { min: 0, max: 35, name: 'masked_traveler', tier: 'ally' as const, description: 'You navigate the neurotypical world with practiced skill. Your support enables sanctuary access for others.' },
  { min: 36, max: 70, name: 'tab_hoarder', tier: 'community' as const, description: 'The Loom recognizes your pattern. Subsidized access granted.' },
  { min: 71, max: 110, name: 'seam_warrior', tier: 'community' as const, description: 'Your sensory sovereignty is profound. Welcome home.' },
  { min: 111, max: 150, name: 'void_dweller', tier: 'community' as const, description: 'You find peace in the spaces between. The silence welcomes you.' },
  { min: 151, max: 250, name: 'quantum_witness', tier: 'community' as const, description: 'You see what others cannot. The patterns reveal themselves to you.' },
];

export default function AcidTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AcidTestResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  // Fetch random questions from database
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all active questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('acid_test_questions')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (questionsError) throw questionsError;
        
        if (!questionsData || questionsData.length === 0) {
          throw new Error('No questions found');
        }

        // Fetch all answers
        const { data: answersData, error: answersError } = await supabase
          .from('acid_test_answers')
          .select('*');

        if (answersError) throw answersError;

        // Build question objects with their options
        const questionsWithOptions: Question[] = questionsData.map(q => ({
          id: q.id,
          question_text: q.question_text,
          options: (answersData || [])
            .filter(a => a.question_id === q.id)
            .map(a => ({
              id: a.id,
              answer_text: a.answer_text,
              score_value: a.score_value || 0,
              indicates_nd: a.indicates_nd || false,
            }))
        }));

        // Select random 5 questions (or all if less than 5)
        const shuffled = [...questionsWithOptions];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        setQuestions(shuffled.slice(0, 5));
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [supabase]);

  const handleAnswer = (optionId: string, answerText: string, score: number) => {
    // Store the answer with its text and score for later reference
    setAnswers({ 
      ...answers, 
      [questions[currentQ].id]: JSON.stringify({ optionId, answerText, score })
    });
    
    if (currentQ < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      calculateAndSaveResult();
    }
  };

  const calculateAndSaveResult = async () => {
    // Calculate score
    let totalScore = 0;
    const answerDetails: Record<string, any> = {};
    
    questions.forEach(q => {
      const answerData = answers[q.id];
      if (answerData) {
        const parsed = JSON.parse(answerData);
        totalScore += parsed.score;
        answerDetails[q.id] = {
          question_text: q.question_text,
          answer_text: parsed.answerText,
          score: parsed.score
        };
      }
    });

    // Determine persona
    const persona = PERSONAS.find(p => totalScore >= p.min && totalScore <= p.max) || PERSONAS[0];
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError('You must be logged in to save results');
      return;
    }

    setSaving(true);
    
    try {
      // 1. Save results to acid_test_results table
      const { error: resultError } = await supabase
        .from('acid_test_results')
        .insert({
          user_id: user.id,
          total_score: totalScore,
          suggested_tier: persona.tier,
          persona_label: persona.name,
          answers: answerDetails
        });

      if (resultError) throw resultError;

      // 2. Get current profile tier
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_tier')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // 3. Determine new tier (only upgrade, never downgrade)
      const tierRank = { community: 1, ally: 2, corporate: 3, council: 4 };
      const currentRank = tierRank[profile.user_tier as keyof typeof tierRank] || 0;
      const newRank = tierRank[persona.tier];
      
      let finalTier = profile.user_tier;
      let finalPersona = persona.name;
      
      if (newRank > currentRank) {
        finalTier = persona.tier;
      } else if (persona.tier === 'community' && (!profile.user_tier || profile.user_tier === 'ally')) {
        // Allow ally to become community (upgrade in sanctuary terms)
        finalTier = persona.tier;
      } else if (persona.tier === 'ally' && profile.user_tier === 'corporate') {
        // Corporate to ally is fine (they're choosing to support)
        finalTier = persona.tier;
      } else if (!profile.user_tier) {
        finalTier = persona.tier;
      }

      // 4. Update profile with results (only if tier changed or no previous test)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          user_tier: finalTier,
          acid_test_score: totalScore,
          acid_test_persona: finalPersona,
          acid_test_taken_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Set result for display
      setResult({
        score: totalScore,
        tier: finalTier as 'community' | 'ally' | 'corporate',
        persona: finalPersona.replace(/_/g, ' '),
        description: persona.description
      });
      
    } catch (err) {
      console.error('Error saving results:', err);
      setError('Failed to save results. Please try again.');
      
      // Still show result even if save failed (just don't persist)
      setResult({
        score: totalScore,
        tier: persona.tier,
        persona: persona.name.replace(/_/g, ' '),
        description: persona.description
      });
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-cyan-400 mb-4" size={40} />
        <p className="text-white/60">Gathering questions from the loom...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (result) {
    const isUpgrade = result.tier !== 'ally'; // Simplified - you can make this more nuanced
    const showRetake = result.tier !== 'community'; // Community members can't retake

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-center"
      >
        <div className="mb-6">
          <span className="text-6xl mb-4 block">🌌</span>
          <h3 className="text-3xl font-bold text-white mb-2">The Loom Recognizes You</h3>
          <p className="text-cyan-400 text-xl capitalize">{result.persona}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{result.score}</div>
              <div className="text-sm text-white/50">Acid Score</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${
                result.tier === 'community' ? 'text-green-400' : 
                result.tier === 'ally' ? 'text-yellow-400' : 'text-purple-400'
              }`}>
                {result.tier}
              </div>
              <div className="text-sm text-white/50">Access Tier</div>
            </div>
          </div>
          
          <p className="text-white/70 max-w-md mx-auto">{result.description}</p>

          {result.tier === 'community' && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm">
                ✨ Your access is subsidized by the Sanctuary Commons and ally contributions.
              </p>
            </div>
          )}

          {isUpgrade && (
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-400 text-sm">
                ✨ Your tier has been updated! Welcome to your new access level.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="/dashboard"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all"
          >
            Proceed to Sanctuary
          </a>
          {showRetake && (
            <button
              onClick={reset}
              disabled={saving}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all disabled:opacity-50"
            >
              Retake Test
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {saving && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black/80 p-6 rounded-xl text-center">
            <Loader2 className="animate-spin text-cyan-400 mx-auto mb-4" size={32} />
            <p className="text-white">Saving your results...</p>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="flex justify-between text-sm text-white/50 mb-8">
        <span>Question {currentQ + 1} of {questions.length}</span>
        <span className="flex items-center gap-2">
          <Sparkles size={12} className="text-cyan-400" />
          The Acid Test
        </span>
      </div>

      <AnimatePresence mode="wait">
        {questions[currentQ] && (
          <motion.div
            key={currentQ}
            initial={isAnimating ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
              {questions[currentQ].question_text}
            </h3>

            <div className="space-y-3">
              {questions[currentQ].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id, option.answer_text, option.score_value)}
                  disabled={isAnimating}
                  className="w-full p-6 text-left rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-200 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">{option.answer_text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}