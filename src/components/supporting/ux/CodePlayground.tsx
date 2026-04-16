// src/components/ux/CodePlayground.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Play } from 'lucide-react';

interface CodePlaygroundProps {
  title: string;
  description: string;
  code: string;
  language: string;
  preview?: React.ReactNode;
}

export function CodePlayground({ title, description, code, language, preview }: CodePlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-black/40"
    >
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold">{title}</h3>
            <p className="text-white/40 text-sm">{description}</p>
          </div>
          <div className="flex gap-2">
            {preview && (
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Toggle preview"
              >
                <Play size={16} className="text-cyan-400" />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-white/60" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {showPreview && preview && (
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="text-sm text-white/60 mb-2">Preview:</div>
          {preview}
        </div>
      )}
      
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-white/80 font-mono whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}