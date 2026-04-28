// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR UPLOAD COMPONENT                                ║
// ║                    The sovereign image editor                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/runes/Avatar';
import { Camera, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { AvatarUploadProps } from '@/types/components/runes/avatar_upload.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  AVATAR_STORAGE_BUCKET,
  AVATAR_UPLOAD_SIZE_CLASSES,
  AVATAR_UPLOAD_BORDER,
  AVATAR_UPLOAD_ERRORS,
} from '@/lib/constants/components/runes/avatar_upload.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  AVATAR_UPLOAD_VARIANTS,
  avatarUploadOverlayVariants,
  avatarUploadSpinnerVariants,
  avatarUploadCameraIconVariants,
} from '@/lib/constants/components/runes/avatar_upload.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  validateAvatarFile,
  generateAvatarPath,
  createAvatarPreview,
  getAvatarInitials,
  mapUploadSizeToAvatarSize,
} from '@/lib/utils/components/runes/avatar_upload.utils';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function AvatarUpload({
  userId,
  currentUrl,
  onUploadComplete,
  size = 'md',
  fallbackInitials = '?',
  className,
}: AvatarUploadProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const sizeClass = AVATAR_UPLOAD_SIZE_CLASSES[size];
  const initials = getAvatarInitials(fallbackInitials);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // Preview
    const { previewUrl, cleanup } = createAvatarPreview(file);
    setPreview(previewUrl);

    setUploading(true);

    try {
      const filePath = generateAvatarPath(userId, file);

      const { error: uploadError } = await supabase.storage
        .from(AVATAR_STORAGE_BUCKET)
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(AVATAR_STORAGE_BUCKET)
        .getPublicUrl(filePath);

      onUploadComplete(data.publicUrl);
    } catch (error) {
      console.error('Avatar upload failed:', error);
      alert(AVATAR_UPLOAD_ERRORS.UPLOAD_FAILED);
    } finally {
      setUploading(false);
      cleanup();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const displayImage = preview || currentUrl;
  const overlayVariant = uploading
    ? AVATAR_UPLOAD_VARIANTS.LOADING
    : AVATAR_UPLOAD_VARIANTS.DEFAULT;

  return (
    <div className={cn('relative group', className)}>
      <Avatar
        size={mapUploadSizeToAvatarSize(size)}
        className={cn(AVATAR_UPLOAD_BORDER)}
      >
        <AvatarImage src={displayImage || undefined} />
        <AvatarFallback>
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Upload Overlay */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className={avatarUploadOverlayVariants({ variant: overlayVariant })}
        aria-label="Upload avatar"
      >
        {uploading ? (
          <Loader2 className={avatarUploadSpinnerVariants({ size })} />
        ) : (
          <Camera className={avatarUploadCameraIconVariants({ size })} />
        )}
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}