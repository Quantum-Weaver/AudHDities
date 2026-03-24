// src/utils/domain/music/library.ts
import { musicLibrary } from '@/data/creative/music-library';
import { propheticThemes } from '@/data/creative/prophetic-themes';
import { enhanceSong, calculateLibraryStats,  calculateThemeFrequency } from './analysis';

/**
 * Get the complete music library with enhanced data
 */
export const getEnhancedMusicLibrary = () => {
  return musicLibrary.map(song => enhanceSong(song, propheticThemes));
};

/**
 * Get library metadata
 */
export const getLibraryMetadata = () => {
  const enhancedLibrary = getEnhancedMusicLibrary();
  const stats = calculateLibraryStats(enhancedLibrary);
  
  return {
    totalSongs: stats.totalSongs,
    enhancedSongs: stats.analyzedSongs,
    basicSongs: stats.totalSongs - stats.analyzedSongs,
    yearsCovered: stats.yearRange,
    analyzedSongs: stats.analyzedSongs,
    propheticThemesCount: stats.uniqueThemes,
    uniqueThemesCount: stats.uniqueThemes,
    propheticAccuracyAverage: stats.averageAccuracy,
    lastUpdated: new Date().toISOString(),
    analysisVersion: '1.0',
    processOntology: 'MusicAnalysis'
  };
};

/**
 * Get songs by status with enhanced data
 */
export const getSongsByCouncilStatus = (status: string) => {
  const enhancedLibrary = getEnhancedMusicLibrary();
  return enhancedLibrary.filter(song => song.councilStatus === status);
};

/**
 * Get thematic analysis summary
 */
export const getThematicAnalysis = () => {
  const enhancedLibrary = getEnhancedMusicLibrary();
  const themeFrequency = calculateThemeFrequency(enhancedLibrary);
  
  const mostCommonThemes = Object.entries(themeFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([theme, count]) => ({
      theme,
      count,
      themeData: propheticThemes.find(t => t.id === theme)
    }));
  
  return {
    mostCommonThemes,
    themeCategories: {},
    themeEvolution: {},
    propheticDensity: {},
    strongestConnections: [],
    songsAnalyzed: enhancedLibrary.length,
    enhancedSongs: enhancedLibrary.length,
    basicSongs: 0,
    dataTaxonomy: 'AnalyticsData',
    patternTaxonomy: 'PatternRecognition'
  };
};