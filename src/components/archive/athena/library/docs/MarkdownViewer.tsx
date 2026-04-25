// components/docs/MarkdownViewer.tsx
'use client';

import { useEffect, useState } from 'react';
import { MarkdownBio } from '@/components/bifrost/MarkdownBio';
import { Card } from '@/components/runes/cards/Card';
import { X } from 'lucide-react';

interface MarkdownViewerProps {
  filename: string;
  onClose: () => void;
}

export function MarkdownViewer({ filename, onClose }: MarkdownViewerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/docs/${filename}`)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load document:', err);
        setLoading(false);
      });
  }, [filename]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X size={24} />
        </button>
        
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <div className="p-6">
            <MarkdownBio content={content} />
          </div>
        )}
      </Card>
    </div>
  );
}