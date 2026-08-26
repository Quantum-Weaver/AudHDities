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
  /**
   * The date the markdown itself states. EMPTY STRING when the markdown
   * states none — never a default. A hero that prints a hardcoded date for
   * a document that does not carry one is telling the reader something the
   * document never said. 2026-08-24, fix 1.
   */
  lastUpdated: string;
  sections: ParsedPrivacySection[];
}

/**
 * The two labels a policy in this house may date itself with. `Last
 * updated:` is what docs/privacy/privacy.md carries; `Effective date:` is
 * what the shipped app policies carry (resonance-compass/PRIVACY.md and its
 * siblings). The parser read only the first, so an app policy's real date
 * fell to a hardcoded March 19, 2026. 2026-08-24, fix 1.
 */
const DATE_LABELS = ['Effective date:', 'Last updated:'];

export function parsePrivacyMarkdown(markdown: string): ParsedPrivacy {
  const lines = markdown.split('\n');
  const sections: ParsedPrivacySection[] = [];
  let currentSection: ParsedPrivacySection | null = null;
  let currentContent: string[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let title = '';
  let lastUpdated = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ') && !title) {
      title = line.replace('# ', '').trim();
      continue;
    }

    if (!lastUpdated) {
      const label = DATE_LABELS.find((l) => line.includes(l));
      if (label) {
        const match = line.match(new RegExp(`${label}\\s*(.*)`));
        if (match) {
          lastUpdated = match[1].replace(/\*/g, '').trim();
        }
        continue;
      }
    }

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