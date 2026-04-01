// src/utils/gaia/validation.ts
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

/**
 * Pure color validation utilities
 */

export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const isValidColorFormat = (color: string): boolean => {
  if (isValidHexColor(color)) return true;
  if (color.startsWith('rgb(') || color.startsWith('rgba(')) return true;
  if (color.startsWith('hsl(') || color.startsWith('hsla(')) return true;
  return false;
};

export const isValidIconName = (iconName: string): boolean => {
  const validIcons = ['quantum', 'cosmic', 'fire', 'water', 'earth', 'sanctuary'];
  return validIcons.includes(iconName);
};

export const isValidEnvironment = (environment: string): boolean => {
  const validEnvironments = ['home', 'cosmic', 'mysticalMist', 'musicRoom', 'council'];
  return validEnvironments.includes(environment);
};

// Data validation functions
const validateSongData = (song: any): boolean => {
  if (!song || typeof song !== 'object') return false;
  if (!song.title || typeof song.title !== 'string') return false;
  if (!song.year || typeof song.year !== 'number') return false;
  return true;
};

const validatePlatformData = (platform: any): boolean => {
  if (!platform || typeof platform !== 'object') return false;
  if (!platform.name || typeof platform.name !== 'string') return false;
  if (!platform.category || typeof platform.category !== 'string') return false;
  return true;
};

const validateContentItem = (content: any): boolean => {
  if (!content || typeof content !== 'object') return false;
  if (!content.type || typeof content.type !== 'string') return false;
  if (!content.title || typeof content.title !== 'string') return false;
  return true;
};

/**
 * Simple validation helper that returns detailed results
 */
export const createValidationResult = (isValid: boolean, message: string = '') => ({
  isValid,
  message: message || (isValid ? 'Validation passed' : 'Validation failed'),
  timestamp: new Date().toISOString()
});

// Export as both named exports and a consolidated object
export const validationUtils = {
  isValidHexColor,
  isValidColorFormat,
  isValidIconName,
  isValidEnvironment,
  validateSongData,
  validatePlatformData,
  validateContentItem,
  createValidationResult
} as const;