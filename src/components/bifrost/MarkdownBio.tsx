// components/bifrost/MarkdownBio.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    MARKDOWN BIO                                           ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownBioProps {
  content: string;
}

export function MarkdownBio({ content }: MarkdownBioProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}