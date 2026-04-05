// =====================================================
/* @/lib/constants/core/crisis-resources.ts */
// CRISIS RESOURCES (Static)
// =====================================================

export const CRISIS_HOTLINES = [
  { name: '988 Suicide & Crisis Lifeline', number: '988', country: 'US' },
  { name: 'Crisis Text Line', number: '741741', country: 'US', text: true },
  { name: 'Trevor Project', number: '866-488-7386', country: 'US', note: 'LGBTQ+ youth' },
  { name: 'Trans Lifeline', number: '877-565-8860', country: 'US' },
];

export const DEFAULT_CRISIS_PLAN = {
  steps: [],
  emergency_contacts: [],
  preferred_hospitals: [],
  medications: [],
};

export type CrisisHotlines = typeof CRISIS_HOTLINES[keyof typeof CRISIS_HOTLINES];
export type DefaultCrisisPlan = typeof DEFAULT_CRISIS_PLAN[keyof typeof DEFAULT_CRISIS_PLAN];