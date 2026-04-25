// src/utils/components/ui/stack.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    STACK UTILITIES                                        ║
// ║                    Spacing resolvers, class composers                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import type {
  StackSpacing,
  StackAlign,
  StackJustify,
  StackDirection,
} from '@/types/components/ui/stack.types';
import {
  STACK_GAP_MAP,
  STACK_ALIGN_MAP,
  STACK_JUSTIFY_VERTICAL_MAP,
  STACK_JUSTIFY_HORIZONTAL_MAP,
  STACK_RESPONSIVE_PREFIX,
} from '@/lib/constants/components/hof/stack.constants';

/**
 * Resolves the spacing class string, including responsive overrides.
 */
export function resolveStackSpacing(params: {
  space: StackSpacing;
  responsive?: {
    mobile?: StackSpacing;
    tablet?: StackSpacing;
    desktop?: StackSpacing;
  };
}): string {
  if (!params.responsive) return STACK_GAP_MAP[params.space];

  const classes: string[] = [];
  const { responsive } = params;

  if (responsive.mobile) classes.push(STACK_GAP_MAP[responsive.mobile]);
  if (responsive.tablet)
    classes.push(`${STACK_RESPONSIVE_PREFIX.TABLET}${STACK_GAP_MAP[responsive.tablet]}`);
  if (responsive.desktop)
    classes.push(`${STACK_RESPONSIVE_PREFIX.DESKTOP}${STACK_GAP_MAP[responsive.desktop]}`);

  return classes.length > 0 ? classes.join(' ') : STACK_GAP_MAP[params.space];
}

/**
 * Composes the full set of flex classes for a Stack.
 */
export function composeStackClasses(params: {
  direction: StackDirection;
  space: StackSpacing;
  align: StackAlign;
  justify: StackJustify;
  wrap?: boolean;
  reverse?: boolean;
  stretch?: boolean;
  responsive?: {
    mobile?: StackSpacing;
    tablet?: StackSpacing;
    desktop?: StackSpacing;
  };
  className?: string;
}): string {
  const justifyMap =
    params.direction === 'vertical'
      ? STACK_JUSTIFY_VERTICAL_MAP
      : STACK_JUSTIFY_HORIZONTAL_MAP;

  return cn(
    'flex',
    params.direction === 'vertical' ? 'flex-col' : 'flex-row',
    resolveStackSpacing({
      space: params.space,
      responsive: params.responsive,
    }),
    STACK_ALIGN_MAP[params.align],
    justifyMap[params.justify],
    params.wrap && 'flex-wrap',
    params.reverse && params.direction === 'vertical' && 'flex-col-reverse',
    params.reverse && params.direction === 'horizontal' && 'flex-row-reverse',
    params.stretch && params.direction === 'vertical' && '[&>*]:flex-1',
    params.className
  );
}