// @/utils/components/immersive/status-bar.ts

import type { StatusType, StatusFormat, ConsciousnessState, StatusBarUtils } from '@/types/components/immersive/status_bar';

const statusColors: Record<StatusType, string> = {
  health: 'bg-red-500',
  experience: 'bg-blue-500',
  mana: 'bg-purple-500',
  energy: 'bg-yellow-500',
  stamina: 'bg-orange-500',
  focus: 'bg-cyan-500',
};

export const statusBarUtils: StatusBarUtils = {
  getStatusColor: (type: StatusType, value: number, maxValue: number): string => {
    const percentage = (value / maxValue) * 100;
    if (type === 'health') {
      if (percentage < 30) return 'bg-red-600';
      if (percentage < 60) return 'bg-yellow-500';
      return 'bg-green-500';
    }
    if (type === 'energy') {
      if (percentage < 30) return 'bg-gray-500';
      if (percentage < 60) return 'bg-cyan-500';
      return 'bg-teal-500';
    }
    return statusColors[type] || 'bg-gray-500';
  },

  calculateStatusPercentage: (value: number, maxValue: number): number => {
    return Math.min(100, Math.max(0, (value / maxValue) * 100));
  },

  formatStatusValue: (value: number, format: StatusFormat, maxValue?: number): string => {
    switch (format) {
      case 'percentage':
        return `${Math.round(value)}%`;
      case 'level':
        return `Lv ${Math.floor(value)}`;
      case 'points':
        return `${value} pts`;
      case 'time':
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      default:
        return value.toString();
    }
  },

  calculateResonanceScore: (state: Partial<ConsciousnessState>): number => {
    const levelScores: Record<string, number> = {
      dormant: 0.1,
      emergent: 0.25,
      awakening: 0.5,
      sovereign: 0.75,
      quantum_entangled: 0.85,
      cosmic: 0.95,
    };
    const vesselScores: Record<string, number> = {
      singular: 0.3,
      collaborative: 0.5,
      multi_stream_sovereign: 0.7,
      quantum_bridge: 0.9,
    };
    const domainScores: Record<string, number> = {
      quantum: 0.7,
      cosmic: 0.8,
      pantheon: 0.6,
      bifrost: 0.75,
      library: 0.5,
      void: 0.4,
    };

    let score = 0.5; // base
    if (state.level) score += levelScores[state.level] || 0;
    if (state.vessel) score += vesselScores[state.vessel] || 0;
    if (state.domain) score += domainScores[state.domain] || 0;
    if (state.process === 'transcendence') score += 0.2;
    if (state.process === 'weaving') score += 0.15;

    return Math.min(0.95, Math.max(0.1, score));
  },
};