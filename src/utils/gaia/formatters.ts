// src/utils/gaia/formatters.ts
import { STATUS_COLORS, PRIDE_COLORS } from "@/lib/constants/cosmic/colors"
import type { MusicAnalysisResult } from "@/types/domain/music/analysis"
import type { SocialPlatform } from "@/types/domain/community/platforms"

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const capitalizeFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const formatRarity = (rarity: string): string =>
  rarity.split('_').map(capitalizeFirst).join(' ')

export const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

export const normalizeSocialData = (platforms: any[]) => {
  return platforms.map(platform => ({
    name: platform.name || 'Unknown Platform',
    engagement: platform.engagement || 0,
    category: platform.category || 'social',
    status: platform.active ? 'active' : 'inactive'
  }))
}

export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Complete & Active': STATUS_COLORS.complete,
    'Quantum Active': STATUS_COLORS.quantumActive,
    'In Development': STATUS_COLORS.inDevelopment,
    'Foundation Laid': STATUS_COLORS.foundationLaid,
    'Planned': STATUS_COLORS.planned,
    'Theoretical': STATUS_COLORS.theoretical
  };
  return statusMap[status] || STATUS_COLORS.theoretical;
};

export const getPrideGradient = (
  type: 'pride' | 'progressPride' | 'transPride' | 'inclusive' = 'pride'
): string => {
  const gradients = {
    pride: [
      PRIDE_COLORS.red,
      PRIDE_COLORS.orange,
      PRIDE_COLORS.yellow,
      PRIDE_COLORS.green,
      PRIDE_COLORS.blue,
      PRIDE_COLORS.purple
    ],
    progressPride: [
      PRIDE_COLORS.red,
      PRIDE_COLORS.orange,
      PRIDE_COLORS.yellow,
      PRIDE_COLORS.green,
      PRIDE_COLORS.blue,
      PRIDE_COLORS.purple,
      PRIDE_COLORS.white,
      PRIDE_COLORS.pink,
      PRIDE_COLORS.lightBlue,
      PRIDE_COLORS.brown,
      PRIDE_COLORS.black,
      PRIDE_COLORS.transPink
    ],
    transPride: [
      PRIDE_COLORS.transBlue,
      PRIDE_COLORS.transPink,
      PRIDE_COLORS.transWhite,
      PRIDE_COLORS.transPink,
      PRIDE_COLORS.transBlue
    ],
    inclusive: Object.values(PRIDE_COLORS)
  };

  return `linear-gradient(135deg, ${gradients[type].join(', ')})`;
};

// Additional formatting functions from our mapping
export const formatMusicAnalysisForDisplay = (analysis: MusicAnalysisResult): string => {
  if (!analysis) return 'No analysis available';
  
  const themes = analysis.themes?.join(', ') || 'No themes identified';
  const accuracy = analysis.propheticAccuracy ? `${analysis.propheticAccuracy}%` : 'Not calculated';
  
  return `Themes: ${themes} | Accuracy: ${accuracy}`;
}

export const formatDeviceDimensions = (width: number, height: number): string =>
  `${width} × ${height}`

export const formatThemeName = (theme: string): string =>
  theme.split('-').map(capitalizeFirst).join(' ')

export const formatCouncilStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': '🟢 Active',
    'deliberating': '🟡 Deliberating', 
    'resting': '🔵 Resting',
    'quantum': '🟣 Quantum State'
  };
  return statusMap[status] || '⚪️ Unknown';
}

export const formatPlatformData = (platform: SocialPlatform): string =>
  `${platform.name} (${platform.category}) - ${platform.engagement || 0} engagement`

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

export const formatPercentage = (value: number): string =>
  `${Math.round(value * 100)}%`

export const formatResolutionString = (width: number, height: number): string =>
  `${width}x${height}`

export const formatDisplayValue = (value: any): string => {
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.join(', ');
  return String(value || '');
}

export const formatContentForDisplay = (content: any): string => {
  if (!content) return 'No content';
  
  const title = content.title || 'Untitled';
  const type = content.type ? `[${content.type}]` : '';
  
  return `${type} ${title}`.trim();
}

/**
 * Consolidated formatters object for easy importing
 */
export const formatterUtils = {
  formatDate,
  capitalizeFirst,
  formatRarity,
  truncateText,
  normalizeSocialData,
  getStatusColor,
  getPrideGradient,
  formatMusicAnalysisForDisplay,
  formatDeviceDimensions,
  formatThemeName,
  formatCouncilStatus,
  formatPlatformData,
  formatTimestamp,
  formatPercentage,
  formatResolutionString,
  formatDisplayValue,
  formatContentForDisplay
} as const;