// utils/domain/music/calculators.ts
import { Song } from '@/types/domain/music/library';
import { PropheticTheme } from '@/types/domain/music/analysis';

/**
 * Calculate number of unique prophetic themes across all songs
 */
export function calculateUniqueThemesCount(
  songs: Song[], 
  themes: PropheticTheme[]
): number {
  const usedThemeIds = new Set<string>();
  
  songs.forEach(song => {
    if (song.propheticThemes) {
      song.propheticThemes.forEach(themeId => {
        usedThemeIds.add(themeId);
      });
    }
  });
  
  return usedThemeIds.size;
}

/**
 * Calculate average prophetic accuracy across songs
 * Accuracy is determined by:
 * - Number of prophetic themes per song (normalized)
 * - Council status indicates depth of prophetic recognition
 */
export function calculatePropheticAccuracyAverage(songs: Song[]): number {
  let totalAccuracy = 0;
  let songsWithPropheticContent = 0;
  
  songs.forEach(song => {
    let songAccuracy = 0;
    
    // Base accuracy from prophetic themes count
    const themeCount = song.propheticThemes?.length || 0;
    if (themeCount > 0) {
      // Each theme contributes ~10% to accuracy, max 50%
      songAccuracy += Math.min(themeCount * 0.1, 0.5);
      songsWithPropheticContent++;
    }
    
    // Boost accuracy based on council status (deeper analysis)
    if (song.councilStatus) {
      const statusBoosts: Record<string, number> = {
        'quantum_analysis': 0.1,
        'council_review': 0.2,
        'pantheon_deliberation': 0.3,
        'skald_chronicling': 0.4,
        'prophetic_revealed': 0.5,
        'evolutionary_integrated': 0.6
      };
      songAccuracy += statusBoosts[song.councilStatus] || 0;
    }
    
    totalAccuracy += Math.min(songAccuracy, 1.0);
  });
  
  // If no songs have prophetic content, return 0
  if (songsWithPropheticContent === 0) return 0;
  
  // Average accuracy across all songs
  return (totalAccuracy / songs.length) * 100;
}

/**
 * Get theme frequency across songs
 */
export function getThemeFrequency(
  songs: Song[]
): Map<string, number> {
  const frequency = new Map<string, number>();
  
  songs.forEach(song => {
    if (song.propheticThemes) {
      song.propheticThemes.forEach(themeId => {
        frequency.set(themeId, (frequency.get(themeId) || 0) + 1);
      });
    }
  });
  
  return frequency;
}

/**
 * Get songs by theme
 */
export function getSongsByTheme(
  songs: Song[],
  themeId: string
): Song[] {
  return songs.filter(song => 
    song.propheticThemes?.includes(themeId)
  );
}

/**
 * Get theme density by year
 */
export function getThemeDensityByYear(
  songs: Song[]
): Map<number, number> {
  const density = new Map<number, number>();
  
  songs.forEach(song => {
    if (song.year && song.propheticThemes?.length) {
      const current = density.get(song.year) || 0;
      density.set(song.year, current + song.propheticThemes.length);
    }
  });
  
  return new Map([...density.entries()].sort((a, b) => a[0] - b[0]));
}

/**
 * Get theme evolution timeline
 */
export function getThemeEvolution(
  songs: Song[]
): Map<number, string[]> {
  const timeline = new Map<number, string[]>();
  
  songs.forEach(song => {
    if (song.year && song.propheticThemes?.length) {
      const existing = timeline.get(song.year) || [];
      timeline.set(song.year, [...new Set([...existing, ...song.propheticThemes])]);
    }
  });
  
  return new Map([...timeline.entries()].sort((a, b) => a[0] - b[0]));
}