// src/components/legal/ParsedTermsContent.tsx
'use client';

import { TermsSection } from './TermsSection';
import { Shield, Users, DollarSign, Palette, Heart, Scale, Eye, Lock, AlertCircle, Mail } from 'lucide-react';
import type { ParsedSection, ParsedTerms } from '@/lib/markdown/parseTerms';
import ReactMarkdown from 'react-markdown';

const iconMap: Record<string, React.ReactNode> = {
  'Our Commitment': <Shield className="text-cyan-400" size={20} />,
  'User Accounts': <Users className="text-purple-400" size={20} />,
  'Neurodivergent Accessibility': <Heart className="text-pink-400" size={20} />,
  'Economic Terms': <DollarSign className="text-green-400" size={20} />,
  'Creator and Vendor Terms': <Palette className="text-purple-400" size={20} />,
  'Community Guidelines': <Heart className="text-pink-400" size={20} />,
  'Privacy': <Lock className="text-cyan-400" size={20} />,
  'Intellectual Property': <Scale className="text-purple-400" size={20} />,
  'Termination, Disclaimers, and Liability': <AlertCircle className="text-yellow-400" size={20} />,
  'Contact': <Mail className="text-green-400" size={20} />,
};

function renderMarkdown(content: string) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="text-white/70 mb-4">{children}</p>,
        ul: ({ children }) => <ul className="space-y-2 text-white/70 mb-4 list-disc list-inside">{children}</ul>,
        li: ({ children }) => <li className="text-white/70">{children}</li>,
        strong: ({ children }) => <strong className="text-white">{children}</strong>,
        a: ({ href, children }) => (
          <a href={href} className="text-cyan-400 hover:underline">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface ParsedTermsContentProps {
  terms: ParsedTerms;
}

export function ParsedTermsContent({ terms }: ParsedTermsContentProps) {
  return (
    <div className="space-y-6">
      {terms.sections.map((section) => (
        <TermsSection
          key={section.title}
          title={section.title}
          icon={iconMap[section.title] || <Scale className="text-white/40" size={20} />}
        >
          {section.content && renderMarkdown(section.content)}
          
          {section.subsections && section.subsections.length > 0 && (
            <div className="mt-4 space-y-4">
              {section.subsections.map((subsection) => (
                <div key={subsection.title}>
                  <h3 className="text-white font-bold mb-2">{subsection.title}</h3>
                  {subsection.content && renderMarkdown(subsection.content)}
                </div>
              ))}
            </div>
          )}
        </TermsSection>
      ))}
    </div>
  );
}