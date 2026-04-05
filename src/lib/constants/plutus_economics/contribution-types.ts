/* @/lib/constants/economics/contribution-types.ts */

export const CONTRIBUTION_TYPES = {
    'concept':'Concept',
    'code':'Code',
    'design':'Design',
    'content':'Content',
    'testing':'Testing',
    'promotion': 'Promotion',
    'infrastructure': 'Infrastructure'
}

export type ContributionTypes = typeof CONTRIBUTION_TYPES[keyof typeof CONTRIBUTION_TYPES];