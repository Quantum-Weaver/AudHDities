// src/components/ui/BannerUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import { Camera, Loader2 } from 'lucide-react';

interface BannerUploadProps {
  userId: string;
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
}

export default function BannerUpload({ userId, currentUrl, onUploadComplete }: BannerUploadProps) {
  const supabase = useSupabase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File too large (max 10MB)');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/banner-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(fileName);

      onUploadComplete(publicUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="relative group h-48 bg-white/5 rounded-t-lg overflow-hidden">
      {preview ? (
        <img src={preview} alt="Banner preview" className="w-full h-full object-cover" />
      ) : currentUrl ? (
        <img src={currentUrl} alt="Banner" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/40">
          No banner
        </div>
      )}

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {uploading ? (
          <Loader2 size={24} className="animate-spin text-white" />
        ) : (
          <Camera size={24} className="text-white" />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}