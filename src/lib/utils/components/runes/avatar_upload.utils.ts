// src/lib/utils/components/runes/avatar_upload.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR UPLOAD UTILITIES                                ║
// ║                    Pure logic — no hardcoded design values                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  AVATAR_MAX_FILE_SIZE,
  AVATAR_ACCEPTED_TYPES,
  AVATAR_UPLOAD_ERRORS,
} from '@/lib/constants/components/runes/avatar_upload.constants';
import type { AvatarValidationResult, AvatarUploadSize } from '@/types/components/runes/avatar_upload.types';
import type { AvatarSize } from '@/lib/constants/components/runes/avatar.variants';

/**
 * Validates a file before upload.
 */
export function validateAvatarFile(file: File): AvatarValidationResult {
  if (!AVATAR_ACCEPTED_TYPES.includes(file.type as typeof AVATAR_ACCEPTED_TYPES[number])) {
    return { valid: false, error: AVATAR_UPLOAD_ERRORS.NOT_IMAGE };
  }

  if (file.size > AVATAR_MAX_FILE_SIZE) {
    return { valid: false, error: AVATAR_UPLOAD_ERRORS.TOO_LARGE };
  }

  return { valid: true };
}

/**
 * Maps AvatarUpload size keys to Avatar component size keys.
 */
const AVATAR_UPLOAD_TO_AVATAR_SIZE: Record<AvatarUploadSize, AvatarSize> = {
  sm: 'sm',
  md: 'default',
  lg: 'xl',
};

/**
 * Converts an AvatarUpload size to the corresponding Avatar size.
 */
export function mapUploadSizeToAvatarSize(size: AvatarUploadSize): AvatarSize {
  return AVATAR_UPLOAD_TO_AVATAR_SIZE[size];
}

/**
 * Generates a unique storage path for an avatar upload.
 */
export function generateAvatarPath(userId: string, file: File): string {
  const fileExt = file.name.split('.').pop() || 'png';
  const timestamp = Date.now();
  return `${userId}/avatar-${timestamp}.${fileExt}`;
}

/**
 * Creates an object URL for preview and returns a cleanup function.
 */
export function createAvatarPreview(file: File): {
  previewUrl: string;
  cleanup: () => void;
} {
  const previewUrl = URL.createObjectURL(file);
  return {
    previewUrl,
    cleanup: () => URL.revokeObjectURL(previewUrl),
  };
}

/**
 * Extracts initials from a name or fallback string.
 */
export function getAvatarInitials(fallbackInitials: string): string {
  return fallbackInitials.slice(0, 2).toUpperCase();
}