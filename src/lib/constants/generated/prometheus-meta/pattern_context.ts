// =====================================================
// FILE: constants/generated/prometheus-meta/pattern_context.ts
// GENERATED: 2026-04-30T04:17:48.959Z
// SOURCE: Constants.public.Enums.pattern_context
// VALUES: 4 entries
// =====================================================

export const PATTERN_CONTEXT = {
  TYPESCRIPT_FILE: 'typescript_file',
  REACT_COMPONENT: 'react_component',
  CONFIG_FILE: 'config_file',
  PYTHON_FILE: 'python_file',
} as const;

export type PatternContext = typeof PATTERN_CONTEXT[keyof typeof PATTERN_CONTEXT];
