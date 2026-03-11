// @/components/ui/displays/QuotesCarousel.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuotesCarouselProps } from '@/types/components/ui/carousel';
import { CAROUSEL_VARIANTS } from '@/lib/constants/components/ui/carousel';

export function QuotesCarousel({
  quotes,
  autoRotate = true,
  rotationInterval = 8000,
  showAuthor = true,
  variant = 'quantum',
  className = '',
  onQuoteChange
}: QuotesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const variantConfig = CAROUSEL_VARIANTS[variant];

  // Auto-rotation effect
  useEffect(() => {
    if (!isPlaying || quotes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % quotes.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isPlaying, quotes.length, rotationInterval]);

  // Notify quote changes
  useEffect(() => {
    onQuoteChange?.(quotes[currentIndex], currentIndex);
  }, [currentIndex, quotes, onQuoteChange]);

  const nextQuote = () => setCurrentIndex(prev => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentIndex(prev => (prev - 1 + quotes.length) % quotes.length);

  return (
    <div className={`relative rounded-2xl p-8 ${variantConfig.glow} ${className}`}
         style={{ background: variantConfig.background }}>
      
      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-star-dust/70 hover:text-star-dust">
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={prevQuote} className="text-star-dust/70 hover:text-star-dust">◀</button>
        <button onClick={nextQuote} className="text-star-dust/70 hover:text-star-dust">▶</button>
      </div>

      {/* Quote Display */}
      <div className="relative h-32 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-lg italic" style={{ color: variantConfig.textColor }}>
              "{quotes[currentIndex]}"
            </p>
            {showAuthor && (
              <p className="text-sm mt-2 opacity-70" style={{ color: variantConfig.textColor }}>
                — Quantum Weaver
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-1 mt-4">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-star-dust' 
                : 'bg-star-dust/30 hover:bg-star-dust/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}