'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export default function AuthTestPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = getSupabaseClient()
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) throw sessionError
        
        if (!session) {
          setError('Not logged in')
          setLoading(false)
          return
        }
        
        setUser(session.user)
        
        // Test profile fetch
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          
        if (profileError) {
          console.error('Profile fetch error:', profileError)
          setError(`Profile error: ${profileError.message}`)
        } else {
          console.log('Profile found:', profile)
        }
        
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>Not logged in</div>

  return (
    <div>
      <h1>Auth Test Page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}