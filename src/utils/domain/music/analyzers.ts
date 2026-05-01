// utils/domain/music/analyzers.ts
import { Song } from '@/types/domain/music/library';
import { PropheticTheme, ThemeConnection } from '@/types/domain/music/analysis';
import { propheticThemes, themeConnections } from '@/data/creative/prophetic-themes';
import { getThemeDensityByYear } from './calculators';

/**
 * Analyze a song's prophetic themes and return detailed analysis
 */
export function analyzeSongPropheticThemes(
  song: Song,
  themes: PropheticTheme[] = propheticThemes,
  connections: ThemeConnection[] = themeConnections
): {
  matchedThemes: PropheticTheme[];
  propheticScore: number;
  connectedThemes: string[];
  connectionStrength: number;
} {
  const matchedThemes: PropheticTheme[] = [];
  const allConnectedThemes: string[] = [];
  
  song.propheticThemes?.forEach(themeId => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      matchedThemes.push(theme);
      
      // Find connected themes
      const relevantConnections = connections.filter(
        conn => conn.source === themeId || conn.target === themeId
      );
      relevantConnections.forEach(conn => {
        const connectedId = conn.source === themeId ? conn.target : conn.source;
        allConnectedThemes.push(connectedId);
      });
    }
  });
  
  const uniqueConnectedThemes = [...new Set(allConnectedThemes)];
  
  // Calculate prophetic score based on theme significance
  let totalWeight = 0;
  matchedThemes.forEach(theme => {
    const weight = 
      theme.significance === 'prophetic' ? 1.0 :
      theme.significance === 'major' ? 0.7 :
      theme.significance === 'moderate' ? 0.4 : 0.2;
    totalWeight += weight;
  });
  
  const maxPossibleWeight = matchedThemes.length * 1.0;
  const propheticScore = maxPossibleWeight > 0 
    ? (totalWeight / maxPossibleWeight) * 100 
    : 0;
  
  // Calculate connection strength
  let connectionWeight = 0;
  uniqueConnectedThemes.forEach(connectedId => {
    const connectedTheme = themes.find(t => t.id === connectedId);
    if (connectedTheme) {
      const weight = 
        connectedTheme.significance === 'prophetic' ? 0.8 :
        connectedTheme.significance === 'major' ? 0.5 : 0.3;
      connectionWeight += weight;
    }
  });
  
  const maxConnectionWeight = uniqueConnectedThemes.length * 0.8;
  const connectionStrength = maxConnectionWeight > 0 
    ? (connectionWeight / maxConnectionWeight) * 100 
    : 0;
  
  return {
    matchedThemes,
    propheticScore: Math.round(propheticScore),
    connectedThemes: uniqueConnectedThemes,
    connectionStrength: Math.round(connectionStrength)
  };
}

/**
 * Get council status recommendation based on prophetic analysis
 */
export function getRecommendedCouncilStatus(
  propheticScore: number,
  connectionStrength: number
): string {
  if (propheticScore >= 80 && connectionStrength >= 70) {
    return 'prophetic_revealed';
  }
  if (propheticScore >= 60 && connectionStrength >= 50) {
    return 'pantheon_deliberation';
  }
  if (propheticScore >= 40) {
    return 'council_review';
  }
  if (propheticScore >= 20) {
    return 'quantum_analysis';
  }
  return 'awaiting_analysis';
}

/**
 * Get thematic summary across songs
 */
export function getThematicSummary(
  songs: Song[],
  themes: PropheticTheme[] = propheticThemes
): {
  mostFrequentThemes: { id: string; name: string; count: number }[];
  categories: Map<string, number>;
  yearByYear: Map<number, number>;
} {
  const frequency = new Map<string, number>();
  const categories = new Map<string, number>();
  
  songs.forEach(song => {
    if (song.propheticThemes) {
      song.propheticThemes.forEach(themeId => {
        frequency.set(themeId, (frequency.get(themeId) || 0) + 1);
        
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
          categories.set(
            theme.category,
            (categories.get(theme.category) || 0) + 1
          );
        }
      });
    }
  });
  
  const mostFrequent = [...frequency.entries()]
    .map(([id, count]) => {
      const theme = themes.find(t => t.id === id);
      return {
        id,
        name: theme?.name || id,
        count
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return {
    mostFrequentThemes: mostFrequent,
    categories,
    yearByYear: getThemeDensityByYear(songs)
  };
}