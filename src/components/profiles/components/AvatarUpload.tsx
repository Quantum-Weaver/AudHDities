'use client'

import { useState, useRef } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface AvatarUploadProps {
  userId: string
  currentAvatarUrl?: string | null
  onUploadComplete: (url: string) => void
}

export function AvatarUpload({ userId, currentAvatarUrl, onUploadComplete }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = getSupabaseClient()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      // Preview locally
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // Validate file type
      if (!file.type.match(/image\/(jpeg|png|gif|webp)/)) {
        alert('Please upload an image file (JPEG, PNG, GIF, or WebP)')
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Maximum size is 5MB.')
        return
      }

      setUploading(true)

      // Create unique filename with user ID folder
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`
      
      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      console.log('Avatar uploaded, public URL:', publicUrl)

      // IMPORTANT: Update profile with the new URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId)

      if (updateError) {
        console.error('Error updating profile with avatar URL:', updateError)
        throw updateError
      }

      console.log('Profile updated with new avatar URL')

      // Call the callback to let parent component know
      onUploadComplete(publicUrl)
      
    } catch (error: any) {
      console.error('Error uploading avatar:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="relative group">
      {/* Avatar display */}
      <div className="w-24 h-24 rounded-full overflow-hidden bg-PRIMARY-100 border-4 border-white shadow-lg">
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : currentAvatarUrl ? (
          <img 
            src={currentAvatarUrl} 
            alt="Avatar" 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Error loading avatar:', currentAvatarUrl)
              e.currentTarget.src = '' // Clear broken image
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-PRIMARY-700 bg-PRIMARY-100">
            {userId ? userId[0].toUpperCase() : '?'}
          </div>
        )}
      </div>

      {/* Upload overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
          <span className="text-white text-sm">Change</span>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  )
}