// =====================================================
// FILE: constants/generated/prometheus-meta/pattern_context.ts
// GENERATED: 2026-04-22T18:15:11.357Z
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
