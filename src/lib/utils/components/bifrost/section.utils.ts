// src/lib/utils/components/bifrost/section.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SECTION UTILITIES                                      ║
// ║                    Spacing manipulation, class composition                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import type { SectionSpacing } from '@/types/components/bifrost/section.types';
import {
  SECTION_SPACING,
  SECTION_SPACING_MAP,
} from '@/lib/constants/components/bifrost/section.constants';

/**
 * Resolve section spacing class, handling noTopSpacing and noBottomSpacing flags.
 *
 * Instead of string surgery on the final class, we build the correct classes
 * from the spacing key and flags.
 */
export function resolveSectionSpacing(
  spacing: SectionSpacing,
  noTopSpacing: boolean = false,
  noBottomSpacing: boolean = false
): string {
  if (spacing === SECTION_SPACING.NONE) return SECTION_SPACING_MAP[SECTION_SPACING.NONE];

  const spacingMap: Record<SectionSpacing, { top: string; bottom: string }> = {
    [SECTION_SPACING.NONE]: { top: 'pt-0', bottom: 'pb-0' },
    [SECTION_SPACING.SM]: { top: 'pt-8', bottom: 'pb-8' },
    [SECTION_SPACING.MD]: { top: 'pt-12', bottom: 'pb-12' },
    [SECTION_SPACING.LG]: { top: 'pt-16', bottom: 'pb-16' },
    [SECTION_SPACING.XL]: { top: 'pt-20', bottom: 'pb-20' },
    [SECTION_SPACING['2XL']]: { top: 'pt-24', bottom: 'pb-24' },
  };

  const { top, bottom } = spacingMap[spacing];

  const classes: string[] = [];
  if (!noTopSpacing) classes.push(top);
  if (!noBottomSpacing) classes.push(bottom);

  return classes.join(' ');
}

/**
 * Resolve the full base class string for a section.
 * Composes variant, spacing, border, and separator into one string.
 */
export function composeSectionClasses(params: {
  variantClass: string;
  spacingClass: string;
  bordered: boolean;
  separatorClass: string;
  className?: string;
}): string {
  return cn(
    'w-full',
    params.spacingClass,
    params.variantClass,
    params.bordered && 'border-t border-white/10',
    params.separatorClass,
    params.className
  );
}