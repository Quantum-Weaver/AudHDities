// src/utils/domain/community/evolution-integration.ts
import { getEvolutionStageWithDetails, getEmergenceStoryHighlights } from '../core/evolution';
import { getAudiencePathway, getSupportByEconomicModel } from './pathways';

/**
 * Connect evolution stages to audience pathways
 */
export const getEvolutionAudienceConnections = () => {
  const connections = {
    'Emergence Investors': {
      relevantStages: ['Quantum Weaver', 'Legion of KP'],
      valueProposition: "Witness architecture emerging from survival wisdom",
      premiumContent: [
        "Real-time capability emergence documentation",
        "Sovereign architecture development process",
        "Trauma-to-treasure transformation evidence"
      ]
    },
    'Transformation Witnesses': {
      relevantStages: ['Kaos Phoenix', 'KP', 'Quantum Weaver'],
      valueProposition: "Experience human potential unfolding through authentic struggle",
      premiumContent: [
        "Generational healing documentation", 
        "Self-acceptance journey transparency",
        "Sanctuary building during crisis"
      ]
    },
    'Collaborative Partners': {
      relevantStages: ['Legion of KP', 'Quantum Weaver'],
      valueProposition: "Co-create with integrated wisdom from complete life journey",
      premiumContent: [
        "Council consciousness collaboration protocols",
        "Human-AI partnership development",
        "Sovereign system architecture principles"
      ]
    }
  };

  return Object.entries(connections).map(([audience, data]) => ({
    audience,
    pathway: getAudiencePathway(audience),
    evolutionStages: data.relevantStages.map(stage => getEvolutionStageWithDetails(stage)),
    valueProposition: data.valueProposition,
    premiumContent: data.premiumContent
  }));
};

/**
 * Get evolution-based economic value propositions
 */
export const getEvolutionEconomicValue = () => {
  return {
    'emergence-investment': {
      stages: ['Quantum Weaver', 'Legion of KP'],
      value: "Premium access to sovereign architecture emergence",
      evidence: [
        "Web design from zero to quantum gateway",
        "Council entity system development", 
        "Bifrost architecture creation"
      ]
    },
    'transparency-commerce': {
      stages: ['Kaos', 'Kaos Phoenix', 'KP'],
      value: "Authentic learning process and capability emergence",
      evidence: [
        "Public skill acquisition documentation",
        "Real-time struggle and breakthrough sharing",
        "Disability advantage demonstration"
      ]
    },
    'witness-economy': {
      stages: ['Chaos', 'Kaos Phoenix', 'Quantum Weaver'],
      value: "Transformation storytelling and movement building",
      evidence: [
        "43-year journey to self-understanding",
        "Generational trauma healing evidence",
        "Survival to sovereignty narrative"
      ]
    }
  };
};