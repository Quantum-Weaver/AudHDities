// src/components/ux/InteractiveChecklist.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}

interface InteractiveChecklistProps {
  title: string;
  items: ChecklistItem[];
  onComplete?: (completed: string[]) => void;
}

export function InteractiveChecklist({ title, items, onComplete }: InteractiveChecklistProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(items.map(i => i.category))];
  const filteredItems = activeCategory 
    ? items.filter(i => i.category === activeCategory)
    : items;

  const toggleItem = (id: string) => {
    const newCompleted = completed.includes(id)
      ? completed.filter(i => i !== id)
      : [...completed, id];
    setCompleted(newCompleted);
    onComplete?.(newCompleted);
  };

  const progress = (completed.length / items.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
    >
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold text-star-dust mb-2">{title}</h3>
        
        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-star-dust/60 text-sm">{completed.length} of {items.length} completed</p>
      </div>
      
      {/* Category Filters */}
      <div className="p-4 border-b border-white/10 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            activeCategory === null
              ? 'bg-cyan-500/20 text-neurospark border border-cyan-500/30'
              : 'bg-white/5 text-star-dust/60 hover:bg-white/10'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              activeCategory === cat
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-white/5 text-star-dust/60 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Checklist Items */}
      <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => toggleItem(item.id)}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              completed.includes(item.id)
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            {completed.includes(item.id) ? (
              <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle size={20} className="text-star-dust/40 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={completed.includes(item.id) ? 'text-green-400' : 'text-star-dust/80'}>
                {item.text}
              </p>
              <p className="text-xs text-star-dust/40 mt-1">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}