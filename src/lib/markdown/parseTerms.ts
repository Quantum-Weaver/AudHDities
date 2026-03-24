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
    // Check for title (first H1)
    if (line.startsWith('# ') && !title) {
      title = line.replace('# ', '');
      continue;
    }

    // Check for last updated
    if (line.includes('Last updated:')) {
      const match = line.match(/Last updated:\s*(.*)/);
      if (match) lastUpdated = match[1];
      continue;
    }

    // Check for H2 sections (##)
    if (line.startsWith('## ')) {
      // Save previous section if exists
      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        title: line.replace('## ', ''),
        level: 2,
        content: '',
        subsections: []
      };
      currentContent = [];
    }
    // Check for H3 subsections (###)
    else if (line.startsWith('### ') && currentSection) {
      // Save any accumulated content to current section first
      if (currentContent.length) {
        currentSection.content = currentContent.join('\n').trim();
      }
      
      // Create subsection
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

  // Save final section
  if (currentSection) {
    currentSection.content = currentContent.join('\n').trim();
    sections.push(currentSection);
  }

  return { title, lastUpdated, sections };
}