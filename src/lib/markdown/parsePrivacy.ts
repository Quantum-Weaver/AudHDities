// src/lib/markdown/parsePrivacy.ts
export interface ParsedPrivacySection {
  title: string;
  level: number;
  content: string;
  subsections?: ParsedPrivacySection[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ParsedPrivacy {
  title: string;
  lastUpdated: string;
  sections: ParsedPrivacySection[];
}

export function parsePrivacyMarkdown(markdown: string): ParsedPrivacy {
  const lines = markdown.split('\n');
  const sections: ParsedPrivacySection[] = [];
  let currentSection: ParsedPrivacySection | null = null;
  let currentContent: string[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let title = 'Privacy Policy';
  let lastUpdated = 'March 19, 2026';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

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

    // Check for markdown tables
    if (line.includes('|') && line.includes('---')) {
      inTable = true;
      continue;
    }

    if (inTable && line.includes('|') && !line.includes('---')) {
      const cells = line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
      if (tableHeaders.length === 0) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    }

    if (inTable && !line.includes('|')) {
      inTable = false;
      if (currentSection && (tableHeaders.length > 0 || tableRows.length > 0)) {
        currentSection.table = {
          headers: tableHeaders,
          rows: tableRows,
        };
      }
      tableHeaders = [];
      tableRows = [];
    }

    // Check for H2 sections (##)
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
    // Check for H3 subsections (###)
    else if (line.startsWith('### ') && currentSection) {
      if (currentContent.length) {
        currentSection.content = currentContent.join('\n').trim();
      }
      
      const subsection: ParsedPrivacySection = {
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
    else if (currentSection && !inTable) {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    currentSection.content = currentContent.join('\n').trim();
    sections.push(currentSection);
  }

  return { title, lastUpdated, sections };
}