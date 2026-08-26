// src/lib/markdown/parseTerms.ts

export interface ParsedSection {
  title: string;
  level: number;
  content: string;
  subsections?: ParsedSection[];
}

export interface ParsedTerms {
  title: string;
  lastUpdated: string;
  sections: ParsedSection[];
}

export function parseTermsMarkdown(markdown: string): ParsedTerms {
  const lines = markdown.split('\n');
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let currentContent: string[] = [];
  let title = 'Terms of Service';
  let lastUpdated = 'March 19, 2026';

  for (const line of lines) {
    if (line.startsWith('# ') && !title) {
      title = line.replace('# ', '');
      continue;
    }

    if (line.includes('Last updated:')) {
      const match = line.match(/Last updated:\s*(.*)/);
      if (match) lastUpdated = match[1];
      continue;
    }

    if (line.startsWith('## ')) {
      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        sections.push(currentSection);
      }
      
      currentSection = {
        title: line.replace('## ', ''),
        level: 2,
        content: '',
        subsections: []
      };
      currentContent = [];
    }
    else if (line.startsWith('### ') && currentSection) {
      if (currentContent.length) {
        currentSection.content = currentContent.join('\n').trim();
      }
      
      const subsection: ParsedSection = {
        title: line.replace('### ', ''),
        level: 3,
        content: '',
        subsections: []
      };
      currentSection.subsections = currentSection.subsections || [];
      currentSection.subsections.push(subsection);
      currentContent = [];
    }
    // Accumulate content
    else if (currentSection) {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    currentSection.content = currentContent.join('\n').trim();
    sections.push(currentSection);
  }

  return { title, lastUpdated, sections };
}