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
  // Both start EMPTY. The old file initialised these to 'Privacy Policy' and
  // 'March 19, 2026', which made the H1 branch below unreachable (it was
  // guarded by `!title` on an already-truthy value) and made every policy
  // without a "Last updated:" line print a date it never carried.
  // 2026-08-24, fixes 1 and 2.
  let title = '';
  let lastUpdated = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for title (first H1) — now actually reachable.
    if (line.startsWith('# ') && !title) {
      title = line.replace('# ', '').trim();
      continue;
    }

    // Check for the document's own date, under either label it may use.
    if (!lastUpdated) {
      const label = DATE_LABELS.find((l) => line.includes(l));
      if (label) {
        const match = line.match(new RegExp(`${label}\\s*(.*)`));
        if (match) {
          // Strip markdown emphasis the label may be wearing (**Effective
          // date:** March 19, 2026) so the hero prints the date, not the
          // asterisks.
          lastUpdated = match[1].replace(/\*/g, '').trim();
        }
        continue;
      }
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