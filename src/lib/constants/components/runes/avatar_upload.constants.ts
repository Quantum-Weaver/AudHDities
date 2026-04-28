// src/lib/constants/components/runes/avatar_upload.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR UPLOAD CONSTANTS                                ║
// ║                    Raw values — no CVA, no logic                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { durations, easing } from '@/lib/constants/cosmic/motion';

// ─── Supabase Storage ──────────────────────────────────────────────────────
export const AVATAR_STORAGE_BUCKET = 'avatars' as const;
export const AVATAR_STORAGE_PATH_PREFIX = 'avatars' as const;

// ─── File Validation ───────────────────────────────────────────────────────
/** Maximum file size in bytes (5MB) */
export const AVATAR_MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Accepted MIME types */
export const AVATAR_ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] as const;

/** Accepted file extensions */
export const AVATAR_ACCEPTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'] as const;

/** HTML accept attribute value */
export const AVATAR_ACCEPT_ATTRIBUTE = 'image/*' as const;

// ─── Size Classes ──────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_SIZE_CLASSES = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
} as const;

// ─── Overlay ───────────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_OVERLAY_BG = 'bg-black/50' as const;
export const AVATAR_UPLOAD_OVERLAY_OPACITY = 'opacity-0 group-hover:opacity-100' as const;
export const AVATAR_UPLOAD_OVERLAY_DISABLED = 'disabled:opacity-0' as const;

// ─── Border ────────────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_BORDER = 'border-2 border-white/20' as const;

// ─── Transition ─────────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_TRANSITION_DURATION = durations.fast;
export const AVATAR_UPLOAD_TRANSITION_EASING = easing.quantum;
export const AVATAR_UPLOAD_TRANSITION = 'transition-opacity' as const;

// ─── Spacing ───────────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_CONTAINER_SPACING = 'relative group' as const;

// ─── Error Messages ────────────────────────────────────────────────────────
export const AVATAR_UPLOAD_ERRORS = {
  NOT_IMAGE: 'Please upload an image file',
  TOO_LARGE: 'File too large (max 5MB)',
  UPLOAD_FAILED: 'Failed to upload image',
} as const;