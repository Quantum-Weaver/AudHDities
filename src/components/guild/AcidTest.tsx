'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface AcidTestResult {
  score: number;
  tier: 'community' | 'ally' | 'corporate';
  persona: string;
  description: string;
}

const QUESTIONS = [
  {
    id: '1',
    text: 'When someone says "We need to talk later," your immediate assumption is:',
    options: [
      { id: 'a', text: 'They mean scheduling logistics', score: 0, nd: false },
      { id: 'b', text: 'The relationship is ending and I begin grieving immediately', score: 10, nd: true },
      { id: 'c', text: 'I need the exact timestamp, topic, and emotional weight to prepare', score: 15, nd: true }
    ]
  },
  {
    id: '2',
    text: 'Regarding socks:',
    options: [
      { id: 'a', text: 'A clothing item', score: 0, nd: false },
      { id: 'b', text: 'A prison for my feet with seam-based warfare', score: 10, nd: true },
      { id: 'c', text: 'I have strong opinions about fiber content', score: 5, nd: true }
    ]
  },
  {
    id: '3',
    text: 'Your browser currently has how many tabs open:',
    options: [
      { id: 'a', text: '1-5 (suspiciously organized)', score: 0, nd: false },
      { id: 'b', text: '20-50 (normal)', score: 5, nd: true },
      { id: 'c', text: 'So many I can only see favicons, some playing music I cannot locate', score: 15, nd: true }
    ]
  },
  {
    id: '4',
    text: 'The ideal lighting environment is:',
    options: [
      { id: 'a', text: 'Whatever is available', score: 0, nd: false },
      { id: 'b', text: 'A specific color temperature that cannot be named, only felt', score: 10, nd: true },
      { id: 'c', text: 'The void (complete darkness)', score: 15, nd: true }
    ]
  },
  {
    id: '5',
    text: '"Just give me a call" is interpreted as:',
    options: [
      { id: 'a', text: 'An open invitation to communicate', score: 0, nd: false },
      { id: 'b', text: 'A threat of unspecified magnitude', score: 10, nd: true },
      { id: 'c', text: 'I will email instead and feel guilty forever', score: 5, nd: true }
    ]
  }
];

const PERSONAS = [
  { min: 0, max: 15, name: 'The Masked Traveler', tier: 'ally' as const, description: 'You navigate the neurotypical world with practiced skill. Your support enables sanctuary access for others.' },
  { min: 16, max: 35, name: 'The Tab Hoarder', tier: 'community' as const, description: 'The Loom recognizes your pattern. Subsidized access granted.' },
  { min: 36, max: 75, name: 'The Seam Warrior', tier: 'community' as const, description: 'Your sensory sovereignty is profound. Welcome home.' }
];

export default function AcidTest() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AcidTestResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [QUESTIONS[currentQ].id]: optionId });
    
    if (currentQ < QUESTIONS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let score = 0;
    
    QUESTIONS.forEach(q => {
      const answerId = answers[q.id];
      const option = q.options.find(o => o.id === answerId);
      if (option) score += option.score;
    });

    const persona = PERSONAS.find(p => score >= p.min && score <= p.max) || PERSONAS[0];
    
    setResult({
      score,
      tier: persona.tier,
      persona: persona.name,
      description: persona.description
    });
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={"max-w-2xl mx-auto p-8 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-center"}
      >
        <div className="mb-6">
          <span className="text-6xl mb-4 block">🌌</span>
          <h3 className="text-3xl font-bold text-white mb-2">The Loom Recognizes You</h3>
          <p className="text-cyan-400 text-xl">{result.persona}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{result.score}</div>
              <div className="text-sm text-white/50">Acid Score</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${
                result.tier === 'community' ? 'text-green-400' : 'text-yellow-400'
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
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/cure/tickets"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all"
          >
            Proceed to Sanctuary
          </Link>
          <button
            onClick={reset}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            Retake Test
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between text-sm text-white/50 mb-8">
        <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
        <span>The Acid Test</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={isAnimating ? { opacity: 0, x: 50 } : false}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="space-y-6"
        >
          <h3 className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
            {QUESTIONS[currentQ].text}
          </h3>

          <div className="space-y-3">
            {QUESTIONS[currentQ].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={isAnimating}
                className={"w-full p-6 text-left rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-200 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"}
              >
                <span className="text-lg">{option.text}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className={"mt-8 h-1 bg-white/10 rounded-full overflow-hidden"}>
        <div 
          className={"h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"}
          style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}