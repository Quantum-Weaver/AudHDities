'use client'

import { useState, useRef } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

interface BannerUploadProps {
  userId: string
  currentBannerUrl?: string | null
  onUploadComplete: (url: string) => void
}

export function BannerUpload({ userId, currentBannerUrl, onUploadComplete }: BannerUploadProps) {
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
      if (!file.type.match(/image\/(jpeg|png|webp)/)) {
        alert('Please upload an image file (JPEG, PNG, or WebP)')
        return
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File too large. Maximum size is 10MB.')
        return
      }

      setUploading(true)

      // Create unique filename with user ID folder
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/banner-${Date.now()}.${fileExt}`
      
      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(fileName)

      console.log('Banner uploaded, public URL:', publicUrl)

      // IMPORTANT: Update profile with the new URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', userId)

      if (updateError) {
        console.error('Error updating profile with banner URL:', updateError)
        throw updateError
      }

      console.log('Profile updated with new banner URL')

      // Call the callback
      onUploadComplete(publicUrl)
      
    } catch (error: any) {
      console.error('Error uploading banner:', error)
      alert('Failed to upload banner. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="relative group h-48 bg-gray-200 rounded-t-lg overflow-hidden">
      {/* Banner display */}
      {preview ? (
        <img 
          src={preview} 
          alt="Banner preview" 
          className="w-full h-full object-cover"
        />
      ) : currentBannerUrl ? (
        <img 
          src={currentBannerUrl} 
          alt="Profile banner" 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading banner:', currentBannerUrl)
            e.currentTarget.src = '' // Clear broken image
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
          Click to upload banner
        </div>
      )}

      {/* Upload overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        ) : (
          <span className="text-white font-medium">Change Banner</span>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  )
}