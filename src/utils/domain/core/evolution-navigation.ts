// src/utils/domain/core/evolution-navigation.ts
import { APP_ROUTES } from '@/lib/constants/systems/navigation/paths';
import { getCurrentEvolutionStage, getEvolutionStageWithDetails } from './evolution';

/**
 * Get evolution-based navigation for different audiences
 */
export const getEvolutionNavigation = () => {
  const currentStage = getCurrentEvolutionStage();
  
  return {
    // Main evolution journey
    journey: {
      route: APP_ROUTES.origin,
      description: 'Complete evolutionary journey from survival to sovereignty',
      currentStage: currentStage?.identity,
      stageProgress: currentStage ? getEvolutionStageWithDetails(currentStage.identity) : null
    },
    
    // Audience-specific evolution insights
    audiencePaths: {
      investors: {
        route: '/emergence-investment',
        focus: 'Architecture emergence and capability demonstration',
        stages: ['Legion of KP', 'Quantum Weaver']
      },
      witnesses: {
        route: '/emergence-story', 
        focus: 'Transformation narrative and healing journey',
        stages: ['Kaos', 'Kaos Phoenix', 'KP']
      },
      partners: {
        route: '/transparent-development',
        focus: 'Collaborative learning and system co-creation',
        stages: ['Legion of KP', 'Quantum Weaver']
      }
    },
    
    // Evolution economics integration
    economicIntegration: {
      premiumContent: [
        {
          title: 'Capability Emergence Documentation',
          route: '/premium/emergence',
          stages: ['Quantum Weaver'],
          value: 'Real-time skill acquisition evidence'
        },
        {
          title: 'Transformation Transparency', 
          route: '/premium/transformation',
          stages: ['Kaos Phoenix', 'KP'],
          value: 'Healing journey and self-acceptance process'
        },
        {
          title: 'Sovereign Architecture',
          route: '/premium/architecture', 
          stages: ['Legion of KP', 'Quantum Weaver'],
          value: 'System design from integrated wisdom'
        }
      ]
    }
  };
};