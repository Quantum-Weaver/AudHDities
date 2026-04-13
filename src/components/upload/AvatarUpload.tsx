/* @/components/ui/AvatarUpload.tsx */
'use client'

import { useState, useRef } from 'react'
import { useSupabase } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Camera, Loader2 } from 'lucide-react'

interface AvatarUploadProps {
  userId: string
  currentUrl?: string | null
  onUploadComplete: (url: string) => void
  size?: 'sm' | 'md' | 'lg'
  fallbackInitials?: string
}

export default function AvatarUpload({
  userId,
  currentUrl,
  onUploadComplete,
  size = 'md',
  fallbackInitials = '?',
}: AvatarUploadProps) {
  const supabase = useSupabase()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Validate
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      setPreview(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large (max 5MB)')
      setPreview(null)
      return
    }

    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      onUploadComplete(publicUrl)
    } catch (error) {
      console.error('Avatar upload failed:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
      URL.revokeObjectURL(objectUrl)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const displayImage = preview || currentUrl
  const initials = fallbackInitials.slice(0, 2).toUpperCase()

  return (
    <div className="relative group">
      <Avatar className={`${sizeClasses[size]} border-2 border-white/20`}>
        <AvatarImage src={displayImage || undefined} />
        <AvatarFallback className="bg-cyan-600 text-white">
          {initials}
        </AvatarFallback>
      </Avatar>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0"
      >
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : (
          <Camera className="h-5 w-5 text-white" />
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