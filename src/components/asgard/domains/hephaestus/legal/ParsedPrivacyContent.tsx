// src/components/legal/ParsedPrivacyContent.tsx
'use client';

import { TermsSection } from './TermsSection';
import { PrivacyTable } from './PrivacyTable';
import { 
  Shield, 
  Database, 
  Heart, 
  Share2, 
  Eye, 
  Trash2, 
  Lock, 
  Globe, 
  BabyIcon, 
  Mail,
  AlertCircle,
  Scale,
  HardDrive,
  Wifi
} from 'lucide-react';
import type { ParsedPrivacySection, ParsedPrivacy } from '@/lib/markdown/parsePrivacy';
import ReactMarkdown from 'react-markdown';

const iconMap: Record<string, React.ReactNode> = {
  'Our Commitment to Privacy': <Shield className="text-neurospark" size={20} />,
  'Information We Collect': <Database className="text-purple-400" size={20} />,
  'How We Use Your Information': <Eye className="text-blue-400" size={20} />,
  'Neurodivergent Data — Special Protection': <Heart className="text-pink-400" size={20} />,
  'Data Sharing and Disclosure': <Share2 className="text-yellow-400" size={20} />,
  'Your Rights': <Eye className="text-green-400" size={20} />,
  'Data Retention': <Trash2 className="text-orange-400" size={20} />,
  'Security': <Lock className="text-neurospark" size={20} />,
  'International Data Transfers': <Globe className="text-purple-400" size={20} />,
  "Children's Privacy": <BabyIcon className="text-pink-400" size={20} />,
  'Changes to This Policy': <AlertCircle className="text-yellow-400" size={20} />,
  'Contact Us': <Mail className="text-green-400" size={20} />,
  'California Privacy Rights': <Scale className="text-blue-400" size={20} />,
  'GDPR Compliance': <Shield className="text-neurospark" size={20} />,
  'Our promise': <Shield className="text-neurospark" size={20} />,
  'What we collect': <Database className="text-purple-400" size={20} />,
  'Where your data lives': <HardDrive className="text-blue-400" size={20} />,
  'What each app does with the network': <Wifi className="text-yellow-400" size={20} />,
  'Your control': <Eye className="text-green-400" size={20} />,
  'Special care for neurodivergent data': <Heart className="text-pink-400" size={20} />,
  'Children': <BabyIcon className="text-pink-400" size={20} />,
  'Changes to this policy': <AlertCircle className="text-yellow-400" size={20} />,
  'Contact': <Mail className="text-green-400" size={20} />,
};

function renderMarkdown(content: string) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="text-star-dust/70 mb-4">{children}</p>,
        ul: ({ children }) => <ul className="space-y-2 text-star-dust/70 mb-4 list-disc list-inside">{children}</ul>,
        li: ({ children }) => <li className="text-star-dust/70">{children}</li>,
        strong: ({ children }) => <strong className="text-star-dust">{children}</strong>,
        a: ({ href, children }) => (
          <a href={href} className="text-neurospark hover:underline">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface ParsedPrivacyContentProps {
  privacy: ParsedPrivacy;
}

export function ParsedPrivacyContent({ privacy }: ParsedPrivacyContentProps) {
  return (
    <div className="space-y-6">
      {privacy.sections.map((section) => (
        <TermsSection
          key={section.title}
          title={section.title}
          icon={iconMap[section.title] || <Shield className="text-star-dust/40" size={20} />}
        >
          {section.table && (
            <PrivacyTable headers={section.table.headers} rows={section.table.rows} />
          )}
          
          {section.content && renderMarkdown(section.content)}
          
          {section.subsections && section.subsections.length > 0 && (
            <div className="mt-4 space-y-4">
              {section.subsections.map((subsection) => (
                <div key={subsection.title}>
                  <h3 className="text-star-dust font-bold mb-2">{subsection.title}</h3>
                  {subsection.table && (
                    <PrivacyTable headers={subsection.table.headers} rows={subsection.table.rows} />
                  )}
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