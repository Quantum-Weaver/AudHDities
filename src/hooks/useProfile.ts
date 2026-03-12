"use client"
import { useEffect, useState, useCallback } from 'react'  // ← Added useCallback
import { getSupabaseClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  banner_url: string | null
  bio: string | null
  is_creator: boolean
  is_vendor: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
  // Add other fields as needed
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseClient()  // ← Moved outside useEffect

  // =====================================================
  // THIS IS WHERE refreshProfile GOES - INSIDE THE HOOK, 
  // BEFORE THE useEffect, AFTER THE useState DECLARATIONS
  // =====================================================
  const refreshProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      if (data) setProfile(data)
    } catch (err: any) {
      console.error('Error refreshing profile:', err)
    }
  }, [supabase])  // ← Dependency array

  // =====================================================
  // ORIGINAL useEffect (unchanged except using the supabase variable)
  // =====================================================
  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) throw userError
        
        if (!user) {
          if (mounted) {
            setUser(null)
            setProfile(null)
            setLoading(false)
          }
          return
        }

        if (mounted) setUser(user)

        // Get profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          // If profile doesn't exist, create it
          if (profileError.code === 'PGRST116') {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                username: user.email?.split('@')[0],
                display_name: user.email?.split('@')[0]
              })
              .select()
              .single()

            if (createError) throw createError
            if (mounted) setProfile(newProfile)
          } else {
            throw profileError
          }
        } else {
          if (mounted) setProfile(profile)
        }

      } catch (err: any) {
        console.error('Profile loading error:', err)
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProfile()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadProfile()
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])  // ← Added supabase to dependency array

  // =====================================================
  // RETURN STATEMENT - NOW INCLUDES refreshProfile
  // =====================================================
  return { profile, user, loading, error, refreshProfile }  // ← refreshProfile added here
}