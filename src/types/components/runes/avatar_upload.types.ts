// src/types/components/runes/avatar_upload.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR UPLOAD TYPES                                    ║
// ║                    Pure interfaces — imports from constants               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { AVATAR_UPLOAD_VARIANTS } from '@/lib/constants/components/runes/avatar_upload.variants';

// ─── Variant types derived from constants ──────────────────────────────────
export type AvatarUploadVariant =
  (typeof AVATAR_UPLOAD_VARIANTS)[keyof typeof AVATAR_UPLOAD_VARIANTS];

// ─── Size ──────────────────────────────────────────────────────────────────
export type AvatarUploadSize = 'sm' | 'md' | 'lg';

// ─── Component Props ───────────────────────────────────────────────────────
export interface AvatarUploadProps {
  /** User ID for storage path generation */
  userId: string;
  /** Current avatar URL (if any) */
  currentUrl?: string | null;
  /** Callback fired when upload completes successfully */
  onUploadComplete: (url: string) => void;
  /** Size of the avatar */
  size?: AvatarUploadSize;
  /** Fallback initials when no image is set */
  fallbackInitials?: string;
  /** Additional CSS classes */
  className?: string;
}

// ─── Validation Result ─────────────────────────────────────────────────────
export interface AvatarValidationResult {
  valid: boolean;
  error?: string;
}