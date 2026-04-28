/* @/components/ui/BannerUpload.tsx */
'use client'

import { useState, useRef } from 'react'
import { useSupabase } from '@/lib/supabase/client'
import { Button } from '../../../../../yggdrasil/Button'
import { Camera, Loader2 } from 'lucide-react'

interface BannerUploadProps {
  userId: string
  currentUrl?: string | null
  onUploadComplete: (url: string) => void
}

export default function BannerUpload({
  userId,
  currentUrl,
  onUploadComplete,
}: BannerUploadProps) {
  const supabase = useSupabase()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      setPreview(null)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File too large (max 10MB)')
      setPreview(null)
      return
    }

    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/banner-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(fileName)

      onUploadComplete(publicUrl)
    } catch (error) {
      console.error('Banner upload failed:', error)
      alert('Failed to upload banner')
    } finally {
      setUploading(false)
      URL.revokeObjectURL(objectUrl)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const displayImage = preview || currentUrl

  return (
    <div className="relative group h-48 w-full overflow-hidden rounded-t-xl">
      {displayImage ? (
        <img
          src={displayImage}
          alt="Banner"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
          <span className="text-star-dust/40">No banner</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0"
      >
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-star-dust" />
        ) : (
          <Camera className="h-6 w-6 text-star-dust" />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  )
}