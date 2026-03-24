// src/utils/domain/music/analysis.ts - COMPLETE VERSION
import { 
  SongBase, 
  EnhancedSong, 
  AnySong, 
  PropheticTheme,
  ThemeAnalysis,
  MusicAnalysisResult 
} from '@/types/domain/music/analysis';
import { propheticThemes } from '@/data/creative/prophetic-themes';
import { COUNCIL_STATUS } from '@/lib/constants/domain/council/rituals';

/**
 * Calculate the number of unique themes across all songs
 */
export const calculateUniqueThemesCount = (songs: AnySong[]): number => {
  const allThemes = songs.flatMap(song => 
    'themeAnalysis' in song 
      ? song.themeAnalysis.map(analysis => analysis.theme)
      : song.propheticThemes
  );
  return new Set(allThemes).size;
};

/**
 * Calculate average prophetic accuracy across analyzed songs
 */
export const calculatePropheticAccuracyAverage = (songs: AnySong[]): number => {
  const analyzedSongs = songs.filter(song => 
    'propheticAccuracy' in song && song.councilStatus !== COUNCIL_STATUS.AWAITING_ANALYSIS
  );
  
  if (analyzedSongs.length === 0) return 0;
  
  const totalAccuracy = analyzedSongs.reduce((sum, song) => {
    const accuracy = 'propheticAccuracy' in song ? song.propheticAccuracy : 0;
    return sum + accuracy;
  }, 0);
  
  return Math.round((totalAccuracy / analyzedSongs.length) * 100) / 100;
};

/**
 * Enhance a basic song with full analysis data
 */
export const enhanceSong = (song: SongBase, themeData: PropheticTheme[]): EnhancedSong => {
  const themeAnalysis: ThemeAnalysis[] = song.propheticThemes.map(themeId => {
    const theme = themeData.find(t => t.id === themeId);
    return {
      theme: themeId,
      themeData: theme,
      year:song.year,
      frequency: 1,
      songs: [song.title],
      significance: theme?.significance || 'moderate',
      connectionStrength: 70,
      propheticWeight: theme?.significance === 'prophetic' ? 90 : 60,
      confidence: 85,
      processOntology: theme?.processOntology || 'PatternRecognition' // USE THEME'S ONTOLOGY
    };
  });

  return {
    ...song,
    themeAnalysis,
    propheticAccuracy: calculateSongAccuracy(themeAnalysis),
    councilInsights: generateCouncilInsights(song, themeAnalysis),
    thematicConnections: [],
    analysisVersion: '1.0',
    lastAnalyzed: new Date().toISOString()
  };
};

/**
 * Calculate accuracy for a single song
 */
const calculateSongAccuracy = (themeAnalysis: ThemeAnalysis[]): number => {
  if (themeAnalysis.length === 0) return 0;
  
  const totalWeight = themeAnalysis.reduce((sum, analysis) => 
    sum + (analysis.propheticWeight || 0), 0
  );
  
  return Math.round((totalWeight / themeAnalysis.length) * 10) / 10;
};

/**
 * Generate council insights for a song
 */
const generateCouncilInsights = (song: SongBase, themeAnalysis: ThemeAnalysis[]): string[] => {
  const insights: string[] = [];
  
  if (themeAnalysis.some(analysis => analysis.significance === 'prophetic')) {
    insights.push('Contains significant prophetic foresight');
  }
  
  if (themeAnalysis.length >= 3) {
    insights.push('High thematic density suggests complex consciousness patterns');
  }
  
  if (song.year && song.year <= 2005) {
    insights.push('Early work showing foundational consciousness themes');
  }
  
  return insights;
};

/**
 * Filter songs by council status
 */
export const filterSongsByStatus = (songs: AnySong[], status: string): AnySong[] => {
  return songs.filter(song => song.councilStatus === status);
};

/**
 * Get songs by year range
 */
export const getSongsByYearRange = (songs: AnySong[], startYear: number, endYear: number): AnySong[] => {
  return songs.filter(song => song.year >= startYear && song.year <= endYear);
};

/**
 * Extract all unique themes from songs
 */
export const extractAllThemes = (songs: AnySong[]): string[] => {
  const themes = songs.flatMap(song => 
    'themeAnalysis' in song 
      ? song.themeAnalysis.map(analysis => analysis.theme)
      : song.propheticThemes
  );
  return Array.from(new Set(themes));
};

/**
 * Calculate theme frequency across songs
 */
export const calculateThemeFrequency = (songs: AnySong[]): Record<string, number> => {
  const frequency: Record<string, number> = {};
  
  songs.forEach(song => {
    const themes = 'themeAnalysis' in song 
      ? song.themeAnalysis.map(analysis => analysis.theme)
      : song.propheticThemes;
    
    themes.forEach(theme => {
      frequency[theme] = (frequency[theme] || 0) + 1;
    });
  });
  
  return frequency;
};

/**
 * Get songs containing specific theme
 */
export const getSongsByTheme = (songs: AnySong[], theme: string): AnySong[] => {
  return songs.filter(song => {
    const themes = 'themeAnalysis' in song 
      ? song.themeAnalysis.map(analysis => analysis.theme)
      : song.propheticThemes;
    return themes.includes(theme);
  });
};

/**
 * Calculate library statistics
 */
export const calculateLibraryStats = (songs: AnySong[]) => {
  const totalSongs = songs.length;
  const analyzedSongs = songs.filter(song => song.councilStatus !== COUNCIL_STATUS.AWAITING_ANALYSIS).length;
  const uniqueThemes = calculateUniqueThemesCount(songs);
  const averageAccuracy = calculatePropheticAccuracyAverage(songs);
  const years = songs.map(song => song.year);
  const yearRange = [Math.min(...years), Math.max(...years)] as [number, number];
  
  return {
    totalSongs,
    analyzedSongs,
    analysisPercentage: Math.round((analyzedSongs / totalSongs) * 100),
    uniqueThemes,
    averageAccuracy,
    yearRange,
    earliestYear: Math.min(...years),
    latestYear: Math.max(...years)
  };
};

/**
 * Sort songs by various criteria
 */
export const sortSongs = (songs: AnySong[], criteria: 'year' | 'title' | 'status' = 'year'): AnySong[] => {
  return [...songs].sort((a, b) => {
    switch (criteria) {
      case 'year':
        return a.year - b.year;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'status':
        return a.councilStatus.localeCompare(b.councilStatus);
      default:
        return 0;
    }
  });
};

/**
 * Search songs by query
 */
export const searchSongs = (songs: AnySong[], query: string): AnySong[] => {
  const lowerQuery = query.toLowerCase();
  return songs.filter(song => 
    song.title.toLowerCase().includes(lowerQuery) ||
    song.propheticThemes.some(theme => theme.toLowerCase().includes(lowerQuery)) ||
    ('themeAnalysis' in song && 
      song.themeAnalysis.some(analysis => analysis.theme.toLowerCase().includes(lowerQuery))
    )
  );
};